# 80/20 Data Overlap Strategy: Visual Breakdown

## The Core Concept

Think of this like building a house with **two facades** - the foundation, framing, and 80% of the interior structure are identical, but each entrance is designed for a different visitor.

```
┌────────────────────────────────────────────────────────┐
│                  MASTER DATASET                         │
│              (Built Once, Used Twice)                   │
│                                                          │
│  • wehoop box scores (2024-2025)                        │
│  • Dean Oliver Four Factors                             │
│  • Player performance metrics                           │
│  • Lineup combinations (pbpstats)                       │
│  • Shot location data (pbpstats)                        │
│  • Opponent team profiles                               │
│                                                          │
│                    80% SHARED                            │
└──────────────┬───────────────────────┬──────────────────┘
               │                       │
               │                       │
               ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │   ACADEMIC       │    │   PORTFOLIO      │
    │   PROJECT        │    │   CASE STUDY     │
    │                  │    │                  │
    │  +Game Scripts   │    │  +Multi-Year     │
    │  +Practice Focus │    │   Trends         │
    │  +Substitution   │    │  +Championship   │
    │   Patterns       │    │   Probability    │
    │                  │    │  +Salary Cap     │
    │    20% UNIQUE    │    │    20% UNIQUE    │
    └──────────────────┘    └──────────────────┘
```

---

## Detailed Comparison Table

### Data Sources (100% Shared)

| Data Source | What It Provides | Academic Uses | Portfolio Uses |
|-------------|------------------|---------------|----------------|
| **wehoop Team Box** | Team-level box scores, Four Factors | ✓ Game-by-game performance | ✓ Season trends, multi-year patterns |
| **wehoop Player Box** | Player stats, usage rates | ✓ Top 8 rotation identification | ✓ Player aging curves, role stability |
| **wehoop Schedule** | Game metadata, opponents | ✓ Strength of schedule context | ✓ Rest days, travel impact |
| **pbpstats Lineups** | 5-man combos, minutes, +/- | ✓ Optimal rotation combinations | ✓ Lineup continuity, chemistry |
| **pbpstats Shots** | Shot location, efficiency zones | ✓ Shot selection coaching points | ✓ Team identity, shot profile trends |

**Overlap**: 100% of data sources are shared

---

### Calculated Metrics (100% Shared)

All Dean Oliver formulas and derived metrics are calculated **once** in the master dataset:

| Metric | Formula | Academic Focus | Portfolio Focus |
|--------|---------|----------------|-----------------|
| **Possessions** | `FGA + 0.44*FTA - ORB + TOV` | Game pace management | Season pace trends |
| **eFG%** | `(FGM + 0.5*3PM) / FGA` | Shot selection quality | Shooting efficiency trends |
| **TOV%** | `TOV / Poss` | Ball security coaching | Roster composition impact |
| **OREB%** | `ORB / (ORB + Opp_DRB)` | Crashing strategies | Personnel fit evaluation |
| **FT Rate** | `FTA / FGA` | Free throw hunting tactics | Player strengths/weaknesses |
| **ORtg/DRtg** | `100 * PTS / Poss` | Game-to-game variance | Season averages, benchmarking |
| **Net Rating** | `ORtg - DRtg` | Lineup effectiveness | Championship probability input |
| **TS%** | `PTS / (2*(FGA + 0.44*FTA))` | Player efficiency evaluation | Role suitability over time |

**Overlap**: 100% of core metrics are shared

---

### Analysis Components (80/20 Split)

#### 80% Shared Analysis

| Analysis Component | Shared Work | Academic Output | Portfolio Output |
|--------------------|-------------|-----------------|------------------|
| **Player Profiles** | Performance metrics, role indicators for all 12 roster players | Focus on Top 8 rotation | Highlight core vs. depth |
| **Lineup Analysis** | All 5-man combinations with efficiency ratings | Best/worst lineups + recommendations | Lineup continuity patterns |
| **Shot Charts** | Heat maps, zone efficiency for team + players | Coaching adjustments by zone | Team identity visualization |
| **Four Factors** | Percentile rankings vs. WNBA average | Strength/weakness identification | Multi-year trajectory |
| **Opponent Profiles** | 12 team style classifications (pace, shot profile) | Matchup-specific strategies | Competitive landscape |
| **Pace Analysis** | Game-by-game tempo, possession counts | Tempo control recommendations | Style evolution over seasons |

#### 20% Academic-Specific

| Component | Data Source | Purpose | Deliverable |
|-----------|-------------|---------|-------------|
| **Game Scripts** | Master + manual scenarios | "Trailing by 10 in Q4" decision trees | Report Section 4 |
| **Practice Priorities** | Weakness analysis | Focus areas for coaching staff | Recommendations list |
| **Substitution Timing** | Lineup + fatigue patterns | When to sub starters | Rotation playbook |
| **Timeout Strategy** | Win probability + momentum | Optimal timeout usage | Strategy matrix |

#### 20% Portfolio-Specific

| Component | Data Source | Purpose | Deliverable |
|-----------|-------------|---------|-------------|
| **Multi-Year Trends** | Master + 2022-2023 data | Player/team trajectory | Dashboard View 1 |
| **Championship Model** | Net rating + roster strength | Win probability projection | Executive summary |
| **Salary Cap Context** | External NBA sources | Roster construction limits | Strategic constraints section |
| **Trade Scenarios** | Player values + team needs | Impact of roster changes | What-if analysis |

---

## File-Level Overlap Diagram

```
PROJECT ROOT
│
├── data/master/                    ← 100% SHARED
│   ├── aces_team_box.parquet       (Used by both projects identically)
│   ├── aces_player_box.parquet     (Used by both projects identically)
│   ├── aces_lineups.parquet        (Used by both projects identically)
│   ├── aces_shots.parquet          (Used by both projects identically)
│   └── aces_schedule.parquet       (Used by both projects identically)
│
├── notebooks/                      ← 80% SHARED CODE
│   ├── 01_data_exploration.ipynb   (100% shared - both projects run same EDA)
│   ├── 02_player_analysis.ipynb    (80% shared - same metrics, different emphasis)
│   ├── 03_lineup_combinations.ipynb(90% shared - same analysis, different framing)
│   └── 04_shot_analysis.ipynb      (100% shared - same shot charts)
│
├── data/processed/
│   ├── academic/                   ← 20% UNIQUE
│   │   ├── rotation_analysis.parquet      (Academic-only)
│   │   ├── game_scripts.parquet           (Academic-only)
│   │   └── practice_priorities.csv        (Academic-only)
│   │
│   └── portfolio/                  ← 20% UNIQUE
│       ├── multi_year_trends.parquet      (Portfolio-only)
│       ├── championship_model.parquet     (Portfolio-only)
│       └── salary_cap_context.csv         (Portfolio-only)
│
├── academic_output/                ← FINAL DELIVERABLE 1
│   ├── final_report.pdf
│   └── presentation.pptx
│
└── portfolio_output/               ← FINAL DELIVERABLE 2
    ├── tableau_dashboard.twbx
    └── executive_summary.pdf
```

---

## Concrete Example: Lineup Analysis

### Shared Work (80%)

**Analysis**: Evaluate all 5-man lineup combinations for Las Vegas Aces 2024 season

**Data Input**: `aces_lineups.parquet` (same file for both projects)

**Metrics Calculated**:
```python
# This code runs ONCE and serves both projects
lineup_df = pd.read_parquet('data/master/aces_lineups.parquet')

lineup_summary = lineup_df.groupby('lineup_id').agg({
    'minutes': 'sum',
    'possessions': 'sum',
    'plus_minus': 'sum',
    'ortg_lineup': 'mean',
    'drtg_lineup': 'mean',
    'net_rtg_lineup': 'mean'
})

# Identify top lineups (minimum 50 possessions)
lineup_summary = lineup_summary[lineup_summary['possessions'] >= 50]
lineup_summary = lineup_summary.sort_values('net_rtg_lineup', ascending=False)
```

**Output**: `data/processed/lineup_summary_core.csv` (100% shared)

### Academic Divergence (10% additional work)

**Additional Question**: "Which lineups should we play in close games in Q4?"

```python
# Filter to clutch situations (last 5 min, within 5 pts)
clutch_lineups = lineup_df[
    (lineup_df['quarter'] == 4) & 
    (lineup_df['time_remaining'] <= 300) &
    (lineup_df['score_margin'].abs() <= 5)
]

clutch_summary = clutch_lineups.groupby('lineup_id').agg({
    'net_rtg_lineup': 'mean',
    'win_pct': 'mean'
})
```

**Output**: `data/processed/academic/clutch_lineup_recommendations.csv`

**Report Section**: "Recommended rotation adjustments in tight games"

### Portfolio Divergence (10% additional work)

**Additional Question**: "How consistent are these lineup combinations across seasons?"

```python
# Pull 2022-2023 data and compare
historical_lineups = load_historical_lineups(seasons=[2022, 2023, 2024])

lineup_stability = historical_lineups.groupby(['lineup_id', 'season']).agg({
    'minutes': 'sum',
    'net_rtg_lineup': 'mean'
})

# Calculate lineup continuity score
continuity = lineup_stability.groupby('lineup_id')['season'].nunique()
```

**Output**: `data/processed/portfolio/lineup_continuity_trends.csv`

**Dashboard View**: "Lineup chemistry and continuity over time"

---

## Time Allocation Breakdown

Total Project Time: ~60 hours

| Phase | Hours | Academic Time | Portfolio Time | Overlap |
|-------|-------|---------------|----------------|---------|
| **Data Collection** | 8 | 4 hrs | 4 hrs | 100% shared |
| **Metric Calculation** | 6 | 3 hrs | 3 hrs | 100% shared |
| **Player Analysis** | 10 | 6 hrs | 4 hrs | 60% shared |
| **Lineup Analysis** | 10 | 6 hrs | 4 hrs | 60% shared |
| **Shot Analysis** | 6 | 3 hrs | 3 hrs | 100% shared |
| **Opponent Profiling** | 8 | 4 hrs | 4 hrs | 100% shared |
| **Academic Writing** | 8 | 8 hrs | 0 hrs | 0% shared |
| **Portfolio Dashboard** | 10 | 0 hrs | 10 hrs | 0% shared |
| **Academic Presentation** | 4 | 4 hrs | 0 hrs | 0% shared |
| **Portfolio Polish** | 4 | 0 hrs | 4 hrs | 0% shared |
| **TOTAL** | 74 | 38 hrs | 36 hrs | **52% overlap** |

**Key Insight**: While final deliverables are different, the core analytical work (48 hours) has **83% overlap**. You're essentially doing one project's worth of analysis and presenting it two different ways.

---

## Efficiency Gains in Practice

### Without Overlap Strategy
```
Academic Project:  40 hours (data + analysis + writing)
Portfolio Project: 45 hours (data + analysis + dashboard)
TOTAL:            85 hours
```

### With Overlap Strategy
```
Shared Foundation: 48 hours (data + core analysis)
Academic Unique:   12 hours (writing + presentation)
Portfolio Unique:  14 hours (dashboard + polish)
TOTAL:            74 hours  ← 13% time savings
```

**But the real benefit**: You're building a portfolio piece **automatically** while completing coursework, not as a separate project later.

---

## Quality Control: Ensuring Both Projects Excel

### Academic Project Success Criteria
- ✓ Addresses all required components explicitly
- ✓ Shows deep basketball knowledge (not just stats)
- ✓ Demonstrates systematic approach (data → analysis → recommendations)
- ✓ Professional presentation quality

### Portfolio Project Success Criteria
- ✓ Clean, interactive visualizations
- ✓ Clear narrative for non-technical executives
- ✓ Demonstrates real-world impact potential
- ✓ GitHub repo is employer-ready

### Avoiding Compromise
**Risk**: Making one project too similar to the other

**Mitigation**:
1. Write academic report **first** (deadline pressure)
2. Tableau dashboard gets built **separately** (different medium forces fresh perspective)
3. Executive summary for portfolio is 1 page max (forces conciseness)
4. Different audiences read different documents (no overlap in reviewers)

---

## The Bottom Line

**Master Dataset**: Built once, ~8 hours  
**Core Analysis**: Done once, ~40 hours  
**Academic Deliverables**: Report + slides, ~12 hours  
**Portfolio Deliverables**: Dashboard + showcase, ~14 hours  

**Total Investment**: 74 hours  
**Total Output**: 2 complete professional projects  
**Effective Hourly Rate**: 2.7x multiplier on effort

You're not doing two separate 40-hour projects. You're doing **one 50-hour analytical project** with **two different front-ends** (report vs. dashboard) that each take ~12 hours to polish.

---

## Visualization: Data Flow Architecture

```
                    ┌─────────────────┐
                    │  RAW DATA PULL  │
                    │  (8 hours)      │
                    │                 │
                    │  • wehoop API   │
                    │  • pbpstats API │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ MASTER DATASET  │
                    │ (Parquet files) │
                    │                 │
                    │ 80% FOUNDATION  │
                    └────────┬────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
        ┌────────────────┐      ┌────────────────┐
        │ CORE ANALYSIS  │      │ CORE ANALYSIS  │
        │ (40 hours)     │      │ (Same Work!)   │
        │                │      │                │
        │ • Player stats │      │ • Player stats │
        │ • Lineups      │      │ • Lineups      │
        │ • Shot charts  │      │ • Shot charts  │
        │ • Four Factors │      │ • Four Factors │
        └───────┬────────┘      └────────┬───────┘
                │                        │
                │                        │
                ▼                        ▼
       ┌─────────────────┐     ┌─────────────────┐
       │  ACADEMIC ADD   │     │ PORTFOLIO ADD   │
       │  (12 hours)     │     │  (14 hours)     │
       │                 │     │                 │
       │ • Game scripts  │     │ • Multi-year    │
       │ • Practice plan │     │ • Cap context   │
       │ • Substitutions │     │ • Championship  │
       │                 │     │   probability   │
       └────────┬────────┘     └────────┬────────┘
                │                       │
                ▼                       ▼
       ┌─────────────────┐     ┌─────────────────┐
       │ REPORT + SLIDES │     │ DASHBOARD + PDF │
       │ (For Professor) │     │ (For Employers) │
       └─────────────────┘     └─────────────────┘
```

**Key Takeaway**: The diagram shows that 80% of your effort (the entire middle section) produces outputs for BOTH projects simultaneously. Only the final 20% diverges into project-specific deliverables.
