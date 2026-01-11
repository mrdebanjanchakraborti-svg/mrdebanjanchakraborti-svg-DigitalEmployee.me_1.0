import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-[#071027]">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6C28FF]/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06E4DA]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            We Are Building the <span className="gradient-text">Workforce</span> of the Future.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
            At <span className="text-white font-bold">InFlow Automation & Training Academy</span>, we don’t just automate tasks; we engineer intelligent Digital Employees that empower businesses to scale without limits.
          </p>
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-xl group">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000" 
              alt="Futuristic AI Hologram" 
              className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071027] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 lg:py-32 bg-[#071027]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-6">Our Story</h2>
              <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
                From Chaos to <span className="text-[#06E4DA]">"In Flow"</span>
              </h3>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                <p>
                  Business growth used to mean one thing: hiring more people to do more repetitive work. It meant training headaches, increasing overheads, and inevitable human error. We saw brilliant entrepreneurs stuck in the daily grind—handling invoices, chasing leads, and manually posting content—instead of building their vision.
                </p>
                <p>
                  <span className="text-white font-bold">InFlow Automation</span> was born to break this cycle. We realized that the future of business isn't about working harder; it's about building a hybrid workforce. By combining advanced AI, <span className="text-white font-bold">DigitalEmployee workflows</span>, and seamless integrations, we created a new class of worker: <span className="text-white font-bold underline decoration-red-500 decoration-2 underline-offset-4">The Digital Employee.</span>
                </p>
                <p>
                  Today, we help businesses across 100+ verticals replace busywork with intelligence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#6C28FF]/20 to-[#06E4DA]/20 blur-3xl opacity-50"></div>
              <div className="relative glass-card rounded-[2.5rem] p-12 border-white/10">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-1 bg-slate-700 rounded-full relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-red-500"></div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Traditional Hiring Chaos</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-1 bg-[#06E4DA] rounded-full shadow-[0_0_15px_rgba(6,228,218,0.5)]"></div>
                    <span className="text-xs font-black uppercase tracking-widest text-white">The InFlow State</span>
                  </div>
                </div>
                <div className="mt-12 space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-2 rounded-full bg-white/5 relative overflow-hidden`}>
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6C28FF] to-[#06E4DA]" style={{ width: `${20 * i}%`, opacity: 0.1 * i + 0.3 }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🚀</div>
              <h4 className="text-[#6C28FF] font-black uppercase tracking-[0.2em] text-sm mb-6">Our Mission</h4>
              <p className="text-2xl text-white leading-relaxed font-bold">
                To democratize enterprise-grade automation for SMBs. We exist to liberate business owners from the "admin trap" by providing affordable, 24/7 AI workers.
              </p>
            </div>
            <div className="glass-card p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">👁️</div>
              <h4 className="text-[#06E4DA] font-black uppercase tracking-[0.2em] text-sm mb-6">Our Vision</h4>
              <p className="text-2xl text-white leading-relaxed font-bold">
                A world where human potential is unleashed for creativity, while Digital Employees handle the execution through an autonomous, error-free operating system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Digital Employees? */}
      <section className="py-24 lg:py-32 bg-[#071027]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">The Evolution of Employment</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Why hire for tasks when you can hire for outcomes? Digital Employees outperform traditional methods.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Always On", desc: "Your workforce runs 24/7/365. No sick days, no holidays, no sleep.", icon: "⏰" },
              { title: "Zero Training", desc: "Pre-trained on industry standards. Deploy in days, not months.", icon: "🧠" },
              { title: "Human-Level", desc: "Complex decision-making and natural language communication.", icon: "✨" },
              { title: "70% Savings", desc: "Drastically reduce overhead compared to traditional hiring.", icon: "💰" },
              { title: "Seamless Sync", desc: "Works with Tally, Zoho, Shopify, WhatsApp, and Google Workspace.", icon: "🔌" },
              { title: "Infinite Scale", desc: "Handle 10 or 10,000 requests without adding staff.", icon: "📈" }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h5 className="text-xl font-bold text-white mb-4">{item.title}</h5>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Impact */}
      <section className="py-20 border-y border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">30-70%</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Admin Hours Saved</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">40-60%</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Less No-Shows</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">7-14</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Days Faster Collections</div>
            </div>
            <div>
              <div className="text-5xl font-black text-[#06E4DA] mb-2">100%</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Peace of Mind</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section className="py-24 lg:py-32 bg-[#071027]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">The Human Intelligence Behind the Machines</h2>
          <p className="text-slate-500 mb-20 uppercase tracking-[0.2em] text-xs font-bold">Elite Strategic Engineering Team</p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Founder Card */}
            <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-[#6C28FF]/40 transition-all group">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C28FF] to-[#06E4DA] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                  alt="Debanjan - Founder" 
                  className="w-full h-full rounded-full object-cover relative z-10 border-2 border-white/10"
                />
              </div>
              <h4 className="text-2xl font-black text-white mb-1">Debanjan</h4>
              <p className="text-[#6C28FF] font-bold text-xs uppercase tracking-widest mb-6">Founder & Lead Automation Architect</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["Automation Strategy", "AI Workflows", "CRM Integration"].map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] text-slate-400 font-bold">{s}</span>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Specialized in automation and digital operations for SMEs. Passionate about helping businesses adopt the "Digital Employee" model to scale.
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-[#6C28FF] transition-colors">
                  <div className="w-5 h-5 bg-white rounded-sm opacity-50"></div>
                </a>
              </div>
            </div>

            {/* CTO Placeholder */}
            <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-[#06E4DA]/40 transition-all group">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06E4DA] to-[#6C28FF] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" 
                  alt="Arjun Mehta - CTO" 
                  className="w-full h-full rounded-full object-cover relative z-10 border-2 border-white/10"
                />
              </div>
              <h4 className="text-2xl font-black text-white mb-1">Arjun Mehta</h4>
              <p className="text-[#06E4DA] font-bold text-xs uppercase tracking-widest mb-6">Chief Technology Officer</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["System Design", "LLMs", "Full-Stack Dev"].map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] text-slate-400 font-bold">{s}</span>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                10+ years designing AI-powered frameworks that power the backend of our Digital Workforce across global infrastructures.
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-[#06E4DA] transition-colors">
                  <div className="w-5 h-5 bg-white rounded-sm opacity-50"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <section className="relative py-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#6C28FF_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8">Ready to Hire Your First Digital Employee?</h2>
          <p className="text-xl text-slate-400 mb-12 font-light">Join the automation revolution. Stop managing tasks and start managing growth.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto bg-[#6C28FF] hover:bg-[#5a1ee0] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#6C28FF]/20 transition-all active:scale-95"
            >
              Meet My New Team
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto bg-slate-900 border border-white/10 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;