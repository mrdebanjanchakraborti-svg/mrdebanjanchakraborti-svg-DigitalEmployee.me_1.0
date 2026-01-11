
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full opacity-50"></div>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" 
                alt="AI Robotics Visualization" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 glass-card p-8 rounded-[2rem] shadow-2xl border-white/10 hidden md:block">
              <div className="text-5xl font-black text-red-500 mb-2">0%</div>
              <div className="text-xs font-black text-white uppercase tracking-[0.3em]">Turnover Rate</div>
              <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-widest">Digital Employees don't quit.</p>
            </div>
          </div>

          <div className="relative">
            <h2 className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-6">Elite GenAI Development</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
              We Don't Just Build Bots.<br /> We Hire <span className="gradient-text">Future Staff.</span>
            </h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              DigitalEmployee.me bridges the gap between Silicon Valley's most advanced AI research and your local business storefront. Our agents are 100% custom-trained on your specific SOPs, voice, and industry regulations.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                 {[
                  "Native WhatsApp integration",
                  "Advanced Gemini 3 reasoning",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
                    <div className="w-5 h-5 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                 {[
                  "HIPAA/GDPR compliance",
                  "Localized deployment support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
                    <div className="w-5 h-5 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs group">
              <span className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl group-hover:bg-slate-800 transition-colors">Learn our implementation story</span>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-xl shadow-red-600/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
