
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

  const comparisonData = [
    {
      category: "Platform Access",
      features: [
        { name: "User Seats", values: ["1", "2", "5", "10", "Unlimited"] },
        { name: "Active Workflows", values: ["1", "3", "Unlimited", "Unlimited", "Unlimited"] },
        { name: "Omnichannel Inbox", values: [true, true, true, true, true] },
        { name: "Custom Dashboards", values: [false, false, true, true, true] },
        { name: "Mobile App Access", values: [true, true, true, true, true] },
      ]
    },
    {
      category: "Channels & Communication",
      features: [
        { name: "Email Automation", values: [true, true, true, true, true] },
        { name: "SMS Messaging", values: [true, true, true, true, true] },
        { name: "WhatsApp Business API", values: ["Limited", "Full", "Full", "Full", "Full"] },
        { name: "AI Voice Calling", values: [false, false, false, true, true] },
        { name: "Social Auto-Poster", values: [false, true, true, true, true] },
      ]
    },
    {
      category: "Intelligence & Scale",
      features: [
        { name: "AI Content Generation", values: [false, "Basic", "Advanced", "Full", "Full"] },
        { name: "Lead Scoring", values: [false, false, "Standard", "Advanced", "Advanced"] },
        { name: "AI Image Generation", values: [false, false, true, true, true] },
        { name: "Smart Retargeting", values: [false, false, true, true, true] },
        { name: "Webhooks & API", values: [false, "Basic", "Advanced", "Advanced", "Custom"] },
      ]
    },
    {
      category: "Support & Security",
      features: [
        { name: "Onboarding Support", values: ["Self", "Guided", "Assisted", "Dedicated", "Enterprise"] },
        { name: "SLA Guarantee", values: [false, false, false, "99.9%", "99.99%"] },
        { name: "Security Standards", values: ["Standard", "Standard", "SOC2/HIPAA", "Enterprise", "Bespoke"] },
        { name: "Priority Response", values: [false, false, true, true, true] },
        { name: "Account Manager", values: [false, false, false, true, true] },
      ]
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

      {/* 2. Detailed Comparison Matrix (Primary Section) */}
      <section className="py-24 lg:py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#06E4DA] font-black tracking-[0.4em] uppercase text-xs mb-4">Granular Breakdown</h2>
            <h3 className="text-4xl sm:text-6xl font-black text-white mb-8">Compare All Plans</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Deep dive into the specific features of each tier to find your perfect fit.</p>
          </div>

          <div className="glass-card rounded-[3rem] border-white/5 overflow-x-auto shadow-3xl">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-950/80 border-b border-white/10">
                  <th className="p-8 text-slate-500 font-black uppercase tracking-widest text-[11px] w-1/4">Feature Set</th>
                  {plans.map((plan, i) => (
                    <th key={i} className="p-8 text-center">
                      <div className={`text-[12px] font-black uppercase tracking-widest mb-1 ${plan.recommended ? 'text-[#06E4DA]' : 'text-white'}`}>
                        {plan.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold tracking-tight">
                        {billingCycle === 'monthly' ? plan.price : plan.yearly}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((category, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-white/[0.02]">
                      <td colSpan={6} className="p-8">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-l-2 border-red-600 pl-4">
                          {category.category}
                        </span>
                      </td>
                    </tr>
                    {category.features.map((feat, featIdx) => (
                      <tr key={featIdx} className="group hover:bg-white/[0.03] transition-colors">
                        <td className="p-8 text-slate-300 font-medium text-sm">
                          {feat.name}
                        </td>
                        {feat.values.map((val, valIdx) => (
                          <td key={valIdx} className="p-8 text-center text-sm">
                            {typeof val === 'boolean' ? (
                              val ? (
                                <svg className="w-5 h-5 text-[#06E4DA] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-slate-800">—</span>
                              )
                            ) : (
                              <span className={`font-bold ${val === 'Unlimited' ? 'text-white' : 'text-slate-400'}`}>
                                {val}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
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
