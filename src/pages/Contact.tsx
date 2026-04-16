import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin, Globe, MessageSquare, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate real submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
           <Send className="w-80 h-80 text-white" />
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
            Nexus <span className="text-secondary">Communication</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            {language === 'en' 
              ? "Connect with Dr. Jovin George Mabunga and the Nexus medical team. We are your partner in high-capacity clinical excellence."
              : "Ungana na Dokta Jovin George Mabunga na timu ya matibabu ya Nexus. Sisi ni mshirika wako katika ubora wa hali ya juu wa kliniki."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-6">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-3xl"
               >
                  <div className="p-4 bg-rose-50 rounded-[1.5rem] w-fit mb-8 text-rose-500">
                     <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Clinical Inquiry</h3>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">support@j-nexus.com</p>
                  <p className="text-xs font-bold text-slate-400 italic">Expected response: <span className="text-secondary">Within 4 Hours</span></p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
                 className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-3xl"
               >
                  <div className="p-4 bg-emerald-50 rounded-[1.5rem] w-fit mb-8 text-emerald-500">
                     <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Emergency Hotline</h3>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">+255 123 456 789</p>
                  <p className="text-xs font-bold text-slate-400 italic">Status: <span className="text-emerald-500">Operational 24/7</span></p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-3xl"
               >
                  <div className="p-4 bg-blue-50 rounded-[1.5rem] w-fit mb-8 text-blue-500">
                     <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Regional HQ</h3>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Dar es Salaam, Tanzania</p>
                  <p className="text-xs font-bold text-slate-400 italic italic">Serving global patient networks.</p>
               </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white rounded-[4rem] p-12 border border-slate-50 shadow-4xl relative overflow-hidden h-full"
               >
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <Logo className="w-96 h-96" />
                  </div>

                  {!submitted ? (
                     <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Full Name</label>
                              <input 
                                required
                                type="text"
                                className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-tighter placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all"
                                placeholder="Jovin George Mabunga"
                              />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Email Address</label>
                              <input 
                                required
                                type="email"
                                className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-tighter placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all"
                                placeholder="jovin@nexus.com"
                              />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Inquiry Category</label>
                           <select className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 text-slate-900 font-black tracking-tighter focus:ring-2 focus:ring-secondary transition-all appearance-none cursor-pointer">
                              <option>Clinical Consultation</option>
                              <option>E-book Support</option>
                              <option>Global Care Referral</option>
                              <option>Clinical Partnership</option>
                              <option>Other Intelligence Queries</option>
                           </select>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Clinical Message</label>
                           <textarea 
                             required
                             rows={6}
                             className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-8 text-slate-900 font-black tracking-tighter placeholder:text-slate-300 focus:ring-2 focus:ring-secondary transition-all resize-none"
                             placeholder="Provide details about your inquiry..."
                           />
                        </div>

                        <button 
                          disabled={loading}
                          type="submit"
                          className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-2xl hover:bg-secondary transition-all flex items-center justify-center gap-4 group"
                        >
                           {loading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : (
                              <>
                                 Transmit Intelligence
                                 <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </>
                           )}
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <ShieldCheck className="w-4 h-4 text-emerald-500" />
                           Nexus End-to-End Encryption Enabled
                        </div>
                     </form>
                  ) : (
                     <div className="h-full flex flex-col items-center justify-center text-center py-20">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-8 shadow-4xl shadow-emerald-500/20"
                        >
                           <ShieldCheck className="w-12 h-12" />
                        </motion.div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Intelligence Received</h2>
                        <p className="text-slate-500 font-bold max-w-md italic leading-relaxed">
                           Your clinical inquiry has been securely transmitted to the J-Nexus processing queue. A medical representative will contact you shortly.
                        </p>
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="mt-12 text-secondary font-black uppercase text-xs tracking-[0.2em] border-b-2 border-secondary pb-1 hover:text-slate-900 hover:border-slate-900 transition-all cursor-pointer"
                        >
                           Send another message
                        </button>
                     </div>
                  )}
               </motion.div>
            </div>
         </div>
      </div>
    </div>
  );
}
