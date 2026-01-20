# Las Vegas Aces 2025 Season Phase Analysis
## Complete Tableau Visualization Guide - REAL DATA

---

## 🏆 EXECUTIVE SUMMARY: The Championship Turnaround

The Las Vegas Aces 2025 season is a **masterclass in mid-season transformation**:

| Phase | Games | Record | Net Rating | Story Arc |
|-------|-------|--------|------------|-----------|
| **Phase 1: Rocky Start** | 1-28 | **14-14** | **-3.1** | Struggling, below league average |
| **Phase 2: Winning Streak** | 29-44 | **16-0** | **+17.0** | System clicking, dominant |
| **Phase 3: Playoffs** | Playoffs | **9-3** | **+8.1** | Championship execution |

**The Key Insight**: A **+20.1 point Net Rating swing** from Phase 1 to Phase 2, driven by:
- **Offensive eFG%**: 47.8% → 55.5% (+7.7 percentage points)
- **Defensive eFG%**: 50.0% → 46.8% (-3.2 pp, improvement)
- **Turnover Rate**: 15.7% → 13.7% (-2.0 pp, improvement)

---

## 📁 DATASETS CREATED (REAL DATA)

### Primary Analysis Files

| File | Records | Purpose | Key Use |
|------|---------|---------|---------|
| `aces_game_by_game_2025_real.csv` | 56 games | Game-level metrics | Line charts, trends |
| `aces_phase_summary_2025_real.csv` | 3 phases | Phase aggregates | KPI cards, comparisons |
| `aces_phase_comparison_2025_real.csv` | 19 metrics | Metric deltas | Delta charts |
| `aces_phase_metrics_long_2025_real.csv` | 57 rows | Long format | Tableau flexibility |
| `wnba_team_standings_2025.csv` | 13 teams | League benchmarks | Rankings, percentiles |
| `wnba_benchmarks_2025.csv` | 15 metrics | League averages | Reference lines |

---

## 🔢 ADJUSTED FOUR FACTORS WEIGHTS

Based on WNBA research showing shooting and free throws account for majority of Four Factors "power":

| Factor | Traditional Weight | **Adjusted Weight** | Rationale |
|--------|-------------------|---------------------|-----------|
| eFG% | 40% | **35%** | Still most important |
| FT Rate | 15% | **25%** | WNBA research: highly predictive |
| TOV% | 25% | **22%** | Slightly reduced |
| OREB% | 20% | **18%** | Slightly reduced |

**These weights are reflected in all analysis files.**

---

## 📊 KEY METRICS IN DATASETS

### Offensive Four Factors (`off_` prefix)
| Column | Description | Aces Phase 2 | League Avg |
|--------|-------------|--------------|------------|
| `off_efg_pct` | Effective FG% | **55.5%** | 50.0% |
| `off_ft_rate` | FTA/FGA | 23.4% | 27.1% |
| `off_tov_pct` | TOV/Possessions | **13.7%** | 16.2% |
| `off_oreb_pct` | ORB/(ORB+Opp DRB) | 24.9% | 24.8% |

### Defensive Four Factors (`def_` prefix) - Lower is Better
| Column | Description | Aces Phase 2 | League Avg |
|--------|-------------|--------------|------------|
| `def_efg_pct` | Opponent eFG% | **46.8%** | 50.0% |
| `def_ft_rate` | Opp FTA/FGA | **21.9%** | 27.1% |
| `def_tov_pct` | Opp TOV% (higher=better) | 15.5% | 16.2% |
| `def_oreb_pct` | Opp OREB% | 24.7% | 24.8% |

### Efficiency Metrics
| Column | Description | Aces Phase 2 | League Avg |
|--------|-------------|--------------|------------|
| `ortg` | Points/100 possessions | **114.4** | 102.2 |
| `drtg` | Points allowed/100 poss | **97.5** | 102.2 |
| `net_rtg` | ORtg - DRtg | **+17.0** | 0.0 |
| `pace` | Possessions/game | 77.8 | 79.9 |

### Scoring Mix
| Column | Description | Insight |
|--------|-------------|---------|
| `pct_pts_paint` | % of points from paint | Interior dominance |
| `pct_pts_3pt` | % of points from 3s | Perimeter game |
| `pct_pts_ft` | % of points from FTs | Free throw generation |

---

## 📈 RECOMMENDED TABLEAU VISUALIZATIONS

### CHART 1: Four Factors Transformation (PRIORITY)
**Type**: Grouped Bar Chart or Slope Chart
**Data**: `aces_phase_comparison_2025_real.csv`

**Setup**:
1. Filter: `category` contains 'Four Factors'
2. Rows: `metric`
3. Columns: `value_phase1`, `value_phase2`, `value_phase3`
4. Add Reference Line: `league_avg`
5. Color: Phase

**Key Story**: Show simultaneous offensive AND defensive Four Factors improvement

```
Example Calculated Field for Delta Arrow:
IF [delta_p1_to_p2] > 0 THEN "↑" ELSE "↓" END
```

---

### CHART 2: Net Rating Journey (Game-by-Game)
**Type**: Line Chart with Rolling Average
**Data**: `aces_game_by_game_2025_real.csv`

**Setup**:
1. X-axis: `game_number`
2. Y-axis: `net_rtg`
3. Add 5-game rolling average
4. Add vertical reference bands at game 28 and 44
5. Color line segments by `phase`
6. Reference line at 0

**Calculated Field - 5-Game Rolling Net Rating**:
```
WINDOW_AVG(SUM([net_rtg]), -4, 0)
```

---

### CHART 3: Offense vs Defense Efficiency Quadrant
**Type**: Scatter Plot
**Data**: `aces_phase_summary_2025_real.csv`

**Setup**:
1. X-axis: `ortg` (Offensive Rating)
2. Y-axis: `drtg` (Defensive Rating) - **REVERSE AXIS**
3. Size: `games`
4. Color: `phase`
5. Reference lines at league average (102.2)

**Quadrants**:
- Top-Right: Elite Both Ways (where Phase 2 should be)
- Top-Left: Defense First
- Bottom-Right: Offense First
- Bottom-Left: Struggling (where Phase 1 was)

---

### CHART 4: League Standings with Aces Highlight
**Type**: Horizontal Bar Chart
**Data**: `wnba_team_standings_2025.csv`

**Setup**:
1. Rows: `team`
2. Columns: `net_rtg` (or `win_pct`)
3. Sort descending
4. Color: Highlight Aces in gold/red, others in gray
5. Add `net_rtg_rank` as label

**Insight**: Show Aces #5 in Net Rating despite .500 start

---

### CHART 5: Offensive vs Defensive Four Factors (Small Multiples)
**Type**: Bullet Chart or Paired Bar Chart
**Data**: `aces_phase_metrics_long_2025_real.csv`

**Setup**:
1. Filter: `category` contains 'Four Factors'
2. Create 8 mini-charts (4 offensive, 4 defensive)
3. Compare Phase 1 vs Phase 2 vs Phase 3
4. Add league average reference

---

### CHART 6: Phase Record Summary (KPI Dashboard)
**Type**: Big Number Cards
**Data**: `aces_phase_summary_2025_real.csv`

**Create 3 Cards per Phase**:
- Record (e.g., "14-14")
- Net Rating (e.g., "-3.1")
- Win % (e.g., "50%")

**Color Coding**:
- Phase 1: Red/Orange accent
- Phase 2: Green accent
- Phase 3: Gold accent

---

### CHART 7: Delta Waterfall (What Changed Most?)
**Type**: Waterfall or Diverging Bar
**Data**: `aces_phase_comparison_2025_real.csv`

**Setup**:
1. Rows: `metric`
2. Columns: `delta_p1_to_p2`
3. Sort by absolute value
4. Color: Positive (green) vs Negative (red)
5. For defensive metrics, flip interpretation

**Top Changes to Highlight**:
1. Off eFG%: +7.7%
2. Def eFG%: -3.2% (improvement)
3. Net Rating: +20.1

---

## 🎨 DESIGN SPECIFICATIONS

### Aces Color Palette
```
Primary Red:    #C8102E
Gold:           #FDB927  
Navy:           #13294B
Gray:           #767676
White:          #FFFFFF
```

### Phase Colors
```
Phase 1 (Rocky):    #DC143C (crimson - struggling)
Phase 2 (Streak):   #228B22 (forest green - dominance)
Phase 3 (Playoffs): #FFD700 (gold - championship)
```

### League Context Colors
```
League Average:     #CCCCCC (gray)
Elite Threshold:    #006400 (dark green)
Poor Threshold:     #8B0000 (dark red)
```

---

## 📝 ANSWERING YOUR KEY ANALYTICAL QUESTIONS

### Q1: How did the Aces' team profile at 14-14 differ from during the 16-0 streak?

**REAL DATA ANSWER**:

| Metric | Phase 1 (14-14) | Phase 2 (16-0) | Change | vs League |
|--------|-----------------|----------------|--------|-----------|
| **Net Rating** | -3.1 | +17.0 | **+20.1** | +17 above avg |
| **Off eFG%** | 47.8% | 55.5% | **+7.7%** | +5.5% above avg |
| **Def eFG%** | 50.0% | 46.8% | **-3.2%** | 3.2% better |
| **Off TOV%** | 15.7% | 13.7% | **-2.0%** | 2.5% better |
| **ORtg** | 100.0 | 114.4 | **+14.4** | +12.2 above avg |
| **DRtg** | 103.1 | 97.5 | **-5.6** | 4.7 better |

**Key Insight**: The transformation was **two-way** - both offense AND defense improved dramatically.

---

### Q2: Which Four Factor levers changed most during the streak?

**REAL DATA ANSWER** (using adjusted weights):

| Factor | Phase 1 | Phase 2 | Raw Δ | Weight | Weighted Δ |
|--------|---------|---------|-------|--------|------------|
| **Off eFG%** | 47.8% | 55.5% | +7.7% | 35% | **+2.7%** |
| **Def eFG%** | 50.0% | 46.8% | -3.2% | 35% | **+1.1%** |
| Off TOV% | 15.7% | 13.7% | -2.0% | 22% | +0.4% |
| Def FT Rate | 25.8% | 21.9% | -3.9% | 25% | **+1.0%** |

**Ranking by Impact**:
1. **Shooting (eFG%)** - Both offense AND defense improved
2. **Defensive FT Rate** - Stopped fouling, denied free points
3. **Turnovers** - Better ball security

---

### Q3: How did strengths/weaknesses compare to league benchmarks?

**REAL DATA ANSWER**:

| Metric | Phase 1 vs Lg | Phase 2 vs Lg | Transformation |
|--------|--------------|---------------|----------------|
| Off eFG% | -2.2% (below) | **+5.5% (elite)** | Below → Elite |
| Def eFG% | 0.0% (avg) | **-3.2% (elite)** | Average → Elite |
| Net Rating | -3.1 (below) | **+17.0 (dominant)** | Struggling → Best |
| TOV% | +0.5% (slightly worse) | **-2.5% (elite)** | Average → Elite |

**Summary**: Phase 1 Aces were average-to-below in most categories. Phase 2 Aces were **elite in shooting efficiency on both ends**.

---

## 🔧 TABLEAU CALCULATED FIELDS

### Phase Classification
```
IF [is_playoffs] THEN "Phase 3: Playoffs"
ELSEIF [game_number] <= 28 THEN "Phase 1: Rocky Start"  
ELSE "Phase 2: Winning Streak"
END
```

### Net Rating Tier
```
IF [net_rtg] >= 10 THEN "Dominant"
ELSEIF [net_rtg] >= 5 THEN "Elite"
ELSEIF [net_rtg] >= 0 THEN "Above Average"
ELSEIF [net_rtg] >= -5 THEN "Below Average"
ELSE "Struggling"
END
```

### Four Factor Improvement Flag
```
// For offensive metrics where higher is better
IF [category] = 'Four Factors (Offense)' THEN
    IF [metric_key] = 'off_tov_pct' THEN
        IF [delta_p1_to_p2] < 0 THEN "✓ Improved" ELSE "↓ Declined" END
    ELSE
        IF [delta_p1_to_p2] > 0 THEN "✓ Improved" ELSE "↓ Declined" END
    END
ELSE  // Defense - interpret directions correctly
    IF [metric_key] = 'def_tov_pct' THEN
        IF [delta_p1_to_p2] > 0 THEN "✓ Improved" ELSE "↓ Declined" END
    ELSE
        IF [delta_p1_to_p2] < 0 THEN "✓ Improved" ELSE "↓ Declined" END
    END
END
```

### Rolling 5-Game Net Rating
```
WINDOW_AVG(SUM([net_rtg]), -4, 0)
```

---

## 📌 METRICS REQUIRING PBPSTATS DATA

The following metrics would benefit from pbpstats.com data for deeper analysis:

| Metric | Current Source | Better Source | Why |
|--------|---------------|---------------|-----|
| Points by zone | Estimated | pbpstats shots | Exact location data |
| Second chance pts | Not available | pbpstats | ORB conversion rate |
| Transition pts | `fast_break_points` | pbpstats | More granular |
| Assist location | Not available | pbpstats | Where assists create |
| Shot distribution | 3PA only | pbpstats | Full zone breakdown |
| Penalty/bonus pts | Not available | pbpstats | Foul environment |

**Recommendation**: Pull from `https://www.pbpstats.com/totals/wnba/team?Season=2025` for:
- Detailed shot distribution by zone
- Second chance statistics
- Assist destinations
- Turnover types (live ball vs dead ball)

---

## 🚀 NEXT STEPS

1. **Import CSVs into Tableau**
2. **Build the 7 recommended visualizations**
3. **Create a 2-page dashboard**:
   - Page 1: Phase Comparison (KPIs, Four Factors, Efficiency)
   - Page 2: Game-by-Game Journey (trends, turning points)
4. **Pull pbpstats data** for shot distribution deep dive
5. **Export static charts** for presentation slides

---

## 📚 DATA NOTES

**Source**: wehoop WNBA 2025 team box scores  
**Games**: 56 Aces games (44 regular season + 12 playoffs)  
**Teams**: 13 WNBA teams (excludes All-Star placeholder teams)  
**Possession Estimate**: Dean Oliver formula (FGA + 0.44×FTA - ORB + TOV)  
**Metrics validated**: Against league totals for consistency  

---

*Generated from real 2025 WNBA data - Las Vegas Aces Championship Season Analysis*
