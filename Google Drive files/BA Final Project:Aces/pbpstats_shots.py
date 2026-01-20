"""
Las Vegas Aces - pbpstats Shot Data Pull (Python)
==================================================
Pulls shot-by-shot data with location coordinates from pbpstats.com
NO API KEY REQUIRED - free public API

Author: Krystal
Last Updated: 2026-01-06
"""

import requests
import pandas as pd
import json
from pathlib import Path
import time

# ============================================================================
# CONFIGURATION
# ============================================================================

# Team configuration
TEAM_ID_WNBA = "1611661319"  # Las Vegas Aces pbpstats team ID
TEAM_ABBREV = "LV"
SEASONS = ["2024"]  # WNBA uses single year format

# Data paths
DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw" / "pbpstats"
OUTPUT_DIR = DATA_DIR / "master"

RAW_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# API configuration
BASE_URL = "https://api.pbpstats.com"

print("="*70)
print("PBPSTATS SHOT DATA PULL (PYTHON)")
print("="*70)
print(f"Team: {TEAM_ABBREV}")
print(f"Seasons: {', '.join(SEASONS)}")
print(f"Data: Shot-by-shot locations and context")
print("="*70)
print()


# ============================================================================
# API FUNCTIONS
# ============================================================================

def make_api_request(endpoint, params):
    """Make GET request to pbpstats API."""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"  ✗ API Error: {e}")
        return None


def get_team_shots(season, team_id):
    """
    Get all shots for a team in a season.
    
    Returns shot-level data with:
    - x, y coordinates (court position)
    - shot_distance, shot_type (Arc3, Corner3, AtRim, etc.)
    - made (True/False)
    - shot_value (2 or 3 points)
    - player, lineup, opponent lineup
    - game context (quarter, time, score margin)
    - shot_quality (expected value 0-1)
    - blocked, assisted, putback indicators
    """
    print(f"\n[{season}] Fetching all team shots...")
    
    endpoint = "/get-shots/wnba"
    params = {
        "Season": season,
        "SeasonType": "Regular Season",
        "TeamId": team_id
        # Optional filters:
        # "ShotType": "Arc3,Corner3"  # Filter to just 3s
        # "Outcome": "Made"  # Filter to makes only
        # "PlayerId": "204324"  # Filter to specific player
    }
    
    data = make_api_request(endpoint, params)
    
    if data is None:
        print(f"  ✗ Failed to fetch shots")
        return pd.DataFrame()
    
    # Save raw response
    raw_file = RAW_DIR / f"shots_{season}_raw.json"
    with open(raw_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"  → Saved raw: {raw_file}")
    
    # The response is a list of shot objects
    if not data or len(data) == 0:
        print(f"  ⚠ No shots found")
        return pd.DataFrame()
    
    # Convert to dataframe
    df = pd.DataFrame(data)
    
    print(f"  ✓ Loaded {len(df)} shots")
    
    # Add season column
    df['season'] = season
    
    return df


# ============================================================================
# PROCESSING FUNCTIONS
# ============================================================================

def process_shot_data(df):
    """
    Clean and process shot data.
    Add shot zones, calculate shot quality tiers.
    """
    print(f"\n[PROCESSING] Cleaning shot data...")
    
    if len(df) == 0:
        return df
    
    # Ensure numeric columns
    numeric_cols = ['x', 'y', 'shot_distance', 'shot_value', 'score_margin',
                    'shot_quality', 'period', 'seconds_since_oreb', 
                    'shot_time', 'start_time', 'end_time']
    
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Ensure boolean columns
    boolean_cols = ['made', 'blocked', 'assisted', 'putback']
    
    for col in boolean_cols:
        if col in df.columns:
            df[col] = df[col].astype(bool)
    
    # Create shot categories
    df['shot_category'] = df['shot_type'].map({
        'Arc3': 'Three',
        'Corner3': 'Three',
        'AtRim': 'Rim',
        'ShortMidRange': 'Short Mid',
        'LongMidRange': 'Long Mid'
    }).fillna('Other')
    
    # Shot quality tiers
    df['shot_quality_tier'] = pd.cut(
        df['shot_quality'],
        bins=[0, 0.35, 0.40, 0.50, 1.0],
        labels=['Poor', 'Average', 'Good', 'Excellent'],
        include_lowest=True
    )
    
    # Game situations
    df['clutch'] = (df['period'] >= 4) & (df['score_margin'].abs() <= 5)
    
    # Points scored
    df['points_scored'] = df.apply(
        lambda row: row['shot_value'] if row['made'] else 0,
        axis=1
    )
    
    # Shot zone (based on coordinates if needed)
    # x, y are in some coordinate system - might need court dimensions
    
    print(f"  ✓ Processed {len(df)} shots")
    print(f"  Shot types: {df['shot_category'].value_counts().to_dict()}")
    
    return df


def generate_shot_summary(df):
    """Generate comprehensive shot summary statistics."""
    print("\n" + "="*70)
    print("SHOT DATA SUMMARY")
    print("="*70)
    
    if len(df) == 0:
        print("No data to summarize")
        return
    
    print(f"\nTotal shots: {len(df)}")
    print(f"Made: {df['made'].sum()} ({df['made'].mean()*100:.1f}%)")
    
    # By shot type
    print("\n" + "-"*70)
    print("SHOT DISTRIBUTION")
    print("-"*70)
    
    shot_dist = df.groupby('shot_category').agg({
        'made': ['count', 'sum', 'mean']
    }).round(3)
    shot_dist.columns = ['Attempts', 'Makes', 'FG%']
    shot_dist['FG%'] = (shot_dist['FG%'] * 100).round(1)
    shot_dist = shot_dist.sort_values('Attempts', ascending=False)
    print(shot_dist)
    
    # By shot quality
    if 'shot_quality_tier' in df.columns:
        print("\n" + "-"*70)
        print("SHOT QUALITY DISTRIBUTION")
        print("-"*70)
        
        quality_dist = df.dropna(subset=['shot_quality_tier']).groupby('shot_quality_tier').agg({
            'made': ['count', 'sum', 'mean'],
            'shot_quality': 'mean'
        }).round(3)
        quality_dist.columns = ['Attempts', 'Makes', 'FG%', 'Avg xFG']
        quality_dist['FG%'] = (quality_dist['FG%'] * 100).round(1)
        quality_dist['Avg xFG'] = (quality_dist['Avg xFG'] * 100).round(1)
        print(quality_dist)
    
    # Clutch shots
    if 'clutch' in df.columns:
        clutch_shots = df[df['clutch'] == True]
        if len(clutch_shots) > 0:
            print("\n" + "-"*70)
            print("CLUTCH SHOTS (Q4, close game)")
            print("-"*70)
            print(f"Attempts: {len(clutch_shots)}")
            print(f"Makes: {clutch_shots['made'].sum()}")
            print(f"FG%: {clutch_shots['made'].mean()*100:.1f}%")
    
    # Top shooters
    if 'player' in df.columns:
        print("\n" + "-"*70)
        print("TOP 5 SHOOTERS BY ATTEMPTS")
        print("-"*70)
        
        top_shooters = df.groupby('player').agg({
            'made': ['count', 'sum', 'mean']
        }).round(3)
        top_shooters.columns = ['Attempts', 'Makes', 'FG%']
        top_shooters['FG%'] = (top_shooters['FG%'] * 100).round(1)
        top_shooters = top_shooters.sort_values('Attempts', ascending=False).head(5)
        print(top_shooters)
    
    print("="*70)


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    print(f"\nStarted: {pd.Timestamp.now()}\n")
    
    all_shots = []
    
    for season in SEASONS:
        print("="*70)
        print(f"PROCESSING SEASON {season}")
        print("="*70)
        
        # Fetch shots
        shots = get_team_shots(season, TEAM_ID_WNBA)
        
        if len(shots) > 0:
            # Process
            shots = process_shot_data(shots)
            
            # Append
            all_shots.append(shots)
    
    # Combine seasons
    if all_shots:
        print("\n" + "="*70)
        print("COMBINING SEASONS")
        print("="*70)
        
        shots_combined = pd.concat(all_shots, ignore_index=True)
        
        # Save to master
        parquet_file = OUTPUT_DIR / "aces_shots_pbpstats.parquet"
        shots_combined.to_parquet(parquet_file, index=False)
        print(f"\n✓ Saved: {parquet_file} ({len(shots_combined)} shots)")
        
        # Also save as CSV for easy viewing
        csv_file = OUTPUT_DIR / "aces_shots_pbpstats.csv"
        shots_combined.to_csv(csv_file, index=False)
        print(f"✓ Saved: {csv_file}")
        
        # Generate summary
        generate_shot_summary(shots_combined)
        
    else:
        print("\n⚠ No shot data loaded")
    
    print("\n" + "="*70)
    print("NEXT STEPS")
    print("="*70)
    print("""
1. Create shot charts in Tableau:
   - Load aces_shots_pbpstats.parquet or .csv
   - Plot x, y coordinates on court template
   - Color by made/missed, shot_type, or shot_quality
   
2. Analyze shot selection:
   - Compare shot distribution to league averages
   - Identify high-quality shot zones
   - Find underutilized efficient zones
   
3. Player shot profiles:
   - Filter by player
   - Show preferred shooting zones
   - Calculate effective FG% by zone
   
4. Lineup analysis:
   - Filter by lineup_id
   - Compare shot quality across lineups
   - Find lineups that generate best looks

AVAILABLE COLUMNS:
- Coordinates: x, y, shot_distance
- Type: shot_type, shot_category, shot_value
- Outcome: made, blocked, assisted, putback
- Context: player, lineup_id, opponent_lineup_id
- Game: gid (game_id), game_date, period, time
- Situation: score_margin, clutch, possession info
- Quality: shot_quality, shot_quality_tier
- Video: url (link to NBA video of shot)

SHOT TYPES:
- Arc3: Three-pointer above the break
- Corner3: Three-pointer from corners
- AtRim: Shots at the rim
- ShortMidRange: Mid-range closer to basket
- LongMidRange: Mid-range farther from basket

COORDINATE SYSTEM:
- x, y are in NBA court coordinates
- (0, 0) is center court
- Court dimensions: ~470 x ~250 units
- Positive y is towards one basket
    """)
    print("="*70)
    
    print(f"\nCompleted: {pd.Timestamp.now()}")


if __name__ == "__main__":
    main()
