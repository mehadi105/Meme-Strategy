import { BarChart3, Shield, Users, Vote, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'WEEKLY MEME VOTES',
      description: 'Community decides which memecoins to add to our treasury through weekly voting.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Trophy,
      title: 'REFERRAL LEADERBOARD',
      description: 'Earn exclusive NFTs, perks, and Discord roles through our contribution system.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'TRANSPARENT TREASURY',
      description: 'Real-time dashboard showing all treasury holdings and performance metrics.',
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            COMMUNITY + <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">UTILITY</span>
          </h2>
          <p className="font-pixel text-sm sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
            YOUR MEMES. YOUR TREASURY. YOUR MOVEMENT.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-cyan-500 hover:border-cyan-400 transition-all duration-500 hover:scale-105">
              <div className="text-center mb-4 sm:mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-300 border-4 border-black`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="heading-pixel text-sm sm:text-xl text-white mb-2 sm:mb-3 text-pixel-glow px-2">
                  {feature.title}
                </h3>
                <p className="font-pixel text-gray-400 leading-relaxed text-xs px-2">
                  {feature.description}
                </p>
              </div>
              
              {/* Mock Dashboard Preview */}
              <div className="card-pixel bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border-gray-700 group-hover:border-cyan-500 transition-all duration-300">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse border border-green-600"></div>
                    <span className="font-pixel text-green-400 text-xs">ACTIVE</span>
                  </div>
                  <Shield className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={14} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-pixel text-gray-400 text-xs">PARTICIPATION</span>
                    <span className="font-pixel text-green-400 text-xs">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 border-2 border-slate-600">
                    <div className={`bg-gradient-to-r ${feature.gradient} h-full rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Join Section with Pixel Grid Borders */}
        <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-orange-500 relative overflow-hidden pixel-border">
          <div className="pixel-border-side pixel-border-left"></div>
          <div className="pixel-border-side pixel-border-right"></div>
          <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-6 sm:mb-8 text-center text-pixel-shadow px-4 relative z-10">
            WHY <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">JOIN?</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            <div className="space-y-3 sm:space-y-4" data-aos="slide-right" data-aos-delay="1000">
              {[
                { icon: Users, text: 'BECOME PART OF CRYPTO\'S FIRST DECENTRALIZED MEME TREASURY' },
                { icon: Vote, text: 'HELP DIRECT INVESTMENTS INTO THE NEXT VIRAL MEMECOIN' },
                { icon: Trophy, text: 'EARN EXCLUSIVE NFTS, PERKS, ROLES, AND FUTURE STAKING REWARDS' },
                { icon: Shield, text: 'TRANSPARENT AND SELF-SUSTAINING — NO FLUFF, NO FLUFFERS' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3" data-aos="fade-right" data-aos-delay={1200 + index * 100}>
                  <item.icon className="text-orange-400 flex-shrink-0" size={16} />
                  <span className="font-pixel text-gray-300 text-xs">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="card-pixel bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-orange-500" data-aos="slide-left" data-aos-delay="1000">
              <h4 className="heading-pixel text-white mb-3 sm:mb-4 text-center text-xs sm:text-sm">POST-LAUNCH UTILITIES</h4>
              <div className="space-y-2 sm:space-y-3 text-sm">
                {[
                  { label: 'STAKING REWARDS', status: '✓ AVAILABLE', color: 'text-green-400' },
                  { label: 'GOVERNANCE VOTING', status: '✓ AVAILABLE', color: 'text-green-400' },
                  { label: 'BURN MECHANICS', status: '✓ AVAILABLE', color: 'text-green-400' },
                  { label: 'STRATEGIST ROLES', status: '✓ DISCORD', color: 'text-cyan-400' }
                ].map((utility, index) => (
                  <div key={index} className="flex justify-between" data-aos="fade-up" data-aos-delay={1400 + index * 100}>
                    <span className="font-pixel text-gray-400 text-xs">{utility.label}</span>
                    <span className={`font-pixel text-xs ${utility.color}`}>{utility.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;