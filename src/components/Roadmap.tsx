import { CheckCircle, Clock, Star } from 'lucide-react';
 

const Roadmap = () => {
  
  
  const phases = [
    {
      phase: 'PHASE I',
      title: 'LAUNCH & COMMUNITY',
      status: 'current',
      gif: '/road-1.gif',
      color: 'from-orange-500 to-red-600',
      items: [
        'LAUNCH $MEMESTR',
        'BUILD COMMUNITY BASE',
        'SMART CONTRACT AUDIT',
        'INITIAL TREASURY SETUP'
      ]
    },
    {
      phase: 'PHASE II',
      title: 'TREASURY ACTIVATION',
      status: 'upcoming',
      gif: '/road-2.gif',
      color: 'from-green-500 to-emerald-600',
      items: [
        'DEPLOY MEME TREASURY ($25M)',
        'LAUNCH MEME INDEX ($30M)',
        'WEEKLY COMMUNITY VOTES',
        'STAKING & GOVERNANCE LIVE'
      ]
    },
    {
      phase: 'PHASE III',
      title: 'ECOSYSTEM EXPANSION',
      status: 'upcoming',
      gif: '/road-4.gif',
      color: 'from-orange-500 to-amber-600',
      items: [
        'VENTURES INCUBATOR ($40M)',
        'MEME ETF APP ($50M)',
        'ALTCOIN VAULT ($60M)',
        'TOKENIZED ETF PORTFOLIO ($75M)'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'current':
        return <Clock className="text-orange-400 animate-pulse" size={20} />;
      default:
        return <Star className="text-purple-400" size={20} />;
    }
  };

  return (
    <section id="roadmap" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            <span className="text-cyan-400 text-pixel-glow">ROADMAP</span>
          </h2>
          <p className="font-pixel text-sm sm:text-xl text-cyan-300 mb-6 sm:mb-8 px-4">
            OUR JOURNEY TO MEME TREASURY SUPREMACY
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-full bg-gradient-to-b from-orange-500 via-green-500 to-purple-500 opacity-30 border-2 border-black hidden lg:block"></div>

          <div className="space-y-12 sm:space-y-20">
            {phases.map((phase, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} relative`}>
                {/* Timeline Node with Pure GIF */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                  <div className={`w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center ${phase.status === 'current' ? 'animate-pulse' : ''}`}>
                    <img 
                      src={phase.gif} 
                      alt={`${phase.title} Animation`}
                      className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
                      style={{
                        imageRendering: 'pixelated',
                        filter: `brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(0, 191, 255, 0.6)) ${phase.status === 'current' ? 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))' : ''}`
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500 hover:border-cyan-400 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div>
                        <div className="font-pixel text-blue-300 text-xs mb-1">{phase.phase}</div>
                        <h3 className="heading-pixel text-lg sm:text-2xl text-white text-pixel-glow">{phase.title}</h3>
                      </div>
                      {getStatusIcon(phase.status)}
                    </div>

                    {/* Phase GIF Preview - Mobile */}
                    <div className="mb-4 sm:mb-6 text-center lg:hidden">
                      <div className="inline-block">
                        <img 
                          src={phase.gif} 
                          alt={`${phase.title} Preview`}
                          className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                          style={{
                            imageRendering: 'pixelated',
                            filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.5))'
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 sm:space-x-3">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 ${phase.status === 'completed' ? 'bg-green-400 border-green-600' : phase.status === 'current' ? 'bg-orange-400 border-orange-600 animate-pulse' : 'bg-purple-400 border-purple-600'}`}></div>
                          <span className="font-pixel text-cyan-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 sm:mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-pixel text-blue-300 text-xs">PROGRESS</span>
                        <span className="font-pixel text-white text-xs">
                          {phase.status === 'completed' ? '100%' : phase.status === 'current' ? '25%' : '0%'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 border-2 border-slate-600">
                        <div 
                          className={`bg-gradient-to-r ${phase.color} h-full rounded-full transition-all duration-1000`}
                          style={{
                            width: phase.status === 'completed' ? '100%' : phase.status === 'current' ? '25%' : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated GIF Showcase */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500 max-w-4xl mx-auto">
            <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-6 sm:mb-8 text-pixel-shadow px-4">
              POWERED BY <span className="text-orange-400 text-pixel-glow">PIXEL PERFECTION</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {phases.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="card-pixel bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
                    <div className="mb-3 sm:mb-4">
                      <img 
                        src={phase.gif} 
                        alt={phase.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                        style={{
                          imageRendering: 'pixelated',
                          filter: 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.4))'
                        }}
                      />
                    </div>
                    <h4 className="heading-pixel text-white text-xs sm:text-sm mb-2">{phase.phase}</h4>
                    <p className="font-pixel text-cyan-300 text-xs">{phase.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-20 relative">
          {/* Side Characters for JOIN THE MEME TREASURY */}
          <img src="/angry.png" alt="Angry Meme" className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-80 w-auto z-20" style={{transform: 'translateY(-50%)'}} />
          <img src="/character-2.svg" alt="Character 2" className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-80 w-auto z-20" style={{transform: 'translateY(-50%)'}} />
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-orange-500 hover:border-orange-400 transition-all duration-300 max-w-2xl mx-auto">
            <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-3 sm:mb-4 text-pixel-shadow px-4">
              JOIN THE <span className="text-orange-400 text-pixel-glow">MEME TREASURY</span>
            </h3>
            <p className="font-pixel text-cyan-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm px-4">
              BE PART OF THE FUTURE OF MEME INVESTING. GET IN EARLY AND HELP SHAPE CRYPTO CULTURE.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;