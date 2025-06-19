const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t-4 border-cyan-500">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Left - Logo and Links */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3 sm:mb-4">
              <div className="relative">
                <span className="font-pixel text-lg sm:text-2xl text-white text-pixel-glow">MS</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500"></div>
              </div>
              <span className="font-retro text-white text-sm sm:text-lg">MEMESTRATEGY</span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm">
              {['TERMS OF SERVICE', 'PRIVACY POLICY', 'FAQ'].map((link, index) => (
                <a key={index} href={link === 'FAQ' ? '#faq' : '#'} className="font-pixel text-gray-400 hover:text-white transition-colors duration-300 text-xs">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Center - Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {/* Social Links: Telegram, Twitter */}
            <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 card-pixel bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:border-cyan-400 transition-all duration-300 hover:scale-110 border-slate-600">
              <img src="/social_tg.png" alt="Telegram" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </a>
            <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 card-pixel bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-400 transition-all duration-300 hover:scale-110 border-slate-600">
              <img src="/twitter.png" alt="Twitter" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </a>
          </div>

          {/* Right - Stay Connected */}
          <div className="text-center lg:text-right">
            <h3 className="heading-pixel text-white mb-2 text-xs sm:text-sm">STAY CONNECTED</h3>
            <p className="font-pixel text-gray-400 text-xs mb-3 sm:mb-4">FOLLOW @MEMESTRATEGY ON X</p>
            <div className="space-y-1 sm:space-y-2 text-sm">
              {[
                'JOIN THE TELEGRAM',
                'CATCH UPDATES FROM MEMEBOT AI',
                'WATCH US MEME ACROSS TIKTOK, REELS, AND SHORTS'
              ].map((text, index) => (
                <div key={index} className="font-pixel text-gray-400 text-xs px-2">
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="font-pixel text-gray-400 text-xs leading-relaxed px-4">
            © 2024 MEMESTRATEGY. ALL RIGHTS RESERVED. THIS WEBSITE IS FOR ENTERTAINMENT AND EDUCATIONAL PURPOSES ONLY. 
            NOT FINANCIAL ADVICE. CRYPTOCURRENCY INVESTMENTS CARRY SIGNIFICANT RISK OF LOSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;