import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther, parseEther } from 'viem';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PRESALE_ADDRESS = '0xeD9E181C38B1fF42d863B86b5879a761e1ab244a' as const;
const TOKEN_ADDRESS = '0x78e3efa2450239561F204D937F6A5a5f95DE5a06' as const;

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
  }
] as const;

export default function Presale() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [bnbAmount, setBnbAmount] = useState('');
  const [referralAddress, setReferralAddress] = useState('');
  const [showReferral, setShowReferral] = useState(false);

  // Contract reads
  const { data: currentTier } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'currentTier',
    watch: true,
  });

  const { data: currentPrice } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'nextPrice',
    watch: true,
  });

  const { data: totalSold } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'totalSold',
    watch: true,
  });

  const { data: totalRaised } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'totalRaised',
    watch: true,
  });

  const { data: buyerCount } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'buyerCount',
    watch: true,
  });

  const { data: totalPresaleTokens } = useContractRead({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'TOTAL_PRESALE_TOKENS',
  });

  // Buy functions
  const { write: buyWithoutReferral, isLoading: isBuyingNoRef } = useContractWrite({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'buy',
    args: [],
  });

  const { write: buyWithReferral, isLoading: isBuyingWithRef } = useContractWrite({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'buy',
    args: [referralAddress as `0x${string}`],
  });

  // Calculate token amount
  const calculateTokenAmount = (bnb: string) => {
    if (!currentPrice || !bnb || parseFloat(bnb) === 0) return '0';
    try {
      const bnbWei = parseEther(bnb);
      const pricePerToken = BigInt(currentPrice as string);
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
        await buyWithReferral?.({ value });
      } else {
        await buyWithoutReferral?.({ value });
      }
      
      toast.success('Transaction submitted!');
    } catch (error) {
      toast.error('Transaction failed');
      console.error(error);
    }
  };

  const soldPercentage = totalSold && totalPresaleTokens 
    ? (Number(formatEther(totalSold as bigint)) / Number(formatEther(totalPresaleTokens as bigint))) * 100
    : 0;

  const bonuses = calculateBonuses();

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          $MSTR Presale
        </h1>
        <p className="text-center text-gray-400 mb-12">Join the revolution early and get exclusive bonuses!</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm">Current Tier</p>
            <p className="text-2xl font-bold text-purple-400">{currentTier?.toString() || '1'}/50</p>
          </div>
          <div className="bg-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm">Current Price</p>
            <p className="text-2xl font-bold text-green-400">
              {currentPrice ? formatEther(currentPrice as bigint).substring(0, 8) : '0.0005'} BNB
            </p>
          </div>
          <div className="bg-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm">Total Raised</p>
            <p className="text-2xl font-bold text-yellow-400">
              {totalRaised ? formatEther(totalRaised as bigint).substring(0, 8) : '0'} BNB
            </p>
          </div>
          <div className="bg-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm">Participants</p>
            <p className="text-2xl font-bold text-blue-400">{buyerCount?.toString() || '0'}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{soldPercentage.toFixed(2)}% Sold</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{totalSold ? (Number(formatEther(totalSold as bigint)) / 1e9).toFixed(2) : '0'}B $MSTR</span>
            <span>3.5B $MSTR</span>
          </div>
        </div>

        {/* Buy Section */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
          {/* Referral Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg">Have a referral code?</span>
            <button
              onClick={() => setShowReferral(!showReferral)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showReferral ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showReferral ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {showReferral && (
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Referral Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={referralAddress}
                onChange={(e) => setReferralAddress(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <p className="text-xs text-green-400 mt-1">Get 5% bonus tokens with valid referral!</p>
            </div>
          )}

          {/* BNB Input */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Amount (BNB)</label>
            <input
              type="number"
              placeholder="0.1"
              value={bnbAmount}
              onChange={(e) => setBnbAmount(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-xl"
            />
          </div>

          {/* Token Calculation */}
          <div className="bg-black/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">You will receive:</span>
              <span className="text-xl font-bold">{calculateTokenAmount(bnbAmount)} $MSTR</span>
            </div>
            {currentTier && Number(currentTier) <= 3 && (
              <div className="flex justify-between text-sm text-green-400">
                <span>Early Bird Bonus (10%):</span>
                <span>+{bonuses.earlyBonus.toFixed(2)} $MSTR</span>
              </div>
            )}
            {showReferral && referralAddress && (
              <div className="flex justify-between text-sm text-blue-400">
                <span>Referral Bonus (5%):</span>
                <span>+{bonuses.referralBonus.toFixed(2)} $MSTR</span>
              </div>
            )}
            <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
              <span className="text-gray-400">Total:</span>
              <span className="text-2xl font-bold text-purple-400">{bonuses.total.toFixed(2)} $MSTR</span>
            </div>
          </div>

          {/* Buy Button */}
          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={isBuyingNoRef || isBuyingWithRef}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBuyingNoRef || isBuyingWithRef ? 'Processing...' : 'Buy $MSTR'}
            </button>
          )}

          {/* Info */}
          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <p>• Minimum purchase: 0.001 BNB</p>
            <p>• Tokens are transferred instantly to your wallet</p>
            <p>• Price increases with each tier</p>
            {currentTier && Number(currentTier) <= 3 && (
              <p className="text-green-400">• 10% Early Bird Bonus active for first 3 tiers!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 