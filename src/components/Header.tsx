import { useState, useEffect } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
import { walletManager } from '../utils/wallet';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wallet, setWallet] = useState(walletManager.getState());
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = walletManager.subscribe(setWallet);
    walletManager.checkConnection();
    return unsub;
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    setConnecting(true);
    await walletManager.connect();
    setConnecting(false);
  };

  return (
    <header className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-md border-b-4 border-cyan-500' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <span className="font-pixel text-lg sm:text-2xl text-white text-pixel-glow">MS</span>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500"></div>
            </div>
            <span className="font-retro text-white font-black text-sm sm:text-lg">MEMESTRATEGY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {['HOME', 'ABOUT', 'PRESALE', 'ROADMAP', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="font-pixel text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 text-xs relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </nav>

          {/* Connect Wallet Button (Desktop) */}
          <button
            className="hidden md:flex btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white border-cyan-700 px-3 lg:px-4 py-2 text-xs items-center space-x-2 ml-4"
            onClick={handleConnectWallet}
            disabled={wallet.isConnected || connecting}
          >
            <Wallet size={14} />
            <span>
              {wallet.isConnected
                ? walletManager.getShortAddress(wallet.account || '')
                : connecting
                  ? 'Connecting...'
                  : 'Connect Wallet'}
            </span>
          </button>

          {/* Existing Join Presale Button (Desktop) */}
          <button className="hidden md:flex btn-pixel bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-700 px-3 lg:px-4 py-2 text-xs items-center space-x-2">
            <Wallet size={14} />
            <span className="hidden lg:inline">JOIN PRESALE</span>
            <span className="lg:hidden">JOIN</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-orange-500 transition-colors duration-300 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t-2 border-gray-700 bg-slate-900/95 backdrop-blur-md rounded-lg">
            <nav className="flex flex-col space-y-4 px-4">
              {['HOME', 'ABOUT', 'PRESALE', 'ROADMAP', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="font-pixel text-white hover:text-orange-500 transition-colors duration-300 text-left text-xs py-2"
                >
                  {item}
                </button>
              ))}
              <button
                className="btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2 mt-2"
                onClick={handleConnectWallet}
                disabled={wallet.isConnected || connecting}
              >
                <Wallet size={14} />
                <span>
                  {wallet.isConnected
                    ? walletManager.getShortAddress(wallet.account || '')
                    : connecting
                      ? 'Connecting...'
                      : 'Connect Wallet'}
                </span>
              </button>
              <button className="btn-pixel bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2 mt-2">
                <Wallet size={14} />
                <span>JOIN PRESALE</span>
              </button>
            </nav>
            {wallet.error && (
              <div className="text-xs text-red-400 mt-2 text-center w-full">{wallet.error}</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;