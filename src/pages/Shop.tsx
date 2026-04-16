import React from 'react';
import { ShoppingBag, BookOpen, Star, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

const products = [
  {
    id: "p1",
    name: "Classic Heart Health eBook",
    price: 24.99,
    category: "Cardiology",
    image: "https://picsum.photos/seed/heartbook/600/800",
    desc: "A comprehensive guide to understanding your heart's anatomy, common diseases, and prevention techniques written for non-medical professionals."
  },
  {
    id: "p2",
    name: "Herbal Healing Guide",
    price: 34.00,
    category: "Natural Health",
    image: "https://picsum.photos/seed/herbalbook/600/800",
    desc: "Nature's pharmacy decoded. Learn about herbs that support your internal systems with evidence-based research references."
  },
  {
    id: "p3",
    name: "Full Body Detox Program",
    price: 89.00,
    category: "Wellness",
    image: "https://picsum.photos/seed/detox/600/800",
    desc: "A 30-day structured guide for diet, exercise, and mental detoxification. Includes a curated recipe list and yoga patterns."
  }
];

export default function Shop() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
         <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">The Wellness <span className="text-blue-600">Store</span></h1>
            <p className="mt-6 text-xl text-slate-500 leading-relaxed font-medium">
               Invest in your health with our premium digital resources, eBooks, and guided wellness programs. Instant access, life-long value.
            </p>
         </div>
         <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 flex items-center space-x-4 shadow-sm font-bold text-slate-700">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <span>0 items — $0.00</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {products.map((p) => (
           <div key={p.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mb-6 bg-slate-100">
                 <img src={p.image} referrerPolicy="no-referrer" alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl font-bold text-slate-900 text-sm shadow-lg">
                    ${p.price}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-500/40">
                       <ShoppingBag className="w-5 h-5" />
                       <span>Add to cart</span>
                    </button>
                 </div>
              </div>
              <div>
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.category}</span>
                    <div className="flex items-center text-xs font-bold text-amber-500">
                       <Star className="w-3 h-3 fill-current mr-1" />
                       5.0
                    </div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                 <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-2">{p.desc}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
           { icon: BookOpen, title: "Instant Download", desc: "Get your files immediately after secure checkout." },
           { icon: ShieldCheck, title: "Verified Science", desc: "All guides are based on clinical education principles." },
           { icon: HeartPulse, title: "Life-long Access", desc: "Re-download your purchase anytime from your account." },
           { icon: Star, title: "Premium Design", desc: "Professionally typeset and easy to read on any device." }
         ].map((item, i) => (
           <div key={i} className="text-center p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-sm">
                 <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
