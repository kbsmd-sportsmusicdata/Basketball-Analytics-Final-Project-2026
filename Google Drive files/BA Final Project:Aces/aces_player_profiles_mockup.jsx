import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Shield, Target, Zap, Users } from 'lucide-react';

const AcesPlayerProfiles = () => {
  // Real data from aces_player_profiles_final_2025.csv
  const players = [
    {
      id: 1628932,
      name: "A'ja Wilson",
      position: "F",
      archetype: "Efficient Big",
      years_exp: 8,
      exp_category: "Veteran",
      college: "South Carolina",
      draft_year: 2018,
      draft_pick: 1,
      draft_round: 1,
      height: "6'4\"",
      games: 52,
      wins: 38,
      win_pct: 0.731,
      mpg: 32.31,
      star_rating: 96.0,
      star_tier: "Star",
      two_way_rating: 11.1,
      two_way_tier: "Elite",
      ts_pct: 0.583,
      efg_pct: 0.512,
      usg_pct: 0.314,
      usage_tier: "Elite",
      efficiency_score: 18.3,
      efficiency_tier: "Above Average",
      ortg_on: 112.9,
      ortg_off: 93.3,
      ortg_diff: 19.6,
      drtg_on: 100.4,
      drtg_off: 110.2,
      drtg_diff: -9.8,
      net_rtg_on: 12.4,
      net_rtg_off: -16.9,
      net_rtg_diff: 29.3,
      offensive_impact: 19.6,
      defensive_impact: 9.8,
      ast_pct: 0.192,
      reb_pct: 0.158,
      pie: 21.946,
      availability: 0.929
    },
    {
      id: 1629498,
      name: "Jackie Young",
      position: "G",
      archetype: "Primary Ball Handler",
      years_exp: 7,
      exp_category: "Veteran",
      college: "Notre Dame",
      draft_year: 2019,
      draft_pick: 1,
      draft_round: 1,
      height: "6'0\"",
      games: 56,
      wins: 39,
      win_pct: 0.696,
      mpg: 31.39,
      star_rating: 84.6,
      star_tier: "Star",
      two_way_rating: 7.9,
      two_way_tier: "Good",
      ts_pct: 0.603,
      efg_pct: 0.554,
      usg_pct: 0.233,
      usage_tier: "High",
      efficiency_score: 14.0,
      efficiency_tier: "Elite",
      ortg_on: 110.5,
      ortg_off: 96.3,
      ortg_diff: 14.3,
      drtg_on: 101.3,
      drtg_off: 109.6,
      drtg_diff: -8.2,
      net_rtg_on: 9.2,
      net_rtg_off: -13.3,
      net_rtg_diff: 22.5,
      offensive_impact: 14.3,
      defensive_impact: 8.2,
      ast_pct: 0.281,
      reb_pct: 0.073,
      pie: 14.384,
      availability: 1.0
    },
    {
      id: 203833,
      name: "Chelsea Gray",
      position: "G",
      archetype: "Facilitator",
      years_exp: 11,
      exp_category: "Star Veteran",
      college: "Duke",
      draft_year: 2014,
      draft_pick: 11,
      draft_round: 1,
      height: "5'11\"",
      games: 56,
      wins: 39,
      win_pct: 0.696,
      mpg: 32.14,
      star_rating: 62.2,
      star_tier: "Key Player",
      two_way_rating: 7.6,
      two_way_tier: "Good",
      ts_pct: 0.563,
      efg_pct: 0.51,
      usg_pct: 0.17,
      usage_tier: "Medium",
      efficiency_score: 9.6,
      efficiency_tier: "Above Average",
      ortg_on: 111.7,
      ortg_off: 92.1,
      ortg_diff: 19.6,
      drtg_on: 104.6,
      drtg_off: 98.2,
      drtg_diff: 6.5,
      net_rtg_on: 7.1,
      net_rtg_off: -6.1,
      net_rtg_diff: 13.2,
      offensive_impact: 19.6,
      defensive_impact: -6.5,
      ast_pct: 0.267,
      reb_pct: 0.06,
      pie: 10.956,
      availability: 1.0
    },
    {
      id: 1631019,
      name: "NaLyssa Smith",
      position: "F",
      archetype: "Role Player",
      years_exp: 4,
      exp_category: "Young",
      college: "Baylor",
      draft_year: 2022,
      draft_pick: 2,
      draft_round: 1,
      height: "6'2\"",
      games: 39,
      wins: 30,
      win_pct: 0.769,
      mpg: 22.82,
      star_rating: 57.0,
      star_tier: "Key Player",
      two_way_rating: 11.3,
      two_way_tier: "Elite",
      ts_pct: 0.588,
      efg_pct: 0.585,
      usg_pct: 0.158,
      usage_tier: "Medium",
      efficiency_score: 9.3,
      efficiency_tier: "Above Average",
      ortg_on: 111.1,
      ortg_off: 105.1,
      ortg_diff: 6.0,
      drtg_on: 102.0,
      drtg_off: 104.0,
      drtg_diff: -2.0,
      net_rtg_on: 9.1,
      net_rtg_off: 1.1,
      net_rtg_diff: 8.0,
      offensive_impact: 6.0,
      defensive_impact: 2.0,
      ast_pct: 0.042,
      reb_pct: 0.117,
      pie: 7.616,
      availability: 0.696
    },
    {
      id: 204319,
      name: "Jewell Loyd",
      position: "G",
      archetype: "Role Player",
      years_exp: 11,
      exp_category: "Star Veteran",
      college: "Notre Dame",
      draft_year: 2015,
      draft_pick: 1,
      draft_round: 1,
      height: "5'10\"",
      games: 56,
      wins: 39,
      win_pct: 0.696,
      mpg: 28.55,
      star_rating: 45.3,
      star_tier: "Contributor",
      two_way_rating: 7.1,
      two_way_tier: "Good",
      ts_pct: 0.524,
      efg_pct: 0.494,
      usg_pct: 0.169,
      usage_tier: "Medium",
      efficiency_score: 8.9,
      efficiency_tier: "Average",
      ortg_on: 108.4,
      ortg_off: 104.0,
      ortg_diff: 4.4,
      drtg_on: 103.9,
      drtg_off: 101.9,
      drtg_diff: 2.0,
      net_rtg_on: 4.5,
      net_rtg_off: 2.1,
      net_rtg_diff: 2.4,
      offensive_impact: 4.4,
      defensive_impact: -2.0,
      ast_pct: 0.097,
      reb_pct: 0.059,
      pie: 7.388,
      availability: 1.0
    },
    {
      id: 1630389,
      name: "Dana Evans",
      position: "G",
      archetype: "Role Player",
      years_exp: 5,
      exp_category: "Young",
      college: "Louisville",
      draft_year: 2021,
      draft_pick: 13,
      draft_round: 2,
      height: "5'6\"",
      games: 56,
      wins: 39,
      win_pct: 0.696,
      mpg: 18.23,
      star_rating: 28.7,
      star_tier: "Contributor",
      two_way_rating: 0.4,
      two_way_tier: "Average",
      ts_pct: 0.496,
      efg_pct: 0.462,
      usg_pct: 0.188,
      usage_tier: "Medium",
      efficiency_score: 9.3,
      efficiency_tier: "Below Average",
      ortg_on: 100.9,
      ortg_off: 112.0,
      ortg_diff: -11.1,
      drtg_on: 104.0,
      drtg_off: 102.8,
      drtg_diff: 1.2,
      net_rtg_on: -3.1,
      net_rtg_off: 9.2,
      net_rtg_diff: -12.3,
      offensive_impact: -11.1,
      defensive_impact: -1.2,
      ast_pct: 0.232,
      reb_pct: 0.03,
      pie: 6.716,
      availability: 1.0
    },
    {
      id: 1631006,
      name: "Kierstan Bell",
      position: "G-F",
      archetype: "Two-Way Wing",
      years_exp: 4,
      exp_category: "Young",
      college: "FGCU",
      draft_year: 2022,
      draft_pick: 11,
      draft_round: 1,
      height: "6'1\"",
      games: 47,
      wins: 31,
      win_pct: 0.66,
      mpg: 11.79,
      star_rating: 29.0,
      star_tier: "Contributor",
      two_way_rating: -1.7,
      two_way_tier: "Below Average",
      ts_pct: 0.46,
      efg_pct: 0.45,
      usg_pct: 0.165,
      usage_tier: "Medium",
      efficiency_score: 7.6,
      efficiency_tier: "Below Average",
      ortg_on: 99.4,
      ortg_off: 109.5,
      ortg_diff: -10.1,
      drtg_on: 96.8,
      drtg_off: 105.3,
      drtg_diff: -8.5,
      net_rtg_on: 2.6,
      net_rtg_off: 4.2,
      net_rtg_diff: -1.6,
      offensive_impact: -10.1,
      defensive_impact: 8.5,
      ast_pct: 0.076,
      reb_pct: 0.067,
      pie: 6.306,
      availability: 0.839
    },
    {
      id: 1642801,
      name: "Aaliyah Nye",
      position: "G-F",
      archetype: "Role Player",
      years_exp: 1,
      exp_category: "Rookie/Sophomore",
      college: "Alabama",
      draft_year: 2025,
      draft_pick: 13,
      draft_round: 2,
      height: "6'0\"",
      games: 50,
      wins: 35,
      win_pct: 0.7,
      mpg: 13.78,
      star_rating: 10.5,
      star_tier: "Role Player",
      two_way_rating: -3.1,
      two_way_tier: "Below Average",
      ts_pct: 0.42,
      efg_pct: 0.413,
      usg_pct: 0.131,
      usage_tier: "Low",
      efficiency_score: 5.5,
      efficiency_tier: "Below Average",
      ortg_on: 102.6,
      ortg_off: 109.9,
      ortg_diff: -7.3,
      drtg_on: 105.4,
      drtg_off: 102.0,
      drtg_diff: 3.4,
      net_rtg_on: -2.8,
      net_rtg_off: 7.9,
      net_rtg_diff: -10.7,
      offensive_impact: -7.3,
      defensive_impact: -3.4,
      ast_pct: 0.066,
      reb_pct: 0.05,
      pie: 1.847,
      availability: 0.893
    }
  ];

  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);

  // Calculate percentiles for each metric
  const calculatePercentile = (value, metric) => {
    const values = players.map(p => p[metric]).sort((a, b) => a - b);
    const rank = values.filter(v => v <= value).length;
    return Math.round((rank / values.length) * 100);
  };

  // Get tier color
  const getTierColor = (tier) => {
    const colors = {
      'Star': 'bg-yellow-500',
      'Elite': 'bg-green-500',
      'Key Player': 'bg-blue-500',
      'Good': 'bg-blue-400',
      'Contributor': 'bg-gray-500',
      'Average': 'bg-gray-400',
      'Medium': 'bg-gray-400',
      'High': 'bg-orange-500',
      'Low': 'bg-gray-300',
      'Role Player': 'bg-gray-400',
      'Below Average': 'bg-red-400',
      'Neutral': 'bg-gray-400',
      'Positive': 'bg-green-400',
      'Negative': 'bg-red-400',
      'Above Average': 'bg-blue-400'
    };
    return colors[tier] || 'bg-gray-400';
  };

  // Metric bar component
  const MetricBar = ({ label, value, maxValue, percentile, unit = '', color = '#C8102E' }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            {typeof value === 'number' ? value.toFixed(1) : value}{unit}
          </span>
          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            {percentile}th
          </span>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${Math.min((value / maxValue) * 100, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );

  // Impact bar (diverging from center)
  const ImpactBar = ({ label, value, description }) => {
    const isPositive = value >= 0;
    const absValue = Math.abs(value);
    const maxValue = 30;
    const width = Math.min((absValue / maxValue) * 50, 50);
    
    return (
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{value.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center h-4">
          <div className="w-1/2 h-full bg-gray-100 rounded-l flex justify-end">
            {!isPositive && (
              <div 
                className="h-full bg-red-500 rounded-l transition-all duration-500"
                style={{ width: `${width}%` }}
              />
            )}
          </div>
          <div className="w-0.5 h-full bg-gray-400" />
          <div className="w-1/2 h-full bg-gray-100 rounded-r">
            {isPositive && (
              <div 
                className="h-full bg-green-500 rounded-r transition-all duration-500"
                style={{ width: `${width}%` }}
              />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-4 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">🏀 Las Vegas Aces Player Profiles</h1>
          <p className="text-red-200">2025 Season - Top 8 Rotation | DESIGN TARGET FOR TABLEAU</p>
        </div>
      </div>

      {/* Player Selector */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="bg-white rounded-xl shadow p-3">
          <label className="text-sm font-medium text-gray-600 mb-2 block">Select Player:</label>
          <div className="flex flex-wrap gap-2">
            {players.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPlayer.id === player.id
                    ? 'bg-red-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Player Card */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Player Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center text-3xl font-bold">
                  {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedPlayer.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTierColor(selectedPlayer.archetype)} text-white`}>
                      {selectedPlayer.archetype}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-300">{selectedPlayer.position}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-300">{selectedPlayer.height}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {selectedPlayer.college} • {selectedPlayer.draft_year} Draft (#{selectedPlayer.draft_pick} R{selectedPlayer.draft_round})
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedPlayer.years_exp} Years • {selectedPlayer.exp_category}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400">{selectedPlayer.star_rating.toFixed(0)}</div>
                <div className="text-sm text-gray-400">Star Rating</div>
                <span className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-bold ${getTierColor(selectedPlayer.star_tier)} text-white`}>
                  {selectedPlayer.star_tier}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="bg-gray-50 px-6 py-3 grid grid-cols-5 gap-4 border-b">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{selectedPlayer.mpg.toFixed(1)}</div>
              <div className="text-xs text-gray-500">MPG</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{(selectedPlayer.ts_pct * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">TS%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{(selectedPlayer.usg_pct * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">USG%</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${selectedPlayer.net_rtg_diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {selectedPlayer.net_rtg_diff >= 0 ? '+' : ''}{selectedPlayer.net_rtg_diff.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Net Rtg Diff</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{selectedPlayer.games}</div>
              <div className="text-xs text-gray-500">Games</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            
            {/* Left Column: Key Metrics */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" />
                Key Performance Metrics
              </h3>
              
              <MetricBar 
                label="Star Rating" 
                value={selectedPlayer.star_rating} 
                maxValue={100}
                percentile={calculatePercentile(selectedPlayer.star_rating, 'star_rating')}
                color="#C8102E"
              />
              <MetricBar 
                label="True Shooting %" 
                value={selectedPlayer.ts_pct * 100} 
                maxValue={70}
                percentile={calculatePercentile(selectedPlayer.ts_pct, 'ts_pct')}
                unit="%"
                color="#FDB927"
              />
              <MetricBar 
                label="Usage Rate" 
                value={selectedPlayer.usg_pct * 100} 
                maxValue={35}
                percentile={calculatePercentile(selectedPlayer.usg_pct, 'usg_pct')}
                unit="%"
                color="#13294B"
              />
              <MetricBar 
                label="Efficiency Score" 
                value={selectedPlayer.efficiency_score} 
                maxValue={20}
                percentile={calculatePercentile(selectedPlayer.efficiency_score, 'efficiency_score')}
                color="#228B22"
              />
              <MetricBar 
                label="Two-Way Rating" 
                value={selectedPlayer.two_way_rating} 
                maxValue={15}
                percentile={calculatePercentile(selectedPlayer.two_way_rating, 'two_way_rating')}
                color="#6B21A8"
              />
              <MetricBar 
                label="PIE" 
                value={selectedPlayer.pie} 
                maxValue={25}
                percentile={calculatePercentile(selectedPlayer.pie, 'pie')}
                color="#0EA5E9"
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(selectedPlayer.efficiency_tier)} text-white`}>
                  {selectedPlayer.efficiency_tier} Efficiency
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(selectedPlayer.usage_tier)} text-white`}>
                  {selectedPlayer.usage_tier} Usage
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(selectedPlayer.two_way_tier)} text-white`}>
                  {selectedPlayer.two_way_tier} Two-Way
                </span>
              </div>
            </div>

            {/* Right Column: On/Off Impact */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                On/Off Court Impact
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <ImpactBar 
                  label="Net Rating Differential"
                  value={selectedPlayer.net_rtg_diff}
                  description={`Team is ${Math.abs(selectedPlayer.net_rtg_diff).toFixed(1)} pts/${selectedPlayer.net_rtg_diff >= 0 ? 'better' : 'worse'} per 100 poss with ${selectedPlayer.name.split(' ')[0]} on court`}
                />
                <ImpactBar 
                  label="Offensive Impact"
                  value={selectedPlayer.offensive_impact}
                  description="Team ORtg change when on court"
                />
                <ImpactBar 
                  label="Defensive Impact"
                  value={selectedPlayer.defensive_impact}
                  description="Team DRtg improvement when on court (+ = better D)"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Detailed On/Off Splits</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="text-left py-1">Metric</th>
                      <th className="text-center py-1">ON</th>
                      <th className="text-center py-1">OFF</th>
                      <th className="text-right py-1">Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 text-gray-700">ORtg</td>
                      <td className="py-2 text-center font-medium">{selectedPlayer.ortg_on.toFixed(1)}</td>
                      <td className="py-2 text-center text-gray-500">{selectedPlayer.ortg_off.toFixed(1)}</td>
                      <td className={`py-2 text-right font-bold ${selectedPlayer.ortg_diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedPlayer.ortg_diff >= 0 ? '+' : ''}{selectedPlayer.ortg_diff.toFixed(1)}
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 text-gray-700">DRtg</td>
                      <td className="py-2 text-center font-medium">{selectedPlayer.drtg_on.toFixed(1)}</td>
                      <td className="py-2 text-center text-gray-500">{selectedPlayer.drtg_off.toFixed(1)}</td>
                      <td className={`py-2 text-right font-bold ${selectedPlayer.drtg_diff <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedPlayer.drtg_diff >= 0 ? '+' : ''}{selectedPlayer.drtg_diff.toFixed(1)}
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-100">
                      <td className="py-2 text-gray-800 font-medium">NetRtg</td>
                      <td className="py-2 text-center font-bold">{selectedPlayer.net_rtg_on.toFixed(1)}</td>
                      <td className="py-2 text-center text-gray-600">{selectedPlayer.net_rtg_off.toFixed(1)}</td>
                      <td className={`py-2 text-right font-bold ${selectedPlayer.net_rtg_diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedPlayer.net_rtg_diff >= 0 ? '+' : ''}{selectedPlayer.net_rtg_diff.toFixed(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer - Key Insight */}
          <div className="bg-yellow-50 border-t border-yellow-100 p-4">
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-800">Key Insight</h4>
                <p className="text-sm text-yellow-900">
                  {selectedPlayer.net_rtg_diff >= 15 
                    ? `${selectedPlayer.name} is a generational talent - the team is ${selectedPlayer.net_rtg_diff.toFixed(1)} points better per 100 possessions when they're on the court. This is elite impact.`
                    : selectedPlayer.net_rtg_diff >= 5
                    ? `${selectedPlayer.name} provides strong positive impact (+${selectedPlayer.net_rtg_diff.toFixed(1)} NetRtg diff) and is a key piece of the rotation.`
                    : selectedPlayer.net_rtg_diff >= 0
                    ? `${selectedPlayer.name} contributes positively in their role with a +${selectedPlayer.net_rtg_diff.toFixed(1)} NetRtg differential.`
                    : `${selectedPlayer.name} is a developing player (${selectedPlayer.net_rtg_diff.toFixed(1)} NetRtg diff) who may benefit from targeted development or specific lineup combinations.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Players Comparison */}
      <div className="max-w-5xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white p-4">
            <h3 className="text-lg font-bold">📊 Full Roster Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Player</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">Pos</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">Star</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">TS%</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">USG%</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">NetRtg Diff</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600">MPG</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Archetype</th>
                </tr>
              </thead>
              <tbody>
                {players.sort((a, b) => b.star_rating - a.star_rating).map((player, idx) => (
                  <tr 
                    key={player.id} 
                    className={`border-t cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedPlayer.id === player.id ? 'bg-red-50 border-l-4 border-l-red-600' : ''
                    }`}
                    onClick={() => setSelectedPlayer(player)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">#{idx + 1}</span>
                        {player.name}
                        {selectedPlayer.id === player.id && <span className="text-red-600">★</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center text-gray-600">{player.position}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`font-bold ${player.star_rating >= 75 ? 'text-yellow-600' : player.star_rating >= 50 ? 'text-blue-600' : 'text-gray-600'}`}>
                        {player.star_rating.toFixed(0)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-gray-700">{(player.ts_pct * 100).toFixed(1)}%</td>
                    <td className="px-3 py-3 text-center text-gray-700">{(player.usg_pct * 100).toFixed(1)}%</td>
                    <td className={`px-3 py-3 text-center font-bold ${player.net_rtg_diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {player.net_rtg_diff >= 0 ? '+' : ''}{player.net_rtg_diff.toFixed(1)}
                    </td>
                    <td className="px-3 py-3 text-center text-gray-700">{player.mpg.toFixed(1)}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTierColor(player.archetype)} text-white`}>
                        {player.archetype}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tableau Build Guide */}
      <div className="max-w-5xl mx-auto mt-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-800 mb-2">🎨 Tableau Build Guide - 4 Charts to Create</h3>
          <div className="text-sm text-blue-900 grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border border-blue-100">
              <strong>1. Horizontal Bar Chart</strong>
              <p className="text-xs mt-1">Key metrics (Star Rating, TS%, USG%, etc.) with percentile labels</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <strong>2. Diverging Bar Chart</strong>
              <p className="text-xs mt-1">On/Off impact centered at 0 (positive right, negative left)</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <strong>3. KPI Cards Row</strong>
              <p className="text-xs mt-1">Big numbers: MPG, TS%, USG%, NetRtg Diff, Games</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <strong>4. Comparison Table</strong>
              <p className="text-xs mt-1">All 8 players sorted by Star Rating with highlight row</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3">
            <strong>Colors:</strong> Aces Red #C8102E | Gold #FDB927 | Navy #13294B | Green #228B22 | Purple #6B21A8
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcesPlayerProfiles;
