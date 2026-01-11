import React, { useState } from 'react';

interface PricingPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner') => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      yearly: "₹0",
      credits: "500",
      desc: "Testing the waters",
      features: ["1 User Seat", "Basic CRM", "1 Active Workflow", "Email & SMS Channels", "Manual Campaigns"],
      color: "from-slate-700 to-slate-500",
      icon: "🧪",
      cta: "Start Free Trial"
    },
    {
      name: "Starter",
      price: "₹2,500",
      yearly: "₹25,000",
      credits: "2,500",
      desc: "Solopreneurs & Small Teams",
      features: ["2 User Seats", "Omnichannel Inbox", "3 Active Workflows", "Basic Webhooks", "Standard Support"],
      color: "from-blue-600 to-blue-400",
      icon: "🌱",
      cta: "Get Started"
    },
    {
      name: "Growth",
      price: "₹6,500",
      yearly: "₹65,000",
      credits: "7,500",
      desc: "Growing SMBs",
      features: ["5 User Seats", "Unlimited Workflows", "Advanced Webhooks", "AI Content Generator", "Priority Support"],
      color: "from-[#6C28FF] to-[#8E5AFF]",
      recommended: true,
      icon: "⚡",
      cta: "Upgrade to Growth"
    },
    {
      name: "Professional",
      price: "₹15,000",
      yearly: "₹1,50,000",
      credits: "20,000",
      desc: "High-Volume Sales Teams",
      features: ["10 User Seats", "Voice Call Integration", "Advanced Analytics", "Dedicated Manager", "Custom Engineering"],
      color: "from-red-600 to-red-400",
      icon: "🏆",
      cta: "Go Professional"
    },
    {
      name: "Custom",
      price: "₹35,500+",
      yearly: "Bespoke",
      credits: "Custom",
      desc: "Large Enterprises & Agencies",
      features: ["Unlimited Seats", "White-Label Options", "Custom API Integrations", "On-Premise Options", "SLA-Backed Support"],
      color: "from-[#06E4DA] to-[#00FFF5]",
      icon: "🏢",
      cta: "Contact Sales"
    }
  ];

  const creditRules = [
    { action: "Send WhatsApp Message", cost: "1 Credit" },
    { action: "Send SMS", cost: "1 Credit" },
    { action: "Send Email", cost: "1 Credit" },
    { action: "AI Message Generation", cost: "2 Credits" },
    { action: "Voice Call (per min)", cost: "3 Credits" },
    { action: "AI Image/Video Generation", cost: "5 Credits" },
  ];

  const faqs = [
    { q: "What happens if I run out of credits?", a: "Automation will pause, but you will be notified immediately. You can instantly buy a top-up pack (₹500 for 1,000 credits) or upgrade your plan to resume." },
    { q: "Can I change plans anytime?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the start of the next billing cycle." },
    { q: "Is the WhatsApp API included?", a: "Yes, we integrate directly with official providers. Standard WhatsApp conversation charges may apply separately depending on your volume." },
    { q: "Do you offer setup support?", a: "Yes! Starter plans get documentation support, while Growth and above get assisted onboarding. Professional and Custom plans include dedicated implementation managers." }
  ];

  return (
    <div className="animate-fade-in bg-[#071027]">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6C28FF]/15 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06E4DA]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 relative inline-block group">
             <div className="w-32 h-32 bg-gradient-to-tr from-[#6C28FF] to-[#06E4DA] rounded-full absolute -inset-2 blur-3xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
             <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center relative z-10 text-6xl shadow-2xl shadow-black border-white/10 group-hover:scale-110 transition-transform duration-500">💰</div>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Simple Pricing. <span className="gradient-text">Power-Packed Value.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto mb-16 font-light leading-relaxed">
            Choose the plan that fits your growth. Every plan includes our powerful <span className="text-white font-bold">AI Revenue OS</span>, Workflow Engine, and Omnichannel capabilities.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 rounded-full bg-slate-900 border border-white/10 p-1 flex items-center transition-all hover:border-white/20"
            >
              <div className={`h-full aspect-square rounded-full bg-red-600 transition-all ${billingCycle === 'yearly' ? 'translate-x-8' : ''}`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>Yearly</span>
              <span className="bg-[#06E4DA]/10 text-[#06E4DA] text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Save ~20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pricing Tiers */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-nowrap lg:grid lg:grid-cols-5 gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 w-[300px] lg:w-auto snap-center relative glass-card rounded-[2.5rem] p-1 border-white/5 transition-all hover:-translate-y-2 group ${plan.recommended ? 'scale-105 z-10 border-[#06E4DA]/40 shadow-[0_0_50px_rgba(6,228,218,0.1)]' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#06E4DA] text-slate-950 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#06E4DA]/20">
                    Most Popular
                  </div>
                )}
                <div className="bg-slate-950/80 rounded-[2.4rem] p-8 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-2xl mb-6 shadow-lg transition-transform group-hover:rotate-6`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-white">{billingCycle === 'monthly' ? plan.price : plan.yearly}</span>
                    <span className="text-slate-500 font-bold text-xs">/mo</span>
                  </div>
                  
                  <div className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[#06E4DA] font-black text-lg block">{plan.credits}</span>
                    <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Monthly Credits</span>
                  </div>

                  <ul className="space-y-4 flex-1 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0"></div>
                        <span className="text-slate-300 text-xs font-medium leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${plan.recommended ? 'bg-[#06E4DA] hover:bg-[#00FFF5] text-slate-950 shadow-xl shadow-[#06E4DA]/20' : 'bg-white text-slate-950 hover:bg-slate-100'}`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Credit Transparency Table */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#6C28FF] font-black tracking-[0.4em] uppercase text-xs mb-4">Transparency First</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-6">How Credits Work</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Our fair usage policy ensures you only pay for what you use. Top up anytime starting at ₹500 for 1,000 credits.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-white/5">
                  <th className="p-6 text-slate-500 font-black uppercase tracking-widest text-xs">Action</th>
                  <th className="p-6 text-slate-500 font-black uppercase tracking-widest text-xs text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {creditRules.map((rule, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300 font-medium">{rule.action}</td>
                    <td className="p-6 text-right">
                      <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[#06E4DA] font-black text-xs">
                        {rule.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-24 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-12 text-center italic tracking-tight underline decoration-red-600 underline-offset-8">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden border-white/5">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group bg-slate-900/20"
                >
                  <span className="text-white font-bold group-hover:text-[#06E4DA] transition-colors">{faq.q}</span>
                  <span className={`text-2xl transition-transform duration-300 ${activeFaq === i ? 'rotate-45 text-red-500' : 'text-slate-500'}`}>+</span>
                </button>
                {activeFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-slate-900/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="relative py-32 lg:py-48 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[#6C28FF]/5 blur-[120px] -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <div className="w-24 h-24 bg-gradient-to-tr from-[#6C28FF] to-[#06E4DA] rounded-3xl rotate-12 mx-auto mb-12 flex items-center justify-center text-4xl shadow-2xl animate-bounce">🚀</div>
          <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">Ready to Automate Your Revenue?</h2>
          <p className="text-xl text-slate-400 mb-12 font-light">Join 100+ businesses scaling with <span className="text-white font-bold">InFlow</span>. No recruitment headaches, just growth.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-white text-slate-950 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-100 shadow-2xl shadow-white/10">
              Start 14-Day Free Trial
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto bg-slate-900 border border-white/10 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;