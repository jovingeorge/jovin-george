import React from 'react';
import { ShoppingBag, BookOpen, Star, ShieldCheck, HeartPulse, ExternalLink, Zap, Package, Globe, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

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
  },
  {
    id: "eb3",
    name: "The Presidential Health Protocol",
    price: 99.00,
    category: "Elite Series",
    image: "https://picsum.photos/seed/presidential/600/800",
    desc: "Nexus Longevity roadmap for high-capacity leadership and stress resilience.",
    isInternal: true
  }
];

const partnerProducts = [
  {
    id: "az1",
    name: "Digital Professional Stethoscope",
    price: 189.99,
    category: "Medical Gear",
    image: "https://picsum.photos/seed/steth/600/800",
    desc: "Cure-focused high precision diagnostic tool for cardiology professionals.",
    link: "https://amazon.com/stethoscope",
    store: "Amazon"
  },
  {
    id: "az2",
    name: "Portable AED Defibrillator",
    price: 1250.00,
    category: "Emergency Gear",
    image: "https://picsum.photos/seed/aed/600/800",
    desc: "Hospital-grade portable life-saving device for heart failure emergencies.",
    link: "https://amazon.com/aed",
    store: "Amazon"
  },
  {
    id: "eb1",
    name: "Home ECG Wellness Monitor",
    price: 89.00,
    category: "Diagnostics",
    image: "https://picsum.photos/seed/ecg/600/800",
    desc: "Mobile heart rhythm tracking for proactive cardiovascular health.",
    link: "https://ebay.com/ecg-monitor",
    store: "eBay"
  },
  {
    id: "cn1",
    name: "Infrared Clinical Thermometer",
    price: 34.50,
    category: "Basics",
    image: "https://picsum.photos/seed/therm/600/800",
    desc: "Rapid contactless temperature measurement for global pandemic screening.",
    link: "https://aliexpress.com/thermometer",
    store: "Global Store"
  }
];

export default function Shop() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Header */}
      <section className="pt-32 pb-24 px-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Logo className="w-80 h-80" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
           <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 bg-secondary/20 rounded-full text-secondary text-xs font-black uppercase tracking-widest mb-8 border border-secondary/30">
                 {language === 'en' ? 'Official J-Nexus Marketplace' : 'Soko Rasmi la J-Nexus'}
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none italic">
                The Health <span className="text-secondary italic">Vault</span>
              </h1>
              <p className="mt-8 text-xl text-slate-400 leading-relaxed font-bold italic">
                 {language === 'en' 
                   ? "Invest in survival. From Dr. Jovin's elite e-book series to global medical essentials sourced via Amazon, eBay, and global partners." 
                   : "Wekeza katika maisha yako. Kuanzia vitabu vya Dr. Jovin hadi vifaa vya matibabu duniani kupitia Amazon, eBay, na washirika wa kimataifa."}
              </p>
           </div>
           <div className="bg-white/5 backdrop-blur-3xl px-12 py-8 rounded-[3rem] border border-white/10 flex items-center space-x-8 shadow-3xl text-white group hover:border-secondary transition-all">
              <div className="w-16 h-16 bg-secondary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-secondary/20 group-hover:rotate-12 transition-transform">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">Nexus Contribution</div>
                <div className="text-2xl font-black text-emerald-400 italic">10% Profit Share</div>
              </div>
           </div>
        </div>
      </section>

      {/* Internal E-books */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-16 flex items-center italic">
          <BookOpen className="w-8 h-8 mr-4 text-primary" />
          {language === 'en' ? "Elite E-Books by Jovin" : "Vitabu vya Dr. Jovin"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ebooks.map((p) => (
            <div key={p.id} className="group bg-white rounded-[4rem] border border-slate-50 p-10 flex flex-col shadow-3xl shadow-slate-200/50 hover:shadow-primary/10 hover:border-primary/20 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Logo className="w-32 h-32" />
              </div>
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 ring-4 ring-slate-50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl font-black text-slate-900 shadow-xl border border-white/50">
                   ${p.price}
                </div>
              </div>
              <div className="flex-1 flex flex-col relative z-10">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-4 inline-block">{p.category}</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors leading-none italic">{p.name}</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed mb-10 italic">"{p.desc}"</p>
                <button 
                  onClick={() => navigate('/checkout', { state: { product: p } })}
                  className="mt-auto w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-2xl"
                >
                  <Package className="w-4 h-4" />
                  {language === 'en' ? 'Nexus Instant Access' : 'Pata Sasa'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Essentials */}
      <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-900 rounded-[5rem] border border-white/5 mb-24 relative overflow-hidden shadow-3xl">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <Globe className="absolute -top-20 -left-20 w-[600px] h-[600px] text-white" />
        </div>
        <div className="relative z-10 mb-20">
           <div className="inline-flex items-center px-6 py-3 bg-secondary/20 rounded-full text-secondary text-[10px] font-black uppercase tracking-widest mb-8 border border-secondary/20">
              <Globe className="w-4 h-4 mr-3" />
              {language === 'en' ? 'Global Affiliate Network' : 'Washirika wa Kimataifa'}
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
             Viral Medical <span className="text-secondary italic">Essentials</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
           {partnerProducts.map((p) => (
            <div key={p.id} className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 p-8 flex flex-col group hover:border-secondary transition-all hover:-translate-y-2">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-black/20 shadow-2xl">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-secondary px-4 py-2 rounded-2xl font-black text-slate-900 text-sm shadow-2xl">
                  ${p.price}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest">{p.category}</span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[8px] font-black uppercase tracking-widest">{p.store}</span>
                 </div>
                 <h3 className="text-xl font-black text-white mb-4 group-hover:text-secondary transition-colors italic leading-tight">{p.name}</h3>
                 <p className="text-xs text-slate-400 font-bold mb-8 leading-relaxed italic line-clamp-2">"{p.desc}"</p>
                 
                 <a 
                   href={p.link} 
                   target="_blank" 
                   rel="noreferrer"
                   className="mt-auto w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary transition-all shadow-2xl italic"
                 >
                   Buy on {p.store}
                   <ExternalLink className="w-3 h-3" />
                 </a>
              </div>
            </div>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="bg-bg border-4 border-dashed border-slate-200 rounded-[5rem] p-24 relative group overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="max-w-3xl mx-auto relative z-10">
            <HeartPulse className="w-20 h-20 text-secondary mx-auto mb-10 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight italic tracking-tighter text-slate-900">
               {language === 'en' ? 'Secure Global Transactions' : 'Miamala Salama ya Kimataifa'}
            </h2>
            <p className="text-slate-500 leading-relaxed font-bold mb-12 italic text-lg">
              {language === 'en' 
                ? "All J-Nexus assets are processed via PayPal with bank-grade encryption. 10% of every sale directly funds cardiovascular health research in Tanzania." 
                : "Mali zote za J-Nexus zinapitia PayPal kwa usalama wa hali ya juu. 10% ya kila mauzo inasaidia utafiti wa afya ya moyo nchini Tanzania."}
            </p>
            <div className="flex flex-wrap justify-center gap-12 opacity-30">
               <div className="flex flex-col items-center gap-4">
                  <ShieldCheck className="w-12 h-12" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Encrypted</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <Truck className="w-12 h-12" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Global</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <Logo className="w-12 h-12" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Certified</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
