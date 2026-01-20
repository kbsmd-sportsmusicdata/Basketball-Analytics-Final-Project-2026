import os
import shutil

# ==========================================
# ⚙️ CONFIGURATION: YOUR SPECIFIC PATH
# ==========================================
SOURCE_PATH = "/workspaces/Basketball-Analytics-Final-Project-2026/Google Drive files/BA Final Project:Aces"

# ==========================================

# Define the map: "Where should this file go?"
FILE_MAP = {
    # --- Data: Raw (WeHoop) ---
    "team_box_2024.parquet": "data/raw/wehoop",
    "team_box_2025.parquet": "data/raw/wehoop",
    "player_box_2024.parquet": "data/raw/wehoop",
    "player_box_2025.parquet": "data/raw/wehoop",
    "schedule_2025.parquet": "data/raw/wehoop",

    # --- Data: Raw (PBPStats) ---
    "aces_shots_raw.json": "data/raw/pbpstats",
    "aces_totals_raw.json": "data/raw/pbpstats",
    "aces_onoff_raw.json": "data/raw/pbpstats",

    # --- Data: Processed ---
    "player_stats_master_2023_2025.csv": "data/processed",
    "player_stats_processed_wide.csv": "data/processed",
    "player_stats_processed_long.csv": "data/processed",
    "aces_player_profiles_final_2025.csv": "data/processed",
    "aces_player_profiles_with_percentiles_2025.csv": "data/processed",
    "wnba_2025_weighted_percentiles.csv": "data/processed",

    # --- Tableau Exports ---
    "aces_percentiles_tableau_long.csv": "tableau",
    "aces_percentiles_tableau_wide.csv": "tableau",
    "aces_strength_weakness_matrix.csv": "tableau",
    "aces_radar_chart_data.csv": "tableau",
    "aces_phase_metrics_2025.csv": "tableau",
}

def organize_files():
    repo_root = os.getcwd() 
    missing_files = []
    moved_count = 0

    if not os.path.exists(SOURCE_PATH):
        print(f"❌ ERROR: Path not found: {SOURCE_PATH}")
        return

    print(f"📂 Scanning: {SOURCE_PATH}")
    
    # Flattened scan of source folder
    source_files = {}
    for root, _, files in os.walk(SOURCE_PATH):
        for file in files:
            source_files[file] = os.path.join(root, file)

    for filename, dest_subfolder in FILE_MAP.items():
        dest_path = os.path.join(repo_root, dest_subfolder)
        os.makedirs(dest_path, exist_ok=True)

        if filename in source_files:
            src_file_path = source_files[filename]
            final_dest_path = os.path.join(dest_path, filename)
            shutil.copy2(src_file_path, final_dest_path)
            print(f"✅ Moved: {filename}")
            moved_count += 1
        else:
            missing_files.append((filename, dest_subfolder))

    print(f"\n✨ Summary: Moved {moved_count} files.")
    if missing_files:
        print("\n⚠️ MISSING FROM DRIVE:")
        for fname, folder in missing_files:
            print(f"   [ ] {fname} (needs to go to {folder})")

if __name__ == "__main__":
    organize_files()