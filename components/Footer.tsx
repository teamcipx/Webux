import React from 'react';
import { Code2, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 border-t border-emerald-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
              <Code2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">WebUX <span className="text-brand-400">BD</span></span>
          </div>
          
          <div className="flex space-x-6 text-emerald-400/60">
             <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
             <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
             <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between text-sm text-emerald-500">
          <p>&copy; 2024 WebUX BD Solutions. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-300">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};