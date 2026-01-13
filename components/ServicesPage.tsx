
import React, { useState } from 'react';

// Fix: Standardized onNavigate type across all page components
interface ServicesPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi' | 'reset-password') => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const departments = [
    {
      id: "01",
      name: "Marketing Digital Employee (MDE)",
      tagline: "Your Growth Engine that Never Sleeps.",
      color: "#6C28FF",
      features: [
        "Social Media Autopilot: Automated health tips, real estate reels, and dish-of-the-day posts.",
        "Lead Magnet Automation: Capture and nurture leads via WhatsApp and Email instantly.",
        "Reputation Management: Monitoring Google Reviews with instant AI drafts.",
        "Trend Analysis: Tracking competitors and suggesting viral content strategies."
      ],
      icon: "📢"
    },
    {
      id: "02",
      name: "Sales Digital Employee (SDE)",
      tagline: "The Closer That Replies Instantly.",
      color: "#DC2626",
      features: [
        "Lead Qualification: Score incoming leads and route hot prospects to human closers.",
        "Smart Follow-Ups: Automated WhatsApp/SMS chasing until the meeting is booked.",
        "Proposal Generator: Auto-create and send PDF quotes based on client needs.",
        "Recovery Agent: Re-engage abandoned carts or inquiries to save the sale."
      ],
      icon: "🤝"
    },
    {
      id: "03",
      name: "HR Digital Employee (HDE)",
      tagline: "Scale Your Team, Not Your Admin Work.",
      color: "#06E4DA",
      features: [
        "Resume Screening: Parsing CVs and shortlisting candidates against custom criteria.",
        "Interview Scheduler: Seamlessly coordinating hiring manager calendars.",
        "Onboarding Flow: Welcome kits, document collection, and tool access grants.",
        "Staff Rostering: Shift management for clinics, restaurants, and support teams."
      ],
      icon: "📋"
    },
    {
      id: "04",
      name: "Finance Digital Employee (FDE)",
      tagline: "Precision Accounting. Zero Human Error.",
      color: "#FACC15",
      features: [
        "Invoice Automation: Instant invoice generation upon deal closure.",
        "Payment Chaser: Polite, persistent automated payment reminders.",
        "Reconciliation: Matching bank transactions with invoices in real-time.",
        "Compliance Watchdog: Organising tax docs and tracking filing deadlines."
      ],
      icon: "💰"
    },
    {
      id: "05",
      name: "Operations Digital Employee (ODE)",
      tagline: "The Backbone of Your Daily Efficiency.",
      color: "#EF4444",
      features: [
        "Support Ticket Handling: Instant L1 query resolution and smart routing.",
        "Inventory Management: Automated reorder triggers for retail and grocery.",
        "SOP Generator: Turning manual processes into standardized workflows.",
        "Operational Dashboard: Bird's-eye view of your business health 24/7."
      ],
      icon: "⚙️"
    }
  ];

  const industries = [
    {
      title: "Healthcare & Wellness",
      roles: ["Front Desk Agent", "Support Bot", "Social Manager"],
      icon: "🏥",
      desc: "Appointment booking, patient recalls, and medical report delivery."
    },
    {
      title: "Food & Hospitality",
      roles: ["Reservation Manager", "Guest Experience Agent", "Visual Marketer"],
      icon: "🍽️",
      desc: "Table bookings, Airbnb check-in messaging, and Instagram reel generation."
    },
    {
      title: "Professional Services",
      roles: ["Real Estate Agent", "Compliance Officer", "Content Creator"],
      icon: "🏢",
      desc: "Lead scoring, filing reminders for CAs, and property walkthrough videos."
    },
    {
      title: "Retail & E-Commerce",
      roles: ["High-Ticket Closer", "Sales Recovery", "Inventory Clerk"],
      icon: "🛍️",
      desc: "Luxury item lead nurturing, abandoned cart recovery, and stock tracking."
    },
    {
      title: "Personal Care & Beauty",
      roles: ["Booking Assistant", "Consultant Bot", "Trend Spotter"],
      icon: "💆",
      desc: "Stylist scheduling, skin clinic consultation funnels, and offer tracking."
    },
    {
      title: "Home & Property Services",
      roles: ["Dispatcher", "Tenant Manager", "Maintenance Bot"],
      icon: "🏠",
      desc: "Recurring booking dispatcher, rent collection, and ticket tracking."
    }
  ];

  const faqs = [
    { q: "Do you integrate with my existing tools?", a: "Yes. We integrate with Zoho, Salesforce, Tally, Google Workspace, and WhatsApp Business API." },
    { q: "How long does it take to deploy?", a: "Starter packages typically go live in 3–7 days. Partner with us solutions take 14–30 days." },
    { q: "Do you offer custom development?", a: "Absolutely. We specialize in bespoke neural architecture for multi-location franchises." },
    { q: "Is my data secure?", a: "We use Silicon Valley grade encryption and follow strict HIPAA/GDPR standards." }
  ];

  const journeySteps = [
    { 
      step: "01", 
      title: "Discovery", 
      desc: "We map your high-ROI opportunities and identify friction points in your current manual workflows.",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
      color: "from-[#6C28FF] to-[#8E5AFF]"
    },
    { 
      step: "02", 
      title: "Pilot Design", 
      desc: "Building 3 high-impact workflows tailored to your specific business voice and integration requirements.",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
      color: "from-[#06E4DA] to-[#00FFF5]"
    },
    { 
      step: "03", 
      title: "Deployment", 
      desc: "The 'Go-Live' phase. We connect your Digital Employee to WhatsApp, Tally, Zoho, and your existing POS stack.",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      color: "from-red-600 to-red-400"
    },
    { 
      step: "04", 
      title: "Scale", 
      desc: "Continuous optimization. We expand your Digital Workforce as your volume grows, maintaining 99.9% reliability.",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      color: "from-emerald-500 to-emerald-300"
    }
  ];

  return (
    <div className="bg-[#071027] min-h-screen pt-20">
      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(108,40,255,0.05)_0,transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            Stop Hiring for Tasks. <br/><span className="gradient-text">Start Hiring for Outcomes.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
            We don't just sell software. We provide fully autonomous <span className="text-white font-bold">Digital Employees</span> that handle your hardest workloads 24/7, error-free.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('dept-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-red-600 hover:bg-red-500 text-white px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-red-600/20"
          >
            Explore All Roles
          </button>
        </div>
      </section>

      {/* 2. Departmental Services */}
      <section id="dept-section" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {departments.map((dept, i) => (
              <div key={dept.id} className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-black opacity-10 text-white">{dept.id}</span>
                    <div className="w-12 h-0.5 bg-slate-800"></div>
                    <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: dept.color }}>Department Role</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{dept.name}</h2>
                  <p className="text-xl italic text-slate-500 mb-8">{dept.tagline}</p>
                  <ul className="space-y-4">
                    {dept.features.map((feature, fIdx) => {
                      const [title, body] = feature.split(': ');
                      return (
                        <li key={fIdx} className="flex gap-4 group">
                          <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 transition-transform group-hover:scale-150" style={{ backgroundColor: dept.color }}></div>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            <span className="text-white font-bold">{title}:</span> {body}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-10">
                    <button className="text-xs font-black uppercase tracking-widest text-white border-b-2 border-slate-800 pb-2 hover:border-red-500 transition-all">
                      View full workflow documentation
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-slate-900 rounded-[3rem] border border-white/5 transform rotate-3 shadow-2xl"></div>
                  <div className="absolute inset-0 glass-card rounded-[3rem] border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden group">
                    <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-500">{dept.icon}</div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px]" style={{ backgroundColor: dept.color + '22' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Industry Solutions */}
      <section className="py-24 lg:py-32 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">Who We Serve</h2>
            <p className="text-slate-400 text-lg">Specialized intelligence for the backbones of local economies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-red-500/20 transition-all hover:-translate-y-2 group">
                <div className="text-5xl mb-6">{industry.icon}</div>
                <h4 className="text-2xl font-black text-white mb-4">{industry.title}</h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{industry.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.roles.map(role => (
                    <span key={role} className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deployment Journey - IMPROVED UI */}
      <section className="py-32 lg:py-48 bg-[#020617] relative overflow-hidden">
        {/* Background circuit decorations */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:60px_60px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <h2 className="text-red-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Execution Roadmap</h2>
            <h3 className="text-4xl sm:text-6xl font-black text-white mb-8">Your Deployment Journey</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">From legacy manual tasks to fully autonomous scaling in four precision-engineered phases.</p>
          </div>

          <div className="relative">
            {/* Main Connecting Path Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800/50 hidden lg:block -translate-y-1/2">
              <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-[#6C28FF] via-red-500 to-emerald-500 animate-[journey-line_10s_infinite_linear]"></div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {journeySteps.map((item, i) => (
                <div key={i} className="group relative">
                  {/* Step Card */}
                  <div className="glass-card p-8 rounded-[2rem] border-white/5 bg-slate-950/40 backdrop-blur-3xl hover:border-white/20 transition-all hover:-translate-y-4 h-full flex flex-col relative overflow-hidden">
                    {/* Animated Glow Background */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${item.color}`}></div>
                    
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                        {item.icon}
                      </div>
                      <span className="text-4xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-500">{item.step}</span>
                    </div>

                    {/* Content */}
                    <h4 className="text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors flex-1">{item.desc}</p>
                    
                    {/* Bottom Status Indicator */}
                    <div className="mt-8 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${item.color}`}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">Phase {item.step} Ready</span>
                    </div>
                  </div>

                  {/* Desktop Connecting Arrows/Dots */}
                  {i < journeySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deployment CTA */}
          <div className="mt-24 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-2 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
              <div className="px-8 py-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Typical Time to Live</p>
                <p className="text-xl font-black text-white">3 — 14 Business Days</p>
              </div>
              <div className="h-12 w-px bg-white/5 hidden sm:block"></div>
              <button 
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto bg-white text-slate-950 px-10 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5"
              >
                Initiate Pilot Discovery
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes journey-line {
            0% { width: 0; left: 0; }
            50% { width: 100%; left: 0; }
            100% { width: 0; left: 100%; }
          }
        `}</style>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 bg-slate-950/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Technical & Support FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden border-white/5">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="text-white font-bold">{faq.q}</span>
                  <span className={`text-2xl transition-transform ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {activeFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 -z-10 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8">Which Digital Employee Do You Need First?</h2>
          <p className="text-xl text-slate-400 mb-12">Select your industry to see a live demo of your future workforce.</p>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-white text-slate-950 px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-100 shadow-2xl shadow-white/10"
          >
            Start Live Demo
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
