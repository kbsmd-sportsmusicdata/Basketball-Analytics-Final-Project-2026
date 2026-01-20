"""
TABLEAU PLAYER PROFILES GUIDE
Las Vegas Aces 2025 Season Analytics

This guide covers:
1. Connecting your data to Tableau
2. Creating percentile rank calculated fields
3. Building the Statistical Profile Bar Chart
4. Pro tips for portfolio-quality visualizations
"""

# ============================================================================
# PART 1: CONNECTING DATA TO TABLEAU
# ============================================================================

## Step 1: Import Data
1. Open Tableau Desktop
2. Click "Connect" > "Text file"
3. Select: aces_player_profiles_final_2025.csv
4. Click "Sheet 1" to start building

## Step 2: Verify Data Types
Check these key fields have correct types:
- player_name: String (ABC icon)
- position: String
- All numeric metrics: Number (#)
- All _tier and archetype fields: String

## Step 3: Create Data Relationships (if needed later)
For game-by-game heat map:
- Create separate connection to aces_advanced_player_box_2025_wnba.csv
- Join on player_name

# ============================================================================
# PART 2: PERCENTILE RANK CALCULATED FIELDS
# ============================================================================

## CRITICAL CONCEPT:
Percentile ranks show where a player stands vs the group (0-100, higher = better)
- 90th percentile = better than 90% of players
- 50th percentile = exactly average
- 10th percentile = better than only 10% of players

## How to Create a Calculated Field:
1. Right-click in Data pane (left sidebar)
2. Select "Create Calculated Field..."
3. Name it (e.g., "Star Rating Percentile")
4. Paste formula below
5. Click OK

# ---------------------------------------------------------------------------
# PERCENTILE RANKS - COPY THESE FORMULAS
# ---------------------------------------------------------------------------

## STAR RATING PERCENTILE
Name: Star Rating Percentile
Formula:
RANK_PERCENTILE(SUM([star_rating]))

## TWO-WAY RATING PERCENTILE
Name: Two-Way Rating Percentile
Formula:
RANK_PERCENTILE(SUM([two_way_rating]))

## TRUE SHOOTING % PERCENTILE
Name: TS% Percentile
Formula:
RANK_PERCENTILE(SUM([TS%]))

## USAGE % PERCENTILE
Name: Usage% Percentile
Formula:
RANK_PERCENTILE(SUM([USG%]))

## NET RATING DIFFERENTIAL PERCENTILE
Name: NetRtg Diff Percentile
Formula:
RANK_PERCENTILE(SUM([net_rtg_diff]))

## OFFENSIVE IMPACT PERCENTILE
Name: Offensive Impact Percentile
Formula:
RANK_PERCENTILE(SUM([offensive_impact]))

## DEFENSIVE IMPACT PERCENTILE
Name: Defensive Impact Percentile
Formula:
RANK_PERCENTILE(SUM([defensive_impact]))

## EFFICIENCY SCORE PERCENTILE
Name: Efficiency Score Percentile
Formula:
RANK_PERCENTILE(SUM([efficiency_score]))

## ASSIST % PERCENTILE
Name: AST% Percentile
Formula:
RANK_PERCENTILE(SUM([AST%]))

## REBOUND % PERCENTILE
Name: REB% Percentile
Formula:
RANK_PERCENTILE(SUM([REB%]))

## MINUTES PER GAME PERCENTILE
Name: MPG Percentile
Formula:
RANK_PERCENTILE(SUM([mpg]))

# ---------------------------------------------------------------------------
# POSITION-SPECIFIC PERCENTILES (ADVANCED)
# ---------------------------------------------------------------------------

## TS% PERCENTILE BY POSITION
Name: TS% Percentile (Position)
Formula:
IF [position] = "G" THEN
    RANK_PERCENTILE(SUM([TS%]), 'asc')
ELSEIF [position] = "G-F" THEN
    RANK_PERCENTILE(SUM([TS%]), 'asc')
ELSEIF [position] = "F" THEN
    RANK_PERCENTILE(SUM([TS%]), 'asc')
END

Note: With only 8 players, position-specific ranks aren't meaningful yet.
Use this pattern when you expand to league-wide data.

# ---------------------------------------------------------------------------
# PERCENTILE LABELS (for visual display)
# ---------------------------------------------------------------------------

## PERCENTILE LABEL
Name: Percentile Label
Formula:
IF [Star Rating Percentile] >= 0.90 THEN "Elite (90th+)"
ELSEIF [Star Rating Percentile] >= 0.75 THEN "Great (75th-89th)"
ELSEIF [Star Rating Percentile] >= 0.50 THEN "Above Avg (50th-74th)"
ELSEIF [Star Rating Percentile] >= 0.25 THEN "Average (25th-49th)"
ELSE "Below Avg (<25th)"
END

Note: Adjust thresholds based on your player pool size

# ============================================================================
# PART 3: BUILDING THE STATISTICAL PROFILE BAR CHART
# ============================================================================

## CHART TYPE: Horizontal Bar Chart
## PURPOSE: Show key stats for one player at a glance
## TIME TO BUILD: 10-15 minutes

## Step-by-Step Instructions:

### Step 1: Set Up the View
1. Drag [player_name] to Filters → Select one player (e.g., A'ja Wilson)
2. Click "Rows" shelf (top of screen)

### Step 2: Create the Metric Selector
We'll use a parameter so users can toggle between different stats.

**Create Parameter:**
1. Right-click Data pane → "Create Parameter"
2. Name: "Selected Metric"
3. Data type: String
4. List: Add these values manually:
   - Star Rating
   - Two-Way Rating
   - TS%
   - Usage%
   - Offensive Impact
   - Defensive Impact
   - Efficiency Score
5. Current value: Star Rating
6. Click OK

**Create Calculated Field for Metric Value:**
Name: Metric Value
Formula:
CASE [Selected Metric]
    WHEN "Star Rating" THEN SUM([star_rating])
    WHEN "Two-Way Rating" THEN SUM([two_way_rating])
    WHEN "TS%" THEN SUM([TS%]) * 100
    WHEN "Usage%" THEN SUM([USG%]) * 100
    WHEN "Offensive Impact" THEN SUM([offensive_impact])
    WHEN "Defensive Impact" THEN SUM([defensive_impact])
    WHEN "Efficiency Score" THEN SUM([efficiency_score])
END

**Create Calculated Field for Percentile:**
Name: Metric Percentile
Formula:
CASE [Selected Metric]
    WHEN "Star Rating" THEN [Star Rating Percentile]
    WHEN "Two-Way Rating" THEN [Two-Way Rating Percentile]
    WHEN "TS%" THEN [TS% Percentile]
    WHEN "Usage%" THEN [Usage% Percentile]
    WHEN "Offensive Impact" THEN [Offensive Impact Percentile]
    WHEN "Defensive Impact" THEN [Defensive Impact Percentile]
    WHEN "Efficiency Score" THEN [Efficiency Score Percentile]
END

### Step 3: Build the Bars (Simple Version First)
1. Drag these to Rows (in this order):
   - star_rating
   - two_way_rating
   - TS%
   - USG%
   - offensive_impact
   - defensive_impact
   - efficiency_score

2. Right-click each pill → Measure → Sum

3. Drag each pill to Columns to create horizontal bars

4. Click "Show Me" (top right) → Select "Horizontal bars"

### Step 4: Add Percentile Reference Lines
For each metric:
1. Click Analytics pane (left side, next to Data)
2. Drag "Reference Line" onto your chart
3. Select "Cell" scope
4. Value: Median (this shows 50th percentile)
5. Label: Value
6. Line: Dashed
7. Click OK

### Step 5: Format for Portfolio Quality
**Colors:**
- Click Color on Marks card
- Choose a gradient: Blue (low) → Orange (high)
- Or use discrete colors by tier

**Labels:**
- Drag [player_name] to Label
- Drag calculated field "Metric Value" to Label
- Format: Number → 1 decimal place

**Title:**
- Double-click title
- Type: "<player_name>: Statistical Profile"
- Insert [player_name] as dynamic field

**Borders:**
- Format → Borders → Row Divider: Thin line

**Tooltip:**
- Click Tooltip on Marks card
- Add:
  - Metric name
  - Raw value
  - Percentile rank
  - Position
  - Archetype

Example tooltip:
```
<player_name>
<archetype> | <position>

Star Rating: <star_rating> (90th percentile)
Two-Way Rating: <two_way_rating> (85th percentile)
```

# ============================================================================
# PART 4: ALTERNATIVE BAR CHART - BULLET CHART STYLE
# ============================================================================

## Better for showing percentile ranges!

### Create Bullet Chart:
1. Drag metric to Columns (e.g., star_rating)
2. Drag [player_name] to Rows
3. Duplicate star_rating on Columns (hold Ctrl while dragging)
4. Right-click second pill → Dual Axis
5. Synchronize axes
6. First mark: Bar (actual value)
7. Second mark: Circle (percentile marker)
8. Add reference distribution showing quartiles

This shows both absolute value AND relative ranking in one view!

# ============================================================================
# PART 5: PROFESSIONAL DESIGN TIPS
# ============================================================================

## COLOR PALETTE (Lakers/Aces themed):
Primary: #C8102E (Red)
Secondary: #FDB927 (Gold)
Accent: #13294B (Navy)
Neutral: #767676 (Gray)

## FONTS:
Title: Arial Bold, 16pt
Subtitle: Arial Regular, 12pt
Labels: Arial Regular, 10pt

## LAYOUT:
- Remove gridlines (Format → Lines → Grid Lines → None)
- Add subtle row borders (Format → Borders)
- Consistent padding (Format → Shading → Row Banding)

## DASHBOARD BEST PRACTICES:
- Max 3-4 charts per dashboard
- Use consistent color scheme across all charts
- Add filters at top (player selector, position filter)
- Include data source note at bottom
- Export as PDF for portfolio (File → Print to PDF)

# ============================================================================
# PART 6: PERCENTILE RANK FORMATTING EXAMPLES
# ============================================================================

## Show Percentile as Colored Badge:
Name: Percentile Badge
Formula:
"●"

Then:
1. Drag to Label
2. Click Color → Edit Colors
3. Set stepped color:
   - 0-25%: Red
   - 25-50%: Yellow
   - 50-75%: Light Green
   - 75-100%: Dark Green

## Show Percentile as Text:
Name: Percentile Text
Formula:
STR(ROUND([Star Rating Percentile] * 100, 0)) + "th"

Displays as: "87th"

# ============================================================================
# PART 7: CALCULATED FIELDS FOR BAR CHART METRICS
# ============================================================================

## Since we don't have PPG/RPG/APG in the dataset, use these instead:

### SCORING RATE (proxy for PPG)
Name: Scoring Rate
Formula:
SUM([offensive_impact]) / SUM([mpg]) * 100

### PLAYMAKING RATE (proxy for APG)
Name: Playmaking Rate
Formula:
SUM([AST%]) * SUM([mpg])

### REBOUNDING RATE (proxy for RPG)
Name: Rebounding Rate
Formula:
SUM([REB%]) * SUM([mpg])

### EFFICIENCY RATING
Name: Efficiency Rating
Formula:
SUM([TS%]) * 100

Note: These are rate stats that scale with minutes, good for comparison

# ============================================================================
# PART 8: QUICK WINS - BUILD THESE FIRST
# ============================================================================

## Chart 1: Star Rating Bar (5 minutes)
- Single horizontal bar showing star_rating (0-100 scale)
- Color by star_tier
- Add reference line at 50 (average)
- Show all 8 players

## Chart 2: Percentile Radar (10 minutes)
- Drag 5-6 percentile metrics to Rows
- Change mark type to "Polygon"
- Connect the dots
- Filter to one player

## Chart 3: Impact Quadrant (5 minutes)
- X-axis: offensive_impact
- Y-axis: defensive_impact
- Size: mpg
- Color: position
- Add reference lines at median for both axes
- Shows 4 quadrants: Elite Two-Way, Offense Only, Defense Only, Limited

# ============================================================================
# NEXT STEPS
# ============================================================================

1. Connect data to Tableau
2. Create percentile calculated fields (copy formulas above)
3. Build simple bar chart first (Steps 1-3 in Part 3)
4. Add formatting (Step 5 in Part 3)
5. Test with different players
6. Export for portfolio

Ready to build? Let's start with the bar chart together!
"""