
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onOpenVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenVoice }) => {
  const [activeDept, setActiveDept] = useState(0);

  const departments = [
    { id: 'MDE', name: 'Marketing', desc: 'Growth Engine', color: '#6C28FF', icon: '📢', status: 'OPTIMIZING' },
    { id: 'SDE', name: 'Sales', desc: 'Instant Closer', color: '#DC2626', icon: '🤝', status: 'CONVERTING' },
    { id: 'HDE', name: 'HR', desc: 'People Ops', color: '#06E4DA', icon: '📋', status: 'SCREENING' },
    { id: 'FDE', name: 'Finance', desc: 'Ledger Control', color: '#FACC15', icon: '💰', status: 'RECONCILING' },
    { id: 'ODE', name: 'Operations', desc: 'Workflow Core', color: '#EF4444', icon: '⚙️', status: 'RESOLVING' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDept((prev) => (prev + 1) % departments.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0a0f1d] border border-red-500/20 text-red-500 text-[10px] font-black mb-10 animate-fade-in uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(239,68,68,0.1)]">
              SILICON VALLEY STANDARD AI DEPLOYMENT
            </div>

            <h1 className="flex flex-col text-[50px] sm:text-[80px] lg:text-[100px] xl:text-[120px] font-[900] leading-[0.85] tracking-[-0.04em] mb-10 animate-fade-in select-none">
              <span className="text-white">Hire Your</span>
              <span className="text-white">Next —</span>
              <span className="text-red-500">Digital</span>
              <span className="text-red-500">Employee.</span>
            </h1>

            <div className="max-w-lg animate-fade-in mb-12" style={{ animationDelay: '0.1s' }}>
              <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed">
                Scale your enterprise with <span className="text-white font-bold">Autonomous Agents</span> that handle the high-volume friction of customer operations, 24/7, without biological limits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
              <a
                href="#contact"
                className="w-full sm:w-auto bg-red-600 hover:bg-[#ff3b3b] text-white px-10 py-5 rounded-[1.1rem] text-[12px] font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_-10px_rgba(239,68,68,0.4)] transition-all active:scale-95 text-center min-w-[260px]"
              >
                Book Neural Audit
              </a>
              <button
                onClick={onOpenVoice}
                className="w-full sm:w-auto bg-slate-900/40 border border-white/10 hover:border-white/30 hover:bg-slate-800 text-white px-10 py-5 rounded-[1.1rem] text-[12px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 min-w-[260px] backdrop-blur-xl"
              >
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                Live AI Support
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 opacity-40 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Neural Uptime</span>
                <span className="text-white font-bold text-xs tracking-tighter">99.98% / 24/7</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Encryption</span>
                <span className="text-white font-bold text-xs tracking-tighter">AES-256 Cloud</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Service Component */}
          <div className="hidden lg:block lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative max-w-[480px] ml-auto">
              <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full opacity-50"></div>
              
              <div className="relative glass-card rounded-[3.5rem] p-1.5 border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="bg-[#020617] rounded-[3.3rem] overflow-hidden flex flex-col h-[520px]">
                  
                  {/* Dashboard Header */}
                  <div className="p-10 border-b border-white/5 bg-slate-950/50">
                    <div className="flex justify-between items-center mb-6">
                       <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.3em]">Neural Command Center</span>
                       <div className="flex gap-1.5">
                          {departments.map((_, i) => (
                            <div key={i} className={`w-3 h-1 rounded-full transition-all duration-500 ${activeDept === i ? 'bg-red-500 w-6' : 'bg-slate-800'}`}></div>
                          ))}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4 transition-all duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-4xl shadow-inner overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-10 animate-pulse" style={{ backgroundColor: departments[activeDept].color }}></div>
                        {departments[activeDept].icon}
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white tracking-tighter">{departments[activeDept].id} Agent</div>
                        <div className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: departments[activeDept].color }}>
                          {departments[activeDept].name} Department
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Protocol Area */}
                  <div className="flex-1 p-10 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="space-y-8">
                      <div>
                        <div className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Active Protocol</div>
                        <div className="text-2xl font-bold text-white tracking-tight">{departments[activeDept].desc}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Status</div>
                          <div className="text-xs font-black text-[#06E4DA] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#06E4DA] rounded-full animate-pulse"></span>
                            {departments[activeDept].status}
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Efficiency</div>
                          <div className="text-xs font-black text-white">99.9%</div>
                        </div>
                      </div>

                      {/* Animated Waveform / Progress */}
                      <div className="relative pt-4">
                        <div className="flex gap-1 items-end h-8 mb-4">
                          {[...Array(20)].map((_, i) => (
                            <div 
                              key={i} 
                              className="flex-1 bg-red-500/30 rounded-full transition-all duration-500"
                              style={{ 
                                height: `${Math.random() * 100}%`,
                                backgroundColor: i % 3 === 0 ? departments[activeDept].color : 'rgba(239,68,68,0.2)'
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="h-1 w-full bg-slate-900 rounded-full relative overflow-hidden">
                           <div 
                             className="absolute inset-y-0 left-0 bg-white transition-all duration-[3000ms] linear"
                             style={{ width: '100%' }}
                             key={activeDept}
                           ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* System Footer Badge */}
                  <div className="px-10 py-6 bg-slate-950/50 flex justify-between items-center border-t border-white/5">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">DigitalEmployee.me Neural Core v4.0</span>
                    <div className="text-white text-[10px] font-black">ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 right-[-5%] w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-[-5%] w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>
    </section>
  );
};

export default Hero;
