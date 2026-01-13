
import React, { useState } from 'react';
import { supabase } from '../supabase';

// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SHEET_SYNC_URL = 'https://script.google.com/macros/s/AKfycby5tXf8_R6Z-I_YqG-x_L-Y8_Z_Z_Z_Z_Z/exec';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    industry: '',
    company: '',
    interest: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const syncToGoogleSheet = async (data: any) => {
    try {
      await fetch(GOOGLE_SHEET_SYNC_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sheetType: 'contact' })
      });
    } catch (err) {
      console.error('Google Sheet Sync Failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // We use snake_case to match Postgres standard naming conventions
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      industry: formData.industry,
      company: formData.company,
      interest: formData.interest,
      requirements: formData.requirements,
      created_at: new Date().toISOString()
    };

    try {
      // 1. Save to Supabase
      const { error: sqlError } = await supabase
        .from('contacts')
        .insert([payload]);

      if (sqlError) {
        console.error('Supabase SQL Error Details:', sqlError);
        throw new Error(`Database error: ${sqlError.message}`);
      }

      // 2. Sync to Google Sheets (Optional secondary sync)
      await syncToGoogleSheet(payload);

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission audit failed:', err);
      alert(err.message || 'There was an error submitting your request. Please ensure the database schema is correctly initialized.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative">
          <div className="grid lg:grid-cols-5">
            
            {/* Sidebar Info */}
            <div className="lg:col-span-2 p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col justify-center border-r border-white/5">
              <div className="mb-10">
                <span className="bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-red-500/20">
                  Secure Deployment Hub
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                Initiate Your <br/><span className="gradient-text">Neural Audit.</span>
              </h2>
              <p className="text-slate-400 mb-12 leading-relaxed font-light text-lg">
                Map your high-ROI opportunities. Our engineers will review your workflow and propose a 24/7 autonomous workforce.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Direct Priority Line</div>
                    <div className="text-lg font-bold text-white tracking-tight">+91 9477417641</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">SLA Response Guarantee</div>
                    <div className="text-lg font-bold text-white tracking-tight">Under 4 Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-3 bg-slate-800/20 p-8 sm:p-12 lg:p-16 backdrop-blur-xl">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-green-500/20">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Audit Initiated</h3>
                  <p className="text-slate-400 font-medium max-w-sm">Our AI Architects are reviewing your company's digital footprint. A specialist will reach out shortly to schedule the node sync.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Row 1: Identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Full Name</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Business Email</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@company.com" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                  </div>

                  {/* Row 2: Lead Segmentation Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Secure Phone</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">City / Pin Code</label>
                      <input required name="city" value={formData.city} onChange={handleChange} type="text" placeholder="e.g. Mumbai, New York" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Market Sector</label>
                      <div className="relative">
                        <select required name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium appearance-none">
                          <option value="">Choose Sector</option>
                          <option>Healthcare & Medical</option>
                          <option>Real Estate & Development</option>
                          <option>Financial & Professional Services</option>
                          <option>Retail & E-commerce</option>
                          <option>Food & Hospitality</option>
                          <option>Education & Training</option>
                          <option>Home & Field Services</option>
                          <option>Other</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Business Context */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Organization Name</label>
                      <input required name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Company Ltd." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Tier Preference</label>
                      <select required name="interest" value={formData.interest} onChange={handleChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium appearance-none">
                        <option value="">Select Tier</option>
                        <option>Starter (₹2,500/mo)</option>
                        <option>Growth (₹6,500/mo)</option>
                        <option>Professional (₹15,000/mo)</option>
                        <option>Custom Enterprise (₹35,500+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Preferences */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Workflow Requirements / Neural Mapping</label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="e.g. Need WhatsApp automation for clinic recalls, or lead scoring for property inquiries..." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-500 transition-all h-32 resize-none font-medium placeholder:text-slate-800"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center justify-center"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Authenticating Payload...
                      </span>
                    ) : 'Provision Audit Session'}
                  </button>

                  <p className="text-[10px] text-slate-600 text-center font-bold uppercase tracking-widest border-t border-white/5 pt-6">
                    Direct Sync with DigitalEmployee.me Revenue OS • ISO 27001 Cloud Standard
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
