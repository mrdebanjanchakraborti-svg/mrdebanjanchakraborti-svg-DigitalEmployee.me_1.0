
import React, { useState } from 'react';
import { supabase } from '../supabase';

const GOOGLE_SHEET_SYNC_URL = 'https://script.google.com/macros/s/AKfycby5tXf8_R6Z-I_YqG-x_L-Y8_Z_Z_Z_Z_Z/exec';

// Fix: Standardized onNavigate type across all page components
interface PartnerPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi' | 'reset-password') => void;
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

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      category: formData.category,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    try {
      // 1. Save to Supabase
      const { error: sqlError } = await supabase
        .from('partners')
        .insert([payload]);

      if (sqlError) {
        console.error('Partner Deployment Error:', sqlError);
        throw new Error(`Database error: ${sqlError.message}`);
      }

      // 2. Sync to Google Sheets
      await syncToGoogleSheet(payload);

      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Partner application failed:', err);
      alert(err.message || 'There was an error submitting your partner application. Please verify the backend schema initialization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in bg-[#071027]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,40,255,0.08)_0,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-12 inline-block">
            <div className="w-32 h-32 bg-slate-900/50 border border-white/5 rounded-full flex items-center justify-center mx-auto text-5xl shadow-2xl animate-pulse backdrop-blur-sm">
              🤝
            </div>
          </div>
          
          <h1 className="flex flex-col items-center text-[52px] sm:text-7xl lg:text-[110px] font-black leading-[1] tracking-tighter mb-10">
            <span className="text-white">Neural Partnership</span>
            <span className="text-red-500 mt-2">— Scalable</span>
            <span className="text-red-500">Autonomous</span>
            <span className="text-red-500">Wealth.</span>
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

      {/* Commission Structure */}
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

      {/* Apply Now Form */}
      <section id="apply-form" className="py-24 lg:py-32 bg-[#020617] relative border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-[3rem] border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl"></div>
            
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">Handshake Received</h3>
                <p className="text-slate-400 font-medium">Our partnership team will review your profile and contact you within 24 hours to sync objectives.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Initiate Partnership</h3>
                  <p className="text-slate-500 font-medium text-sm">Provision your neural profile to request access to the Partner Portal.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email Identity</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">WhatsApp / Signal</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">City / Location</label>
                    <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Primary Industry / Expertise</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#6C28FF] transition-colors">
                    <option value="">Select Category</option>
                    <option>Marketing Agency</option>
                    <option>Freelancer / Solo-Architect</option>
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
                  {loading ? 'Processing Protocol...' : 'Submit Application'}
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
