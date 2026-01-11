import React, { useState } from 'react';

interface HeaderProps {
  onOpenVoice: () => void;
  onNavigate: (page: 'home' | 'about' | 'services' | 'why' | 'pricing') => void;
  currentPage: 'home' | 'about' | 'services' | 'why' | 'pricing';
}

const Header: React.FC<HeaderProps> = ({ onOpenVoice, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About Us', page: 'about' as const },
    { name: 'Services', page: 'services' as const },
    { name: 'Why Us', page: 'why' as const },
    { name: 'Pricing', page: 'pricing' as const },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.page) {
      e.preventDefault();
      onNavigate(link.page);
      setIsMenuOpen(false);
    } else if (currentPage !== 'home') {
      // If we are not on home page and click a section link, go home first
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
                className={`transition-colors text-sm font-medium ${
                  (link.page === currentPage) ? 'text-red-500 font-bold' : 'text-slate-300 hover:text-red-400'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenVoice}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              AI Voice Support
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href || '#'}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                (link.page === currentPage) ? 'text-red-500 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenVoice();
            }}
            className="w-full text-center bg-red-600 hover:bg-red-700 text-white px-3 py-5 rounded-md text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            AI Voice Support
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;