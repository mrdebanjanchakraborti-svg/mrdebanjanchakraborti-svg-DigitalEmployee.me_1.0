
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/20 blur-3xl opacity-20"></div>
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                alt="Cyberpunk AI Infrastructure" 
                className="w-full h-auto opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-8 rounded-3xl shadow-2xl border-red-500/20 hidden md:block">
              <div className="text-4xl font-black text-red-600 mb-1">99.9%</div>
              <div className="text-[10px] font-black text-white uppercase tracking-widest">System Reliability</div>
            </div>
          </div>

          <div>
            <h2 className="text-red-500 font-black tracking-widest uppercase text-xs mb-6">Strategic AI Partner</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
              We Don't Just Build Bots. We Build <span className="gradient-text">Workforces.</span>
            </h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              DigitalEmployee.me bridges the gap between Silicon Valley's most powerful AI 
              and the specific operational needs of local businesses. Our custom agents 
              integrate seamlessly into your existing workflows.
            </p>
            <div className="space-y-6">
              {[
                "Enterprise-grade Security Standards",
                "Official WhatsApp API Integration",
                "Custom LLM Fine-Tuning",
                "24/7 Monitoring & Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
