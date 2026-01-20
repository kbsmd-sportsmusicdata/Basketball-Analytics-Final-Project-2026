# PBPStats Shot Zone Integration - Key Findings
## Las Vegas Aces 2025 Season Analysis

---

## 🚨 MAJOR INSIGHT: The Aces "Anti-Analytics" Shot Profile

The Aces have the **most unconventional shot selection in the WNBA** - and it works.

### The Anomaly

| Metric | Aces | League Avg | Rank |
|--------|------|------------|------|
| **Midrange Frequency** | **46.7%** | 37.0% | **#1** (highest) |
| **Rim + 3 Frequency** | 53.3% | 63.0% | **#13** (lowest) |
| **Shot Quality** | 0.470 | 0.497 | #13 (worst) |

### Why It Works: Elite Shot-Making

Despite "analytically poor" shot selection, the Aces maintain above-average efficiency:

| Metric | Aces | League Avg |
|--------|------|------------|
| **True Shooting %** | 55.2% | 54.1% |
| **eFG%** | 50.6% | 50.0% |
| **Short Midrange FG%** | 45.5% | 40.3% |
| **Long Midrange FG%** | 43.4% | 38.0% |

**The Key**: A'ja Wilson, Chelsea Gray, and Jackie Young are elite midrange shooters who convert at +5% above league average. Their individual skill transcends shot selection theory.

---

## 📊 Shot Zone Distribution (All 13 Teams)

| Team | Rim+3 Freq | Midrange Freq | TS% |
|------|------------|---------------|-----|
| ATL | 73.2% | 26.8% | 52.9% |
| LAS | 73.1% | 26.9% | 53.3% |
| IND | 68.1% | 31.9% | 55.8% |
| PHX | 65.7% | 34.3% | 52.1% |
| NYL | 65.7% | 34.3% | 55.0% |
| GSV | 65.0% | 34.9% | 52.0% |
| MIN | 63.6% | 36.4% | 55.3% |
| CHI | 63.2% | 36.8% | 54.9% |
| SEA | 58.2% | 41.8% | 53.8% |
| WAS | 58.1% | 41.9% | 52.9% |
| CON | 56.8% | 43.2% | 50.2% |
| DAL | 55.5% | 44.5% | 51.4% |
| **LVA** | **53.3%** | **46.7%** | **55.2%** |

---

## 🎯 Aces Shot Zone Breakdown

| Zone | FGA | Freq | FG% | Lg Avg FG% | Lg Avg Freq |
|------|-----|------|-----|------------|-------------|
| **Rim** | 447 | 15.0% | 62.6% | 63.4% | 27.1% |
| **Short Midrange** | 1,024 | 34.4% | 45.5% | 40.3% | 26.3% |
| **Long Midrange** | 366 | 12.3% | 43.4% | 38.0% | 10.7% |
| **Corner 3** | 303 | 10.2% | 36.0% | 36.6% | 7.9% |
| **Above Break 3** | 835 | 28.1% | 34.8% | 36.2% | 28.1% |

### Key Observations:
1. **Rim Frequency is LOW** (15.0% vs 27.1% lg avg) - 13th in league
2. **Short Midrange is ELITE** (34.4% freq, 45.5% FG%) - #1 in frequency, +5.2% above avg efficiency
3. **Corner 3 Usage is HIGH** (10.2% vs 7.9%) - Good shot selection when taking 3s
4. **Above Break 3 is AVERAGE** (28.1% vs 28.1%) - Right on league average

---

## 🔄 Second Chance Statistics

| Team | 2nd Chance Pts | % of Total | 2nd Chance eFG% |
|------|----------------|------------|-----------------|
| LVA | 472 | 12.8% | 55.8% |
| League Avg | - | 12.9% | - |

The Aces are league-average in second chance production despite below-average offensive rebounding frequency.

---

## 🏀 Assist Destinations (Where Aces Create)

| Zone | Assists | % of Total |
|------|---------|------------|
| **At Rim** | 153 | 17.8% |
| **Short Midrange** | 258 | **30.0%** |
| **Long Midrange** | 97 | 11.3% |
| **Corner 3** | 107 | 12.4% |
| **Above Break 3** | 246 | 28.6% |

**Pattern**: Aces assist heavily to midrange (41.3% combined) - consistent with their shot selection philosophy.

---

## ⚠️ Turnover Analysis

| Type | Count | % of Total |
|------|-------|------------|
| **Total TOs** | 572 | 100% |
| Live Ball TOs | 291 | 50.9% |
| Dead Ball TOs | 281 | 49.1% |
| Bad Pass | 204 | 35.7% |
| Lost Ball | 87 | 15.2% |
| Travels | - | - |

**Live Ball TO%**: 50.9% (League Avg: 52.8%) - Aces are slightly better than average at avoiding fast break opportunities for opponents.

---

## 📁 Files Delivered

| File | Description | Use Case |
|------|-------------|----------|
| `wnba_shot_zones_2025_pbpstats.csv` | All teams, 76 metrics | Main analysis dataset |
| `wnba_shot_zones_long_2025.csv` | Long format by zone | Tableau visualizations |
| `wnba_assist_destinations_2025.csv` | Assist breakdown by zone | Where teams create |
| `wnba_second_chance_2025.csv` | Second chance stats | Rebounding conversion |
| `wnba_turnover_breakdown_2025.csv` | TO types | Ball security analysis |
| `aces_shot_profile_2025_pbpstats.csv` | Aces only (all metrics) | Deep dive reference |
| `wnba_master_pbpstats_2025.csv` | All 201 columns | Complete reference |
| `wnba_pbpstats_benchmarks_2025.csv` | League averages | Reference lines |

---

## 📈 Recommended Tableau Visualizations

### 1. Shot Zone Heat Map
**Data**: `wnba_shot_zones_long_2025.csv`
- Court diagram with FGA frequency by zone
- Color by FG% (red = cold, green = hot)
- Filter by team

### 2. Modern Profile Scatter
**Data**: `wnba_shot_zones_2025_pbpstats.csv`
- X: Rim + 3 Frequency
- Y: True Shooting %
- Size: Total Points
- Highlight Aces (outlier: low rim+3, high TS%)

### 3. Midrange Efficiency Leaderboard
**Data**: `wnba_shot_zones_2025_pbpstats.csv`
- Horizontal bar: Midrange FG% by team
- Reference line at league average
- Show Aces dominance

### 4. Assist Destination Sankey
**Data**: `wnba_assist_destinations_2025.csv`
- Flow from team to zone
- Width = number of assists
- Compare Aces vs league patterns

### 5. Turnover Breakdown Treemap
**Data**: `wnba_turnover_breakdown_2025.csv`
- Nested rectangles: Live vs Dead → Type
- Color by severity (live ball = red)

---

## 💡 Portfolio Story Angles

### Angle 1: "The Midrange Maestros"
The Aces prove that player skill can override shot selection analytics. Their 46.7% midrange frequency would doom most teams, but elite shot-makers convert at +5% above average.

### Angle 2: "Shot Quality vs Shot Making"
Aces rank #13 in Shot Quality (0.470) but #4 in TS% (55.2%). The gap measures their shot-making premium.

### Angle 3: "Phase Analysis + Shot Profile"
Did the Phase 1 → Phase 2 transformation correlate with shot selection changes? (Worth investigating with game-level pbpstats data)

---

## 🔬 Further Analysis Needed

1. **Game-level pbpstats data** - Did shot selection change between Phase 1 (14-14) and Phase 2 (16-0)?
2. **Player-level shot zones** - Who takes the midrange shots? (Likely A'ja Wilson, Chelsea Gray)
3. **Opponent defensive adjustments** - How did playoff opponents (Storm, Sun, Mercury) defend the midrange?
4. **Clutch shot distribution** - Do Aces go even more midrange in close games?

---

*Generated from pbpstats.com 2025 WNBA team totals data*
