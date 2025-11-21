import React from 'react';
import { Check, Zap, Crown, Briefcase, Lock } from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  onPlanSelect: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  const tiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Student / Starter',
      price: '৳5,000',
      description: 'Get your professional CV or Portfolio live. Perfect for students and freelancers in BD.',
      features: [
        '1-Page Static Portfolio',
        'Free .xyz Domain (1 Year)',
        'Mobile Responsive',
        'Contact Form (Email Forward)',
        'Limited Support',
        'Delivery in 48 Hours'
      ],
      buttonText: 'Start Now',
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '৳15,000',
      description: 'Dynamic website with Admin Panel content control. Best for small businesses.',
      features: [
        '5-Page Dynamic Website',
        'Admin Dashboard (CMS)',
        'Firebase Database Integration',
        'User Login System (Basic)',
        '.com Domain included',
        'SEO Optimization (Google Rank)',
        '3 Months Local Support'
      ],
      buttonText: 'Go Professional',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'E-Commerce / Custom',
      price: '৳40,000+',
      description: 'Full scale online store or custom web application for your business.',
      features: [
        'Unlimited Pages & Products',
        'Full Customer Login & Profiles',
        'bKash/Nagad Payment Gateway',
        'Inventory Management',
        'Advanced Database & API',
        'Android App (Optional Add-on)',
        'Priority 24/7 Support'
      ],
      buttonText: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-emerald-950 relative">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Best Rates in BD</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Control Your Features via Price
          </p>
          <p className="mt-4 max-w-2xl text-xl text-emerald-100/60 mx-auto">
            Unlock advanced features like Databases, User Login, and Admin Panels by selecting a higher tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
                tier.highlighted 
                  ? 'bg-emerald-900 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 transform md:-translate-y-4' 
                  : 'bg-emerald-900/40 border border-emerald-800 hover:border-emerald-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Best Value
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  tier.highlighted ? 'bg-brand-500 text-white' : 'bg-emerald-800 text-emerald-200'
                }`}>
                  {tier.id === 'starter' && <Briefcase className="w-6 h-6" />}
                  {tier.id === 'pro' && <Zap className="w-6 h-6" />}
                  {tier.id === 'enterprise' && <Crown className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-emerald-100/60 mt-2 text-sm">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                {tier.price.includes('+') ? <span className="text-emerald-400/60 ml-2 text-sm">starting</span> : <span className="text-emerald-400/60 ml-2 text-sm">one-time</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${tier.highlighted ? 'text-brand-400' : 'text-emerald-600'}`} />
                    <span className="text-emerald-100/80 text-sm">{feature}</span>
                  </li>
                ))}
                {tier.id === 'starter' && (
                    <li className="flex items-start text-emerald-800">
                        <Lock className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm">Database & Login Locked</span>
                    </li>
                )}
              </ul>

              <button
                onClick={() => onPlanSelect(tier.name)}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${
                  tier.highlighted 
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-lg' 
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-700'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};