import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, AlertTriangle, ChevronRight, Stethoscope, Heart, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const symptomsData = [
  { id: 'chest-pain', name: 'Chest Pain', conditions: ['Angina', 'Myocardial Infarction', 'GERD'], system: 'Cardiovascular', risk: 'High' },
  { id: 'shortness-breath', name: 'Shortness of Breath', conditions: ['Heart Failure', 'COPD', 'Asthma'], system: 'Respiratory/Cardio', risk: 'High' },
  { id: 'fatigue', name: 'Unexpected Fatigue', conditions: ['Anemia', 'Heart Disease', 'Thyroid issues'], system: 'Systemic', risk: 'Medium' },
  { id: 'cough', name: 'Chronic Cough', conditions: ['Bronchitis', 'Post-nasal drip', 'Heart Failure'], system: 'Respiratory', risk: 'Medium' },
  { id: 'palpitations', name: 'Heart Palpitations', conditions: ['Arrhythmia', 'Anxiety', 'Caffeine sensitivity'], system: 'Cardiovascular', risk: 'Medium' }
];

export default function Symptoms() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSymptom = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getAssessment = () => {
    const findings = symptomsData.filter(s => selected.includes(s.id));
    const hasHighRisk = findings.some(f => f.risk === 'High');
    
    return { findings, hasHighRisk };
  };

  const { findings, hasHighRisk } = getAssessment();

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
         <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Interactive Symptom Checker</h1>
         <p className="mt-6 text-xl text-slate-500 leading-relaxed font-medium">
           Select the symptoms you are experiencing to discover potential conditions and relevant medical guidance.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Left: Input */}
         <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-xl shadow-slate-100 flex flex-col h-full">
               <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                  <Stethoscope className="w-6 h-6 mr-3 text-blue-600" />
                  Select Symptoms
               </h3>
               <div className="space-y-4 flex-1">
                  {symptomsData.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSymptom(s.id)}
                      className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between ${
                        selected.includes(s.id) ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-50 hover:border-blue-100 text-slate-600 font-medium'
                      }`}
                    >
                       <span>{s.name}</span>
                       {selected.includes(s.id) && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
               </div>
               
               <div className="mt-12 bg-blue-600 text-white p-8 rounded-3xl relative overflow-hidden group cursor-pointer" onClick={() => navigate('/ai-assistant')}>
                  <div className="relative z-10">
                     <h4 className="font-bold text-lg mb-2">Need a deeper analysis?</h4>
                     <p className="text-blue-100 text-sm">Our AI Health Assistant is ready to discuss your specific case in detail.</p>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                     <Search className="w-20 h-20" />
                  </div>
               </div>
            </div>
         </div>

         {/* Right: Assessment */}
         <div className="lg:col-span-7">
            {selected.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 p-20 grayscale opacity-40">
                  <AlertTriangle className="w-20 h-20 mb-6 text-slate-300" />
                  <h3 className="text-2xl font-bold text-slate-400">No symptoms selected</h3>
                  <p className="text-slate-400 mt-2">Begin selecting on the left for a clinical assessment.</p>
               </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 {hasHighRisk && (
                   <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl flex items-start space-x-4">
                      <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
                      <div>
                         <h4 className="text-rose-900 font-bold mb-1 uppercase tracking-widest text-xs">High Risk Detection</h4>
                         <p className="text-rose-800 text-sm leading-relaxed font-medium">
                            Some identified symptoms (e.g. {findings.filter(f => f.risk === 'High').map(f => f.name).join(', ')}) are associated with critical cardiac conditions. If you are experiencing severe pain or gasping for breath, please call emergency services immediately.
                         </p>
                      </div>
                   </div>
                 )}

                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-xl shadow-slate-100">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Assessment Review</h3>
                    <div className="space-y-6">
                       {findings.map(f => (
                         <div key={f.id} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-3">
                               <div>
                                  <h4 className="font-bold text-slate-900">{f.name}</h4>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.system} System</span>
                               </div>
                               <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                 f.risk === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                               }`}>
                                  {f.risk} Priority
                               </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">Possible underlying conditions: <span className="font-semibold text-slate-700">{f.conditions.join(', ')}</span></p>
                            <button 
                              onClick={() => navigate(f.system === 'Cardiovascular' ? '/cardiology' : '/systems')}
                              className="inline-flex items-center text-blue-600 text-xs font-bold hover:underline"
                            >
                               View relevant clinical data <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex items-start space-x-6">
                    <Info className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-amber-900 font-bold uppercase tracking-widest text-xs mb-2">Platform Disclaimer</h4>
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        This tool analyzes symptoms based on medical literature for educational purposes. It does not replace a clinical diagnosis by a licensed physician. Usage of J-Nexus Health implies acceptance of this educational boundary.
                      </p>
                    </div>
                 </div>
              </motion.div>
            )}
         </div>
      </div>
    </div>
  );
}
