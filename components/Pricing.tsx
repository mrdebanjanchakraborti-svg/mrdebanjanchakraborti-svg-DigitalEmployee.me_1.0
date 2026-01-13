
import React from 'react';
import { PricingPlanProps } from '../types';

const PlanCard: React.FC<PricingPlanProps & { firstMonth: string }> = ({ name, price, description, features, firstMonth, isPopular }) => (
  <div className={`relative flex flex-col p-8 rounded-2xl border transition-all ${
    isPopular 
      ? 'bg-slate-900 border-red-500 scale-105 shadow-2xl shadow-red-500/10 z-10' 
      : 'bg-slate-950 border-slate-800'
  }`}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-4xl font-bold text-white">{price}</span>
      <span className="text-slate-500">/mo</span>
    </div>
    <div className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
      + {firstMonth} 1st Month
    </div>
    <p className="text-slate-400 text-sm mb-8">{description}</p>
    
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>

    <button className={`w-full py-4 rounded-xl font-bold transition-all ${
      isPopular 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : 'bg-slate-800 hover:bg-slate-700 text-white'
    }`}>
      Get Started
    </button>
  </div>
);

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      firstMonth: "₹0",
      description: "Experience the power of Digital Employee with zero commitment.",
      features: [
        "Basic Dashboard Access",
        "Limited Social Posting",
        "Community Support",
        "Unified Inbox (Preview)",
        "Onboarding Guide"
      ]
    },
    {
      name: "Starter",
      price: "₹2,500",
      firstMonth: "₹10,000",
      description: "Perfect for growing local businesses starting their AI journey.",
      features: [
        "Full Dashboard & Onboarding",
        "Campaign Builder (Basic)",
        "Social Calendar",
        "Unified Inbox",
        "Email Support"
      ]
    },
    {
      name: "Growth",
      price: "₹6,500",
      firstMonth: "₹25,000",
      isPopular: true,
      description: "Comprehensive automation for established local leaders.",
      features: [
        "Advanced Campaign Builder",
        "AI Brain Integration",
        "Automation Engine (Standard)",
        "Lead Scoring",
        "Priority Support"
      ]
    },
    {
      name: "Professional",
      price: "₹15,000",
      firstMonth: "₹50,000",
      description: "Elite performance for high-volume service providers.",
      features: [
        "Full AI Voice Support",
        "Custom Automation Workflows",
        "Advanced Lead Scoring",
        "Billing System Sync",
        "Dedicated Account Manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Investment in Growth</h2>
          <p className="text-slate-400 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">Simple pricing. Massive scale. No recruitment headaches.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
