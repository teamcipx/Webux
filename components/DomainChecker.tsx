import React, { useState, useCallback } from 'react';
import { Search, Loader2, CheckCircle, XCircle, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import { checkDomainAvailability } from '../services/geminiService';
import { DomainResult } from '../types';

export const DomainChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheck = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResults([]);
    setHasSearched(true);

    try {
      const data = await checkDomainAvailability(query);
      setResults(data);
    } catch (error) {
      console.error("Failed to check domain", error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <section id="domain" className="py-24 bg-slate-900 relative overflow-hidden">
       {/* Background effects */}
       <div className="absolute -left-20 top-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
       <div className="absolute -right-20 bottom-20 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-900/30 px-4 py-1 rounded-full mb-6 border border-brand-500/30">
             <Sparkles className="w-4 h-4 text-brand-400" />
             <span className="text-sm font-medium text-brand-200">AI-Powered Discovery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Find Your Perfect Digital Identity
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Use our smart search to check availability and get creative AI suggestions.
          </p>
        </div>

        <div className="glass-card p-3 rounded-2xl shadow-2xl mb-12 border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg transition-all"
                placeholder="Enter your dream domain (e.g., startuphub.com)"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center sm:w-auto w-full shadow-lg shadow-brand-600/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Check Availability"
              )}
            </button>
          </form>
        </div>

        {hasSearched && !isLoading && results.length > 0 && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Primary Result Card */}
            <div className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden ${
               results[0].isAvailable 
               ? 'bg-emerald-900/20 border-emerald-500/50 shadow-emerald-500/10' 
               : 'bg-red-900/20 border-red-500/50 shadow-red-500/10'
            }`}>
               {/* Background glow for card */}
               <div className={`absolute inset-0 opacity-10 blur-3xl ${results[0].isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
               
               <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-4 rounded-full flex items-center justify-center ${results[0].isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                     {results[0].isAvailable ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                  </div>
                  <div>
                     <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{results[0].name}</h3>
                     <p className={`font-medium text-lg ${results[0].isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
                        {results[0].isAvailable ? 'Congratulations! This domain is available.' : 'Sorry, this domain is already taken.'}
                     </p>
                     {!results[0].isAvailable && <p className="text-slate-400 text-sm mt-1">Don't worry, check out our AI suggestions below.</p>}
                  </div>
               </div>
               
               <div className="flex flex-col items-end gap-2 relative z-10 w-full md:w-auto">
                  <div className="text-right">
                     <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Estimated Price</div>
                     <div className="text-3xl font-bold text-white">{results[0].price}</div>
                  </div>
                  {results[0].isAvailable && (
                     <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-emerald-600/20 transition-transform transform hover:-translate-y-0.5">
                        Register Now <ShoppingCart className="w-4 h-4 ml-2" />
                     </button>
                  )}
               </div>
            </div>

            {/* Suggestions Grid */}
            {results.length > 1 && (
               <div>
                  <div className="flex items-center mb-6">
                     <div className="h-px flex-1 bg-slate-800"></div>
                     <h3 className="text-brand-300 font-semibold px-4 flex items-center uppercase tracking-wide text-sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Smart Alternatives
                     </h3>
                     <div className="h-px flex-1 bg-slate-800"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {results.slice(1).map((domain, index) => (
                        <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 p-4 rounded-xl hover:border-brand-500/50 hover:bg-slate-800/60 transition-all duration-300 flex items-center justify-between group cursor-pointer">
                           <div>
                              <div className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">{domain.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center">
                                 <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-1.5"></span>
                                 {domain.reasoning}
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="font-bold text-slate-300">{domain.price}</span>
                              <button className="p-2.5 bg-slate-700 hover:bg-brand-600 rounded-lg text-slate-300 hover:text-white transition-all">
                                 <ArrowRight className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};