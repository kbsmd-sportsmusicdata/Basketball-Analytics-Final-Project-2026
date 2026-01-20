# Las Vegas Aces 2025 Season Analysis
## Dual-Purpose Portfolio + Academic Project

---

## Project Overview

This project analyzes the **Las Vegas Aces** roster, lineup optimization, and strategic adjustments for the 2025 WNBA season. It serves two concurrent purposes:

1. **Academic Final Project** (Basketball Analytics Course)
   - **Due**: 2 weeks
   - **Focus**: Analytics-driven coaching strategy
   - **Audience**: Professor, teaching assistants
   - **Deliverables**: Report + presentation slides

2. **Portfolio Case Study** (Career Development)
   - **Timeline**: Ongoing, polish post-academic deadline
   - **Focus**: Front office decision framework
   - **Audience**: WNBA front offices, sports betting companies, analytics employers
   - **Deliverables**: Interactive Tableau dashboard + executive summary

**Key Insight**: Both projects utilize **~85% identical raw data** and analytical foundations, diverging primarily in framing, emphasis, and presentation style.

---

## Why Las Vegas Aces?

### Strategic Rationale

**Academic Project Fit**
- ✅ Recent championship pedigree (2022, 2023) provides rich success benchmarks
- ✅ Roster turnover creates real strategic questions for 2025
- ✅ Established "Big 3" (Wilson, Plum, Young) simplifies rotation focus
- ✅ Defensive identity shifts offer coaching strategy analysis opportunities

**Portfolio Appeal**
- 🎯 Demonstrates understanding of championship-caliber team dynamics
- 🎯 Shows analytical sophistication beyond surface-level stats
- 🎯 WNBA focus differentiates portfolio in male-dominated analytics field
- 🎯 Recent success means hiring managers recognize team/players immediately

### Real Analytical Tensions
- Aging core (Chelsea Gray return from injury, Kelsey Plum free agency)
- Luxury tax considerations limiting roster flexibility
- Transition from dominant defensive team to more offense-focused identity
- Bench depth questions after key departures

---

## Architecture: The 80/20 Data Strategy

### Master Dataset (80% Shared)

Both projects pull from the **same master dataset**:

```
data/master/
├── aces_team_box.parquet      # Team-level Four Factors, efficiency
├── aces_player_box.parquet    # Player stats, usage rates, role indicators
├── aces_lineups.parquet       # 5-man lineup combinations (pbpstats)
├── aces_shots.parquet         # Shot location & efficiency (pbpstats)
└── aces_schedule.parquet      # Game metadata, opponents
```

**Data Sources**:
- **wehoop** (GitHub releases): Box scores, team/player stats → 2024-2025 seasons
- **pbpstats.com**: Lineup data, shot location, advanced on/off splits

**Shared Analytics**:
- Dean Oliver Four Factors (eFG%, TOV%, OREB%, FT Rate)
- Offensive/Defensive/Net Ratings
- Player role identification (handler, connector, finisher, rim protector)
- Lineup efficiency metrics (ORtg, DRtg, plus/minus)
- Shot profile analysis by zone
- Pace & possession style

### Project-Specific Layers (20% Divergence)

#### Academic Project: Coaching Lens
**Additional Analysis**:
- Game script scenarios (trailing by 10 in Q4, leading at half)
- Opponent-specific adjustments (vs. fast-paced teams, vs. elite bigs)
- Practice focus recommendations based on weaknesses
- Quarter-by-quarter strategic decisions
- Substitution pattern optimization

**Deliverable Structure**:
```
academic_output/
├── final_report.pdf
│   ├── Executive Summary (1 page)
│   ├── Top 8 Rotation Analysis (3 pages)
│   ├── Lineup Recommendations (2 pages)
│   ├── Game-Specific Adjustments (2 pages)
│   └── Appendix: Data Collection Documentation
├── presentation.pptx (10-12 slides)
└── code/
    ├── data_collection.py
    └── analysis_notebooks/
```

#### Portfolio Project: Front Office Lens
**Additional Analysis**:
- Multi-year player performance trends (2022-2025)
- Championship probability modeling
- Roster construction philosophy evaluation
- Trade scenario impact projections
- Salary cap context (external data integration)
- Competitive window analysis

**Deliverable Structure**:
```
portfolio_output/
├── tableau_dashboard/
│   ├── aces_2025_case_study.twbx
│   └── tableau_public_link.txt
├── executive_summary.pdf (1-page)
├── detailed_writeup.md
└── github_showcase/
    ├── README.md
    ├── methodology.md
    └── code_samples/
```

---

## Workflow: Concurrent Development

### Phase 1: Foundation (Days 1-3)
**Goal**: Build master dataset + validate metrics

- [ ] Run `aces_master_dataset_builder.py`
- [ ] Pull wehoop data (2024 + 2025 seasons)
- [ ] Integrate pbpstats.com data (API setup)
- [ ] Validate Four Factors against ESPN box scores
- [ ] Build D1 benchmarks for percentile context
- [ ] Identify Top 8 rotation players (usage + minutes)

**Output**: 
- `data/master/` fully populated
- Validation report confirming metric accuracy

### Phase 2: Core Analysis (Days 4-8)
**Goal**: Complete shared analytical work

- [ ] Player performance profiles (Top 8 rotation)
- [ ] Lineup effectiveness analysis (5-man combos)
- [ ] Shot chart generation by player & team
- [ ] Four Factors benchmarking (vs. WNBA avg)
- [ ] Pace & possession style classification
- [ ] Opponent team profiles (12 teams, focus on playoff contenders)

**Output**:
- `data/processed/core_analysis/` with reusable tables
- Annotated Jupyter notebooks documenting insights

### Phase 3A: Academic Finalization (Days 9-11)
**Goal**: Academic deliverables ready for submission

- [ ] Write coaching strategy report
- [ ] Create game scenario decision trees
- [ ] Build rotation optimization recommendations
- [ ] Document data collection process
- [ ] Design presentation slides (10 slides max)
- [ ] Practice presentation (15-minute timing)

**Output**:
- `academic_output/final_report.pdf`
- `academic_output/presentation.pptx`
- Submission-ready package

### Phase 3B: Portfolio Polish (Days 12-14, then ongoing)
**Goal**: Professional-grade portfolio piece

- [ ] Build Tableau dashboard (4-5 views)
- [ ] Write executive summary (front office audience)
- [ ] Create static exports for GitHub README
- [ ] Record Loom walkthrough of dashboard
- [ ] Publish to Tableau Public
- [ ] Update LinkedIn/portfolio site with case study

**Output**:
- `portfolio_output/` complete with all assets
- Live Tableau Public link
- GitHub repo polished for employer viewing

---

## Master Dataset Build Guide

### Prerequisites

**Python Packages**:
```bash
pip install pandas pyarrow numpy requests sportsdataverse
```

**Data Access**:
- wehoop: Public GitHub releases (no auth required)
- pbpstats.com: Free tier available, premium tier recommended for full lineup data

### Build Command

```bash
# Full build (both seasons, all data sources)
python aces_master_dataset_builder.py

# Expected runtime: 5-10 minutes
# Output: data/master/ populated with 5 parquet files
```

### Validation Checklist

After building, verify:
- [ ] `aces_team_box.parquet` has ~80 records (40 per season)
- [ ] Four Factors match ESPN box scores (spot check 3 games)
- [ ] `aces_player_box.parquet` has reasonable usage rates (top player ~30%)
- [ ] Lineup data has minimum 10 possessions per lineup combo
- [ ] Shot coordinates fall within valid court dimensions

---

## Key Metrics Reference

### Four Factors (Priority Order)

1. **Effective FG% (eFG%)**
   - Formula: `(FGM + 0.5 × 3PM) / FGA`
   - Good: >50%, Elite: >54%

2. **Turnover % (TOV%)**
   - Formula: `TOV / Possessions`
   - Good: <14%, Elite: <12%

3. **Offensive Rebound % (OREB%)**
   - Formula: `ORB / (ORB + Opp_DRB)`
   - Good: >28%, Elite: >32%

4. **Free Throw Rate (FT Rate)**
   - Formula: `FTA / FGA`
   - Good: >0.25, Elite: >0.30

### Efficiency Ratings

- **Offensive Rating (ORtg)**: Points per 100 possessions
  - WNBA Average: ~102, Elite: >108
  
- **Defensive Rating (DRtg)**: Points allowed per 100 possessions
  - WNBA Average: ~102, Elite: <96

- **Net Rating**: ORtg - DRtg
  - Championship Contender: >+6

### Player Role Indicators

**Usage Rate (USG%)**
- Star/Primary: >28%
- Secondary: 20-28%
- Role Player: <20%

**Role Archetypes** (composite scores):
- Primary Handler: High assist rate + usage
- Connector: Balanced assists + shooting
- Finisher: High TS% + rim frequency
- Rim Protector: Blocks + defensive rebounds

---

## Tableau Dashboard Views

### Academic Version: "Coaching Strategy Dashboard"

**View 1: Rotation Optimizer**
- Top 8 players efficiency matrix
- Lineup net rating heatmap
- Minutes distribution vs. optimal allocation

**View 2: Opponent Matchups**
- Team style profiles (pace, shot profile)
- Aces lineup performance vs. each opponent
- Vulnerability analysis

**View 3: Game Scenarios**
- Win probability by game state
- Clutch lineup performance (last 5 min, within 5 pts)
- Timeout timing recommendations

### Portfolio Version: "Championship Window Analysis"

**View 1: Roster Composition**
- Multi-year player trend lines
- Age curve projections
- Core durability metrics

**View 2: Lineup Efficiency Map**
- Scatterplot: ORtg vs. DRtg
- Lineup continuity vs. performance
- Sample size reliability indicators

**View 3: Shot Profile Analysis**
- Team heat map by zone
- Player shot charts
- Efficiency vs. volume tradeoffs

**View 4: Strategic Fit**
- Style compatibility scores
- Championship probability model
- Competitive window timeline

---

## File Structure

```
aces_2025_project/
│
├── data/
│   ├── raw/                          # Original API responses
│   ├── master/                       # Unified datasets (80% shared)
│   ├── processed/
│   │   ├── academic/                 # Academic-specific transformations
│   │   └── portfolio/                # Portfolio-specific transformations
│   └── tableau/                      # Tableau-ready exports
│
├── scripts/
│   ├── aces_master_dataset_builder.py
│   ├── validate_metrics.py
│   ├── identify_rotation.py
│   └── opponent_profiling.py
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_player_analysis.ipynb
│   ├── 03_lineup_combinations.ipynb
│   └── 04_shot_analysis.ipynb
│
├── academic_output/
│   ├── final_report.pdf
│   ├── presentation.pptx
│   └── data_documentation.md
│
├── portfolio_output/
│   ├── tableau_dashboard/
│   ├── executive_summary.pdf
│   └── github_showcase/
│
├── docs/
│   ├── ACES_DATA_DICTIONARY.md
│   ├── methodology.md
│   └── opponent_profiles.md
│
├── requirements.txt
└── README.md (this file)
```

---

## Academic Requirements Mapping

Your final project requires:

✅ **Data Collection Documentation**
- Covered in: `docs/data_documentation.md` + build scripts
- Shows wehoop + pbpstats integration, validation steps

✅ **Player Performance (Top 8 Rotation)**
- Analysis in: `notebooks/02_player_analysis.ipynb`
- Metrics: Usage, efficiency, role identification, on/off splits

✅ **Team General Strategy**
- Analysis in: `notebooks/03_lineup_combinations.ipynb`
- Findings: Pace preferences, shot profile, Four Factors emphasis

✅ **Lineup Analysis (5-man combinations)**
- Data source: `aces_lineups.parquet`
- Recommendations: Best/worst lineups, projected optimal combos

✅ **Game-Specific Adjustments**
- Analysis in: `academic_output/final_report.pdf` Section 4
- Content: Opponent vulnerabilities, matchup-based rotations

✅ **Visualizations**
- Tableau dashboard + static exports in presentation
- Shot charts, efficiency maps, lineup heatmaps

---

## Portfolio Value Proposition

When employers review this project, they see:

**Technical Skills**:
- Data pipeline construction (wehoop + pbpstats integration)
- Advanced basketball metrics (Four Factors, lineup analysis)
- Data visualization (Tableau dashboards)
- Statistical modeling (player projections, lineup optimization)

**Basketball IQ**:
- Understanding championship team dynamics
- Strategic thinking beyond surface stats
- Ability to translate analytics to coaching/front office decisions

**Professional Presentation**:
- Clean GitHub repo with documentation
- Interactive dashboards with clear narratives
- Executive-ready summaries

**Differentiation**:
- WNBA focus (underserved analytics market)
- Multi-deliverable approach (dashboard + report + presentation)
- Demonstrates depth over breadth

---

## Timeline Summary

| Days | Focus | Outputs |
|------|-------|---------|
| 1-3 | Master dataset build + validation | `data/master/` complete |
| 4-8 | Core analysis (80% shared work) | Notebooks + processed tables |
| 9-11 | Academic deliverables | Report + presentation ready |
| 12-14+ | Portfolio polish | Tableau dashboard + GitHub showcase |

**Academic Deadline**: Day 14  
**Portfolio Launch**: Day 14-21 (polish after academic submission)

---

## Next Steps

1. **Immediate**: Run `aces_master_dataset_builder.py` to create foundation
2. **Day 2-3**: Set up pbpstats.com API access, integrate lineup data
3. **Day 4**: Start player analysis notebook, identify Top 8 rotation
4. **Day 5**: Build opponent profiles for matchup analysis
5. **Day 6-7**: Lineup combination analysis + shot charts
6. **Day 8-9**: Begin academic report writing
7. **Day 10-11**: Finalize academic deliverables
8. **Day 12-14**: Build Tableau dashboard + portfolio polish

---

## Questions & Support

**Data Issues**: Check `data/master/metadata.json` for build details  
**Metric Validation**: See `scripts/validate_metrics.py` for ESPN comparison  
**Tableau Export**: Use `tableauhyperapi` for optimized extracts  

**Project maintained by**: Krystal  
**Last updated**: 2026-01-06
