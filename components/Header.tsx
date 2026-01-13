
import React, { useState } from 'react';

interface HeaderProps {
  onOpenVoice: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  user: any;
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi') => void;
  currentPage: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi';
}

const Header: React.FC<HeaderProps> = ({ onOpenVoice, onOpenAuth, onLogout, user, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT US', page: 'about' as const },
    { name: 'SERVICES', page: 'services' as const },
    { name: 'WHY US', page: 'why' as const },
    { name: 'PRICING', page: 'pricing' as const },
    { name: 'PARTNER', page: 'partner' as const },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.page) {
      e.preventDefault();
      onNavigate(link.page);
      setIsMenuOpen(false);
    } else if (currentPage !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(link.href || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24 lg:h-32">
          {/* Logo Section */}
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
                alt="DigitalEmployee.me" 
                className="h-16 lg:h-24 w-auto object-contain transition-all"
              />
            </button>
          </div>

          {/* Desktop Nav - Matching Screenshot Styles */}
          <nav className="hidden xl:flex items-center gap-10">
            <div className="flex items-center gap-8 2xl:gap-12 mr-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href || '#'}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`transition-all duration-300 text-[11px] font-black uppercase tracking-[0.25em] ${
                    (link.page === currentPage) ? 'text-red-500' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="h-8 w-px bg-white/10 mx-2"></div>

            {user && (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 bg-slate-900 border border-white/5 pl-2 pr-4 py-2 rounded-full hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {user.user_metadata?.role === 'partner' ? 'Partner Portal' : 'Console'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-48 glass-card border-white/10 rounded-2xl p-2 shadow-2xl animate-fade-in">
                    <button 
                      onClick={() => { setIsUserMenuOpen(false); /* Navigate */ }}
                      className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
                    >
                      Neural Console
                    </button>
                    <button 
                      onClick={() => { setIsUserMenuOpen(false); onLogout(); }}
                      className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onOpenVoice}
              className="bg-[#e62e2e] hover:bg-[#ff3b3b] text-white px-10 py-4 rounded-[1.2rem] text-[12px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_-5px_rgba(230,46,46,0.4)] flex items-center gap-4 active:scale-95 group"
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform"></div>
              AI ASSISTANT
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-6">
            <button
              onClick={onOpenVoice}
              className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-600/20 active:scale-90 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="xl:hidden bg-[#020617] border-b border-white/5 px-8 pt-4 pb-12 space-y-6 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href || '#'}
              className={`block py-5 text-[12px] font-black uppercase tracking-widest border-b border-white/5 ${
                (link.page === currentPage) ? 'text-red-500' : 'text-slate-400'
              }`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
