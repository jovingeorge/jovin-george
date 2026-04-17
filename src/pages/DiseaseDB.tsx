import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, Thermometer, Pill, Hospital, ChevronRight, Heart, Activity, AlertCircle, Globe, Droplets, Database, Info, Layers } from 'lucide-react';
import Logo from '../components/Logo';

interface Disease {
  id: string;
  name: string;
  category: 'Pandemic' | 'Epidemic' | 'Inherited' | 'Sexual' | 'Heart' | 'Infectious' | 'Chronic';
  description: string;
  symptoms: string[];
  causes: string;
  prevention: string;
  diagnosis: string;
  image: string;
  treatment: {
    lifestyle: string;
    medications: string[];
    herbal?: string;
    procedures?: string;
  };
}

const diseaseData: Disease[] = [
  {
    id: 'cad',
    name: 'Coronary Artery Disease (CAD)',
    category: 'Heart',
    description: 'A condition where the major blood vessels that supply your heart become damaged or diseased. Plaque buildup in your arteries is usually the cause.',
    symptoms: ['Chest pain (angina)', 'Shortness of breath', 'Fatigue after exertion', 'Heart attack'],
    causes: 'Atherosclerosis, smoking, high cholesterol, diabetes.',
    prevention: 'Maintain a healthy weight, quit smoking, exercise daily, manage blood pressure.',
    diagnosis: 'EKG, Echocardiogram, Stress testing, Cardiac catheterization.',
    image: 'https://picsum.photos/seed/heart_disease/800/600',
    treatment: {
      lifestyle: 'Smoking cessation, Heart-healthy diet, Regular exercise.',
      medications: ['Statins', 'Aspirin', 'Beta blockers', 'ACE inhibitors'],
      herbal: 'Garlic (Allium sativum), Hawthorn Berry extract.',
      procedures: 'Angioplasty, Stenting, Bypass Surgery (CABG).'
    }
  },
  {
    id: 'covid-19',
    name: 'COVID-19 (SARS-CoV-2)',
    category: 'Pandemic',
    description: 'A global respiratory pandemic caused by the SARS-CoV-2 virus, affecting the lungs and systemic vascular systems.',
    symptoms: ['Fever', 'Dry cough', 'Loss of taste/smell', 'Difficulty breathing', 'Muscle aches'],
    causes: 'SARS-CoV-2 virus transmission via respiratory droplets.',
    prevention: 'Vaccination, social distancing, mask-wearing, frequent hand washing.',
    diagnosis: 'PCR Testing, Antigen rapid tests, Chest CT scans.',
    image: 'https://picsum.photos/seed/covid/800/600',
    treatment: {
      lifestyle: 'Isolation, hydration, prone positioning if respiratory distress.',
      medications: ['Remdesivir', 'Paxlovid', 'Dexamethasone (for severe cases)'],
      herbal: 'Zingiber officinale (Ginger), Echinacea for immune support (WHO noted).',
    }
  },
  {
    id: 'malaria',
    name: 'Malaria',
    category: 'Epidemic',
    description: 'A life-threatening disease spread by mosquitoes, highly prevalent in Tanzania and tropical regions.',
    symptoms: ['High fever', 'Chills', 'Sweating', 'Headache', 'Jaundice'],
    causes: 'Plasmodium parasites transmitted by Anopheles mosquitoes.',
    prevention: 'Use of insecticide-treated nets (ITNs), indoor residual spraying, antimalarial pills.',
    diagnosis: 'Rapid Diagnostic Tests (RDT), Microscopic examination of blood smears.',
    image: 'https://picsum.photos/seed/malaria/800/600',
    treatment: {
      lifestyle: 'Rest, increased fluid intake.',
      medications: ['Artemisinin-based combination therapies (ACTs)', 'Chloroquine', 'Quinine'],
      herbal: 'Artemisia annua (Sweet wormwood) - WHO approved source for artemisinin.',
    }
  },
  {
    id: 'sickle-cell',
    name: 'Sickle Cell Anemia',
    category: 'Inherited',
    description: 'A group of disorders that cause red blood cells to become misshapen and break down, leading to painful "crises".',
    symptoms: ['Severe pain episodes', 'Anemia', 'Swelling of hands/feet', 'Vision problems'],
    causes: 'Genetic mutation in the hemoglobin gene inherited from both parents.',
    prevention: 'Genetic counseling, newborn screening.',
    diagnosis: 'Hemoglobin electrophoresis, DNA testing.',
    image: 'https://picsum.photos/seed/sicklecell/800/600',
    treatment: {
      lifestyle: 'Hydration, avoiding extreme temperatures, high altitude avoidance.',
      medications: ['Hydroxyurea', 'Voxelotor', 'Folic acid supplements'],
      procedures: 'Blood transfusions, Bone marrow transplant (curative).'
    }
  },
  {
    id: 'hiv-aids',
    name: 'HIV/AIDS',
    category: 'Sexual',
    description: 'A virus that attacks the immune system (CD4 cells), identifying it as a global sexual health and epidemic concern.',
    symptoms: ['Rapid weight loss', 'Recurrent infections', 'Profuse night sweats', 'Lymph node swelling'],
    causes: 'Human Immunodeficiency Virus (HIV) transmission via certain body fluids.',
    prevention: 'PrEP (Pre-exposure prophylaxis), condom use, sterile needles.',
    diagnosis: 'HIV antibody tests, Viral load monitoring.',
    image: 'https://picsum.photos/seed/hiv/800/600',
    treatment: {
      lifestyle: 'High-protein diet, strict adherence to medication schedules.',
      medications: ['Antiretroviral therapy (ART)', 'NRTIs/NNRTIs', 'Protease inhibitors'],
      herbal: 'Supportive herbal nutrition for immune resilience.',
    }
  },
  {
    id: 'syphilis',
    name: 'Syphilis',
    category: 'Sexual',
    description: 'A bacterial infection usually spread by sexual contact. The disease starts as a painless sore — typically on the genitals, rectum or mouth.',
    symptoms: ['Painless sores', 'Skin rashes', 'Fever', 'Swollen lymph glands'],
    causes: 'Treponema pallidum bacterium.',
    prevention: 'Safe sex practices, regular STI screenings.',
    diagnosis: 'Blood tests, Fluid testing from sores.',
    image: 'https://picsum.photos/seed/syphilis/800/600',
    treatment: {
      lifestyle: 'Partner notification and treatment, abstinence during cure.',
      medications: ['Penicillin G Benzathine', 'Doxycycline'],
    }
  },
  {
    id: 'ebola',
    name: 'Ebola Virus Disease',
    category: 'Epidemic',
    description: 'A severe, often fatal illness in humans caused by ebolavirus, often occurring in outbreaks in sub-Saharan Africa.',
    symptoms: ['Severe hemorrhage', 'High fever', 'Muscle pain', 'Vomiting', 'Internal bleeding'],
    causes: 'Direct contact with infected blood, secretions, or organs of infected animals or humans.',
    prevention: 'Avoiding contact with infected individuals, safe burial practices, stringent infection control.',
    diagnosis: 'ELISA, PCR, Viral isolation.',
    image: 'https://picsum.photos/seed/ebola/800/600',
    treatment: {
      lifestyle: 'Isolation, aggressive fluid replacement.',
      medications: ['Inmazeb (Atoltivimab)', 'Ebanga (Ansuvimab)'],
      procedures: 'Supportive intensive care.'
    }
  },
  {
    id: 'cholera',
    name: 'Cholera',
    category: 'Epidemic',
    description: 'An acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.',
    symptoms: ['Profuse watery diarrhea (rice-water stools)', 'Vomiting', 'Leg cramps', 'Severe dehydration'],
    causes: 'Vibrio cholerae bacterium.',
    prevention: 'Clean water, sanitation, hygiene (WASH), Oral Cholera Vaccines (OCV).',
    diagnosis: 'Stool culture, Rapid Diagnostic Tests.',
    image: 'https://picsum.photos/seed/cholera/800/600',
    treatment: {
      lifestyle: 'Immediate rehydration, zinc supplementation for children.',
      medications: ['Doxycycline', 'Azithromycin', 'Oral Rehydration Salts (ORS)'],
    }
  },
  {
    id: 'huntingtons',
    name: "Huntington's Disease",
    category: 'Inherited',
    description: 'A progressive brain disorder that causes uncontrolled movements, emotional problems, and loss of thinking ability.',
    symptoms: ['Chorea (involuntary movements)', 'Cognitive decline', 'Mood swings', 'Difficulty swallowing'],
    causes: 'Autosomal dominant genetic mutation in the HTT gene.',
    prevention: 'Genetic counseling for families, prenatal testing.',
    diagnosis: 'Genetic DNA testing, Neuropsychological testing.',
    image: 'https://picsum.photos/seed/huntington/800/600',
    treatment: {
      lifestyle: 'Physical therapy, Speech therapy, High-calorie diet.',
      medications: ['Tetrabenazine', 'Deutetrabenazine', 'Antipsychotic agents'],
    }
  },
  {
    id: 'spanish-flu',
    name: '1918 Spanish Influenza',
    category: 'Pandemic',
    description: 'One of the deadliest pandemics in human history, caused by an H1N1 virus with genes of avian origin.',
    symptoms: ['Cyanosis (skin turning blue)', 'Fluid in lungs', 'Rapid high fever', 'Aggressive pneumonia'],
    causes: 'H1N1 Influenza A virus.',
    prevention: 'Modern surveillance, seasonal flu vaccines, pandemic preparedness protocols.',
    diagnosis: 'Historical clinical records, modern viral genotyping of preserved samples.',
    image: 'https://picsum.photos/seed/spanishflu/800/600',
    treatment: {
      lifestyle: 'Quarantine, bed rest, hydration.',
      medications: ['Modern Neuraminidase inhibitors (Oseltamivir)'],
    }
  },
  {
    id: 'diabetes-t2',
    name: 'Diabetes Mellitus Type 2',
    category: 'Chronic',
    description: 'A long-term medical condition in which your body doesn\'t use insulin properly, resulting in high blood sugar.',
    symptoms: ['Increased thirst', 'Frequent urination', 'Unexplained weight loss', 'Slow-healing sores'],
    causes: 'Genetics, lifestyle factors like obesity and physical inactivity.',
    prevention: 'Healthy diet, regular physical activity, maintaining a healthy weight.',
    diagnosis: 'A1C test, Fasting plasma glucose (FPG) test.',
    image: 'https://picsum.photos/seed/diabetes/800/600',
    treatment: {
      lifestyle: 'Carbohydrate counting, consistent exercise, glucose monitoring.',
      medications: ['Metformin', 'Sulfonylureas', 'Insulin therapy'],
      herbal: 'Bitter Melon (Momordica charantia), Cinnamon extracts.',
    }
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    category: 'Epidemic',
    description: 'A potentially serious infectious bacterial disease that mainly affects the lungs, often spreading to other parts of the body.',
    symptoms: ['Coughing for 3+ weeks', 'Coughing up blood', 'Chest pain', 'Night sweats'],
    causes: 'Mycobacterium tuberculosis bacteria transmitted through the air.',
    prevention: 'BCG vaccine, ventilation, cough etiquette, masks in high-risk areas.',
    diagnosis: 'Sputum smear microscopy, Chest X-ray, Mantoux tuberculin skin test.',
    image: 'https://picsum.photos/seed/tb/800/600',
    treatment: {
      lifestyle: 'High caloric intake, respiratory hygiene.',
      medications: ['Isoniazid', 'Rifampin', 'Ethambutol', 'Pyrazinamide'],
      herbal: 'Supportive herbal teas for lung resilience.',
    }
  },
  {
    id: 'hypertension-nexus',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Heart',
    description: 'A condition in which the force of the blood against the artery walls is too high. Often called the "silent killer".',
    symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Often no symptoms'],
    causes: 'High salt intake, stress, obesity, kidney issues.',
    prevention: 'DASH diet, reducing sodium, regular exercise, limiting alcohol.',
    diagnosis: 'Blood pressure readings (Sphygmomanometer).',
    image: 'https://picsum.photos/seed/pressure/800/600',
    treatment: {
      lifestyle: 'Low-sodium diet, stress reduction techniques (meditation).',
      medications: ['Thiazide diuretics', 'Calcium channel blockers', 'ACE inhibitors'],
      herbal: 'Hibiscus tea, Celery seed extract.',
    }
  },
  {
    id: 'gonorrhea',
    name: 'Gonorrhea',
    category: 'Sexual',
    description: 'A sexually transmitted infection (STI) caused by bacteria that can infect both males and females, affecting the urethra, rectum, or throat.',
    symptoms: ['Painful urination', 'Abnormal discharge', 'Testicular pain (men)', 'Pelvic pain (women)'],
    causes: 'Neisseria gonorrhoeae bacterium.',
    prevention: 'Condom use, limiting sexual partners, regular testing.',
    diagnosis: 'Urine test, swab of infected area.',
    image: 'https://picsum.photos/seed/gonorrhea/800/600',
    treatment: {
      lifestyle: 'Abstinence during treatment, partner notification.',
      medications: ['Ceftriaxone (injection)', 'Azithromycin'],
    }
  },
  {
    id: 'cystic-fibrosis',
    name: 'Cystic Fibrosis (CF)',
    category: 'Inherited',
    description: 'A genetic disorder that affects the lungs and digestive system by producing thick, sticky mucus.',
    symptoms: ['Persistent cough', 'Frequent lung infections', 'Poor growth/weight gain', 'Salty-tasting skin'],
    causes: 'Inherited mutation in the CFTR gene from both parents.',
    prevention: 'Genetic carrier screening, family history mapping.',
    diagnosis: 'Sweat chloride test, Newborn genetic screening.',
    image: 'https://picsum.photos/seed/cysticfibrosis/800/600',
    treatment: {
      lifestyle: 'Chest physical therapy (percussion), high-calorie diet.',
      medications: ['Pancreatic enzymes', 'Mucus thinners', 'CFTR modulators (Ivacaftor)'],
    }
  }
];

const categories = ['All', 'Pandemic', 'Epidemic', 'Inherited', 'Sexual', 'Heart', 'Chronic'];

export default function DiseaseDB() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(diseaseData[0]);

  const filtered = diseaseData.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Search & Header */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Database className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <Logo className="w-20 h-20" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 italic">
            Disease <span className="text-secondary">Nexus Intelligence</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12 italic">
            Professional clinical repository of world pandemic, epidemic, and sexual diseases. 10,000+ records under ongoing classification.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Query symptoms, causes, or medications across the global database..."
              className="w-full bg-slate-800 border-none rounded-[2rem] py-6 px-16 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary transition-all text-sm font-bold shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 mb-12 relative z-20">
         <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
            {categories.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shadow-xl ${
                    selectedCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 scale-105' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-secondary'
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* List */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center">
            <Layers className="w-5 h-5 mr-3 text-secondary" />
            Medical Records ({filtered.length})
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
            {filtered.map((disease) => (
              <button
                key={disease.id}
                onClick={() => setSelectedDisease(disease)}
                className={`text-left p-6 rounded-[2.5rem] border transition-all group ${
                  selectedDisease?.id === disease.id 
                  ? 'bg-white border-secondary shadow-2xl shadow-secondary/10' 
                  : 'bg-white border-slate-50 hover:border-secondary/50 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter ${
                    disease.category === 'Pandemic' ? 'bg-rose-100 text-rose-600' :
                    disease.category === 'Epidemic' ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>{disease.category}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${selectedDisease?.id === disease.id ? 'translate-x-1 text-secondary' : ''}`} />
                </div>
                <h3 className="font-black text-slate-900 text-base leading-tight uppercase group-hover:text-secondary transition-colors">{disease.name}</h3>
                <p className="text-[10px] text-slate-400 mt-2 font-bold line-clamp-1">{disease.description}</p>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-center">
               <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <p className="text-xs font-black text-slate-400 uppercase italic">No global records found for your query. Expanding database...</p>
            </div>
          )}
        </div>

        {/* Details Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedDisease ? (
              <motion.div
                key={selectedDisease.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[4rem] border border-slate-50 p-12 shadow-3xl shadow-slate-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Logo className="w-80 h-80" />
                </div>

                <div className="relative z-10">
                   <div className="flex flex-col md:flex-row gap-8 mb-12">
                      <div className="w-full md:w-64 h-64 bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                         <img src={selectedDisease.image} alt={selectedDisease.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                           Nexus ID: {selectedDisease.id.toUpperCase()}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase leading-none tracking-tighter mb-4">{selectedDisease.name}</h2>
                        <div className="flex items-center gap-4">
                           <span className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                              <Globe className="w-4 h-4 mr-2 text-primary" />
                              Global Priority: High
                           </span>
                           <span className="w-1 h-1 bg-slate-200 rounded-full" />
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedDisease.category} Case</span>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                           <h4 className="flex items-center text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">
                              <Thermometer className="w-4 h-4 mr-2 text-rose-500" />
                              Primary Symptoms
                           </h4>
                           <div className="flex flex-wrap gap-3">
                              {selectedDisease.symptoms.map((s, idx) => (
                                 <span key={idx} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100">{s}</span>
                              ))}
                           </div>
                        </div>
                        <div>
                           <h4 className="flex items-center text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">
                              <ShieldAlert className="w-4 h-4 mr-2 text-emerald-500" />
                              Clinical Prevention
                           </h4>
                           <p className="text-sm font-bold text-slate-600 leading-relaxed italic">{selectedDisease.prevention}</p>
                        </div>
                     </div>

                     <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Scientific Narrative</h4>
                        <p className="text-slate-600 leading-relaxed font-semibold italic text-lg mb-8">"{selectedDisease.description}"</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Root Causes</span>
                              <p className="text-xs font-bold text-slate-700">{selectedDisease.causes}</p>
                           </div>
                           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nexus Diagnosis</span>
                              <p className="text-xs font-bold text-slate-700">{selectedDisease.diagnosis}</p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Pill className="w-40 h-40" />
                        </div>
                        <h4 className="flex items-center text-lg font-black uppercase tracking-widest mb-10 text-secondary">
                           <Activity className="w-6 h-6 mr-4" />
                           Clinical Treatment Protocol
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                           <div className="space-y-8">
                              <div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 border-l-2 border-secondary pl-3">Advanced Pharma</span>
                                 <div className="space-y-3">
                                    {selectedDisease.treatment.medications.map((m, idx) => (
                                       <div key={idx} className="flex items-center text-sm font-black text-slate-100 space-x-3">
                                          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                          <span>{m}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                              {selectedDisease.treatment.herbal && (
                                 <div>
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-4 border-l-2 border-emerald-400 pl-3">WHO Approved Herbal Support</span>
                                    <p className="text-sm font-bold italic text-emerald-100/70">{selectedDisease.treatment.herbal}</p>
                                 </div>
                              )}
                           </div>
                           <div className="space-y-8">
                              <div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 border-l-2 border-blue-400 pl-3">Physiological Management</span>
                                 <p className="text-sm font-bold text-slate-300 leading-relaxed italic">{selectedDisease.treatment.lifestyle}</p>
                              </div>
                              {selectedDisease.treatment.procedures && (
                                 <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                    <span className="text-[9px] font-black text-secondary uppercase tracking-widest block mb-2">Elite Procedures</span>
                                    <p className="text-xs font-black uppercase tracking-tighter text-white">{selectedDisease.treatment.procedures}</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
