import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther, parseEther } from 'viem';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BondingCurve from './BondingCurve';

const PRESALE_ADDRESS = '0x52b8dD7253BE47f3076b918800b96797a45c8795' as const;

const PRESALE_ABI = [
  {
    "inputs": [],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_referrer", "type": "address"}],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentTier",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSold",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRaised",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyerCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOTAL_PRESALE_TOKENS",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKENS_PER_TIER",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amountBNB", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "tokensBase", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "bonusEarly", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "bonusReferral", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "referrer", "type": "address"}
    ],
    "name": "Bought",
    "type": "event"
  }
] as const;

export default function Presale() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [bnbAmount, setBnbAmount] = useState('');
  const [referralAddress, setReferralAddress] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Contract reads with real-time polling
  const { data: currentTier, refetch: refetchTier } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'currentTier',
    query: {
      refetchInterval: 3000, // Refetch every 3 seconds
    },
  });

  const { data: currentPrice, refetch: refetchPrice } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'nextPrice',
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: totalSold, refetch: refetchTotalSold } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'totalSold',
    query: {
      refetchInterval: 2000, // More frequent for progress bar
    },
  });

  const { data: totalRaised, refetch: refetchTotalRaised } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'totalRaised',
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: buyerCount, refetch: refetchBuyerCount } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'buyerCount',
    query: {
      refetchInterval: 5000,
    },
  });

  const { data: totalPresaleTokens } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'TOTAL_PRESALE_TOKENS',
    // No refetch needed - this is a constant
  });

  const { data: tokensPerTier } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'TOKENS_PER_TIER',
    // No refetch needed - this is a constant
  });

  // Buy functions
  const { writeContract: buyWithoutReferral, isPending: isBuyingNoRef } = useWriteContract();
  const { writeContract: buyWithReferral, isPending: isBuyingWithRef } = useWriteContract();

  // Watch for Bought events to trigger immediate updates
  useWatchContractEvent({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    eventName: 'Bought',
    onLogs(logs) {
      console.log('New purchase detected!', logs);
      // Immediately refetch all data when someone buys
      refetchTotalSold();
      refetchTotalRaised();
      refetchBuyerCount();
      refetchTier();
      refetchPrice();
      setLastUpdate(Date.now());
      
      // Show notification for new purchases
      if (logs.length > 0) {
        const log = logs[0];
        const buyer = log.args.buyer;
        const amountBNB = log.args.amountBNB;
        const tokensBase = log.args.tokensBase;
        
        if (buyer !== address) { // Only show for other people's purchases
          toast.success(
            `🚀 Someone just bought ${formatEther(tokensBase as bigint).substring(0, 8)} $MSTR for ${formatEther(amountBNB as bigint).substring(0, 6)} BNB!`,
            { duration: 4000 }
          );
        }
      }
    },
  });

  // Calculate token amount
  const calculateTokenAmount = (bnb: string) => {
    if (!currentPrice || !bnb || parseFloat(bnb) === 0) return '0';
    try {
      const bnbWei = parseEther(bnb);
      const pricePerToken = currentPrice as bigint;
      const tokenAmount = (bnbWei * BigInt(1e18)) / pricePerToken;
      return formatEther(tokenAmount);
    } catch {
      return '0';
    }
  };

  // Calculate bonuses
  const calculateBonuses = () => {
    const tokenAmount = parseFloat(calculateTokenAmount(bnbAmount));
    const earlyBonus = currentTier && Number(currentTier) <= 3 ? tokenAmount * 0.1 : 0;
    const referralBonus = showReferral && referralAddress ? tokenAmount * 0.05 : 0;
    return { earlyBonus, referralBonus, total: tokenAmount + earlyBonus + referralBonus };
  };

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!bnbAmount || parseFloat(bnbAmount) === 0) {
      toast.error('Please enter a valid BNB amount');
      return;
    }

    try {
      const value = parseEther(bnbAmount);
      
      if (showReferral && referralAddress) {
        buyWithReferral({
          address: PRESALE_ADDRESS,
          abi: PRESALE_ABI,
          functionName: 'buy',
          args: [referralAddress as `0x${string}`],
          value,
        });
      } else {
        buyWithoutReferral({
          address: PRESALE_ADDRESS,
          abi: PRESALE_ABI,
          functionName: 'buy',
          args: [],
          value,
        });
      }
      
      toast.success('Transaction submitted! Please confirm in your wallet.');
    } catch (error) {
      toast.error('Transaction failed');
      console.error(error);
    }
  };

  // Calculate progress with high precision for small amounts
  const calculateSoldPercentage = () => {
    if (!totalSold || !totalPresaleTokens) return 0;
    
    // Use BigInt arithmetic for precision, then convert
    const sold = totalSold as bigint;
    const total = totalPresaleTokens as bigint;
    
    // Multiply by 10000 to get 4 decimal places, then divide by 100 for percentage
    const progressBigInt = (sold * BigInt(10000)) / total;
    const progress = Number(progressBigInt) / 100;
    
    return progress;
  };

  const soldPercentage = calculateSoldPercentage();

  // Format progress with appropriate decimal places
  const formatSoldProgress = (progress: number) => {
    if (progress === 0) return '0.000';
    if (progress < 0.001) return progress.toFixed(6);
    if (progress < 0.01) return progress.toFixed(4);
    if (progress < 1) return progress.toFixed(3);
    return progress.toFixed(2);
  };

  // Calculate current tier progress
  const currentTierProgress = () => {
    if (!totalSold || !tokensPerTier || !currentTier) return 0;
    const tierNumber = Number(currentTier);
    const soldTokens = Number(formatEther(totalSold as bigint));
    const tokensPerTierNum = Number(formatEther(tokensPerTier as bigint));
    const tokensInPreviousTiers = (tierNumber - 1) * tokensPerTierNum;
    const tokensInCurrentTier = soldTokens - tokensInPreviousTiers;
    return Math.min((tokensInCurrentTier / tokensPerTierNum) * 100, 100);
  };

  // Calculate tokens remaining in current tier
  const tokensRemainingInTier = () => {
    if (!tokensPerTier || !totalSold || !currentTier) return '0';
    const tierNumber = Number(currentTier);
    const soldTokens = Number(formatEther(totalSold as bigint));
    const tokensPerTierNum = Number(formatEther(tokensPerTier as bigint));
    const tokensInPreviousTiers = (tierNumber - 1) * tokensPerTierNum;
    const tokensInCurrentTier = soldTokens - tokensInPreviousTiers;
    const remaining = tokensPerTierNum - tokensInCurrentTier;
    return (remaining / 1e9).toFixed(2); // Convert to billions
  };

  const bonuses = calculateBonuses();

  // Debug presale data (remove this later)
  useEffect(() => {
    if (totalSold && totalPresaleTokens) {
      console.log('📊 Presale Debug:', {
        totalSold: totalSold.toString(),
        totalPresaleTokens: totalPresaleTokens.toString(),
        totalSoldEther: formatEther(totalSold as bigint),
        totalPresaleEther: formatEther(totalPresaleTokens as bigint),
        soldPercentage: soldPercentage,
        formattedProgress: formatSoldProgress(soldPercentage),
        currentTier: currentTier?.toString(),
        currentPrice: currentPrice?.toString()
      });
    }
  }, [totalSold, totalPresaleTokens, soldPercentage, currentTier, currentPrice]);

  // Update live indicator when data changes
  useEffect(() => {
    setLastUpdate(Date.now());
  }, [totalSold, totalRaised, buyerCount, currentTier, currentPrice]);

  // Live status indicator
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceUpdate = Date.now() - lastUpdate;
      setIsLive(timeSinceUpdate < 10000); // Consider live if updated within 10 seconds
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="min-h-screen bg-tron-grid relative overflow-hidden py-20 px-4">
      {/* Tron-Style Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep Navy Radial Gradient Base */}
        <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-blue-950 to-black"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="btn-pixel bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-cyan-400 border-cyan-500 px-4 py-2 text-xs mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span className="font-pixel">BACK TO HOME</span>
        </button>
        
        <h1 className="heading-pixel text-3xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight text-pixel-shadow">
          <span className="text-fuchsia-400 text-pixel-glow">
            $MSTR PRESALE
          </span>
        </h1>
        
        {/* Live Indicator */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'} transition-colors`}></div>
          <span className={`font-pixel text-xs ${isLive ? 'text-green-400' : 'text-red-400'}`}>
            {isLive ? 'LIVE DATA' : 'RECONNECTING...'}
          </span>
        </div>
        
        <p className="font-retro text-center text-cyan-400 mb-8 text-sm sm:text-base uppercase tracking-wider">Join the revolution early and get exclusive bonuses!</p>
        
        {/* How to Buy Button */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => navigate('/how-to-buy')}
            className="btn-pixel bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-purple-700 px-6 py-3 text-xs hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span className="font-pixel">📚 HOW TO BUY $MSTR</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <p className="font-pixel text-cyan-400 text-xs mb-2">CURRENT TIER</p>
            <p className="heading-pixel text-white text-lg sm:text-xl text-pixel-glow">{currentTier?.toString() || '1'}/50</p>
          </div>
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <p className="font-pixel text-cyan-400 text-xs mb-2">CURRENT PRICE</p>
            <p className="heading-pixel text-green-400 text-lg sm:text-xl text-pixel-glow">
              {currentPrice ? formatEther(currentPrice as bigint).substring(0, 8) : '0.0005'} BNB
            </p>
          </div>
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <p className="font-pixel text-cyan-400 text-xs mb-2">TOTAL RAISED</p>
            <p className="heading-pixel text-yellow-400 text-lg sm:text-xl text-pixel-glow">
              {totalRaised ? formatEther(totalRaised as bigint).substring(0, 8) : '0'} BNB
            </p>
          </div>
          <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <p className="font-pixel text-cyan-400 text-xs mb-2">PARTICIPANTS</p>
            <p className="heading-pixel text-orange-400 text-lg sm:text-xl text-pixel-glow">{buyerCount?.toString() || '0'}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card-pixel bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-cyan-500/50 mb-12">
          {/* Overall Progress */}
          <div className="flex justify-between text-sm mb-4">
            <span className="font-pixel text-cyan-400 text-xs">OVERALL PROGRESS</span>
            <span className="font-pixel text-green-400 text-xs">{formatSoldProgress(soldPercentage)}% SOLD</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 border-2 border-slate-600 overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500 animate-pulse"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mb-6">
            <span className="font-pixel text-orange-400">{totalSold ? (Number(formatEther(totalSold as bigint)) / 1e9).toFixed(2) : '0'}B $MSTR</span>
            <span className="font-pixel text-yellow-400">3.5B $MSTR</span>
          </div>

          {/* Current Tier Progress */}
          <div className="border-t-2 border-cyan-500/30 pt-4">
            <div className="flex justify-between text-sm mb-3">
              <span className="font-pixel text-cyan-400 text-xs">TIER {currentTier?.toString() || '1'} PROGRESS</span>
              <span className="font-pixel text-orange-400 text-xs">{currentTierProgress().toFixed(1)}% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 border-2 border-slate-600 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300"
                style={{ width: `${currentTierProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="font-pixel text-green-400">{tokensRemainingInTier()}B LEFT IN TIER</span>
              <span className="font-pixel text-yellow-400">
                {currentPrice ? formatEther(currentPrice as bigint).substring(0, 8) : '0.0005'} BNB
              </span>
            </div>
          </div>
        </div>

        {/* Bonding Curve Visualization */}
        <BondingCurve className="mb-12" />

        {/* Buy Section */}
        <div className="card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border-cyan-500">
          {/* Referral Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-pixel text-cyan-400 text-xs">HAVE A REFERRAL CODE?</span>
            <button
              onClick={() => setShowReferral(!showReferral)}
              className={`btn-pixel relative inline-flex h-6 w-11 items-center rounded-full transition-all border-2 ${
                showReferral ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-600 border-slate-500'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  showReferral ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {showReferral && (
            <div className="mb-6">
              <label className="block font-pixel text-cyan-400 text-xs mb-3">REFERRAL ADDRESS</label>
              <input
                type="text"
                placeholder="0x..."
                value={referralAddress}
                onChange={(e) => setReferralAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-white font-retro tron-glow"
              />
              <p className="font-pixel text-green-400 text-xs mt-2">GET 5% BONUS TOKENS WITH VALID REFERRAL!</p>
            </div>
          )}

          {/* BNB Input */}
          <div className="mb-6">
            <label className="block font-pixel text-cyan-400 text-xs mb-3">AMOUNT (BNB)</label>
            <input
              type="number"
              placeholder="0.1"
              value={bnbAmount}
              onChange={(e) => setBnbAmount(e.target.value)}
              className="w-full px-4 py-4 bg-slate-900/80 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-white text-2xl font-retro tron-glow"
            />
          </div>

          {/* Token Calculation */}
          <div className="card-pixel bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 border-cyan-500 mb-6">
            <div className="flex justify-between mb-3">
              <span className="font-pixel text-cyan-400 text-xs">YOU WILL RECEIVE:</span>
              <span className="heading-pixel text-white text-lg text-pixel-glow">{calculateTokenAmount(bnbAmount)} $MSTR</span>
            </div>
            {currentTier !== undefined && Number(currentTier) <= 3 && (
              <div className="flex justify-between text-sm mb-2">
                <span className="font-pixel text-green-400 text-xs">EARLY BIRD BONUS (10%):</span>
                <span className="font-pixel text-green-400 text-xs">+{bonuses.earlyBonus.toFixed(2)} $MSTR</span>
              </div>
            )}
            {showReferral && referralAddress && (
              <div className="flex justify-between text-sm mb-2">
                <span className="font-pixel text-blue-400 text-xs">REFERRAL BONUS (5%):</span>
                <span className="font-pixel text-blue-400 text-xs">+{bonuses.referralBonus.toFixed(2)} $MSTR</span>
              </div>
            )}
            <div className="border-t-2 border-cyan-500/50 mt-3 pt-3 flex justify-between">
              <span className="font-pixel text-cyan-400 text-xs">TOTAL:</span>
              <span className="heading-pixel text-orange-400 text-xl text-pixel-glow">{bonuses.total.toFixed(2)} $MSTR</span>
            </div>
          </div>

          {/* Buy Button */}
          {!isConnected ? (
            <div className="flex justify-center">
              <div className="btn-pixel bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-cyan-700 px-8 py-4">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={isBuyingNoRef || isBuyingWithRef}
              className="btn-pixel w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-700 font-pixel text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isBuyingNoRef || isBuyingWithRef ? 'PROCESSING...' : 'BUY $MSTR'}
            </button>
          )}

          {/* Info */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="font-pixel text-cyan-400 text-xs">MINIMUM PURCHASE: 0.001 BNB</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="font-pixel text-green-400 text-xs">TOKENS TRANSFERRED INSTANTLY</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <p className="font-pixel text-yellow-400 text-xs">PRICE INCREASES WITH EACH TIER</p>
            </div>
            {currentTier !== undefined && Number(currentTier) <= 3 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <p className="font-pixel text-orange-400 text-xs">10% EARLY BIRD BONUS ACTIVE!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 