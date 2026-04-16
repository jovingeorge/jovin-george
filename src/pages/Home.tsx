import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Heart, Shield, Activity, ArrowRight, Star, 
  ChevronRight, BookOpen, Globe, Pill, 
  MessageCircle, Zap, ShieldCheck, Bookmark
} from "lucide-react";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col bg-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[800px] bg-slate-900 border-b-8 border-primary/20 -mt-20 -skew-y-3 origin-top-left z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-white"
           >
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary-light text-xs font-black uppercase tracking-[0.2em] mb-8 border border-primary/30">
                 Global Clinical Authority
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
                Saving Hearts <br />
                <span className="text-secondary italic">Advancing Life</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-12 max-w-lg font-medium">
                J-Nexus Health is the premier medical platform led by Doctor Jovin George Mabunga, delivering elite cardiology insights and professional clinical education to the world.
              </p>
              <div className="flex flex-wrap gap-6">
                 <Link to="/cardiology" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl shadow-white/10">
                    Explore Cardiology
                 </Link>
                 <Link to="/ebooks" className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                    <BookOpen className="w-4 h-4" />
                    Medical E-Books
                 </Link>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="hidden lg:flex justify-end p-12"
           >
              <div className="relative">
                 <div className="absolute inset-0 bg-primary blur-[120px] opacity-20 animate-pulse" />
                 <Logo className="w-[450px] h-[450px] relative z-20 drop-shadow-[0_35px_35px_rgba(0,180,160,0.3)]" />
                 
                 <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 max-w-xs z-30">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                          <ShieldCheck className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Expert</p>
                          <p className="text-sm font-black text-slate-900 uppercase">Dr. Jovin George</p>
                       </div>
                    </div>
                    <p className="text-xs text-slate-500 font-bold italic leading-relaxed">"Our mission is to make clinical expertise accessible to every heart across Tanzania and the globe."</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 mb-24 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: "Clinical E-Books", value: "5000+", icon: BookOpen },
             { label: "Global Reach", value: "120+ Countries", icon: Globe },
             { label: "Hospitals Network", value: "Tanzania & Worldwide", icon: ShieldCheck },
             { label: "Consultations", value: "Professional Care", icon: MessageCircle }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-50 flex items-center gap-6 group hover:scale-105 transition-transform">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-xl font-black text-slate-900 uppercase tracking-tight">{stat.value}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Disease Deep Database Intro */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
         <div className="md:col-span-5 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-[2s]">
               <Logo className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none italic">
              The Professional <br />
              <span className="text-secondary italic">Disease Vault</span>
            </h2>
            <p className="text-slate-400 font-bold mb-10 leading-relaxed italic">
               Explore thousands of clinical records on heart conditions, medications, and worldwide hospital referrals. Curated by Dr. Jovin for the global health community.
            </p>
            <Link to="/diseases" className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
               Open Database
               <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
         <div className="md:col-span-1 hidden md:flex items-center justify-center">
           <div className="w-px h-64 bg-slate-200" />
         </div>
         <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {[
              { title: "Symptoms Analysis", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
              { title: "Medication Guide", icon: Pill, color: "text-emerald-500", bg: "bg-emerald-50" },
              { title: "Tanzania Hospitals", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
              { title: "Lifestyle Wellness", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-100 group hover:border-primary/50 transition-all cursor-pointer">
                 <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6 ring-4 ring-white shadow-lg`}>
                    <item.icon className="w-6 h-6" />
                 </div>
                 <h4 className="font-black text-slate-900 uppercase tracking-tighter leading-tight">{item.title}</h4>
              </div>
            ))}
         </div>
      </section>

      {/* E-books Viral Section */}
      <section className="bg-emerald-500 py-24 px-6 overflow-hidden relative">
         <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none">
            <Logo className="w-[800px] h-[800px]" />
         </div>
         <div className="max-w-7xl mx-auto relative z-10 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
               <BookOpen className="w-16 h-16 mx-auto mb-10 text-white/50" />
               <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter italic">
                 Unlocking the Hearts <br />
                 <span className="text-slate-900 italic">Silent Secrets</span>
               </h2>
               <p className="text-xl font-bold mb-12 text-slate-900/70 leading-relaxed italic">
                  Explore the full e-book collection written by Jovin. From advanced cardiology to sexual vitality and viral marketing strategies in health.
               </p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link to="/ebooks" className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform">
                     Browse Full Library
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Global Hospitals & Consultation CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Globe className="w-3 h-3" />
                  Worldwide Professional Links
               </div>
               <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">
                 Connecting You to <br />
                 Elite Care Centers
               </h2>
               <p className="text-lg text-slate-500 font-bold mb-10 leading-relaxed italic">
                 Whether in Dar es Salaam or New York, J-Nexus Health directs you to professional cardiology institutes specialized in heart surgery and advanced treatments.
               </p>
               <Link to="/global-care" className="px-10 py-5 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-slate-200 inline-block hover:bg-slate-900 hover:text-white transition-all">
                  View Hospital Directory
               </Link>
            </div>

            <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl shadow-slate-900/40 relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-full flex items-center justify-center text-slate-900 shadow-2xl -rotate-12">
                  <span className="text-xs font-black uppercase tracking-tighter text-center leading-none">Book <br /> Dr Jovin</span>
               </div>
               <h3 className="text-3xl font-black uppercase mb-6 leading-tight">Professional <br /> Consultations</h3>
               <p className="text-slate-400 font-bold mb-10 leading-relaxed italic text-sm">
                 Direct 1-on-1 access to Dr. Jovin George Mabunga for specialized heart care and internal wellness protocols world-wide.
               </p>
               <Link to="/consultation" className="w-full flex items-center justify-center gap-4 py-6 bg-secondary text-slate-900 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:scale-[1.02] transition-transform">
                  <MessageCircle className="w-5 h-5" />
                  Request on WhatsApp
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
