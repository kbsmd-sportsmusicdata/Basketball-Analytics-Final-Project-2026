"""
Add advanced derived metrics to Las Vegas Aces player profiles.

These metrics are designed to provide actionable insights for:
- Team decision-makers (coaches, GMs, player development)
- Sports betting analysts (prop betting, team totals)
- Portfolio viewers (demonstrating basketball IQ)

Inputs: aces_player_profiles_final_2025.csv
Outputs: aces_player_profiles_final_2025.csv (updated)
"""

import pandas as pd
import numpy as np

# ============================================================================
# CONFIGURATION
# ============================================================================

INPUT_FILE = 'aces_player_profiles_final_2025.csv'
OUTPUT_FILE = 'aces_player_profiles_final_2025.csv'

# ============================================================================
# LOAD DATA
# ============================================================================

print("Loading player profiles...")
df = pd.read_csv(INPUT_FILE)
print(f"Players: {len(df)}")
print(f"Current columns: {len(df.columns)}")

# ============================================================================
# CALCULATE DERIVED METRICS
# ============================================================================

print("\nCalculating derived metrics...")

# ---------------------------------------------------------------------------
# 1. TWO-WAY RATING (Overall player quality)
# ---------------------------------------------------------------------------
# OffRtg - DefRtg (higher is better)
# Elite players are 115+ OffRtg and <100 DefRtg = 15+ two-way rating
df['two_way_rating'] = df['OffRtg'] - df['DefRtg']

# ---------------------------------------------------------------------------
# 2. EFFICIENCY SCORE (Volume-adjusted efficiency)
# ---------------------------------------------------------------------------
# TS% * USG% * 100 (rewards high-volume efficient scorers)
# A'ja Wilson at 58.3% TS and 31.4% USG = 18.3 efficiency score
df['efficiency_score'] = df['TS%'] * df['USG%'] * 100

# ---------------------------------------------------------------------------
# 3. OFFENSIVE LOAD (Total offensive responsibility)
# ---------------------------------------------------------------------------
# USG% + (AST% * 0.5) - shows who carries the offense
# High USG% = scoring load, High AST% = playmaking load
df['offensive_load'] = df['USG%'] + (df['AST%'] * 0.5)

# ---------------------------------------------------------------------------
# 4. PLAYMAKING EFFICIENCY (Clean playmaking rate)
# ---------------------------------------------------------------------------
# AST% / (AST% + TOV_Ratio) - higher is better
# Shows how much of offensive creation is assists vs turnovers
df['playmaking_efficiency'] = df['AST%'] / (df['AST%'] + df['TOV_Ratio'])

# ---------------------------------------------------------------------------
# 5. REBOUNDING IMPACT (Total rebounding contribution)
# ---------------------------------------------------------------------------
# REB% * mpg / 10 (scale to more readable numbers)
# Captures both rebounding rate AND playing time
df['rebounding_impact'] = (df['REB%'] * df['mpg']) / 10

# ---------------------------------------------------------------------------
# 6. AVAILABILITY (Durability percentage)
# ---------------------------------------------------------------------------
# games_count / max_games in season
max_games = df['games_count'].max()
df['availability'] = df['games_count'] / max_games

# ---------------------------------------------------------------------------
# 7. IMPACT PER 36 (Normalized on/off impact)
# ---------------------------------------------------------------------------
# net_rtg_diff * (36 / mpg)
# Normalizes impact to per-36 minutes (standard comparison baseline)
df['impact_per_36'] = df['net_rtg_diff'] * (36 / df['mpg'])

# ---------------------------------------------------------------------------
# 8. WIN CONTRIBUTION (Minutes-weighted winning)
# ---------------------------------------------------------------------------
# (mpg / 48) * win_pct * 100
# Shows how much a player's minutes correlate with team success
df['win_contribution'] = (df['mpg'] / 48) * df['win_pct'] * 100

# ---------------------------------------------------------------------------
# 9. DEFENSIVE IMPACT (Positive defensive on/off)
# ---------------------------------------------------------------------------
# -drtg_diff (flip sign so positive = good defense)
# When player is on court, team allows fewer points
df['defensive_impact'] = -df['drtg_diff']

# ---------------------------------------------------------------------------
# 10. OFFENSIVE IMPACT (Offensive on/off)
# ---------------------------------------------------------------------------
# ortg_diff (positive = team scores more with player on court)
df['offensive_impact'] = df['ortg_diff']

# ---------------------------------------------------------------------------
# 11. STAR RATING (Composite score 0-100)
# ---------------------------------------------------------------------------
# Weighted combination of key metrics (normalized to 0-100 scale)
# Formula: 40% impact + 30% efficiency + 20% usage + 10% availability

# Normalize each component to 0-1 scale
impact_norm = (df['net_rtg_diff'] - df['net_rtg_diff'].min()) / (df['net_rtg_diff'].max() - df['net_rtg_diff'].min())
efficiency_norm = (df['TS%'] - df['TS%'].min()) / (df['TS%'].max() - df['TS%'].min())
usage_norm = (df['USG%'] - df['USG%'].min()) / (df['USG%'].max() - df['USG%'].min())
avail_norm = df['availability']

# Weighted composite (scale to 0-100)
df['star_rating'] = (
    impact_norm * 0.40 +
    efficiency_norm * 0.30 +
    usage_norm * 0.20 +
    avail_norm * 0.10
) * 100

# ---------------------------------------------------------------------------
# 12. TRUE USAGE (Adjusted for assists created)
# ---------------------------------------------------------------------------
# USG% + (AST% * 0.33) - captures scoring AND playmaking usage
# 0.33 factor assumes ~33% of possessions end in assists
df['true_usage'] = df['USG%'] + (df['AST%'] * 0.33)

# ---------------------------------------------------------------------------
# 13. MINUTES LEVERAGE (How much team relies on player)
# ---------------------------------------------------------------------------
# mpg / team_avg_mpg (where team avg = 240 minutes / 8 rotation players = 30)
team_avg_mpg = 30  # Approximate for 8-player rotation
df['minutes_leverage'] = df['mpg'] / team_avg_mpg

# ---------------------------------------------------------------------------
# 14. ROLE CLARITY SCORE (How defined is the player's role)
# ---------------------------------------------------------------------------
# Based on concentration in one area: max(USG%, AST%, REB%) / sum(all three)
# Higher = more specialized, Lower = more versatile
role_concentration = df[['USG%', 'AST%', 'REB%']].max(axis=1)
role_total = df[['USG%', 'AST%', 'REB%']].sum(axis=1)
df['role_clarity'] = role_concentration / role_total

# ---------------------------------------------------------------------------
# 15. VERSATILITY SCORE (Inverse of role clarity)
# ---------------------------------------------------------------------------
# 1 - role_clarity (higher = more well-rounded)
df['versatility_score'] = 1 - df['role_clarity']

# ============================================================================
# CREATE CATEGORICAL TIERS FOR KEY METRICS
# ============================================================================

print("Creating categorical tiers...")

# Two-Way Rating Tiers
df['two_way_tier'] = pd.cut(
    df['two_way_rating'],
    bins=[-100, 0, 5, 10, 100],
    labels=['Below Average', 'Average', 'Good', 'Elite']
)

# Impact Tiers (based on net_rtg_diff)
df['impact_tier'] = pd.cut(
    df['net_rtg_diff'],
    bins=[-100, 0, 10, 20, 100],
    labels=['Negative', 'Neutral', 'Positive', 'Elite']
)

# Star Rating Tiers
df['star_tier'] = pd.cut(
    df['star_rating'],
    bins=[0, 25, 50, 75, 100],
    labels=['Role Player', 'Contributor', 'Key Player', 'Star']
)

# Offensive Load Tiers
df['offensive_load_tier'] = pd.cut(
    df['offensive_load'],
    bins=[0, 0.20, 0.30, 0.40, 1.0],
    labels=['Low', 'Medium', 'High', 'Elite']
)

# ============================================================================
# PLAYER ARCHETYPE CLASSIFICATION
# ============================================================================

print("Classifying player archetypes...")

def classify_archetype(row):
    """
    Classify players into archetypes based on their statistical profile.
    """
    usg = row['USG%']
    ast = row['AST%']
    reb = row['REB%']
    ts = row['TS%']
    
    # Scoring-focused (high USG, low AST)
    if usg > 0.25 and ast < 0.15:
        if ts > 0.55:
            return 'Elite Scorer'
        else:
            return 'Volume Scorer'
    
    # Playmaker (high AST)
    elif ast > 0.25:
        if usg > 0.20:
            return 'Primary Ball Handler'
        else:
            return 'Facilitator'
    
    # Two-way wing (balanced USG + good defense)
    elif 0.15 < usg < 0.25 and row['defensive_impact'] > 5:
        return 'Two-Way Wing'
    
    # Rebounder/Interior (high REB)
    elif reb > 0.15:
        if ts > 0.55:
            return 'Efficient Big'
        else:
            return 'Paint Presence'
    
    # Complementary/Role player
    else:
        return 'Role Player'

df['archetype'] = df.apply(classify_archetype, axis=1)

# ============================================================================
# ROUND ALL NEW METRICS
# ============================================================================

print("Rounding new metrics...")

# Round to 1 decimal
metrics_1_decimal = [
    'two_way_rating', 'efficiency_score', 'offensive_load', 
    'rebounding_impact', 'impact_per_36', 'win_contribution',
    'defensive_impact', 'offensive_impact', 'star_rating',
    'true_usage', 'minutes_leverage'
]

for col in metrics_1_decimal:
    df[col] = df[col].round(1)

# Round to 3 decimals
metrics_3_decimal = ['playmaking_efficiency', 'availability', 'role_clarity', 'versatility_score']
for col in metrics_3_decimal:
    df[col] = df[col].round(3)

# ============================================================================
# REORDER COLUMNS (add new metrics after existing ones)
# ============================================================================

print("Reordering columns...")

# Get current column order
existing_cols = [
    'player_id', 'player_name', 'position', 'years_exp', 'exp_category',
    'height_cm', 'height_inches', 'college', 'draft_year', 
    'Draft Pick Number', 'Draft Round Number',
    'games_count', 'wins', 'losses', 'win_pct', 'total_minutes', 'mpg',
    'OffRtg', 'DefRtg', 'NetRtg', 'eFG%', 'TS%', 'efficiency_tier',
    'USG%', 'usage_tier', 'AST%', 'AST_TOV', 'AST_Ratio', 'TOV_Ratio',
    'OREB%', 'DREB%', 'REB%', 'PIE', 'PACE', 'impact_player',
    'min_on', 'min_off', 
    'ortg_on', 'ortg_off', 'ortg_diff',
    'drtg_on', 'drtg_off', 'drtg_diff',
    'net_rtg_on', 'net_rtg_off', 'net_rtg_diff'
]

# Add new metrics section
new_metrics = [
    # Composite metrics
    'two_way_rating', 'two_way_tier',
    'star_rating', 'star_tier',
    
    # Offensive metrics
    'efficiency_score',
    'offensive_load', 'offensive_load_tier',
    'offensive_impact',
    'true_usage',
    
    # Playmaking metrics
    'playmaking_efficiency',
    
    # Defensive metrics
    'defensive_impact',
    
    # Rebounding metrics
    'rebounding_impact',
    
    # Impact metrics
    'impact_per_36',
    'impact_tier',
    
    # Role/Usage metrics
    'minutes_leverage',
    'role_clarity',
    'versatility_score',
    'archetype',
    
    # Team contribution
    'win_contribution',
    'availability',
]

# Keep only columns that exist
existing_cols = [col for col in existing_cols if col in df.columns]
new_metrics = [col for col in new_metrics if col in df.columns]

# Combine
final_column_order = existing_cols + new_metrics

df = df[final_column_order]

# ============================================================================
# SAVE OUTPUT
# ============================================================================

df.to_csv(OUTPUT_FILE, index=False)
print(f"\n✅ Updated player profiles saved to: {OUTPUT_FILE}")
print(f"📊 Total columns: {len(df.columns)} (+{len(new_metrics)} new)")

# ============================================================================
# SUMMARY REPORT
# ============================================================================

print("\n" + "="*80)
print("NEW DERIVED METRICS SUMMARY")
print("="*80)

summary_cols = [
    'player_name', 'position', 'archetype',
    'star_rating', 'two_way_rating', 'efficiency_score',
    'offensive_load', 'defensive_impact', 'impact_per_36'
]

print(df[summary_cols].to_string(index=False))

print("\n" + "="*80)
print("PLAYER ARCHETYPES DISTRIBUTION")
print("="*80)
print(df['archetype'].value_counts())

print("\n" + "="*80)
print("STAR RATING DISTRIBUTION")
print("="*80)
print(df['star_tier'].value_counts().sort_index())

print("\n" + "="*80)
print("TOP 5 BY KEY METRICS")
print("="*80)

print("\n📊 Highest Star Rating:")
print(df.nlargest(5, 'star_rating')[['player_name', 'star_rating', 'star_tier']].to_string(index=False))

print("\n⚡ Best Two-Way Players:")
print(df.nlargest(5, 'two_way_rating')[['player_name', 'two_way_rating', 'OffRtg', 'DefRtg']].to_string(index=False))

print("\n🎯 Most Efficient High-Volume Scorers:")
print(df.nlargest(5, 'efficiency_score')[['player_name', 'efficiency_score', 'TS%', 'USG%']].to_string(index=False))

print("\n🏀 Highest Offensive Load:")
print(df.nlargest(5, 'offensive_load')[['player_name', 'offensive_load', 'USG%', 'AST%']].to_string(index=False))

print("\n🛡️ Best Defensive Impact:")
print(df.nlargest(5, 'defensive_impact')[['player_name', 'defensive_impact', 'drtg_diff']].to_string(index=False))

print("\n✅ Script complete!")
