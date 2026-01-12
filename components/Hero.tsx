
import React from 'react';

interface HeroProps {
  onOpenVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenVoice }) => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center flex flex-col items-center">
          {/* Centered Badge */}
          <div className="inline-block px-6 py-2 rounded-full bg-slate-900/50 border border-red-500/30 text-red-500 text-[10px] font-black mb-10 animate-fade-in uppercase tracking-[0.3em] backdrop-blur-sm">
            Silicon Valley Standard AI Deployment
          </div>

          {/* Centered Main Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-[110px] font-black text-white mb-10 leading-[1] tracking-tighter animate-fade-in">
            Hire Your Next <br/>
            <span className="inline-block bg-red-600 px-6 py-2 mt-2 transform -skew-x-2">Digital Employee.</span>
          </h1>

          {/* Centered Subtext */}
          <p className="text-xl sm:text-2xl text-slate-400 mb-14 font-light leading-relaxed animate-fade-in max-w-4xl" style={{ animationDelay: '0.1s' }}>
            Scale your local business with autonomous AI agents that handle bookings, 
            customer support, and lead generation 24/7.
          </p>

          {/* Centered Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
            <a
              href="#contact"
              className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 transition-all active:scale-95 text-center min-w-[240px]"
            >
              Book Neural Audit
            </a>
            <button
              onClick={onOpenVoice}
              className="w-full sm:w-auto bg-slate-900/80 border border-white/10 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 min-w-[240px]"
            >
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              Talk to AI Support
            </button>
          </div>
        </div>
      </div>

      {/* Centered Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-red-600/10 blur-[150px] rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
