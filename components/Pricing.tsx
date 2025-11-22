import React from 'react';
import { Check, Zap, Crown, Briefcase, Rocket, Star } from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  onPlanSelect: (planId: string) => void;
  tiers: PricingTier[];
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect, tiers }) => {
  
  const getBorderColor = (color?: string) => {
    switch(color) {
      case 'emerald': return 'border-emerald-500';
      case 'yellow': return 'border-yellow-500';
      case 'blue': return 'border-blue-500';
      case 'red': return 'border-red-500';
      default: return 'border-brand-500';
    }
  };

  const getButtonColor = (color?: string) => {
    switch(color) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25';
      case 'yellow': return 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/25';
      case 'blue': return 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/25';
      case 'red': return 'bg-red-600 hover:bg-red-500 shadow-red-600/25';
      default: return 'bg-brand-600 hover:bg-brand-500 shadow-brand-600/25';
    }
  };

  const getIcon = (id: string) => {
     switch(id) {
        case 'basic': return <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>;
        case 'standard': return <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>;
        case 'premium': return <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>;
        case 'ultimate': return <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>;
        default: return null;
     }
  }

  return (
    <section id="pricing" className="py-24 bg-[#0f0529] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Transparent Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Packages for Every Stage
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            No hidden fees. Choose the plan that fits your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative rounded-2xl flex flex-col h-full transition-all duration-300 ${
                tier.highlighted 
                  ? `bg-slate-900/90 border-2 ${getBorderColor(tier.color)} shadow-[0_0_30px_rgba(0,0,0,0.3)] transform md:-translate-y-2 z-10` 
                  : 'bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-slate-600'
              }`}
            >
              {tier.highlighted && tier.id === 'standard' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                  Popular
                </div>
              )}
              {tier.highlighted && tier.id === 'ultimate' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                  Best Value
                </div>
              )}

              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                     {getIcon(tier.id)}
                     {tier.name.replace(' PACKAGE', '')}
                   </h3>
                </div>
                
                <div className="mb-4">
                   <p className="text-xs text-slate-400 mb-1">{tier.description}</p>
                   <div className="flex items-baseline">
                      <span className="text-3xl font-extrabold text-white">৳{tier.price.replace('/-', '')}</span>
                      <span className="text-slate-500 ml-1 text-xs">/-</span>
                   </div>
                </div>
                
                <div className="h-px bg-slate-800 mb-4"></div>

                <ul className="space-y-2.5">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-3.5 h-3.5 mr-2 flex-shrink-0 mt-1 ${tier.highlighted ? 'text-white' : 'text-slate-500'}`} />
                      <span className="text-slate-300 text-xs leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => onPlanSelect(tier.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all text-white shadow-lg ${getButtonColor(tier.color)}`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};