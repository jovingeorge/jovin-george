import React from 'react';
import { motion } from 'motion/react';
import { Activity, Wind, Database, Brain, Droplets, ShieldCheck, ChevronRight } from 'lucide-react';

const systems = [
  {
    name: "Respiratory System",
    icon: Wind,
    overview: "Responsible for gaseous exchange, bringing in oxygen and expelling carbon dioxide.",
    diseases: ["Asthma", "COPD", "Pneumonia", "Bronchitis"],
    treatment: "Includes inhalers, pulmonary rehabilitation, and respiratory physiotherapy."
  },
  {
    name: "Digestive System",
    icon: Database,
    overview: "Breaks down food into nutrients and absorbs them into the bloodstream.",
    diseases: ["GERD", "IBS", "Celiac Disease", "Peptic Ulcers"],
    treatment: "Dietary modifications, probiotics, and enzyme replacement therapy."
  },
  {
    name: "Nervous System",
    icon: Brain,
    overview: "The command center, processing sensory information and controlling body functions.",
    diseases: ["Multiple Sclerosis", "Parkinson's", "Epilepsy", "Alzheimer's"],
    treatment: "Neuro-rehabilitation, specialized medications, and cognitive behavioral therapy."
  },
  {
    name: "Urinary System",
    icon: Droplets,
    overview: "Filters excess fluid and waste from the blood and excretes them as urine.",
    diseases: ["UTI", "Kidney Stones", "Chronic Kidney Disease"],
    treatment: "Hydration strategy, dietary salt reduction, and periodic monitoring."
  },
  {
    name: "Immune System",
    icon: ShieldCheck,
    overview: "The defense network protecting against pathogens and diseases.",
    diseases: ["Lupus", "Rheumatoid Arthritis", "Immunodeficiency"],
    treatment: "Supplements, stress reduction, and tailored immunotherapies."
  }
];

export default function BodySystems() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20 max-w-3xl mx-auto">
         <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Clinical Knowledge</span>
         <h1 className="text-5xl font-extrabold text-slate-900 mt-4 leading-tight">Internal Body Systems</h1>
         <p className="mt-6 text-xl text-slate-500 leading-relaxed">
           Understanding how your body works is the first step toward better health management. Explore our detailed guides on primary internal systems.
         </p>
      </div>

      <div className="space-y-12">
         {systems.map((system, idx) => (
           <motion.div
             key={system.name}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm hover:shadow-xl transition-all"
           >
              <div className="flex flex-col lg:flex-row gap-12">
                 <div className="lg:w-1/3">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                       <system.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{system.name}</h2>
                    <p className="text-slate-600 leading-relaxed font-medium">
                       {system.overview}
                    </p>
                 </div>
                 
                 <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-8 rounded-3xl">
                       <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Common Conditions</h4>
                       <ul className="space-y-3">
                          {system.diseases.map(d => (
                            <li key={d} className="flex items-center text-slate-700 font-semibold">
                               <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                               {d}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-blue-600 p-8 rounded-3xl text-white">
                       <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4">Treatment Guidance</h4>
                       <p className="text-sm leading-relaxed text-blue-50 font-medium">
                          {system.treatment}
                       </p>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
      
      <div className="mt-20 text-center">
         <p className="text-slate-400 text-sm italic">
           All data is sourced from peer-reviewed clinical literature. Content managed by J-Nexus Health.
         </p>
      </div>
    </div>
  );
}
