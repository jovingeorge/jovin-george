import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplet, Sun, Wind, CheckCircle, Info } from 'lucide-react';

const remedies = [
  {
    name: "Hawthorn Berry",
    focus: "Cardiovascular Support",
    benefit: "Traditionally used to support blood pressure and heart muscle efficiency.",
    guidance: "Often taken as a standardized extract or tea. May interact with blood thinners."
  },
  {
    name: "Garlic (Allicin)",
    focus: "Artery Elasticity",
    benefit: "Rich in antioxidants that support oxidative balance in blood vessels.",
    guidance: "Most effective when consumed raw or as a high-potency supplement."
  },
  {
    name: "Ginger Root",
    focus: "Circulation & Digestion",
    benefit: "Supports warming circulation and anti-inflammatory pathways.",
    guidance: "Fresh tea infusion is excellent for mild circulatory support."
  },
  {
    name: "Turmeric (Curcumin)",
    focus: "Systemic Inflammation",
    benefit: "Potent natural anti-inflammatory support for veins and joints.",
    guidance: "Requires black pepper (piperine) for optimal absorption."
  }
];

export default function Herbal() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="relative bg-emerald-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden mb-20">
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full -mt-20 -mr-20 opacity-40 filter blur-3xl"></div>
         <div className="relative z-10 lg:w-2/3">
            <span className="inline-flex items-center px-4 py-1.5 bg-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
               <Leaf className="w-4 h-4 mr-2" />
               Natural & Herbal Support
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">Ancient Wisdom Meets Modern Wellness</h1>
            <p className="mt-8 text-xl text-emerald-100 leading-relaxed font-medium">
               Explore herbal remedies and holistic lifestyle changes that complement clinical cardiology. Nature provides the ingredients, we provide the evidence.
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Recommended Herbs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {remedies.map(r => (
                 <div key={r.name} className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-emerald-700">{r.name}</h3>
                    <span className="block text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{r.focus}</span>
                    <p className="mt-4 text-slate-600 text-sm leading-relaxed">{r.benefit}</p>
                    <div className="mt-4 pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-medium italic">
                       * {r.guidance}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-50 rounded-[2.5rem] p-10 flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-8">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <Sun className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">Lifestyle Foundations</h2>
            </div>
            
            <div className="space-y-6">
               {[
                 { title: "The Blue Zone Diet", desc: "High in legumes, greens, and healthy fats while minimizing processed sugars." },
                 { title: "Structured Exercise", desc: "Prioritizing low-impact cardiovascular activity for 30 minutes daily." },
                 { title: "Circadian Alignment", desc: "Optimizing sleep patterns to support heart rhythm and hormonal balance." },
                 { title: "Hydration Strategy", desc: "Ensuring adequate trace minerals and electrolytes for electrical heart health." }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-slate-900">{item.title}</h4>
                       <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="mt-20 bg-amber-50 border border-amber-100 rounded-3xl p-8 flex items-start space-x-6">
         <Info className="w-8 h-8 text-amber-500 shrink-0" />
         <div>
            <h4 className="font-bold text-amber-900 uppercase tracking-widest text-xs mb-2">Clinical Disclaimer</h4>
            <p className="text-amber-800 text-sm leading-relaxed">
               Herbal and natural supports provided here are intended for education and wellness promotion only. They do not "cure" diseases and should not replace prescribed cardiology medications without direct medical supervision. Always consult your cardiologist before introducing new supplements.
            </p>
         </div>
      </div>
    </div>
  );
}
