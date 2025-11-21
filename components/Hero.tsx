import React from 'react';
import { ArrowRight, Layers, Zap } from 'lucide-react';
import { NavSection } from '../types';

interface HeroProps {
  scrollToSection: (section: NavSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-emerald-950">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-ping"></span>
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wide">#1 Web Agency in Bangladesh</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-200">
              Digital Future
            </span>
          </h1>
          
          <p className="text-xl text-emerald-100/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Premium Portfolio Websites, E-commerce solutions, and Custom Apps. 
            Registration open now. Packages start from just <strong>৳5,000</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => scrollToSection(NavSection.PRICING)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/25 transition-all flex items-center group"
            >
              See Packages
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
               onClick={() => scrollToSection(NavSection.DOMAIN)}
               className="px-8 py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-semibold border border-emerald-700 transition-all flex items-center"
            >
              Check BD Domains
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-emerald-800 pt-8">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-emerald-400">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">৳5k</div>
              <div className="text-sm text-emerald-400">Starting Price</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-emerald-400">Dhaka Support</div>
            </div>
          </div>
        </div>

        {/* Hero Graphic / Visual */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="relative rounded-2xl border border-emerald-700 bg-emerald-900/50 backdrop-blur-xl p-4 shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-all duration-500">
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500 rounded-full opacity-20 blur-xl"></div>
             <div className="rounded-xl overflow-hidden bg-emerald-950 relative aspect-[4/3]">
                 {/* Abstract Code UI Representation */}
                 <div className="absolute top-0 left-0 w-full h-8 bg-emerald-900 flex items-center px-4 space-x-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="pt-12 px-8 pb-8">
                    <div className="h-4 w-3/4 bg-emerald-800 rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-emerald-800 rounded mb-8"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-emerald-900 rounded-lg border border-emerald-800 p-4">
                          <div className="w-8 h-8 bg-brand-900/50 rounded mb-2 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-brand-400" />
                          </div>
                          <div className="h-2 w-16 bg-emerald-800 rounded mb-2"></div>
                          <div className="h-2 w-full bg-emerald-800 rounded"></div>
                        </div>
                        <div className="h-32 bg-emerald-900 rounded-lg border border-emerald-800 p-4">
                           <div className="w-8 h-8 bg-red-900/30 rounded mb-2 flex items-center justify-center">
                            <Layers className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="h-2 w-16 bg-emerald-800 rounded mb-2"></div>
                          <div className="h-2 w-full bg-emerald-800 rounded"></div>
                        </div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};