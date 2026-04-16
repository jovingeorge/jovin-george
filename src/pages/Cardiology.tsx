import { motion } from "motion/react";
import { Heart, Activity, AlertCircle, ShieldPlus, ExternalLink, ChevronRight, Info } from "lucide-react";

const cardiologyModules = [
  {
    id: 'structure',
    title: 'Heart Structure & Function',
    content: "The human heart is a precision-engineered muscular pump. It has four chambers: the right and left atria (upper) and the right and left ventricles (lower). Its primary role is to drive the circulation of blood, delivering oxygen and nutrients to every cell in the body.",
    icon: Activity
  },
  {
    id: 'circulation',
    title: 'Blood Circulation',
    content: "Blood travels through two main circuits: the pulmonary circuit (to the lungs for oxygen) and the systemic circuit (to the rest of the body). Oxygenated blood leaves the left ventricle via the aorta, the body's largest artery.",
    icon: ExternalLink
  },
  {
    id: 'conditions',
    title: 'Common Conditions',
    items: [
      { name: 'Hypertension', desc: 'High blood pressure that can damage arteries over time.' },
      { name: 'Myocardial Infarction', desc: 'Commonly known as a heart attack; occurs when heart muscle blood flow is blocked.' },
      { name: 'Heart Failure', desc: 'A chronic condition where the heart doesn\'t pump blood as well as it should.' },
      { name: 'Arrhythmia', desc: 'Irregular heartbeat patterns (too fast, too slow, or erratic).' }
    ],
    icon: AlertCircle
  },
  {
    id: 'prevention',
    title: 'Prevention & Lifestyle',
    content: 'Cardiovascular disease is often preventable through healthy choices: balanced Mediterranean-style diet, 150 minutes of weekly aerobic exercise, stress management, and tobacco cessation.',
    icon: ShieldPlus
  }
];

export default function Cardiology() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Activity className="absolute bottom-10 right-10 w-96 h-96 text-blue-500" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Main Focus Specialty</span>
            <h1 className="text-white text-5xl font-extrabold mt-4">Cardiology <span className="text-blue-400">Excellence</span></h1>
            <p className="text-slate-400 mt-6 max-w-2xl text-lg leading-relaxed">
              Deep-dive into the clinical world of cardiology. Understand your heart's anatomy, physiology, and how to maintain life-long cardiovascular health.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
             <div className="sticky top-28 space-y-2">
                <h3 className="text-slate-900 font-bold mb-6 text-xl">Topics</h3>
                {cardiologyModules.map((m) => (
                  <a key={m.id} href={`#${m.id}`} className="flex items-center p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group font-medium text-slate-600 hover:text-blue-600">
                    <m.icon className="w-5 h-5 mr-3 opacity-40 group-hover:opacity-100" />
                    {m.title}
                  </a>
                ))}
             </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-24">
            {cardiologyModules.map((module) => (
              <section id={module.id} key={module.id} className="scroll-mt-32">
                 <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                       <module.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">{module.title}</h2>
                 </div>

                 {module.content && (
                   <p className="text-lg text-slate-600 leading-relaxed bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                      {module.content}
                   </p>
                 )}

                 {module.items && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {module.items.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
                           <h4 className="font-bold text-slate-900 flex items-center">
                             <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                             {item.name}
                           </h4>
                           <p className="mt-2 text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                 )}
              </section>
            ))}

            {/* Symptoms & When to See a Doctor */}
            <section className="bg-rose-50 rounded-[2.5rem] p-10 border border-rose-100">
                <div className="flex items-start space-x-6">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                      <Info className="w-8 h-8 text-rose-500" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-rose-900">Warning Signs: Immediate Action Required</h3>
                      <p className="mt-4 text-rose-800 leading-relaxed font-medium">
                        Seek emergency medical care if you experience:
                      </p>
                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Crushing chest pain or pressure",
                          "Sudden shortness of breath",
                          "Numbness in arms, back or jaw",
                          "Severe palpitations",
                          "Fainting or near-fainting",
                          "Sudden weakness or confusion"
                        ].map((s, i) => (
                          <li key={i} className="flex items-center text-rose-700 text-sm">
                             <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mr-3"></div>
                             {s}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
