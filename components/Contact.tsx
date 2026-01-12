
import React, { useState } from 'react';
import { supabase } from '../supabase';

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
    website: '',
    interest: '',
    contactTime: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          industry: formData.industry,
          company: formData.company,
          website: formData.website,
          interest: formData.interest,
          contact_time: formData.contactTime,
          requirements: formData.requirements,
          submitted_at: new Date().toISOString()
        }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
          <div className="grid lg:grid-cols-5">
            {/* Sidebar Info */}
            <div className="lg:col-span-2 p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col justify-center border-r border-white/5">
              <div className="mb-10">
                <span className="bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-red-500/20">
                  Secure Deployment
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
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">SLA Response Time</div>
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
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Request Received</h3>
                  <p className="text-slate-400 font-medium max-w-sm">Our AI Architects are reviewing your company's digital footprint. A specialist will reach out shortly.</p>
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

                  {/* Row 2: The Core "3-Column Table" Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Mobile (with Country Code)</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">City</label>
                      <input required name="city" value={formData.city} onChange={handleChange} type="text" placeholder="Palo Alto / Mumbai" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Select Industry</label>
                      <select required name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium appearance-none">
                        <option value="">Choose Sector</option>
                        <option>Healthcare & Medical</option>
                        <option>Real Estate & Development</option>
                        <option>Financial & Professional Services</option>
                        <option>Retail & E-commerce</option>
                        <option>Food & Hospitality</option>
                        <option>Education & Training</option>
                        <option>Home & Field Services</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Business Context */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Company Name</label>
                      <input required name="company" value={formData.company} onChange={handleChange} type="text" placeholder="InFlow Ltd." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Website URL</label>
                      <input name="website" value={formData.website} onChange={handleChange} type="url" placeholder="https://..." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Plan of Interest</label>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Preferred Contact Time</label>
                      <select name="contactTime" value={formData.contactTime} onChange={handleChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium appearance-none">
                        <option value="">Anytime</option>
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (12 PM - 4 PM)</option>
                        <option>Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                       <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center justify-center"
                       >
                        {loading ? 'Submitting...' : 'Schedule Audit Session'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Workflow Requirements / Pain Points</label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="e.g. Need WhatsApp automation for clinic recalls..." className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-500 transition-all h-32 resize-none font-medium placeholder:text-slate-800"></textarea>
                  </div>

                  <p className="text-[10px] text-slate-600 text-center font-bold uppercase tracking-widest border-t border-white/5 pt-6">
                    Direct Sync with InFlow Revenue OS • ISO 27001 Cloud Standard
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