
import React from 'react';

interface HeroProps {
  onOpenVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenVoice }) => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-52 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-800/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-red-400 text-xs font-bold mb-8 animate-fade-in backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="uppercase tracking-widest">Global Standards • Local Execution</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[0.95]">
          Digital <span className="gradient-text">Employees</span> for Modern Business.
        </h1>
        
        <p className="text-lg sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Scale your local business with custom Generative AI agents. Automate your front desk, sales scoring, and creative marketing while you focus on growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all hover:scale-[1.02] shadow-2xl shadow-red-600/30 active:scale-95 text-center uppercase tracking-widest text-xs"
          >
            Book a Free AI Session
          </a>
          <button
            onClick={onOpenVoice}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/50 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            AI Voice Support
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto pt-12 border-t border-slate-800/60">
          <div>
            <div className="text-3xl font-black text-white">24/7</div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Autonomous Work</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">40h+</div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Weekly Saved</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">$0</div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Staff Overhead</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">10x</div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Lead Response</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
