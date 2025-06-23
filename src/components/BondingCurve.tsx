import { useEffect, useRef, useState } from 'react';
import { useReadContract, useWatchContractEvent } from 'wagmi';
import { formatEther } from 'viem';

const PRESALE_ADDRESS = '0x52b8dD7253BE47f3076b918800b96797a45c8795' as const;

const PRESALE_ABI = [
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
    "name": "TOTAL_PRESALE_TOKENS",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "INITIAL_PRICE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FINAL_PRICE",
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

interface BondingCurveProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function BondingCurve({ width = 800, height = 400, className = "" }: BondingCurveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Real-time contract data with refetch capabilities
  const { data: currentTier, refetch: refetchTier } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'currentTier',
    query: { refetchInterval: 3000 },
  });

  const { data: currentPrice, refetch: refetchPrice } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'nextPrice',
    query: { refetchInterval: 3000 },
  });

  const { data: totalSold, refetch: refetchTotalSold } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'totalSold',
    query: { refetchInterval: 1500 }, // Faster updates for smooth curve animation
  });

  const { data: totalPresaleTokens } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'TOTAL_PRESALE_TOKENS',
  });

  const { data: initialPrice } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'INITIAL_PRICE',
  });

  const { data: finalPrice } = useReadContract({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'FINAL_PRICE',
  });

  // Watch for Bought events for instant real-time updates
  useWatchContractEvent({
    address: PRESALE_ADDRESS,
    abi: PRESALE_ABI,
    eventName: 'Bought',
    onLogs(logs) {
      console.log('🎯 Bonding Curve: New purchase detected!', logs);
      // Instantly update all curve data
      refetchTotalSold();
      refetchTier();
      refetchPrice();
      
      // Visual feedback: flash the curve and update timestamp
      setIsFlashing(true);
      setLastUpdate(Date.now());
      setAnimationProgress(0);
      
      // Remove flash effect after animation
      setTimeout(() => setIsFlashing(false), 1000);
    },
  });

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 0.01) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update timestamp when data changes
  useEffect(() => {
    setLastUpdate(Date.now());
  }, [currentTier, currentPrice, totalSold]);

  // Calculate how fresh the data is
  const getDataFreshness = () => {
    const timeSinceUpdate = currentTime - lastUpdate;
    if (timeSinceUpdate < 5000) return { status: 'LIVE', color: 'text-green-400' };
    if (timeSinceUpdate < 15000) return { status: 'FRESH', color: 'text-yellow-400' };
    return { status: 'STALE', color: 'text-red-400' };
  };

  const freshness = getDataFreshness();

  // Update current time every second for real-time display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate curve points using exponential easing
  const generateCurvePoints = () => {
    const points: { x: number; y: number }[] = [];
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    for (let i = 0; i <= 50; i++) {
      const progress = i / 50;
      // Create exponential curve that looks organic
      const exponentialProgress = Math.pow(progress, 0.4); // Exponential easing
      const x = padding + (progress * chartWidth);
      const y = height - padding - (exponentialProgress * chartHeight);
      points.push({ x, y });
    }
    return points;
  };

  // Generate curve path
  const generateCurvePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const _prev = points[i - 1];
      const current = points[i];
      const next = points[i + 1];
      
      // Create smooth curves using quadratic bezier curves
      if (next) {
        const controlX = current.x;
        const controlY = current.y;
        path += ` Q ${controlX} ${controlY} ${(current.x + next.x) / 2} ${(current.y + next.y) / 2}`;
      } else {
        path += ` L ${current.x} ${current.y}`;
      }
    }
    
    return path;
  };

  const points = generateCurvePoints();
  const curvePath = generateCurvePath(points);

  // Calculate current position
  const currentTierNum = currentTier ? Number(currentTier) : 1;
  const currentProgress = Math.min(currentTierNum / 50, 1);
  const currentPoint = points[Math.floor(currentProgress * 50)] || points[0];

  // Price formatting
  const formatPrice = (price: bigint | undefined) => {
    if (!price) return '0.0005';
    return parseFloat(formatEther(price)).toFixed(6);
  };

  const startPrice = initialPrice ? formatPrice(initialPrice) : '0.0005';
  const endPrice = finalPrice ? formatPrice(finalPrice) : '0.005';
  const currentPriceFormatted = currentPrice ? formatPrice(currentPrice) : startPrice;

  // Progress percentage with high precision for small amounts
  const calculateProgress = () => {
    if (!totalSold || !totalPresaleTokens) return 0;
    
    // Use BigInt arithmetic for precision, then convert
    const sold = totalSold as bigint;
    const total = totalPresaleTokens as bigint;
    
    // Multiply by 10000 to get 4 decimal places, then divide by 100 for percentage
    const progressBigInt = (sold * BigInt(10000)) / total;
    const progress = Number(progressBigInt) / 100;
    
    return progress;
  };

  const progressPercentage = calculateProgress();

  // Format progress with appropriate decimal places
  const formatProgress = (progress: number) => {
    if (progress === 0) return '0.000';
    if (progress < 0.001) return progress.toFixed(6);
    if (progress < 0.01) return progress.toFixed(4);
    if (progress < 1) return progress.toFixed(3);
    return progress.toFixed(2);
  };

  // Debug values (remove this later)
  useEffect(() => {
    if (totalSold && totalPresaleTokens) {
      console.log('🔍 Bonding Curve Debug:', {
        totalSold: totalSold.toString(),
        totalPresaleTokens: totalPresaleTokens.toString(),
        totalSoldEther: formatEther(totalSold),
        totalPresaleEther: formatEther(totalPresaleTokens),
        progressPercentage: progressPercentage,
        formattedProgress: formatProgress(progressPercentage)
      });
    }
  }, [totalSold, totalPresaleTokens, progressPercentage]);

  return (
    <div className={`card-pixel bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border-cyan-500 p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={`heading-pixel text-cyan-400 text-lg text-pixel-glow ${isFlashing ? 'animate-pulse' : ''}`}>
          PRICE DISCOVERY CURVE
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors ${
            freshness.status === 'LIVE' ? 'bg-green-400 animate-pulse' :
            freshness.status === 'FRESH' ? 'bg-yellow-400' : 'bg-red-400'
          }`}></div>
          <span className={`font-pixel text-xs ${freshness.color}`}>
            {freshness.status}
          </span>
          <span className="font-pixel text-gray-500 text-xs ml-2">
            {Math.floor((currentTime - lastUpdate) / 1000)}s
          </span>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="font-pixel text-cyan-400 text-xs mb-1">CURRENT TIER</p>
          <p className="heading-pixel text-white text-lg text-pixel-glow">{currentTierNum}/50</p>
        </div>
        <div className="text-center">
          <p className="font-pixel text-cyan-400 text-xs mb-1">CURRENT PRICE</p>
          <p className="heading-pixel text-green-400 text-lg text-pixel-glow">{currentPriceFormatted}</p>
        </div>
        <div className="text-center">
          <p className="font-pixel text-cyan-400 text-xs mb-1">PROGRESS</p>
          <p className="heading-pixel text-orange-400 text-lg text-pixel-glow">{formatProgress(progressPercentage)}%</p>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 191, 255, 0.1)" strokeWidth="1"/>
            </pattern>
            
            {/* Gradients */}
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>
            
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
              <stop offset="70%" stopColor="#00FFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width={width} height={height} fill="url(#grid)" opacity="0.3" />

          {/* Y-Axis */}
          <line x1="60" y1="60" x2="60" y2={height - 60} stroke="#00BFFF" strokeWidth="2" opacity="0.7" />
          
          {/* X-Axis */}
          <line x1="60" y1={height - 60} x2={width - 60} y2={height - 60} stroke="#00BFFF" strokeWidth="2" opacity="0.7" />

          {/* Y-Axis Labels */}
          <text x="30" y="70" className="font-pixel text-xs fill-cyan-400">{endPrice}</text>
          <text x="30" y={height - 70} className="font-pixel text-xs fill-cyan-400">{startPrice}</text>
          
          {/* X-Axis Labels */}
          <text x="60" y={height - 30} className="font-pixel text-xs fill-cyan-400">0%</text>
          <text x={width - 80} y={height - 30} className="font-pixel text-xs fill-cyan-400">100%</text>

          {/* Axis Titles */}
          <text x={width / 2} y={height - 10} textAnchor="middle" className="font-pixel text-sm fill-cyan-400">
            PRESALE PROGRESS
          </text>
          <text x="20" y={height / 2} textAnchor="middle" transform={`rotate(-90, 20, ${height / 2})`} className="font-pixel text-sm fill-cyan-400">
            TOKEN PRICE (BNB)
          </text>

          {/* Area under curve */}
          <path
            d={`${curvePath} L ${width - 60} ${height - 60} L 60 ${height - 60} Z`}
            fill="url(#areaGradient)"
            opacity="0.6"
          />

          {/* Main Curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth={isFlashing ? "6" : "4"}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: isFlashing 
                ? 'drop-shadow(0 0 16px rgba(6, 182, 212, 1))' 
                : 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
              strokeDasharray: currentProgress < 1 ? `${currentProgress * 1000} 1000` : 'none',
              transition: 'all 0.3s ease'
            }}
          />

          {/* Current Position Glow */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r="20"
            fill="url(#glowGradient)"
            opacity={0.3 + Math.sin(animationProgress * Math.PI * 2) * 0.2}
          />

          {/* Current Position Marker */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r="8"
            fill="#00FFFF"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity={0.9 + Math.sin(animationProgress * Math.PI * 4) * 0.1}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8))' }}
          />

          {/* Current Position Label */}
          <g transform={`translate(${currentPoint.x}, ${currentPoint.y - 30})`}>
            <rect x="-40" y="-15" width="80" height="20" rx="10" fill="rgba(0, 0, 0, 0.8)" stroke="#00FFFF" strokeWidth="1" />
            <text x="0" y="-2" textAnchor="middle" className="font-pixel text-xs fill-cyan-400">
              TIER {currentTierNum}
            </text>
          </g>

          {/* Price Milestones */}
          {[10, 20, 30, 40, 50].map(tier => {
            const point = points[tier - 1];
            return (
              <g key={tier}>
                <circle cx={point.x} cy={point.y} r="3" fill="#F59E0B" opacity="0.7" />
                <text x={point.x} y={point.y - 10} textAnchor="middle" className="font-pixel text-xs fill-yellow-400">
                  T{tier}
                </text>
              </g>
            );
          })}

          {/* Animated particles along curve */}
          {[0, 0.3, 0.6].map((offset, i) => {
            const progress = (animationProgress + offset) % 1;
            const pointIndex = Math.floor(progress * (points.length - 1));
            const point = points[pointIndex];
            return (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="2"
                fill="#00FFFF"
                opacity={0.6}
                style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))' }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded"></div>
          <span className="font-pixel text-xs text-gray-400">PRICE CURVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <span className="font-pixel text-xs text-gray-400">CURRENT POSITION</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="font-pixel text-xs text-gray-400">TIER MILESTONES</span>
        </div>
      </div>
    </div>
  );
} 