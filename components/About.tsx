import React from 'react';
import { CheckCircle, Users, Target, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-900/10 skew-x-12 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Content */}
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="WebUX BD Team" 
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
             </div>
             {/* Stats Card */}
             <div className="absolute -bottom-6 -right-6 bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl animate-float">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-brand-600 rounded-lg text-white">
                      <Award className="w-8 h-8" />
                   </div>
                   <div>
                      <div className="text-2xl font-bold text-white">5+ Years</div>
                      <div className="text-xs text-slate-400">Industry Experience</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
               <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Who We Are</h2>
               <h3 className="mt-2 text-4xl font-extrabold text-white leading-tight">
                 Building the Digital Future of Bangladesh
               </h3>
            </div>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              WebUX BD is a premier digital agency based in Dhaka, dedicated to empowering local businesses with world-class technology. From small startups to large enterprises, we provide scalable, secure, and stunning web solutions that drive growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <div>
                     <h4 className="font-bold text-white">Expert Team</h4>
                     <p className="text-sm text-slate-400">Skilled developers & designers from top BD unis.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <div>
                     <h4 className="font-bold text-white">Client Focused</h4>
                     <p className="text-sm text-slate-400">We prioritize your business goals above all.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <div>
                     <h4 className="font-bold text-white">24/7 Support</h4>
                     <p className="text-sm text-slate-400">Always here to help via WhatsApp or Phone.</p>
                  </div>
               </div>
            </div>
            
            <div className="pt-4">
               <div className="h-1 w-24 bg-gradient-to-r from-brand-500 to-purple-600 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};