
import React from 'react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, target, roles, icon }) => (
  <div className="glass-card rounded-3xl p-8 hover:bg-slate-800/40 transition-all hover:-translate-y-2 group flex flex-col h-full">
    <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-3">{target}</div>
    <h4 className="text-2xl font-bold text-white mb-6 leading-tight">{title}</h4>
    <ul className="space-y-4 flex-1">
      {roles.map((role, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform"></div>
          {role}
        </li>
      ))}
    </ul>
    <div className="mt-8 pt-6 border-t border-white/5">
       <button className="text-xs font-bold text-white uppercase tracking-widest hover:text-red-400 transition-colors flex items-center gap-2 group/btn">
         See Workflow 
         <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
         </svg>
       </button>
    </div>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      target: "Healthcare & Wellness",
      title: "Clinic Front Desk AI",
      roles: [
        "Automated appointment booking & recalls",
        "WhatsApp support for test results/FAQs",
        "Social: Automated health tips & reels"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
    },
    {
      target: "Professional Services",
      title: "Real Estate & Finance AI",
      roles: [
        "Lead scoring & automated property alerts",
        "CAs: Client onboarding & filing reminders",
        "Tax: Automated document collection"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    {
      target: "Education & Coaching",
      title: "Admissions & Liaison AI",
      roles: [
        "Student inquiry & batch management",
        "Automated attendance updates to parents",
        "Marketing: Student success story reels"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
    },
    {
      target: "Food & Hospitality",
      title: "Guest Experience AI",
      roles: [
        "Reservation routing & waitlist manager",
        "Airbnb: Automated check-in/out flows",
        "Visual: Instagram 'Dish of the Day' reels"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    {
      target: "Personal Care & Beauty",
      title: "Stylist & Consultant AI",
      roles: [
        "No-show prevention & slot reminders",
        "Skin Clinics: Initial consultation funnels",
        "Trend Spotter: 'Transformation' content"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      target: "Retail & E-commerce",
      title: "Sales Recovery AI",
      roles: [
        "Abandoned cart & CRM flow automation",
        "High-ticket nurture for jewelry stores",
        "Inventory reorder triggers & tracking"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    },
    {
      target: "Home & Property Services",
      title: "Dispatcher & Manager AI",
      roles: [
        "Staff rotas & route planning automation",
        "Rent collection & maintenance tracking",
        "Cleaning: Recurring booking dispatcher"
      ],
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    }
  ];

  return (
    <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Built for Local Leaders.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">We've specialized in 7 key local industries to deliver maximum efficiency and ROI for your business.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
          {/* CTA Card */}
          <div className="bg-red-600 rounded-3xl p-8 flex flex-col justify-center items-center text-center group transition-all hover:scale-[1.02]">
            <h4 className="text-2xl font-black text-white mb-4 leading-tight">Your Business<br/>Not Listed?</h4>
            <p className="text-red-100 text-sm mb-8">We build custom solutions for unique workflows every week.</p>
            <a href="#contact" className="bg-white text-red-600 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-50 transition-colors">
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
