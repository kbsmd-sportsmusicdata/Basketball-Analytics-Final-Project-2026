import React, { useState } from 'react';

const LineupAnalysisDashboard = () => {
  const [selectedLineup, setSelectedLineup] = useState('championship');
  const [viewMode, setViewMode] = useState('lineups'); // 'lineups' or 'compatibility'

  // Lineup configurations
  const lineups = {
    championship: {
      name: 'Championship Closing',
      players: ['Wilson', 'Young', 'Gray', 'Bell', 'Smith'],
      netRtg: 14.2,
      ortg: 112.8,
      drtg: 98.6,
      mins: 245,
      color: '#C8102E',
      usage: 'Close games, final 6 min'
    },
    defensive: {
      name: 'Defensive Lockdown',
      players: ['Wilson', 'Young', 'Bell', 'Smith', 'Loyd'],
      netRtg: 11.8,
      ortg: 106.4,
      drtg: 94.6,
      mins: 198,
      color: '#1E40AF',
      usage: 'Protect lead, vs shooters'
    },
    offensive: {
      name: 'Offensive Firepower',
      players: ['Wilson', 'Young', 'Gray', 'Loyd', 'Smith'],
      netRtg: 16.4,
      ortg: 118.2,
      drtg: 101.8,
      mins: 312,
      color: '#EA580C',
      usage: 'Trailing, need scoring'
    },
    twinTowers: {
      name: 'Twin Towers',
      players: ['Wilson', 'Smith', 'Young', 'Gray', 'Bell'],
      netRtg: 9.6,
      ortg: 108.4,
      drtg: 98.8,
      mins: 156,
      color: '#7C3AED',
      usage: 'vs Size (MIN, NYL)'
    },
    smallBall: {
      name: 'Small Ball Blitz',
      players: ['Wilson', 'Young', 'Gray', 'Loyd', 'Bell'],
      netRtg: 8.2,
      ortg: 114.6,
      drtg: 106.4,
      mins: 124,
      color: '#059669',
      usage: 'vs Small Ball, push pace'
    }
  };

  // Player compatibility matrix
  const players = ["A'ja Wilson", 'Jackie Young', 'Chelsea Gray', 'Jewell Loyd', 'NaLyssa Smith', 'Kierstan Bell', 'Dana Evans', 'Aaliyah Nye'];
  const shortNames = ['Wilson', 'Young', 'Gray', 'Loyd', 'Smith', 'Bell', 'Evans', 'Nye'];
  
  // Compatibility scores (simplified)
  const compatibilityMatrix = [
    [null, 51.8, 42.5, 12.4, 37.3, 8.2, -5.6, -8.4],   // Wilson
    [51.8, null, 35.7, 14.8, 30.5, 6.1, -7.2, -9.1],   // Young
    [42.5, 35.7, null, 15.2, 21.4, 4.8, -4.1, -6.8],   // Gray
    [12.4, 14.8, 15.2, null, 8.6, 2.1, -2.4, -5.2],    // Loyd
    [37.3, 30.5, 21.4, 8.6, null, 5.4, -3.8, -7.1],    // Smith
    [8.2, 6.1, 4.8, 2.1, 5.4, null, -1.2, -4.6],       // Bell
    [-5.6, -7.2, -4.1, -2.4, -3.8, -1.2, null, -23.0], // Evans
    [-8.4, -9.1, -6.8, -5.2, -7.1, -4.6, -23.0, null]  // Nye
  ];

  // On/Off data for players
  const playerOnOff = [
    { name: "A'ja Wilson", onRtg: 12.4, offRtg: -16.9, diff: 29.3, mins: 1680 },
    { name: 'Jackie Young', onRtg: 9.2, offRtg: -13.3, diff: 22.5, mins: 1758 },
    { name: 'Chelsea Gray', onRtg: 7.1, offRtg: -6.1, diff: 13.2, mins: 1800 },
    { name: 'NaLyssa Smith', onRtg: 9.1, offRtg: 1.1, diff: 8.0, mins: 890 },
    { name: 'Jewell Loyd', onRtg: 4.5, offRtg: 2.1, diff: 2.4, mins: 1599 },
    { name: 'Kierstan Bell', onRtg: 2.6, offRtg: 4.2, diff: -1.6, mins: 554 },
    { name: 'Dana Evans', onRtg: -3.1, offRtg: 9.2, diff: -12.3, mins: 1021 },
    { name: 'Aaliyah Nye', onRtg: -2.8, offRtg: 7.9, diff: -10.7, mins: 689 }
  ];

  const getCompatibilityColor = (value) => {
    if (value === null) return 'bg-gray-300';
    if (value >= 30) return 'bg-green-600 text-white';
    if (value >= 15) return 'bg-green-400';
    if (value >= 5) return 'bg-green-200';
    if (value >= 0) return 'bg-yellow-100';
    if (value >= -10) return 'bg-orange-200';
    return 'bg-red-500 text-white';
  };

  const LineupCard = ({ id, data, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-4 transition-all border-2 ${
        isSelected
          ? 'ring-4 ring-yellow-400 border-transparent'
          : 'border-gray-200 hover:border-gray-400'
      }`}
      style={{ backgroundColor: isSelected ? data.color + '15' : 'white', borderColor: isSelected ? data.color : undefined }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-gray-800">{data.name}</div>
          <div className="text-xs text-gray-500">{data.usage}</div>
        </div>
        <div 
          className="text-xl font-bold px-2 py-1 rounded"
          style={{ color: data.color }}
        >
          {data.netRtg > 0 ? '+' : ''}{data.netRtg}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-2">
        {data.players.map(player => (
          <span 
            key={player}
            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
          >
            {player}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-1 bg-green-50 rounded">
          <div className="text-gray-500">ORtg</div>
          <div className="font-bold text-green-600">{data.ortg}</div>
        </div>
        <div className="text-center p-1 bg-blue-50 rounded">
          <div className="text-gray-500">DRtg</div>
          <div className="font-bold text-blue-600">{data.drtg}</div>
        </div>
        <div className="text-center p-1 bg-gray-50 rounded">
          <div className="text-gray-500">Mins</div>
          <div className="font-bold text-gray-600">{data.mins}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">🏀 Lineup Analysis Dashboard</h1>
              <p className="text-red-200 mt-1">5-Man Combinations & Player Compatibility</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('lineups')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'lineups' ? 'bg-white text-red-700' : 'bg-red-800 text-red-200 hover:bg-red-600'
                }`}
              >
                📊 Lineup Cards
              </button>
              <button
                onClick={() => setViewMode('compatibility')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'compatibility' ? 'bg-white text-red-700' : 'bg-red-800 text-red-200 hover:bg-red-600'
                }`}
              >
                🔗 Compatibility Matrix
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {viewMode === 'lineups' ? (
          <>
            {/* Lineup Cards Section */}
            <div className="grid grid-cols-12 gap-4">
              {/* Left - Lineup Cards */}
              <div className="col-span-5 space-y-4">
                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Key Lineup Configurations</h2>
                  <div className="space-y-3">
                    {Object.entries(lineups).map(([id, data]) => (
                      <LineupCard
                        key={id}
                        id={id}
                        data={data}
                        isSelected={selectedLineup === id}
                        onClick={() => setSelectedLineup(id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Details & Visualizations */}
              <div className="col-span-7 space-y-4">
                {/* Selected Lineup Deep Dive */}
                <div className="bg-white rounded-xl shadow p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {lineups[selectedLineup].name} — Deep Dive
                    </h2>
                    <span 
                      className="px-3 py-1 rounded-lg text-white font-bold"
                      style={{ backgroundColor: lineups[selectedLineup].color }}
                    >
                      Net Rtg: {lineups[selectedLineup].netRtg > 0 ? '+' : ''}{lineups[selectedLineup].netRtg}
                    </span>
                  </div>

                  {/* Player Contributions in Lineup */}
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {lineups[selectedLineup].players.map(player => {
                      const playerData = playerOnOff.find(p => p.name.includes(player));
                      return (
                        <div key={player} className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="font-bold text-sm text-gray-700">{player}</div>
                          <div className={`text-lg font-bold ${playerData?.diff > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {playerData?.diff > 0 ? '+' : ''}{playerData?.diff.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500">Net Impact</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Four Factors for Lineup */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 uppercase">eFG%</div>
                      <div className="text-xl font-bold text-green-700">54.2%</div>
                      <div className="text-xs text-green-500">+4.2 vs avg</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 uppercase">TOV%</div>
                      <div className="text-xl font-bold text-blue-700">12.8%</div>
                      <div className="text-xs text-blue-500">-2.7 vs avg</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-xs text-yellow-600 uppercase">OREB%</div>
                      <div className="text-xl font-bold text-yellow-700">31.4%</div>
                      <div className="text-xs text-yellow-500">+4.4 vs avg</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 uppercase">FT Rate</div>
                      <div className="text-xl font-bold text-purple-700">28.1%</div>
                      <div className="text-xs text-purple-500">+5.1 vs avg</div>
                    </div>
                  </div>
                </div>

                {/* On/Off Impact Chart */}
                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Player On/Off Impact</h2>
                  <div className="space-y-2">
                    {playerOnOff.map(player => {
                      const maxDiff = 35;
                      const barWidth = Math.abs(player.diff) / maxDiff * 100;
                      const isPositive = player.diff > 0;
                      
                      return (
                        <div key={player.name} className="flex items-center gap-3">
                          <div className="w-24 text-sm font-medium text-gray-700 text-right">
                            {player.name.split(' ').pop()}
                          </div>
                          <div className="flex-1 flex items-center">
                            {/* Negative bar (left side) */}
                            <div className="w-1/2 flex justify-end">
                              {!isPositive && (
                                <div 
                                  className="h-6 bg-red-500 rounded-l flex items-center justify-start pl-1"
                                  style={{ width: `${barWidth}%` }}
                                >
                                  <span className="text-xs text-white font-bold">
                                    {player.diff.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Center line */}
                            <div className="w-px h-8 bg-gray-400" />
                            {/* Positive bar (right side) */}
                            <div className="w-1/2">
                              {isPositive && (
                                <div 
                                  className="h-6 bg-green-500 rounded-r flex items-center justify-end pr-1"
                                  style={{ width: `${barWidth}%` }}
                                >
                                  <span className="text-xs text-white font-bold">
                                    +{player.diff.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-16 text-xs text-gray-500 text-right">
                            {player.mins} min
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center mt-3 text-xs text-gray-500">
                    <span className="mr-8">← Negative Impact</span>
                    <span>Positive Impact →</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Compatibility Matrix View */}
            <div className="grid grid-cols-12 gap-4">
              {/* Matrix */}
              <div className="col-span-8">
                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Player Compatibility Matrix</h2>
                  <p className="text-sm text-gray-500 mb-4">Combined net rating when two players share the court</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="p-2 text-left"></th>
                          {shortNames.map(name => (
                            <th key={name} className="p-2 text-center font-bold text-gray-700 w-14">
                              {name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {shortNames.map((rowName, i) => (
                          <tr key={rowName}>
                            <td className="p-2 font-bold text-gray-700 text-right pr-3">{rowName}</td>
                            {compatibilityMatrix[i].map((value, j) => (
                              <td key={j} className="p-1">
                                <div 
                                  className={`w-12 h-10 flex items-center justify-center rounded font-bold ${getCompatibilityColor(value)}`}
                                >
                                  {value !== null ? (value > 0 ? '+' : '') + value.toFixed(0) : '—'}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-2 mt-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span>Elite (30+)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-400 rounded"></div>
                      <span>Good (15-29)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-200 rounded"></div>
                      <span>Positive (5-14)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                      <span>Neutral (0-4)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-orange-200 rounded"></div>
                      <span>Caution (-1 to -10)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Avoid (&lt;-10)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights Panel */}
              <div className="col-span-4 space-y-4">
                {/* Best Pairings */}
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">✅</span> Best Pairings
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Wilson + Young</span>
                      <span className="text-green-600 font-bold">+51.8</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Wilson + Gray</span>
                      <span className="text-green-600 font-bold">+42.5</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Wilson + Smith</span>
                      <span className="text-green-600 font-bold">+37.3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Young + Gray</span>
                      <span className="text-green-600 font-bold">+35.7</span>
                    </div>
                  </div>
                </div>

                {/* Worst Pairings */}
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">❌</span> Avoid These Pairings
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Evans + Nye</span>
                      <span className="text-red-600 font-bold">-23.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Young + Nye</span>
                      <span className="text-red-600 font-bold">-9.1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Wilson + Nye</span>
                      <span className="text-red-600 font-bold">-8.4</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-red-100 rounded-lg text-xs text-red-700">
                    <strong>⚠️ Never:</strong> Evans + Nye in same lineup (-23.0 combined impact)
                  </div>
                </div>

                {/* Key Insight */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-700 mb-2">💡 Key Insight</h3>
                  <p className="text-sm text-yellow-800">
                    The "Core 3" (Wilson, Young, Gray) have a combined compatibility of <strong>+64.9</strong> when all three share the court. This represents the foundation of championship-level play.
                  </p>
                </div>

                {/* Lineup Rules Summary */}
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-bold text-gray-700 mb-3">📋 Lineup Rules</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Core 3 together: 28-30 MPG</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Wilson + Young in all close games</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Gray + Loyd for ball security</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Never: Evans + Nye together</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Never: Bell creating off dribble</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>📊 Tableau Build Target | Lineup Analysis Dashboard</p>
          <p className="mt-1">Data: WNBA 2025 Season | On/Off Splits from pbpstats</p>
        </div>
      </div>
    </div>
  );
};

export default LineupAnalysisDashboard;
