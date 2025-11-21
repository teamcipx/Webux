import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-emerald-900 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Get in Touch</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl mb-8">
               Ready to start your project in BD?
            </p>
            <p className="text-lg text-emerald-100/70 mb-12">
              We are Dhaka's leading digital agency. Fill out the form or visit our Gulshan office.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-900/50 rounded-lg flex items-center justify-center border border-brand-500/20">
                    <Mail className="w-6 h-6 text-brand-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="mt-1 text-emerald-200/70">support@webuxbd.com</p>
                </div>
              </div>

              <div className="flex items-start">
                 <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-900/50 rounded-lg flex items-center justify-center border border-brand-500/20">
                    <Phone className="w-6 h-6 text-brand-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Hotline</h3>
                  <p className="mt-1 text-emerald-200/70">+880 1711-000000</p>
                </div>
              </div>

              <div className="flex items-start">
                 <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-900/50 rounded-lg flex items-center justify-center border border-brand-500/20">
                    <MapPin className="w-6 h-6 text-brand-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Office</h3>
                  <p className="mt-1 text-emerald-200/70">Level 4, Gulshan Avenue<br />Dhaka-1212, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-emerald-950 rounded-2xl p-8 shadow-xl border border-emerald-800">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-emerald-200">Full Name</label>
                <input type="text" id="name" className="mt-1 block w-full bg-emerald-900 border border-emerald-700 rounded-lg shadow-sm py-3 px-4 text-white focus:ring-brand-500 focus:border-brand-500 transition-colors placeholder-emerald-700" placeholder="Rahim Ahmed" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-emerald-200">Email Address</label>
                <input type="email" id="email" className="mt-1 block w-full bg-emerald-900 border border-emerald-700 rounded-lg shadow-sm py-3 px-4 text-white focus:ring-brand-500 focus:border-brand-500 transition-colors placeholder-emerald-700" placeholder="rahim@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-emerald-200">Message</label>
                <textarea id="message" rows={4} className="mt-1 block w-full bg-emerald-900 border border-emerald-700 rounded-lg shadow-sm py-3 px-4 text-white focus:ring-brand-500 focus:border-brand-500 transition-colors placeholder-emerald-700" placeholder="I need a portfolio website..."></textarea>
              </div>
              <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-brand-500 transition-all">
                Send Message <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};