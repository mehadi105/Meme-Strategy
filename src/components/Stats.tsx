import { Bitcoin, Target, Trophy, BarChart3 } from 'lucide-react';

const Stats = () => {
  const stretchGoals = [
    { target: '$25M', unlock: 'Meme Treasury', status: 'active', progress: 15 },
    { target: '$30M', unlock: 'Meme Index', status: 'upcoming', progress: 0 },
    { target: '$40M', unlock: 'Ventures Incubator', status: 'upcoming', progress: 0 },
    { target: '$50M', unlock: 'Meme ETF App', status: 'upcoming', progress: 0 },
    { target: '$60M', unlock: 'Altcoin Vault', status: 'upcoming', progress: 0 }
  ];

  return (
    <section id="about" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            WHAT IS <span className="text-orange-400 text-pixel-glow">MEMESTRATEGY?</span>
          </h2>
          <p className="font-pixel text-sm sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
            THE FIRST TREASURY-BACKED MEMECOIN ECOSYSTEM ANCHORED WITH BITCOIN
          </p>
        </div>

        {/* Meme Coin Leaderboard */}
        <div className="mb-12 sm:mb-20">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="heading-pixel text-lg sm:text-2xl text-white mb-3 sm:mb-4 text-pixel-glow px-4">
                TOP MEME COINS <span className="text-cyan-400 text-pixel-glow">WE TRACK</span>
              </h3>
              <p className="font-pixel text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 px-4">
                THESE ARE THE MEMECOINS OUR TREASURY INVESTS IN — VOTED BY THE COMMUNITY
              </p>
              
              {/* Live Table Display */}
              <div className="mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl">
                <img 
                  src="/table_1.png" 
                  alt="Live Meme Coin Market Data"
                  className="w-full max-w-6xl mx-auto border-2 sm:border-4 border-cyan-500"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.4))',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
              
              <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse border border-green-600"></div>
                <span className="font-pixel text-green-400 text-xs">LIVE MARKET DATA</span>
                <BarChart3 className="text-cyan-400" size={16} />
              </div>
            </div>

            {/* Key Stats from Table */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { img: '/pepe.png', name: 'PEPE', change: '+7.98%', color: 'border-green-500', alt: 'Pepe Logo' },
                { img: '/bonk.png', name: 'BONK', change: '+11.98%', color: 'border-yellow-500', alt: 'Bonk Logo' },
                { img: '/wif.jpeg', name: 'WIF', change: '+9.98%', color: 'border-blue-500', alt: 'Wif Logo' },
                { img: '/doge.jpeg', name: 'DOGE', change: '+3.98%', color: 'border-orange-500', alt: 'Doge Logo' }
              ].map((coin, index) => (
                <div key={index} className={`card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 ${coin.color} text-center`}>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img src={coin.img} alt={coin.alt} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover mx-auto" style={{ imageRendering: 'crisp-edges' }} />
                  </div>
                  <div className="heading-pixel text-white text-xs sm:text-sm text-pixel-glow">{coin.name}</div>
                  <div className="font-pixel text-green-400 text-xs">{coin.change}</div>
                </div>
              ))}
            </div>

            {/* Treasury Strategy Explanation */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Target,
                  title: 'STRATEGIC PICKS',
                  description: 'WE DON\'T JUST BUY ANY MEME — WE TARGET HIGH-POTENTIAL COINS WITH STRONG COMMUNITIES AND PROVEN TRACK RECORDS.',
                  color: 'border-orange-500',
                  iconColor: 'text-orange-400'
                },
                {
                  icon: Trophy,
                  title: 'COMMUNITY VOTED',
                  description: 'EVERY WEEK, $MSTR HOLDERS VOTE ON WHICH NEW MEMECOINS TO ADD TO OUR TREASURY. YOUR VOICE MATTERS.',
                  color: 'border-green-500',
                  iconColor: 'text-green-400'
                },
                {
                  icon: BarChart3,
                  title: 'DATA DRIVEN',
                  description: 'REAL-TIME TRACKING OF HOLDERS, MARKET CAP, AND PERFORMANCE METRICS GUIDE OUR INVESTMENT DECISIONS.',
                  color: 'border-cyan-500',
                  iconColor: 'text-cyan-400'
                }
              ].map((item, index) => (
                <div key={index} className={`card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 ${item.color}`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <item.icon className={item.iconColor} size={20} />
                    <h4 className="heading-pixel text-white text-xs sm:text-sm">{item.title}</h4>
                  </div>
                  <p className="font-pixel text-gray-300 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-12 sm:mb-20">
          {/* Left Side - What We Do */}
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500">
            <h3 className="heading-pixel text-lg sm:text-2xl text-white mb-4 sm:mb-6 text-center text-pixel-glow">
              HOW WE USE THE FUNDS
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-orange-500">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-cyan-500 rounded-full flex items-center justify-center text-lg sm:text-2xl border-2 border-orange-600">
                    🐸
                  </div>
                  <div>
                    <div className="heading-pixel text-white text-sm sm:text-lg text-pixel-glow">70% MEMECOINS</div>
                    <div className="font-pixel text-gray-400 text-xs">PEPE, DOGE, MOG, ETC.</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4 border-2 border-slate-600">
                  <div className="bg-gradient-to-r from-orange-400 to-cyan-500 h-full rounded-full w-[70%]"></div>
                </div>
              </div>

              <div className="card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-yellow-500">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-yellow-600">
                    <Bitcoin className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="heading-pixel text-white text-sm sm:text-lg text-pixel-glow">30% BITCOIN</div>
                    <div className="font-pixel text-gray-400 text-xs">ULTIMATE STORE OF VALUE</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4 border-2 border-slate-600">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full w-[30%]"></div>
                </div>
              </div>

              <div className="text-center mt-4 sm:mt-6">
                <div className="font-pixel text-gray-300 text-sm sm:text-lg mb-2 px-4">
                  <span className="text-cyan-400 text-pixel-glow">GOVERNED BY THE COMMUNITY</span>, POWERED BY <span className="text-orange-400 text-pixel-glow">MEMEBOT AI</span>
                </div>
                <p className="font-retro text-gray-400 text-xs sm:text-sm px-4">
                  THINK OF US AS THE MICROSTRATEGY OF MEMES — A TREASURY FOR CRYPTO CULTURE.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Stretch Goals */}
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500">
            <h3 className="heading-pixel text-lg sm:text-2xl text-white mb-4 sm:mb-6 text-center text-pixel-glow">
              STRETCH GOAL TRACKER
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {stretchGoals.map((goal, index) => (
                <div key={index} className={`card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${goal.status === 'active' ? 'border-green-500' : 'border-gray-700'} transition-all duration-300`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${goal.status === 'active' ? 'bg-green-400 border-green-600 animate-pulse' : 'bg-gray-500 border-gray-600'}`}></div>
                      <span className="heading-pixel text-white text-xs sm:text-sm">{goal.target}</span>
                    </div>
                    <span className={`font-pixel text-xs ${goal.status === 'active' ? 'text-green-400' : 'text-gray-400'}`}>
                      {goal.status === 'active' ? 'IN PROGRESS' : 'LOCKED'}
                    </span>
                  </div>
                  <div className="font-pixel text-gray-300 text-xs mb-2">{goal.unlock}</div>
                  <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 border-2 border-slate-600">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${goal.status === 'active' ? 'bg-gradient-to-r from-green-400 to-cyan-400' : 'bg-gray-600'}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 sm:mt-6 text-center">
              <div className="heading-pixel text-2xl sm:text-3xl text-white mb-2 text-pixel-glow">$3.75M</div>
              <div className="font-pixel text-gray-400 text-xs sm:text-sm">RAISED SO FAR</div>
            </div>
          </div>
        </div>

        {/* Presale Information */}
        <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-orange-500">
          <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-6 sm:mb-8 text-center text-pixel-shadow px-4">
            HOW THE <span className="text-orange-400 text-pixel-glow">PRESALE</span> WORKS
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { number: '50', title: '50 TIERS', description: 'PRICE STARTS AT $0.0005 AND INCREASES EVERY TIER', color: 'from-orange-500 to-red-500', borderColor: 'border-red-600' },
              { number: '10%', title: 'EARLY BONUS', description: '10% EXTRA TOKENS IN TIERS 1–3', color: 'from-green-500 to-emerald-500', borderColor: 'border-green-600' },
              { number: '5%', title: 'REFERRAL BONUS', description: '5% BONUS FOR BOTH SENDER AND RECEIVER', color: 'from-cyan-500 to-blue-500', borderColor: 'border-blue-600' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white font-black text-sm sm:text-xl border-2 sm:border-4 ${item.borderColor}`}>
                  {item.number}
                </div>
                <h4 className="heading-pixel text-white mb-2 text-xs sm:text-sm">{item.title}</h4>
                <p className="font-pixel text-gray-400 text-xs px-2">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 text-center">
            <p className="font-pixel text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm px-4">
              <span className="text-white text-pixel-glow">TOTAL SUPPLY:</span> 10B $MSTR | <span className="text-orange-400 text-pixel-glow">35% IN PRESALE</span>
            </p>
            <p className="font-retro text-gray-400 text-xs px-4">
              BUY WITH: ETH, SOL, BTC, BNB, USDT, USDC, OR CREDIT CARD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;