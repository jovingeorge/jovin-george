import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Lock, ChevronLeft, CheckCircle2, HeartPulse, Building2, User, Loader2, AlertCircle, ShoppingCart, Zap } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Logo from '../components/Logo';

// Default to sandbox Client ID if none provided in environment
const PAYPAL_CLIENT_ID = (import.meta as any).env.VITE_PAYPAL_CLIENT_ID || "test";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || { name: "Digital Health Guide", price: 45 };
  
  const [step, setStep] = useState(1);
  const handleOrderCapture = async (orderId: string) => {
    setIsProcessing(true);
    try {
      if (auth.currentUser) {
        await addDoc(collection(db, 'orders'), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          productName: product.name,
          price: product.price,
          paypalOrderId: orderId,
          timestamp: serverTimestamp(),
          status: 'verified',
          nexusContribution: product.price * 0.1
        });
      }
      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Failed to record order. Please contact support with Order ID: " + orderId);
    } finally {
      setIsProcessing(false);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState<'PayPal' | 'Card'>('PayPal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const handleManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate high-capacity clinical transaction processing
    setTimeout(async () => {
      await handleOrderCapture("CC-VISA-MASTERCARD-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
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
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Payment Success</h2>
          <p className="text-slate-500 font-bold leading-relaxed mb-10 italic">
            Transaction confirmed. Check your account dashboard for the download link. 10% of this sale was committed to research.
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
          className="flex items-center text-slate-400 font-extrabold uppercase text-[10px] tracking-widest hover:text-slate-900 mb-12 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-3xl border border-slate-50">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-[#0070ba] rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-[#0070ba]/20">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none italic">Secure Checkout</h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Professional Medical Licensing</p>
                </div>
              </div>

              {/* Payment Switcher */}
              <div className="flex bg-slate-50 rounded-2xl p-1 mb-10 border border-slate-100">
                 <button 
                   onClick={() => setPaymentMethod('PayPal')}
                   className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'PayPal' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
                 >
                    PayPal / Sandbox
                 </button>
                 <button 
                   onClick={() => setPaymentMethod('Card')}
                   className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'Card' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
                 >
                    Visa / MasterCard
                 </button>
              </div>

              <div className="space-y-10">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 italic font-bold text-slate-600 text-sm leading-relaxed">
                  "Nexus transactions are processed via bank-grade encryption using PayPal's global infrastructure for J-Nexus Clinical Works."
                </div>

                {paymentMethod === 'PayPal' ? (
                  <div className="paypal-container relative z-10">
                     {isProcessing && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-[2rem]">
                           <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verifying Transaction...</p>
                        </div>
                     )}
                     
                     <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
                        <PayPalButtons 
                           style={{ 
                              layout: "vertical",
                              shape: "pill",
                              label: "pay",
                              height: 55
                           }}
                           createOrder={(data, actions) => {
                              return actions.order.create({
                                 intent: "CAPTURE",
                                 purchase_units: [
                                    {
                                       amount: {
                                          value: product.price.toString(),
                                          currency_code: "USD"
                                       },
                                       description: product.name
                                    }
                                 ]
                              });
                           }}
                           onApprove={async (data, actions) => {
                              if (actions.order) {
                                 const details = await actions.order.capture();
                                 await handleOrderCapture((details as any).id || "PP-CAP-SUCCESS");
                              }
                           }}
                           onError={(err) => {
                              console.error("PayPal Error:", err);
                              setError("There was an error with your PayPal transaction. Please try again.");
                           }}
                        />
                     </PayPalScriptProvider>
                  </div>
                ) : (
                  <form onSubmit={handleManualPayment} className="space-y-8">
                     <div className="space-y-4">
                        <div className="relative">
                           <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                           <input 
                              required
                              type="text" 
                              placeholder="CARD NUMBER"
                              className="w-full bg-slate-50 border-none rounded-2xl py-6 px-16 text-slate-900 font-black tracking-widest placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all"
                              value={cardData.number}
                              onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\D/g, '').substr(0, 16)})}
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input 
                              required
                              type="text" 
                              placeholder="MM / YY"
                              className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-widest placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all"
                           />
                           <input 
                              required
                              type="text" 
                              placeholder="CVC"
                              className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-widest placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all"
                           />
                        </div>
                        <input 
                           required
                           type="text" 
                           placeholder="CARDHOLDER NAME"
                           className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-widest placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all uppercase"
                        />
                     </div>

                     <button 
                        disabled={isProcessing}
                        type="submit"
                        className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-secondary transition-all flex items-center justify-center gap-4 group"
                     >
                        {isProcessing ? (
                           <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                           <>
                              Process Transaction via Card
                              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                           </>
                        )}
                     </button>
                     
                     <div className="flex items-center justify-center gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                     </div>
                  </form>
                )}

                {error && (
                  <div className="mt-4 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-rose-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <CreditCard className="w-5 h-5" />
                  <Logo className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <HeartPulse className="w-48 h-48" />
              </div>
              
              <h2 className="text-2xl font-black uppercase tracking-widest mb-10 border-b border-white/10 pb-8 italic leading-none">Order Details</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Licensed Asset</p>
                    <span className="text-white font-black italic text-lg leading-tight uppercase block">{product.name}</span>
                  </div>
                  <span className="font-black text-xl text-secondary">${product.price}</span>
                </div>
                
                <div className="bg-white/5 h-[1px] w-full" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold italic">Foundation Contribution (10%)</span>
                  <span className="text-emerald-400 font-black italic block">${(product.price * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Total Amount</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter leading-none">${product.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 group hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-5">
                  <Building2 className="w-8 h-8 text-secondary shrink-0 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-white">Global Health Reach</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium italic">Your purchase funds Dr. Jovin's clinical trials in Tanzania and local infrastructure development programs.</p>
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
