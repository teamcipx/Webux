import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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

  // Define Pricing Tiers Data Accessible globally for selection logic
  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Personal / Portfolio',
      price: '৳5,500',
      numericPrice: 5500,
      description: 'Ideal for students, influencers, and freelancers to showcase their work professionally.',
      features: [
        'Modern Single Page Application (SPA)',
        'Free .xyz or .info Domain (1 Year)',
        'High-Speed Secure Hosting',
        'Contact Form with Email Alerts',
        'Social Media Integration',
        'Mobile & Tablet Responsive',
        'Delivery in 3 Days'
      ],
      buttonText: 'Launch Personal Brand',
      highlighted: false
    },
    {
      id: 'business',
      name: 'Business / Corporate',
      price: '৳18,500',
      numericPrice: 18500,
      description: 'Complete digital presence for small businesses and agencies with content control.',
      features: [
        '5-8 Page Dynamic Website',
        'Free .com Domain (1 Year)',
        'Admin Panel (CMS) to Edit Content',
        'SEO Optimization (Google Ranking)',
        'WhatsApp Chat Widget',
        'Google Maps & Analytics Setup',
        '3 Months Free Maintenance'
      ],
      buttonText: 'Grow Your Business',
      highlighted: true
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce / Custom',
      price: '৳45,000+',
      numericPrice: 45000,
      description: 'Full-featured online store or custom software for high-scale operations.',
      features: [
        'Unlimited Products & Categories',
        'User Login, Cart & Wishlist',
        'bKash/Nagad/Card Payment Gateway',
        'Inventory & Order Management System',
        'SMS Notification Integration',
        'High Performance Database',
        '6 Months Priority Support'
      ],
      buttonText: 'Start Selling Online',
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