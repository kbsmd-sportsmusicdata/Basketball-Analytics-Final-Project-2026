# ═══════════════════════════════════════════════════════════════════
# TABLEAU PLAYER PROFILES - COMPLETE BUILD GUIDE
# Las Vegas Aces 2025 - Academic Project
# ═══════════════════════════════════════════════════════════════════

## 📁 DATA CONNECTION

1. Open Tableau Desktop
2. Connect → Text file → `aces_player_profiles_final_2025.csv`
3. Click "Sheet 1" tab

---

## 🎛️ STEP 1: CREATE PARAMETER FOR PLAYER SELECTION

**Right-click Data pane → Create Parameter**

```
Name: Selected Player
Data type: String
Allowable values: List
Add from field: player_name (click "Add from Field")
Current value: A'ja Wilson
```

**Then: Right-click the parameter → Show Parameter Control**

---

## 📐 STEP 2: CALCULATED FIELDS - COPY/PASTE THESE

### ─────────────────────────────────────────────
### DISPLAY FORMATTING FIELDS
### ─────────────────────────────────────────────

**TS% Display**
```
[TS%] * 100
```

**USG% Display**
```
[USG%] * 100
```

**AST% Display**
```
[AST%] * 100
```

**Win % Display**
```
[win_pct] * 100
```

**Availability Display**
```
[availability] * 100
```

### ─────────────────────────────────────────────
### PERCENTILE RANK FIELDS
### ─────────────────────────────────────────────

**Star Rating Percentile**
```
RANK_PERCENTILE(SUM([star_rating]))
```

**TS% Percentile**
```
RANK_PERCENTILE(SUM([TS%]))
```

**USG% Percentile**
```
RANK_PERCENTILE(SUM([USG%]))
```

**Efficiency Score Percentile**
```
RANK_PERCENTILE(SUM([efficiency_score]))
```

**Two-Way Rating Percentile**
```
RANK_PERCENTILE(SUM([two_way_rating]))
```

**PIE Percentile**
```
RANK_PERCENTILE(SUM([PIE]))
```

**Net Rtg Diff Percentile**
```
RANK_PERCENTILE(SUM([net_rtg_diff]))
```

**MPG Percentile**
```
RANK_PERCENTILE(SUM([mpg]))
```

**Offensive Impact Percentile**
```
RANK_PERCENTILE(SUM([offensive_impact]))
```

**Defensive Impact Percentile**
```
RANK_PERCENTILE(SUM([defensive_impact]))
```

### ─────────────────────────────────────────────
### PERCENTILE LABEL FIELDS
### ─────────────────────────────────────────────

**Star Rating Pctl Label**
```
STR(ROUND([Star Rating Percentile] * 100, 0)) + "th"
```

**TS% Pctl Label**
```
STR(ROUND([TS% Percentile] * 100, 0)) + "th"
```

**USG% Pctl Label**
```
STR(ROUND([USG% Percentile] * 100, 0)) + "th"
```

### ─────────────────────────────────────────────
### PLAYER FILTER & SELECTION FIELDS
### ─────────────────────────────────────────────

**Is Selected Player**
```
[player_name] = [Selected Player]
```

**Player Sort Order (Floating Sort)**
```
IF [player_name] = [Selected Player] THEN 0 ELSE 1 END
```

**Player Name Display**
```
IF [player_name] = [Selected Player] THEN
    [player_name] + " ★"
ELSE
    [player_name]
END
```

### ─────────────────────────────────────────────
### ON/OFF IMPACT FORMATTING
### ─────────────────────────────────────────────

**Net Rtg Diff Formatted**
```
IF [net_rtg_diff] >= 0 THEN
    "+" + STR(ROUND([net_rtg_diff], 1))
ELSE
    STR(ROUND([net_rtg_diff], 1))
END
```

**ORtg Diff Formatted**
```
IF [ortg_diff] >= 0 THEN
    "+" + STR(ROUND([ortg_diff], 1))
ELSE
    STR(ROUND([ortg_diff], 1))
END
```

**DRtg Diff Formatted**
```
IF [drtg_diff] <= 0 THEN
    STR(ROUND([drtg_diff], 1)) + " ✓"
ELSE
    "+" + STR(ROUND([drtg_diff], 1))
END
```

**Impact Direction (for color)**
```
IF [net_rtg_diff] >= 0 THEN "Positive" ELSE "Negative" END
```

**Offensive Impact Direction**
```
IF [offensive_impact] >= 0 THEN "Positive" ELSE "Negative" END
```

**Defensive Impact Direction**
```
IF [defensive_impact] >= 0 THEN "Positive" ELSE "Negative" END
```

### ─────────────────────────────────────────────
### DIVERGING BAR CALCULATIONS
### ─────────────────────────────────────────────

**Net Rtg Diff Positive**
```
IF [net_rtg_diff] >= 0 THEN [net_rtg_diff] ELSE 0 END
```

**Net Rtg Diff Negative**
```
IF [net_rtg_diff] < 0 THEN ABS([net_rtg_diff]) ELSE 0 END
```

**Off Impact Positive**
```
IF [offensive_impact] >= 0 THEN [offensive_impact] ELSE 0 END
```

**Off Impact Negative**
```
IF [offensive_impact] < 0 THEN ABS([offensive_impact]) ELSE 0 END
```

**Def Impact Positive**
```
IF [defensive_impact] >= 0 THEN [defensive_impact] ELSE 0 END
```

**Def Impact Negative**
```
IF [defensive_impact] < 0 THEN ABS([defensive_impact]) ELSE 0 END
```

### ─────────────────────────────────────────────
### TIER COLOR ASSIGNMENTS
### ─────────────────────────────────────────────

**Star Tier Color**
```
CASE [star_tier]
    WHEN "Star" THEN "#FDB927"
    WHEN "Key Player" THEN "#3B82F6"
    WHEN "Contributor" THEN "#6B7280"
    WHEN "Role Player" THEN "#9CA3AF"
    ELSE "#D1D5DB"
END
```

**Impact Tier Color**
```
CASE [impact_tier]
    WHEN "Elite" THEN "#228B22"
    WHEN "Positive" THEN "#22C55E"
    WHEN "Neutral" THEN "#6B7280"
    WHEN "Negative" THEN "#EF4444"
    ELSE "#D1D5DB"
END
```

### ─────────────────────────────────────────────
### TOOLTIP FIELDS
### ─────────────────────────────────────────────

**Player Bio Tooltip**
```
[player_name] + " | " + [position] + " | " + [archetype] + "
" + STR([years_exp]) + " Years | " + [exp_category] + "
" + [college] + " | " + STR(INT([draft_year])) + " Draft #" + STR(INT([Draft Pick Number]))
```

**Impact Summary Tooltip**
```
"When " + [player_name] + " is ON court:
Team ORtg: " + STR(ROUND([ortg_on], 1)) + " (" + [ORtg Diff Formatted] + ")
Team DRtg: " + STR(ROUND([drtg_on], 1)) + " (" + [DRtg Diff Formatted] + ")
Net Rating: " + STR(ROUND([net_rtg_on], 1)) + " (" + [Net Rtg Diff Formatted] + ")"
```

---

## 📊 CHART 1: HORIZONTAL BAR CHART (Key Metrics)

### Build Steps:

1. **Filter to Selected Player**
   - Drag `Is Selected Player` to Filters → Check "True"

2. **Add Metrics to Rows**
   - Drag these in order:
     - `star_rating`
     - `TS% Display` 
     - `USG% Display`
     - `efficiency_score`
     - `two_way_rating`
     - `PIE`

3. **Create Bars**
   - For each metric, drag to Columns to create horizontal bars
   - Or use "Show Me" → Horizontal bars

4. **Add Percentile Labels**
   - Drag corresponding Pctl Label to Label on Marks

5. **Format Axes**
   - Right-click each axis → Edit Axis → Rename:
     - "Star Rating (0-100)"
     - "True Shooting %"
     - "Usage Rate %"
     - etc.

6. **Color**
   - Click Color on Marks → Choose #C8102E (Aces Red)

7. **Add Dynamic Title**
   - Double-click title → Insert `Selected Player` → Type: 
   - `<Selected Player>: Statistical Profile`

---

## 📊 CHART 2: DIVERGING BAR CHART (On/Off Impact)

### Build Steps:

1. **Create Metric Names**
   - Create calculated field "Impact Metrics":
   ```
   "Impact Metrics"
   ```
   
   Actually, build manually:

2. **Rows: Create Impact Metric Rows**
   - Create 3 calculated fields:
   
   **Metric 1 - Net Rating**
   ```
   "Net Rating Differential"
   ```
   
   **Metric 2 - Offensive**
   ```
   "Offensive Impact"
   ```
   
   **Metric 3 - Defensive**
   ```
   "Defensive Impact"
   ```

3. **Better approach - Use Parameter for Metric Selection:**

   OR just build 3 separate mini-charts stacked vertically:

### Option A: Three Stacked Diverging Bars

**For each impact metric:**

1. **Columns:** 
   - `Net Rtg Diff Negative` (Sum, reversed)
   - `Net Rtg Diff Positive` (Sum)

2. **Dual Axis:**
   - Right-click second pill → Dual Axis
   - Synchronize axes

3. **Format:**
   - Negative bar: Red (#EF4444)
   - Positive bar: Green (#228B22)
   - Add reference line at 0

4. **Repeat for Offensive Impact and Defensive Impact**

### Option B: Simpler Approach - Single Bar with Color by Direction

1. **Rows:** Player names (or metric names)
2. **Columns:** `net_rtg_diff`, `offensive_impact`, `defensive_impact`
3. **Color:** `Impact Direction` (Positive=Green, Negative=Red)
4. **Add reference line at 0**

---

## 📊 CHART 3: KPI CARDS ROW

### Build Steps:

1. **Create 5 sheets (one per KPI):**
   - Sheet: KPI_MPG
   - Sheet: KPI_TS
   - Sheet: KPI_USG
   - Sheet: KPI_NetRtg
   - Sheet: KPI_Games

2. **For each sheet:**
   - Filter: `Is Selected Player` = True
   - Add metric to Text on Marks card
   - Format: Large font (24pt+), Bold
   - Remove axis, headers, gridlines

3. **Dashboard:**
   - Arrange horizontally in a row
   - Add labels below each

---

## 📊 CHART 4: COMPARISON TABLE (All 8 Players)

### Build Steps:

1. **Rows:** `player_name` (sorted by Star Rating descending)

2. **Columns:** Add as text tables:
   - `position`
   - `star_rating`
   - `TS% Display`
   - `USG% Display`
   - `net_rtg_diff`
   - `mpg`
   - `archetype`

3. **Conditional Formatting:**
   - Color `net_rtg_diff` by direction (green/red)
   - Color `star_rating` by tier

4. **Highlight Selected Row:**
   - Drag `Is Selected Player` to Color
   - True = Red highlight, False = No color

5. **Sort:**
   - Apply `Player Sort Order` to keep selected player at top
   - Secondary sort by `star_rating` descending

---

## 🎨 COLOR PALETTE

```
Aces Primary Red:   #C8102E
Aces Gold:          #FDB927
Navy Blue:          #13294B
Forest Green:       #228B22
Sky Blue:           #0EA5E9
Purple:             #6B21A8
Gray (neutral):     #6B7280
Light Gray:         #D1D5DB
Positive (green):   #22C55E
Negative (red):     #EF4444
```

---

## 🖼️ DASHBOARD LAYOUT

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Las Vegas Aces Player Profiles - 2025 Season       │
│  [Player Selector Dropdown]                                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PLAYER CARD HEADER                                   │   │
│  │  Name | Position | Archetype | Star Rating Badge      │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  │ KPI: MPG │ KPI: TS% │ KPI: USG% │ KPI: NetRtg │ Games │ │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌────────────────────────────┐   │
│  │ CHART 1:             │  │ CHART 2:                   │   │
│  │ Key Metrics Bars     │  │ On/Off Impact Diverging    │   │
│  │ - Star Rating        │  │ - Net Rating Diff          │   │
│  │ - TS%                │  │ - Offensive Impact         │   │
│  │ - USG%               │  │ - Defensive Impact         │   │
│  │ - Efficiency Score   │  │                            │   │
│  │ - Two-Way Rating     │  │ ON/OFF TABLE               │   │
│  │ - PIE                │  │ ORtg: 112.9 → 93.3 (+19.6) │   │
│  │                      │  │ DRtg: 100.4 → 110.2 (-9.8) │   │
│  │ [Percentile labels]  │  │ Net:  12.4 → -16.9 (+29.3) │   │
│  └──────────────────────┘  └────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │ CHART 4: Full Roster Comparison Table                 │   │
│  │ Player | Pos | Star | TS% | USG% | NetRtg | MPG | Type│   │
│  │ ★ A'ja Wilson | F | 96 | 58.3 | 31.4 | +29.3 | 32.3 │   │
│  │   Jackie Young | G | 85 | 60.3 | 23.3 | +22.5 | 31.4 │   │
│  │   Chelsea Gray | G | 62 | 56.3 | 17.0 | +13.2 | 32.1 │   │
│  │   ...                                                  │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  KEY INSIGHT: Dynamic text based on selected player          │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ QUICK BUILD ORDER

1. ☐ Create Parameter: `Selected Player`
2. ☐ Create all calculated fields (copy from above)
3. ☐ Build Chart 1: Horizontal Bar (Key Metrics)
4. ☐ Build Chart 2: Diverging Bar (On/Off Impact)
5. ☐ Build KPI Cards (5 mini sheets)
6. ☐ Build Chart 4: Comparison Table
7. ☐ Create Dashboard
8. ☐ Add parameter control to dashboard
9. ☐ Format colors, fonts, titles
10. ☐ Test player switching

---

## 🎯 FINAL TIPS

- **Use the React mockup as your visual reference**
- **Test with all 8 players** - ensure charts update correctly
- **Match the color palette** for professional look
- **Add tooltips** with context (use tooltip calculated fields)
- **Export static images** for your report/presentation
