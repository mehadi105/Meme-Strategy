import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Presale from './components/Presale';
import { Toaster } from 'react-hot-toast';

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-tron-grid relative overflow-x-hidden">
        {/* Tron-Style Grid Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Deep Navy Radial Gradient Base */}
          <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-blue-950 to-black"></div>
          
          {/* 3D Perspective Grid Floor */}
          <div className="absolute inset-0 opacity-40">
            <div 
              className="absolute bottom-0 left-0 w-full h-full grid-perspective"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 191, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 191, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                transform: 'perspective(1000px) rotateX(75deg) translateY(50%)',
                transformOrigin: 'bottom center',
                filter: 'drop-shadow(0 0 8px rgba(0, 191, 255, 0.5))'
              }}
            ></div>
          </div>

          {/* Vertical Grid Walls */}
          <div className="absolute inset-0 opacity-20 hidden lg:block">
            {/* Left Wall */}
            <div 
              className="absolute left-0 top-0 w-1/2 h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 191, 255, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'perspective(800px) rotateY(45deg)',
                transformOrigin: 'left center',
                filter: 'drop-shadow(0 0 4px rgba(0, 191, 255, 0.3))'
              }}
            ></div>
            
            {/* Right Wall */}
            <div 
              className="absolute right-0 top-0 w-1/2 h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 191, 255, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'perspective(800px) rotateY(-45deg)',
                transformOrigin: 'right center',
                filter: 'drop-shadow(0 0 4px rgba(0, 191, 255, 0.3))'
              }}
            ></div>
          </div>

          {/* Center Glow Effect */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          {/* Floating Grid Particles - Reduced for performance */}
          <div className="absolute top-0 left-0 w-full h-full hidden lg:block">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  boxShadow: '0 0 4px rgba(0, 191, 255, 0.8)'
                }}
              ></div>
            ))}
          </div>

          {/* Scan Lines Effect - Reduced opacity for performance */}
          <div className="absolute inset-0 opacity-5 hidden lg:block">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 191, 255, 0.1) 2px, rgba(0, 191, 255, 0.1) 4px)',
                animation: 'scanlines 2s linear infinite'
              }}
            ></div>
          </div>
        </div>

        {/* Top Ticker */}
        <Ticker position="top" />

        {/* Main Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/presale" element={<Presale />} />
          </Routes>
        </div>

        {/* Bottom Ticker */}
        <Ticker position="bottom" />
      </div>
    </Router>
  );
}

export default App;