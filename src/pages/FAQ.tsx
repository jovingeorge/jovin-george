import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Plus, Minus, Search, MessageSquare, Zap } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  question: string;
  questionSw: string;
  answer: string;
  answerSw: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'General',
    question: "What is J-Nexus?",
    questionSw: "J-Nexus ni nini?",
    answer: "J-Nexus is an elite medical intelligence platform founded by Dr. Jovin George Mabunga. It connects patients with advanced clinical knowledge, AI-driven diagnostics, and a global network of top-tier hospitals.",
    answerSw: "J-Nexus ni jukwaa la juu la akili ya matibabu lililoanzishwa na Dokta Jovin George Mabunga. Inawaunganisha wagonjwa na maarifa ya juu ya kliniki, uchunguzi unaoendeshwa na AI, na mtandao wa kimataifa wa hospitali za kiwango cha juu."
  },
  {
    category: 'E-books',
    question: "How do I download my purchased E-books?",
    questionSw: "Ninawezaje kupakua vitabu vyangu vya kielektroniki nilivyonunua?",
    answer: "After a successful payment, your digital assets are immediately available in your 'Account' dashboard under the 'Receipts' or 'My Library' sections. You can download them as verified clinical PDFs.",
    answerSw: "Baada ya malipo kufanikiwa, rasilimali zako za kidijitali zinapatikana mara moja kwenye dashibodi yako ya 'Akaunti' chini ya sehemu za 'Receipts'. Unaweza kuzipakua kama PDF zilizothibitishwa."
  },
  {
    category: 'Consultations',
    question: "Are the AI consultations 100% accurate?",
    questionSw: "Je, mashauriano ya AI ni sahihi kwa asilimia 100?",
    answer: "The Nexus AI is a high-capacity clinical logic model designed to provide preliminary insights. While highly advanced, it is meant to supplement, not replace, professional medical evaluation from Dr. Jovin George or your local specialist.",
    answerSw: "Nexus AI ni mfano wa juu wa mantiki ya kliniki iliyoundwa kutoa maarifa ya awali. Ingawa ni ya juu sana, inakusudiwa kuongeza, sio kuchukua nafasi ya tathmini ya kitaalamu ya matibabu."
  },
  {
    category: 'Payments',
    question: "What payment methods do you accept?",
    questionSw: "Ni njia gani za malipo mnazokubali?",
    answer: "We accept PayPal, and all major credit cards including Visa and MasterCard through our secure encrypted gateway.",
    answerSw: "Tunakubali PayPal, na kadi zote kuu za mkopo zikiwemo Visa na MasterCard kupitia mfumo wetu salama wa malipo."
  },
  {
    category: 'Clinical',
    question: "Can I get a referral to hospitals outside Tanzania?",
    questionSw: "Je, naweza kupata rufaa kwenda hospitali nje ya Tanzania?",
    answer: "Yes. Through our Global Care Network, we provide direct referral paths to elite institutions like Mayo Clinic (USA), Apollo Hospitals (India), and Singapore General Hospital.",
    answerSw: "Ndiyo. Kupitia Mtandao wetu wa Huduma ya Dunia, tunatoa njia za rufaa za moja kwa moja kwenye taasisi za wasomi kama Mayo Clinic (USA), Hospitali za Apollo (India), na Singapore General Hospital."
  }
];

export default function FAQ() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filtered = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.questionSw.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 p-12 opacity-5">
           <HelpCircle className="w-80 h-80 text-white" />
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
            Nexus <span className="text-secondary">Help Center</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12 italic">
            {language === 'en' 
              ? "Your roadmap to navigating the J-Nexus ecosystem. Direct answers for clinical, technical, and payment queries."
              : "Ramani yako ya kutumia mfumo wa J-Nexus. Majibu ya moja kwa moja ya maswali ya kliniki, kiufundi na malipo."}
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder={language === 'en' ? "Search frequently asked questions..." : "Tafuta maswali yanayoulizwa mara kwa mara..."}
              className="w-full bg-slate-800 border-none rounded-[2rem] py-6 px-16 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary transition-all text-sm font-bold shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
         <div className="space-y-4">
            {filtered.map((item, idx) => (
               <motion.div 
                 key={idx}
                 className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl overflow-hidden"
               >
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="w-full px-8 py-8 flex items-center justify-between text-left group"
                  >
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">{item.category}</span>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic group-hover:text-secondary transition-colors">
                           {language === 'en' ? item.question : item.questionSw}
                        </h3>
                     </div>
                     <div className={`p-2 rounded-full transition-all ${expandedIndex === idx ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                        <ChevronDown className="w-5 h-5" />
                     </div>
                  </button>
                  <AnimatePresence>
                     {expandedIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-8 pb-8"
                        >
                           <div className="pt-4 border-t border-slate-50">
                              <p className="text-slate-600 font-bold leading-relaxed italic text-base">
                                 {language === 'en' ? item.answer : item.answerSw}
                              </p>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            ))}
         </div>

         <div className="mt-20 p-12 bg-slate-900 rounded-[3.5rem] text-center shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <MessageSquare className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10">
               <h3 className="text-3xl font-black text-white uppercase italic mb-6">Still have <span className="text-secondary">Questions?</span></h3>
               <p className="text-slate-400 font-bold mb-10 italic">Our clinical support team is available 24/7 for the Nexus community.</p>
               <button 
                 onClick={() => window.location.href = '/contact'}
                 className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-secondary transition-all"
               >
                  Contact Support
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
