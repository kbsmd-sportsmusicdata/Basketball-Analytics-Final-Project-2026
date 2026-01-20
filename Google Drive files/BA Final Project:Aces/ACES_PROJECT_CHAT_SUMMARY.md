# Las Vegas Aces 2025 Analytics Project - Chat Summary
**Project Type:** Dual-Purpose (Academic Final + Portfolio Case Study)  
**Timeline:** 2 weeks to academic deadline, ongoing portfolio refinement  
**Primary Focus:** Player profiles → Lineup analysis progression

---

## 🎯 PROJECT OBJECTIVES

### Academic Project (Basketball Analytics Course)
- **Due:** 2 weeks
- **Deliverables:** Written report + presentation slides
- **Required Components:**
  1. Data collection documentation
  2. Player performance analysis (Top 8 rotation)
  3. Team general strategy
  4. Lineup analysis (5-man combinations)
  5. Game-specific adjustments
  6. Visualizations (static/interactive)

### Portfolio Project
- **Timeline:** Ongoing post-academic deadline
- **Deliverables:** Tableau dashboard + executive summary
- **Audience:** WNBA teams, sports betting companies, analytics employers
- **Goal:** Demonstrate professional-quality sports analytics skills

---

## 📊 DATA FOUNDATION

### Data Sources
1. **wehoop** (Python package/GitHub releases)
   - Team box scores, player box scores, schedule data
   - Seasons: 2024 + 2025
   - ~80 games total (40 per season)

2. **pbpstats.com** (API - no auth required)
   - Lineup combinations
   - Shot location data
   - Advanced on/off splits
   - **Key endpoints:**
     - `/get-team-players-for-season`
     - `/get-on-off/wnba`
     - `/get-four-factor-on-off/wnba`
     - `/get-lineup-player-stats/wnba`
     - `/get-totals/wnba`
     - `/get-shots/wnba`

### Dataset Architecture (80/20 Strategy)
```
data/master/ (80% shared between projects)
├── aces_team_box.parquet          # Team-level Four Factors
├── aces_player_box.parquet        # Player stats, efficiency
├── aces_lineups.parquet           # 5-man lineup combos
├── aces_shots.parquet             # Shot location data
└── aces_schedule.parquet          # Game metadata

data/processed/
├── academic/                      # Coaching lens analysis
└── portfolio/                     # Front office lens analysis

data/tableau/
└── *.hyper                        # Tableau-optimized extracts
```

### Key Metrics Framework
**Four Factors (Dean Oliver):**
1. eFG% (35% weight) - Shooting efficiency
2. TOV% (22% weight) - Ball security
3. FT Rate (25% weight) - Free throw generation
4. OREB% (18% weight) - Second-chance opportunities

**Efficiency Ratings:**
- Offensive Rating (ORtg): Points per 100 possessions
- Defensive Rating (DRtg): Points allowed per 100 possessions
- Net Rating: ORtg - DRtg

**Player Metrics:**
- Usage Rate (USG%)
- True Shooting % (TS%)
- Player Efficiency Rating (PER)
- On/Off splits (team performance with player on vs. off court)

---

## 🏀 TOP 8 ROTATION PLAYERS

| Player | Position | Archetype | Star Rating | MPG | Key Insight |
|--------|----------|-----------|-------------|-----|-------------|
| **A'ja Wilson** | F | Generational Talent | 96.0 | 32.3 | 7 elite skills, 0 weaknesses |
| **Jackie Young** | G | Elite Two-Way Star | 84.6 | 31.4 | 100th percentile PER among guards |
| **Chelsea Gray** | G | Primary Ball Handler | 62.2 | 32.1 | Elite facilitator, turnover issues |
| **NaLyssa Smith** | F | Paint Presence | 57.0 | 22.8 | Rim protection, limited perimeter game |
| **Jewell Loyd** | G | Ball Security Specialist | 45.3 | 28.6 | 93rd percentile TOV%, low playmaking |
| **Dana Evans** | G | Role Player | 28.7 | 18.2 | Solid handler, efficiency concerns |
| **Kierstan Bell** | F | Stretch Forward | 29.0 | 11.8 | Elite 3PT rate (93rd pctl), poor efficiency |
| **Aaliyah Nye** | G-F | 3PT Specialist | 10.5 | 13.8 | Purest shooter (98th pctl rate), developmental |

---

## 🔑 MAJOR ANALYTICAL FINDINGS

### 1. The Anti-Analytics Champions
- **Aces shot profile:** 53% Rim+3PT frequency (#13 in WNBA)
- **Aces efficiency:** 55.2% TS% (#4 in WNBA)
- **Insight:** Win by making "bad shots" at elite rates

### 2. Phase Transformation (2025 Season)
| Metric | Phase 1 (14-14) | Phase 2 (16-0) | Change | vs League |
|--------|-----------------|----------------|--------|-----------|
| Net Rating | -3.1 | +17.0 | **+20.1** | +17 above avg |
| Off eFG% | 47.8% | 55.5% | **+7.7%** | +5.5% above avg |
| Def eFG% | 50.0% | 46.8% | **-3.2%** | 3.2% better |
| Off TOV% | 15.7% | 13.7% | **-2.0%** | 2.5% better |

**Key Lever:** Shooting efficiency improvement (+7.7% eFG%) without changing shot selection

### 3. A'ja Wilson: Generational Profile
- **71.5% midrange frequency** - Most anti-analytics star in WNBA
- **+29.3 Net Rating differential** - Team 29 points better per 100 poss with her
- **Elite across all dimensions:** Scoring, playmaking, rebounding, defense
- Only player with 7+ elite skills (90th+ percentile) and zero weaknesses

### 4. Shot Zone Analysis
| Zone | Aces Freq | League Freq | Diff | Aces FG% | League FG% | Efficiency Edge |
|------|-----------|-------------|------|----------|------------|-----------------|
| Rim | 15.0% | 27.1% | -12.1% | 62.6% | 63.1% | -0.5% |
| Short MR | 34.4% | 26.3% | **+8.2%** | 45.5% | 40.3% | **+5.2%** |
| Long MR | 12.3% | 10.7% | +1.6% | 43.4% | 38.0% | +5.4% |
| Above Break 3 | 28.1% | 28.1% | 0.0% | 34.9% | 32.9% | +2.0% |

**Strategic Insight:** Aces take 8% more midrange shots but convert at 5% higher rate

---

## 📈 DERIVED METRICS CREATED

### Composite Ratings
1. **Star Rating (0-100):** 40% impact + 30% efficiency + 20% usage + 10% availability
2. **Two-Way Rating:** ORtg - DRtg (complete player value)
3. **Efficiency Score:** TS% × USG% × 100 (volume-adjusted scoring)

### Role & Impact Metrics
4. **Offensive Load:** USG% + (AST% × 0.5) - total offensive responsibility
5. **True Usage:** USG% + (AST% × 0.33) - includes playmaking
6. **Offensive Impact:** Team ORtg differential (ON vs OFF)
7. **Defensive Impact:** Team DRtg improvement when on court
8. **Impact Per 36:** Normalized to per-36 minutes standard
9. **Playmaking Efficiency:** AST% / (AST% + TOV_Ratio)

### Availability & Leverage
10. **Rebounding Impact:** REB% × mpg / 10
11. **Availability:** games_count / max_games
12. **Minutes Leverage:** mpg / team_avg_mpg (30 baseline)
13. **Win Contribution:** (mpg/48) × win_pct × 100
14. **Role Clarity:** max(USG%, AST%, REB%) / sum(all three)
15. **Versatility Score:** 1 - role_clarity

### Categorical Tiers
- **Star Tier:** Star, Key Player, Contributor, Role Player
- **Two-Way Tier:** Elite, Good, Average, Below Average
- **Impact Tier:** Elite, Positive, Neutral, Negative
- **Offensive Load Tier:** Elite, High, Medium, Low
- **Archetype:** 8 player types based on statistical profile

---

## 🎨 TABLEAU VISUALIZATIONS COMPLETED

### Team Phase Analysis (5 charts built)
1. **Four Factors Transformation (Slope Chart)** ✅
   - Shows Phase 1 → Phase 2 → Playoffs progression
   - Highlights eFG% breakthrough (+7.7%)

2. **Net Rating Journey (Line Chart)** ✅
   - Game-by-game with 5-game rolling average
   - Phase bands showing transformation

3. **Four Factors Small Multiples (2×2 Grid)** ✅
   - Offense + Defense side-by-side
   - League average reference lines

4. **Shot Zone Heat Map (Grid)** ✅
   - Frequency + Efficiency by zone
   - Aces vs League comparison

5. **Modern Profile Scatter Plot** ✅
   - Rim+3PT% vs TS%
   - Shows Aces as outlier (#13 shot selection, #4 efficiency)

### Player Profiles (In Progress)
**Target:** Interactive dashboard with:
- Player selector parameter
- Horizontal bar charts (key metrics with percentiles)
- Diverging bars (on/off impact)
- KPI cards (MPG, TS%, USG%, NetRtg, Games)
- Full roster comparison table

**Design mockup created as React artifact** - serves as exact build target

---

## 📐 WEIGHTED POSITIONAL PERCENTILES

### Methodology
- **Function:** Weighted percentile calculation (minutes as weight)
- **Rationale:** High-minute players carry more influence in distribution
- **Position Groups:** G (78 players), F (48 players), C (24 players)
- **Dataset:** 150 WNBA players with ≥10 MPG (2025 season)

### Position Consolidation Rules
```
G, G-F → Guards (G)
F, F-G → Forwards (F)
C, C-F → Centers (C)
```

### Implementation (Python/R hybrid approach)
```python
def weighted_percentile(x, w):
    # Sort by values, calculate cumulative weights
    # Percentile = cumulative_weight / total_weight
    # Higher minutes = more influence on thresholds
```

### Key Findings
- **A'ja Wilson:** 7 elite skills (90th+ percentile), 0 weaknesses
- **Jackie Young:** 4 elite skills including 100th percentile PER among guards
- **Chelsea Gray:** 89th percentile AST%, 16th percentile TOV% (classic tradeoff)
- **Kierstan Bell:** 93rd percentile 3PT rate, 3rd percentile TS% (volume without efficiency)

---

## 🛠️ TECHNICAL WORKFLOW

### "Individual Bricks Before Walls" Approach
**Phase Progression:**
1. ✅ Data Foundation (wehoop + pbpstats integration)
2. ✅ Core Analysis (Four Factors, phase comparison, league context)
3. ✅ Team Visualizations (5 charts complete in Tableau)
4. 🔄 **Current:** Player Profile Visualizations (design mockup → Tableau build)
5. ⏳ **Next:** Lineup Analysis (combinations, on/off splits)
6. ⏳ Written Deliverables (report sections, presentation)

### File Management Pattern
```
/home/claude/              # Temporary workspace, iteration
/mnt/user-data/uploads/    # Your uploaded files (read-only)
/mnt/user-data/outputs/    # Final deliverables (you can access)
```

### CSV Handling Best Practice
**Critical:** Position fields like "G, F" require proper quoting
```python
# Reading
df = pd.read_csv('file.csv', quotechar='"')

# Writing
df.to_csv('file.csv', index=False, quoting=1)  # QUOTE_ALL
```

---

## 📦 KEY DELIVERABLES CREATED

### Documentation
1. `QUICK_START_GUIDE.md` - Data science pipeline skill overview
2. `ACES_DATA_DICTIONARY.md` - Complete dataset schema reference
3. `PBPSTATS_ENDPOINT_MAPPER.md` - API integration guide
4. `TABLEAU_GUIDE.md` - Comprehensive visualization instructions
5. `TABLEAU_PLAYER_PROFILES_BUILD_GUIDE.md` - Step-by-step chart building
6. `ACES_WEIGHTED_POSITIONAL_PERCENTILES_ANALYSIS.md` - Methodology + findings
7. `DERIVED_METRICS_SUMMARY.txt` - All 20 new metrics explained
8. `claude_ai_best_practices_reference.md` - Workflow patterns learned
9. `scalability_analysis_framework.md` - Player development evaluation

### Data Files
1. `player_stats_master_2023_2025.csv` - Multi-season base data
2. `player_stats_processed_long.csv` - Analysis-ready long format
3. `player_stats_processed_wide.csv` - Analysis-ready wide format
4. `aces_player_profiles_final_2025.csv` - **66 columns, 8 players, core dataset**
5. `aces_player_profiles_with_percentiles_2025.csv` - 104 columns with league context
6. `wnba_2025_weighted_percentiles.csv` - Full league (150 players)
7. Shot zone, phase analysis, modern profile CSVs (multiple)

### Code/Scripts
1. `add_derived_metrics.py` - Generates 20 advanced player metrics
2. Tableau calculated fields library (copy-paste ready)
3. React visualization mockups (design targets)

### Interactive Artifacts
1. `project_tracker_persistent.jsx` - Task tracker with storage (62% complete)
2. `small_multiples_preview.jsx` - Viz mockup for shot zones + Four Factors
3. `aces_player_profiles_mockup.jsx` - **Complete player profile dashboard design**

---

## 🎯 NEXT IMMEDIATE STEPS

### 1. Complete Player Profile Visualizations (Priority)
**Follow TABLEAU_PLAYER_PROFILES_BUILD_GUIDE.md:**
- [ ] Create parameter: `Selected Player`
- [ ] Build 15+ calculated fields (percentiles, formatting, filters)
- [ ] Chart 1: Horizontal bars (key metrics with percentile labels)
- [ ] Chart 2: Diverging bars (on/off impact centered at 0)
- [ ] Chart 3: KPI cards row (5 big numbers)
- [ ] Chart 4: Comparison table (all 8 players, dynamic highlight)
- [ ] Assemble dashboard with dynamic title, Aces color palette
- [ ] Test player switching, export static images

**Design Target:** Use `aces_player_profiles_mockup.jsx` React artifact as visual reference

### 2. Begin Written Deliverables
**Structure:**
- Executive Summary (1 page) - Key findings, strategic recommendations
- Top 8 Player Reports (3 pages) - Individual tendencies in team context
- Team General Strategy (2 pages) - Shot selection, Four Factors optimization
- Lineup Recommendations (2 pages) - 5-man combos, on/off analysis
- Game-Specific Adjustments (2 pages) - Opponent matchups, vulnerabilities
- Data Collection Documentation (Appendix) - Sources, methods, validation

### 3. Lineup Analysis Phase
**After player profiles complete:**
- Pull pbpstats lineup data (`/get-lineup-player-stats/wnba`)
- Analyze 5-man combinations (efficiency, sample size thresholds)
- Identify best/worst lineups
- Project optimal combinations not yet played together
- Build lineup efficiency visualizations

---

## 💡 KEY INSIGHTS FOR PORTFOLIO NARRATIVE

### Strategic Storylines
1. **The Anti-Analytics Champions** - How Aces win by making "bad shots" at elite rates
2. **Mid-Season Transformation** - +20.1 Net Rating swing driven by shooting improvement
3. **A'ja Wilson's Generational Profile** - 71.5% midrange, elite across all dimensions
4. **Depth Quality Hierarchy** - Clear Star/Key Player/Contributor/Role Player tiers
5. **Development Opportunities** - Bell & Nye have elite shot profiles, need efficiency work

### Technical Demonstrations
1. **Data Integration:** wehoop + pbpstats API combination
2. **Advanced Metrics:** Dean Oliver Four Factors, weighted percentiles, composite ratings
3. **Visualization Design:** Professional Tableau dashboards with Aces branding
4. **Statistical Modeling:** Player archetype classification, scalability framework
5. **Storytelling:** Converting metrics into coaching/front office decisions

### Differentiation Points
- WNBA focus (underserved analytics market)
- Dual-deliverable approach (academic rigor + portfolio polish)
- Multi-stakeholder perspective (coaches, GMs, betting analysts)
- Complete pipeline (raw data → insights → visualizations → recommendations)

---

## 🔧 SKILLS & TOOLS DEMONSTRATED

### Technical Stack
- **Python:** pandas, numpy, API integration, metric calculation
- **Tableau:** Interactive dashboards, calculated fields, parameters, dynamic viz
- **R (reference):** Weighted percentile methodology adapted from project code
- **React:** Visualization mockups, design prototyping
- **Basketball Analytics:** Dean Oliver formulas, pbpstats.com advanced metrics

### Analytical Capabilities
- Data pipeline construction (multiple source integration)
- Schema normalization and validation
- Advanced basketball metrics (efficiency, impact, role identification)
- Statistical modeling (percentile calculation, archetype classification)
- Visualization design (color theory, layout, interactivity)
- Written communication (reports, documentation, executive summaries)

---

## 📋 PROJECT COMPLETION CHECKLIST

### Data & Analysis ✅
- [x] wehoop data integrated (2024-2025 seasons)
- [x] pbpstats shot data integrated
- [x] Top 8 rotation identified
- [x] Four Factors calculated and validated
- [x] Phase transformation analysis (14-14 → 16-0)
- [x] Shot zone analysis complete
- [x] Modern profile analysis (Rim+3PT vs efficiency)
- [x] 20 derived metrics calculated
- [x] Weighted positional percentiles (150-player league context)
- [x] Player archetypes classified

### Visualizations 🔄
- [x] Team Phase Analysis (5 charts in Tableau)
- [ ] Player Profiles Dashboard (React mockup ready, Tableau in progress)
- [ ] Lineup Analysis Charts (pending)

### Written Deliverables ⏳
- [ ] Executive Summary (1 page)
- [ ] Top 8 Player Reports (3 pages)
- [ ] Team General Strategy (2 pages)
- [ ] Lineup Recommendations (2 pages)
- [ ] Game-Specific Adjustments (2 pages)
- [ ] Data Collection Documentation (Appendix)

### Final Assembly ⏳
- [ ] Compile report PDF
- [ ] Create presentation slides (10-12 slides)
- [ ] Quality review & proofread
- [ ] Submit academic deliverables

---

## 🎓 LESSONS LEARNED

### Workflow Optimization
1. **"Individual bricks before walls"** - Build player understanding before lineup combinations
2. **Design mockups as build targets** - React artifacts accelerate Tableau development
3. **80/20 data strategy** - Share foundation, diverge for specific outputs
4. **Persistent task tracking** - Storage-enabled artifacts maintain progress across sessions

### Technical Best Practices
1. **CSV quoting discipline** - ALWAYS use `quoting=1` for fields with commas
2. **Weighted percentiles** - Minutes-weighted rankings prevent bench player skew
3. **Validation at every step** - Spot-check against ESPN, verify ranges, catch issues early
4. **Documentation concurrent with work** - Don't wait until end to document methods

### Basketball Analytics Insights
1. **Shot selection ≠ efficiency** - Aces prove "anti-analytics" can work with elite execution
2. **Mid-season adjustments** - Phase analysis reveals coaching impact beyond roster
3. **Context matters** - Positional percentiles more meaningful than raw rankings
4. **Archetypes evolve** - Chelsea Gray: Facilitator → Primary Ball Handler based on role

---

## 📞 SUPPORT RESOURCES

**Claude Projects:** All files in `/mnt/project/` available read-only  
**Skills Available:**
- `data-science-pipeline` - Data cleaning, validation, Tableau prep
- `portfolio-data-viz-deliverables` - Dashboard design, chart selection
- `docx`, `pptx`, `pdf`, `xlsx` - Document creation skills

**Key Reference Files:**
- `TABLEAU_PLAYER_PROFILES_BUILD_GUIDE.md` - Complete step-by-step for next phase
- `aces_player_profiles_mockup.jsx` - Visual design target
- `ACES_DATA_DICTIONARY.md` - Schema reference for all datasets

**Project Tracker:** Use `project_tracker_persistent.jsx` to monitor completion (62% done)

---

## 🎯 SUCCESS METRICS

### Academic Project (Due in 2 weeks)
- [ ] All required components included
- [ ] Visualizations professional-quality
- [ ] Written analysis demonstrates basketball IQ
- [ ] Data documentation reproducible
- [ ] Presentation ready (15-minute timing)

### Portfolio Project (Ongoing)
- [ ] Tableau Public dashboard published
- [ ] GitHub repo polished with README
- [ ] Executive summary showcases technical + analytical skills
- [ ] Case study demonstrates multi-stakeholder value
- [ ] Work samples ready for employer review

---

*Chat Summary Generated: January 2026*  
*Project Status: 62% Complete (Phase 3: Visualizations in progress)*  
*Next Session Focus: Complete player profile Tableau dashboard using build guide*
