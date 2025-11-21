import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { DomainChecker } from './components/DomainChecker';
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

  // Define Pricing Tiers Data Accessible globally for selection logic
  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Student / Starter',
      price: '৳5,000',
      numericPrice: 5000,
      description: 'Get your professional CV or Portfolio live. Perfect for students and freelancers in BD.',
      features: [
        '1-Page Static Portfolio',
        'Free .xyz Domain (1 Year)',
        'Mobile Responsive',
        'Contact Form',
        'Delivery in 48 Hours'
      ],
      buttonText: 'Start Now',
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '৳15,000',
      numericPrice: 15000,
      description: 'Dynamic website with Admin Panel content control. Best for small businesses.',
      features: [
        '5-Page Dynamic Website',
        'Admin Dashboard (CMS)',
        'Firebase Database Integration',
        'User Login System (Basic)',
        '.com Domain included',
        'SEO Optimization',
        '3 Months Support'
      ],
      buttonText: 'Go Professional',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'E-Commerce / Custom',
      price: '৳40,000+',
      numericPrice: 40000,
      description: 'Full scale online store or custom web application for your business.',
      features: [
        'Unlimited Pages & Products',
        'Full Customer Login & Profiles',
        'bKash/Nagad Payment Gateway',
        'Advanced Database & API',
        'Android App (Optional)',
        'Priority 24/7 Support'
      ],
      buttonText: 'Contact Sales',
      highlighted: false
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
            <Services />
            <Pricing onPlanSelect={handlePlanSelect} tiers={pricingTiers} />
            <Portfolio />
            <DomainChecker />
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