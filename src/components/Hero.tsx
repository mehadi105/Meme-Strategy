import { TrendingUp, Coins, DollarSign, Bitcoin } from 'lucide-react';

const Hero = () => {
  
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 sm:w-64 h-32 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 sm:w-96 h-48 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - MEME STRATEGY Pixel Art */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-2">
            <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500 shadow-2xl hover:scale-105 transition-all duration-500 w-full max-w-md">
              {/* Main MEME STRATEGY Image */}
              <div className="text-center mb-6 sm:mb-8">
                <img 
                  src="/ChatGPT Image Jun 19, 2025 at 01_17_36 AM.png" 
                  alt="MEME STRATEGY - Bitcoin Pixel Art"
                  className="w-full max-w-xs sm:max-w-md mx-auto hover:scale-110 transition-transform duration-500"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 193, 7, 0.5))',
                    imageRendering: 'pixelated'
                  }}
                />
              </div>

              

              {/* Floating Stats */}
              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                <div className="card-pixel bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-2 sm:p-3 border-orange-500 text-center">
                  <div className="font-pixel text-orange-400 text-xs">TREASURY</div>
                  <div className="heading-pixel text-white text-xs sm:text-sm">70% MEMES</div>
                </div>
                <div className="card-pixel bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-2 sm:p-3 border-yellow-500 text-center">
                  <div className="font-pixel text-yellow-400 text-xs">ANCHOR</div>
                  <div className="heading-pixel text-white text-xs sm:text-sm">30% BTC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <h1 className="heading-pixel text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight text-pixel-shadow">
              <span className="text-orange-400 text-pixel-glow">
                THE MEME TREASURY
              </span>
            </h1>
            
            <h2 className="heading-retro text-xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4">
              BACKED BY <span className="text-yellow-400 text-pixel-glow">BITCOIN</span>
            </h2>
            
            <p className="font-pixel text-sm sm:text-xl lg:text-2xl text-cyan-300 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
              WE DON'T JUST INVEST IN MEMES. WE BECOME THE MEME.
            </p>
            
            <p className="font-retro text-blue-300 mb-8 sm:mb-12 text-sm sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 px-4 lg:px-0">
              HELP BUILD CRYPTO'S FIRST DECENTRALIZED, CULTURE-POWERED TREASURY.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0">
              
              <button 
                onClick={() => window.open('/meme.pdf', '_blank')}
                className="btn-pixel border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm bg-transparent hover:scale-105 transition-all duration-300"
              >
                READ THE LITEPAPER
              </button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 lg:px-0">
              <div className="card-pixel bg-gradient-to-r from-slate-800/30 to-slate-900/30 rounded-xl p-3 sm:p-4 border-cyan-500/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm sm:text-lg">
                    🤖
                  </div>
                  <div>
                    <div className="font-pixel text-white text-xs">MEMEBOT AI</div>
                    <div className="font-pixel text-cyan-300 text-xs">POWERED FOUNDER</div>
                  </div>
                </div>
              </div>
              
              <div className="card-pixel bg-gradient-to-r from-slate-800/30 to-slate-900/30 rounded-xl p-3 sm:p-4 border-cyan-500/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Bitcoin className="text-white" size={12} />
                  </div>
                  <div>
                    <div className="font-pixel text-white text-xs">BITCOIN BACKED</div>
                    <div className="font-pixel text-cyan-300 text-xs">TREASURY ANCHOR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="mt-12 sm:mt-20 px-4 lg:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'TOTAL SUPPLY', value: '10B $MEMESTR', change: 'DISTRIBUTION', icon: Coins, color: 'from-green-500 to-emerald-500' },
              { label: 'TREASURY SPLIT', value: '70% MEMES', change: '30% BITCOIN', icon: Bitcoin, color: 'from-yellow-500 to-orange-600' }
            ].map((stat, index) => (
              <div key={index} className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  <span className="font-pixel text-green-400 text-xs">{stat.change}</span>
                </div>
                <div className="font-pixel text-blue-300 text-xs mb-1">{stat.label}</div>
                <div className="heading-pixel text-white text-sm sm:text-xl text-pixel-glow">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;