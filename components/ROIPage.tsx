
import React, { useState, useEffect } from 'react';

interface ROIPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi') => void;
}

interface PricingTier {
  id: string;
  name: string;
  monthly: number;
  setup: number;
  credits: string;
  color: string;
  icon: string;
}

// Added missing comparisons data for ROI analysis
const comparisons = [
  {
    icon: "🕒",
    label: "Availability",
    traditional: "8-10 hours/day. Weekends and holidays off.",
    smart: "24/7/365. Instant response at 3 AM or Christmas."
  },
  {
    icon: "⚡",
    label: "Response Time",
    traditional: "Minutes to hours depending on workload.",
    smart: "Sub-second response. Zero wait time for leads."
  },
  {
    icon: "🎯",
    label: "Consistency",
    traditional: "Varies with mood, fatigue, and individual skill.",
    smart: "100% adherence to SOPs. Zero emotional variance."
  },
  {
    icon: "📈",
    label: "Scalability",
    traditional: "Months to hire and train new staff members.",
    smart: "Instant. Handle 10x volume with zero added cost."
  }
];

const ROIPage: React.FC<ROIPageProps> = ({ onNavigate }) => {
  const [staffCount, setStaffCount] = useState(2);
  const [avgSalary, setAvgSalary] = useState(25000);
  const [selectedTierId, setSelectedTierId] = useState('growth');
  const [savings, setSavings] = useState(0);
  const [traditionalCost, setTraditionalCost] = useState(0);
  const [inflowCost, setInflowCost] = useState(0);

  const tiers: PricingTier[] = [
    { id: 'starter', name: 'Starter', monthly: 2500, setup: 10000, credits: '2,500', color: 'blue-500', icon: '🌱' },
    { id: 'growth', name: 'Growth', monthly: 6500, setup: 25000, credits: '7,500', color: 'red-500', icon: '⚡' },
    { id: 'pro', name: 'Professional', monthly: 15000, setup: 50000, credits: '20,000', color: 'purple-500', icon: '🏆' },
    { id: 'custom', name: 'Enterprise', monthly: 35500, setup: 150000, credits: 'Custom', color: 'cyan-500', icon: '🏢' },
  ];

  const selectedTier = tiers.find(t => t.id === selectedTierId) || tiers[1];

  useEffect(() => {
    const annualTraditional = staffCount * avgSalary * 12;
    const annualInflow = (selectedTier.monthly * 12) + selectedTier.setup;
    
    setTraditionalCost(annualTraditional);
    setInflowCost(annualInflow);
    setSavings(annualTraditional - annualInflow > 0 ? annualTraditional - annualInflow : 0);
  }, [staffCount, avgSalary, selectedTierId]);

  return (
    <div className="animate-fade-in bg-[#020617] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-52 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-[10px] font-black mb-8 uppercase tracking-[0.3em] animate-pulse">
            Neural ROI Engine v3.1
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-6 leading-[0.85] tracking-tighter">
            Reclaim Your <br/><span className="gradient-text">Freedom.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            The era of expensive, inefficient administrative overhead is over. Calculate your <span className="text-white font-bold">InFlow Multiplier</span> and see the true cost of biological limits.
          </p>
        </div>

        {/* Dynamic Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0,transparent_70%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
      </section>

      {/* 2. Interactive Calculator Core */}
      <section className="py-24 bg-slate-950/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Inputs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
                <h3 className="text-lg font-black text-white mb-10 uppercase tracking-tight flex items-center gap-3">
                   <span className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-sm">👥</span>
                   Staff Parameters
                </h3>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Administrative Staff</label>
                      <span className="text-white font-black">{staffCount} Persons</span>
                    </div>
                    <input 
                      type="range" min="1" max="25" value={staffCount} 
                      onChange={(e) => setStaffCount(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between mt-2 text-[8px] font-black text-slate-700">
                      <span>1 PERSON</span>
                      <span>25 PERSONS</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg. Monthly Salary</label>
                      <span className="text-white font-black">₹{avgSalary.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="15000" max="150000" step="5000" value={avgSalary} 
                      onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between mt-2 text-[8px] font-black text-slate-700">
                      <span>₹15K</span>
                      <span>₹150K</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Total Yearly Burn (Human)</div>
                  <div className="text-3xl font-black text-slate-400 tracking-tighter">₹{traditionalCost.toLocaleString()}</div>
                </div>
              </div>

              {/* InFlow Plan Picker */}
              <div className="glass-card p-10 rounded-[2.5rem] border-white/10">
                 <h3 className="text-lg font-black text-white mb-8 uppercase tracking-tight flex items-center gap-3">
                   <span className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-sm">🤖</span>
                   Select InFlow Tier
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {tiers.map(tier => (
                    <button 
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-6 rounded-3xl border text-left transition-all ${
                        selectedTierId === tier.id 
                        ? `bg-${tier.color}/10 border-${tier.color} shadow-lg` 
                        : 'bg-slate-950 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-4">{tier.icon}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedTierId === tier.id ? `text-${tier.color}` : 'text-slate-500'}`}>{tier.name}</div>
                      <div className="text-white font-bold text-sm">₹{tier.monthly.toLocaleString()}<span className="text-[10px] opacity-40 ml-1">/mo</span></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Results */}
            <div className="lg:col-span-8 space-y-8">
              {/* Massive Reclaim Counter */}
              <div className="glass-card p-12 lg:p-16 rounded-[3rem] border-white/10 bg-slate-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl font-black">ROI</div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 bg-[#06E4DA]/10 px-4 py-2 rounded-full mb-8">
                    <div className="w-2 h-2 bg-[#06E4DA] rounded-full animate-ping"></div>
                    <span className="text-[#06E4DA] text-[10px] font-black uppercase tracking-widest">Annual Capital Reclaimable</span>
                  </div>
                  
                  <div className="text-[100px] lg:text-[140px] font-black text-white leading-none tracking-tighter mb-8 tabular-nums">
                    <span className="text-red-600">₹</span>{savings.toLocaleString()}
                  </div>
                  
                  <p className="text-slate-400 text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mb-12">
                    By deploying the <span className="text-white font-bold">{selectedTier.name} Plan</span>, you stop the hemorrhage of <span className="text-white font-bold">₹{(traditionalCost - inflowCost > 0 ? traditionalCost - inflowCost : 0).toLocaleString()}</span> in operational friction every year.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/5">
                    <div>
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Efficiency Gain</div>
                      <div className="text-4xl font-black text-white">{(savings / traditionalCost * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Monthly Credits</div>
                      <div className="text-4xl font-black text-[#06E4DA]">{selectedTier.credits}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">System Uptime</div>
                      <div className="text-4xl font-black text-white">99.9%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Breakdown Table */}
              <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-slate-950">
                <h3 className="text-lg font-black text-white mb-10 uppercase tracking-tight">1-Year Financial Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-6 text-slate-600 text-[10px] font-black uppercase tracking-widest">Expense Category</th>
                        <th className="pb-6 text-slate-600 text-[10px] font-black uppercase tracking-widest">Traditional Team</th>
                        <th className="pb-6 text-[#06E4DA] text-[10px] font-black uppercase tracking-widest">InFlow {selectedTier.name}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="group hover:bg-white/[0.02]">
                        <td className="py-6 text-slate-300 font-medium">Initial Deployment / Hiring</td>
                        <td className="py-6 text-slate-500">₹{(staffCount * 5000).toLocaleString()} <span className="text-[9px]">(Recruitment avg)</span></td>
                        <td className="py-6 text-white font-bold">₹{selectedTier.setup.toLocaleString()} <span className="text-[9px] text-slate-500">(One-time)</span></td>
                      </tr>
                      <tr className="group hover:bg-white/[0.02]">
                        <td className="py-6 text-slate-300 font-medium">Annual Recurring Compensation</td>
                        <td className="py-6 text-slate-500">₹{traditionalCost.toLocaleString()}</td>
                        <td className="py-6 text-white font-bold">₹{(selectedTier.monthly * 12).toLocaleString()}</td>
                      </tr>
                      <tr className="group hover:bg-white/[0.02]">
                        <td className="py-6 text-slate-300 font-medium">Infrastructure & Benefits</td>
                        <td className="py-6 text-slate-500">₹{(traditionalCost * 0.15).toLocaleString()} <span className="text-[9px]">(Estimated 15%)</span></td>
                        <td className="py-6 text-white font-bold">Included <span className="text-[9px] text-[#06E4DA]">(Unlimited Cloud)</span></td>
                      </tr>
                      <tr className="bg-slate-900/20">
                        <td className="py-8 text-white font-black uppercase tracking-widest">1-Year Net Total</td>
                        <td className="py-8 text-red-500 font-black text-2xl">₹{(traditionalCost + (staffCount * 5000) + (traditionalCost * 0.15)).toLocaleString()}</td>
                        <td className="py-8 text-[#06E4DA] font-black text-2xl">₹{inflowCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Deep Dive Comparison */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Beyond the Money</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Capital is only one part of the equation. Operational velocity is where empires are built.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comparisons.map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:bg-slate-900/40 transition-all group">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-4">{item.label}</h4>
                <div className="space-y-6">
                  <div>
                    <span className="text-red-500 text-[9px] font-black uppercase block mb-1">Traditional Staff</span>
                    <p className="text-slate-500 text-sm leading-tight">{item.traditional}</p>
                  </div>
                  <div>
                    <span className="text-[#06E4DA] text-[9px] font-black uppercase block mb-1">InFlow Workforce</span>
                    <p className="text-white font-bold text-sm leading-tight">{item.smart}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-24 bg-red-600 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
            Don't Just Save. <br/>Multiply.
          </h2>
          <p className="text-red-100 text-xl mb-12 font-medium">
            This isn't just a cost-cutting measure. It's an upgrade to your business operating system.
          </p>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-white text-red-600 px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-black/20 hover:scale-105 transition-all active:scale-95"
          >
            Deploy My Neural workforce
          </button>
        </div>
      </section>

      {/* 5. Footer CTA Back */}
      <section className="py-20 text-center">
        <button 
          onClick={() => onNavigate('home')}
          className="text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-4 mx-auto transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          Return to Neural Command
        </button>
      </section>
    </div>
  );
};

export default ROIPage;
