import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerProps {
  position: 'top' | 'bottom';
}

interface CoinData {
  symbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const Ticker: React.FC<TickerProps> = ({ position }) => {
  const [tickerData, setTickerData] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Coins to track with their CoinGecko IDs
  const coinsToTrack = [
    { id: 'bitcoin', symbol: 'BTC' },
    { id: 'ethereum', symbol: 'ETH' },
    { id: 'dogecoin', symbol: 'DOGE' },
    { id: 'pepe', symbol: 'PEPE' },
    { id: 'shiba-inu', symbol: 'SHIB' },
    { id: 'dogwifcoin', symbol: 'WIF' },
    { id: 'bonk', symbol: 'BONK' },
    { id: 'floki', symbol: 'FLOKI' },
    { id: 'solana', symbol: 'SOL' },
    { id: 'binancecoin', symbol: 'BNB' },
    { id: 'tether', symbol: 'USDT' },
    { id: 'usd-coin', symbol: 'USDC' }
  ];

  const fetchPrices = async () => {
    try {
      const coinIds = coinsToTrack.map(coin => coin.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      
      const formattedData: CoinData[] = coinsToTrack.map(coin => {
        const coinData = data[coin.id];
        if (!coinData) return null;
        
        const price = coinData.usd;
        const change24h = coinData.usd_24h_change || 0;
        
        // Format price based on value
        const formattedPrice = price >= 1 
          ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
          : `$${price.toFixed(6)}`;
        
        // Format change percentage
        const formattedChange = `${change24h >= 0 ? '+' : ''}${change24h.toFixed(2)}%`;
        
        // Determine trend
        const trend = change24h > 0.1 ? 'up' : change24h < -0.1 ? 'down' : 'neutral';
        
        return {
          symbol: coin.symbol,
          price: formattedPrice,
          change: formattedChange,
          trend
        };
      }).filter(Boolean) as CoinData[];
      
      setTickerData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cryptocurrency prices:', error);
      // Fallback to static data if API fails
      const fallbackData: CoinData[] = [
        { symbol: 'BTC', price: '$97,234', change: '+2.34%', trend: 'up' },
        { symbol: 'ETH', price: '$3,456', change: '+1.87%', trend: 'up' },
        { symbol: 'DOGE', price: '$0.404', change: '+3.98%', trend: 'up' },
        { symbol: 'PEPE', price: '$0.000011', change: '+7.98%', trend: 'up' },
        { symbol: 'SHIB', price: '$0.000014', change: '-1.98%', trend: 'down' },
        { symbol: 'WIF', price: '$1.332', change: '+9.98%', trend: 'up' },
        { symbol: 'BONK', price: '$0.000002', change: '+11.98%', trend: 'up' },
        { symbol: 'FLOKI', price: '$0.000001', change: '-8.98%', trend: 'down' },
        { symbol: 'SOL', price: '$234.56', change: '+4.23%', trend: 'up' },
        { symbol: 'BNB', price: '$678.90', change: '+2.15%', trend: 'up' },
        { symbol: 'USDT', price: '$1.00', change: '0.00%', trend: 'neutral' },
        { symbol: 'USDC', price: '$1.00', change: '0.00%', trend: 'neutral' }
      ];
      setTickerData(fallbackData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPrices();
    
    // Set up interval to update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Show loading state initially
  if (isLoading) {
    return (
      <div className={`${position === 'top' ? 'fixed top-0' : 'relative'} left-0 right-0 z-40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 ${position === 'top' ? 'border-cyan-500' : 'border-t-2 border-cyan-500'} overflow-hidden`}>
        <div className="relative h-10 flex items-center justify-center">
          <span className="font-pixel text-cyan-300 text-xs animate-pulse">Loading live prices...</span>
        </div>
      </div>
    );
  }

  // Duplicate the data for seamless loop
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className={`${position === 'top' ? 'fixed top-0' : 'relative'} left-0 right-0 z-40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-2 ${position === 'top' ? 'border-cyan-500' : 'border-t-2 border-cyan-500'} overflow-hidden`}>
      <div className="relative h-10 flex items-center">
        {/* Scrolling ticker content */}
        <div className="flex animate-scroll-left whitespace-nowrap">
          {duplicatedData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-6 flex-shrink-0">
              <span className="font-pixel text-white text-xs">{item.symbol}</span>
              <span className="font-pixel text-gray-300 text-xs">{item.price}</span>
              <div className="flex items-center space-x-1">
                {item.trend === 'up' && <TrendingUp className="text-green-400" size={12} />}
                {item.trend === 'down' && <TrendingDown className="text-red-400" size={12} />}
                <span className={`font-pixel text-xs ${
                  item.trend === 'up' ? 'text-green-400' : 
                  item.trend === 'down' ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {item.change}
                </span>
              </div>
              <div className="w-px h-4 bg-gray-600 mx-2"></div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Ticker;