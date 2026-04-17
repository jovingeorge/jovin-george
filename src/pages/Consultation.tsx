import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Phone, CheckCircle, ShoppingCart as PayPal, ShieldCheck } from 'lucide-react';

const tiers = [
  {
    name: "Basic",
    price: "49",
    desc: "A focused 20-minute discussion on one specific health concern.",
    features: ["Clinical insight", "Educational summary", "Lifestyle tips"]
  },
  {
    name: "Advanced",
    price: "99",
    desc: "A comprehensive 45-minute deep-dive inclusive of lab review.",
    features: ["Detailed lab analysis", "Nutrition plan", "Herbal support guide", "Priority support"]
  },
  {
    name: "Premium",
    price: "199",
    desc: "Long-term 90-minute therapeutic session with full health strategy.",
    features: ["Complete health audit", "Custom 30-day program", "WhatsApp priority access", "Free Heart Health eBook"]
  }
];

export default function Consultation() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayPal = () => {
    if (!selectedTier) return;
    const tier = tiers.find(t => t.name === selectedTier);
    if (!tier) return;
    navigate('/checkout', { 
      state: { 
        product: { 
          name: `${tier.name} Consultation`, 
          price: parseInt(tier.price) 
        } 
      } 
    });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hello Doctor Jovin George Mabunga, I'm interested in the ${selectedTier} Consultation tier.`);
    window.open(`https://wa.me/255782936011?text=${msg}`, '_blank');
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Expert Consultations</h1>
        <p className="mt-6 text-xl text-slate-600 leading-relaxed">
          Book a 1-on-1 session with Doctor Jovin George Mabunga to gain personalized insight into your health journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ y: -10 }}
            className={`bg-white p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer flex flex-col ${
              selectedTier === tier.name ? 'border-blue-500 shadow-2xl shadow-blue-100' : 'border-slate-50'
            }`}
            onClick={() => setSelectedTier(tier.name)}
          >
            <div className="flex-1">
              <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${
                tier.name === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'
              }`}>
                {tier.name} Tier
              </span>
              <div className="mt-8 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900 pb-2">${tier.price}</span>
                <span className="text-slate-400 ml-2 font-medium">/ session</span>
              </div>
              <p className="mt-6 text-slate-500 leading-relaxed text-sm">
                {tier.desc}
              </p>
              <ul className="mt-10 space-y-4">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <Calendar className="w-48 h-48" />
         </div>
         <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Ready to take the first step?</h2>
            <p className="mt-4 text-blue-100">
              Select a tier and proceed to secure your time. All consultations are held virtually via secure video or WhatsApp.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 disabled={!selectedTier}
                 onClick={handleWhatsApp}
                 className="flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all disabled:opacity-50"
               >
                 <Phone className="w-5 h-5 mr-3" />
                 Inquire via WhatsApp
               </button>
               <button 
                 disabled={!selectedTier}
                 onClick={handlePayPal}
                 className="flex items-center justify-center px-8 py-4 bg-[#ffc439] text-[#003087] rounded-full font-black uppercase text-xs tracking-widest hover:brightness-95 transition-all shadow-xl disabled:opacity-50"
               >
                 <PayPal className="w-5 h-5 mr-3" />
                 Pay with PayPal
               </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100 text-[10px] uppercase font-bold tracking-widest opacity-80">
               <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Secure Checkout</span>
               <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Verified Payments</span>
            </div>
         </div>
      </div>
    </div>
  );
}
