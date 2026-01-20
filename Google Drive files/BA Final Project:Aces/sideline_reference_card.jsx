import React from 'react';

const SidelineReferenceCard = () => {
  return (
    <div className="bg-white p-4 max-w-4xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">LAS VEGAS ACES</h1>
          <p className="text-red-200 text-xs">Game Adjustment Quick Reference</p>
        </div>
        <div className="text-right text-xs">
          <div className="font-bold">2025 SEASON</div>
          <div className="text-red-200">Sideline Card</div>
        </div>
      </div>

      <div className="border-2 border-red-700 border-t-0 rounded-b-lg p-3 space-y-3">
        
        {/* LINEUPS SECTION */}
        <div>
          <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-2">LINEUP CONFIGURATIONS</div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-green-50 border border-green-400 rounded p-2">
              <div className="font-bold text-green-700 text-xs">CHAMPIONSHIP CLOSING</div>
              <div className="text-green-600 mt-1 leading-tight">Wilson, Young, Gray, Bell, Smith</div>
              <div className="text-green-500 text-[10px] mt-1 italic">Close games, final 6 min</div>
            </div>
            <div className="bg-blue-50 border border-blue-400 rounded p-2">
              <div className="font-bold text-blue-700 text-xs">DEFENSIVE LOCKDOWN</div>
              <div className="text-blue-600 mt-1 leading-tight">Wilson, Young, Bell, Smith, Loyd</div>
              <div className="text-blue-500 text-[10px] mt-1 italic">Protect lead, vs shooters</div>
            </div>
            <div className="bg-orange-50 border border-orange-400 rounded p-2">
              <div className="font-bold text-orange-700 text-xs">OFFENSIVE FIREPOWER</div>
              <div className="text-orange-600 mt-1 leading-tight">Wilson, Young, Gray, Loyd, Smith</div>
              <div className="text-orange-500 text-[10px] mt-1 italic">Trailing, need scoring</div>
            </div>
            <div className="bg-purple-50 border border-purple-400 rounded p-2">
              <div className="font-bold text-purple-700 text-xs">TWIN TOWERS</div>
              <div className="text-purple-600 mt-1 leading-tight">Wilson + Smith together</div>
              <div className="text-purple-500 text-[10px] mt-1 italic">vs Size (MIN, NYL)</div>
            </div>
          </div>
        </div>

        {/* SCORE DIFFERENTIAL */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-100 border-l-4 border-green-600 p-2 rounded-r">
            <div className="font-bold text-green-700 text-xs">UP 10-20+</div>
            <ul className="text-[10px] text-green-600 mt-1 space-y-0.5">
              <li>• Defensive Lockdown lineup</li>
              <li>• Slow pace (18+ sec)</li>
              <li>• Force tough twos</li>
              <li>• Protect glass</li>
            </ul>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-600 p-2 rounded-r">
            <div className="font-bold text-yellow-700 text-xs">WITHIN 8 (CLUTCH)</div>
            <ul className="text-[10px] text-yellow-600 mt-1 space-y-0.5">
              <li>• Championship Closing</li>
              <li>• Core 3 = 80%+ touches</li>
              <li>• High P&R Gray/Wilson</li>
              <li>• Attack paint for fouls</li>
            </ul>
          </div>
          <div className="bg-red-100 border-l-4 border-red-600 p-2 rounded-r">
            <div className="font-bold text-red-700 text-xs">DOWN 5-10+</div>
            <ul className="text-[10px] text-red-600 mt-1 space-y-0.5">
              <li>• Offensive Firepower</li>
              <li>• Push pace aggressively</li>
              <li>• Full-court pressure</li>
              <li>• 3PT hunting mode</li>
            </ul>
          </div>
        </div>

        {/* OPPONENT RUN + FOUL TROUBLE - Side by Side */}
        <div className="grid grid-cols-2 gap-2">
          {/* Opponent Run */}
          <div className="bg-red-50 border border-red-300 rounded p-2">
            <div className="font-bold text-red-700 text-xs mb-1">🚨 OPPONENT 8-0 RUN</div>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="bg-red-600 text-white px-1 rounded">1</span>
              <span>TIMEOUT</span>
              <span className="text-gray-400">→</span>
              <span className="bg-red-600 text-white px-1 rounded">2</span>
              <span>Insert Offense</span>
              <span className="text-gray-400">→</span>
              <span className="bg-red-600 text-white px-1 rounded">3</span>
              <span>Evaluate 2min</span>
            </div>
            <div className="text-[10px] text-red-600 mt-1">If 12-0+: Switch to defense-first</div>
          </div>

          {/* Foul Trouble Quick */}
          <div className="bg-yellow-50 border border-yellow-300 rounded p-2">
            <div className="font-bold text-yellow-700 text-xs mb-1">⚠️ FOUL TROUBLE</div>
            <div className="text-[10px] space-y-0.5">
              <div><span className="font-bold">Wilson 3F:</span> Sit → Smith extends → Return 10:00 4Q</div>
              <div><span className="font-bold">Young 3F:</span> Sit → Loyd enters → Return ~8:00</div>
              <div><span className="font-bold">Gray 4F+4TO:</span> Young at point → Return ~4:00</div>
            </div>
          </div>
        </div>

        {/* OPPONENT STYLES */}
        <div>
          <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-2">OPPONENT STYLE RESPONSE</div>
          <div className="grid grid-cols-4 gap-2 text-[10px]">
            <div className="border rounded p-1.5">
              <div className="font-bold text-blue-700">SIZE-HEAVY</div>
              <div className="text-gray-500">MIN, NYL</div>
              <div className="text-blue-600 mt-1">Twin Towers • Feed Wilson • Control boards</div>
            </div>
            <div className="border rounded p-1.5">
              <div className="font-bold text-orange-700">ELITE PERIMETER</div>
              <div className="text-gray-500">SEA, DAL</div>
              <div className="text-orange-600 mt-1">Def Lockdown • Young on best • Contest 3s</div>
            </div>
            <div className="border rounded p-1.5">
              <div className="font-bold text-green-700">SMALL BALL</div>
              <div className="text-gray-500">CON, PHX</div>
              <div className="text-green-600 mt-1">Wilson at 5 • Push pace • Gray-Wilson P&R</div>
            </div>
            <div className="border rounded p-1.5">
              <div className="font-bold text-purple-700">PHYSICAL/DEF</div>
              <div className="text-gray-500">CON, ATL</div>
              <div className="text-purple-600 mt-1">Ball security • Patience • FT hunting</div>
            </div>
          </div>
        </div>

        {/* CRITICAL RULES */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-50 rounded p-2">
            <div className="font-bold text-green-700 text-xs mb-1">✅ ALWAYS</div>
            <ul className="text-[10px] text-green-600 space-y-0.5">
              <li>• Wilson + Young together in close games</li>
              <li>• Core 3 (Wilson/Young/Gray) = 28-30 MPG together</li>
              <li>• Gray + Loyd for ball security</li>
              <li>• Trust Wilson ISO on final possession</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded p-2">
            <div className="font-bold text-red-700 text-xs mb-1">❌ NEVER</div>
            <ul className="text-[10px] text-red-600 space-y-0.5">
              <li>• Evans + Nye together (-23.0 net)</li>
              <li>• Evans or Nye in final 6 minutes</li>
              <li>• Bell creating off dribble (spot-up only)</li>
              <li>• Both Wilson + Young on bench simultaneously</li>
            </ul>
          </div>
        </div>

        {/* PLAYER QUICK STATS */}
        <div>
          <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-2">PLAYER QUICK REFERENCE</div>
          <table className="w-full text-[10px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-1 text-left">Player</th>
                <th className="p-1 text-center">Net Rtg</th>
                <th className="p-1 text-center">Elite Skill</th>
                <th className="p-1 text-center">Weakness</th>
                <th className="p-1 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-red-50">
                <td className="p-1 font-bold">A'ja Wilson</td>
                <td className="p-1 text-center text-green-600 font-bold">+29.3</td>
                <td className="p-1 text-center">Everything (7)</td>
                <td className="p-1 text-center text-gray-400">None</td>
                <td className="p-1">Generational Talent</td>
              </tr>
              <tr className="border-b">
                <td className="p-1 font-bold">Jackie Young</td>
                <td className="p-1 text-center text-green-600 font-bold">+22.5</td>
                <td className="p-1 text-center">PER, TS%, FT%</td>
                <td className="p-1 text-center text-gray-400">None</td>
                <td className="p-1">Elite Two-Way Star</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="p-1 font-bold">Chelsea Gray</td>
                <td className="p-1 text-center text-green-600">+13.2</td>
                <td className="p-1 text-center">AST% (89th)</td>
                <td className="p-1 text-center text-red-500">TOV% (16th)</td>
                <td className="p-1">Primary Ball Handler</td>
              </tr>
              <tr className="border-b">
                <td className="p-1 font-bold">Jewell Loyd</td>
                <td className="p-1 text-center text-green-600">+2.4</td>
                <td className="p-1 text-center">TOV% (93rd)</td>
                <td className="p-1 text-center text-red-500">AST% (18th)</td>
                <td className="p-1">Ball Security Specialist</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="p-1 font-bold">NaLyssa Smith</td>
                <td className="p-1 text-center text-green-600">+8.0</td>
                <td className="p-1 text-center">BLK% (75th)</td>
                <td className="p-1 text-center text-red-500">FT% (6th)</td>
                <td className="p-1">Paint Presence</td>
              </tr>
              <tr className="border-b">
                <td className="p-1">Kierstan Bell</td>
                <td className="p-1 text-center text-red-500">-1.6</td>
                <td className="p-1 text-center">3PT Rate (93rd)</td>
                <td className="p-1 text-center text-red-500">TS% (3rd)</td>
                <td className="p-1">Stretch Forward</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="p-1">Dana Evans</td>
                <td className="p-1 text-center text-red-500">-12.3</td>
                <td className="p-1 text-center">TOV% (82nd)</td>
                <td className="p-1 text-center text-red-500">TS% (19th)</td>
                <td className="p-1">Role Player</td>
              </tr>
              <tr>
                <td className="p-1">Aaliyah Nye</td>
                <td className="p-1 text-center text-red-500">-10.7</td>
                <td className="p-1 text-center">3PT Rate (98th)</td>
                <td className="p-1 text-center text-red-500">PER (5th)</td>
                <td className="p-1">3PT Specialist</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[9px] text-gray-400 pt-2 border-t">
          <span>Data: WNBA 2025 | Weighted Positional Percentiles (150 players, 10+ MPG)</span>
          <span>Las Vegas Aces Analytics | Confidential</span>
        </div>
      </div>
    </div>
  );
};

export default SidelineReferenceCard;
