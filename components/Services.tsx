
import React from 'react';

interface DepartmentCardProps {
  id: string;
  name: string;
  tagline: string;
  color: string;
  icon: string;
  features: string[];
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ id, name, tagline, color, icon, features }) => (
  <div className="glass-card rounded-[2.5rem] p-8 border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 group relative overflow-hidden h-full flex flex-col">
    {/* Dynamic Background Glow */}
    <div 
      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
      style={{ backgroundColor: color }}
    ></div>

    {/* Header */}
    <div className="flex justify-between items-start mb-8">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/5 bg-slate-900 group-hover:scale-110 transition-transform duration-500"
      >
        {icon}
      </div>
      <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">{id}</span>
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: color }}>
        Core Department
      </div>
      <h4 className="text-2xl font-black text-white mb-2 leading-tight">{name}</h4>
      <p className="text-slate-500 text-xs font-medium mb-6 italic">{tagline}</p>
      
      <ul className="space-y-3">
        {features.slice(0, 3).map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-slate-700"></div>
            <span className="text-slate-400 text-[11px] leading-relaxed">{feature.split(':')[0]}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Footer Link */}
    <div className="mt-8 pt-6 border-t border-white/5">
      <button className="text-[10px] font-black text-white uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-2 group/btn">
        System Documentation 
        <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
);

const Services: React.FC = () => {
  const departments = [
    {
      id: "01",
      name: "Marketing Agent (MDE)",
      tagline: "Autonomous Growth Engine.",
      color: "#6C28FF",
      icon: "📢",
      features: ["Social Autopilot", "Lead Magnet Automation", "Review Management"]
    },
    {
      id: "02",
      name: "Sales Agent (SDE)",
      tagline: "The Instant Closer.",
      color: "#DC2626",
      icon: "🤝",
      features: ["Lead Qualification", "Meeting Coordination", "Proposal Generation"]
    },
    {
      id: "03",
      name: "HR Agent (HDE)",
      tagline: "Digital People Ops.",
      color: "#06E4DA",
      icon: "📋",
      features: ["Resume Screening", "Interview Scheduler", "Onboarding Flows"]
    },
    {
      id: "04",
      name: "Finance Agent (FDE)",
      tagline: "Precision Ledger Control.",
      color: "#FACC15",
      icon: "💰",
      features: ["Invoice Automation", "Payment Recovery", "Tax Compliance"]
    },
    {
      id: "05",
      name: "Operations Agent (ODE)",
      tagline: "Reliable Backbone.",
      color: "#EF4444",
      icon: "⚙️",
      features: ["L1 Ticket Resolution", "Inventory Tracking", "SOP Generation"]
    }
  ];

  return (
    <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Screenshot Style Badge */}
        <div className="text-center mb-24">
          <div className="inline-block px-8 py-3 rounded-full bg-slate-900 border border-white/5 text-red-500 text-[10px] font-black mb-10 uppercase tracking-[0.4em] shadow-2xl">
            Silicon Valley Standard AI Deployment
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
            The Neural <span className="gradient-text">Department</span> Hub.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Deploy specialized intelligence across every vector of your enterprise. Our agents don't just "help"—they own the workflow.
          </p>
        </div>

        {/* 5 Department Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} {...dept} />
          ))}
        </div>

        {/* Industry CTA */}
        <div className="mt-20 p-1 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-[3rem]">
          <div className="bg-slate-950/80 rounded-[2.9rem] p-12 text-center backdrop-blur-md border border-white/5">
            <h4 className="text-2xl font-black text-white mb-4">Specific Industry Solutions?</h4>
            <p className="text-slate-500 text-sm mb-8 max-w-xl mx-auto">We've specialized these 5 departments into 7 key sectors including Healthcare, Real Estate, and Food & Hospitality.</p>
            <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white shadow-2xl shadow-white/5">
              Browse Industry Blueprints
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
