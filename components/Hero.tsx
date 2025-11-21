import React from 'react';
import { ArrowRight, Database, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
import { NavSection } from '../types';

interface HeroProps {
  scrollToSection: (section: NavSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 pt-12 lg:pt-0">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-400/30 bg-brand-900/30 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
              <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">#1 Web Solution in BD</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Next Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-200">
                Digital Solutions
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-2000">
            Launch your dream project with Bangladesh's most trusted agency. 
            From <span className="text-white font-medium">Portfolios</span> to <span className="text-white font-medium">Enterprise Apps</span>.
            <br className="hidden sm:block"/>Starting at just <strong>৳5,000</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-4000">
            <button 
              onClick={() => scrollToSection(NavSection.PRICING)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-1 flex items-center group"
            >
              Start Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
               onClick={() => scrollToSection(NavSection.PORTFOLIO)}
               className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white rounded-xl font-semibold border border-slate-700 hover:border-brand-500/50 backdrop-blur-md transition-all flex items-center"
            >
              View Portfolio
            </button>
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start space-x-8 animate-fade-in-up animation-delay-4000 text-slate-500">
             <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Secure</span>
             </div>
             <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Fast</span>
             </div>
             <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Scalable</span>
             </div>
          </div>
        </div>

        {/* Right Visuals - Floating 3D Effect */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative perspective-1000">
          {/* Main Card */}
          <div className="relative z-20 animate-float">
            <div className="glass-card rounded-2xl p-6 shadow-2xl transform rotate-y-12 rotate-x-6 transition-transform duration-500 hover:rotate-0">
              
              {/* Mock Browser Header */}
              <div className="flex items-center space-x-2 mb-6 border-b border-slate-700 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1 bg-slate-800 rounded-md h-6 mx-4 flex items-center px-3">
                  <span className="text-[10px] text-slate-500">webux-bd.com/portfolio</span>
                </div>
              </div>

              {/* Mock Content */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/3 h-32 rounded-lg bg-gradient-to-br from-brand-900 to-slate-900 border border-brand-500/20 flex items-center justify-center">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-white">98%</div>
                        <div className="text-xs text-brand-400">Performance</div>
                     </div>
                  </div>
                  <div className="w-2/3 h-32 rounded-lg bg-slate-800 border border-slate-700 p-4 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors"></div>
                     <div className="h-2 w-1/2 bg-slate-700 rounded mb-2"></div>
                     <div className="h-2 w-3/4 bg-slate-700 rounded mb-4"></div>
                     <div className="flex space-x-2 mt-8">
                       <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                          <MousePointer2 className="w-4 h-4 text-white" />
                       </div>
                       <div className="flex-1 h-8 bg-slate-700 rounded-lg"></div>
                     </div>
                  </div>
                </div>
                <div className="h-24 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-between px-6">
                   <div>
                      <div className="h-2 w-24 bg-slate-600 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-slate-700 rounded"></div>
                   </div>
                   <button className="px-4 py-2 bg-brand-600 text-white text-xs rounded-lg">Update</button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements Behind */}
          <div className="absolute -top-12 -right-8 z-10 animate-float animation-delay-2000">
             <div className="bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                   <Database className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                   <div className="text-xs text-slate-400">Database</div>
                   <div className="text-sm font-bold text-white">Connected</div>
                </div>
             </div>
          </div>

          <div className="absolute -bottom-8 -left-8 z-30 animate-float animation-delay-4000">
             <div className="bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                   <Zap className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                   <div className="text-xs text-slate-400">Speed Score</div>
                   <div className="text-sm font-bold text-white">100/100</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};