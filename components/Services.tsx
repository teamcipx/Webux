import React from 'react';
import { Globe, Smartphone, Palette, Database, Search, BarChart } from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      description: "High-performance websites built with React, Next.js, and Tailwind. Fast, responsive, and optimized for the Bangladeshi market.",
      icon: <Globe className="w-8 h-8 text-brand-400" />
    },
    {
      id: 2,
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that provide seamless user experiences.",
      icon: <Smartphone className="w-8 h-8 text-purple-400" />
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centric design interfaces that look stunning and convert visitors into loyal customers.",
      icon: <Palette className="w-8 h-8 text-pink-400" />
    },
    {
      id: 4,
      title: "Backend Solutions",
      description: "Scalable server architectures using Node.js & Firebase, ready to handle high traffic and secure data.",
      icon: <Database className="w-8 h-8 text-green-400" />
    },
    {
      id: 5,
      title: "SEO & Digital Marketing",
      description: "Data-driven strategies to rank your business #1 on Google and reach more customers in BD.",
      icon: <Search className="w-8 h-8 text-yellow-400" />
    },
    {
      id: 6,
      title: "Business Analytics",
      description: "Comprehensive insights and tracking to understand user behavior and optimize your ROI.",
      icon: <BarChart className="w-8 h-8 text-orange-400" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-900 relative">
       <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Our Expertise</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Comprehensive Digital Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
             We combine technical precision with creative flair to deliver products that stand out in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-slate-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-slate-800 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};