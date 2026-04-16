import React from 'react';
import { ShoppingBag, BookOpen, Star, ShieldCheck, HeartPulse, ExternalLink, Zap, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const ebooks = [
  {
    id: "eb1",
    name: "The Heart's Silent Language",
    price: 45.00,
    category: "Professional E-Book",
    image: "https://picsum.photos/seed/heartbook/600/800",
    desc: "Advanced cardiology and clinical heart care guide by Dr. Jovin George Mabunga.",
    isInternal: true
  },
  {
    id: "eb2",
    name: "Sexual Vitality & Education",
    price: 29.00,
    category: "Bonus Program",
    image: "https://picsum.photos/seed/sexualhealth/600/800",
    desc: "Scientific guide to reproductive health and hormonal optimization.",
    isInternal: true
  }
];

const amazonProducts = [
  {
    id: "az1",
    name: "Professional Digital Stethoscope",
    price: 189.99,
    category: "Medical Gear",
    image: "https://picsum.photos/seed/steth/600/800",
    desc: "Cure-focused high precision diagnostic tool for cardiology professionals.",
    link: "https://amazon.com/stethoscope"
  },
  {
    id: "az2",
    name: "Advanced Automated External Defibrillator (AED)",
    price: 1250.00,
    category: "Emergency Gear",
    image: "https://picsum.photos/seed/aed/600/800",
    desc: "Hospital-grade portable life-saving device for heart failure emergencies.",
    link: "https://amazon.com/aed"
  },
  {
    id: "az3",
    name: "Comprehensive First Aid Survival Kit",
    price: 59.95,
    category: "Viral Survival",
    image: "https://picsum.photos/seed/firstaid/600/800",
    desc: "Top-rated 250-piece medical kit for home and professional use.",
    link: "https://amazon.com/firstaid"
  }
];

export default function Shop() {
  const navigate = useNavigate();
  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
          <Logo className="w-80 h-80" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
           <div className="max-w-2xl px-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-6">
                 Official J-Nexus Marketplace
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                The Health <span className="text-secondary">Vault</span>
              </h1>
              <p className="mt-8 text-xl text-slate-400 leading-relaxed font-bold">
                 Invest in survival. From Dr. Jovin's elite e-book series to global medical essentials sourced via Amazon.
              </p>
           </div>
           <div className="bg-white/10 backdrop-blur-xl px-10 py-6 rounded-[2rem] border border-white/10 flex items-center space-x-6 shadow-2xl text-white">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest opacity-50">Profit Distribution</div>
                <div className="text-xl font-black text-emerald-400">10% J-Nexus Share</div>
              </div>
           </div>
        </div>
      </section>

      {/* Internal E-books */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center">
          <BookOpen className="w-6 h-6 mr-4 text-primary" />
          Elite E-Books by Jovin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ebooks.map((p) => (
            <div key={p.id} className="group bg-white rounded-[3rem] border border-slate-100 p-8 flex flex-col md:flex-row gap-8 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10 transition-all">
              <div className="w-full md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</span>
                  <div className="text-2xl font-black text-slate-900">${p.price}</div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 italic">{p.desc}</p>
                <button 
                  onClick={() => navigate('/checkout', { state: { product: p } })}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Instant Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amazon Essentials */}
      <div className="max-w-7xl mx-auto px-6 py-20 bg-slate-50/50 rounded-[4rem] border border-slate-100 mb-20">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center">
          <Zap className="w-6 h-6 mr-4 text-secondary" />
          Viral Medical Essentials (Amazon)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {amazonProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col group hover:border-secondary transition-all">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-xl font-black text-slate-900 text-sm shadow-xl">
                  ${p.price}
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{p.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{p.category}</p>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed line-clamp-2">{p.desc}</p>
              
              <a 
                href={p.link} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto w-full py-4 bg-white border-2 border-slate-900 rounded-2xl font-black text-slate-900 text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100"
              >
                Buy on Amazon
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative">
          <div className="max-w-2xl mx-auto relative z-10">
            <HeartPulse className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight">Secure Global Transactions</h2>
            <p className="text-slate-400 leading-relaxed font-bold mb-10 italic">
              All internal J-Nexus e-book payments are processed via Visa / Mastercard with 10% of every sale directly supporting clinical heart care research under Dr. Jovin's supervision.
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-30">
               <ShieldCheck className="w-10 h-10" />
               <Package className="w-10 h-10" />
               <Star className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
