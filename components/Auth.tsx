
import React, { useState } from 'react';
import { supabase } from '../supabase';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [accountType, setAccountType] = useState<'business' | 'partner'>('business');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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
        setMessage('Verification email sent! Please check your inbox.');
        // Don't close immediately to let them read the message
      } else if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onClose();
      } else if (mode === 'forgot') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (resetError) throw resetError;
        setMessage('Password reset link sent to your email.');
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
        {/* Background glow */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 ${accountType === 'business' ? 'bg-red-600' : 'bg-cyan-500'}`}></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join the Workforce' : 'Reset Access'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {mode === 'login' ? 'Access your Neural Dashboard' : mode === 'signup' ? 'Deploy your first Digital Employee' : 'We will send you a neural recovery link'}
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
              <div>
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
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Work Email</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
              />
            </div>
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Secret Key (Password)</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[9px] text-red-500 font-bold uppercase tracking-tight hover:text-red-400"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                />
              </div>
            )}

            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center mt-2">{error}</p>}
            {message && <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest text-center mt-2">{message}</p>}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 mt-6 ${loading ? 'opacity-50' : ''} ${accountType === 'business' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/20'}`}
            >
              {loading ? 'Authenticating...' : mode === 'login' ? 'Unlock Dashboard' : mode === 'signup' ? 'Create Account' : 'Send Recovery Link'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-xs font-medium">
              {mode === 'login' ? "Don't have an account?" : mode === 'signup' ? "Already have an account?" : "Remembered it?"}
              <button 
                onClick={() => setMode(mode === 'signup' ? 'login' : mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-white font-black uppercase tracking-tighter hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-slate-900/50 border-t border-white/5 text-center">
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 9.503l7.834-4.603A2 2 0 0016 4H4a2 2 0 00-1.834.9zM2 6.571v5.428a2 2 0 001.243 1.848l6.257 3.682a1 1 0 001 0l6.257-3.682A2 2 0 0018 12V6.571l-7.53 4.429a1 1 0 01-.94 0L2 6.571z" clipRule="evenodd" /></svg>
            Encrypted with Silicon Valley Standards
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
