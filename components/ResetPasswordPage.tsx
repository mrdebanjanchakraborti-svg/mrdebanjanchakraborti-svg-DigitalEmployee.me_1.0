
import React, { useState } from 'react';
import { supabase } from '../supabase';

// Fix: Standardized onNavigate type across all page components
interface ResetPasswordPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi' | 'reset-password') => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length === 0) return 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return Math.min(strength, 4);
  };

  const strength = getPasswordStrength(password);
  const strengthColors = ['bg-slate-800', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthLabels = ['', 'Insecure', 'Moderate', 'Secure', 'Elite'];

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Credentials do not match. Please verify.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Security Policy: Minimum 6 characters required.");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });
      if (updateError) throw updateError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Neural link failed. Request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0,transparent_70%)]"></div>
      </div>

      <div className="w-full max-w-lg animate-fade-in">
        <div className="glass-card rounded-[3rem] border-white/5 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl font-black">RECOVERY</div>
          
          <div className="p-10 lg:p-14 relative z-10">
            {success ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-10 text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Access Restored</h2>
                <p className="text-slate-500 mb-12 font-medium text-lg leading-relaxed">Your secret key has been successfully updated across all neural nodes. System integrity verified.</p>
                <button 
                  onClick={() => onNavigate('home')}
                  className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-emerald-500 hover:text-white shadow-xl active:scale-95"
                >
                  Enter Command Center
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Reset Secret Key</h2>
                  <p className="text-slate-500 font-medium">Provision new access credentials for your workforce</p>
                </div>

                <form onSubmit={handleReset} className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">New Secret Key</label>
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800"
                    />
                    
                    {password.length > 0 && (
                      <div className="mt-4 animate-fade-in px-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Security Rating</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${
                            strength <= 1 ? 'text-red-500' : strength <= 2 ? 'text-orange-500' : strength <= 3 ? 'text-yellow-500' : 'text-emerald-500'
                          }`}>
                            {strengthLabels[strength]}
                          </span>
                        </div>
                        <div className="flex gap-1.5 h-1.5">
                          {[1, 2, 3, 4].map((step) => (
                            <div 
                              key={step} 
                              className={`flex-1 rounded-full transition-all duration-500 ${step <= strength ? strengthColors[strength] : 'bg-slate-900'}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Confirm Secret Key</label>
                    <input 
                      required
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-500 transition-all font-medium placeholder:text-slate-800"
                    />
                  </div>

                  {error && (
                    <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-center animate-fade-in">
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3 active:scale-95"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Update Neural Node Credentials'}
                  </button>
                </form>
              </>
            )}
          </div>
          
          <div className="bg-slate-900/50 p-6 text-center border-t border-white/5">
             <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 9.503l7.834-4.603A2 2 0 0016 4H4a2 2 0 00-1.834.9zM2 6.571v5.428a2 2 0 001.243 1.848l6.257 3.682a1 1 0 001 0l6.257-3.682A2 2 0 0018 12V6.571l-7.53 4.429a1 1 0 01-.94 0L2 6.571z" clipRule="evenodd" /></svg>
                Silicon Valley Standard AES-256 Encryption
             </span>
          </div>
        </div>
        
        <div className="mt-10 text-center">
           <button 
             onClick={() => onNavigate('home')}
             className="text-[10px] text-slate-500 hover:text-white font-black uppercase tracking-widest transition-colors"
           >
             Cancel and return to entrance
           </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
