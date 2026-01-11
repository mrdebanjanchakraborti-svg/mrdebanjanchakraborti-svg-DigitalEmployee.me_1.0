
import React from 'react';

const WhyUs: React.FC = () => {
  const reasons = [
    {
      title: "Silicon Valley Standard",
      description: "We use the same tech stacks as multi-billion dollar startups, but optimized for local business cost structures.",
      icon: "🚀"
    },
    {
      title: "Zero Learning Curve",
      description: "Our agents work where you already are: WhatsApp, your website, and your CRM. No new dashboards to learn.",
      icon: "🧠"
    },
    {
      title: "Secure & Compliant",
      description: "All our AI models are built with strict data privacy standards, essential for medical and legal practices.",
      icon: "🛡️"
    },
    {
      title: "24/7 Availability",
      description: "While you sleep, your Digital Employee is qualifying leads, booking slots, and answering patient queries.",
      icon: "⏰"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Why Businesses Choose DigitalEmployee.me</h2>
            <div className="space-y-8">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-4xl shrink-0">{reason.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{reason.title}</h4>
                    <p className="text-slate-400">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative lg:order-last order-first">
            <div className="aspect-square bg-red-600/10 rounded-full flex items-center justify-center border border-red-500/20">
              <div className="w-3/4 h-3/4 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-500/50">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">99.9% Uptime</h3>
                <p className="text-slate-500">A Digital Employee never calls in sick, never takes a holiday, and never asks for a raise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
