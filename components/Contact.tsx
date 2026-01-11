
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tighter">Book Your Free AI Session</h2>
              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                Take 15 minutes to see exactly how our neural automation saves you 10+ hours a week. Rated #1 Best Local AI Website 2026.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-600/5">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Direct Line</div>
                    <div className="text-xl font-black text-white">(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-600/5">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Headquarters</div>
                    <div className="text-lg font-black text-white">123 Fitness Blvd, Downtown District</div>
                    <div className="text-sm text-slate-500">City 90210</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-600/5">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Operation Hours</div>
                    <div className="text-sm font-bold text-white">Mon–Fri: 5:00 AM – 11:00 PM</div>
                    <div className="text-sm font-bold text-white">Sat–Sun: 7:00 AM – 9:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 sm:p-12 lg:p-16 border-l border-slate-700">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-green-500/5">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Deployment Requested</h3>
                  <p className="text-slate-400 font-medium">Our implementation team will contact you within 4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors font-medium" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Business Email</label>
                    <input required type="email" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Industry</label>
                      <select required className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors font-medium">
                        <option value="">Select</option>
                        <option>Healthcare</option>
                        <option>Real Estate</option>
                        <option>Professional</option>
                        <option>Retail</option>
                        <option>Hospitality</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Interest</label>
                      <select required className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors font-medium">
                        <option value="">Select</option>
                        <option>Automation</option>
                        <option>Lead Gen</option>
                        <option>Social AI</option>
                        <option>Voice AI</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Primary Workflow Pain Point</label>
                    <textarea className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors h-24 resize-none font-medium"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-600/30">
                    Schedule Audit Session
                  </button>
                  <p className="text-[10px] text-slate-600 text-center mt-6 font-bold uppercase tracking-widest">
                    Founded 2015 • Secure Silicon Valley Standard Encryption
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
