import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Gavel, Scale, FileText, Globe, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Legal() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Terms' | 'Privacy'>('Terms');

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Shield className="w-80 h-80 text-white" />
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
            Nexus <span className="text-secondary">Legal Center</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Privacy, Compliance, and Ethics. Understanding your relationship with the J-Nexus Clinical Intelligence Ecosystem.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
         {/* Switcher */}
         <div className="flex bg-white rounded-[2rem] p-2 shadow-2xl mb-12 border border-slate-50">
            <button 
              onClick={() => setActiveTab('Terms')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Terms' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
            >
               <Gavel className="w-4 h-4" />
               Terms of Service
            </button>
            <button 
              onClick={() => setActiveTab('Privacy')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Privacy' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
            >
               <Lock className="w-4 h-4" />
               Privacy Policy
            </button>
         </div>

         <motion.div 
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-[3.5rem] p-12 shadow-3xl border border-slate-50"
         >
            {activeTab === 'Terms' ? (
               <div className="prose prose-slate max-w-none">
                  <div className="flex items-center gap-3 mb-8">
                     <CheckCircle className="w-6 h-6 text-secondary" />
                     <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic m-0">Terms of Service</h2>
                  </div>
                  <p className="text-slate-500 font-bold italic mb-8">Last Updated: April 16, 2024</p>
                  
                  <h3 className="text-lg font-black uppercase tracking-tight italic">1. Clinical Disclaimer</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">J-Nexus is a platform for clinical educational intelligence. While founded by Dr. Jovin George Mabunga, the AI models and digital content provide scientific insights that must be verified by a local physician in an emergency.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">2. Digital Goods License</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">Purchased E-books and Master Volumes are licensed for personal clinical study. Unauthorized distribution or commercial resale of Nexus digital assets is strictly prohibited.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">3. Consultation Protocol</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">By using the AIAssistant, you agree that you are accessing a diagnostic logic engine. High-risk medical emergencies should be directed to the emergency numbers listed in our Clinical Dashboard.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">4. Global Care Accountability</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">Referrals to external global centers (Mayo Clinic, etc.) are facilitation services. J-Nexus is not liable for hospital-specific clinical outcomes outside its direct network.</p>
               </div>
            ) : (
               <div className="prose prose-slate max-w-none">
                  <div className="flex items-center gap-3 mb-8">
                     <Lock className="w-6 h-6 text-rose-500" />
                     <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic m-0">Privacy Policy</h2>
                  </div>
                  <p className="text-slate-500 font-bold italic mb-8">Last Updated: April 16, 2024</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">1. Health Data Encryption</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">Your clinical inquiries and AI interaction logs are encrypted using Nexus End-to-End protocols. We never share patient data with third-party insurance providers without explicit consent.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">2. Financial Integrity</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">Payment data (PayPal/Credit Cards) is processed through secure tokenized gateways. J-Nexus does not store raw credit card information on its servers.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">3. AI Learning Ethics</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">The Nexus AI logic engine uses anonymized case data to improve diagnostic accuracy. No PII (Personally Identifiable Information) is used during model training phases.</p>

                  <h3 className="text-lg font-black uppercase tracking-tight italic">4. Trans-border Data Policy</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">For Global Care referrals, specific medical history is shared only with the receiving institution via secure medical handoff protocols.</p>
               </div>
            )}
         </motion.div>

         <div className="mt-12 text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">
            © 2024 J-Nexus Clinical Intelligence Ecosystem. All Rights Reserved.
         </div>
      </div>
    </div>
  );
}
