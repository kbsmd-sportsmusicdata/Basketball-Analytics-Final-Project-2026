"""
Las Vegas Aces Master Dataset Builder
======================================
Combines wehoop WNBA data with pbpstats.com advanced metrics for dual-purpose project:
1. Academic Final Project (coaching focus)
2. Portfolio Case Study (front office focus)

Data Sources:
- wehoop: Box scores, team stats, player stats
- pbpstats.com: Lineup data, shot location, Four Factors by game

Author: Krystal
Last Updated: 2026-01-06
"""

import pandas as pd
import numpy as np
import requests
from datetime import datetime
from pathlib import Path
import json
import warnings

warnings.filterwarnings('ignore')

# ============================================================================
# CONFIGURATION
# ============================================================================

# Team configuration
TEAM_ID = "16"  # Las Vegas Aces team_id in wehoop
TEAM_ABBREV = "LV"
SEASONS = [2024, 2025]  # Pull both years

# Data paths
DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
MASTER_DIR = DATA_DIR / "master"

# Create directories
for dir_path in [RAW_DIR, PROCESSED_DIR, MASTER_DIR]:
    dir_path.mkdir(parents=True, exist_ok=True)

# wehoop GitHub releases (WNBA data)
WEHOOP_BASE = "https://github.com/sportsdataverse/wehoop-wnba-data/releases/download"

# pbpstats.com API endpoints
PBPSTATS_BASE = "https://api.pbpstats.com"
PBPSTATS_ENDPOINTS = {
    "lineups": f"{PBPSTATS_BASE}/get-lineups/wnba",
    "shots": f"{PBPSTATS_BASE}/get-shots/wnba",
    "game_logs": f"{PBPSTATS_BASE}/get-game-logs/wnba",
}

print(f"""
{'='*70}
LAS VEGAS ACES MASTER DATASET BUILDER
{'='*70}
Target Seasons: {SEASONS}
Data Sources: wehoop + pbpstats.com
Output: Unified master dataset + analysis-specific subsets
{'='*70}
""")


# ============================================================================
# PART 1: WEHOOP DATA PULL (Box Scores Foundation)
# ============================================================================

def load_wnba_team_box(season):
    """Load WNBA team box scores from wehoop."""
    url = f"{WEHOOP_BASE}/wnba_team_box/wnba_team_box_{season}.parquet"
    print(f"\n[1.1] Loading WNBA team box scores ({season})...")
    print(f"      URL: {url}")
    
    try:
        df = pd.read_parquet(url)
        print(f"      ✓ Loaded {len(df):,} team-game records")
        return df
    except Exception as e:
        print(f"      ✗ ERROR: {e}")
        return pd.DataFrame()


def load_wnba_player_box(season):
    """Load WNBA player box scores from wehoop."""
    url = f"{WEHOOP_BASE}/wnba_player_box/wnba_player_box_{season}.parquet"
    print(f"\n[1.2] Loading WNBA player box scores ({season})...")
    print(f"      URL: {url}")
    
    try:
        df = pd.read_parquet(url)
        print(f"      ✓ Loaded {len(df):,} player-game records")
        return df
    except Exception as e:
        print(f"      ✗ ERROR: {e}")
        return pd.DataFrame()


def load_wnba_schedule(season):
    """Load WNBA schedule data from wehoop."""
    url = f"{WEHOOP_BASE}/wnba_schedule/wnba_schedule_{season}.parquet"
    print(f"\n[1.3] Loading WNBA schedule ({season})...")
    print(f"      URL: {url}")
    
    try:
        df = pd.read_parquet(url)
        print(f"      ✓ Loaded {len(df):,} scheduled games")
        return df
    except Exception as e:
        print(f"      ✗ ERROR: {e}")
        return pd.DataFrame()


# ============================================================================
# PART 2: DEAN OLIVER METRICS (Foundation Layer)
# ============================================================================

def calculate_possessions(row):
    """
    Dean Oliver possession estimate.
    Poss = FGA + 0.44 * FTA - ORB + TOV
    """
    fga = float(row.get('field_goals_attempted', 0) or 0)
    fta = float(row.get('free_throws_attempted', 0) or 0)
    orb = float(row.get('offensive_rebounds', 0) or 0)
    tov = float(row.get('turnovers', 0) or row.get('total_turnovers', 0) or 0)
    
    return max(fga + 0.44 * fta - orb + tov, 1)


def add_four_factors_metrics(df):
    """
    Calculate Four Factors + efficiency metrics.
    Returns dataframe with additional columns.
    """
    print("\n[2.1] Calculating Four Factors + efficiency metrics...")
    
    df = df.copy()
    
    # Ensure numeric columns
    numeric_cols = [
        'field_goals_made', 'field_goals_attempted',
        'three_point_field_goals_made', 'three_point_field_goals_attempted',
        'free_throws_made', 'free_throws_attempted',
        'offensive_rebounds', 'defensive_rebounds', 'total_rebounds',
        'assists', 'steals', 'blocks', 'turnovers', 'team_score'
    ]
    
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Shorthand columns
    df['pts'] = df.get('team_score', 0)
    df['fgm'] = df['field_goals_made']
    df['fga'] = df['field_goals_attempted']
    df['fg3m'] = df['three_point_field_goals_made']
    df['fg3a'] = df['three_point_field_goals_attempted']
    df['ftm'] = df['free_throws_made']
    df['fta'] = df['free_throws_attempted']
    df['orb'] = df['offensive_rebounds']
    df['drb'] = df['defensive_rebounds']
    df['tov'] = df.get('turnovers', df.get('total_turnovers', 0))
    df['ast'] = df['assists']
    df['stl'] = df['steals']
    df['blk'] = df['blocks']
    
    # Possessions
    df['poss_est'] = df.apply(calculate_possessions, axis=1)
    
    # === FOUR FACTORS ===
    
    # 1. Effective Field Goal % = (FGM + 0.5 * 3PM) / FGA
    df['efg_pct'] = np.where(
        df['fga'] > 0,
        (df['fgm'] + 0.5 * df['fg3m']) / df['fga'],
        0
    )
    
    # 2. Turnover % = TOV / Poss
    df['tov_pct'] = np.where(
        df['poss_est'] > 0,
        df['tov'] / df['poss_est'],
        0
    )
    
    # 3. Free Throw Rate = FTA / FGA
    df['ftr'] = np.where(
        df['fga'] > 0,
        df['fta'] / df['fga'],
        0
    )
    
    # === SHOOTING EFFICIENCY ===
    
    # True Shooting % = PTS / (2 * (FGA + 0.44 * FTA))
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
    
    # Offensive Rating = 100 * PTS / Poss
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
    
    print(f"      ✓ Added {sum([col for col in df.columns if col not in numeric_cols])} derived metrics")
    
    return df


def add_opponent_metrics(df):
    """
    Calculate opponent-adjusted metrics.
    Requires both team and opponent data in same dataframe.
    """
    print("\n[2.2] Calculating opponent-adjusted metrics...")
    
    df = df.copy()
    
    # For each game, we need to merge opponent stats
    # This assumes df has 'game_id' and 'team_id' columns
    
    # Create opponent dataframe
    opp_cols = ['game_id', 'team_id', 'pts', 'poss_est', 'orb', 'drb', 
                'fga', 'fgm', 'fg3a', 'fg3m', 'fta', 'ftm', 'tov']
    
    if all(col in df.columns for col in opp_cols):
        # Self-join to get opponent stats
        opp_df = df[opp_cols].copy()
        opp_df.columns = ['game_id', 'opp_team_id'] + ['opp_' + col for col in opp_cols[2:]]
        
        # Merge on game_id where team_id != opp_team_id
        df = df.merge(
            opp_df,
            on='game_id',
            how='left',
            suffixes=('', '_opp')
        )
        
        # 4. Offensive Rebound % = ORB / (ORB + Opp_DRB)
        df['oreb_pct'] = np.where(
            (df['orb'] + df['opp_drb']) > 0,
            df['orb'] / (df['orb'] + df['opp_drb']),
            0
        )
        
        # Defensive Rebound % = DRB / (DRB + Opp_ORB)
        df['dreb_pct'] = np.where(
            (df['drb'] + df['opp_orb']) > 0,
            df['drb'] / (df['drb'] + df['opp_orb']),
            0
        )
        
        # Defensive Rating = 100 * Opp_PTS / Opp_Poss
        df['drtg'] = np.where(
            df['opp_poss_est'] > 0,
            100 * df['opp_pts'] / df['opp_poss_est'],
            0
        )
        
        # Net Rating
        df['net_rtg'] = df['ortg'] - df['drtg']
        
        print(f"      ✓ Added opponent-adjusted metrics (OREB%, DREB%, DRtg, NetRtg)")
    else:
        print(f"      ⚠ Missing required columns for opponent metrics")
    
    return df


# ============================================================================
# PART 3: PBPSTATS.COM DATA (Advanced Metrics Layer)
# ============================================================================

def fetch_pbpstats_lineups(season, team_id=TEAM_ABBREV):
    """
    Fetch lineup data from pbpstats.com.
    Returns DataFrame with 5-man lineup combinations and minutes played.
    
    NOTE: pbpstats.com may require authentication or have rate limits.
    This is a template - you may need to adjust based on actual API docs.
    """
    print(f"\n[3.1] Fetching lineup data from pbpstats.com ({season})...")
    
    # Example API call structure (adjust based on actual pbpstats.com API)
    # url = f"{PBPSTATS_ENDPOINTS['lineups']}?Season={season}&TeamId={team_id}"
    
    # For now, create placeholder structure
    # TODO: Replace with actual API call once you have pbpstats.com access
    
    print(f"      ⚠ pbpstats.com integration pending - creating placeholder structure")
    
    # Placeholder dataframe structure
    lineup_columns = [
        'season',
        'game_id',
        'team_id',
        'lineup_id',  # Unique identifier for 5-man combo
        'player_1', 'player_2', 'player_3', 'player_4', 'player_5',
        'minutes',
        'possessions',
        'plus_minus',
        'ortg_lineup',
        'drtg_lineup',
        'net_rtg_lineup',
        'pts_for',
        'pts_against',
    ]
    
    df = pd.DataFrame(columns=lineup_columns)
    
    return df


def fetch_pbpstats_shots(season, team_id=TEAM_ABBREV):
    """
    Fetch shot location data from pbpstats.com.
    Returns DataFrame with shot coordinates and outcomes.
    """
    print(f"\n[3.2] Fetching shot location data from pbpstats.com ({season})...")
    
    print(f"      ⚠ pbpstats.com integration pending - creating placeholder structure")
    
    # Placeholder dataframe structure
    shot_columns = [
        'season',
        'game_id',
        'team_id',
        'player_id',
        'player_name',
        'shot_id',
        'x_coord',  # Court x-coordinate
        'y_coord',  # Court y-coordinate
        'shot_distance',
        'shot_zone',  # rim, paint, midrange, 3pt
        'shot_made',
        'shot_value',  # 2 or 3
        'quarter',
        'time_remaining',
    ]
    
    df = pd.DataFrame(columns=shot_columns)
    
    return df


# ============================================================================
# PART 4: MASTER DATASET ASSEMBLY
# ============================================================================

def build_master_dataset(seasons=SEASONS):
    """
    Build the master dataset combining all data sources.
    Returns dictionary of dataframes.
    """
    print(f"\n{'='*70}")
    print("BUILDING MASTER DATASET")
    print(f"{'='*70}")
    
    master_data = {
        'team_box': pd.DataFrame(),
        'player_box': pd.DataFrame(),
        'schedule': pd.DataFrame(),
        'lineups': pd.DataFrame(),
        'shots': pd.DataFrame(),
    }
    
    for season in seasons:
        print(f"\n>>> Processing Season {season}")
        
        # Load wehoop data
        team_box = load_wnba_team_box(season)
        player_box = load_wnba_player_box(season)
        schedule = load_wnba_schedule(season)
        
        # Filter to Aces games only
        if not team_box.empty:
            team_box = team_box[team_box['team_id'] == TEAM_ID].copy()
            print(f"      → Filtered to {len(team_box)} Aces team-game records")
        
        if not player_box.empty:
            player_box = player_box[player_box['team_id'] == TEAM_ID].copy()
            print(f"      → Filtered to {len(player_box)} Aces player-game records")
        
        if not schedule.empty:
            # Filter schedule to Aces games (home or away)
            schedule = schedule[
                (schedule['home_team_id'] == TEAM_ID) | 
                (schedule['away_team_id'] == TEAM_ID)
            ].copy()
            print(f"      → Filtered to {len(schedule)} Aces scheduled games")
        
        # Add calculated metrics
        if not team_box.empty:
            team_box = add_four_factors_metrics(team_box)
            team_box = add_opponent_metrics(team_box)
        
        if not player_box.empty:
            player_box = add_four_factors_metrics(player_box)
        
        # Fetch pbpstats data
        lineups = fetch_pbpstats_lineups(season)
        shots = fetch_pbpstats_shots(season)
        
        # Append to master datasets
        master_data['team_box'] = pd.concat([master_data['team_box'], team_box], ignore_index=True)
        master_data['player_box'] = pd.concat([master_data['player_box'], player_box], ignore_index=True)
        master_data['schedule'] = pd.concat([master_data['schedule'], schedule], ignore_index=True)
        master_data['lineups'] = pd.concat([master_data['lineups'], lineups], ignore_index=True)
        master_data['shots'] = pd.concat([master_data['shots'], shots], ignore_index=True)
    
    # Final summary
    print(f"\n{'='*70}")
    print("MASTER DATASET SUMMARY")
    print(f"{'='*70}")
    for key, df in master_data.items():
        print(f"  {key:20s}: {len(df):,} records")
    
    return master_data


def save_master_dataset(master_data):
    """Save master datasets to parquet files."""
    print(f"\n{'='*70}")
    print("SAVING MASTER DATASETS")
    print(f"{'='*70}")
    
    for key, df in master_data.items():
        if not df.empty:
            filepath = MASTER_DIR / f"aces_{key}.parquet"
            df.to_parquet(filepath, index=False)
            print(f"  ✓ Saved {filepath} ({len(df):,} records)")
        else:
            print(f"  ⚠ Skipped {key} (empty dataframe)")
    
    # Also save metadata
    metadata = {
        'build_date': datetime.now().isoformat(),
        'seasons': SEASONS,
        'team_id': TEAM_ID,
        'team_abbrev': TEAM_ABBREV,
        'data_sources': ['wehoop', 'pbpstats.com'],
    }
    
    with open(MASTER_DIR / 'metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\n  ✓ Saved metadata.json")


# ============================================================================
# PART 5: ANALYSIS-SPECIFIC SUBSETS
# ============================================================================

def create_academic_subset(master_data):
    """
    Create subset for academic final project.
    Focus: Coaching perspective, rotation analysis, game-specific adjustments.
    """
    print(f"\n{'='*70}")
    print("CREATING ACADEMIC PROJECT SUBSET")
    print(f"{'='*70}")
    
    # For academic project, we need:
    # 1. Top 8 rotation players identified
    # 2. Lineup combinations with minutes
    # 3. Opponent profiles for matchup analysis
    # 4. Game-by-game performance data
    
    academic_data = {}
    
    # TODO: Add academic-specific data transformations
    print("  ⚠ Academic subset creation pending")
    
    return academic_data


def create_portfolio_subset(master_data):
    """
    Create subset for portfolio case study.
    Focus: Front office perspective, roster decisions, multi-year trends.
    """
    print(f"\n{'='*70}")
    print("CREATING PORTFOLIO PROJECT SUBSET")
    print(f"{'='*70}")
    
    # For portfolio, we need:
    # 1. Multi-year player performance trends
    # 2. Championship probability indicators
    # 3. Salary cap context (external data)
    # 4. Trade scenario modeling inputs
    
    portfolio_data = {}
    
    # TODO: Add portfolio-specific data transformations
    print("  ⚠ Portfolio subset creation pending")
    
    return portfolio_data


# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    print(f"""
{'='*70}
EXECUTION STARTED: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
{'='*70}
    """)
    
    # Build master dataset
    master_data = build_master_dataset()
    
    # Save master dataset
    save_master_dataset(master_data)
    
    # Create analysis-specific subsets
    academic_subset = create_academic_subset(master_data)
    portfolio_subset = create_portfolio_subset(master_data)
    
    print(f"""
{'='*70}
BUILD COMPLETE: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
{'='*70}

Next Steps:
1. Integrate pbpstats.com API (replace placeholders in Part 3)
2. Define Top 8 rotation players for academic project
3. Add opponent profiling module
4. Create Tableau-specific export format
5. Build portfolio dashboard structure

Output Location: {MASTER_DIR}
    """)
