import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Globe, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { PricingTier, User, OrderData } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingTier | null;
  user: User;
  onSubmit: (data: OrderData) => Promise<void>;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedPlan, user, onSubmit }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Form State
  const [domainName, setDomainName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDomainName('');
      setRequirements('');
      setPaymentMethod('bkash');
      setOrderId(null);
    }
  }, [isOpen]);

  if (!isOpen || !selectedPlan) return null;

  const totalAmount = selectedPlan.numericPrice;
  const advanceAmount = totalAmount * 0.5; // 50% Advance

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const orderData: OrderData = {
        planName: selectedPlan.name,
        planPrice: totalAmount,
        planFeatures: selectedPlan.features,
        domainName,
        requirements,
        paymentMethod,
        totalAmount,
        paidAmount: advanceAmount, // Simulating 50% payment success
      };
      
      await onSubmit(orderData);
      
      setOrderId('ORD-' + Math.floor(Math.random() * 100000)); // Simulated ID for immediate UI feedback
      setStep(3); // Go to Success Step
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello WebUX BD! \n\nI have placed Order #${orderId || 'NEW'}.\nPlan: ${selectedPlan.name}\nDomain: ${domainName}\n\nI have paid the 50% advance via bKash. I am ready to discuss the design preview.`;
    window.open(`https://wa.me/8801711000000?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={step === 3 ? onClose : undefined}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-white">
              {step === 3 ? 'Order Placed Successfully!' : 'Complete Your Order'}
            </h2>
            <p className="text-slate-400 text-sm">
              {step === 1 && 'Step 1: Details & Customization'}
              {step === 2 && 'Step 2: Payment & Confirmation'}
              {step === 3 && 'Step 3: Next Steps'}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 && (
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
                <label className="block text-sm font-medium text-slate-300">Domain Name</label>
                <div className="relative flex-grow">
                  <Globe className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="e.g. mybusiness.com (Required)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-slate-500">Enter the domain you want to register or connect.</p>
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
          )}

          {step === 2 && (
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
                    className="p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all bg-pink-600/20 border-pink-500 w-full relative"
                  >
                    <span className="font-bold text-white text-lg">bKash</span>
                    <span className="text-xs text-slate-400">Personal / Payment</span>
                    {paymentMethod === 'bkash' && <div className="absolute top-2 right-2 text-pink-500"><CheckCircle className="w-5 h-5" /></div>}
                  </button>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg flex items-start gap-3 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <p>Payments are secure. The remaining 50% (৳{advanceAmount.toLocaleString()}) will be due AFTER you approve the design preview.</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
             /* Step 3: Success / WhatsApp Redirect */
             <div className="flex flex-col items-center justify-center text-center py-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-slate-400 max-w-md mb-8">
                   We have received your 50% advance payment. Your project has been created in our system.
                </p>
                
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-md mb-8">
                   <h4 className="text-white font-bold mb-4">What Happens Next?</h4>
                   <ol className="text-left text-sm text-slate-300 space-y-4">
                      <li className="flex gap-3">
                         <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                         <span>Click the button below to open WhatsApp.</span>
                      </li>
                      <li className="flex gap-3">
                         <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                         <span>We will show you a <strong>Design Preview</strong> based on your requirements.</span>
                      </li>
                      <li className="flex gap-3">
                         <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                         <span>Once you approve, we will build the final website.</span>
                      </li>
                   </ol>
                </div>

                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full max-w-md bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Discuss Design on WhatsApp
                </button>
             </div>
          )}
        </div>

        {/* Footer Buttons */}
        {step !== 3 && (
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
        )}
      </div>
    </div>
  );
};