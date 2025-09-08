import { useState, useEffect } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const getShortAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
              <span className="font-pixel text-lg sm:text-2xl text-white text-pixel-glow">M{'>'}</span>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-cyan-400"></div>
            </div>
            <span className="font-retro text-white font-black text-sm sm:text-lg">MEMESTRATEGY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {['HOME', 'ABOUT', 'ROADMAP', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="font-pixel text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-cyan-400 transition-all duration-300 text-xs relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </nav>

          {/* Connect Wallet Button (Desktop) */}
          <div className="hidden md:flex">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white border-cyan-700 px-3 lg:px-4 py-2 text-xs items-center space-x-2 ml-4 flex"
                          >
                            <Wallet size={14} />
                            <span>Connect Wallet</span>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="btn-pixel bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-700 px-3 lg:px-4 py-2 text-xs items-center space-x-2 ml-4 flex"
                          >
                            <Wallet size={14} />
                            <span>Wrong network</span>
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="btn-pixel bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-green-700 px-2 py-2 text-xs flex items-center"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white border-cyan-700 px-3 lg:px-4 py-2 text-xs items-center space-x-2 flex"
                          >
                            <Wallet size={14} />
                            <span>{getShortAddress(account.address)}</span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Presale CTA removed */}

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
              {['HOME', 'ABOUT', 'ROADMAP', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="font-pixel text-white hover:text-orange-500 transition-colors duration-300 text-left text-xs py-2"
                >
                  {item}
                </button>
              ))}
              <div className="mt-2">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button
                                onClick={openConnectModal}
                                type="button"
                                className="btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2"
                              >
                                <Wallet size={14} />
                                <span>Connect Wallet</span>
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button
                                onClick={openChainModal}
                                type="button"
                                className="btn-pixel bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2"
                              >
                                <Wallet size={14} />
                                <span>Wrong network</span>
                              </button>
                            );
                          }

                          return (
                            <div className="space-y-2">
                              <button
                                onClick={openChainModal}
                                type="button"
                                className="btn-pixel bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2"
                              >
                                {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                <span>{chain.name}</span>
                              </button>
                              <button
                                onClick={openAccountModal}
                                type="button"
                                className="btn-pixel bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-700 px-4 py-3 text-xs w-full flex items-center justify-center space-x-2"
                              >
                                <Wallet size={14} />
                                <span>{getShortAddress(account.address)}</span>
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
              {/* Presale CTA removed (mobile) */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;