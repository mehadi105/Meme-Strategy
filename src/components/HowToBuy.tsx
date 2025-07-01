
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, DollarSign, Calculator, Rocket, Shield, Clock, HelpCircle } from 'lucide-react';

const HowToBuy = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      icon: <Wallet className="w-8 h-8" />,
      description: "Connect your BSC-compatible wallet to access the presale. We support MetaMask, Trust Wallet, and most Web3 wallets.",
      details: [
        "Download and install MetaMask from metamask.io",
        "Create a new wallet or import existing seed phrase",
        "Add BSC Mainnet to your wallet networks",
        "Visit our presale page and click 'Connect Wallet'",
        "Select your wallet from the connection modal",
        "Approve the connection request in your wallet",
        "Ensure you're on BSC Mainnet (chain ID: 56)"
      ],
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500"
    },
    {
      number: 2,
      title: "Get BNB",
      icon: <DollarSign className="w-8 h-8" />,
      description: "Acquire BNB tokens for your purchase. You'll need BNB for both buying $MSTR tokens and paying gas fees.",
      details: [
        "Buy BNB from exchanges (Binance, Coinbase)",
        "Transfer BNB to your BSC wallet",
        "Send BNB to your wallet address",
        "Keep 0.001-0.005 BNB extra for gas",
        "Minimum purchase: 0.01 BNB",
        "Maximum: No limit per transaction",
        "Verify BNB balance in your wallet"
      ],
      color: "from-yellow-500 to-orange-600",
      borderColor: "border-yellow-500"
    },
    {
      number: 3,
      title: "Enter Amount & Calculate",
      icon: <Calculator className="w-8 h-8" />,
      description: "Enter your desired BNB amount and see real-time $MSTR calculations including all bonuses and tier information.",
      details: [
        "Enter your desired BNB amount in the input field",
        "View instant $MSTR token calculation",
        "Check current tier pricing and next tier info",
        "See early bird bonus (10% for tiers 1-3)",
        "Add referral address for 5% bonus tokens",
        "Review total tokens including all bonuses",
        "Confirm gas fee estimates before proceeding"
      ],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500"
    },
    {
      number: 4,
      title: "Buy & Secure Your Tokens",
      icon: <Rocket className="w-8 h-8" />,
      description: "Complete your purchase and secure your $MSTR tokens. Your tokens will be sent directly to your wallet address.",
      details: [
        "Review all transaction details carefully",
        "Click 'Buy $MSTR' button to initiate purchase",
        "Confirm transaction in your wallet popup",
        "Wait for blockchain confirmation (3-5 minutes)",
        "Receive success notification with tx hash",
        "Tokens automatically sent to your wallet",
        "Add $MSTR token to wallet to view balance"
      ],
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-fuchsia-500"
    }
  ];

  const tips = [
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Security Tips",
      content: "Never share your private keys or seed phrases with anyone. Always verify contract addresses before transactions. Use hardware wallets for maximum security."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "Transaction Time",
      content: "BSC transactions typically take 3-5 minutes during normal network conditions. During high traffic, it may take up to 10-15 minutes."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
      title: "Need Help?",
      content: "Join our Telegram community for instant support. Our team is available 24/7 to help with any issues during the presale process."
    }
  ];

  const troubleshooting = [
    {
      problem: "Wallet Won't Connect",
      solutions: [
        "Refresh the page and try again",
        "Clear browser cache and cookies",
        "Disable browser extensions (except wallet)",
        "Try a different browser (Chrome, Firefox)",
        "Ensure you're on BSC Mainnet (Chain ID: 56)"
      ]
    },
    {
      problem: "Transaction Failed",
      solutions: [
        "Check you have enough BNB for gas fees",
        "Increase gas limit to 300,000",
        "Wait for network congestion to clear",
        "Try with a smaller purchase amount",
        "Reset wallet account in settings"
      ]
    },
    {
      problem: "Tokens Not Received",
      solutions: [
        "Add $MSTR token contract to wallet",
        "Check transaction hash on BSCScan",
        "Wait up to 15 minutes for confirmation",
        "Refresh wallet or restart app",
        "Contact support with transaction hash"
      ]
    }
  ];

  const contractInfo = {
    presale: "0xe8BF621BAf230FB3B15A07ACF9103Ff9Ba60efAA",
    token: "0x78e3efa2450239561F204D937F6A5a5f95DE5a06",
    network: "BSC Mainnet",
    chainId: "56"
  };

  const bonusInfo = [
    {
      type: "Early Bird Bonus",
      percentage: "10%",
      condition: "Tiers 1-3 only",
      description: "Get 10% extra tokens for early participation in the first 3 tiers"
    },
    {
      type: "Referral Bonus",
      percentage: "5%",
      condition: "Valid referral address",
      description: "Earn 5% bonus tokens when you use a valid referral address"
    },
    {
      type: "Cumulative Bonuses",
      percentage: "Up to 15%",
      condition: "Early bird + Referral",
      description: "Stack both bonuses for maximum token rewards"
    }
  ];

  return (
    <div className="bg-tron-grid relative overflow-hidden pt-20 px-4">
      {/* Tron-Style Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-blue-950 to-black"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/presale')}
          className="btn-pixel bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-cyan-400 border-cyan-500 px-4 py-2 text-xs mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span className="font-pixel">BACK TO PRESALE</span>
        </button>
        
        {/* Title */}
        <h1 className="heading-pixel text-3xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight text-pixel-shadow">
          <span className="text-purple-400 text-pixel-glow">
            HOW TO BUY $MSTR
          </span>
        </h1>
        
        <p className="font-retro text-center text-cyan-400 mb-16 text-sm sm:text-base uppercase tracking-wider">
          Step-by-step guide to join the meme revolution
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-8 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 transform translate-x-0 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className={`card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 ${step.borderColor} hover:border-cyan-400 transition-all duration-300 hover:scale-105 relative z-10`}>
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}>
                  <span className="font-pixel text-white text-xs">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className={`mb-4 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="heading-pixel text-white text-lg mb-3">{step.title}</h3>
                <p className="font-retro text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>
                
                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 text-xs mt-1 flex-shrink-0">▶</span>
                      <span className="font-pixel text-gray-400 text-xs leading-relaxed break-words">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tips.map((tip, index) => (
            <div key={index} className="card-pixel bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                {tip.icon}
                <h4 className="font-pixel text-white text-sm">{tip.title}</h4>
              </div>
              <p className="font-retro text-gray-300 text-xs leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>

        {/* Bonus Information Section */}
        <div className="mb-16">
          <h2 className="heading-pixel text-2xl sm:text-3xl text-center mb-8">
            <span className="text-yellow-400 text-pixel-glow">
              BONUS REWARDS
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonusInfo.map((bonus, index) => (
              <div key={index} className="card-pixel bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-6 border-yellow-500/50 hover:border-yellow-400 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="text-3xl font-pixel text-yellow-400 mb-2">{bonus.percentage}</div>
                  <div className="font-pixel text-white text-sm mb-1">{bonus.type}</div>
                  <div className="font-pixel text-yellow-600 text-xs">{bonus.condition}</div>
                </div>
                <p className="font-retro text-gray-300 text-xs text-center leading-relaxed">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Information */}
        <div className="mb-16">
          <h2 className="heading-pixel text-2xl sm:text-3xl text-center mb-8">
            <span className="text-cyan-400 text-pixel-glow">
              CONTRACT INFORMATION
            </span>
          </h2>
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border-cyan-500/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-pixel text-cyan-400 text-sm mb-3">PRESALE CONTRACT</h4>
                <div className="bg-slate-900/80 rounded-lg p-4 border-2 border-slate-700">
                  <code className="font-pixel text-gray-300 text-xs break-all">{contractInfo.presale}</code>
                </div>
              </div>
              <div>
                <h4 className="font-pixel text-cyan-400 text-sm mb-3">TOKEN CONTRACT</h4>
                <div className="bg-slate-900/80 rounded-lg p-4 border-2 border-slate-700">
                  <code className="font-pixel text-gray-300 text-xs break-all">{contractInfo.token}</code>
                </div>
              </div>
              <div>
                <h4 className="font-pixel text-cyan-400 text-sm mb-3">NETWORK</h4>
                <div className="bg-slate-900/80 rounded-lg p-4 border-2 border-slate-700">
                  <code className="font-pixel text-gray-300 text-xs">{contractInfo.network}</code>
                </div>
              </div>
              <div>
                <h4 className="font-pixel text-cyan-400 text-sm mb-3">CHAIN ID</h4>
                <div className="bg-slate-900/80 rounded-lg p-4 border-2 border-slate-700">
                  <code className="font-pixel text-gray-300 text-xs">{contractInfo.chainId}</code>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="font-pixel text-orange-400 text-xs">⚠️ ALWAYS VERIFY CONTRACT ADDRESSES BEFORE TRANSACTIONS</p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="mb-16">
          <h2 className="heading-pixel text-2xl sm:text-3xl text-center mb-8">
            <span className="text-red-400 text-pixel-glow">
              TROUBLESHOOTING GUIDE
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {troubleshooting.map((item, index) => (
              <div key={index} className="card-pixel bg-gradient-to-br from-red-900/20 to-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-red-500/50 hover:border-red-400 transition-all duration-300">
                <h4 className="font-pixel text-red-400 text-sm mb-4 text-center">❌ {item.problem}</h4>
                <div className="space-y-3">
                  {item.solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-green-400 text-xs mt-1 font-pixel">✓</span>
                      <span className="font-retro text-gray-300 text-xs leading-relaxed">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timeline */}
            <div className="card-pixel bg-gradient-to-br from-purple-900/20 to-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-purple-500/50">
              <h3 className="font-pixel text-purple-400 text-lg mb-4 text-center">⏰ PRESALE TIMELINE</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-pixel text-gray-300 text-xs">TIERS 1-3</span>
                  <span className="font-pixel text-green-400 text-xs">10% BONUS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-pixel text-gray-300 text-xs">TIERS 4-25</span>
                  <span className="font-pixel text-yellow-400 text-xs">REGULAR PRICE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-pixel text-gray-300 text-xs">TIERS 26-50</span>
                  <span className="font-pixel text-orange-400 text-xs">HIGHER TIERS</span>
                </div>
                <div className="border-t-2 border-purple-500/30 pt-4">
                  <p className="font-retro text-gray-400 text-xs text-center">Each tier: 70M $MSTR tokens</p>
                </div>
              </div>
            </div>

            {/* Risk Warning */}
            <div className="card-pixel bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-xl p-6 border-orange-500/50">
              <h3 className="font-pixel text-orange-400 text-lg mb-4 text-center">⚠️ IMPORTANT NOTICE</h3>
              <div className="space-y-3">
                <p className="font-retro text-gray-300 text-xs leading-relaxed">
                  • This is a live mainnet deployment - real funds involved
                </p>
                <p className="font-retro text-gray-300 text-xs leading-relaxed">
                  • Always DYOR (Do Your Own Research) before investing
                </p>
                <p className="font-retro text-gray-300 text-xs leading-relaxed">
                  • Never invest more than you can afford to lose
                </p>
                <p className="font-retro text-gray-300 text-xs leading-relaxed">
                  • Cryptocurrency investments carry high risks
                </p>
                <p className="font-retro text-gray-300 text-xs leading-relaxed">
                  • Keep your private keys secure and private
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border-purple-500">
            <h3 className="heading-pixel text-white text-2xl sm:text-3xl mb-4">Ready to Join?</h3>
            <p className="font-retro text-gray-300 mb-6 text-sm sm:text-base">
              Don't miss out on the early bird bonuses! Join the presale now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/presale')}
                className="btn-pixel bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-700 px-6 py-3 text-sm hover:scale-105 transition-all duration-300"
              >
                🚀 START BUYING $MSTR
              </button>
              <button 
                onClick={() => navigate('/')}
                className="btn-pixel border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-3 text-sm bg-transparent hover:scale-105 transition-all duration-300"
              >
                📚 LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy; 