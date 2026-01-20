# Tableau Chart Building Guide
## Charts 1, 2, and 5 - Step-by-Step Instructions

---

# 📊 CHART 1: Four Factors Transformation (Slope Chart)
**Purpose**: Show how each Four Factor changed from Phase 1 → Phase 2 → Phase 3
**Data Source**: `aces_phase_summary_2025_real.csv` (3 rows)
**Chart Type**: Slope Chart (connected lines across phases)

---

## Step 1: Connect Data
1. Open Tableau Desktop
2. Connect to Text File → `aces_phase_summary_2025_real.csv`
3. Go to Sheet 1

## Step 2: Create Calculated Fields

### Calculated Field 1: Phase Order
```
// Name: Phase Order
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 1
    WHEN 'Phase 2: Winning Streak' THEN 2
    WHEN 'Phase 3: Playoffs' THEN 3
END
```

### Calculated Field 2: Phase Short Name
```
// Name: Phase Short
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN '14-14'
    WHEN 'Phase 2: Winning Streak' THEN '16-0'
    WHEN 'Phase 3: Playoffs' THEN '9-3'
END
```

### Calculated Field 3: Off eFG% Display
```
// Name: Off eFG% Display
[off_efg_pct] * 100
```

### Calculated Field 4: Def eFG% Display
```
// Name: Def eFG% Display
[def_efg_pct] * 100
```

### Calculated Field 5: Off TOV% Display (Inverted - Lower is Better)
```
// Name: Off TOV% Display
[off_tov_pct] * 100
```

### Calculated Field 6: Off OREB% Display
```
// Name: Off OREB% Display
[off_oreb_pct] * 100
```

## Step 3: Build the Slope Chart (Offensive Four Factors)

### Basic Structure:
1. Drag `Phase Order` to **Columns**
2. Drag `Off eFG% Display` to **Rows**
3. Change Mark type to **Line**
4. Right-click `Phase Order` → **Dimension** (not measure)

### Add Multiple Metrics (Dual Axis or Separate Rows):

**Option A: Separate Rows (Recommended for Clarity)**
1. Drag `Off eFG% Display` to Rows
2. Hold Ctrl and drag `Off TOV% Display` next to it on Rows
3. Hold Ctrl and drag `Off FT Rate` (×100) next to it
4. Hold Ctrl and drag `Off OREB% Display` next to it
5. You now have 4 rows of line charts

**Option B: Combined with Measure Names**
1. Drag these to Rows: `Measure Values`
2. Drag `Measure Names` to Color
3. Filter `Measure Names` to only show: off_efg_pct, off_tov_pct, off_ft_rate, off_oreb_pct

### Add Labels:
1. Drag `Phase Short` to **Label**
2. Click Label → Select "Line Ends" only
3. Add the metric value to label: Drag each measure to Label shelf

### Add Reference Lines for League Average:
1. Analytics Pane → Drag "Reference Line" to chart
2. Scope: Entire Table
3. Value: Constant → Enter league average:
   - Off eFG%: 50.0
   - Off TOV%: 16.2
   - Off FT Rate: 27.1
   - Off OREB%: 24.8

## Step 4: Format for Polish

### Colors (Aces Theme):
```
Phase 1: #DC143C (Crimson Red)
Phase 2: #228B22 (Forest Green)  
Phase 3: #FFD700 (Gold)
League Avg Line: #999999 (Gray, dashed)
```

### Title:
```
"Four Factors Transformation: How the Aces Fixed Their Game"
Subtitle: "Phase 1 (14-14) → Phase 2 (16-0) → Playoffs (9-3)"
```

### Axis Formatting:
- X-axis: Show phase names, not numbers
- Y-axis: Format as percentage with 1 decimal
- Remove gridlines (Format → Lines → Grid Lines → None)

---

# 📈 CHART 2: Net Rating Journey (Game-by-Game Line Chart)
**Purpose**: Show the volatility and transformation across the season
**Data Source**: `aces_analysis_master_2025.csv` (56 rows)
**Chart Type**: Line Chart with Phase Bands and Rolling Average

---

## Step 1: Connect Data
1. Add new data source: `aces_analysis_master_2025.csv`

## Step 2: Create Calculated Fields

### Calculated Field 1: Phase Band Color
```
// Name: Phase Color
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 'Struggling'
    WHEN 'Phase 2: Winning Streak' THEN 'Dominant'
    WHEN 'Phase 3: Playoffs' THEN 'Championship'
END
```

### Calculated Field 2: Win/Loss Shape
```
// Name: Win Loss
IF [team_winner] THEN 'Win' ELSE 'Loss' END
```

### Calculated Field 3: Reference Line at Zero
```
// Name: Zero Line
0
```

### Calculated Field 4: Phase Start Game
```
// Name: Phase Start
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 1
    WHEN 'Phase 2: Winning Streak' THEN 29
    WHEN 'Phase 3: Playoffs' THEN 45
END
```

## Step 3: Build the Line Chart

### Basic Structure:
1. Drag `game_number` to **Columns**
2. Drag `net_rtg` to **Rows**
3. Change Mark type to **Line**

### Add Rolling Average (Dual Axis):
1. Drag `net_rtg_rolling5` to **Rows** (next to first net_rtg)
2. Right-click the second axis → **Dual Axis**
3. Right-click → **Synchronize Axis**
4. On Marks card for `net_rtg_rolling5`:
   - Change to **Line**
   - Make it thicker (Size)
   - Change color to darker shade

### Color by Phase:
1. Drag `phase` to **Color** on the `net_rtg` Marks card
2. Edit colors:
   - Phase 1: #DC143C (Crimson)
   - Phase 2: #228B22 (Green)
   - Phase 3: #FFD700 (Gold)

### Add Phase Boundary Lines:
1. Analytics Pane → Reference Line → Drag to chart
2. Add vertical lines at:
   - Game 28 (end of Phase 1): Label "14-14"
   - Game 44 (end of Phase 2): Label "16-0 Streak Ends"

### Add Zero Reference Line:
1. Analytics Pane → Reference Line
2. Scope: Entire Table
3. Line: Constant = 0
4. Format: Thick, Black

### Add Win/Loss Markers (Optional):
1. Add a new Marks layer
2. Drag `net_rtg` to Rows (third copy)
3. Change Mark type to **Circle**
4. Drag `Win Loss` to **Color**
   - Win: Green
   - Loss: Red
5. Make circles small (Size)

## Step 4: Add Phase Bands (Background Shading)

### Method: Reference Bands
1. Analytics Pane → Reference Band
2. Create 3 bands:

**Band 1 (Phase 1):**
- Scope: Entire Table
- Band From: Constant = 1
- Band To: Constant = 28
- Fill: Light red (#FFCCCC), 20% opacity
- Label: None

**Band 2 (Phase 2):**
- Band From: Constant = 29
- Band To: Constant = 44
- Fill: Light green (#CCFFCC), 20% opacity

**Band 3 (Phase 3):**
- Band From: Constant = 45
- Band To: Constant = 56
- Fill: Light gold (#FFFFCC), 20% opacity

## Step 5: Format

### Title:
```
"The 20-Point Swing: Aces Net Rating Journey"
Subtitle: "From -3.1 (struggling) to +17.0 (dominant)"
```

### Annotations (Add these):
1. Right-click on chart → Annotate → Point
2. Add at:
   - Game 1: "Season opens: Loss, -22 Net Rtg"
   - Game 28: "Last .500 record (14-14)"
   - Game 29: "Streak begins"
   - Game 44: "16-0 streak ends"
   - Game 56: "Championship"

### Axis:
- X: "Game Number" (1-56)
- Y: "Net Rating (Points per 100 Possessions)"
- Y Range: -40 to +40

### Legend:
- Position: Top right
- Show: Phase colors + Rolling average explanation

---

# 📊 CHART 5: Offensive vs Defensive Four Factors (Small Multiples)
**Purpose**: Compare all 8 Four Factors across phases in a grid
**Data Source**: `aces_phase_metrics_long_2025_real.csv` (57 rows)
**Chart Type**: Small Multiples (Trellis) Bar Chart

---

## Step 1: Connect Data
1. Add data source: `aces_phase_metrics_long_2025_real.csv`

## Step 2: Understand the Data Structure
```
Columns:
- phase: "Phase 1: Rocky Start", "Phase 2: Winning Streak", "Phase 3: Playoffs"
- metric: "Off eFG%", "Off TOV%", "Def eFG% Allowed", etc.
- category: "Four Factors (Offense)", "Four Factors (Defense)"
- value: The actual metric value (0-1 scale)
- weight: The adjusted weight (0.35, 0.25, 0.22, 0.18)
```

## Step 3: Create Calculated Fields

### Calculated Field 1: Value as Percentage
```
// Name: Value Pct
[value] * 100
```

### Calculated Field 2: Phase Order
```
// Name: Phase Order
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 1
    WHEN 'Phase 2: Winning Streak' THEN 2
    WHEN 'Phase 3: Playoffs' THEN 3
END
```

### Calculated Field 3: Metric Short Name
```
// Name: Metric Short
CASE [metric]
    WHEN 'Off eFG%' THEN 'eFG%'
    WHEN 'Off FT Rate' THEN 'FT Rate'
    WHEN 'Off TOV%' THEN 'TOV%'
    WHEN 'Off OREB%' THEN 'OREB%'
    WHEN 'Def eFG% Allowed' THEN 'eFG%'
    WHEN 'Def FT Rate Allowed' THEN 'FT Rate'
    WHEN 'Def TOV% Forced' THEN 'TOV%'
    WHEN 'Def OREB% Allowed' THEN 'OREB%'
    ELSE [metric]
END
```

### Calculated Field 4: Is Offense
```
// Name: Is Offense
CONTAINS([category], 'Offense')
```

### Calculated Field 5: Direction Indicator (For Color)
```
// Name: Good Direction
// For offense: higher eFG%, OREB%, FT Rate is good; lower TOV% is good
// For defense: lower eFG%, FT Rate, OREB% is good; higher TOV% (forced) is good

IF [category] = 'Four Factors (Offense)' THEN
    IF CONTAINS([metric], 'TOV') THEN
        IF [value] < 0.15 THEN 'Good' ELSE 'Needs Work' END
    ELSE
        IF [value] > 0.25 THEN 'Good' ELSE 'Needs Work' END
    END
ELSE // Defense
    IF CONTAINS([metric], 'TOV') THEN
        IF [value] > 0.15 THEN 'Good' ELSE 'Needs Work' END
    ELSE
        IF [value] < 0.25 THEN 'Good' ELSE 'Needs Work' END
    END
END
```

### Calculated Field 6: League Average Reference
```
// Name: League Avg
CASE [metric]
    WHEN 'Off eFG%' THEN 0.50
    WHEN 'Off FT Rate' THEN 0.271
    WHEN 'Off TOV%' THEN 0.162
    WHEN 'Off OREB%' THEN 0.248
    WHEN 'Def eFG% Allowed' THEN 0.50
    WHEN 'Def FT Rate Allowed' THEN 0.271
    WHEN 'Def TOV% Forced' THEN 0.162
    WHEN 'Def OREB% Allowed' THEN 0.248
    ELSE NULL
END
```

## Step 4: Build Small Multiples

### Filter to Four Factors Only:
1. Drag `category` to Filters
2. Select: "Four Factors (Offense)" and "Four Factors (Defense)"

### Create the Grid:
1. Drag `Metric Short` to **Columns** (creates 4 columns: eFG%, FT Rate, TOV%, OREB%)
2. Drag `category` to **Rows** (creates 2 rows: Offense, Defense)
3. Drag `Value Pct` to the view (it will show marks)

### Add Phase Comparison:
1. Drag `phase` to **Color**
2. Change Mark type to **Bar**
3. Drag `phase` to **Columns** (BEFORE Metric Short)
   - This creates: Phase 1 | Phase 2 | Phase 3 for each metric

### Alternative: Phases as Rows within Each Cell
1. Drag `Metric Short` to **Columns**
2. Drag `category` to **Rows**
3. Drag `Phase Order` to **Rows** (nested under category)
4. Drag `Value Pct` to **Columns** (creates bars)

## Step 5: Add League Average Reference Lines

For each metric cell:
1. Click on the cell
2. Analytics Pane → Reference Line
3. Scope: Per Cell
4. Value: Use `League Avg` calculated field
5. Line: Dashed, Gray

## Step 6: Format

### Colors by Phase:
```
Phase 1: #DC143C (Crimson)
Phase 2: #228B22 (Green)
Phase 3: #FFD700 (Gold)
```

### Row Labels:
- "OFFENSE" (top row)
- "DEFENSE" (bottom row)

### Column Headers:
- eFG% | FT Rate | TOV% | OREB%

### Cell Labels:
- Show value with 1 decimal place
- Format: "47.8%"

### Title:
```
"Four Factors Breakdown: Offense vs Defense"
Subtitle: "Gray line = League Average"
```

### Annotations for Key Insights:
1. Off eFG%: "↑7.7 pp improvement" (arrow from P1 to P2)
2. Def eFG%: "↓3.2 pp improvement" (lower is better)
3. Off TOV%: "↓2.0 pp improvement"

---

# 🎨 UNIVERSAL FORMATTING SPECS

## Color Palette
```css
/* Phase Colors */
--phase1-crimson: #DC143C;
--phase2-green: #228B22;
--phase3-gold: #FFD700;

/* Aces Brand */
--aces-red: #C8102E;
--aces-gold: #FDB927;
--aces-navy: #13294B;

/* Reference Lines */
--league-avg: #999999;
--zero-line: #000000;

/* Good/Bad Indicators */
--good: #228B22;
--bad: #DC143C;
--neutral: #666666;
```

## Font Specs
```
Title: Tableau Bold, 16pt
Subtitle: Tableau Book, 12pt, Gray
Axis Labels: Tableau Book, 10pt
Data Labels: Tableau Book, 9pt
Annotations: Tableau Light, 9pt, Italic
```

## Common Formatting Steps
1. Remove gridlines: Format → Lines → Grid Lines → None
2. Remove borders: Format → Borders → Row/Column Dividers → None
3. Add subtle row banding: Format → Shading → Row Banding (light gray, 5%)
4. Consistent axis ranges across similar charts

---

# 📋 CHECKLIST BEFORE FINISHING

## Chart 1 (Four Factors Transformation):
- [ ] All 4 offensive factors showing as lines
- [ ] Phase labels at each point
- [ ] League average reference lines (dashed gray)
- [ ] Color matches phase (red → green → gold)
- [ ] Y-axis formatted as percentage

## Chart 2 (Net Rating Journey):
- [ ] Game-by-game line visible
- [ ] 5-game rolling average (thicker line)
- [ ] Phase background bands (light colors)
- [ ] Phase boundary vertical lines at games 28 and 44
- [ ] Zero reference line
- [ ] Key moment annotations

## Chart 5 (Small Multiples):
- [ ] 8 cells total (4 metrics × 2 categories)
- [ ] 3 bars per cell (one per phase)
- [ ] League average reference in each cell
- [ ] Clear row/column headers
- [ ] Values labeled on bars

---

# 🚀 QUICK START: Build in This Order

1. **Start with Chart 2** (Net Rating Journey) - Most straightforward
2. **Then Chart 1** (Four Factors Slope) - Uses different data source
3. **Finally Chart 5** (Small Multiples) - Most complex layout

Each chart should take 15-25 minutes to build with polish.

Good luck! 🏀
