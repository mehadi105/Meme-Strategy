import { useState } from 'react';
import { Coins, Users, Megaphone, Building, Vault, TrendingUp, Zap } from 'lucide-react';

const Tokenomics = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const tokenomicsData = [
    {
      title: 'PRESALE',
      percentage: 35,
      color: 'from-red-500 to-red-600',
      icon: Coins,
      description: '3.5B TOKENS FOR EARLY SUPPORTERS'
    },
    {
      title: 'STAKING',
      percentage: 20,
      color: 'from-blue-500 to-blue-600',
      icon: Vault,
      description: 'REWARDS FOR LONG-TERM HOLDERS'
    },
    {
      title: 'MARKETING',
      percentage: 15,
      color: 'from-purple-500 to-purple-600',
      icon: Megaphone,
      description: 'COMMUNITY GROWTH AND PARTNERSHIPS'
    },
    {
      title: 'TEAM',
      percentage: 15,
      color: 'from-green-500 to-green-600',
      icon: Users,
      description: 'TEAM ALLOCATION (VESTED)'
    },
    {
      title: 'TREASURY',
      percentage: 15,
      color: 'from-cyan-500 to-cyan-600',
      icon: Building,
      description: 'DEVELOPMENT AND OPERATIONS (VESTED)'
    }
  ];

  return (
    <section id="presale" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            <span className="text-orange-400 text-pixel-glow">$MSTR</span> <span className="text-cyan-400 text-pixel-glow">TOKENOMICS</span>
          </h2>
          <p className="font-pixel text-sm sm:text-xl text-cyan-300 mb-6 sm:mb-8 px-4">
            HOW WE DISTRIBUTE 10 BILLION $MSTR TOKENS
          </p>
        </div>

        {/* Dynamic GIF Header Section */}
        <div className="mb-12 sm:mb-16">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left Side - Blue Cross GIF */}
              <div className="text-center">
                <div className="mb-4 sm:mb-6">
                  <img 
                    src="/road-3.gif" 
                    alt="Tokenomics Distribution Matrix"
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.6))'
                    }}
                  />
                </div>
                <h3 className="heading-pixel text-lg sm:text-2xl text-white mb-3 sm:mb-4 text-pixel-glow px-4">
                  BALANCED <span className="text-cyan-400">DISTRIBUTION</span>
                </h3>
                <p className="font-pixel text-cyan-300 text-xs leading-relaxed px-4">
                  EVERY TOKEN HAS A PURPOSE. OUR CROSS-MATRIX ALLOCATION ENSURES FAIR DISTRIBUTION ACROSS ALL STAKEHOLDERS.
                </p>
              </div>

              {/* Right Side - Green Arrow GIF */}
              <div className="text-center">
                <div className="mb-4 sm:mb-6">
                  <img 
                    src="/road-5.gif" 
                    alt="Growth Trajectory"
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))'
                    }}
                  />
                </div>
                <h3 className="heading-pixel text-lg sm:text-2xl text-white mb-3 sm:mb-4 text-pixel-glow px-4">
                  UPWARD <span className="text-green-400">MOMENTUM</span>
                </h3>
                <p className="font-pixel text-cyan-300 text-xs leading-relaxed px-4">
                  DESIGNED FOR GROWTH. OUR TOKENOMICS CREATE SUSTAINABLE VALUE APPRECIATION FOR ALL HOLDERS.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Side - Tokenomics Cards */}
          <div className="grid gap-3 sm:gap-4">
            {tokenomicsData.map((item, index) => (
              <div
                key={index}
                className="relative card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    {item.icon ? (
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border-2 border-slate-700`}>
                        <item.icon className="text-white" size={16} />
                      </div>
                    ) : null}
                    <div>
                      <h3 className="heading-pixel text-white text-sm sm:text-lg text-pixel-glow">{item.title}</h3>
                      <p className="font-pixel text-blue-300 text-xs">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="heading-pixel text-lg sm:text-2xl text-white text-pixel-glow">{item.percentage}%</div>
                    <div className="font-pixel text-cyan-300 text-xs">{(item.percentage * 100)}M TOKENS</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3 sm:mt-4 w-full bg-slate-700 rounded-full h-2 sm:h-3 border-2 border-slate-600">
                  <div 
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage * 2.5}%` }}
                  ></div>
                </div>

                {/* Tooltip */}
                {activeTooltip === index && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 card-pixel bg-slate-900 text-white p-2 sm:p-3 rounded-lg border-cyan-500 text-sm whitespace-nowrap z-10">
                    <span className="font-pixel text-xs">{item.description}</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Clean Visual Chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-6 sm:mb-8">
              {/* Character pointing at pie chart */}
              <img src="/character-1.svg" alt="Character Pointing" className="absolute -right-8 lg:-right-40 top-1/2 -translate-y-1/2 h-52 lg:h-80 w-auto z-20 scale-x-[-1]" style={{transform: 'translateY(-50%) scaleX(-1)'}} />
              {/* Pie Chart - Clean without background GIF */}
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                {tokenomicsData.map((item, index) => {
                  const startAngle = tokenomicsData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0) * 3.6;
                  const endAngle = startAngle + item.percentage * 3.6;
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                  
                  const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                  const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                  const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                  const endY = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                  
                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={`url(#gradient-${index})`}
                      className="hover:opacity-80 transition-opacity duration-300"
                      stroke="#334155"
                      strokeWidth="3"
                    />
                  );
                })}
                
                {/* Gradients */}
                <defs>
                  {tokenomicsData.map((item, index) => (
                    <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={item.color.includes('red') ? '#ef4444' : 
                                                  item.color.includes('blue') ? '#3b82f6' :
                                                  item.color.includes('purple') ? '#8b5cf6' :
                                                  item.color.includes('green') ? '#10b981' : '#06b6d4'} />
                      <stop offset="100%" stopColor={item.color.includes('red') ? '#dc2626' : 
                                                    item.color.includes('blue') ? '#2563eb' :
                                                    item.color.includes('purple') ? '#7c3aed' :
                                                    item.color.includes('green') ? '#059669' : '#0891b2'} />
                    </linearGradient>
                  ))}
                </defs>
              </svg>
              
              {/* Center Label - Clean without GIF */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="heading-pixel text-2xl sm:text-3xl text-white text-pixel-glow">10B</div>
                  <div className="font-pixel text-gray-400 text-xs">TOTAL SUPPLY</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              {tokenomicsData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded bg-gradient-to-br ${item.color} border border-slate-700`}></div>
                  <span className="font-pixel text-gray-300 text-xs">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Stats with GIF Integration */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { 
              label: 'PRESALE ALLOCATION', 
              value: '3.5B', 
              subtext: '$MSTR TOKENS (35%)',
              gif: '/road-3.gif',
              color: 'border-red-500'
            },
            { 
              label: 'STARTING PRICE', 
              value: '$0.0005', 
              subtext: 'TIER 1 WITH 10% BONUS',
              gif: '/road-5.gif',
              color: 'border-green-500'
            },
            { 
              label: 'VESTING SCHEDULE', 
              value: 'NONE', 
              subtext: 'FOR PRESALE BUYERS',
              gif: '/road-3.gif',
              color: 'border-cyan-500'
            }
          ].map((stat, index) => (
            <div key={index} className={`card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 ${stat.color} text-center hover:border-opacity-100 transition-all duration-300 hover:scale-105`}>
              <div className="mb-3 sm:mb-4">
                <img 
                  src={stat.gif} 
                  alt={`${stat.label} Animation`}
                  className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.5))'
                  }}
                />
              </div>
              <div className="font-pixel text-gray-400 text-xs mb-2">{stat.label}</div>
              <div className="heading-pixel text-lg sm:text-2xl text-white mb-1 text-pixel-glow">{stat.value}</div>
              <div className="font-pixel text-gray-400 text-xs">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Features Section */}
        <div className="mt-12 sm:mt-16">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-orange-500">
            <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-6 sm:mb-8 text-center text-pixel-shadow px-4">
              WHY OUR <span className="text-orange-400 text-pixel-glow">TOKENOMICS</span> WORK
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                {[
                  { gif: '/road-5.gif', title: 'DEFLATIONARY MECHANICS', description: 'REGULAR TOKEN BURNS FROM TREASURY PROFITS REDUCE SUPPLY OVER TIME' },
                  { icon: TrendingUp, title: 'STAKING REWARDS', description: '20% OF SUPPLY DEDICATED TO REWARDING LONG-TERM HOLDERS' },
                  { icon: Zap, title: 'UTILITY DRIVEN', description: 'GOVERNANCE VOTING, TREASURY DECISIONS, AND EXCLUSIVE PERKS' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                    {item.gif ? (
                      <img 
                        src={item.gif} 
                        alt="Growth Mechanism"
                        className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
                        style={{
                          imageRendering: 'pixelated',
                          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))'
                        }}
                      />
                    ) : item.icon ? (
                      <item.icon className={`flex-shrink-0 ${item.title.includes('STAKING') ? 'text-green-400' : 'text-yellow-400'}`} size={20} />
                    ) : null}
                    <div>
                      <h4 className="heading-pixel text-white text-xs sm:text-sm mb-1">{item.title}</h4>
                      <p className="font-pixel text-gray-300 text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="card-pixel bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-cyan-500">
                <div className="text-center mb-3 sm:mb-4">
                  <img 
                    src="/road-3.gif" 
                    alt="Balanced Distribution"
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.6))'
                    }}
                  />
                  <h4 className="heading-pixel text-white mb-3 sm:mb-4 text-xs sm:text-sm">BALANCED ECOSYSTEM</h4>
                </div>
                <div className="space-y-2 sm:space-y-3 text-sm">
                  {[
                    { label: 'COMMUNITY OWNED', percentage: '55%', color: 'text-green-400' },
                    { label: 'TEAM & TREASURY', percentage: '30%', color: 'text-cyan-400' },
                    { label: 'MARKETING & GROWTH', percentage: '15%', color: 'text-purple-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-pixel text-gray-400 text-xs">{item.label}</span>
                      <span className={`font-pixel text-xs ${item.color}`}>{item.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;