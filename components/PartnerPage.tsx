
import React, { useState } from 'react';
import { supabase } from '../supabase';

// Replace with your actual Google Apps Script Web App URL from Step 1
const GOOGLE_SHEET_SYNC_URL = 'https://script.google.com/macros/s/AKfycby5tXf8_R6Z-I_YqG-x_L-Y8_Z_Z_Z_Z_Z/exec';

interface PartnerPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner') => void;
}

const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    category: ''
  });

  const tiers = [
    {
      level: "Level 1: Starter Partner",
      requirement: "1–5 Active Referrals",
      signup: "10%",
      renewal: "15%",
      wallet: "5%",
      color: "border-[#6C28FF]/20",
      glow: "shadow-[#6C28FF]/5"
    },
    {
      level: "Level 2: Growth Partner",
      requirement: "6–10 Active Referrals",
      signup: "20%",
      renewal: "15%",
      wallet: "5%",
      color: "border-cyan-500/30",
      glow: "shadow-cyan-500/5",
      isPopular: true
    },
    {
      level: "Level 3: Pro Partner",
      requirement: "11–15 Active Referrals",
      signup: "20%",
      renewal: "15%",
      wallet: "10%",
      color: "border-red-500/30",
      glow: "shadow-red-500/5"
    },
    {
      level: "Level 4: Elite Partner",
      requirement: "16+ Active Referrals",
      signup: "25%",
      renewal: "15%",
      wallet: "15%",
      color: "border-[#06E4DA]/40",
      glow: "shadow-[#06E4DA]/10"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const syncToGoogleSheet = async (data: any) => {
    try {
      await fetch(GOOGLE_SHEET_SYNC_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sheetType: 'partner' })
      });
    } catch (err) {
      console.error('Google Sheet Sync Failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const appliedAt = new Date().toISOString();
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      category: formData.category,
      status: 'pending',
      applied_at: appliedAt
    };

    try {
      // 1. Save to Supabase
      const { error } = await supabase
        .from('partners')
        .insert([payload]);

      if (error) throw error;

      // 2. Sync to Google Sheets
      await syncToGoogleSheet({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        category: formData.category,
        appliedAt: appliedAt
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error('Partner submission error:', err);
      alert('There was an error submitting your partner application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in bg-[#071027]">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,40,255,0.08)_0,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-12 inline-block">
            <div className="w-32 h-32 bg-slate-900/50 border border-white/5 rounded-full flex items-center justify-center mx-auto text-5xl shadow-2xl animate-pulse backdrop-blur-sm">
              🤝
            </div>
          </div>
          
          <h1 className="flex flex-col items-center text-[52px] sm:text-7xl lg:text-[110px] font-black leading-[1] tracking-tighter mb-10">
            <span className="text-white">Partner With Us</span>
            <span className="text-red-500 mt-2">— Bring the</span>
            <span className="text-red-500">Digital</span>
            <span className="text-red-500">Workforce.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            Join the fastest-growing automation network. Provide <span className="text-white font-bold">Digital Employees</span> to businesses and earn lifetime recurring revenue that grows as you scale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#6C28FF] hover:bg-[#5a1ee0] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#6C28FF]/20 transition-all active:scale-95"
            >
              Become a Partner
            </button>
            <button className="w-full sm:w-auto bg-slate-900 border border-white/10 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
              Login to Partner Portal
            </button>
          </div>
        </div>
      </section>

      {/* 2. Why Partner? */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📈", title: "High-Demand AI Service", desc: "Every business needs automation. You are selling the future, not just software." },
              { icon: "📦", title: "Zero Inventory", desc: "No physical stock, no shipping, no logistics. Just pure digital value." },
              { icon: "💰", title: "Lifetime Recurring Income", desc: "You earn a share of every renewal and wallet recharge, forever." },
              { icon: "🤝", title: "Dedicated Support", desc: "Training, marketing assets, and white-label options you need to succeed." }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border-white/5 hover:border-red-500/20 transition-all hover:-translate-y-2 text-center">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-4 leading-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Commission Structure */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-red-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Earnings Roadmap</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-4">Tiered Performance Commissions</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">The more active referrals you bring, the higher your commission % across all revenue streams.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div key={i} className={`glass-card p-8 rounded-[2.5rem] border ${tier.color} ${tier.glow} shadow-lg transition-all hover:scale-105 group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl group-hover:opacity-10 transition-opacity">LVL {i+1}</div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">{tier.level}</h4>
                <p className="text-slate-500 text-xs font-bold mb-8">{tier.requirement}</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Signup</span>
                    <span className="text-3xl font-black text-white">{tier.signup}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Renewal</span>
                    <span className="text-3xl font-black text-slate-300">{tier.renewal}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <span className="text-[#06E4DA] text-[10px] font-black uppercase tracking-widest">Wallet Share</span>
                    <span className="text-3xl font-black text-[#06E4DA]">{tier.wallet}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-slate-500 text-xs italic tracking-wide">
            * Tiers are calculated automatically based on your monthly active user count.
          </p>
        </div>
      </section>

      {/* 4. Who Is This For? */}
      <section className="py-24 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Marketing Agencies", desc: "Upsell automation to your existing clients." },
              { title: "Freelancers & Consultants", desc: "Add a high-margin revenue stream to your services." },
              { title: "Software Developers", desc: "Offer a Done-For-You workforce without building from scratch." },
              { title: "Business Trainers", desc: "Help your students automate their operations." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <div>
                  <h5 className="text-white font-bold mb-2">{item.title}</h5>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dashboard Preview */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Total Transparency. Real-Time Data.</h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Our enterprise-grade Partner Portal gives you instant visibility into your business.</p>
          
          <div className="glass-card rounded-[3rem] p-4 border-white/10 shadow-2xl relative">
            <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-video relative flex flex-col">
              {/* Fake UI Header */}
              <div className="bg-slate-950 p-6 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Partner Intelligence Dashboard</div>
                <div className="w-8 h-8 rounded-full bg-slate-800"></div>
              </div>
              {/* Fake UI Body */}
              <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div className="h-40 bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center">
                    <div className="w-[80%] h-[40%] flex items-end gap-2">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#6C28FF] to-[#06E4DA] rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-24 bg-slate-950/50 rounded-2xl border border-white/5 p-4 text-left">
                      <div className="text-[8px] text-slate-500 uppercase font-black">Total Payout</div>
                      <div className="text-xl font-black text-white mt-1">₹1,42,500</div>
                    </div>
                    <div className="h-24 bg-slate-950/50 rounded-2xl border border-white/5 p-4 text-left">
                      <div className="text-[8px] text-slate-500 uppercase font-black">Active Referrals</div>
                      <div className="text-xl font-black text-white mt-1">34</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950/50 rounded-2xl border border-white/5 p-6 space-y-4">
                  <div className="text-[8px] text-slate-500 uppercase font-black text-left">Recent Transactions</div>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <div className="w-6 h-6 rounded-full bg-slate-800"></div>
                      <div className="w-16 h-2 bg-slate-800 rounded-full"></div>
                      <div className="text-[#06E4DA] text-[10px] font-bold">+₹4,500</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16 text-left">
            <div>
              <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#6C28FF]/20 flex items-center justify-center text-[#6C28FF] text-xs">📊</span>
                Live Reporting
              </h5>
              <p className="text-slate-500 text-sm leading-relaxed">Track Referred Customer Signups and Order History in real-time.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center text-red-600 text-xs">💸</span>
                Commission Tracking
              </h5>
              <p className="text-slate-500 text-sm leading-relaxed">See exactly how much you’ve earned from Signups, Renewals, and Wallet Recharges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Apply Now Form */}
      <section id="apply-form" className="py-24 lg:py-32 bg-[#020617] relative border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-[3rem] border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl"></div>
            
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-4xl font-black text-white mb-4">Application Sent!</h3>
                <p className="text-slate-400 font-medium">Our partnership team will review your profile and contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Ready to Start Earning?</h3>
                  <p className="text-slate-500 font-medium text-sm">Fill out your profile to request access to the Partner Portal.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email ID</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">WhatsApp Number</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">City / Pin Code</label>
                    <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">I am a...</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors">
                    <option value="">Select Category</option>
                    <option>Marketing Agency</option>
                    <option>Freelancer</option>
                    <option>Business Consultant</option>
                    <option>Software Developer</option>
                    <option>Other</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/20 active:scale-95 flex items-center justify-center"
                >
                  {loading ? 'Processing...' : 'Submit Application'}
                </button>
                <p className="text-[10px] text-slate-600 text-center mt-6 font-bold uppercase tracking-widest">
                  Secure Onboarding • partners@digitalemployee.me
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
