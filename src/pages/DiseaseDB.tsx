import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, Thermometer, Pill, Hospital, ChevronRight, Heart, Activity, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

const diseaseData = [
  {
    id: 'cad',
    name: 'Coronary Artery Disease (CAD)',
    category: 'Heart',
    description: 'A condition where the major blood vessels that supply your heart become damaged or diseased. Plaque buildup in your arteries is usually the cause.',
    symptoms: [
      'Chest pain (angina)',
      'Shortness of breath',
      'Fatigue after exertion',
      'Heart attack (in severe cases)'
    ],
    diagnosis: 'EKG, Echocardiogram, Stress testing, Cardiac catheterization, Heart scan.',
    treatment: {
      lifestyle: 'Smoking cessation, Heart-healthy diet, Regular exercise.',
      medications: [
        'Statins (Atorvastatin, Rosuvastatin) - to lower cholesterol',
        'Aspirin - blood thinners',
        'Beta blockers - to slow heart rate',
        'ACE inhibitors - to manage blood pressure'
      ],
      procedures: 'Angioplasty and stent placement, Coronary artery bypass surgery (CABG).'
    }
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Vascular',
    description: 'A condition where the force of the blood against the artery walls is too high. Often called the "silent killer" as it has no symptoms but increases heart attack/stroke risk.',
    symptoms: [
      'Headaches (severe)',
      'Vision problems',
      'Chest pain',
      'Nosebleeds',
      'Dizziness'
    ],
    diagnosis: 'Blood pressure cuff monitoring, blood tests, urine tests.',
    treatment: {
      lifestyle: 'Reduction of salt intake, DASH diet, Weight management.',
      medications: [
        'Diuretics (Thiazides)',
        'Calcium channel blockers (Amlodipine)',
        'ACE inhibitors (Lisinopril)',
        'Angiotensin II receptor blockers (Losartan)'
      ]
    }
  },
  {
    id: 'mi',
    name: 'Myocardial Infarction (Heart Attack)',
    category: 'Heart',
    description: 'Occurs when blood flow to the heart muscle is severely reduced or cut off. This is a medical emergency.',
    symptoms: [
      'Crushing chest pressure or pain',
      'Pain radiating to left arm or jaw',
      'Cold sweats',
      'Nausea or vomiting',
      'Extreme anxiety'
    ],
    diagnosis: 'ECG/EKG (ST-elevation), Troponin blood tests, Coronary angiography.',
    treatment: {
      emergency: 'Thrombolytics (clot busters), Nitroglycerin, Morphine, Oxygen.',
      medications: [
        'Antiplatelet agents (Clopidogrel)',
        'Anticoagulants (Heparin)',
        'ACE inhibitors',
        'Beta blockers'
      ],
      procedures: 'Emergent Angioplasty, Stenting, Bypass Surgery.'
    }
  },
  {
    id: 'afib',
    name: 'Atrial Fibrillation (AFib)',
    category: 'Arrhythmia',
    description: 'An irregular and often very rapid heart rhythm (arrhythmia) that can lead to blood clots in the heart.',
    symptoms: [
      'Heart palpitations (fluttering)',
      'Dizziness',
      'Extreme weakness',
      'Confusion'
    ],
    diagnosis: 'Mobile heart monitors (Holter), Stress test, Blood tests.',
    treatment: {
      lifestyle: 'Avoiding caffeine and alcohol triggers.',
      medications: [
        'Warfarin or NOACs (Apixaban, Rivaroxaban) - to prevent stroke',
        'Digoxin - for rate control',
        'Amiodarone (Pacerone) - to restore rhythm',
        'Metoprolol - for heart rate management'
      ],
      procedures: 'Electrical Cardioversion, Catheter Ablation, Pacemaker.'
    }
  },
  {
    id: 'heart-failure',
    name: 'Congestive Heart Failure (CHF)',
    category: 'Heart',
    description: 'A chronic progressive condition that affects the pumping power of your heart muscles. The heart can\'t keep up with the body\'s demand for blood.',
    symptoms: [
      'Shortness of breath (dyspnea) when lying down',
      'Swelling (edema) in legs, ankles, and feet',
      'Rapid or irregular heartbeat',
      'Persistent cough or wheezing with white/pink phlegm'
    ],
    diagnosis: 'BNP Blood Test, Echocardiogram (LVEF measurement), Chest X-ray, Cardiac MRI.',
    treatment: {
      lifestyle: 'Fluid restriction (1.5L-2L/day), Daily weight monitoring, Low sodium diet (<2g/day).',
      medications: [
        'Entresto (Sacubitril/Valsartan) - ARNI for improved survival',
        'Diuretics (Furosemide/Lasix) - to remove excess fluid',
        'Beta blockers (Carvedilol) - to decrease heart workload',
        'SGLT2 inhibitors (Dapagliflozin) - shown to reduce hospitalization'
      ],
      procedures: 'ICD (Implantable Cardioverter Defibrillator), Heart Transplant, LVAD.'
    }
  },
  {
    id: 'valvular-disease',
    name: 'Valvular Heart Disease',
    category: 'Valvular',
    description: 'Occurs when one or more of your heart valves (aortic, mitral, tricuspid, pulmonary) don\'t work properly, causing stenosis or regurgitation.',
    symptoms: [
      'Heart murmur (abnormal sound)',
      'Dizziness or fainting (syncope)',
      'Chest discomfort',
      'Abdominal swelling'
    ],
    diagnosis: 'Transthoracic Echocardiogram (TTE), TEE, Cardiac Catheterization.',
    treatment: {
      lifestyle: 'Prophylactic antibiotics before dental procedures (to prevent endocarditis).',
      medications: [
        'Vasodilators - to reduce the workload on the heart',
        'Anticoagulants - if AFib is present'
      ],
      procedures: 'Valve Repair (Valvuloplasty), Valve Replacement (Mechanical or Biological), TAVR.'
    }
  },
  {
    id: 'cardiomyopathy',
    name: 'Cardiomyopathy (Hypertrophic/Dilated)',
    category: 'Heart',
    description: 'A disease of the heart muscle that makes it harder for the heart to pump blood. It can be inherited or acquired through infections or toxins.',
    symptoms: [
      'Breathlessness even at rest',
      'Bloating of the abdomen with fluid',
      'Sudden lightheadedness',
      'Chest pressure'
    ],
    diagnosis: 'Genetic Testing, Cardiac MRI, Endomyocardial Biopsy.',
    treatment: {
      lifestyle: 'Limiting alcohol intake, Stress reduction, Avoidance of heavy lifting in HOCM.',
      medications: [
        'Mavacamten - specifically for obstructive hypertrophic cardiomyopathy',
        'Beta blockers',
        'Calcium channel blockers'
      ],
      procedures: 'Septal Myectomy, Alcohol Septal Ablation.'
    }
  },
  {
    id: 'pad',
    name: 'Peripheral Artery Disease (PAD)',
    category: 'Vascular',
    description: 'Narrowing of the peripheral arteries to the legs, stomach, arms, and head—most commonly in the legs.',
    symptoms: [
      'Painful cramping in hips/thighs/calves after activity (claudication)',
      'Leg numbness or weakness',
      'Sores on toes/feet that won\'t heal',
      'Coldness in lower leg/foot'
    ],
    diagnosis: 'ABI (Ankle-Brachial Index), Doppler Ultrasound, Angiography.',
    treatment: {
      lifestyle: 'Supervised walking programs, Smoking cessation.',
      medications: [
        'Antiplatelet agents (Aspirin, Clopidogrel) - to prevent blood clots',
        'Cilostazol - to improve leg circulation and reduce leg pain during walking',
        'Statins (Atorvastatin) - to stabilize plaque and lower cholesterol'
      ],
      procedures: 'Bypass grafting, Angioplasty with stenting, Atherectomy.'
    }
  },
  {
    id: 'endocarditis',
    name: 'Infective Endocarditis',
    category: 'Infection',
    description: 'An infection of the heart\'s inner lining (endocardium), usually involving the heart valves. A medical emergency requiring long-term antibiotics.',
    symptoms: [
      'Fever and chills',
      'New or changed heart murmur',
      'Janeway lesions (red spots on palms/soles)',
      'Osler nodes (painful red bumps on fingers)'
    ],
    diagnosis: 'Blood Cultures (3 sets), Echocardiogram (looking for vegetations), Duke Criteria.',
    treatment: {
      lifestyle: 'Excellent dental hygiene to prevent bacterial entry into the bloodstream.',
      medications: [
        'IV Antibiotics (Vancomycin, Ceptriaxone) - standard 4-6 week course',
        'Gentamicin - synergistic treatment'
      ],
      procedures: 'Urgent surgery if valve damage is severe or emboli occur.'
    }
  },
  {
    id: 'myocarditis',
    name: 'Myocarditis / Pericarditis',
    category: 'Inflammatory',
    description: 'Inflammation of the heart muscle (myocardium) or the outer lining (pericardium), often caused by viral infections (including post-viral syndromes) or autoimmune responses.',
    symptoms: [
      'Sharp chest pain that improves when leaning forward',
      'Shortness of breath even during rest',
      'Rapid or irregular heartbeats (arrhythmias)',
      'Fatigue and flu-like symptoms'
    ],
    diagnosis: 'Cardiac MRI (Standard), Troponin Test, Echocardiogram, ECG.',
    treatment: {
      lifestyle: 'Restricted physical activity for 3-6 months to prevent sudden cardiac arrest.',
      medications: [
        'Colchicine - to reduce pericardial inflammation',
        'NSAIDs - for pain management',
        'Beta blockers - if heart muscle is weakened',
        'Corticosteroids - for refractory cases'
      ],
      procedures: 'Rarely: Pericardiocentesis (fluid drainage).'
    }
  },
  {
    id: 'aortic-stenosis',
    name: 'Aortic Stenosis',
    category: 'Valvular',
    description: 'A type of valvular heart disease where the aortic valve is narrowed, restricting blood flow from the left ventricle to the aorta. Commonly caused by age-related calcification.',
    symptoms: [
      'Breathlessness with activity',
      'Chest pain (angina) during exertion',
      'Fainting or lightheadedness (syncope)',
      'Heart murmur (high-pitched systolic)'
    ],
    diagnosis: 'Echocardiogram (Valve area measurement), CT Calcium Scoring, Cardiac Catheterization.',
    treatment: {
      lifestyle: 'Avoiding heavy exertion if stenosis is severe.',
      medications: [
        'Statins - to manage underlying CAD',
        'Blood pressure medication (carefully titrated)'
      ],
      procedures: 'TAVR (Transcatheter Aortic Valve Replacement), Surgical Aortic Valve Replacement (SAVR).'
    }
  }
];

export default function DiseaseDB() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<typeof diseaseData[0] | null>(null);

  const filtered = diseaseData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-bg min-h-screen pb-24">
      <section className="bg-slate-900 pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <Logo className="w-20 h-20" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Disease <span className="text-secondary">Database</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            A deep-dive research hub for understanding complex heart and body system diseases, directed by professional clinical guidelines.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search diseases, symptoms, or medications..."
              className="w-full bg-slate-800 border-none rounded-2xl py-5 px-12 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-3 text-secondary" />
            Clinical Records
          </h2>
          {filtered.map((disease) => (
            <button
              key={disease.id}
              onClick={() => setSelectedDisease(disease)}
              className={`text-left p-6 rounded-3xl border transition-all ${
                selectedDisease?.id === disease.id 
                ? 'bg-white border-secondary shadow-xl shadow-secondary/10' 
                : 'bg-white border-slate-100 hover:border-secondary/50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase">{disease.category}</span>
                <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${selectedDisease?.id === disease.id ? 'translate-x-1 text-secondary' : ''}`} />
              </div>
              <h3 className="font-black text-slate-900 text-lg leading-tight uppercase">{disease.name}</h3>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-bold uppercase italic tracking-tighter">Content coming soon for "{searchTerm}"</div>
          )}
        </div>

        {/* Details Area */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedDisease ? (
              <motion.div
                key={selectedDisease.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-2xl shadow-slate-200"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase leading-none">{selectedDisease.name}</h2>
                    <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Clinical Analysis</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase mb-4 tracking-widest flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-rose-500" />
                      Condition Overview
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{selectedDisease.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase mb-6 tracking-widest flex items-center">
                        <Thermometer className="w-4 h-4 mr-2 text-amber-500" />
                        Key Symptoms
                      </h4>
                      <div className="space-y-3">
                        {selectedDisease.symptoms.map((s, idx) => (
                          <div key={idx} className="flex items-start bg-slate-50 p-3 rounded-xl">
                            <ShieldAlert className="w-4 h-4 text-rose-500 mr-3 mt-0.5 shrink-0" />
                            <span className="text-sm font-bold text-slate-700">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase mb-6 tracking-widest flex items-center">
                        <Hospital className="w-4 h-4 mr-2 text-blue-500" />
                        Clinical Diagnosis
                      </h4>
                      <p className="text-sm font-medium text-slate-600 bg-blue-50/50 p-4 rounded-2xl border border-blue-50">{selectedDisease.diagnosis}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/40">
                    <div className="flex items-center gap-3 mb-8">
                      <Pill className="w-6 h-6 text-emerald-400" />
                      <h4 className="text-lg font-black uppercase tracking-widest">Advanced Treatment</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4 block">Recommended Drugs</span>
                        <ul className="space-y-4">
                          {selectedDisease.treatment.medications.map((m, idx) => (
                            <li key={idx} className="flex items-center text-sm font-bold text-slate-300">
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-2 mb-4 block">Lifestyle & Surgery</span>
                        <p className="text-sm text-slate-400 font-medium mb-4">{selectedDisease.treatment.lifestyle}</p>
                        {selectedDisease.treatment.procedures && (
                          <div className="bg-slate-800 p-4 rounded-xl text-xs font-black text-secondary uppercase border border-white/5">
                            {selectedDisease.treatment.procedures}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <Logo className="w-12 h-12 opacity-10" />
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center opacity-30">
                <ShieldAlert className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tighter">Select a medical record for analysis</h3>
                <p className="text-sm font-bold mt-2">J-Nexus deep disease database verified by Dr. Jovin</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
