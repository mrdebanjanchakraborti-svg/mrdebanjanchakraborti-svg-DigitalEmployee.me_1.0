
import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatDemo from './components/ChatDemo';
import VoiceAssistant from './components/VoiceAssistant';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import WhyPage from './components/WhyPage';
import PricingPage from './components/PricingPage';
import PartnerPage from './components/PartnerPage';
import ROIPage from './components/ROIPage';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi'>('home');

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about-page') {
        setCurrentPage('about');
        window.scrollTo(0, 0);
      } else if (hash === '#services-page') {
        setCurrentPage('services');
        window.scrollTo(0, 0);
      } else if (hash === '#why-page') {
        setCurrentPage('why');
        window.scrollTo(0, 0);
      } else if (hash === '#pricing-page') {
        setCurrentPage('pricing');
        window.scrollTo(0, 0);
      } else if (hash === '#partner-page') {
        setCurrentPage('partner');
        window.scrollTo(0, 0);
      } else if (hash === '#roi-page') {
        setCurrentPage('roi');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner' | 'roi') => {
    if (page === 'about') {
      window.location.hash = 'about-page';
    } else if (page === 'services') {
      window.location.hash = 'services-page';
    } else if (page === 'why') {
      window.location.hash = 'why-page';
    } else if (page === 'pricing') {
      window.location.hash = 'pricing-page';
    } else if (page === 'partner') {
      window.location.hash = 'partner-page';
    } else if (page === 'roi') {
      window.location.hash = 'roi-page';
    } else {
      window.location.hash = '';
      setCurrentPage('home');
      window.scrollTo(0, 0);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-red-500/30">
      <Header 
        onOpenVoice={() => setIsVoiceOpen(true)} 
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        user={user}
        onNavigate={navigateTo}
        currentPage={currentPage}
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onOpenVoice={() => setIsVoiceOpen(true)} />
            <ChatDemo />
            <About />
            <Services />
            <WhyUs />
            <Pricing />
            <Testimonials />
            <Contact />
          </>
        )}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}
        {currentPage === 'why' && <WhyPage onNavigate={navigateTo} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={navigateTo} />}
        {currentPage === 'partner' && <PartnerPage onNavigate={navigateTo} />}
        {currentPage === 'roi' && <ROIPage onNavigate={navigateTo} />}
      </main>
      
      <Footer onNavigate={navigateTo} onOpenAuth={handleOpenAuth} user={user} />

      <VoiceAssistant 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />

      <Auth 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default App;
