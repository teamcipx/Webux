import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "AmarShop E-Commerce",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
      description: "A complete multi-vendor e-commerce platform similar to Daraz with bKash integration."
    },
    {
      id: 2,
      title: "Sheba Digital Agency",
      category: "Corporate Site",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description: "Modern corporate website for a top marketing agency in Gulshan."
    },
    {
      id: 3,
      title: "MediCare BD App",
      category: "Mobile App",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      description: "Doctor appointment booking and telemedicine app for iOS and Android."
    },
    {
      id: 4,
      title: "Dhaka Real Estate",
      category: "Web Portal",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      description: "Property listing portal with virtual tours and map integration."
    },
    {
      id: 5,
      title: "EduTech LMS",
      category: "Education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      description: "Learning management system for coaching centers with live class features."
    },
    {
      id: 6,
      title: "HungryNaki Redesign",
      category: "UI/UX Concept",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      description: "A modern reimagining of the popular food delivery app interface."
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
                Recent Projects
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