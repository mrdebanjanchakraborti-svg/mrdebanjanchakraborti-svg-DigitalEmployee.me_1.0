
import React from 'react';
import { TestimonialProps } from '../types';

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
    <div className="mb-6">
      <div className="flex gap-1 text-yellow-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-300 italic text-lg leading-relaxed">"{quote}"</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-800 rounded-full flex-shrink-0">
        <img src={`https://picsum.photos/seed/${author}/100/100`} className="rounded-full" alt={author} />
      </div>
      <div>
        <div className="font-bold text-white">{author}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider">{role}, {company}</div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Our front desk was overwhelmed. Now, DigitalEmployee.me handles 70% of patient recalls automatically via WhatsApp. It paid for itself in two weeks.",
      author: "Dr. Sarah Chen",
      role: "Lead Dentist",
      company: "Aura Dental"
    },
    {
      quote: "The Real Estate Agent we built with them scores leads at 2 AM. I wake up with 3 site visits already scheduled in my calendar. Absolute game changer.",
      author: "Marcus Thorne",
      role: "Principal Broker",
      company: "Thorne & Co. Properties"
    },
    {
      quote: "I was skeptical about AI, but the guest experience agent for my Airbnb properties is incredibly polite and faster than I could ever be. Highly recommended.",
      author: "Elena Rossi",
      role: "Host",
      company: "CityScape Stays"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted by Local Leaders</h2>
          <p className="text-slate-400">Join 50+ businesses scaling with DigitalEmployee.me</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Testimonial key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
