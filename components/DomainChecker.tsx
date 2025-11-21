import React, { useState, useCallback } from 'react';
import { Search, Loader2, CheckCircle, XCircle, Sparkles, ArrowRight } from 'lucide-react';
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
    <section id="domain" className="py-24 bg-slate-800 relative overflow-hidden">
       {/* Background effects */}
       <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
       <div className="absolute -right-20 bottom-20 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-900/50 px-4 py-1 rounded-full mb-6 border border-brand-500/30">
             <Sparkles className="w-4 h-4 text-brand-400" />
             <span className="text-sm font-medium text-brand-200">AI-Powered Discovery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Find Your Perfect Digital Identity
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Use our smart search to find available domains, check pricing, and get creative AI suggestions for your brand.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-slate-700 mb-12">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-lg"
                placeholder="Enter your dream domain (e.g., startuphub.com)"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center sm:w-auto w-full"
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
          <div className="space-y-4 animate-fade-in-up">
            {results.map((domain, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  domain.isAvailable 
                    ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50' 
                    : 'bg-slate-900/40 border-red-500/20 hover:border-red-500/30 opacity-80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${domain.isAvailable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {domain.isAvailable ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{domain.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{domain.reasoning}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 mt-2 sm:mt-0 pl-11 sm:pl-0">
                  <div className="text-right">
                    <div className="text-sm text-slate-500 uppercase font-medium tracking-wider">Price</div>
                    <div className="text-lg font-semibold text-white">{domain.price}</div>
                  </div>
                  {domain.isAvailable && (
                    <button className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-medium transition-colors flex items-center">
                      Register <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state or initial helper text could go here */}
      </div>
    </section>
  );
};