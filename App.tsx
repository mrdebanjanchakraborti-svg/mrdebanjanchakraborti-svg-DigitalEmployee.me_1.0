import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner'>('home');

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
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'about' | 'services' | 'why' | 'pricing' | 'partner') => {
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
    } else {
      window.location.hash = '';
      setCurrentPage('home');
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-red-500/30">
      <Header 
        onOpenVoice={() => setIsVoiceOpen(true)} 
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
      </main>
      
      <Footer onNavigate={navigateTo} />

      <VoiceAssistant 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />
    </div>
  );
};

export default App;