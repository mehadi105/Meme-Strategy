import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerProps {
  position: 'top' | 'bottom';
}

const Ticker: React.FC<TickerProps> = ({ position }) => {
  const tickerData = [
    { symbol: 'BTC', price: '$97,234', change: '+2.34%', trend: 'up' },
    { symbol: 'ETH', price: '$3,456', change: '+1.87%', trend: 'up' },
    { symbol: 'DOGE', price: '$0.404', change: '+3.98%', trend: 'up' },
    { symbol: 'PEPE', price: '$11.372', change: '+7.98%', trend: 'up' },
    { symbol: 'SHIB', price: '$1.363', change: '-1.98%', trend: 'down' },
    { symbol: 'WIF', price: '$1.332', change: '+9.98%', trend: 'up' },
    { symbol: 'BONK', price: '$0.002', change: '+11.98%', trend: 'up' },
    { symbol: 'FLOKI', price: '$0.001', change: '-8.98%', trend: 'down' },
    { symbol: 'SOL', price: '$234.56', change: '+4.23%', trend: 'up' },
    { symbol: 'BNB', price: '$678.90', change: '+2.15%', trend: 'up' },
    { symbol: 'USDT', price: '$1.00', change: '0.00%', trend: 'neutral' },
    { symbol: 'USDC', price: '$1.00', change: '0.00%', trend: 'neutral' }
  ];

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