import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { OrderModal } from './components/OrderModal';
import { AdminDashboard } from './components/AdminDashboard';
import { NavSection, User, PricingTier, OrderData } from './types';
import { logoutUser, subscribeToAuthChanges } from './services/authService';
import { createOrder } from './services/dbService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HOME);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  // Define Pricing Tiers Data based on user requirements
  const pricingTiers: PricingTier[] = [
    {
      id: 'basic',
      name: 'BASIC PACKAGE',
      price: '500/-',
      numericPrice: 500,
      description: 'Best Budget Package to start.',
      features: [
        'Hosting & Fast Server',
        '.xyz / .site / .shop Domain',
        'Medium Design & 2 Times Revision',
        'SSL Certificate',
        'Admin Panel v1',
        'Basic SEO',
        'Custom Theme & Font Basic',
        'Mobile Responsive Design',
        'Basic Security Setup'
      ],
      buttonText: 'Start Basic',
      highlighted: false,
      color: 'emerald'
    },
    {
      id: 'standard',
      name: 'STANDARD PACKAGE',
      price: '1,500/-',
      numericPrice: 1500,
      description: 'For Growing Businesses.',
      features: [
        '.com Domain',
        'Fast Cloud Hosting',
        'Premium UI Design & 4 Times Revision',
        'SSL & Admin Panel v2',
        'Advanced SEO & Google Rank',
        'ChatGPT + AI Tools Connect',
        'AI Support Chat Support In web',
        'Blog & Course / Digital Asset System',
        'Social Media & Analytics Setup'
      ],
      buttonText: 'Go Standard',
      highlighted: true,
      color: 'yellow'
    },
    {
      id: 'premium',
      name: 'PREMIUM PACKAGE',
      price: '3,000/-',
      numericPrice: 3000,
      description: 'Professional & High-Performance.',
      features: [
        '.com Domain & Premium Hosting',
        '3–5 Page Premium UI/UX',
        'Unlimited Revision (Fair Use)',
        'SSL + Full Security & Admin Panel v3',
        'Full SEO + Google Rank Strategy',
        'AI Chatbot + Auto Reply',
        'Blog + Course + Shop System',
        'Google Business & Newsletter Setup',
        'Payment Gateway Setup'
      ],
      buttonText: 'Go Premium',
      highlighted: false,
      color: 'blue'
    },
    {
      id: 'ultimate',
      name: 'ULTIMATE PACKAGE',
      price: '5,000/-',
      numericPrice: 5000,
      description: 'Full Business + Automation + AI Powered.',
      features: [
        '.com Premium Domain & VIP Hosting',
        'Pro-Level UI/UX + Branding',
        'Unlimited Revision (Full)',
        'Enterprise Security & Admin Panel v4',
        'Full SEO (On page + Technical)',
        'AI Chatbot Custom Training',
        'Multi Blog + Shop + Course System',
        'CRM, Leads & Email Automation',
        'Payment Gateway (bKash, Nagad, Stripe)',
        'Multi-User Admin Roles'
      ],
      buttonText: 'Get Ultimate',
      highlighted: true,
      color: 'red'
    }
  ];

  // Initialize Auth Subscription
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setUser(authUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const scrollToSection = (section: NavSection) => {
    if (section === NavSection.DASHBOARD) {
      if (!user) {
        setIsAuthModalOpen(true);
        return;
      }
      setActiveSection(NavSection.DASHBOARD);
      window.scrollTo(0, 0);
      return;
    }

    setActiveSection(section);
    setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
    }, 10);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = async (loggedInUser: User) => {
    setUser(loggedInUser);
    
    // If user was trying to buy a plan
    if (pendingPlanId) {
       const tier = pricingTiers.find(t => t.id === pendingPlanId);
       if (tier) {
         setSelectedTier(tier);
         setIsOrderModalOpen(true); // Open detailed order modal instead of instant buy
       }
       setPendingPlanId(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setActiveSection(NavSection.HOME);
  };

  // Triggered when submitting the OrderModal
  const handleOrderSubmit = async (orderData: OrderData) => {
    if (!user) return;
    try {
        await createOrder(user, orderData);
        alert(`Success! Order placed for ${orderData.planName}. We've received your 50% advance (simulated). Check your dashboard.`);
        setActiveSection(NavSection.DASHBOARD);
        window.scrollTo(0, 0);
    } catch (error) {
        console.error("Order failed", error);
        alert("Something went wrong processing your order. Please try again.");
    }
  };

  const handlePlanSelect = (planId: string) => {
    const tier = pricingTiers.find(t => t.id === planId);
    if (!tier) return;

    if (!user) {
      setPendingPlanId(planId);
      setIsAuthModalOpen(true);
    } else {
      setSelectedTier(tier);
      setIsOrderModalOpen(true);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    );
  }

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
        {activeSection === NavSection.DASHBOARD && user ? (
          <AdminDashboard user={user} />
        ) : (
          <>
            <Hero scrollToSection={scrollToSection} />
            <About />
            <Services />
            <Pricing onPlanSelect={handlePlanSelect} tiers={pricingTiers} />
            <Portfolio />
            <Contact />
          </>
        )}
      </main>
      
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => {
            setIsAuthModalOpen(false);
            setPendingPlanId(null);
        }}
        onSuccess={handleLoginSuccess}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedPlan={selectedTier}
        user={user!}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default App;