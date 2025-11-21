import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, CreditCard, ShieldCheck, Globe, Loader2, AlertCircle } from 'lucide-react';
import { PricingTier, User, OrderData } from '../types';
import { checkDomainAvailability } from '../services/geminiService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingTier | null;
  user: User;
  onSubmit: (data: OrderData) => Promise<void>;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedPlan, user, onSubmit }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [domainName, setDomainName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  
  // Domain Check State
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainStatus, setDomainStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDomainStatus('idle');
      setDomainName('');
      setRequirements('');
      setPaymentMethod('bkash');
    }
  }, [isOpen]);

  if (!isOpen || !selectedPlan) return null;

  const totalAmount = selectedPlan.numericPrice;
  const advanceAmount = totalAmount * 0.5; // 50% Advance

  const handleCheckDomain = async () => {
    if (!domainName) return;
    setIsCheckingDomain(true);
    try {
      const results = await checkDomainAvailability(domainName);
      // Simple check: if the first result matches and says available
      const exactMatch = results.find(r => r.name.toLowerCase() === domainName.toLowerCase());
      if (exactMatch && exactMatch.isAvailable) {
        setDomainStatus('available');
      } else {
        setDomainStatus('unavailable');
      }
    } catch (e) {
      setDomainStatus('idle');
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const orderData: OrderData = {
        planName: selectedPlan.name,
        planPrice: totalAmount,
        domainName,
        requirements,
        paymentMethod,
        totalAmount,
        paidAmount: advanceAmount, // Simulating 50% payment success
      };
      await onSubmit(orderData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-white">Complete Your Order</h2>
            <p className="text-slate-400 text-sm">Step {step} of 2: {step === 1 ? 'Details & Customization' : 'Payment & Confirmation'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 ? (
            /* Step 1: Details */
            <div className="space-y-6 animate-fade-in-up">
              {/* Plan Summary */}
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-emerald-400 text-xs uppercase font-bold tracking-wider">Selected Plan</p>
                  <h3 className="text-lg font-bold text-white">{selectedPlan.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">৳{selectedPlan.price.replace(/[^0-9]/g, '')}</p>
                </div>
              </div>

              {/* Domain Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">Domain Selection</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Globe className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      value={domainName}
                      onChange={(e) => {
                        setDomainName(e.target.value);
                        setDomainStatus('idle');
                      }}
                      placeholder="e.g. mybusiness.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleCheckDomain}
                    disabled={isCheckingDomain || !domainName}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl border border-slate-700 font-medium transition-colors"
                  >
                    {isCheckingDomain ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check'}
                  </button>
                </div>
                
                {domainStatus === 'available' && (
                  <div className="flex items-center text-emerald-400 text-sm bg-emerald-500/10 p-2 rounded-lg">
                    <Check className="w-4 h-4 mr-2" /> Domain is likely available!
                  </div>
                )}
                {domainStatus === 'unavailable' && (
                  <div className="flex items-center text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" /> Domain might be taken. We can suggest alternatives later.
                  </div>
                )}
                <p className="text-xs text-slate-500">If you already own a domain, enter it above.</p>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">Special Notes / Customization</label>
                <textarea 
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={4}
                  placeholder="Describe your project needs, color preferences, or any specific features you want..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            /* Step 2: Payment */
            <div className="space-y-8 animate-fade-in-up">
              {/* Invoice Breakdown */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal ({selectedPlan.name})</span>
                    <span>৳{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Platform Fee</span>
                    <span>৳0</span>
                  </div>
                  <div className="h-px bg-slate-700 my-2"></div>
                  <div className="flex justify-between text-white font-medium">
                    <span>Total Amount</span>
                    <span>৳{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold text-lg mt-2 pt-2 border-t border-slate-700 border-dashed">
                    <span>Due Today (50% Advance)</span>
                    <span>৳{advanceAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-300">Select Payment Method</h3>
                <div className="grid grid-cols-1">
                  <button 
                    onClick={() => setPaymentMethod('bkash')}
                    className="p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all bg-pink-600/20 border-pink-500 w-full"
                  >
                    <span className="font-bold text-white text-lg">bKash</span>
                    <span className="text-xs text-slate-400">Send Money (Personal)</span>
                  </button>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg flex items-start gap-3 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <p>Payments are secure. The remaining 50% (৳{advanceAmount.toLocaleString()}) will be due after admin approval and project completion.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
          {step === 2 ? (
            <button 
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white font-medium px-4"
            >
              Back
            </button>
          ) : (
            <div></div> // Spacer
          )}

          {step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              disabled={!domainName}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all"
            >
              Next Step <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
             <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-emerald-500/20 transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin ml-2" /> : `Pay ৳${advanceAmount.toLocaleString()} & Order`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
