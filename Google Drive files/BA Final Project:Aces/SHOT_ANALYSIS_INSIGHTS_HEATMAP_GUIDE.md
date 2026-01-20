# Shot Analysis Insights & Tableau Heat Map Guide
## Las Vegas Aces 2025 Season

---

# 🔑 KEY FINDINGS

## 1. Phase 1 vs Phase 2: Shot Selection Changes

**The Verdict: Shot selection changed MINIMALLY, efficiency improved DRAMATICALLY**

| Metric | Phase 1 (14-14) | Phase 2 (16-0) | Change |
|--------|-----------------|----------------|--------|
| **Midrange Frequency** | 47.5% | 45.8% | -1.7% |
| **Rim + 3 Frequency** | 52.5% | 54.2% | +1.7% |
| **eFG%** | 47.8% | 55.4% | **+7.6%** |
| **TS%** | 52.9% | 59.2% | **+6.2%** |

### The Insight
The Aces didn't transform their shot selection during the 16-0 streak. They made the **same types of shots at dramatically better rates**:

| Zone | Phase 1 FG% | Phase 2 FG% | Improvement |
|------|-------------|-------------|-------------|
| Rim | 61.1% | 69.0% | **+7.9%** |
| Short MR | 43.1% | 48.5% | **+5.4%** |
| Above Break 3 | 31.1% | 38.9% | **+7.8%** |
| Corner 3 | 33.7% | 37.7% | **+4.0%** |

**Bottom Line**: The winning streak wasn't about shot selection changes - it was about **shot-making excellence**. The same midrange-heavy profile that seemed broken in Phase 1 became dominant when the shots started falling.

---

## 2. Who Takes All Those Midrange Shots?

**Top 3 Midrange Volume Leaders (2025 Regular Season):**

| Player | MR Attempts | MR Frequency | MR FG% | Profile |
|--------|-------------|--------------|--------|---------|
| **A'ja Wilson** | 470 | 71.5% | 46.4% | Midrange Dominant |
| **Jackie Young** | 238 | 43.4% | 50.8% | Balanced |
| **Chelsea Gray** | 189 | 49.0% | 45.5% | Midrange/3PT |

### A'ja Wilson: The Midrange Queen
- Takes **71.5%** of her shots from midrange (SMR + LMR)
- Only **9.0%** from 3PT range
- Only **19.5%** at the rim
- Shoots **46.4%** from midrange (elite for that volume)

**This is the most anti-analytics shot profile for a superstar in the WNBA**, yet she's arguably the best player in the league. Her skill transcends optimization theory.

### The Core Three Account for:
- **897 midrange attempts** (out of team total)
- Combined midrange FG%: ~47% (well above league average of 40%)

---

## 3. Modern Profile vs Efficiency: The Outlier Chart

**The Aces are a statistical anomaly:**

| Team | Rim+3 Freq | TS% | Category |
|------|------------|-----|----------|
| Atlanta Dream | 73.2% | 55.3% | Modern |
| Los Angeles Sparks | 73.1% | 56.2% | Modern |
| **Las Vegas Aces** | **53.3%** | **55.2%** | **Midrange-Heavy** |
| Connecticut Sun | 56.8% | 50.2% | Midrange-Heavy |
| Dallas Wings | 55.5% | 51.4% | Midrange-Heavy |

**The Aces have:**
- **Lowest** Rim + 3 Frequency (53.3% vs 63.0% league avg)
- **Worst** Shot Quality (0.470 vs 0.497 league avg)
- **4th Best** True Shooting % (55.2%)

**This should be impossible.** They take the "worst" shots but achieve elite efficiency through pure shot-making ability.

---

## 4. Shot Zone Comparison: Aces vs League

| Zone | Aces Freq | League Avg | Difference | Aces FG% | League FG% |
|------|-----------|------------|------------|----------|------------|
| **Rim** | 15.0% | 27.1% | **-12.1%** | 62.6% | 63.1% |
| **Short MR** | 34.4% | 26.3% | **+8.2%** | 45.5% | 40.3% |
| **Long MR** | 12.3% | 10.7% | +1.6% | 43.4% | 38.0% |
| **Corner 3** | 10.2% | 7.9% | +2.3% | 36.0% | 36.6% |
| **Above Break 3** | 28.1% | 28.1% | 0.0% | 34.9% | 32.9% |

### Key Takeaways:
1. **Rim avoidance**: Aces shoot 12% LESS at the rim than league average
2. **Midrange emphasis**: +8.2% more short midrange shots
3. **Elite midrange efficiency**: +5.2% better than league average from short MR
4. **Corner 3 efficiency**: Actually slightly below average (-0.6%)
5. **Above break 3**: Average frequency, above-average efficiency (+2.0%)

---

# 📊 TABLEAU HEAT MAP GUIDE

## Building the Shot Zone Heat Map

### Data Source: `shot_zone_heatmap_data_2025.csv`

**Columns:**
- `zone`: Zone name (Rim, Short MR, Long MR, Corner 3, Above Break 3)
- `x_center`, `y_center`: Court coordinates for zone placement
- `team`: "Las Vegas Aces" or "League Avg"
- `frequency`: Shot frequency (0-1)
- `fg_pct`: Field goal percentage (0-1)
- `freq_vs_league`: Aces frequency minus league average

---

### Option A: Simple Comparison Bar Chart

**Step 1: Set Up**
1. Connect to `shot_zone_heatmap_data_2025.csv`
2. Drag `zone` to Rows
3. Drag `frequency` to Columns
4. Drag `team` to Color

**Step 2: Format**
1. Edit Colors:
   - Las Vegas Aces: #C8102E (Red)
   - League Avg: #999999 (Gray)
2. Sort zones by Aces frequency (descending)
3. Add labels showing percentage

**Step 3: Add Reference**
1. Add a second chart showing FG% by zone
2. Place side-by-side for comparison

---

### Option B: Court Diagram Heat Map (Advanced)

**Step 1: Create Court Background**
1. Use a basketball court image as background
2. Set coordinates to match court dimensions

**Step 2: Plot Zones**
1. Use `x_center` and `y_center` for placement
2. Size marks by `frequency`
3. Color marks by `fg_pct` (gradient: red = cold, green = hot)

**Step 3: Calculated Fields**

```
// Frequency Display
[frequency] * 100

// FG% Display  
[fg_pct] * 100

// Freq vs League (for labels)
IF [team] = 'Las Vegas Aces' THEN
    [freq_vs_league] * 100
ELSE 0
END

// Color Scale for Efficiency
IF [fg_pct] >= 0.55 THEN 'Hot'
ELSEIF [fg_pct] >= 0.45 THEN 'Warm'
ELSEIF [fg_pct] >= 0.35 THEN 'Average'
ELSE 'Cold'
END
```

**Step 4: Zone Shapes**
Create custom shapes for each zone:
- Rim: Circle (center court, near basket)
- Short MR: Curved band (paint area)
- Long MR: Larger curved band (elbow area)
- Corner 3: Small rectangles (corners)
- Above Break 3: Arc (top of key)

---

### Option C: Small Multiples by Zone (Recommended for Portfolio)

**Structure:**
```
┌─────────────┬─────────────┬─────────────┐
│     RIM     │  SHORT MR   │   LONG MR   │
│  Aces: 15%  │  Aces: 34%  │  Aces: 12%  │
│  Lg: 27%    │  Lg: 26%    │  Lg: 11%    │
│  FG%: 63%   │  FG%: 46%   │  FG%: 43%   │
├─────────────┼─────────────┼─────────────┤
│  CORNER 3   │ ABOVE BRK 3 │   SUMMARY   │
│  Aces: 10%  │  Aces: 28%  │  Rim+3: 53% │
│  Lg: 8%     │  Lg: 28%    │  MR: 47%    │
│  FG%: 36%   │  FG%: 35%   │  TS%: 55%   │
└─────────────┴─────────────┴─────────────┘
```

**Step 1: Build**
1. Drag `zone` to Columns
2. Create calculated field for row (Frequency vs FG%)
3. Use Text marks to show values
4. Color cells by `freq_vs_league` (diverging: blue = below, red = above)

**Step 2: Conditional Formatting**
```
// Cell Color
IF [team] = 'Las Vegas Aces' AND [freq_vs_league] > 0.05 THEN 'Much Higher'
ELSEIF [team] = 'Las Vegas Aces' AND [freq_vs_league] > 0 THEN 'Higher'
ELSEIF [team] = 'Las Vegas Aces' AND [freq_vs_league] < -0.05 THEN 'Much Lower'
ELSEIF [team] = 'Las Vegas Aces' THEN 'Lower'
ELSE 'Neutral'
END
```

---

## New Files Delivered

| File | Rows | Purpose |
|------|------|---------|
| `aces_games_shot_zones_2025.csv` | 44 | Game-level with phases |
| `aces_players_shot_zones_2025.csv` | 15 | Player shot profiles |
| `wnba_modern_profile_scatter_2025.csv` | 13 | Scatter plot data |
| `shot_zone_heatmap_data_2025.csv` | 12 | Heat map (6 zones × 2 teams) |
| `wnba_shot_distribution_2023_2025.csv` | 37 | Multi-year trends |
| `aces_phase_shot_profile_2025.csv` | 2 | Phase summary |

---

## Portfolio Story Angles

### Angle 1: "The Anti-Analytics Champions"
The Aces won the 2025 championship with the lowest Rim+3 frequency in the league. Their 46.7% midrange rate defies modern basketball wisdom, yet they achieved top-5 efficiency through elite shot-making.

### Angle 2: "The Phase 2 Mystery Solved"
The 16-0 winning streak wasn't about changing shot selection - it was about making the same shots at dramatically better rates. The team shot +7.6% better eFG% without changing their profile.

### Angle 3: "A'ja Wilson: Midrange Queen"
Wilson takes 71.5% of her shots from midrange - the most anti-analytics profile for any superstar. She proves that individual skill can transcend optimization theory.

### Angle 4: "Shot Quality vs Shot Making"
Aces rank #13 in Shot Quality (0.470) but #4 in True Shooting (55.2%). The 8-position gap represents pure shot-making premium that analytics can't capture.
