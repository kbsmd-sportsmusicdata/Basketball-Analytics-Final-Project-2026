# Player Compatibility Matrix - Tableau Build Guide
## Las Vegas Aces 2025 Season

---

## Step 1: Prepare the Data

First, create this CSV file named `aces_compatibility_matrix.csv`:

```csv
Player1,Player2,Combined_Net,Category,Player1_Net,Player2_Net
A'ja Wilson,Jackie Young,51.8,Elite,29.3,22.5
A'ja Wilson,Chelsea Gray,42.5,Elite,29.3,13.2
A'ja Wilson,NaLyssa Smith,37.3,High,29.3,8.0
A'ja Wilson,Jewell Loyd,31.7,High,29.3,2.4
A'ja Wilson,Kierstan Bell,27.7,Moderate,29.3,-1.6
A'ja Wilson,Dana Evans,17.0,Moderate,29.3,-12.3
A'ja Wilson,Aaliyah Nye,18.6,Moderate,29.3,-10.7
Jackie Young,Chelsea Gray,35.7,High,22.5,13.2
Jackie Young,NaLyssa Smith,30.5,High,22.5,8.0
Jackie Young,Jewell Loyd,24.9,Moderate,22.5,2.4
Jackie Young,Kierstan Bell,20.9,Moderate,22.5,-1.6
Jackie Young,Dana Evans,10.2,Low,22.5,-12.3
Jackie Young,Aaliyah Nye,11.8,Low,22.5,-10.7
Chelsea Gray,NaLyssa Smith,21.2,Moderate,13.2,8.0
Chelsea Gray,Jewell Loyd,15.6,Moderate,13.2,2.4
Chelsea Gray,Kierstan Bell,11.6,Low,13.2,-1.6
Chelsea Gray,Dana Evans,0.9,Avoid,13.2,-12.3
Chelsea Gray,Aaliyah Nye,2.5,Low,13.2,-10.7
NaLyssa Smith,Jewell Loyd,10.4,Low,8.0,2.4
NaLyssa Smith,Kierstan Bell,6.4,Low,8.0,-1.6
NaLyssa Smith,Dana Evans,-4.3,Avoid,8.0,-12.3
NaLyssa Smith,Aaliyah Nye,-2.7,Avoid,8.0,-10.7
Jewell Loyd,Kierstan Bell,0.8,Low,2.4,-1.6
Jewell Loyd,Dana Evans,-9.9,Avoid,2.4,-12.3
Jewell Loyd,Aaliyah Nye,-8.3,Avoid,2.4,-10.7
Kierstan Bell,Dana Evans,-13.9,Avoid,-1.6,-12.3
Kierstan Bell,Aaliyah Nye,-12.3,Avoid,-1.6,-10.7
Dana Evans,Aaliyah Nye,-23.0,Never,12.3,-10.7
```

---

## Step 2: Connect to Tableau

1. Open Tableau Desktop
2. Connect to Text File → Select `aces_compatibility_matrix.csv`
3. Verify data types:
   - Player1, Player2, Category: String
   - Combined_Net, Player1_Net, Player2_Net: Number (decimal)

---

## Step 3: Create Calculated Fields

### 3.1 Player Order (for consistent sorting)
```
// Player Order
CASE [Player1]
    WHEN "A'ja Wilson" THEN 1
    WHEN "Jackie Young" THEN 2
    WHEN "Chelsea Gray" THEN 3
    WHEN "Jewell Loyd" THEN 4
    WHEN "NaLyssa Smith" THEN 5
    WHEN "Kierstan Bell" THEN 6
    WHEN "Dana Evans" THEN 7
    WHEN "Aaliyah Nye" THEN 8
END
```

### 3.2 Player Order 2 (for columns)
```
// Player Order 2
CASE [Player2]
    WHEN "A'ja Wilson" THEN 1
    WHEN "Jackie Young" THEN 2
    WHEN "Chelsea Gray" THEN 3
    WHEN "Jewell Loyd" THEN 4
    WHEN "NaLyssa Smith" THEN 5
    WHEN "Kierstan Bell" THEN 6
    WHEN "Dana Evans" THEN 7
    WHEN "Aaliyah Nye" THEN 8
END
```

### 3.3 Display Label
```
// Display Label
IF [Combined_Net] > 0 THEN "+" + STR(ROUND([Combined_Net], 1))
ELSE STR(ROUND([Combined_Net], 1))
END
```

### 3.4 Color Category (for stepped colors)
```
// Color Category
IF [Combined_Net] >= 40 THEN "1-Elite (40+)"
ELSEIF [Combined_Net] >= 20 THEN "2-High (20-39)"
ELSEIF [Combined_Net] >= 10 THEN "3-Moderate (10-19)"
ELSEIF [Combined_Net] >= 0 THEN "4-Low (0-9)"
ELSEIF [Combined_Net] >= -10 THEN "5-Caution (-1 to -10)"
ELSE "6-Avoid (<-10)"
END
```

---

## Step 4: Build the Matrix

### 4.1 Set Up the Grid
1. Drag `Player2` to **Columns**
2. Drag `Player1` to **Rows**
3. Change Mark Type to **Square**

### 4.2 Sort Players
1. Right-click `Player1` on Rows → Sort
   - Sort By: Field
   - Field Name: Player Order
   - Aggregation: Minimum
   - Sort Order: Ascending

2. Right-click `Player2` on Columns → Sort
   - Sort By: Field
   - Field Name: Player Order 2
   - Aggregation: Minimum
   - Sort Order: Ascending

### 4.3 Add Color
1. Drag `Combined_Net` to **Color**
2. Click Color → Edit Colors
3. Choose **Red-Green Diverging** palette
4. Check "Stepped Color" → 6 steps
5. Click Advanced:
   - Center: 0
   - Start: -25
   - End: 55

**Alternative: Use Color Category for discrete colors**
- Drag `Color Category` to Color instead
- Assign colors:
  - 1-Elite (40+): Dark Green (#1a7c32)
  - 2-High (20-39): Light Green (#6cc24a)
  - 3-Moderate (10-19): Yellow-Green (#b5d56a)
  - 4-Low (0-9): Light Yellow (#fff2cc)
  - 5-Caution (-1 to -10): Orange (#f4a460)
  - 6-Avoid (<-10): Red (#dc3545)

### 4.4 Add Labels
1. Drag `Display Label` to **Label**
2. Click Label → Alignment: Center
3. Font: Tableau Bold, 9pt
4. Check "Allow labels to overlap other marks"

### 4.5 Adjust Size
1. Click Size
2. Adjust slider to ~75-80% to fill cells with slight gaps

---

## Step 5: Format the Matrix

### 5.1 Clean Up Grid Lines
1. Format → Lines
2. Grid Lines: None
3. Zero Lines: None

### 5.2 Add Borders
1. Format → Borders
2. Row Divider: Light gray, thin
3. Column Divider: Light gray, thin

### 5.3 Format Headers
1. Right-click Player names → Format
2. Font: Tableau Semibold, 10pt
3. Alignment: Right (rows), Center (columns)

### 5.4 Add Title
Title: **Player Compatibility Matrix**
Subtitle: Combined Net Rating When Two Players Share Court

---

## Step 6: Add Tooltip Enhancement

Edit Tooltip:
```
<Player1> + <Player2>
Combined Net Rating: <Combined_Net>

<Player1> Individual: <Player1_Net>
<Player2> Individual: <Player2_Net>

Category: <Category>
```

---

## Step 7: Create Dashboard Layout

1. New Dashboard (1200 x 800 px)
2. Add the matrix sheet
3. Add a text box with legend:

**LEGEND**
🟢 Elite (40+): Always play together
🟢 High (20-39): Prioritize pairing
🟡 Moderate (10-19): Good situational
⚪ Low (0-9): Neutral impact
🟠 Caution (-1 to -10): Limit minutes
🔴 Avoid (<-10): Never play together

4. Add key insights text box:
- **Best Pairing:** Wilson + Young (+51.8)
- **Worst Pairing:** Evans + Nye (-23.0)
- **Core 3 Together:** +64.9 combined

---

## Alternative: Full 8x8 Matrix with Diagonal

If you want a complete matrix (including self-pairings on diagonal):

Create additional rows in the CSV with diagonal values set to null or 0:
```csv
A'ja Wilson,A'ja Wilson,0,Self,29.3,29.3
Jackie Young,Jackie Young,0,Self,22.5,22.5
...etc
```

Then add a calculated field:
```
// Hide Diagonal
IF [Player1] = [Player2] THEN NULL ELSE [Combined_Net] END
```

Use this for Color instead of Combined_Net.

---

## Export for Google Slides

1. Dashboard → Export as Image
2. Format: PNG
3. Resolution: 300 DPI (for print quality)
4. Dimensions: 10" x 7.5" (standard slide)

Or use Worksheet → Copy → Image to clipboard, then paste into Google Slides.
