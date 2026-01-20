# Las Vegas Aces 2025 - Weighted Positional Percentile Analysis
## League-Wide Context for Player Profiles

---

## Executive Summary

This analysis provides **weighted positional percentiles** for the Aces' top 8 rotation players, calculated against **150 WNBA players with 10+ MPG** in the 2025 season. Percentiles are weighted by total minutes played to ensure high-volume players carry appropriate influence in the distribution.

### Key Findings:
1. **A'ja Wilson** has **7 elite skills** (90th+ percentile) with **0 weaknesses** - truly generational
2. **Jackie Young** is an **Elite Two-Way Star** with 4 elite skills including 100th percentile PER among guards
3. **Chelsea Gray** is the team's **Primary Ball Handler** but has a turnover problem (<25th percentile TOV%)
4. **Kierstan Bell & Aaliyah Nye** have elite 3PT attempt rates but significant efficiency issues

---

## Technical Notes - Percentile Calculation Method

### Weighted Percentile Function

This analysis uses a **weighted percentile methodology** adapted from the project's R-based basketball analytics pipeline. The key principle: **players with more minutes carry more weight in the percentile distribution**, ensuring that the percentile ranks reflect meaningful comparisons among players with similar playing time contexts.

#### Algorithm Implementation (Python)

```python
def weighted_percentile(x, w):
    """
    Returns values in [0,1] representing the weighted cumulative distribution 
    position of each x, weighted by w (typically total minutes played).
    
    Methodology:
    1. Handle NA values - set weights to 0 for NA observations
    2. Sort values in ascending order
    3. Calculate cumulative weights
    4. Percentile = cumulative_weight / total_weight
    
    This ensures high-volume players (more minutes) have greater influence
    on where the distribution thresholds fall.
    """
    # Convert to numpy arrays
    x = np.array(x, dtype=float)
    w = np.array(w, dtype=float)
    
    # Handle NA weights - set to 0
    w = np.where(np.isnan(w), 0, w)
    
    # Track NA values in x
    x_na = np.isnan(x)
    
    # Get non-NA values and weights
    x2 = x[~x_na]
    w2 = w[~x_na]
    
    # Sort by x values
    ord_idx = np.argsort(x2)
    x_sorted = x2[ord_idx]
    w_sorted = w2[ord_idx]
    
    # Cumulative weights → percentile positions
    cw = np.cumsum(w_sorted)
    total_w = np.sum(w_sorted)
    p_sorted = cw / total_w
    
    # Map back to original order
    result = np.full(len(x), np.nan)
    result[~x_na] = p_sorted[np.argsort(ord_idx)]
    
    return result
```

#### Equivalent R Implementation (from project reference)

```r
weighted_percentile <- function(x, w) {
  if (length(x) == 0) return(numeric(0))
  
  w[is.na(w)] <- 0
  x_na <- is.na(x)
  
  if (all(x_na) || sum(w[!x_na]) <= 0) {
    return(rep(NA_real_, length(x)))
  }
  
  x2 <- x[!x_na]
  w2 <- w[!x_na]
  
  ord <- order(x2)
  x_sorted <- x2[ord]
  w_sorted <- w2[ord]
  
  cw <- cumsum(w_sorted)
  total_w <- sum(w_sorted)
  p_sorted <- cw / total_w
  
  p2 <- numeric(length(x))
  p2[x_na] <- NA
  p2[!x_na][ord] <- p_sorted
  
  return(p2)
}
```

### Position Group Consolidation

To ensure meaningful sample sizes for percentile calculations, positions were consolidated into three groups:

| Original Position | Consolidated Group | Count (10+ MPG) |
|-------------------|-------------------|-----------------|
| G | Guards (G) | 69 |
| G-F | Guards (G) | 9 |
| **Total Guards** | **G** | **78** |
| F | Forwards (F) | 47 |
| F, G | Forwards (F) | 1 |
| **Total Forwards** | **F** | **48** |
| C | Centers (C) | 17 |
| C-F | Centers (C) | 7 |
| **Total Centers** | **C** | **24** |

### Weighting Variable

**Weight = Total Minutes Played (min_total)**

- Players with more minutes have proportionally more influence on percentile thresholds
- This prevents low-minute players from skewing the distribution
- Example: A'ja Wilson (1,247 minutes) has ~15x the weight of a 80-minute player

### Handling "Lower is Better" Stats

For statistics where lower values are better (TOV%, player_def_rtg, PF), the algorithm inverts the values before calculating percentiles:

```python
if not higher_is_better:
    percentile = weighted_percentile(-values, weights)
```

This ensures that a "90th percentile" always means "better than 90% of players" regardless of the stat's direction.

### Dataset Filtering

- **Source**: WNBA 2025 player statistics (basic + advanced)
- **Filter Applied**: Players with **≥10 minutes per game**
- **Result**: 150 of 184 total players qualified
- **Rankings**: Recalculated using only the 150-player filtered pool

---

## Player-by-Player Analysis

### 🏀 A'JA WILSON | C → Group C | 31.2 MPG | 23.4 PPG
**Archetype: GENERATIONAL TALENT**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| PER | 33.1 | **100th** | **100th** | 🟢 ELITE |
| Win Shares | 8.9 | **100th** | **100th** | 🟢 ELITE |
| TS% | 0.595 | **89th** | 87th | |
| AST% | 19.8% | **100th** | 73rd | 🟢 ELITE |
| TOV% | 9.9% | **95th** | 89th | 🟢 ELITE |
| TREB% | 19.1% | **93rd** | 90th | 🟢 ELITE |
| STL% | 2.3% | **95th** | 90th | 🟢 ELITE |
| Def Rating | 93.3 | **94th** | 97th | 🟢 ELITE |

**Elite Skills (7)**: PER, AST%, TOV%, TREB%, STL%, player_def_rtg, win_shares
**Improvement Areas (0)**: None

**Key Insight**: The only player in the analysis with 7+ elite skills and zero weaknesses. Her weighted percentile dominance reflects not just raw stats but sustained excellence across high minutes.

---

### 🏀 JACKIE YOUNG | G → Group G | 30.4 MPG | 16.5 PPG
**Archetype: ELITE TWO-WAY STAR**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| PER | 22.1 | **100th** | 92nd | 🟢 ELITE |
| Win Shares | 6.3 | **98th** | 94th | 🟢 ELITE |
| TS% | 0.595 | **94th** | 84th | 🟢 ELITE |
| FT% | 0.878 | **91st** | 93rd | 🟢 ELITE |
| AST% | 28.1% | 85th | 89th | |
| Def Rating | 102.5 | 60th | 49th | |

**Elite Skills (4)**: PER, ts_pct, win_shares, FT%
**Improvement Areas (0)**: None

**Key Insight**: Upgraded from "Primary Ball Handler" to "Elite Two-Way Star" based on elite efficiency metrics. Her 100th percentile PER among guards confirms All-Star caliber play.

---

### 🏀 CHELSEA GRAY | G → Group G | 31.1 MPG | 11.2 PPG
**Archetype: PRIMARY BALL HANDLER**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| PER | 15.3 | 67th | 53rd | |
| AST% | 30.7% | **89th** | 91st | |
| TS% | 0.575 | **82nd** | 76th | |
| Win Shares | 3.7 | 74th | 70th | |
| TOV% | 17.9% | **16th** | 8th | 🔴 WEAKNESS |

**Elite Skills (0)**: None (highest is AST% at 89th)
**Improvement Areas (1)**: TOV%

**Key Insight**: Elite facilitator (89th percentile AST%) whose turnovers (16th percentile TOV%) represent a significant weakness. The classic tradeoff of high-assist guards.

---

### 🏀 JEWELL LOYD | G → Group G | 28.3 MPG | 11.2 PPG
**Archetype: BALL SECURITY SPECIALIST**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| TOV% | 8.8% | **93rd** | 89th | 🟢 ELITE |
| 3PT Rate | 50.4% | 77th | 83rd | |
| PER | 13.4 | 53rd | 41st | |
| TS% | 0.535 | 49th | 43rd | |
| AST% | 8.9% | **18th** | 38th | 🔴 WEAKNESS |

**Elite Skills (1)**: TOV%
**Improvement Areas (1)**: AST%

**Key Insight**: Renamed from "Role Player" to "Ball Security Specialist" - her elite turnover rate (93rd percentile) is her defining trait. Limited playmaking (18th percentile AST%) keeps her from a larger offensive role.

---

### 🏀 NALYSSA SMITH | F → Group F | 21.2 MPG | 7.6 PPG
**Archetype: PAINT PRESENCE**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| BLK% | 1.5% | **75th** | 82nd | |
| TREB% | 11.7% | 61st | 76th | |
| TS% | 0.540 | 52nd | 51st | |
| PER | 13.2 | 30th | 37th | |
| AST% | 4.2% | **4th** | 7th | 🔴 WEAKNESS |
| STL% | 0.6% | **13th** | 9th | 🔴 WEAKNESS |
| FT% | 0.639 | **6th** | 5th | 🔴 WEAKNESS |
| 3PT Rate | 16.9% | **16th** | 14th | 🔴 WEAKNESS |

**Elite Skills (0)**: None
**Improvement Areas (4)**: AST%, STL%, 3p_rate, FT%

**Key Insight**: Renamed to "Paint Presence" reflecting her rim protection value (75th percentile BLK%). However, significant weaknesses in shooting (FT%, 3PT) and perimeter skills limit her role.

---

### 🏀 DANA EVANS | G → Group G | 17.7 MPG | 6.6 PPG
**Archetype: ROLE PLAYER**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| TOV% | 11.6% | 82nd | 79th | |
| AST% | 16.7% | 45th | 71st | |
| PER | 11.0 | 27th | 21st | |
| TS% | 0.490 | **19th** | 14th | 🔴 WEAKNESS |
| TREB% | 3.0% | **4th** | 3rd | 🔴 WEAKNESS |
| STL% | 0.8% | **11th** | 14th | 🔴 WEAKNESS |
| FT% | 0.719 | **23rd** | 33rd | 🔴 WEAKNESS |

**Elite Skills (0)**: None
**Improvement Areas (4)**: ts_pct, TREB%, STL%, FT%

**Key Insight**: Solid ball handler (82nd percentile TOV%) but multiple weaknesses prevent a larger role. Efficiency (19th percentile TS%) is the primary concern.

---

### 🏀 KIERSTAN BELL | F → Group F | 12.2 MPG | 4.2 PPG
**Archetype: STRETCH FORWARD**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| 3PT Rate | 48.7% | **93rd** | 91st | 🟢 ELITE |
| TOV% | 10.3% | **91st** | 90th | 🟢 ELITE |
| PER | 10.5 | **14th** | 17th | 🔴 WEAKNESS |
| TS% | 0.455 | **3rd** | 5th | 🔴 WEAKNESS |
| AST% | 7.6% | **9th** | 13th | 🔴 WEAKNESS |
| TREB% | 6.7% | **16th** | 19th | 🔴 WEAKNESS |
| Def Rating | 103.3 | **21st** | 15th | 🔴 WEAKNESS |
| Win Shares | 0.5 | **7th** | 13th | 🔴 WEAKNESS |

**Elite Skills (2)**: TOV%, 3p_rate
**Improvement Areas (6)**: PER, ts_pct, AST%, TREB%, player_def_rtg, win_shares

**Key Insight**: Has the right shot profile (93rd percentile 3PT rate) but the worst efficiency in the rotation (3rd percentile TS%). Developmental priority: convert attempts into makes.

---

### 🏀 AALIYAH NYE | G-F → Group G | 15.3 MPG | 3.8 PPG
**Archetype: 3PT SPECIALIST**

| Stat | Value | Pos Pctile | League Pctile | Flag |
|------|-------|------------|---------------|------|
| 3PT Rate | 65.9% | **98th** | 93rd | 🟢 ELITE |
| FT% | 0.824 | 81st | 66th | |
| PER | 5.8 | **5th** | 3rd | 🔴 WEAKNESS |
| TS% | 0.470 | **10th** | 7th | 🔴 WEAKNESS |
| AST% | 6.6% | **7th** | 19th | 🔴 WEAKNESS |
| STL% | 0.9% | **8th** | 10th | 🔴 WEAKNESS |
| Win Shares | 0.3 | **13th** | 8th | 🔴 WEAKNESS |

**Elite Skills (1)**: 3p_rate
**Improvement Areas (5)**: PER, ts_pct, AST%, STL%, win_shares

**Key Insight**: Purest 3PT specialist (98th percentile rate) but low efficiency (10th percentile TS%) limits value. Her role is entirely dependent on converting her 3PT attempts.

---

## Summary: Archetype Updates

| Player | Previous Archetype | New Archetype | Justification |
|--------|-------------------|---------------|---------------|
| A'ja Wilson | Efficient Big | **Generational Talent** | 7 elite skills, 0 weaknesses |
| Jackie Young | Primary Ball Handler | **Elite Two-Way Star** | 100th pctile PER, elite efficiency |
| Chelsea Gray | Facilitator | **Primary Ball Handler** | 89th pctile AST%, team floor general |
| Jewell Loyd | Role Player | **Ball Security Specialist** | 93rd pctile TOV%, defines her value |
| NaLyssa Smith | Role Player | **Paint Presence** | 75th pctile BLK%, interior focus |
| Dana Evans | Role Player | **Role Player** | No standout skills, multiple weaknesses |
| Kierstan Bell | Two-Way Wing | **Stretch Forward** | 93rd pctile 3PT rate, positional fit |
| Aaliyah Nye | Role Player | **3PT Specialist** | 98th pctile 3PT rate, specialist role |

---

## Strength/Weakness Summary

### Elite Skills Distribution (90th+ Percentile)
| Player | Count | Skills |
|--------|-------|--------|
| A'ja Wilson | 7 | PER, AST%, TOV%, TREB%, STL%, player_def_rtg, win_shares |
| Jackie Young | 4 | PER, ts_pct, win_shares, FT% |
| Kierstan Bell | 2 | TOV%, 3p_rate |
| Aaliyah Nye | 1 | 3p_rate |
| Jewell Loyd | 1 | TOV% |
| Chelsea Gray | 0 | - |
| NaLyssa Smith | 0 | - |
| Dana Evans | 0 | - |

### Improvement Areas (<25th Percentile)
| Player | Count | Areas |
|--------|-------|-------|
| Kierstan Bell | 6 | PER, ts_pct, AST%, TREB%, player_def_rtg, win_shares |
| Aaliyah Nye | 5 | PER, ts_pct, AST%, STL%, win_shares |
| Dana Evans | 4 | ts_pct, TREB%, STL%, FT% |
| NaLyssa Smith | 4 | AST%, STL%, 3p_rate, FT% |
| Chelsea Gray | 1 | TOV% |
| Jewell Loyd | 1 | AST% |
| A'ja Wilson | 0 | - |
| Jackie Young | 0 | - |

---

## Files Generated

| File | Description |
|------|-------------|
| `aces_player_profiles_with_percentiles_2025.csv` | Complete profiles with 104 columns including all percentiles |
| `wnba_2025_weighted_percentiles.csv` | Full league data (150 players) with weighted percentiles |
| `aces_weighted_percentiles_2025.csv` | Aces-only data from WNBA dataset |

---

## Data Integration Completed

✅ **1. Positional percentile columns added** (`*_pctile_pos`) - 26 columns
✅ **2. Archetypes updated** based on weighted percentile analysis
✅ **3. Strength/weakness flags added** (elite_skills, improvement_areas, counts)
✅ **4. Recalculated rankings** (`*_rank_filtered`) for 150-player pool - 7 columns
✅ **5. Merged into player profiles** using player_name as join key

---

*Analysis completed: January 2025*
*Methodology: Weighted percentile calculation following project R script reference*
*Data source: WNBA 2025 season statistics (150 players with 10+ MPG)*
