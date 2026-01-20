# Tableau Calculated Fields - Copy & Paste Reference
## Charts 1, 2, and 5

---

## 🔧 CHART 1: Four Factors Transformation
**Data Source: `aces_phase_summary_2025_real.csv`**

### Phase Order
```
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 1
    WHEN 'Phase 2: Winning Streak' THEN 2
    WHEN 'Phase 3: Playoffs' THEN 3
END
```

### Phase Short (Record Labels)
```
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN '14-14'
    WHEN 'Phase 2: Winning Streak' THEN '16-0'
    WHEN 'Phase 3: Playoffs' THEN '9-3'
END
```

### Off eFG Pct Display
```
[off_efg_pct] * 100
```

### Def eFG Pct Display
```
[def_efg_pct] * 100
```

### Off TOV Pct Display
```
[off_tov_pct] * 100
```

### Off OREB Pct Display
```
[off_oreb_pct] * 100
```

### Off FT Rate Display
```
[off_ft_rate] * 100
```

---

## 🔧 CHART 2: Net Rating Journey
**Data Source: `aces_analysis_master_2025.csv`**

### Win Loss Label
```
IF [team_winner] THEN 'Win' ELSE 'Loss' END
```

### Phase Color Category
```
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 'Struggling'
    WHEN 'Phase 2: Winning Streak' THEN 'Dominant'
    WHEN 'Phase 3: Playoffs' THEN 'Championship'
END
```

### Zero Line Reference
```
0
```

### Phase Boundary 1 (Game 28)
```
28
```

### Phase Boundary 2 (Game 44)
```
44
```

### Positive Net Rating
```
[net_rtg] > 0
```

### Net Rating Tier
```
IF [net_rtg] >= 15 THEN 'Blowout Win'
ELSEIF [net_rtg] >= 5 THEN 'Solid Win'
ELSEIF [net_rtg] >= 0 THEN 'Close Win'
ELSEIF [net_rtg] >= -5 THEN 'Close Loss'
ELSEIF [net_rtg] >= -15 THEN 'Solid Loss'
ELSE 'Blowout Loss'
END
```

---

## 🔧 CHART 5: Small Multiples
**Data Source: `aces_phase_metrics_long_2025_real.csv`**

### Value as Percentage
```
[value] * 100
```

### Phase Order
```
CASE [phase]
    WHEN 'Phase 1: Rocky Start' THEN 1
    WHEN 'Phase 2: Winning Streak' THEN 2
    WHEN 'Phase 3: Playoffs' THEN 3
END
```

### Metric Short Name
```
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

### Is Offense Category
```
CONTAINS([category], 'Offense')
```

### Category Short
```
IF CONTAINS([category], 'Offense') THEN 'OFFENSE'
ELSEIF CONTAINS([category], 'Defense') THEN 'DEFENSE'
ELSE [category]
END
```

### League Average by Metric
```
CASE [metric]
    WHEN 'Off eFG%' THEN 50.0
    WHEN 'Off FT Rate' THEN 27.1
    WHEN 'Off TOV%' THEN 16.2
    WHEN 'Off OREB%' THEN 24.8
    WHEN 'Def eFG% Allowed' THEN 50.0
    WHEN 'Def FT Rate Allowed' THEN 27.1
    WHEN 'Def TOV% Forced' THEN 16.2
    WHEN 'Def OREB% Allowed' THEN 24.8
    ELSE NULL
END
```

### Vs League Avg
```
([value] * 100) - [League Average by Metric]
```

### Improvement Direction (Color)
```
// Green = Good, Red = Needs Work
// Note: TOV% directions are inverted

IF [category] = 'Four Factors (Offense)' THEN
    IF CONTAINS([metric], 'TOV') THEN
        // Lower is better for offensive turnovers
        IF [value] < 0.15 THEN 'Elite'
        ELSEIF [value] < 0.162 THEN 'Good' 
        ELSE 'Needs Work' 
        END
    ELSE
        // Higher is better for eFG%, FT Rate, OREB%
        IF [value] > 0.52 THEN 'Elite'
        ELSEIF [value] > 0.48 THEN 'Good'
        ELSE 'Needs Work'
        END
    END
ELSE // Defense
    IF CONTAINS([metric], 'TOV') THEN
        // Higher is better (forcing turnovers)
        IF [value] > 0.17 THEN 'Elite'
        ELSEIF [value] > 0.162 THEN 'Good'
        ELSE 'Needs Work'
        END
    ELSE
        // Lower is better for eFG%, FT Rate, OREB% allowed
        IF [value] < 0.47 THEN 'Elite'
        ELSEIF [value] < 0.50 THEN 'Good'
        ELSE 'Needs Work'
        END
    END
END
```

---

## 🎨 COLOR ASSIGNMENTS

### Phase Colors (Use in All Charts)
| Phase | Hex Code | RGB |
|-------|----------|-----|
| Phase 1: Rocky Start | #DC143C | 220, 20, 60 |
| Phase 2: Winning Streak | #228B22 | 34, 139, 34 |
| Phase 3: Playoffs | #FFD700 | 255, 215, 0 |

### Performance Colors
| Rating | Hex Code |
|--------|----------|
| Elite | #006400 |
| Good | #228B22 |
| Average | #666666 |
| Needs Work | #DC143C |

### Reference Lines
| Element | Hex Code | Style |
|---------|----------|-------|
| League Average | #999999 | Dashed |
| Zero Line | #000000 | Solid, 2px |
| Phase Boundary | #666666 | Dotted |

---

## 📊 LEAGUE AVERAGES REFERENCE
*Use these for reference lines and comparison*

| Metric | League Avg | Aces Phase 1 | Aces Phase 2 | Delta |
|--------|------------|--------------|--------------|-------|
| Off eFG% | 50.0% | 47.8% | 55.5% | +7.7% |
| Off FT Rate | 27.1% | 29.6% | 23.4% | -6.2% |
| Off TOV% | 16.2% | 15.7% | 13.7% | -2.0% |
| Off OREB% | 24.8% | 22.7% | 24.9% | +2.2% |
| Def eFG% | 50.0% | 50.0% | 46.8% | -3.2% |
| Def FT Rate | 27.1% | 25.8% | 21.9% | -3.9% |
| Def TOV% | 16.2% | 15.8% | 15.5% | -0.3% |
| Def OREB% | 24.8% | 25.9% | 24.7% | -1.2% |

---

## 📍 PHASE BOUNDARIES (For Chart 2)
| Boundary | Game Number | Description |
|----------|-------------|-------------|
| Phase 1 Start | 1 | Season opener |
| Phase 1 End | 28 | Last .500 record (14-14) |
| Phase 2 Start | 29 | Streak begins |
| Phase 2 End | 44 | 16-0 streak complete |
| Phase 3 Start | 45 | Playoffs begin |
| Phase 3 End | 56 | Championship |

---

## ⚡ QUICK SETUP CHECKLIST

### Chart 1 Setup:
1. [ ] Connect `aces_phase_summary_2025_real.csv`
2. [ ] Create `Phase Order` calc field
3. [ ] Drag `Phase Order` to Columns
4. [ ] Drag Four Factor measures to Rows
5. [ ] Change to Line chart
6. [ ] Add Phase colors
7. [ ] Add reference lines (league avg)

### Chart 2 Setup:
1. [ ] Connect `aces_analysis_master_2025.csv`
2. [ ] Drag `game_number` to Columns
3. [ ] Drag `net_rtg` to Rows
4. [ ] Add `net_rtg_rolling5` as dual axis
5. [ ] Color by `phase`
6. [ ] Add reference bands at games 28, 44
7. [ ] Add zero line

### Chart 5 Setup:
1. [ ] Connect `aces_phase_metrics_long_2025_real.csv`
2. [ ] Filter to "Four Factors" categories only
3. [ ] Create `Metric Short` calc field
4. [ ] Drag `category` to Rows
5. [ ] Drag `Metric Short` to Columns
6. [ ] Drag `phase` to Color
7. [ ] Drag `Value Pct` to size/length
8. [ ] Add league avg reference per cell
