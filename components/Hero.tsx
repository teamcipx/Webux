import React from 'react';
import { ArrowRight, Database, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
import { NavSection } from '../types';

interface HeroProps {
  scrollToSection: (section: NavSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020617]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Violet Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        {/* Indigo Blob */}
        <div className="absolute top-[10%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        {/* Pink/Purple Blob */}
        <div className="absolute bottom-[-10%] left-[20%] w-[30rem] h-[30rem] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 pt-12 lg:pt-0">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-400/30 bg-brand-900/30 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
              <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">#1 Tech Agency in BD</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Future Ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-200">
                Digital Solutions
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-2000">
            Launch your dream project with Bangladesh's premium dev team. 
            <br />
            <span className="text-brand-300">Portfolios</span> • <span className="text-brand-300">eCommerce</span> • <span className="text-brand-300">Web Apps</span>
            <br className="mt-2"/>
            Starting at just <strong className="text-white">৳5,000</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-4000">
            <button 
              onClick={() => scrollToSection(NavSection.PRICING)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1 flex items-center group"
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
             <div className="flex items-center space-x-2 group">
                <ShieldCheck className="w-5 h-5 text-brand-500 group-hover:text-brand-400 transition-colors" />
                <span className="text-sm font-medium group-hover:text-slate-300">Secure</span>
             </div>
             <div className="flex items-center space-x-2 group">
                <Zap className="w-5 h-5 text-brand-500 group-hover:text-brand-400 transition-colors" />
                <span className="text-sm font-medium group-hover:text-slate-300">Fast</span>
             </div>
             <div className="flex items-center space-x-2 group">
                <Database className="w-5 h-5 text-brand-500 group-hover:text-brand-400 transition-colors" />
                <span className="text-sm font-medium group-hover:text-slate-300">Scalable</span>
             </div>
          </div>
        </div>

        {/* Right Visuals - Floating 3D Effect */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative perspective-1000">
          {/* Main Card */}
          <div className="relative z-20 animate-float">
            <div className="glass-card rounded-2xl p-6 shadow-2xl transform rotate-y-12 rotate-x-6 transition-transform duration-500 hover:rotate-0 bg-gradient-to-br from-slate-900/80 to-slate-900/40">
              
              {/* Mock Browser Header */}
              <div className="flex items-center space-x-2 mb-6 border-b border-slate-700/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="flex-1 bg-slate-800/50 rounded-md h-6 mx-4 flex items-center px-3 border border-slate-700/30">
                  <span className="text-[10px] text-brand-300/70 font-mono">https://webux-bd.com/app</span>
                </div>
              </div>

              {/* Mock Content */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/3 h-32 rounded-lg bg-gradient-to-br from-brand-900/80 to-slate-900 border border-brand-500/20 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-brand-500/10 animate-pulse"></div>
                     <div className="text-center relative z-10">
                        <div className="text-3xl font-bold text-white">99<span className="text-sm">%</span></div>
                        <div className="text-[10px] text-brand-400 uppercase tracking-wider">Uptime</div>
                     </div>
                  </div>
                  <div className="w-2/3 h-32 rounded-lg bg-slate-800/50 border border-slate-700/50 p-4 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                     <div className="h-2 w-1/2 bg-slate-700 rounded mb-2"></div>
                     <div className="h-2 w-3/4 bg-slate-700 rounded mb-4"></div>
                     <div className="flex space-x-2 mt-8">
                       <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 flex items-center justify-center shadow-lg">
                          <MousePointer2 className="w-4 h-4 text-white" />
                       </div>
                       <div className="flex-1 h-8 bg-slate-700/50 rounded-lg border border-slate-600/30"></div>
                     </div>
                  </div>
                </div>
                <div className="h-24 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-center justify-between px-6 backdrop-blur-sm">
                   <div>
                      <div className="h-2 w-24 bg-slate-600 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-slate-700 rounded"></div>
                   </div>
                   <button className="px-4 py-2 bg-brand-600/20 text-brand-300 border border-brand-500/30 text-xs rounded-lg hover:bg-brand-600 hover:text-white transition-colors">Deploy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements Behind */}
          <div className="absolute -top-12 -right-8 z-10 animate-float animation-delay-2000">
             <div className="glass-card p-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center space-x-3 border-l-4 border-l-blue-500">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                   <Database className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                   <div className="text-xs text-slate-400">Server Status</div>
                   <div className="text-sm font-bold text-white">Online</div>
                </div>
             </div>
          </div>

          <div className="absolute -bottom-8 -left-8 z-30 animate-float animation-delay-4000">
             <div className="glass-card p-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] flex items-center space-x-3 border-l-4 border-l-brand-500">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                   <Zap className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                   <div className="text-xs text-slate-400">Optimization</div>
                   <div className="text-sm font-bold text-white">A+ Grade</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};