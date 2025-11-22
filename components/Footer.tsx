import React from 'react';
import { Code2, Twitter, Linkedin, Instagram, Facebook, Mail, ArrowRight, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
       {/* Glow effect */}
       <div className="absolute top-0 left-1/4 w-96 h-1 bg-brand-500/50 shadow-[0_0_50px_rgba(139,92,246,0.5)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-brand-500/20">
                <Code2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">WebUX <span className="text-brand-400">BD</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering Bangladeshi businesses with world-class digital solutions. 
              We build brands, not just websites.
            </p>
            <div className="flex space-x-4">
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-brand-500">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-brand-500">
                 <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-brand-500">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-brand-500">
                 <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#services" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>Web Development</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>App Development</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>UI/UX Design</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>SEO Optimization</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-brand-400 transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="text-slate-400 hover:text-brand-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-400 transition-colors">Careers <span className="ml-2 text-[10px] bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded border border-brand-500/30">Hiring</span></a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-brand-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get the latest offers and tech news from Dhaka.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600"
                />
              </div>
              <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center group shadow-lg shadow-brand-600/20">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <div className="mt-6 flex items-center text-slate-500 text-sm">
               <MapPin className="w-4 h-4 mr-2 text-brand-500" />
               Gulshan Avenue, Dhaka-1212
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WebUX BD Solutions. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
             <span>Made with</span>
             <span className="text-brand-500 animate-pulse">❤️</span>
             <span>in Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};