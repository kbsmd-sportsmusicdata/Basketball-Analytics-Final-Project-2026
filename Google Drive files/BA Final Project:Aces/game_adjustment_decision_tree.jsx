import React, { useState } from 'react';

const GameAdjustmentDecisionTree = () => {
  const [activePath, setActivePath] = useState(null);
  const [expandedSection, setExpandedSection] = useState('pregame');

  // Color scheme
  const colors = {
    red: '#C8102E',
    gold: '#FDB927',
    darkBlue: '#13294B',
    green: '#22C55E',
    orange: '#F97316',
    gray: '#6B7280'
  };

  const DecisionNode = ({ title, subtitle, color, children, isRoot, onClick, isActive }) => (
    <div 
      className={`relative ${isRoot ? '' : 'ml-8'}`}
      onClick={onClick}
    >
      <div 
        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
          isActive ? 'ring-4 ring-yellow-400 scale-105' : 'hover:scale-102'
        }`}
        style={{ 
          backgroundColor: color + '15', 
          borderColor: color,
        }}
      >
        <div className="font-bold text-sm" style={{ color }}>{title}</div>
        {subtitle && <div className="text-xs text-gray-600 mt-1">{subtitle}</div>}
      </div>
      {children && (
        <div className="absolute left-0 top-1/2 -translate-x-4 w-4 h-px bg-gray-300" />
      )}
    </div>
  );

  const LineupBox = ({ name, players, color, description }) => (
    <div 
      className="p-3 rounded-lg border-l-4 bg-white shadow-sm"
      style={{ borderLeftColor: color }}
    >
      <div className="font-bold text-sm" style={{ color }}>{name}</div>
      <div className="text-xs text-gray-500 mt-1">{players}</div>
      {description && <div className="text-xs text-gray-600 mt-2 italic">{description}</div>}
    </div>
  );

  const Arrow = ({ direction = 'down', label }) => (
    <div className="flex flex-col items-center my-2">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-gray-400">
        {direction === 'down' ? '↓' : direction === 'right' ? '→' : '↓'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">🏀 Aces Game Adjustment Decision Tree</h1>
          <p className="text-red-200 mt-1">Strategic lineup and tactical decisions based on game situations</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto mb-4">
        <div className="flex gap-2 flex-wrap">
          {['pregame', 'ingame', 'situational', 'foulTrouble'].map(section => (
            <button
              key={section}
              onClick={() => setExpandedSection(section)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                expandedSection === section 
                  ? 'bg-red-700 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section === 'pregame' && '📋 Pre-Game'}
              {section === 'ingame' && '⚡ In-Game'}
              {section === 'situational' && '🎯 Situational'}
              {section === 'foulTrouble' && '⚠️ Foul Trouble'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* PRE-GAME DECISIONS */}
        {expandedSection === 'pregame' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span> Pre-Game: Opponent Style Assessment
            </h2>
            
            {/* Root Decision */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-center">
                SCOUT OPPONENT STYLE
                <div className="text-sm font-normal mt-1 text-red-200">What type of team are we facing?</div>
              </div>
            </div>

            {/* Four Branches */}
            <div className="grid md:grid-cols-4 gap-4">
              {/* Size-Heavy */}
              <div className="space-y-3">
                <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-blue-700">Size-Heavy</div>
                  <div className="text-xs text-blue-600">MIN, NYL</div>
                </div>
                <Arrow label="Deploy" />
                <LineupBox 
                  name="Twin Towers"
                  players="Wilson + Smith"
                  color={colors.darkBlue}
                  description="20-22 MPG together"
                />
                <div className="bg-blue-50 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-blue-700 mb-1">Strategy:</div>
                  <ul className="text-blue-600 space-y-1">
                    <li>• Feed Wilson early</li>
                    <li>• Control boards</li>
                    <li>• Limit transition</li>
                  </ul>
                </div>
              </div>

              {/* Elite Perimeter */}
              <div className="space-y-3">
                <div className="bg-orange-100 border-2 border-orange-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-orange-700">Elite Perimeter</div>
                  <div className="text-xs text-orange-600">SEA, DAL</div>
                </div>
                <Arrow label="Deploy" />
                <LineupBox 
                  name="Defensive Lockdown"
                  players="Wilson, Young, Bell, Smith, Loyd"
                  color={colors.orange}
                  description="Contest all 3s"
                />
                <div className="bg-orange-50 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-orange-700 mb-1">Strategy:</div>
                  <ul className="text-orange-600 space-y-1">
                    <li>• Young on best guard</li>
                    <li>• Switch-heavy scheme</li>
                    <li>• Force mid-range</li>
                  </ul>
                </div>
              </div>

              {/* Small Ball */}
              <div className="space-y-3">
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-green-700">Small Ball</div>
                  <div className="text-xs text-green-600">CON, PHX</div>
                </div>
                <Arrow label="Deploy" />
                <LineupBox 
                  name="Small Ball Blitz"
                  players="Wilson at 5 + 4 guards/wings"
                  color={colors.green}
                  description="22-24 MPG config"
                />
                <div className="bg-green-50 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-green-700 mb-1">Strategy:</div>
                  <ul className="text-green-600 space-y-1">
                    <li>• Push pace relentlessly</li>
                    <li>• Wilson at elbow</li>
                    <li>• Gray-Wilson P&R</li>
                  </ul>
                </div>
              </div>

              {/* Physical/Defensive */}
              <div className="space-y-3">
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-purple-700">Physical/Defensive</div>
                  <div className="text-xs text-purple-600">CON, ATL</div>
                </div>
                <Arrow label="Deploy" />
                <LineupBox 
                  name="Ball Security"
                  players="Gray + Loyd backcourt"
                  color="#9333EA"
                  description="Protect possessions"
                />
                <div className="bg-purple-50 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-purple-700 mb-1">Strategy:</div>
                  <ul className="text-purple-600 space-y-1">
                    <li>• Patience in half-court</li>
                    <li>• Free throw hunting</li>
                    <li>• Mental discipline</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IN-GAME DECISIONS */}
        {expandedSection === 'ingame' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚡</span> In-Game: Score Differential Response
            </h2>

            {/* Root */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-center">
                CHECK SCORE DIFFERENTIAL
                <div className="text-sm font-normal mt-1 text-red-200">4th Quarter Decision Point</div>
              </div>
            </div>

            {/* Score Branches */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Winning Big */}
              <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                <div className="text-center mb-4">
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                    UP 10-20+
                  </div>
                </div>
                <Arrow label="Protect Lead" />
                <LineupBox 
                  name="Defensive Lockdown"
                  players="Wilson, Young, Bell, Smith, Loyd"
                  color={colors.green}
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Slow pace (18+ sec possessions)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Force tough twos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Protect defensive glass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Conservative offense</span>
                  </div>
                </div>
              </div>

              {/* Close Game */}
              <div className="border-2 border-yellow-500 rounded-xl p-4 bg-yellow-50">
                <div className="text-center mb-4">
                  <div className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">
                    WITHIN 8
                  </div>
                </div>
                <Arrow label="Championship Mode" />
                <LineupBox 
                  name="Championship Closing"
                  players="Wilson, Young, Gray, Bell, Smith"
                  color={colors.gold}
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">★</span>
                    <span>Core 3 handle 80%+ touches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">★</span>
                    <span>High pick-and-roll</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">★</span>
                    <span>Attack paint for fouls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">★</span>
                    <span>Trust elite players</span>
                  </div>
                </div>
              </div>

              {/* Trailing */}
              <div className="border-2 border-red-500 rounded-xl p-4 bg-red-50">
                <div className="text-center mb-4">
                  <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                    DOWN 5-10+
                  </div>
                </div>
                <Arrow label="Comeback Mode" />
                <LineupBox 
                  name="Offensive Firepower"
                  players="Wilson, Young, Gray, Loyd, Smith"
                  color={colors.red}
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">⚡</span>
                    <span>Push pace aggressively</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">⚡</span>
                    <span>Full-court pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">⚡</span>
                    <span>Create extra possessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">⚡</span>
                    <span>Three-point hunting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blowout scenarios */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="border border-green-300 rounded-lg p-4 bg-green-50/50">
                <div className="font-bold text-green-700 mb-2">🎉 UP 20+ (Blowout Win)</div>
                <div className="text-sm text-green-600">
                  Rest starters • Developmental minutes for Bell, Evans, Nye • Preserve energy for next game
                </div>
              </div>
              <div className="border border-red-300 rounded-lg p-4 bg-red-50/50">
                <div className="font-bold text-red-700 mb-2">😤 DOWN 18+ (Blowout Loss)</div>
                <div className="text-sm text-red-600">
                  Concede with 8:00 left • Rest core 3 • Young player development focus • Mental reset
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SITUATIONAL DECISIONS */}
        {expandedSection === 'situational' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Situational: Momentum & Special Cases
            </h2>

            {/* Opponent Run Response */}
            <div className="mb-8">
              <div className="bg-red-100 border-l-4 border-red-600 rounded-r-xl p-4 mb-4">
                <h3 className="font-bold text-red-700 text-lg">🚨 OPPONENT ON A RUN (8-0 or larger)</h3>
              </div>
              
              <div className="relative">
                {/* Flow diagram */}
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                  {/* Step 1 */}
                  <div className="flex-1 bg-red-50 border-2 border-red-400 rounded-xl p-4">
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">STEP 1</div>
                    <div className="font-bold text-red-700">CALL TIMEOUT</div>
                    <div className="text-sm text-red-600 mt-1">Immediately stop momentum</div>
                  </div>
                  
                  <div className="hidden md:flex items-center text-2xl text-gray-400">→</div>
                  
                  {/* Step 2 */}
                  <div className="flex-1 bg-orange-50 border-2 border-orange-400 rounded-xl p-4">
                    <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">STEP 2</div>
                    <div className="font-bold text-orange-700">INSERT OFFENSE</div>
                    <div className="text-sm text-orange-600 mt-1">Offensive Firepower lineup</div>
                    <div className="text-xs text-orange-500 mt-2">Wilson, Young, Gray, Loyd, Smith</div>
                  </div>
                  
                  <div className="hidden md:flex items-center text-2xl text-gray-400">→</div>
                  
                  {/* Step 3 */}
                  <div className="flex-1 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
                    <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">STEP 3</div>
                    <div className="font-bold text-yellow-700">EVALUATE (2 MIN)</div>
                    <div className="text-sm text-yellow-600 mt-1">Did we stop the bleeding?</div>
                  </div>
                  
                  <div className="hidden md:flex items-center text-2xl text-gray-400">→</div>
                  
                  {/* Step 4 */}
                  <div className="flex-1 bg-green-50 border-2 border-green-400 rounded-xl p-4">
                    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">STEP 4</div>
                    <div className="font-bold text-green-700">ADJUST IF NEEDED</div>
                    <div className="text-sm text-green-600 mt-1">If 12-0+: Switch to defense-first</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clutch Time */}
            <div className="mb-8">
              <div className="bg-yellow-100 border-l-4 border-yellow-600 rounded-r-xl p-4 mb-4">
                <h3 className="font-bold text-yellow-700 text-lg">⏱️ CLUTCH TIME (Final 2 Minutes, Within 5)</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-700 mb-3">✅ DO</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">●</span>
                      <span>Wilson/Young/Gray handle ALL offensive possessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">●</span>
                      <span>High pick-and-roll with Gray/Wilson</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">●</span>
                      <span>Attack paint to draw fouls and stop clock</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">●</span>
                      <span>Trust Wilson ISO on final possession if needed</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-700 mb-3">❌ DON'T</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">●</span>
                      <span>Never play Evans or Nye in final 6 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">●</span>
                      <span>Never let Bell create off dribble (spot-up only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">●</span>
                      <span>Don't settle for contested 3s unless desperate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">●</span>
                      <span>Don't abandon the system; trust the process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeout Decision Tree */}
            <div>
              <div className="bg-blue-100 border-l-4 border-blue-600 rounded-r-xl p-4 mb-4">
                <h3 className="font-bold text-blue-700 text-lg">⏸️ TIMEOUT DECISION MATRIX</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="p-3 text-left text-blue-700">Situation</th>
                      <th className="p-3 text-center text-blue-700">Call Timeout?</th>
                      <th className="p-3 text-left text-blue-700">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">Opponent 8-0 run</td>
                      <td className="p-3 text-center"><span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">YES</span></td>
                      <td className="p-3 text-gray-600">Stop momentum immediately</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3">Need to set up final play</td>
                      <td className="p-3 text-center"><span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">YES</span></td>
                      <td className="p-3 text-gray-600">Execute designed play</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Star in foul trouble, need sub</td>
                      <td className="p-3 text-center"><span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">YES</span></td>
                      <td className="p-3 text-gray-600">Protect key player</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3">On our own run (8-0+)</td>
                      <td className="p-3 text-center"><span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NO</span></td>
                      <td className="p-3 text-gray-600">Don't interrupt momentum</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Up 15+ in 4th</td>
                      <td className="p-3 text-center"><span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NO</span></td>
                      <td className="p-3 text-gray-600">Save for playoffs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3">Opponent calling timeout</td>
                      <td className="p-3 text-center"><span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-bold">N/A</span></td>
                      <td className="p-3 text-gray-600">Use their timeout for our adjustments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FOUL TROUBLE */}
        {expandedSection === 'foulTrouble' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> Foul Trouble: Star Player Management
            </h2>

            {/* Decision Tree */}
            <div className="space-y-6">
              {/* Wilson */}
              <div className="border-2 border-red-400 rounded-xl overflow-hidden">
                <div className="bg-red-600 text-white p-3 flex justify-between items-center">
                  <span className="font-bold">A'JA WILSON (3+ Fouls Before 4th Quarter)</span>
                  <span className="bg-red-800 px-2 py-1 rounded text-xs">CRITICAL</span>
                </div>
                <div className="p-4 bg-red-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-red-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🪑</div>
                        <div className="font-bold text-red-700">SIT IMMEDIATELY</div>
                      </div>
                      <div className="text-xs text-red-600">Cannot risk 4th foul</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">👤</div>
                        <div className="font-bold text-orange-700">SMITH EXTENDS</div>
                      </div>
                      <div className="text-xs text-orange-600">26-28 MPG for game</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-yellow-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🏀</div>
                        <div className="font-bold text-yellow-700">ADJUST OFFENSE</div>
                      </div>
                      <div className="text-xs text-yellow-600">Gray-Young P&R primary</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🔙</div>
                        <div className="font-bold text-green-700">RETURN 10:00</div>
                      </div>
                      <div className="text-xs text-green-600">4th quarter start</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Young */}
              <div className="border-2 border-yellow-400 rounded-xl overflow-hidden">
                <div className="bg-yellow-600 text-white p-3 flex justify-between items-center">
                  <span className="font-bold">JACKIE YOUNG (3+ Fouls)</span>
                  <span className="bg-yellow-800 px-2 py-1 rounded text-xs">HIGH PRIORITY</span>
                </div>
                <div className="p-4 bg-yellow-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-yellow-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🪑</div>
                        <div className="font-bold text-yellow-700">SIT IMMEDIATELY</div>
                      </div>
                      <div className="text-xs text-yellow-600">Too valuable to risk</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">👤</div>
                        <div className="font-bold text-orange-700">LOYD ENTERS</div>
                      </div>
                      <div className="text-xs text-orange-600">Defensive continuity</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🏀</div>
                        <div className="font-bold text-blue-700">GRAY USAGE UP</div>
                      </div>
                      <div className="text-xs text-blue-600">Loyd spot-up role</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🔙</div>
                        <div className="font-bold text-green-700">RETURN ~8:00</div>
                      </div>
                      <div className="text-xs text-green-600">Final 8 minutes ideally</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gray */}
              <div className="border-2 border-blue-400 rounded-xl overflow-hidden">
                <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                  <span className="font-bold">CHELSEA GRAY (4+ Fouls AND 4+ Turnovers)</span>
                  <span className="bg-blue-800 px-2 py-1 rounded text-xs">CONDITIONAL</span>
                </div>
                <div className="p-4 bg-blue-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-blue-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">⚖️</div>
                        <div className="font-bold text-blue-700">CONDITIONAL SIT</div>
                      </div>
                      <div className="text-xs text-blue-600">If BOTH conditions met</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">👤</div>
                        <div className="font-bold text-purple-700">YOUNG AT POINT</div>
                      </div>
                      <div className="text-xs text-purple-600">85th pctile AST% capable</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🏀</div>
                        <div className="font-bold text-indigo-700">SIMPLIFY OFFENSE</div>
                      </div>
                      <div className="text-xs text-indigo-600">Fewer reads required</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-200 rounded-lg p-3 mb-2">
                        <div className="text-2xl mb-1">🔙</div>
                        <div className="font-bold text-green-700">RETURN ~4:00</div>
                      </div>
                      <div className="text-xs text-green-600">Final 4 min if close</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multiple Stars */}
              <div className="border-2 border-purple-400 rounded-xl overflow-hidden">
                <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
                  <span className="font-bold">MULTIPLE STARS IN FOUL TROUBLE (2+ with 3+ Fouls)</span>
                  <span className="bg-purple-800 px-2 py-1 rounded text-xs">EMERGENCY</span>
                </div>
                <div className="p-4 bg-purple-50">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-bold text-purple-700 mb-2">🔄 Stagger Returns</h4>
                      <p className="text-sm text-purple-600">Never sit BOTH A'ja + Jackie simultaneously</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-bold text-purple-700 mb-2">📊 Priority Order</h4>
                      <p className="text-sm text-purple-600">A'ja &gt; Jackie &gt; Chelsea (by net rating impact)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-bold text-purple-700 mb-2">🎯 Simplify Offense</h4>
                      <p className="text-sm text-purple-600">Fewer reads, more isolation, trust remaining star</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="mt-6 bg-gray-100 rounded-xl p-4">
              <h3 className="font-bold text-gray-700 mb-3">📋 Quick Reference: Foul Trouble Thresholds</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <div className="font-bold text-gray-700">1st Quarter</div>
                  <div className="text-gray-600">2 fouls = sit until 2nd Q</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-bold text-gray-700">2nd Quarter</div>
                  <div className="text-gray-600">3 fouls = sit until 3rd Q</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-bold text-gray-700">3rd Quarter</div>
                  <div className="text-gray-600">4 fouls = sit until 4th Q</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-bold text-gray-700">4th Quarter</div>
                  <div className="text-gray-600">Play through (game on line)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-6 text-center text-gray-500 text-sm">
        <p>📊 Las Vegas Aces 2025 | Game Adjustment Decision Tree</p>
        <p className="mt-1">Based on weighted positional percentile analysis and lineup compatibility matrix</p>
      </div>
    </div>
  );
};

export default GameAdjustmentDecisionTree;
