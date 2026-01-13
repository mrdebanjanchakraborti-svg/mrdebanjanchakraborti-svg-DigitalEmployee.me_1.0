
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot' | 'update';
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'update'>(initialMode);
  const [accountType, setAccountType] = useState<'business' | 'partner'>('business');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setMessage(null);
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: accountType,
            },
          },
        });
        if (signUpError) throw signUpError;
        setMessage('Neural handshake initiated. Check your inbox for the verification uplink.');
      } else if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onClose();
      } else if (mode === 'forgot') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/#reset-password',
        });
        if (resetError) throw resetError;
        setMessage('Neural recovery link dispatched. Check your inbox to restore system access.');
      } else if (mode === 'update') {
        if (password !== confirmPassword) {
          throw new Error("Credentials do not match.");
        }
        if (password.length < 6) {
          throw new Error("Security protocol: Minimum 6 characters required.");
        }
        const { error: updateError } = await supabase.auth.updateUser({
          password: password
        });
        if (updateError) throw updateError;
        setMessage('Credentials synchronized. System access restored.');
        setTimeout(() => {
          setMode('login');
          setMessage(null);
        }, 2500);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden">
        {/* Dynamic Background Glow */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 transition-all duration-700 ${mode === 'update' ? 'bg-emerald-500' : mode === 'forgot' ? 'bg-red-500' : accountType === 'business' ? 'bg-red-600' : 'bg-cyan-500'}`}></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            {mode === 'update' ? (
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            ) : mode === 'forgot' ? (
              <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            ) : null}

            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">
              {mode === 'login' ? 'Gateway Access' : 
               mode === 'signup' ? 'New Deployment' : 
               mode === 'forgot' ? 'Recovery Protocol' : 'Sync Credentials'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {mode === 'login' ? 'Authenticate your Neural Identity' : 
               mode === 'signup' ? 'Provision your high-ROI workspace' : 
               mode === 'forgot' ? 'Request a neural bypass link' : 'Update your system access keys'}
            </p>
          </div>

          {/* Account Type Toggle (Signup only) */}
          {mode === 'signup' && (
            <div className="flex p-1 bg-slate-900/50 rounded-2xl mb-8 border border-white/5">
              <button 
                onClick={() => setAccountType('business')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${accountType === 'business' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Business
              </button>
              <button 
                onClick={() => setAccountType('partner')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${accountType === 'partner' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Partner
              </button>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === 'signup' && (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                />
              </div>
            )}
            
            {mode !== 'update' && !message && (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Secure Email</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                />
              </div>
            )}

            {(mode === 'login' || mode === 'signup' || mode === 'update') && !message && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {mode === 'update' ? 'New Secret Key' : 'Secret Key'}
                  </label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[9px] text-red-500 font-bold uppercase tracking-tight hover:text-red-400 transition-colors"
                    >
                      Bypass? (Forgot)
                    </button>
                  )}
                </div>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                />
                
                {/* Password Strength Indicator */}
                {(mode === 'signup' || mode === 'update') && password.length > 0 && (
                  <div className="mt-3 animate-fade-in px-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Neural Security Rating</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${
                        strength <= 1 ? 'text-red-500' : strength <= 2 ? 'text-orange-500' : strength <= 3 ? 'text-yellow-500' : 'text-emerald-500'
                      }`}>
                        {strengthLabels[strength]}
                      </span>
                    </div>
                    <div className="flex gap-1 h-1">
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
            )}

            {mode === 'update' && (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Confirm Secret Key</label>
                <input 
                  required
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center leading-relaxed">{error}</p>
              </div>
            )}
            
            {message && (
              <div className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20 animate-fade-in text-center space-y-4">
                <p className="text-green-500 text-xs font-bold uppercase tracking-widest leading-relaxed">{message}</p>
                {(mode === 'forgot' || mode === 'signup') && (
                   <button 
                    type="button"
                    onClick={() => { setMode('login'); setMessage(null); }}
                    className="text-[10px] text-white font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
                   >
                     Back to Gateway
                   </button>
                )}
              </div>
            )}

            {!message && (
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 mt-6 flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${mode === 'update' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : mode === 'forgot' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : accountType === 'business' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/20'}`}
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Processing...' : 
                 mode === 'login' ? 'Authenticate' : 
                 mode === 'signup' ? 'Initiate Deployment' : 
                 mode === 'forgot' ? 'Request Recovery' : 'Sync New Credentials'}
              </button>
            )}
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-slate-500 text-xs font-medium">
              {mode === 'login' ? "New business objective?" : 
               mode === 'signup' ? "Existing neural profile?" : 
               "Return to gateway entrance?"}
              <button 
                onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setMessage(null); }}
                className="ml-2 text-white font-black uppercase tracking-tighter hover:underline transition-all"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-slate-900/50 text-center">
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 9.503l7.834-4.603A2 2 0 0016 4H4a2 2 0 00-1.834.9zM2 6.571v5.428a2 2 0 001.243 1.848l6.257 3.682a1 1 0 001 0l6.257-3.682A2 2 0 0018 12V6.571l-7.53 4.429a1 1 0 01-.94 0L2 6.571z" clipRule="evenodd" /></svg>
            Silicon Valley Standard Encryption Enabled
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
