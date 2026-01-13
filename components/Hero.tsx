
import React from 'react';

interface HeroProps {
  onOpenVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenVoice }) => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Centered/Left Badge */}
            <div className="inline-block px-6 py-2 rounded-full bg-slate-900/80 border border-red-500/20 text-red-500 text-[10px] font-black mb-12 animate-fade-in uppercase tracking-[0.3em] backdrop-blur-md">
              Silicon Valley Standard AI Deployment
            </div>

            {/* Screenshot-Style Stacked Heading */}
            <h1 className="flex flex-col items-center lg:items-start text-[52px] sm:text-7xl lg:text-[100px] font-black leading-[1] tracking-tighter mb-10 animate-fade-in">
              <span className="text-white">Hire Your Next</span>
              <span className="text-red-500 mt-2">— Digital</span>
              <span className="text-red-500">Employee.</span>
            </h1>

            {/* Centered/Left Subtext */}
            <p className="text-xl text-slate-400 mb-14 font-light leading-relaxed animate-fade-in max-w-2xl" style={{ animationDelay: '0.1s' }}>
              Scale your local business with <span className="text-white font-bold">Digital Employees</span> that handle bookings, customer support, and lead generation 24/7.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
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

          {/* Right Side: Comparison Element (inspired by screenshot) */}
          <div className="hidden lg:block flex-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative glass-card rounded-[3rem] p-1 border-white/10 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 bg-slate-950/80 rounded-[2.9rem] overflow-hidden">
                <div className="p-12 border-r border-white/5 flex flex-col items-center justify-center text-center group">
                  <div className="text-4xl mb-6 group-hover:rotate-12 transition-transform">⏰</div>
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Human Staff</div>
                  <div className="text-white font-bold text-xl leading-tight">Biological <br/>Limits</div>
                  <div className="mt-6 w-12 h-0.5 bg-red-500/30"></div>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-center group">
                  <div className="text-5xl mb-6 animate-pulse">♾️</div>
                  <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Digital Employee</div>
                  <div className="text-white font-bold text-xl leading-tight">Infinite <br/>Scalability</div>
                  <div className="mt-6 w-12 h-0.5 bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-600/10 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

export default Hero;
