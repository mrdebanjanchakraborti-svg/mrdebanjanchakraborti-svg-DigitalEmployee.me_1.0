import React from 'react';

interface WhyPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why') => void;
}

const WhyPage: React.FC<WhyPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in bg-[#071027]">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#6C28FF]/15 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#06E4DA]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
                The <span className="text-red-500">Unfair</span> Advantage You Can’t Hire.
              </h1>
              <p className="text-xl sm:text-2xl text-slate-400 mb-12 font-light leading-relaxed max-w-xl">
                Traditional hiring is slow, expensive, and limited by biology. <span className="text-white font-bold">InFlow Digital Employees</span> are instant, infinite, and work 24/7 without burnout.
              </p>
              <button 
                onClick={() => onNavigate('home')}
                className="bg-[#6C28FF] hover:bg-[#5a1ee0] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#6C28FF]/20 transition-all active:scale-95"
              >
                Calculate Your ROI
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C28FF]/20 to-[#06E4DA]/20 blur-3xl rounded-full opacity-30"></div>
              <div className="relative glass-card rounded-[3rem] p-1 border-white/10 overflow-hidden">
                <div className="grid grid-cols-2 bg-slate-950/80 rounded-[2.9rem] overflow-hidden">
                  <div className="p-8 border-r border-white/5 flex flex-col items-center justify-center text-center group">
                    <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">⏰</div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Human Staff</div>
                    <div className="text-white font-bold text-lg">Ticking Clock</div>
                    <div className="mt-4 w-12 h-0.5 bg-red-500/30"></div>
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center text-center group">
                    <div className="text-5xl mb-4 animate-pulse">♾️</div>
                    <div className="text-[#06E4DA] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Digital Employee</div>
                    <div className="text-white font-bold text-lg">Infinite Loop</div>
                    <div className="mt-4 w-12 h-0.5 bg-[#06E4DA]/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Comparison Table */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">The Broken Employment Model</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Scaling usually hits a bottleneck: Operations. We fixed it.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
            <div className="grid grid-cols-2 bg-slate-900/50 border-b border-white/5">
              <div className="p-6 text-center text-slate-500 font-black uppercase tracking-widest text-xs">Traditional Hiring</div>
              <div className="p-6 text-center text-[#06E4DA] font-black uppercase tracking-widest text-xs bg-[#06E4DA]/5">InFlow Digital Workforce</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {[
                { label: "Speed", trad: "Weeks to hire & train", inflow: "Deploys in 3–7 days", icon: "⏳" },
                { label: "Cost", trad: "Salaries, benefits, overhead", inflow: "Save up to 70% on operations", icon: "💸" },
                { label: "Availability", trad: "8-hour shifts, weekends off", inflow: "Works 24/7/365", icon: "😴" },
                { label: "Precision", trad: "Human fatigue & oversight", inflow: "100% adherence to SOPs", icon: "⚠️" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 group hover:bg-white/[0.02] transition-colors">
                  <div className="p-8 flex flex-col justify-center border-r border-white/5">
                    <div className="text-red-400 mb-2 flex items-center gap-2">
                      <span className="text-lg opacity-50">❌</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{row.label}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{row.trad}</p>
                  </div>
                  <div className="p-8 flex flex-col justify-center bg-[#06E4DA]/[0.02]">
                    <div className="text-[#06E4DA] mb-2 flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{row.label}</span>
                    </div>
                    <p className="text-white font-bold text-sm">{row.inflow}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-red-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Our Foundations</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white">The Four Core Pillars</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-2 group">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
                <div className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-4">{pillar.id}</div>
                <h4 className="text-xl font-bold text-white mb-4 leading-tight">{pillar.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Numbers */}
      <section className="py-24 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">30-70%</div>
              <div className="text-xs uppercase tracking-widest text-[#6C28FF] font-black">Admin Reduction</div>
            </div>
            <div>
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">40-60%</div>
              <div className="text-xs uppercase tracking-widest text-[#06E4DA] font-black">Less No-Shows</div>
            </div>
            <div>
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">20-35%</div>
              <div className="text-xs uppercase tracking-widest text-red-500 font-black">Lead Conversion Up</div>
            </div>
            <div>
              <div className="text-6xl font-black text-[#06E4DA] mb-2 tracking-tighter">7-14D</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-black">Faster Collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Technology */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative glass-card rounded-[3rem] p-12 border-white/5 bg-slate-900/40">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-12 h-12 bg-[#06E4DA]/10 rounded-xl flex items-center justify-center text-[#06E4DA]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>
                <h4 className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-8">The "Secret Sauce"</h4>
                <h3 className="text-4xl font-black text-white mb-6">Powered by DigitalEmployee, Driven by AI.</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                  We don't use rigid, black-box software. We engineer flexible, transparent automation architectures using <span className="text-white font-bold">DigitalEmployee workflows</span>.
                </p>
                <div className="space-y-4">
                  {[
                    { t: "Marketing", d: "From AI content creation to auto-posting." },
                    { t: "Sales", d: "From cold outreach to closing deals." },
                    { t: "HR", d: "From resume screening to onboarding." },
                    { t: "Finance", d: "From GST calculation to reconciliation." }
                  ].map((tech, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-950/50 border border-white/5 group hover:border-[#6C28FF]/40 transition-all">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                      <div>
                        <span className="text-white font-bold block text-sm">{tech.t}</span>
                        <span className="text-slate-500 text-xs">{tech.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 animate-bounce">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-tight">
                We Automate the <span className="gradient-text">Impossible.</span>
              </h3>
              <p className="text-slate-400 text-xl font-light leading-relaxed mb-12">
                This allows us to create complex, multi-step behaviors—like reading an email, generating a PDF invoice, sending it via WhatsApp, and updating a CRM—all in seconds.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
                {/* Simulated tool logos */}
                {["WhatsApp", "Zoho", "Tally", "Gmail", "Shopify"].map(logo => (
                  <span key={logo} className="text-white font-black uppercase tracking-widest text-xs border border-white/20 px-4 py-2 rounded-lg">{logo}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="relative py-32 lg:py-48 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[#6C28FF]/5 blur-[120px] -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#6C28FF] to-[#06E4DA] rounded-full mx-auto mb-12 blur-3xl opacity-50 animate-pulse"></div>
          <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 leading-[0.9]">Stop Managing Tasks. Start Managing an Empire.</h2>
          <p className="text-xl text-slate-400 mb-12 font-light">Your competition is still sleeping. Your new workforce is ready to start now.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto bg-white text-slate-950 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-100 shadow-2xl shadow-white/10"
            >
              Hire Your First Digital Employee
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto bg-slate-900 border border-white/10 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
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