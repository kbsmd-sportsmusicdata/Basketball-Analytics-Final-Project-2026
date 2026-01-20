"""
Las Vegas Aces - wehoop Data Pull (WNBA)
========================================
Pulls WNBA box scores from wehoop GitHub releases for 2024-2025 seasons.
Tests data availability and calculates Dean Oliver metrics.

Run this first to validate wehoop data before integrating pbpstats.

Author: Krystal
Last Updated: 2026-01-06
"""

import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path
import warnings

warnings.filterwarnings('ignore')

# ============================================================================
# CONFIGURATION
# ============================================================================

# Team configuration
TEAM_ID = "16"  # Las Vegas Aces team_id
TEAM_NAME = "Las Vegas Aces"
TEAM_ABBREV = "LV"
SEASONS = [2024, 2025]

# Data paths
DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw" / "wehoop"
PROCESSED_DIR = DATA_DIR / "processed" / "wehoop"
MASTER_DIR = DATA_DIR / "master"

# Create directories
for dir_path in [RAW_DIR, PROCESSED_DIR, MASTER_DIR]:
    dir_path.mkdir(parents=True, exist_ok=True)

# wehoop GitHub releases
WEHOOP_BASE = "https://github.com/sportsdataverse/wehoop-data/releases/download"

# Try multiple URL patterns (wehoop structure has changed over time)
WEHOOP_PATTERNS = {
    'team_box': [
        "{base}/wnba_team_box/wnba_team_box_{season}.parquet",
        "{base}/espn_wnba_team_boxscore/team_box_{season}.parquet",
    ],
    'player_box': [
        "{base}/wnba_player_box/wnba_player_box_{season}.parquet",
        "{base}/espn_wnba_player_boxscore/player_box_{season}.parquet",
    ],
    'schedule': [
        "{base}/wnba_schedule/wnba_schedule_{season}.parquet",
        "{base}/espn_wnba_schedule/schedule_{season}.parquet",
    ]
}

print(f"""
{'='*70}
LAS VEGAS ACES - WEHOOP DATA PULL
{'='*70}
Target Seasons: {SEASONS}
Data Source: wehoop WNBA releases
Team: {TEAM_NAME} (ID: {TEAM_ID})
{'='*70}
""")


# ============================================================================
# DATA LOADING FUNCTIONS
# ============================================================================

def try_load_parquet(url_patterns, season, data_type):
    """
    Try multiple URL patterns to load data.
    wehoop sometimes changes their release structure.
    """
    for pattern in url_patterns:
        url = pattern.format(base=WEHOOP_BASE, season=season)
        try:
            print(f"  Trying: {url}")
            df = pd.read_parquet(url)
            print(f"  ✓ SUCCESS - Loaded {len(df):,} rows")
            return df, url
        except Exception as e:
            print(f"  ✗ Failed: {str(e)[:100]}")
            continue
    
    print(f"  ✗ ERROR: Could not load {data_type} for {season}")
    return pd.DataFrame(), None


def load_wnba_team_box(season):
    """Load WNBA team box scores from wehoop."""
    print(f"\n[{season}] Loading team box scores...")
    df, url = try_load_parquet(WEHOOP_PATTERNS['team_box'], season, 'team_box')
    
    if not df.empty:
        # Save raw data
        raw_file = RAW_DIR / f"team_box_{season}_raw.parquet"
        df.to_parquet(raw_file, index=False)
        print(f"  → Saved raw data: {raw_file}")
    
    return df


def load_wnba_player_box(season):
    """Load WNBA player box scores from wehoop."""
    print(f"\n[{season}] Loading player box scores...")
    df, url = try_load_parquet(WEHOOP_PATTERNS['player_box'], season, 'player_box')
    
    if not df.empty:
        # Save raw data
        raw_file = RAW_DIR / f"player_box_{season}_raw.parquet"
        df.to_parquet(raw_file, index=False)
        print(f"  → Saved raw data: {raw_file}")
    
    return df


def load_wnba_schedule(season):
    """Load WNBA schedule from wehoop."""
    print(f"\n[{season}] Loading schedule...")
    df, url = try_load_parquet(WEHOOP_PATTERNS['schedule'], season, 'schedule')
    
    if not df.empty:
        # Save raw data
        raw_file = RAW_DIR / f"schedule_{season}_raw.parquet"
        df.to_parquet(raw_file, index=False)
        print(f"  → Saved raw data: {raw_file}")
    
    return df


def inspect_dataframe(df, name):
    """Print helpful info about dataframe structure."""
    if df.empty:
        print(f"\n[INSPECTION] {name}: EMPTY")
        return
    
    print(f"\n[INSPECTION] {name}:")
    print(f"  Rows: {len(df):,}")
    print(f"  Columns: {len(df.columns)}")
    print(f"  \nFirst few columns:")
    for col in df.columns[:10]:
        print(f"    - {col}: {df[col].dtype}")
    
    # Check for team_id column
    if 'team_id' in df.columns:
        print(f"  \nUnique team_ids: {df['team_id'].nunique()}")
        print(f"  Team IDs present: {sorted(df['team_id'].unique())[:5]}...")
    elif 'team_team_id' in df.columns:
        print(f"  \nUnique team_team_id: {df['team_team_id'].nunique()}")
    
    # Check for game_id column
    if 'game_id' in df.columns:
        print(f"  Unique game_ids: {df['game_id'].nunique()}")
    
    print(f"  \nSample row:")
    print(df.head(1).T)


# ============================================================================
# DEAN OLIVER METRICS
# ============================================================================

def calculate_possessions(row):
    """
    Dean Oliver possession estimate.
    Poss = FGA + 0.44 * FTA - ORB + TOV
    """
    # Try multiple column name patterns
    fga = row.get('field_goals_attempted', 
                  row.get('fieldGoalsAttempted',
                  row.get('fga', 0))) or 0
    fta = row.get('free_throws_attempted',
                  row.get('freeThrowsAttempted', 
                  row.get('fta', 0))) or 0
    orb = row.get('offensive_rebounds',
                  row.get('offensiveRebounds',
                  row.get('orb', 0))) or 0
    tov = row.get('turnovers',
                  row.get('total_turnovers',
                  row.get('tov', 0))) or 0
    
    return max(float(fga) + 0.44 * float(fta) - float(orb) + float(tov), 1)


def standardize_column_names(df):
    """
    Standardize column names across different wehoop formats.
    Convert camelCase or mixed formats to snake_case.
    """
    column_mapping = {
        # Stats
        'fieldGoalsMade': 'field_goals_made',
        'fieldGoalsAttempted': 'field_goals_attempted',
        'threePointFieldGoalsMade': 'three_point_field_goals_made',
        'threePointFieldGoalsAttempted': 'three_point_field_goals_attempted',
        'freeThrowsMade': 'free_throws_made',
        'freeThrowsAttempted': 'free_throws_attempted',
        'offensiveRebounds': 'offensive_rebounds',
        'defensiveRebounds': 'defensive_rebounds',
        'totalRebounds': 'total_rebounds',
        'assists': 'assists',
        'steals': 'steals',
        'blocks': 'blocks',
        'turnovers': 'turnovers',
        'personalFouls': 'fouls',
        'points': 'pts',
        'teamScore': 'team_score',
        
        # Identifiers
        'gameId': 'game_id',
        'teamId': 'team_id',
        'athleteId': 'athlete_id',
        'playerId': 'player_id',
        'teamDisplayName': 'team_name',
        'athleteDisplayName': 'player_name',
    }
    
    df = df.rename(columns=column_mapping)
    return df


def add_four_factors(df):
    """
    Calculate Four Factors and efficiency metrics.
    Works with team or player box score data.
    """
    print("\n[METRICS] Calculating Four Factors...")
    
    df = df.copy()
    df = standardize_column_names(df)
    
    # Ensure numeric columns
    numeric_cols = [
        'field_goals_made', 'field_goals_attempted',
        'three_point_field_goals_made', 'three_point_field_goals_attempted',
        'free_throws_made', 'free_throws_attempted',
        'offensive_rebounds', 'defensive_rebounds', 'total_rebounds',
        'assists', 'steals', 'blocks', 'turnovers'
    ]
    
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Handle points (multiple possible columns)
    if 'team_score' in df.columns:
        df['pts'] = pd.to_numeric(df['team_score'], errors='coerce').fillna(0)
    elif 'points' in df.columns:
        df['pts'] = pd.to_numeric(df['points'], errors='coerce').fillna(0)
    else:
        # Calculate from FG + FT if not present
        df['pts'] = (df['field_goals_made'] + 
                     df['three_point_field_goals_made'] + 
                     df['free_throws_made'])
    
    # Shorthand columns
    df['fgm'] = df['field_goals_made']
    df['fga'] = df['field_goals_attempted']
    df['fg3m'] = df['three_point_field_goals_made']
    df['fg3a'] = df['three_point_field_goals_attempted']
    df['ftm'] = df['free_throws_made']
    df['fta'] = df['free_throws_attempted']
    df['orb'] = df['offensive_rebounds']
    df['drb'] = df['defensive_rebounds']
    df['tov'] = df['turnovers']
    df['ast'] = df['assists']
    df['stl'] = df['steals']
    df['blk'] = df['blocks']
    
    # Possessions
    df['poss_est'] = df.apply(calculate_possessions, axis=1)
    
    # === FOUR FACTORS ===
    
    # 1. Effective Field Goal %
    df['efg_pct'] = np.where(
        df['fga'] > 0,
        (df['fgm'] + 0.5 * df['fg3m']) / df['fga'],
        0
    )
    
    # 2. Turnover %
    df['tov_pct'] = np.where(
        df['poss_est'] > 0,
        df['tov'] / df['poss_est'],
        0
    )
    
    # 3. Free Throw Rate
    df['ftr'] = np.where(
        df['fga'] > 0,
        df['fta'] / df['fga'],
        0
    )
    
    # === SHOOTING EFFICIENCY ===
    
    # True Shooting %
    df['ts_pct'] = np.where(
        (df['fga'] + 0.44 * df['fta']) > 0,
        df['pts'] / (2 * (df['fga'] + 0.44 * df['fta'])),
        0
    )
    
    # 2-Point %
    df['fg2m'] = df['fgm'] - df['fg3m']
    df['fg2a'] = df['fga'] - df['fg3a']
    df['fg2_pct'] = np.where(df['fg2a'] > 0, df['fg2m'] / df['fg2a'], 0)
    
    # 3-Point %
    df['fg3_pct'] = np.where(df['fg3a'] > 0, df['fg3m'] / df['fg3a'], 0)
    
    # Free Throw %
    df['ft_pct'] = np.where(df['fta'] > 0, df['ftm'] / df['fta'], 0)
    
    # 3-Point Attempt Rate
    df['fg3ar'] = np.where(df['fga'] > 0, df['fg3a'] / df['fga'], 0)
    
    # === EFFICIENCY RATINGS ===
    
    # Offensive Rating
    df['ortg'] = np.where(
        df['poss_est'] > 0,
        100 * df['pts'] / df['poss_est'],
        0
    )
    
    # === PLAYMAKING ===
    
    # Assist Rate
    df['ast_rate'] = np.where(df['fgm'] > 0, df['ast'] / df['fgm'], 0)
    
    # Assist-to-Turnover Ratio
    df['ast_tov'] = np.where(df['tov'] > 0, df['ast'] / df['tov'], 0)
    
    print(f"  ✓ Calculated {len([c for c in df.columns if c in ['efg_pct', 'tov_pct', 'ftr', 'ts_pct', 'ortg']])} core metrics")
    
    return df


def add_opponent_metrics(df):
    """
    Add opponent-adjusted metrics (OREB%, DREB%, DRtg).
    Requires team-level data with game_id.
    """
    print("\n[METRICS] Calculating opponent-adjusted metrics...")
    
    if 'game_id' not in df.columns:
        print("  ⚠ Skipping - no game_id column for opponent matching")
        return df
    
    df = df.copy()
    
    # Create opponent dataframe
    opp_cols = ['game_id', 'team_id', 'pts', 'poss_est', 'orb', 'drb']
    
    if all(col in df.columns for col in opp_cols):
        # Self-join to get opponent stats
        opp_df = df[opp_cols].copy()
        opp_df.columns = ['game_id', 'opp_team_id'] + ['opp_' + col for col in opp_cols[2:]]
        
        # Merge - for each team's row, get the OTHER team in the same game
        df_with_opp = df.merge(
            opp_df,
            on='game_id',
            how='left'
        )
        
        # Filter to get actual opponent (not self)
        df_with_opp = df_with_opp[df_with_opp['team_id'] != df_with_opp['opp_team_id']]
        
        # 4. Offensive Rebound %
        df_with_opp['oreb_pct'] = np.where(
            (df_with_opp['orb'] + df_with_opp['opp_drb']) > 0,
            df_with_opp['orb'] / (df_with_opp['orb'] + df_with_opp['opp_drb']),
            0
        )
        
        # Defensive Rebound %
        df_with_opp['dreb_pct'] = np.where(
            (df_with_opp['drb'] + df_with_opp['opp_orb']) > 0,
            df_with_opp['drb'] / (df_with_opp['drb'] + df_with_opp['opp_orb']),
            0
        )
        
        # Defensive Rating
        df_with_opp['drtg'] = np.where(
            df_with_opp['opp_poss_est'] > 0,
            100 * df_with_opp['opp_pts'] / df_with_opp['opp_poss_est'],
            0
        )
        
        # Net Rating
        df_with_opp['net_rtg'] = df_with_opp['ortg'] - df_with_opp['drtg']
        
        print(f"  ✓ Added opponent metrics (OREB%, DREB%, DRtg, NetRtg)")
        return df_with_opp
    else:
        print(f"  ⚠ Missing required columns for opponent metrics")
        return df


# ============================================================================
# FILTER TO ACES ONLY
# ============================================================================

def filter_to_aces(df, data_type):
    """Filter dataframe to Las Vegas Aces games only."""
    if df.empty:
        return df
    
    print(f"\n[FILTER] Filtering {data_type} to Aces only...")
    print(f"  Before: {len(df):,} rows")
    
    # Try different team_id column names
    team_col = None
    if 'team_id' in df.columns:
        team_col = 'team_id'
    elif 'team_team_id' in df.columns:
        team_col = 'team_team_id'
    
    if team_col:
        # Convert to string for comparison
        df[team_col] = df[team_col].astype(str)
        df_aces = df[df[team_col] == TEAM_ID].copy()
        print(f"  After: {len(df_aces):,} rows ({len(df_aces) / len(df) * 100:.1f}%)")
        return df_aces
    else:
        print(f"  ⚠ Could not find team_id column - keeping all rows")
        return df


# ============================================================================
# VALIDATION
# ============================================================================

def validate_metrics(df, data_type):
    """Run basic validation checks on calculated metrics."""
    if df.empty:
        return
    
    print(f"\n[VALIDATION] {data_type}:")
    
    # Check for reasonable ranges
    checks = {
        'efg_pct': (0, 1, "eFG% should be 0-1"),
        'ts_pct': (0, 1, "TS% should be 0-1"),
        'tov_pct': (0, 0.5, "TOV% should be 0-0.5"),
        'ortg': (50, 150, "ORtg should be 50-150"),
    }
    
    for metric, (min_val, max_val, msg) in checks.items():
        if metric in df.columns:
            valid = df[metric].between(min_val, max_val, inclusive='both')
            pct_valid = valid.sum() / len(df) * 100
            
            if pct_valid < 95:
                print(f"  ⚠ {metric}: {pct_valid:.1f}% in valid range ({msg})")
            else:
                print(f"  ✓ {metric}: {pct_valid:.1f}% valid")
                
            # Show sample values
            print(f"    Range: {df[metric].min():.3f} - {df[metric].max():.3f}, Mean: {df[metric].mean():.3f}")


def generate_summary_report(team_box, player_box, schedule):
    """Generate summary report of loaded data."""
    print(f"\n{'='*70}")
    print("DATA SUMMARY REPORT")
    print(f"{'='*70}")
    
    report = []
    
    # Team box
    if not team_box.empty:
        report.append(f"Team Box Scores:   {len(team_box):,} games")
        if 'game_date' in team_box.columns:
            report.append(f"  Date Range: {team_box['game_date'].min()} to {team_box['game_date'].max()}")
    else:
        report.append("Team Box Scores:   NOT LOADED")
    
    # Player box
    if not player_box.empty:
        report.append(f"Player Box Scores: {len(player_box):,} player-games")
        if 'player_name' in player_box.columns:
            report.append(f"  Unique Players: {player_box['player_name'].nunique()}")
    else:
        report.append("Player Box Scores: NOT LOADED")
    
    # Schedule
    if not schedule.empty:
        report.append(f"Schedule:          {len(schedule):,} games")
    else:
        report.append("Schedule:          NOT LOADED")
    
    for line in report:
        print(line)
    
    print(f"{'='*70}")


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Main execution function."""
    print(f"\nStarted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    all_team_box = []
    all_player_box = []
    all_schedule = []
    
    for season in SEASONS:
        print(f"\n{'='*70}")
        print(f"PROCESSING SEASON {season}")
        print(f"{'='*70}")
        
        # Load data
        team_box = load_wnba_team_box(season)
        player_box = load_wnba_player_box(season)
        schedule = load_wnba_schedule(season)
        
        # Inspect structure (helps with debugging)
        inspect_dataframe(team_box, f"Team Box {season}")
        inspect_dataframe(player_box, f"Player Box {season}")
        
        # Filter to Aces
        team_box_aces = filter_to_aces(team_box, "team_box")
        player_box_aces = filter_to_aces(player_box, "player_box")
        
        # Calculate metrics
        if not team_box_aces.empty:
            team_box_aces = add_four_factors(team_box_aces)
            team_box_aces = add_opponent_metrics(team_box_aces)
            validate_metrics(team_box_aces, "Team Metrics")
        
        if not player_box_aces.empty:
            player_box_aces = add_four_factors(player_box_aces)
            validate_metrics(player_box_aces, "Player Metrics")
        
        # Append to master lists
        all_team_box.append(team_box_aces)
        all_player_box.append(player_box_aces)
        all_schedule.append(schedule)
    
    # Combine seasons
    print(f"\n{'='*70}")
    print("COMBINING SEASONS")
    print(f"{'='*70}")
    
    team_box_combined = pd.concat(all_team_box, ignore_index=True) if any(not df.empty for df in all_team_box) else pd.DataFrame()
    player_box_combined = pd.concat(all_player_box, ignore_index=True) if any(not df.empty for df in all_player_box) else pd.DataFrame()
    schedule_combined = pd.concat(all_schedule, ignore_index=True) if any(not df.empty for df in all_schedule) else pd.DataFrame()
    
    # Save to master directory
    if not team_box_combined.empty:
        filepath = MASTER_DIR / "aces_team_box_wehoop.parquet"
        team_box_combined.to_parquet(filepath, index=False)
        print(f"\n✓ Saved: {filepath} ({len(team_box_combined):,} rows)")
    
    if not player_box_combined.empty:
        filepath = MASTER_DIR / "aces_player_box_wehoop.parquet"
        player_box_combined.to_parquet(filepath, index=False)
        print(f"✓ Saved: {filepath} ({len(player_box_combined):,} rows)")
    
    if not schedule_combined.empty:
        filepath = MASTER_DIR / "aces_schedule_wehoop.parquet"
        schedule_combined.to_parquet(filepath, index=False)
        print(f"✓ Saved: {filepath} ({len(schedule_combined):,} rows)")
    
    # Generate summary
    generate_summary_report(team_box_combined, player_box_combined, schedule_combined)
    
    print(f"\nCompleted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    print(f"""
{'='*70}
NEXT STEPS
{'='*70}
1. Check data/master/ for output files
2. Validate metrics against ESPN box scores (spot check 3 games)
3. If successful, proceed to pbpstats integration
4. If errors, check column names in inspection output above
{'='*70}
    """)


if __name__ == "__main__":
    main()
