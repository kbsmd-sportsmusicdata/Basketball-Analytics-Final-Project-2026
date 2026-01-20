"""
Merge Las Vegas Aces player data from three sources:
1. Season aggregates (from game-by-game advanced stats)
2. On/Off court rating splits (from pbpstats)
3. Manual player attributes (position, experience, draft info)

Outputs: aces_player_profiles_final_2025.csv
"""

import pandas as pd
import numpy as np

# ============================================================================
# CONFIGURATION
# ============================================================================

SEASON_AGGREGATES_FILE = 'aces_season_aggregates_2025.csv'
ONOFF_FILE = 'aces_onoff_playerrtg_and_diffs_2025.csv'
MANUAL_FILE = 'aces_player_attributes_manual.csv'
OUTPUT_FILE = 'aces_player_profiles_final_2025.csv'

# ============================================================================
# LOAD ALL DATASETS
# ============================================================================

print("Loading datasets...")

# 1. Season aggregates (from previous script)
season = pd.read_csv(SEASON_AGGREGATES_FILE)
print(f"✓ Season aggregates: {len(season)} players")

# 2. On/Off splits
onoff = pd.read_csv(ONOFF_FILE)
print(f"✓ On/Off splits: {len(onoff)} players")

# 3. Manual attributes
manual = pd.read_csv(MANUAL_FILE)
print(f"✓ Manual attributes: {len(manual)} players")

# ============================================================================
# CLEAN PLAYER NAMES FOR MATCHING
# ============================================================================

print("\nPreparing for merge...")

# The season aggregates use 'Player' column (name only)
# The onoff and manual files have 'player_name' column
# We'll use player_name as the merge key

# Rename for consistency
season.rename(columns={'Player': 'player_name'}, inplace=True)

print("Sample names from each dataset:")
print(f"  Season: {season['player_name'].head(3).tolist()}")
print(f"  OnOff:  {onoff['player_name'].head(3).tolist()}")
print(f"  Manual: {manual['player_name'].head(3).tolist()}")

# ============================================================================
# MERGE DATASETS
# ============================================================================

print("\nMerging datasets...")

# Step 1: Merge season stats with on/off splits
merged = pd.merge(
    season,
    onoff,
    on='player_name',
    how='left',
    suffixes=('', '_onoff')
)

print(f"After season + onoff merge: {len(merged)} players")

# Step 2: Merge with manual attributes
final = pd.merge(
    merged,
    manual[['player_id', 'player_name', 'position', 'years_exp', 'draft_year', 
            'Draft Pick Number', 'Draft Round Number', 'height_cm', 'college']],
    on='player_name',
    how='left',
    suffixes=('', '_manual')
)

print(f"After adding manual attributes: {len(final)} players")

# ============================================================================
# CLEAN UP DUPLICATE COLUMNS
# ============================================================================

# If there are player_id columns from both onoff and manual, keep the manual one
if 'player_id_onoff' in final.columns and 'player_id_manual' in final.columns:
    final['player_id'] = final['player_id_manual'].fillna(final['player_id_onoff'])
    final.drop(['player_id_onoff', 'player_id_manual'], axis=1, inplace=True)
elif 'player_id_manual' in final.columns:
    final.rename(columns={'player_id_manual': 'player_id'}, inplace=True)
elif 'player_id_onoff' in final.columns:
    final.rename(columns={'player_id_onoff': 'player_id'}, inplace=True)

# ============================================================================
# CALCULATE ADDITIONAL METRICS
# ============================================================================

print("\nCalculating additional metrics...")

# Height in inches (from cm)
final['height_inches'] = (final['height_cm'] / 2.54).round(1)

# Experience category
final['exp_category'] = pd.cut(
    final['years_exp'],
    bins=[0, 2, 5, 8, 20],
    labels=['Rookie/Sophomore', 'Young', 'Veteran', 'Star Veteran'],
    include_lowest=True
)

# Usage tier (based on USG%)
final['usage_tier'] = pd.cut(
    final['USG%'],
    bins=[0, 0.15, 0.20, 0.25, 1.0],
    labels=['Low', 'Medium', 'High', 'Elite'],
    include_lowest=True
)

# Efficiency tier (based on TS%)
final['efficiency_tier'] = pd.cut(
    final['TS%'],
    bins=[0, 0.50, 0.55, 0.60, 1.0],
    labels=['Below Average', 'Average', 'Above Average', 'Elite'],
    include_lowest=True
)

# Impact player flag (high minutes + high NetRtg differential)
final['impact_player'] = (
    (final['mpg'] >= 25) & 
    (final['net_rtg_diff'] >= 10)
).astype(int)

# ============================================================================
# REORDER COLUMNS FOR LOGICAL FLOW
# ============================================================================

column_order = [
    # IDENTIFIERS
    'player_id',
    'player_name',
    'position',
    'years_exp',
    'exp_category',
    'height_cm',
    'height_inches',
    'college',
    'draft_year',
    'Draft Pick Number',
    'Draft Round Number',
    
    # VOLUME STATS
    'games_count',
    'wins',
    'losses',
    'win_pct',
    'total_minutes',
    'mpg',
    
    # EFFICIENCY METRICS
    'OffRtg',
    'DefRtg',
    'NetRtg',
    'eFG%',
    'TS%',
    'efficiency_tier',
    
    # USAGE & PLAYMAKING
    'USG%',
    'usage_tier',
    'AST%',
    'AST_TOV',
    'AST_Ratio',
    'TOV_Ratio',
    
    # REBOUNDING
    'OREB%',
    'DREB%',
    'REB%',
    
    # OVERALL IMPACT
    'PIE',
    'PACE',
    'impact_player',
    
    # ON/OFF SPLITS - Minutes
    'min_on',
    'min_off',
    
    # ON/OFF SPLITS - Offensive Rating
    'ortg_on',
    'ortg_off',
    'ortg_diff',
    
    # ON/OFF SPLITS - Defensive Rating
    'drtg_on',
    'drtg_off',
    'drtg_diff',
    
    # ON/OFF SPLITS - Net Rating
    'net_rtg_on',
    'net_rtg_off',
    'net_rtg_diff',
]

# Only keep columns that exist
column_order = [col for col in column_order if col in final.columns]
final = final[column_order]

# ============================================================================
# ROUND VALUES FOR FINAL OUTPUT
# ============================================================================

# Round on/off metrics to 1 decimal
onoff_cols = ['ortg_on', 'ortg_off', 'ortg_diff', 'drtg_on', 'drtg_off', 'drtg_diff', 
              'net_rtg_on', 'net_rtg_off', 'net_rtg_diff']
for col in onoff_cols:
    if col in final.columns:
        final[col] = final[col].round(1)

# Round minutes on/off to whole numbers
if 'min_on' in final.columns:
    final['min_on'] = final['min_on'].round(0).astype('Int64')
if 'min_off' in final.columns:
    final['min_off'] = final['min_off'].round(0).astype('Int64')

# ============================================================================
# SAVE OUTPUT
# ============================================================================

final.to_csv(OUTPUT_FILE, index=False)
print(f"\n✅ Final player profiles saved to: {OUTPUT_FILE}")

# ============================================================================
# SUMMARY REPORT
# ============================================================================

print("\n" + "="*80)
print("FINAL PLAYER PROFILES SUMMARY")
print("="*80)

# Display key columns only for readability
display_cols = [
    'player_name', 'position', 'years_exp', 'games_count', 'mpg',
    'OffRtg', 'DefRtg', 'TS%', 'USG%', 
    'ortg_diff', 'drtg_diff', 'net_rtg_diff'
]
display_cols = [col for col in display_cols if col in final.columns]

print(final[display_cols].to_string(index=False))

print("\n" + "="*80)
print("DATA QUALITY CHECKS")
print("="*80)
print(f"Total players: {len(final)}")
print(f"Players with position data: {final['position'].notna().sum()}")
print(f"Players with on/off data: {final['ortg_diff'].notna().sum()}")
print(f"Players missing manual attributes: {final['position'].isna().sum()}")

print("\n" + "="*80)
print("TOP PERFORMERS BY KEY METRICS")
print("="*80)

# Net rating differential (on/off impact)
if 'net_rtg_diff' in final.columns:
    print("\nMost Impactful Players (Net Rating Differential):")
    print(final.nlargest(5, 'net_rtg_diff')[['player_name', 'net_rtg_diff', 'mpg']].to_string(index=False))

# True Shooting %
if 'TS%' in final.columns:
    print("\nMost Efficient Scorers (TS%):")
    print(final.nlargest(5, 'TS%')[['player_name', 'TS%', 'USG%']].to_string(index=False))

# Usage %
if 'USG%' in final.columns:
    print("\nHighest Usage Players:")
    print(final.nlargest(5, 'USG%')[['player_name', 'USG%', 'mpg']].to_string(index=False))

print("\n✅ Merge complete!")
print(f"\n📁 Output file: {OUTPUT_FILE}")
print(f"📊 Columns: {len(final.columns)}")
print(f"👥 Players: {len(final)}")
