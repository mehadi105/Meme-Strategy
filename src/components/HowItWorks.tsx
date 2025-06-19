import { Shield, Lock, Eye, Users } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            SECURE & <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">TRANSPARENT</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Security Features */}
          <div className="group card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-green-500 hover:border-green-400 transition-all duration-500 hover:scale-105" data-aos="fade-right">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-4 sm:mb-6 text-pixel-glow px-4">SECURITY FIRST</h3>
              
              {/* Pixel Art Shield */}
              <div className="mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:animate-pulse rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-4 border-green-500/50">
                  <img 
                    src="/pixelated-shield-protection-free-vector.jpg" 
                    alt="Pixel Art Security Shield"
                    className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.6)) brightness(1.1) contrast(1.2)'
                    }}
                  />
                </div>
                <div className="btn-pixel bg-gradient-to-r from-green-400 to-emerald-500 text-black border-green-600 px-2 sm:px-3 py-1 text-xs inline-block">
                  AUDITED & SECURED
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                { icon: Shield, text: 'SMART CONTRACTS AUDITED (IN PROGRESS)' },
                { icon: Lock, text: 'LIQUIDITY LOCKED FOR 12 MONTHS' },
                { icon: Users, text: 'MULTISIG-CONTROLLED TREASURY WALLET' },
                { icon: Eye, text: 'REAL-TIME TREASURY DASHBOARD + BUY TRACKER' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3" data-aos="slide-right" data-aos-delay={200 + index * 100}>
                  <item.icon className="text-green-400 flex-shrink-0" size={16} />
                  <span className="font-pixel text-gray-300 text-xs">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Security Metrics */}
            <div className="card-pixel bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border-green-500" data-aos="zoom-in" data-aos-delay="600">
              <div className="text-center">
                <div className="heading-pixel text-2xl sm:text-3xl text-green-400 mb-2 text-pixel-glow">100%</div>
                <div className="font-pixel text-gray-400 text-xs">TRANSPARENT OPERATIONS</div>
              </div>
            </div>
          </div>

          {/* Pseudonymous Team */}
          <div className="group card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-blue-500 hover:border-blue-400 transition-all duration-500 hover:scale-105" data-aos="fade-left">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-4 sm:mb-6 text-pixel-glow px-4">WHY PSEUDONYMOUS?</h3>
              
              {/* Pixel Art Robot */}
              <div className="mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:animate-bounce rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-4 border-blue-500/50">
                  <img 
                    src="/pixel-art-illustration-robot-head-pixelated-robot-robot-head-icon-pixelated-for-the-pixel-art-game-and-icon-for-website-and-video-game-old-school-retro-vector.jpg" 
                    alt="Pixel Art MemeBot AI"
                    className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6)) brightness(1.1) contrast(1.2)'
                    }}
                  />
                </div>
                <div className="btn-pixel bg-gradient-to-r from-blue-400 to-purple-500 text-white border-purple-600 px-2 sm:px-3 py-1 text-xs inline-block">
                  MEMEBOT AI FOUNDER
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="text-center">
                <p className="font-pixel text-gray-300 leading-relaxed mb-3 sm:mb-4 text-xs px-2" data-aos="fade-up" data-aos-delay="200">
                  WE'RE NOT ANONYMOUS TO HIDE — WE'RE <span className="text-blue-400 text-pixel-glow">PSEUDONYMOUS TO LET THE MEME LEAD</span>.
                </p>
                <p className="font-pixel text-gray-300 leading-relaxed mb-3 sm:mb-4 text-xs px-2" data-aos="fade-up" data-aos-delay="400">
                  OUR FOUNDER IS <span className="text-purple-400 text-pixel-glow">MEMEBOT AI</span>, A DIGITAL CHARACTER TRAINED TO POST, VOTE, AND MEME LIKE A DEGENERATE WITH TASTE.
                </p>
                <p className="font-retro text-gray-400 text-xs px-2" data-aos="fade-up" data-aos-delay="600">
                  THIS ISN'T ABOUT US — IT'S ABOUT WHAT WE BUILD TOGETHER.
                </p>
              </div>
            </div>

            {/* AI Stats */}
            <div className="card-pixel bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border-blue-500" data-aos="zoom-in" data-aos-delay="800">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="heading-pixel text-lg sm:text-xl text-blue-400 mb-1 text-pixel-glow">24/7</div>
                  <div className="font-pixel text-gray-400 text-xs">AI MONITORING</div>
                </div>
                <div>
                  <div className="heading-pixel text-lg sm:text-xl text-purple-400 mb-1 text-pixel-glow">∞</div>
                  <div className="font-pixel text-gray-400 text-xs">MEME POTENTIAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="1000">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-orange-500 hover:border-orange-400 transition-all duration-300 max-w-2xl mx-auto">
            <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-3 sm:mb-4 text-pixel-shadow px-4">
              READY TO <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">JOIN THE TREASURY?</span>
            </h3>
            <p className="font-pixel text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm px-4">
              BE PART OF THE FUTURE OF MEME INVESTING. GET IN EARLY AND HELP SHAPE CRYPTO CULTURE.
            </p>
            <button className="btn-pixel bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-700 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
              JOIN THE $MSTR PRESALE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;