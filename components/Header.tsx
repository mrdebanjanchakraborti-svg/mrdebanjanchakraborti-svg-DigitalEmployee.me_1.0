
import React, { useState } from 'react';

interface HeaderProps {
  onOpenVoice: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  user: any;
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner') => void;
  currentPage: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner';
}

const Header: React.FC<HeaderProps> = ({ onOpenVoice, onOpenAuth, onLogout, user, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About Us', page: 'about' as const },
    { name: 'Services', page: 'services' as const },
    { name: 'Why Us', page: 'why' as const },
    { name: 'Pricing', page: 'pricing' as const },
    { name: 'Partner', page: 'partner' as const },
    { name: 'Contact', href: '#contact' },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
                alt="DigitalEmployee.me" 
                className="h-14 sm:h-20 w-auto object-contain transition-all"
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link)}
                className={`transition-colors text-[10px] font-black uppercase tracking-widest ${
                  (link.page === currentPage) ? 'text-red-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-800 mx-2"></div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 bg-slate-900 border border-white/5 pl-2 pr-4 py-2 rounded-full hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {user.user_metadata?.role === 'partner' ? 'Partner Portal' : 'Dashboard'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-48 glass-card border-white/10 rounded-2xl p-2 shadow-2xl animate-fade-in">
                    <button 
                      onClick={() => { setIsUserMenuOpen(false); /* Navigate to dashboard */ }}
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
            ) : null}

            <button
              onClick={onOpenVoice}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              AI Assistant
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={onOpenVoice}
              className="p-3 bg-red-600 rounded-xl text-white shadow-lg shadow-red-600/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-6 pt-4 pb-10 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href || '#'}
              className={`block py-4 text-xs font-black uppercase tracking-widest border-b border-white/5 ${
                (link.page === currentPage) ? 'text-red-500' : 'text-slate-400'
              }`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-6 grid grid-cols-1 gap-4">
            {user ? (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setIsMenuOpen(false); /* Dashboard */ }}
                  className="bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5"
                >
                  Neural Console
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); onLogout(); }}
                  className="bg-red-600/10 text-red-500 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  Disconnect
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
