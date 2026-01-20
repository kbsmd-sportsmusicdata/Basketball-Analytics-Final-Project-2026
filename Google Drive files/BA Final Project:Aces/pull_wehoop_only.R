# Las Vegas Aces - wehoop Data Pull (WNBA) - R Version
# ========================================================
# Pulls WNBA box scores from wehoop GitHub releases for 2024-2025 seasons.
# Tests data availability and calculates Dean Oliver metrics.
#
# Run this first to validate wehoop data before integrating pbpstats.
#
# Author: Krystal
# Last Updated: 2026-01-06

# ============================================================================
# SETUP
# ============================================================================

# Install required packages if not already installed
required_packages <- c("arrow", "dplyr", "tidyr", "purrr", "stringr", "lubridate", "glue")

for (pkg in required_packages) {
  if (!require(pkg, character.only = TRUE, quietly = TRUE)) {
    install.packages(pkg)
    library(pkg, character.only = TRUE)
  }
}

# ============================================================================
# CONFIGURATION
# ============================================================================

# Team configuration
TEAM_ID <- "16"  # Las Vegas Aces team_id
TEAM_NAME <- "Las Vegas Aces"
TEAM_ABBREV <- "LV"
SEASONS <- c(2024, 2025)

# Data paths
DATA_DIR <- "data"
RAW_DIR <- file.path(DATA_DIR, "raw", "wehoop")
PROCESSED_DIR <- file.path(DATA_DIR, "processed", "wehoop")
MASTER_DIR <- file.path(DATA_DIR, "master")

# Create directories
dir.create(RAW_DIR, recursive = TRUE, showWarnings = FALSE)
dir.create(PROCESSED_DIR, recursive = TRUE, showWarnings = FALSE)
dir.create(MASTER_DIR, recursive = TRUE, showWarnings = FALSE)

# wehoop GitHub releases base URL
WEHOOP_BASE <- "https://github.com/sportsdataverse/wehoop-data/releases/download"

# URL patterns (try multiple formats)
WEHOOP_PATTERNS <- list(
  team_box = c(
    "{base}/wnba_team_box/wnba_team_box_{season}.parquet",
    "{base}/espn_wnba_team_boxscore/team_box_{season}.parquet"
  ),
  player_box = c(
    "{base}/wnba_player_box/wnba_player_box_{season}.parquet",
    "{base}/espn_wnba_player_boxscore/player_box_{season}.parquet"
  ),
  schedule = c(
    "{base}/wnba_schedule/wnba_schedule_{season}.parquet",
    "{base}/espn_wnba_schedule/schedule_{season}.parquet"
  )
)

cat(paste0(rep("=", 70), collapse = ""), "\n")
cat("LAS VEGAS ACES - WEHOOP DATA PULL (R)\n")
cat(paste0(rep("=", 70), collapse = ""), "\n")
cat("Target Seasons:", paste(SEASONS, collapse = ", "), "\n")
cat("Data Source: wehoop WNBA releases\n")
cat("Team:", TEAM_NAME, "(ID:", TEAM_ID, ")\n")
cat(paste0(rep("=", 70), collapse = ""), "\n\n")


# ============================================================================
# DATA LOADING FUNCTIONS
# ============================================================================

try_load_parquet <- function(url_patterns, season, data_type) {
  #' Try multiple URL patterns to load parquet data
  #' wehoop sometimes changes their release structure
  
  for (pattern in url_patterns) {
    url <- glue::glue(pattern, base = WEHOOP_BASE, season = season)
    
    tryCatch({
      cat("  Trying:", url, "\n")
      df <- arrow::read_parquet(url)
      cat("  ✓ SUCCESS - Loaded", nrow(df), "rows\n")
      return(list(df = df, url = url))
    }, error = function(e) {
      cat("  ✗ Failed:", substr(as.character(e), 1, 100), "\n")
    })
  }
  
  cat("  ✗ ERROR: Could not load", data_type, "for", season, "\n")
  return(list(df = data.frame(), url = NULL))
}


load_wnba_team_box <- function(season) {
  #' Load WNBA team box scores from wehoop
  
  cat("\n[", season, "] Loading team box scores...\n", sep = "")
  result <- try_load_parquet(WEHOOP_PATTERNS$team_box, season, "team_box")
  
  if (nrow(result$df) > 0) {
    # Save raw data
    raw_file <- file.path(RAW_DIR, paste0("team_box_", season, "_raw.parquet"))
    arrow::write_parquet(result$df, raw_file)
    cat("  → Saved raw data:", raw_file, "\n")
  }
  
  return(result$df)
}


load_wnba_player_box <- function(season) {
  #' Load WNBA player box scores from wehoop
  
  cat("\n[", season, "] Loading player box scores...\n", sep = "")
  result <- try_load_parquet(WEHOOP_PATTERNS$player_box, season, "player_box")
  
  if (nrow(result$df) > 0) {
    # Save raw data
    raw_file <- file.path(RAW_DIR, paste0("player_box_", season, "_raw.parquet"))
    arrow::write_parquet(result$df, raw_file)
    cat("  → Saved raw data:", raw_file, "\n")
  }
  
  return(result$df)
}


load_wnba_schedule <- function(season) {
  #' Load WNBA schedule from wehoop
  
  cat("\n[", season, "] Loading schedule...\n", sep = "")
  result <- try_load_parquet(WEHOOP_PATTERNS$schedule, season, "schedule")
  
  if (nrow(result$df) > 0) {
    # Save raw data
    raw_file <- file.path(RAW_DIR, paste0("schedule_", season, "_raw.parquet"))
    arrow::write_parquet(result$df, raw_file)
    cat("  → Saved raw data:", raw_file, "\n")
  }
  
  return(result$df)
}


inspect_dataframe <- function(df, name) {
  #' Print helpful info about dataframe structure
  
  if (nrow(df) == 0) {
    cat("\n[INSPECTION]", name, ": EMPTY\n")
    return(invisible(NULL))
  }
  
  cat("\n[INSPECTION]", name, ":\n")
  cat("  Rows:", nrow(df), "\n")
  cat("  Columns:", ncol(df), "\n")
  cat("  \n  First few columns:\n")
  
  for (i in 1:min(10, ncol(df))) {
    cat("    -", names(df)[i], ":", class(df[[i]])[1], "\n")
  }
  
  # Check for team_id column
  if ("team_id" %in% names(df)) {
    cat("  \n  Unique team_ids:", length(unique(df$team_id)), "\n")
    cat("  Team IDs present:", paste(head(sort(unique(df$team_id)), 5), collapse = ", "), "...\n")
  } else if ("team_team_id" %in% names(df)) {
    cat("  \n  Unique team_team_id:", length(unique(df$team_team_id)), "\n")
  }
  
  # Check for game_id column
  if ("game_id" %in% names(df)) {
    cat("  Unique game_ids:", length(unique(df$game_id)), "\n")
  }
  
  cat("  \n  Sample row (first 5 columns):\n")
  print(df[1, 1:min(5, ncol(df))])
}


# ============================================================================
# DEAN OLIVER METRICS
# ============================================================================

calculate_possessions <- function(fga, fta, orb, tov) {
  #' Dean Oliver possession estimate
  #' Poss = FGA + 0.44 * FTA - ORB + TOV
  
  poss <- fga + 0.44 * fta - orb + tov
  return(pmax(poss, 1))  # Avoid division by zero
}


standardize_column_names <- function(df) {
  #' Standardize column names across different wehoop formats
  #' Convert camelCase to snake_case
  
  column_mapping <- c(
    # Stats
    "fieldGoalsMade" = "field_goals_made",
    "fieldGoalsAttempted" = "field_goals_attempted",
    "threePointFieldGoalsMade" = "three_point_field_goals_made",
    "threePointFieldGoalsAttempted" = "three_point_field_goals_attempted",
    "freeThrowsMade" = "free_throws_made",
    "freeThrowsAttempted" = "free_throws_attempted",
    "offensiveRebounds" = "offensive_rebounds",
    "defensiveRebounds" = "defensive_rebounds",
    "totalRebounds" = "total_rebounds",
    "assists" = "assists",
    "steals" = "steals",
    "blocks" = "blocks",
    "turnovers" = "turnovers",
    "personalFouls" = "fouls",
    "points" = "pts",
    "teamScore" = "team_score",
    # Identifiers
    "gameId" = "game_id",
    "teamId" = "team_id",
    "athleteId" = "athlete_id",
    "playerId" = "player_id",
    "teamDisplayName" = "team_name",
    "athleteDisplayName" = "player_name"
  )
  
  # Rename columns if they exist
  for (old_name in names(column_mapping)) {
    if (old_name %in% names(df)) {
      names(df)[names(df) == old_name] <- column_mapping[[old_name]]
    }
  }
  
  return(df)
}


add_four_factors <- function(df) {
  #' Calculate Four Factors and efficiency metrics
  
  cat("\n[METRICS] Calculating Four Factors...\n")
  
  df <- standardize_column_names(df)
  
  # Ensure numeric columns
  numeric_cols <- c(
    "field_goals_made", "field_goals_attempted",
    "three_point_field_goals_made", "three_point_field_goals_attempted",
    "free_throws_made", "free_throws_attempted",
    "offensive_rebounds", "defensive_rebounds", "total_rebounds",
    "assists", "steals", "blocks", "turnovers"
  )
  
  for (col in numeric_cols) {
    if (col %in% names(df)) {
      df[[col]] <- as.numeric(df[[col]])
      df[[col]][is.na(df[[col]])] <- 0
    }
  }
  
  # Handle points
  if ("team_score" %in% names(df)) {
    df$pts <- as.numeric(df$team_score)
  } else if ("points" %in% names(df)) {
    df$pts <- as.numeric(df$points)
  } else {
    df$pts <- df$field_goals_made + df$three_point_field_goals_made + df$free_throws_made
  }
  df$pts[is.na(df$pts)] <- 0
  
  # Shorthand columns
  df$fgm <- df$field_goals_made
  df$fga <- df$field_goals_attempted
  df$fg3m <- df$three_point_field_goals_made
  df$fg3a <- df$three_point_field_goals_attempted
  df$ftm <- df$free_throws_made
  df$fta <- df$free_throws_attempted
  df$orb <- df$offensive_rebounds
  df$drb <- df$defensive_rebounds
  df$tov <- df$turnovers
  df$ast <- df$assists
  df$stl <- df$steals
  df$blk <- df$blocks
  
  # Possessions
  df$poss_est <- calculate_possessions(df$fga, df$fta, df$orb, df$tov)
  
  # === FOUR FACTORS ===
  
  # 1. Effective Field Goal %
  df$efg_pct <- ifelse(df$fga > 0, (df$fgm + 0.5 * df$fg3m) / df$fga, 0)
  
  # 2. Turnover %
  df$tov_pct <- ifelse(df$poss_est > 0, df$tov / df$poss_est, 0)
  
  # 3. Free Throw Rate
  df$ftr <- ifelse(df$fga > 0, df$fta / df$fga, 0)
  
  # === SHOOTING EFFICIENCY ===
  
  # True Shooting %
  df$ts_pct <- ifelse(
    (df$fga + 0.44 * df$fta) > 0,
    df$pts / (2 * (df$fga + 0.44 * df$fta)),
    0
  )
  
  # 2-Point %
  df$fg2m <- df$fgm - df$fg3m
  df$fg2a <- df$fga - df$fg3a
  df$fg2_pct <- ifelse(df$fg2a > 0, df$fg2m / df$fg2a, 0)
  
  # 3-Point %
  df$fg3_pct <- ifelse(df$fg3a > 0, df$fg3m / df$fg3a, 0)
  
  # Free Throw %
  df$ft_pct <- ifelse(df$fta > 0, df$ftm / df$fta, 0)
  
  # 3-Point Attempt Rate
  df$fg3ar <- ifelse(df$fga > 0, df$fg3a / df$fga, 0)
  
  # === EFFICIENCY RATINGS ===
  
  # Offensive Rating
  df$ortg <- ifelse(df$poss_est > 0, 100 * df$pts / df$poss_est, 0)
  
  # === PLAYMAKING ===
  
  # Assist Rate
  df$ast_rate <- ifelse(df$fgm > 0, df$ast / df$fgm, 0)
  
  # Assist-to-Turnover Ratio
  df$ast_tov <- ifelse(df$tov > 0, df$ast / df$tov, 0)
  
  cat("  ✓ Calculated core metrics\n")
  
  return(df)
}


add_opponent_metrics <- function(df) {
  #' Add opponent-adjusted metrics (OREB%, DREB%, DRtg)
  
  cat("\n[METRICS] Calculating opponent-adjusted metrics...\n")
  
  if (!"game_id" %in% names(df)) {
    cat("  ⚠ Skipping - no game_id column for opponent matching\n")
    return(df)
  }
  
  # Required columns
  opp_cols <- c("game_id", "team_id", "pts", "poss_est", "orb", "drb")
  
  if (all(opp_cols %in% names(df))) {
    # Create opponent dataframe
    opp_df <- df %>%
      select(all_of(opp_cols)) %>%
      rename_with(~ paste0("opp_", .), .cols = -c(game_id)) %>%
      rename(opp_team_id = opp_team_id)
    
    # Self-join to get opponent stats
    df_with_opp <- df %>%
      left_join(opp_df, by = "game_id") %>%
      filter(team_id != opp_team_id)
    
    # 4. Offensive Rebound %
    df_with_opp$oreb_pct <- ifelse(
      (df_with_opp$orb + df_with_opp$opp_drb) > 0,
      df_with_opp$orb / (df_with_opp$orb + df_with_opp$opp_drb),
      0
    )
    
    # Defensive Rebound %
    df_with_opp$dreb_pct <- ifelse(
      (df_with_opp$drb + df_with_opp$opp_orb) > 0,
      df_with_opp$drb / (df_with_opp$drb + df_with_opp$opp_orb),
      0
    )
    
    # Defensive Rating
    df_with_opp$drtg <- ifelse(
      df_with_opp$opp_poss_est > 0,
      100 * df_with_opp$opp_pts / df_with_opp$opp_poss_est,
      0
    )
    
    # Net Rating
    df_with_opp$net_rtg <- df_with_opp$ortg - df_with_opp$drtg
    
    cat("  ✓ Added opponent-adjusted metrics (OREB%, DREB%, DRtg, NetRtg)\n")
    return(df_with_opp)
  } else {
    cat("  ⚠ Missing required columns for opponent metrics\n")
    return(df)
  }
}


# ============================================================================
# FILTER TO ACES ONLY
# ============================================================================

filter_to_aces <- function(df, data_type) {
  #' Filter dataframe to Las Vegas Aces games only
  
  if (nrow(df) == 0) {
    return(df)
  }
  
  cat("\n[FILTER] Filtering", data_type, "to Aces only...\n")
  cat("  Before:", nrow(df), "rows\n")
  
  # Try different team_id column names
  team_col <- NULL
  if ("team_id" %in% names(df)) {
    team_col <- "team_id"
  } else if ("team_team_id" %in% names(df)) {
    team_col <- "team_team_id"
  }
  
  if (!is.null(team_col)) {
    # Convert to string for comparison
    df[[team_col]] <- as.character(df[[team_col]])
    df_aces <- df %>% filter(.data[[team_col]] == TEAM_ID)
    
    cat("  After:", nrow(df_aces), "rows (", 
        round(nrow(df_aces) / nrow(df) * 100, 1), "%)\n", sep = "")
    return(df_aces)
  } else {
    cat("  ⚠ Could not find team_id column - keeping all rows\n")
    return(df)
  }
}


# ============================================================================
# VALIDATION
# ============================================================================

validate_metrics <- function(df, data_type) {
  #' Run basic validation checks on calculated metrics
  
  if (nrow(df) == 0) {
    return(invisible(NULL))
  }
  
  cat("\n[VALIDATION]", data_type, ":\n")
  
  # Check for reasonable ranges
  checks <- list(
    list(metric = "efg_pct", min = 0, max = 1, msg = "eFG% should be 0-1"),
    list(metric = "ts_pct", min = 0, max = 1, msg = "TS% should be 0-1"),
    list(metric = "tov_pct", min = 0, max = 0.5, msg = "TOV% should be 0-0.5"),
    list(metric = "ortg", min = 50, max = 150, msg = "ORtg should be 50-150")
  )
  
  for (check in checks) {
    if (check$metric %in% names(df)) {
      valid <- df[[check$metric]] >= check$min & df[[check$metric]] <= check$max
      pct_valid <- sum(valid, na.rm = TRUE) / nrow(df) * 100
      
      if (pct_valid < 95) {
        cat("  ⚠", check$metric, ":", round(pct_valid, 1), "% in valid range (", check$msg, ")\n", sep = "")
      } else {
        cat("  ✓", check$metric, ":", round(pct_valid, 1), "% valid\n", sep = "")
      }
      
      # Show sample values
      metric_min <- min(df[[check$metric]], na.rm = TRUE)
      metric_max <- max(df[[check$metric]], na.rm = TRUE)
      metric_mean <- mean(df[[check$metric]], na.rm = TRUE)
      
      cat("    Range:", round(metric_min, 3), "-", round(metric_max, 3), 
          ", Mean:", round(metric_mean, 3), "\n")
    }
  }
}


generate_summary_report <- function(team_box, player_box, schedule) {
  #' Generate summary report of loaded data
  
  cat("\n", paste0(rep("=", 70), collapse = ""), "\n", sep = "")
  cat("DATA SUMMARY REPORT\n")
  cat(paste0(rep("=", 70), collapse = ""), "\n")
  
  # Team box
  if (nrow(team_box) > 0) {
    cat("Team Box Scores:  ", nrow(team_box), " games\n", sep = "")
    if ("game_date" %in% names(team_box)) {
      cat("  Date Range:", min(team_box$game_date, na.rm = TRUE), "to", 
          max(team_box$game_date, na.rm = TRUE), "\n")
    }
  } else {
    cat("Team Box Scores:   NOT LOADED\n")
  }
  
  # Player box
  if (nrow(player_box) > 0) {
    cat("Player Box Scores:", nrow(player_box), " player-games\n", sep = "")
    if ("player_name" %in% names(player_box)) {
      cat("  Unique Players:", length(unique(player_box$player_name)), "\n")
    }
  } else {
    cat("Player Box Scores: NOT LOADED\n")
  }
  
  # Schedule
  if (nrow(schedule) > 0) {
    cat("Schedule:         ", nrow(schedule), " games\n", sep = "")
  } else {
    cat("Schedule:          NOT LOADED\n")
  }
  
  cat(paste0(rep("=", 70), collapse = ""), "\n")
}


# ============================================================================
# MAIN EXECUTION
# ============================================================================

main <- function() {
  #' Main execution function
  
  cat("\nStarted:", format(Sys.time(), "%Y-%m-%d %H:%M:%S"), "\n\n")
  
  all_team_box <- list()
  all_player_box <- list()
  all_schedule <- list()
  
  for (season in SEASONS) {
    cat("\n", paste0(rep("=", 70), collapse = ""), "\n", sep = "")
    cat("PROCESSING SEASON", season, "\n")
    cat(paste0(rep("=", 70), collapse = ""), "\n")
    
    # Load data
    team_box <- load_wnba_team_box(season)
    player_box <- load_wnba_player_box(season)
    schedule <- load_wnba_schedule(season)
    
    # Inspect structure
    inspect_dataframe(team_box, paste("Team Box", season))
    inspect_dataframe(player_box, paste("Player Box", season))
    
    # Filter to Aces
    team_box_aces <- filter_to_aces(team_box, "team_box")
    player_box_aces <- filter_to_aces(player_box, "player_box")
    
    # Calculate metrics
    if (nrow(team_box_aces) > 0) {
      team_box_aces <- add_four_factors(team_box_aces)
      team_box_aces <- add_opponent_metrics(team_box_aces)
      validate_metrics(team_box_aces, "Team Metrics")
    }
    
    if (nrow(player_box_aces) > 0) {
      player_box_aces <- add_four_factors(player_box_aces)
      validate_metrics(player_box_aces, "Player Metrics")
    }
    
    # Append to master lists
    all_team_box[[as.character(season)]] <- team_box_aces
    all_player_box[[as.character(season)]] <- player_box_aces
    all_schedule[[as.character(season)]] <- schedule
  }
  
  # Combine seasons
  cat("\n", paste0(rep("=", 70), collapse = ""), "\n", sep = "")
  cat("COMBINING SEASONS\n")
  cat(paste0(rep("=", 70), collapse = ""), "\n")
  
  team_box_combined <- bind_rows(all_team_box)
  player_box_combined <- bind_rows(all_player_box)
  schedule_combined <- bind_rows(all_schedule)
  
  # Save to master directory
  if (nrow(team_box_combined) > 0) {
    filepath <- file.path(MASTER_DIR, "aces_team_box_wehoop.parquet")
    arrow::write_parquet(team_box_combined, filepath)
    cat("\n✓ Saved:", filepath, "(", nrow(team_box_combined), " rows)\n", sep = "")
  }
  
  if (nrow(player_box_combined) > 0) {
    filepath <- file.path(MASTER_DIR, "aces_player_box_wehoop.parquet")
    arrow::write_parquet(player_box_combined, filepath)
    cat("✓ Saved:", filepath, "(", nrow(player_box_combined), " rows)\n", sep = "")
  }
  
  if (nrow(schedule_combined) > 0) {
    filepath <- file.path(MASTER_DIR, "aces_schedule_wehoop.parquet")
    arrow::write_parquet(schedule_combined, filepath)
    cat("✓ Saved:", filepath, "(", nrow(schedule_combined), " rows)\n", sep = "")
  }
  
  # Generate summary
  generate_summary_report(team_box_combined, player_box_combined, schedule_combined)
  
  cat("\nCompleted:", format(Sys.time(), "%Y-%m-%d %H:%M:%S"), "\n")
  
  cat("\n", paste0(rep("=", 70), collapse = ""), "\n", sep = "")
  cat("NEXT STEPS\n")
  cat(paste0(rep("=", 70), collapse = ""), "\n")
  cat("1. Check data/master/ for output files\n")
  cat("2. Validate metrics against ESPN box scores (spot check 3 games)\n")
  cat("3. If successful, proceed to pbpstats integration\n")
  cat("4. If errors, check column names in inspection output above\n")
  cat(paste0(rep("=", 70), collapse = ""), "\n\n")
}

# Run main function
main()
