# Las Vegas Aces 2025 Analytics Project
## GitHub Repository Structure

---

## 📁 Complete Repository Layout

```
aces-2025-analytics/
│
├── 📄 README.md                           # Project overview, setup instructions
├── 📄 LICENSE                             # MIT or your preferred license
├── 📄 .gitignore                          # Python, R, Tableau, data files
├── 📄 requirements.txt                    # Python dependencies
├── 📄 renv.lock                           # R dependencies (optional)
│
├── 📂 data/
│   ├── 📂 raw/                            # Original untouched data
│   │   ├── 📂 wehoop/
│   │   │   ├── team_box_2024.parquet
│   │   │   ├── team_box_2025.parquet
│   │   │   ├── player_box_2024.parquet
│   │   │   ├── player_box_2025.parquet
│   │   │   └── schedule_2025.parquet
│   │   │
│   │   └── 📂 pbpstats/
│   │       ├── aces_shots_raw.json
│   │       ├── aces_totals_raw.json
│   │       └── aces_onoff_raw.json
│   │
│   ├── 📂 processed/                      # Cleaned, transformed data
│   │   ├── player_stats_master_2023_2025.csv
│   │   ├── player_stats_processed_wide.csv
│   │   ├── player_stats_processed_long.csv
│   │   ├── aces_player_profiles_final_2025.csv
│   │   ├── aces_player_profiles_with_percentiles_2025.csv
│   │   └── wnba_2025_weighted_percentiles.csv
│   │
│   └── 📂 tableau/                        # Tableau-ready exports
│       ├── aces_percentiles_tableau_long.csv
│       ├── aces_percentiles_tableau_wide.csv
│       ├── aces_strength_weakness_matrix.csv
│       ├── aces_radar_chart_data.csv
│       └── aces_phase_metrics_2025.csv
│
├── 📂 scripts/
│   ├── 📂 data_collection/
│   │   ├── pull_wehoop_only.py            # wehoop data ingestion
│   │   ├── pull_wehoop_only.R             # R version
│   │   ├── pbpstats_shots.py              # Shot location data
│   │   ├── pbpstats_lineups.py            # Lineup combinations
│   │   └── pbpstats_get_roster.py         # Player ID mapping
│   │
│   ├── 📂 processing/
│   │   ├── calculate_metrics_from_csv.py  # Four Factors, efficiency
│   │   ├── add_derived_metrics.py         # 20 custom metrics
│   │   ├── weighted_percentile_analysis.py # Positional percentiles
│   │   └── validate_metrics.py            # ESPN cross-validation
│   │
│   └── 📂 analysis/
│       ├── player_archetype_classification.py
│       ├── lineup_compatibility_matrix.py
│       └── phase_transformation_analysis.py
│
├── 📂 notebooks/                          # Jupyter/R notebooks for exploration
│   ├── 01_data_exploration.ipynb
│   ├── 02_player_analysis.ipynb
│   ├── 03_lineup_combinations.ipynb
│   ├── 04_shot_analysis.ipynb
│   └── 05_weighted_percentiles.ipynb
│
├── 📂 visualizations/
│   ├── 📂 tableau/
│   │   ├── aces_team_phase_analysis.twbx
│   │   ├── aces_player_profiles.twbx
│   │   └── aces_strength_weakness_matrix.twbx
│   │
│   ├── 📂 mockups/                        # React/JSX design mockups
│   │   ├── aces_player_profiles_mockup.jsx
│   │   ├── aces_radar_chart_mockup.jsx
│   │   ├── game_adjustment_decision_tree.jsx
│   │   ├── sideline_reference_card.jsx
│   │   ├── project_tracker.jsx
│   │   └── small_multiples_preview.jsx
│   │
│   └── 📂 static/                         # PNG/PDF exports for report
│       ├── player_radar_charts/
│       ├── strength_weakness_heatmap.png
│       ├── phase_transformation_chart.png
│       └── lineup_compatibility_matrix.png
│
├── 📂 reports/
│   ├── 📂 academic/                       # Final project deliverables
│   │   ├── EXECUTIVE_SUMMARY.md
│   │   ├── TOP_8_PLAYER_REPORTS.md
│   │   ├── TEAM_GENERAL_STRATEGY.md
│   │   ├── STRATEGIC_LINEUP_RECOMMENDATIONS.md
│   │   ├── GAME_SPECIFIC_ADJUSTMENTS.md
│   │   ├── DATA_COLLECTION_DOCUMENTATION.md
│   │   ├── final_report.pdf               # Compiled PDF
│   │   └── presentation_slides.pptx       # 10-12 slide deck
│   │
│   └── 📂 portfolio/                      # Portfolio showcase versions
│       ├── executive_summary_portfolio.pdf
│       └── case_study_overview.md
│
├── 📂 docs/
│   ├── ACES_DATA_DICTIONARY.md            # Complete schema documentation
│   ├── PBPSTATS_ENDPOINT_MAPPER.md        # API reference
│   ├── DERIVED_METRICS_SUMMARY.txt        # Business context for metrics
│   ├── ACES_WEIGHTED_POSITIONAL_PERCENTILES_ANALYSIS.md
│   ├── LINEUP_COMPATIBILITY_MATRIX.md
│   ├── TABLEAU_GUIDE.md                   # Step-by-step Tableau builds
│   ├── TABLEAU_PLAYER_PROFILES_BUILD_GUIDE.md
│   └── QUICK_START_GUIDE.md               # Getting started
│
└── 📂 assets/
    ├── aces_logo.png
    ├── color_palette.md                   # Brand colors (#C8102E, #FDB927)
    └── fonts/
```

---

## 📋 File Descriptions by Category

### 🔧 Root Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, installation, usage, key findings summary |
| `requirements.txt` | Python dependencies: `pandas`, `numpy`, `requests`, `pyarrow` |
| `.gitignore` | Exclude: `*.parquet`, `*.twbx`, `__pycache__/`, `.env`, large CSVs |

---

### 📊 Data Directory

**`data/raw/`** — Original, untouched source data
- Never modify these files
- Serves as backup and audit trail
- Include in `.gitignore` if files are too large (>100MB)

**`data/processed/`** — Cleaned, transformed datasets
- Ready for analysis
- Reproducible from raw + scripts

**`data/tableau/`** — Pre-formatted for visualization
- Pivoted formats (long vs. wide)
- Pre-calculated fields for Tableau performance

---

### ⚙️ Scripts Directory

**`scripts/data_collection/`**
| Script | Function |
|--------|----------|
| `pull_wehoop_only.py` | Downloads WNBA box scores from wehoop GitHub releases |
| `pbpstats_shots.py` | Fetches shot location data with x,y coordinates |
| `pbpstats_lineups.py` | Retrieves 5-man lineup statistics |
| `pbpstats_get_roster.py` | Maps player names to pbpstats IDs |

**`scripts/processing/`**
| Script | Function |
|--------|----------|
| `calculate_metrics_from_csv.py` | Computes Dean Oliver Four Factors, ORtg, DRtg, NetRtg, TS% |
| `add_derived_metrics.py` | Calculates 20 custom metrics (Star Rating, Two-Way Rating, etc.) |
| `weighted_percentile_analysis.py` | Positional percentiles using weighted methodology |
| `validate_metrics.py` | Cross-references calculated metrics against ESPN |

**`scripts/analysis/`**
| Script | Function |
|--------|----------|
| `player_archetype_classification.py` | Assigns player archetypes based on statistical profiles |
| `lineup_compatibility_matrix.py` | Identifies optimal/problematic player combinations |
| `phase_transformation_analysis.py` | Analyzes 14-14 → 16-0 → Playoffs phases |

---

### 📓 Notebooks Directory

| Notebook | Content |
|----------|---------|
| `01_data_exploration.ipynb` | Initial data inspection, column mapping, quality checks |
| `02_player_analysis.ipynb` | Top 8 rotation identification, individual metrics |
| `03_lineup_combinations.ipynb` | 5-man lineup efficiency, on/off splits |
| `04_shot_analysis.ipynb` | Shot zone heat maps, "anti-analytics" profile |
| `05_weighted_percentiles.ipynb` | Methodology walkthrough, league context |

---

### 📈 Visualizations Directory

**`visualizations/tableau/`** — Tableau workbooks
- `aces_team_phase_analysis.twbx` — Four Factors slope charts, phase comparison
- `aces_player_profiles.twbx` — Interactive player selection dashboard
- `aces_strength_weakness_matrix.twbx` — Heat map grid

**`visualizations/mockups/`** — React prototypes
- Design references for Tableau implementation
- Interactive demos for stakeholder review

**`visualizations/static/`** — Export images
- High-resolution PNGs for PDF report
- Chart screenshots for presentation slides

---

### 📝 Reports Directory

**`reports/academic/`** — Final project submission
| File | Pages | Content |
|------|-------|---------|
| `EXECUTIVE_SUMMARY.md` | 1 | Key findings, strategic recommendations |
| `TOP_8_PLAYER_REPORTS.md` | 3 | Individual player analysis with archetypes |
| `TEAM_GENERAL_STRATEGY.md` | 2 | Shot selection, Four Factors, tactical approach |
| `STRATEGIC_LINEUP_RECOMMENDATIONS.md` | 2 | 5-man combos, compatibility matrix |
| `GAME_SPECIFIC_ADJUSTMENTS.md` | 2 | Opponent styles, matchups, situational play |
| `DATA_COLLECTION_DOCUMENTATION.md` | 1+ | Sources, methods, validation (appendix) |
| `final_report.pdf` | ~12 | Compiled PDF of all sections |
| `presentation_slides.pptx` | 10-12 | 15-minute presentation deck |

**`reports/portfolio/`** — Employer-facing versions
- Condensed executive summary
- Case study format for portfolio website

---

### 📚 Docs Directory

| Document | Purpose |
|----------|---------|
| `ACES_DATA_DICTIONARY.md` | Complete schema for all datasets |
| `PBPSTATS_ENDPOINT_MAPPER.md` | API endpoint reference with examples |
| `DERIVED_METRICS_SUMMARY.txt` | Business context for all 20 custom metrics |
| `ACES_WEIGHTED_POSITIONAL_PERCENTILES_ANALYSIS.md` | Technical methodology documentation |
| `LINEUP_COMPATIBILITY_MATRIX.md` | Player pairing analysis |
| `TABLEAU_GUIDE.md` | Step-by-step visualization building |
| `QUICK_START_GUIDE.md` | Getting started for new users |

---

## 🚀 README.md Template

```markdown
# Las Vegas Aces 2025 Season Analytics

A comprehensive basketball analytics project analyzing the Las Vegas Aces' 
2025 championship season, combining traditional box score data with advanced 
play-by-play metrics.

## 🏀 Project Overview

This dual-purpose project serves as:
1. **Academic Final Project** — Basketball Analytics course deliverable
2. **Portfolio Showcase** — Professional analytics demonstration

### Key Findings
- **The Anti-Analytics Champions**: Aces rank #13 in "modern" shot profile 
  (rim + 3PT frequency) but #4 in True Shooting %
- **Phase Transformation**: +20.1 Net Rating improvement from Phase 1 (14-14) 
  to Phase 2 (16-0)
- **A'ja Wilson's Dominance**: 7 elite skills (90th+ percentile), 0 weaknesses
- **Championship Core**: Wilson + Young + Gray = +64.9 combined net rating impact

## 📊 Data Sources

| Source | Data Type | Access |
|--------|-----------|--------|
| [wehoop](https://wehoop.sportsdataverse.org/) | WNBA box scores | R package / GitHub |
| [pbpstats.com](https://api.pbpstats.com/) | Advanced metrics, shots | REST API (no key) |

## 🛠️ Setup

```bash
# Clone repository
git clone https://github.com/yourusername/aces-2025-analytics.git
cd aces-2025-analytics

# Install Python dependencies
pip install -r requirements.txt

# Run data collection
python scripts/data_collection/pull_wehoop_only.py
python scripts/data_collection/pbpstats_shots.py

# Process data
python scripts/processing/calculate_metrics_from_csv.py
python scripts/processing/add_derived_metrics.py
```

## 📁 Project Structure

See [QUICK_START_GUIDE.md](docs/QUICK_START_GUIDE.md) for detailed breakdown.

## 📈 Visualizations

Interactive Tableau dashboards available at: [Tableau Public Link]

## 👤 Author

**Krystal** — Basketball Analytics | [LinkedIn] | [Portfolio]

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
```

---

## 📦 .gitignore Template

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
.Python
venv/
.env

# R
.Rhistory
.RData
.Ruserdata
renv/library/

# Data files (large)
*.parquet
data/raw/**/*.json
data/raw/**/*.parquet

# Keep processed CSVs under 50MB
# data/processed/*.csv

# Tableau
*.twb
*.twbx
*.hyper
*.tde

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Jupyter
.ipynb_checkpoints/

# Exports
reports/academic/*.pdf
reports/academic/*.pptx
visualizations/static/*.png
```

---

## ✅ Pre-Submission Checklist

### Data & Code
- [ ] All scripts run without errors
- [ ] Data dictionary complete and accurate
- [ ] Validation checks pass (ESPN comparison)
- [ ] No hardcoded file paths (use relative paths)
- [ ] requirements.txt includes all dependencies

### Documentation
- [ ] README.md complete with setup instructions
- [ ] All markdown files render correctly
- [ ] Code comments explain non-obvious logic
- [ ] Data sources properly attributed

### Deliverables
- [ ] All 6 written sections complete
- [ ] Visualizations exported to static/
- [ ] PDF report compiled
- [ ] Presentation slides created
- [ ] Tableau workbooks tested

### Repository
- [ ] .gitignore configured properly
- [ ] No sensitive data committed
- [ ] Commit history clean and descriptive
- [ ] Repository is public (for portfolio) or shared with evaluators

---

## 🎯 Portfolio Presentation Tips

1. **Pin this repo** on your GitHub profile
2. **Add topics/tags**: `basketball-analytics`, `wnba`, `data-visualization`, `python`, `tableau`
3. **Include screenshots** in README.md showing key visualizations
4. **Link to Tableau Public** dashboard
5. **Write a LinkedIn post** summarizing key findings with repo link

---

*Repository structure designed for reproducibility, clarity, and professional presentation.*
