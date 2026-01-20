"""
Aggregate Las Vegas Aces game-by-game advanced stats to season-level player profiles.

Reads: aces_advanced_player_box_2025_wnba.csv
Outputs: aces_season_aggregates_2025.csv

Aggregation logic:
- Count stats (games, wins, losses)
- Sum stats (total minutes)
- Weighted averages by minutes for rate stats (OffRtg, DefRtg, eFG%, etc.)
- Calculates games, MPG, Win%
"""

import pandas as pd
import numpy as np

# ============================================================================
# CONFIGURATION
# ============================================================================

INPUT_FILE = 'aces_advanced_player_box_2025_wnba.csv'
OUTPUT_FILE = 'aces_season_aggregates_2025.csv'

# Top 8 rotation players (update if needed)
TOP_8_PLAYERS = [
    "A'ja Wilson",
    "Chelsea Gray",
    "Jackie Young",
    "Kierstan Bell",
    "Aaliyah Nye",
    "NaLyssa Smith",
    "Dana Evans",
    "Jewell Loyd"
]

# ============================================================================
# LOAD DATA
# ============================================================================

print("Loading game-by-game data...")
df = pd.read_csv(INPUT_FILE)

# Clean column names (replace non-breaking spaces with regular spaces)
df.columns = df.columns.str.replace('\xa0', ' ')

print(f"Total rows: {len(df)}")
print(f"Players: {df['Player'].nunique()}")
print(f"Date range: {df['Game Date'].min()} to {df['Game Date'].max()}")

# ============================================================================
# FILTER TO TOP 8
# ============================================================================

print("\nFiltering to Top 8 rotation...")
df_top8 = df[df['Player'].isin(TOP_8_PLAYERS)].copy()

print(f"Rows after filter: {len(df_top8)}")
print(f"Players: {df_top8['Player'].nunique()}")

# ============================================================================
# CALCULATE SEASON AGGREGATES
# ============================================================================

print("\nAggregating to season level...")

# Group by player
season_stats = df_top8.groupby('Player').agg({
    # COUNTING STATS
    'Game Date': 'count',  # Will rename to games (count game dates instead)
    'win_loss': lambda x: (x == 'W').sum(),  # Wins
    'MIN': 'sum',  # Total minutes
    
    # RATE STATS - Weighted average by minutes
    # These are already rate stats, so we weight by minutes played
    'OffRtg': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'DefRtg': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'NetRtg': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    
    # PERCENTAGES - Weighted average by minutes
    'AST%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'OREB%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'DREB%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'REB%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'TOV_Ratio': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'eFG%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'TS%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'USG%': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'PIE': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    
    # RATIOS - Weighted average by minutes
    'AST_TOV': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    'AST_Ratio': lambda x: np.average(x, weights=df_top8.loc[x.index, 'MIN']),
    
    # PACE - Simple average (not minute-weighted)
    'PACE': 'mean',
}).reset_index()

# Rename columns for clarity
season_stats.rename(columns={'Game Date': 'games_count'}, inplace=True)
season_stats.rename(columns={'win_loss': 'wins'}, inplace=True)
season_stats.rename(columns={'MIN': 'total_minutes'}, inplace=True)

# Calculate derived stats
season_stats['losses'] = season_stats['games_count'] - season_stats['wins']
season_stats['win_pct'] = season_stats['wins'] / season_stats['games_count']
season_stats['mpg'] = season_stats['total_minutes'] / season_stats['games_count']

# Reorder columns for readability
column_order = [
    'Player',
    'games_count',
    'wins',
    'losses',
    'win_pct',
    'total_minutes',
    'mpg',
    'OffRtg',
    'DefRtg',
    'NetRtg',
    'eFG%',
    'TS%',
    'USG%',
    'AST%',
    'AST_TOV',
    'AST_Ratio',
    'TOV_Ratio',
    'OREB%',
    'DREB%',
    'REB%',
    'PIE',
    'PACE'
]

season_stats = season_stats[column_order]

# ============================================================================
# ROUND VALUES FOR CLEANER OUTPUT
# ============================================================================

# Round percentages to 3 decimals
pct_columns = ['eFG%', 'TS%', 'USG%', 'AST%', 'TOV_Ratio', 'OREB%', 'DREB%', 'REB%', 'PIE', 'win_pct']
for col in pct_columns:
    season_stats[col] = season_stats[col].round(3)

# Round ratings to 1 decimal
rating_columns = ['OffRtg', 'DefRtg', 'NetRtg', 'PACE']
for col in rating_columns:
    season_stats[col] = season_stats[col].round(1)

# Round ratios to 2 decimals
ratio_columns = ['AST_TOV', 'AST_Ratio', 'mpg']
for col in ratio_columns:
    season_stats[col] = season_stats[col].round(2)

# ============================================================================
# SAVE OUTPUT
# ============================================================================

season_stats.to_csv(OUTPUT_FILE, index=False)
print(f"\n✅ Season aggregates saved to: {OUTPUT_FILE}")

# ============================================================================
# SUMMARY STATISTICS
# ============================================================================

print("\n" + "="*70)
print("SEASON AGGREGATES SUMMARY")
print("="*70)
print(season_stats.to_string(index=False))

print("\n" + "="*70)
print("KEY STATS RANGES")
print("="*70)
print(f"Games played: {season_stats['games_count'].min():.0f} - {season_stats['games_count'].max():.0f}")
print(f"Minutes per game: {season_stats['mpg'].min():.1f} - {season_stats['mpg'].max():.1f}")
print(f"OffRtg: {season_stats['OffRtg'].min():.1f} - {season_stats['OffRtg'].max():.1f}")
print(f"DefRtg: {season_stats['DefRtg'].min():.1f} - {season_stats['DefRtg'].max():.1f}")
print(f"TS%: {season_stats['TS%'].min():.3f} - {season_stats['TS%'].max():.3f}")
print(f"USG%: {season_stats['USG%'].min():.3f} - {season_stats['USG%'].max():.3f}")

print("\n✅ Script complete!")
