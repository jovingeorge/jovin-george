import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Shield, Activity, ArrowRight, CheckCircle2, Star, UserCheck, ChevronRight } from "lucide-react";

export default function Home() {
  const steps = [
    { title: "Explore Cardiology", desc: "Understand your heart's structure and common conditions.", icon: Heart, link: "/cardiology" },
    { title: "Body Systems", desc: "Detailed guides for internal systems and their function.", icon: Activity, link: "/systems" },
    { title: "Natural healing", desc: "Discover herbal and supportive natural treatments.", icon: Shield, link: "/herbal" },
  ];

  return (
    <div className="flex flex-col bg-bg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">
         <div className="bg-primary rounded-theme p-12 text-white relative overflow-hidden shadow-theme">
            <div className="relative z-10 max-w-2xl">
               <h1 className="text-4xl font-extrabold mb-4">Cardiology Focus</h1>
               <p className="text-lg opacity-90 leading-relaxed mb-8">
                  Your comprehensive guide to heart health, circulation, and vital wellness. Led by Doctor Jovin George Mabunga, J-Nexus Health delivers clinical expertise through a minimalist digital interface.
               </p>
               <div className="flex space-x-4">
                  <Link to="/cardiology" className="btn-theme-secondary !bg-white !text-primary border-none shadow-sm">
                     Explore Library
                  </Link>
                  <Link to="/consultation" className="px-6 py-2.5 bg-primary-dark text-white rounded-md font-semibold text-sm border border-white/20 hover:bg-opacity-90">
                     Book Specialist
                  </Link>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <Heart className="w-64 h-64" />
            </div>
         </div>
      </section>

      {/* Main Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: AI & Systems */}
            <div className="lg:col-span-3 space-y-6 flex flex-col">
               <div className="card-theme flex-1 min-h-[300px] bg-linear-to-b from-sky-50 to-white">
                  <h2 className="text-primary font-bold text-base mb-2">AI Health Assistant</h2>
                  <p className="text-xs text-text-muted leading-relaxed">Ask J-Nexus AI about symptoms, wellness, or body systems.</p>
                  <div className="flex-1 mt-6">
                     <div className="bg-white p-3 rounded-lg border border-border-theme text-xs mb-4 shadow-sm">
                        <strong>AI:</strong> How can I assist your health journey today?
                     </div>
                  </div>
                  <Link to="/ai-assistant" className="mt-auto relative">
                     <input type="text" readOnly className="w-full p-3 border border-border-theme rounded-lg text-xs cursor-pointer bg-white" placeholder="Type symptoms..." />
                     <ArrowRight className="absolute right-3 top-3 w-4 h-4 text-primary" />
                  </Link>
               </div>
               <div className="card-theme">
                  <h2 className="text-base font-bold mb-4">Body Systems</h2>
                  <div className="grid grid-cols-2 gap-2">
                     {["Cardiovascular", "Digestive", "Respiratory", "Nervous", "Immune", "Urinary"].map(s => (
                        <div key={s} className="p-2 border border-border-theme rounded-lg text-[11px] text-center font-semibold text-text-muted hover:border-primary hover:text-primary transition-all cursor-pointer">
                           {s}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Middle Col: Insights */}
            <div className="lg:col-span-6 space-y-6">
               <div className="card-theme h-full">
                  <h2 className="text-lg font-bold mb-6">Health Library Highlights</h2>
                  <div className="space-y-8 overflow-y-auto pr-2 scrollbar-hide">
                     <div className="space-y-2">
                        <h3 className="text-primary font-bold text-base">Understanding the Heart</h3>
                        <p className="text-[13px] text-text-muted leading-relaxed">The heart is a muscular organ that pumps blood through the body. It consists of four chambers: two upper atria and two lower ventricles.</p>
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-primary font-bold text-base">Common Conditions & Symptoms</h3>
                        <p className="text-[13px] text-text-muted leading-relaxed">Hypertension, heart failure, and arrhythmia are leading concerns. Watch for chest pain (angina) and irregular heartbeat.</p>
                        <div className="flex gap-2 pt-2">
                           {["Hypertension", "Heart Attack", "Arrhythmia"].map(t => (
                              <span key={t} className="text-[11px] bg-sky-100 text-primary px-2 py-1 rounded">
                                 {t}
                              </span>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-primary font-bold text-base">Herbal & Supportive Care</h3>
                        <p className="text-[13px] text-text-muted leading-relaxed">Natural remedies like Garlic and Hawthorne support cardiovascular integrity. Always use as supportive care alongside medical treatment.</p>
                     </div>
                     <div className="bg-bg p-4 rounded-lg border border-border-theme">
                        <h3 className="text-secondary font-bold text-base">Herbal Guide Preview</h3>
                        <p className="text-[13px] text-text-muted italic">Explore our 2024 Herbal Healing protocol for digestive and immune support.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Col: Tools & Shop */}
            <div className="lg:col-span-3 space-y-6 flex flex-col">
               <div className="card-theme">
                  <h2 className="text-base font-bold mb-2">Symptom Checker</h2>
                  <p className="text-xs text-text-muted">Input your symptoms for a preliminary analysis.</p>
                  <Link to="/symptoms" className="btn-theme-primary mt-4">Launch Interactive Tool</Link>
               </div>
               <div className="card-theme">
                  <h2 className="text-base font-bold mb-2">Consultations</h2>
                  <div className="border border-border-theme rounded-lg p-3 mt-2 bg-emerald-50/30 border-secondary/20">
                     <div className="flex justify-between items-center font-bold text-sm">
                        <span>Premium Session</span>
                        <span className="text-primary">$99</span>
                     </div>
                     <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">1-on-1 Specialist Session</div>
                  </div>
                  <Link to="/consultation" className="btn-theme-secondary mt-4">Book via WhatsApp</Link>
               </div>
               <div className="card-theme flex-1">
                  <h2 className="text-base font-bold mb-4">Digital Shop</h2>
                  <div className="space-y-4">
                     {[
                        { name: "Heart Health eBook", price: "$19.00" },
                        { name: "Herbal Guide", price: "$25.00" }
                     ].map((item, i) => (
                        <div key={i} className={`flex gap-3 pb-3 border-border-theme ${i === 0 ? 'border-b' : ''}`}>
                           <div className="w-10 h-10 bg-slate-100 rounded-md shrink-0"></div>
                           <div>
                              <div className="text-xs font-bold text-text-main">{item.name}</div>
                              <div className="text-[11px] text-secondary font-bold mt-0.5">{item.price}</div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <Link to="/shop" className="text-blue-600 text-xs font-bold mt-4 flex items-center hover:underline">
                     Browse All <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
