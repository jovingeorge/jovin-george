import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Lock, ChevronLeft, CheckCircle2, HeartPulse, Building2, User, Loader2, AlertCircle } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Logo from '../components/Logo';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || { name: "Digital Health Guide", price: 45 };
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save order to Firestore
      if (auth.currentUser) {
        await addDoc(collection(db, 'orders'), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          productName: product.name,
          price: product.price,
          timestamp: serverTimestamp(),
          status: 'completed',
          nexusContribution: product.price * 0.1
        });
      }

      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Payment Success</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            Transaction confirmed. Check your email for the download link. 10% of this sale was committed to research.
          </p>
          <button 
            onClick={() => navigate('/account')}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-emerald-600 transition-colors shadow-xl"
          >
            Go to My Account
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 mb-12 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-50">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Secure Checkout</h1>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">First Name</label>
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 transition-all" placeholder="Jovin" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Last Name</label>
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 transition-all" placeholder="Mabunga" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Card Information</label>
                  <div className="relative">
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 transition-all" placeholder="0000 0000 0000 0000" />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Expiry</label>
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 transition-all" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">CVC</label>
                    <input required type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 transition-all" placeholder="123" />
                  </div>
                </div>

                <button 
                  disabled={isProcessing}
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-primary transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay ${product.price} USD
                    </>
                  )}
                </button>
                {error && (
                  <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-xs font-bold uppercase tracking-widest">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8 opacity-20 grayscale" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <HeartPulse className="w-32 h-32" />
              </div>
              
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-6">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold">{product.name}</span>
                  <span className="font-black">${product.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold">Foundation Contribution (10%)</span>
                  <span className="text-emerald-400 font-black">${(product.price * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-6 border-t border-white/10">
                  <span className="text-white font-black uppercase tracking-widest">Total Due</span>
                  <span className="text-2xl font-black">${product.price}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Building2 className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Global Health Reach</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Your purchase funds clinical trials in Tanzania and local infrastructure development.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
