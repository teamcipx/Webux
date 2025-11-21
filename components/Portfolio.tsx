import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "FinTech Dashboard",
      category: "Web App",
      image: "https://picsum.photos/800/600?random=1",
      description: "A real-time financial analytics dashboard with data visualization."
    },
    {
      id: 2,
      title: "E-Commerce Lux",
      category: "E-Commerce",
      image: "https://picsum.photos/800/600?random=2",
      description: "Premium shopping experience built on Next.js and Shopify."
    },
    {
      id: 3,
      title: "HealthTrack AI",
      category: "Mobile App",
      image: "https://picsum.photos/800/600?random=3",
      description: "AI-powered health monitoring application for iOS and Android."
    },
    {
      id: 4,
      title: "Creative Agency Portfolio",
      category: "Landing Page",
      image: "https://picsum.photos/800/600?random=4",
      description: "Award-winning minimal portfolio design for a digital agency."
    },
    {
      id: 5,
      title: "Crypto Exchange",
      category: "Web3",
      image: "https://picsum.photos/800/600?random=5",
      description: "Secure and fast cryptocurrency exchange platform."
    },
    {
      id: 6,
      title: "Travel Explorer",
      category: "Web App",
      image: "https://picsum.photos/800/600?random=6",
      description: "Interactive map-based travel planning tool."
    }
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
           <div>
             <h2 className="text-base font-semibold text-brand-400 uppercase tracking-wide">Selected Work</h2>
             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Our Portfolio
             </p>
           </div>
           <button className="mt-4 md:mt-0 text-brand-400 font-medium hover:text-brand-300 flex items-center transition-colors">
             View All Projects <ExternalLink className="w-4 h-4 ml-1" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-800 aspect-[4/3] cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6`}>
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex space-x-3">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
                      <Github className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};