import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'IS THERE KYC REQUIRED?',
      answer: 'NO, HOWEVER, IN ORDER TO USE THIS SERVICE YOU HAVE TO READ AND ACCEPT TERMS OF SERVICE.'
    },
    {
      question: 'HOW DO I BUY $MEMESTR TOKENS?',
      answer: 'CONNECT YOUR WALLET AND PURCHASE USING SUPPORTED CRYPTO (ETH, SOL, BTC, BNB, USDT, USDC) OR CREDIT CARD WHERE AVAILABLE.'
    },
    {
      question: 'IS THERE A VESTING SCHEDULE?',
      answer: 'TEAM AND TREASURY TOKENS ARE VESTED TO ENSURE LONG-TERM COMMITMENT AND STABILITY. PUBLIC TOKEN DISTRIBUTIONS HAVE NO VESTING UNLESS SPECIFIED.'
    },
    {
      question: 'WHAT CHAINS ARE SUPPORTED?',
      answer: 'ETH, SOL, BNB, BTC, AND MORE — IT\'S MULTICHAIN. WE SUPPORT MULTIPLE PAYMENT METHODS FOR MAXIMUM ACCESSIBILITY.'
    },
    {
      question: 'HOW DOES THE TREASURY WORK?',
      answer: '70% OF FUNDS GO INTO MEMECOINS (PEPE, DOGE, MOG, ETC.) AND 30% INTO BTC. THE COMMUNITY VOTES WEEKLY ON WHICH MEMECOINS TO ADD TO OUR TREASURY.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-pixel text-2xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-pixel-shadow px-4">
            FREQUENTLY ASKED <span className="text-orange-400 text-pixel-glow">QUESTIONS</span>
          </h2>
          <p className="font-pixel text-sm sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
            EVERYTHING YOU NEED TO KNOW ABOUT MEMESTRATEGY
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border-cyan-500 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <HelpCircle className="text-cyan-400 flex-shrink-0" size={20} />
                    <h3 className="heading-pixel text-white text-xs sm:text-lg pr-4">{faq.question}</h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="text-cyan-400 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-cyan-400 flex-shrink-0" size={20} />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-4 sm:px-8 pb-4 sm:pb-6 border-t-2 border-gray-700">
                    <div className="pt-3 sm:pt-4 font-pixel text-gray-300 leading-relaxed text-xs">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meme Characters Community Section with Complete 4-Sided Pixel Grid Border */}
        <div className="mt-12 sm:mt-16">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-green-500 max-w-5xl mx-auto relative overflow-hidden">
            {/* Complete 4-Sided Pixel Grid Border - Each Side Different Color - FULL COVERAGE */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Border - Green - FULL WIDTH */}
              <div className="absolute top-0 left-0 right-0 h-6 flex">
                {Array.from({ length: 50 }, (_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-full"
                    style={{ minWidth: '12px' }}
                  >
                    <img 
                      src="/green.gif" 
                      alt="" 
                      className="w-full h-full object-cover animate-pulse opacity-70" 
                      style={{ 
                        imageRendering: 'pixelated',
                        animationDelay: `${i * 50}ms`
                      }} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              {/* Bottom Border - Blue - FULL WIDTH */}
              <div className="absolute bottom-0 left-0 right-0 h-6 flex">
                {Array.from({ length: 50 }, (_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-full"
                    style={{ minWidth: '12px' }}
                  >
                    <img 
                      src="/blue.gif" 
                      alt="" 
                      className="w-full h-full object-cover animate-pulse opacity-70" 
                      style={{ 
                        imageRendering: 'pixelated',
                        animationDelay: `${i * 75}ms`
                      }} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              {/* Left Border - Yellow - FULL HEIGHT */}
              <div className="absolute left-0 top-6 bottom-6 w-6 flex flex-col">
                {Array.from({ length: 40 }, (_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 w-full"
                    style={{ minHeight: '12px' }}
                  >
                    <img 
                      src="/yellow.gif" 
                      alt="" 
                      className="w-full h-full object-cover animate-pulse opacity-70" 
                      style={{ 
                        imageRendering: 'pixelated',
                        animationDelay: `${i * 100}ms`
                      }} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              {/* Right Border - Purple - FULL HEIGHT */}
              <div className="absolute right-0 top-6 bottom-6 w-6 flex flex-col">
                {Array.from({ length: 40 }, (_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 w-full"
                    style={{ minHeight: '12px' }}
                  >
                    <img 
                      src="/purple.gif" 
                      alt="" 
                      className="w-full h-full object-cover animate-pulse opacity-70" 
                      style={{ 
                        imageRendering: 'pixelated',
                        animationDelay: `${i * 90}ms`
                      }} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Corner Pixels for Perfect Coverage */}
              {/* Top-Left Corner */}
              <div className="absolute top-0 left-0 w-6 h-6">
                <img 
                  src="/green.gif" 
                  alt="" 
                  className="w-full h-full object-cover animate-pulse opacity-70" 
                  style={{ imageRendering: 'pixelated' }} 
                  loading="lazy"
                />
              </div>
              
              {/* Top-Right Corner */}
              <div className="absolute top-0 right-0 w-6 h-6">
                <img 
                  src="/green.gif" 
                  alt="" 
                  className="w-full h-full object-cover animate-pulse opacity-70" 
                  style={{ imageRendering: 'pixelated' }} 
                  loading="lazy"
                />
              </div>
              
              {/* Bottom-Left Corner */}
              <div className="absolute bottom-0 left-0 w-6 h-6">
                <img 
                  src="/blue.gif" 
                  alt="" 
                  className="w-full h-full object-cover animate-pulse opacity-70" 
                  style={{ imageRendering: 'pixelated' }} 
                  loading="lazy"
                />
              </div>
              
              {/* Bottom-Right Corner */}
              <div className="absolute bottom-0 right-0 w-6 h-6">
                <img 
                  src="/blue.gif" 
                  alt="" 
                  className="w-full h-full object-cover animate-pulse opacity-70" 
                  style={{ imageRendering: 'pixelated' }} 
                  loading="lazy"
                />
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8 relative z-10">
              <h3 className="heading-pixel text-xl sm:text-3xl text-white mb-3 sm:mb-4 text-pixel-shadow px-4">
                JOIN THE <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">MEME ARMY</span>
              </h3>
              <p className="font-pixel text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 px-4">
                OUR COMMUNITY IS MADE UP OF LEGENDARY MEME CHARACTERS — ALL WORKING TOGETHER TO PUMP THE TREASURY
              </p>
            </div>

            {/* Meme Characters Image */}
            <div className="mb-6 sm:mb-8 text-center relative z-10">
              <img 
                src="/faq.png" 
                alt="MemeStrategy Community - Meme Characters in Business Suits"
                className="w-full max-w-xl sm:max-w-2xl mx-auto rounded-xl sm:rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.4))',
                  imageRendering: 'crisp-edges'
                }}
                loading="lazy"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="heading-pixel text-white text-sm sm:text-lg mb-3 sm:mb-4 text-pixel-glow">WHO'S IN THE ARMY?</h4>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { img: '/pepe.png', alt: 'Pepe Logo', name: 'PEPE - THE ORIGINAL MEME KING' },
                    { img: '/doge.jpeg', alt: 'Doge Logo', name: 'DOGE - THE PEOPLE\'S CHAMPION' },
                    { img: '/wif.jpeg', alt: 'Wif Logo', name: 'WIF - THE COMMUNITY FAVORITE' },
                    { img: '/bonk.png', alt: 'Bonk Logo', name: 'BONK - THE NEWCOMER' },
                    { emoji: '😎', name: 'CHAD - THE ALPHA INVESTOR' },
                    { emoji: '👽', name: 'ALIEN - THE VISIONARY' },
                    { emoji: '🤖', name: 'MEMEBOT AI - THE STRATEGIST' }
                  ].map((character, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      {character.img ? (
                        <img src={character.img} alt={character.alt} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" style={{ imageRendering: 'crisp-edges' }} loading="lazy" />
                      ) : (
                        <span className="text-lg sm:text-2xl">{character.emoji}</span>
                      )}
                      <span className="font-pixel text-gray-300 text-xs">{character.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <h4 className="heading-pixel text-white text-sm sm:text-lg mb-3 sm:mb-4 text-pixel-glow">WHAT WE DO TOGETHER</h4>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    'VOTE ON NEW MEMECOINS WEEKLY',
                    'SHARE ALPHA AND MARKET INSIGHTS',
                    'BUILD THE ULTIMATE MEME TREASURY',
                    'HODL TOGETHER, MOON TOGETHER'
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse`} style={{ animationDelay: `${index * 200}ms` }}></div>
                      <span className="font-pixel text-gray-300 text-xs">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-center relative z-10">
              <div className="card-pixel bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-green-500 mb-4 sm:mb-6">
                <div className="heading-pixel text-lg sm:text-2xl text-green-400 mb-2 text-pixel-glow">📈 TO THE MOON!</div>
                <p className="font-pixel text-gray-300 text-xs px-2">
                  WHEN MEMES UNITE WITH STRATEGY, MAGIC HAPPENS. JOIN THE ARMY AND LET'S PUMP THIS TREASURY TOGETHER!
                </p>
              </div>
              
              <p className="font-pixel text-gray-400 text-xs sm:text-sm px-4">
                STILL HAVE QUESTIONS? JOIN OUR TELEGRAM AND ASK THE MEME ARMY DIRECTLY!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;