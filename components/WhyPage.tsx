
import React from 'react';

// Fix: Standardized onNavigate type across all page components
interface WhyPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi' | 'reset-password') => void;
}

const WhyPage: React.FC<WhyPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in bg-[#020617]">
      {/* 1. Hero Section - Matching Screenshot Precisely */}
      <section className="relative pt-40 pb-24 lg:pt-60 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-950/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-950/20 blur-[150px] rounded-full"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="text-left">
              <h1 className="text-[60px] sm:text-8xl lg:text-[120px] 2xl:text-[140px] font-black text-white mb-12 leading-[0.9] tracking-tighter">
                The <span className="text-red-600">Unfair</span> <br/>Advantage You <br/>Can’t Hire.
              </h1>
              <p className="text-xl sm:text-2xl text-slate-400 mb-16 font-light leading-relaxed max-w-xl">
                Traditional hiring is slow, expensive, and limited by biology. <span className="text-white font-bold uppercase tracking-widest text-sm bg-white/5 px-2 py-1 rounded">InFlow Digital Employees</span> are instant, infinite, and work 24/7 without burnout.
              </p>
              
              <div className="p-1 inline-block rounded-2xl border-2 border-[#6C28FF]/50 shadow-[0_0_40px_rgba(108,40,255,0.2)]">
                <button 
                  onClick={() => onNavigate('roi')}
                  className="bg-[#6C28FF] hover:bg-[#7d45ff] text-white px-12 py-6 rounded-[0.9rem] text-[13px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  CALCULATE YOUR ROI
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-indigo-600/10 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative glass-card rounded-[4rem] p-1.5 border-white/10 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-2 bg-slate-950/90 rounded-[3.8rem] overflow-hidden">
                  <div className="p-16 border-r border-white/5 flex flex-col items-center justify-center text-center group">
                    <div className="text-5xl mb-8 group-hover:rotate-12 transition-transform duration-500">⏰</div>
                    <div className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em] mb-4">Human Staff</div>
                    <div className="text-white font-black text-2xl leading-tight">Ticking <br/>Clock</div>
                    <div className="mt-8 w-16 h-1 bg-red-600/30 rounded-full"></div>
                  </div>
                  <div className="p-16 flex flex-col items-center justify-center text-center group">
                    <div className="text-6xl mb-8 animate-pulse duration-500">♾️</div>
                    <div className="text-[#06E4DA] text-[11px] font-black uppercase tracking-[0.3em] mb-4">Digital Employee</div>
                    <div className="text-white font-black text-2xl leading-tight">Infinite <br/>Loop</div>
                    <div className="mt-8 w-16 h-1 bg-[#06E4DA]/50 shadow-[0_0_15px_rgba(6,228,218,0.5)] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Comparison Matrix */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[11px] text-red-500 font-black uppercase tracking-[0.5em] mb-6">Efficiency Gap</h2>
            <h3 className="text-4xl sm:text-6xl font-black text-white mb-6">The Broken Employment Model</h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Scaling usually hits a bottleneck: Humans. We fixed the bottleneck.</p>
          </div>

          <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-3xl">
            <div className="grid grid-cols-2 bg-slate-900/50 border-b border-white/5">
              <div className="p-10 text-center text-slate-500 font-black uppercase tracking-widest text-[11px]">Traditional Hiring</div>
              <div className="p-10 text-center text-[#06E4DA] font-black uppercase tracking-widest text-[11px] bg-[#06E4DA]/5">InFlow Digital Workforce</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {[
                { label: "Speed", trad: "Weeks to hire & train", inflow: "Deploys in 3–7 days", icon: "⏳" },
                { label: "Cost", trad: "Salaries, benefits, overhead", inflow: "Save up to 70% on operations", icon: "💸" },
                { label: "Availability", trad: "8-hour shifts, weekends off", inflow: "Works 24/7/365", icon: "😴" },
                { label: "Precision", trad: "Human fatigue & oversight", inflow: "100% adherence to SOPs", icon: "⚠️" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 group hover:bg-white/[0.02] transition-all">
                  <div className="p-12 flex flex-col justify-center border-r border-white/5">
                    <div className="text-red-500/60 mb-3 flex items-center gap-3">
                      <span className="text-lg">✕</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">{row.label}</span>
                    </div>
                    <p className="text-slate-400 font-medium">{row.trad}</p>
                  </div>
                  <div className="p-12 flex flex-col justify-center bg-[#06E4DA]/[0.02]">
                    <div className="text-[#06E4DA] mb-3 flex items-center gap-3">
                      <span className="text-lg">✓</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">{row.label}</span>
                    </div>
                    <p className="text-white font-black">{row.inflow}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-32">
            <h2 className="text-red-500 font-black tracking-[0.5em] uppercase text-[11px] mb-8">Engineering Excellence</h2>
            <h3 className="text-5xl sm:text-7xl font-black text-white">The Four Pillars of InFlow</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                id: "01", 
                title: "Zero-Friction Integration", 
                desc: "We don’t ask you to change your software. We build agents that live inside Tally, Zoho, Shopify, and WhatsApp.",
                icon: "🔌"
              },
              { 
                id: "02", 
                title: "Built for Speed", 
                desc: "Our employees come pre-loaded with industry workflows. Go from 'Signed' to 'Live' in under a week.",
                icon: "🚀"
              },
              { 
                id: "03", 
                title: "Local Intelligence", 
                desc: "Global AI quality combined with local context: GST compliance, UPI payments, and WhatsApp-first culture.",
                icon: "🌍"
              },
              { 
                id: "04", 
                title: "Scalability on Demand", 
                desc: "Scale your workforce up or down instantly. Pay for outcomes, not idle time during off-seasons.",
                icon: "📈"
              }
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-12 rounded-[3.5rem] border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-3 group">
                <div className="text-6xl mb-12 group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
                <div className="text-slate-600 text-[11px] font-black uppercase tracking-[0.4em] mb-6">{pillar.id}</div>
                <h4 className="text-2xl font-black text-white mb-6 leading-tight">{pillar.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Stats */}
      <section className="py-32 bg-slate-950 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 text-center">
            <div>
              <div className="text-[70px] lg:text-[90px] font-black text-white mb-4 tracking-tighter leading-none">30-70%</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#6C28FF] font-black">Admin Reduction</div>
            </div>
            <div>
              <div className="text-[70px] lg:text-[90px] font-black text-white mb-4 tracking-tighter leading-none">40-60%</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#06E4DA] font-black">Less No-Shows</div>
            </div>
            <div>
              <div className="text-[70px] lg:text-[90px] font-black text-white mb-4 tracking-tighter leading-none">20-35%</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-red-500 font-black">Conversion Uplift</div>
            </div>
            <div>
              <div className="text-[70px] lg:text-[90px] font-black text-[#06E4DA] mb-4 tracking-tighter leading-none">7-14D</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-slate-600 font-black">Faster Collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="relative py-48 lg:py-64 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-red-600/5 blur-[200px] -z-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl sm:text-8xl font-black text-white mb-12 leading-[0.9] tracking-tighter uppercase italic">Stop Managing Tasks. <br/><span className="text-red-600">Start Owning Results.</span></h2>
          <p className="text-xl sm:text-2xl text-slate-400 mb-16 font-light">Your competition is still sleeping. Your new workforce is ready to start now.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <button 
              onClick={() => onNavigate('roi')}
              className="w-full sm:w-auto bg-white text-slate-950 px-16 py-7 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest transition-all hover:bg-red-600 hover:text-white shadow-2xl active:scale-95"
            >
              Hire Your First Employee
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto bg-slate-900 border border-white/10 hover:border-white/20 text-white px-16 py-7 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest transition-all active:scale-95"
            >
              View Industry Demos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyPage;
