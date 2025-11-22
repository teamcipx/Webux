import React from 'react';
import { Check, Zap, Crown, Briefcase, Lock, Rocket } from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  onPlanSelect: (planId: string) => void;
  tiers: PricingTier[];
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect, tiers }) => {
  return (
    <section id="pricing" className="py-24 bg-[#0f0529] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Best Rates in BD</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Choose Your Digital Package
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            From personal portfolios to enterprise automation, we have a plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative rounded-2xl p-6 flex flex-col h-full transition-all duration-300 ${
                tier.highlighted 
                  ? 'bg-slate-900/80 backdrop-blur-md border-2 border-brand-500 shadow-[0_0_40px_rgba(139,92,246,0.15)] transform md:-translate-y-4 z-10' 
                  : 'bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg ${
                  tier.highlighted ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {tier.id === 'basic' && <Briefcase className="w-6 h-6" />}
                  {tier.id === 'standard' && <Zap className="w-6 h-6" />}
                  {tier.id === 'premium' && <Rocket className="w-6 h-6" />}
                  {tier.id === 'ultimate' && <Crown className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">{tier.name}</h3>
                <p className="text-slate-400 mt-2 text-xs leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                {tier.price.includes('+') ? <span className="text-slate-500 ml-2 text-xs">starting</span> : <span className="text-slate-500 ml-2 text-xs">fixed</span>}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-brand-400' : 'text-slate-500'}`} />
                    <span className="text-slate-300 text-xs leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onPlanSelect(tier.id)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  tier.highlighted 
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
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
