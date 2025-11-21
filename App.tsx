import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { DomainChecker } from './components/DomainChecker';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { NavSection, User } from './types';
import { logoutUser } from './services/authService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HOME);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const scrollToSection = (section: NavSection) => {
    const element = document.getElementById(section);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(section);
    }
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    // In a real app, you would save the session/token here
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const handlePlanSelect = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      // In a real app, this would proceed to checkout or save the order to Firebase
      alert(`Thanks for selecting the ${planName}. An agent will contact you at ${user.email}.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-brand-500 selection:text-white font-sans">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        onLoginClick={handleLoginClick}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Services />
        <Pricing onPlanSelect={handlePlanSelect} />
        <Portfolio />
        <DomainChecker />
        <Contact />
      </main>
      
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;