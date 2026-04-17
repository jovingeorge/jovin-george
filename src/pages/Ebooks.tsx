import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Book, Download, Star, Award, BookOpen, Clock, Heart, Zap, Globe, Package, Loader2, ShieldCheck, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import { downloadFile } from '../lib/download';

interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  descriptionSw: string;
  chapters: string[];
  price: number;
  rating: number;
  image: string;
  color: string;
  pageCount: number;
  isBestseller?: boolean;
  isSpecial?: boolean;
  isPremium?: boolean;
}

const ebooksList: Ebook[] = [
  {
    id: 'heart-silent-language',
    title: "The Heart's Silent Language",
    author: "Dr. Jovin George Mabunga",
    description: "A definitive guide to advanced cardiology, anatomical mysteries, and clinical heart care. Explore the electric rhythm of life and how to protect it.",
    descriptionSw: "Mwongozo kamili wa kadiolojia ya kisasa, mafumbo ya anatomia, na huduma ya moyo ya kliniki. Chunguza mapigo ya umeme ya maisha na jinsi ya kulinda moyo wako.",
    chapters: ["Electrophysiology", "Ischemic Heart Disease", "Valvular Disorders", "Clinical Heart Failure", "Advanced Diagnostics", "Cardiac Surgery Post-Op", "Global Health Policy"],
    price: 45,
    rating: 4.9,
    image: "https://picsum.photos/seed/heartbook/600/800",
    color: "from-rose-500 to-red-700",
    pageCount: 524,
    isBestseller: true
  },
  {
    id: 'internal-alchemy',
    title: "Internal Alchemy: Body Systems",
    author: "Dr. Jovin George Mabunga",
    description: "Deep dive into the human machine. Understanding the synergy between the endocrine, digestive, and respiratory systems for total physiological balance.",
    descriptionSw: "Uchunguzi wa kina wa mashine ya binadamu. Kuelewa ushirikiano kati ya mifumo ya homoni, mmeng'enyo wa chakula, na upumuaji kwa usawa wa mwili.",
    chapters: ["The Hormonal Symphony", "Digestive Biomechanics", "Renal filtration", "Immune Resilience", "Systemic Homeostasis", "Neurobiology", "Respiratory Physics"],
    price: 39,
    rating: 4.8,
    image: "https://picsum.photos/seed/systembook/600/800",
    color: "from-emerald-500 to-teal-700",
    pageCount: 510
  },
  {
    id: 'herbal-nexus',
    title: "The Herbal Nexus",
    author: "Dr. Jovin George Mabunga",
    description: "Pharmacology of the earth. Scientific validation of traditional herbal medicines and their role in modern clinical practice.",
    descriptionSw: "Famokolojia ya dunia. Uidhinishaji wa kisayansi wa dawa za asili za mitishamba na jukumu lake katika mazoezi ya kliniki ya kisasa.",
    chapters: ["Phytochemical Foundations", "African Medicinal Treasures", "Herbal Cardiac Support", "Neurological Calm", "Sustainable Healing", "Plant Biochemistry", "Traditional Synthesis"],
    price: 35,
    rating: 5.0,
    image: "https://picsum.photos/seed/herbalbook/600/800",
    color: "from-amber-500 to-orange-700",
    pageCount: 505
  },
  {
    id: 'sexual-vitality',
    title: "Sexual Vitality & Education",
    author: "Dr. Jovin George Mabunga",
    description: "Bonus Program: Comprehensive educational guide to reproductive health, hormonal balance, and psychological wellness in intimacy.",
    descriptionSw: "Programu ya Ziada: Mwongozo kamili wa elimu ya afya ya uzazi, usawa wa homoni, na afya ya kisaikolojia katika uhusiano wa karibu.",
    chapters: ["Reproductive Anatomy", "Hormonal Optimization", "Psychology of Intimacy", "Preventive Sexual Health", "Modern Relationship Dynamics", "Endocrine Balance", "Vitality Protocols"],
    price: 29,
    rating: 4.7,
    image: "https://picsum.photos/seed/sexualhealth/600/800",
    color: "from-purple-500 to-indigo-700",
    pageCount: 502,
    isSpecial: true
  },
  {
    id: 'viral-marketing',
    title: "Viral Health Marketing",
    author: "Dr. Jovin George Mabunga",
    description: "Master the digital health landscape. Strategies to make medical information go viral while maintaining professional integrity.",
    descriptionSw: "Mbinu za masoko ya afya kidijitali. Mikakati ya kufanya habari za matibabu kuenea kwa kasi huku ukidumisha uadilifu wa kitaaluma.",
    chapters: ["Psychology of Viral Content", "Digital Health Branding", "Algorithm Optimization", "Building Global Authority", "Ethics in Influence", "Content Architecture", "Global Scaling"],
    price: 49,
    rating: 4.9,
    image: "https://picsum.photos/seed/marketingbook/600/800",
    color: "from-blue-500 to-cyan-700",
    pageCount: 515
  },
  {
    id: 'presidential-protocol',
    title: "The Presidential Health Protocol",
    author: "Dr. Jovin George Mabunga",
    description: "The elite roadmap to human longevity and high-capacity wellness. Originally designed for leadership under extreme stress, this protocol covers biological age reversal.",
    descriptionSw: "Ramani ya wasomi kwa ajili ya kuishi muda mrefu na ustawi wa hali ya juu. Iliyoundwa awali kwa viongozi chini ya msongo wa hali ya juu.",
    chapters: ["Stress Management", "Biological Age Reversal", "Elite Nutritional Biochemistry", "Sleep Optimization", "Longevity Mindset", "Cognitive Preservation", "Bio-Hacking"],
    price: 99,
    rating: 5.0,
    image: "https://picsum.photos/seed/presidential/600/800",
    color: "from-slate-700 to-slate-900",
    pageCount: 640,
    isPremium: true
  }
];

const bookContents: Record<string, string> = {
  'heart-silent-language': `
[FRONT MATTER - PAGE 1-15]
THE HEART'S SILENT LANGUAGE
Master Clinical Volume: 524 Pages
By Dr. Jovin George Mabunga
Nexus Clinical Intelligence Series

[INDEX & PREFACE - PAGE 16-45]
This volume represents the definitive clinical guide to human cardiology. 
Over 500 pages of high-resolution anatomical data and electrophysiological research.

[MODULE 1: ELECTROPHYSIOLOGY - PAGE 46-120]
The heart operates on a precise electrical grid. The SA node acts as the natural pacemaker, generating 60-100 impulses per minute. In this volume, we explore how nodal delays and ectopic foci lead to arrhythmias.

[MODULE 2: ISCHEMIC PATHOLOGIES - PAGE 121-250]
Understanding atherosclerosis. How plaque buildup restricts coronary flow and the biomechanics of a myocardial infarction.

[MODULE 3-7: ADVANCED CLINICS - PAGE 251-524]
Comprehensive surgical pathways, valvular biomechanics, and global heart health policy.
  `,
  'internal-alchemy': `
[FRONT MATTER - PAGE 1-10]
INTERNAL ALCHEMY: THE HUMAN MACHINE
Master Clinical Volume: 510 Pages
By Dr. Jovin George Mabunga

[INDEX & PREFACE - PAGE 11-40]
Deep dive into the synergy of body systems. 

[MODULE 1: THE ENDOCRINE SYMPHONY - PAGE 41-150]
Cortisol vs. Melatonin: The circadian balance. How modern blue light exposure disrupts the adrenal cortex and insulin sensitivity.

[MODULE 2: RENAL BIOMECHANICS - PAGE 151-300]
The kidney is not just a filter; it's a blood pressure regulator.

[MODULE 3-7: SYSTEMIC SYNERGY - PAGE 301-510]
Neurobiology, Respiratory Physics, and Immune Resilience protocols.
  `,
  'herbal-nexus': `
[FRONT MATTER - PAGE 1-12]
THE HERBAL NEXUS: PHARMACOLOGY OF THE EARTH
Master Clinical Volume: 505 Pages
Scientific validations by Dr. Jovin George Mabunga

[PHARMACOLOGICAL FOUNDATIONS - PAGE 13-100]
Plants produce alkaloids, flavonoids, and terpenes for defense. These same compounds act as antioxidants in the human cytoplasm.

[AFRICAN MEDICINAL TREASURES - PAGE 101-250]
Exploring 'Mwarobaini' (Neem) and its efficacy against malaria. Scientific breakdown of 'Mlonge' (Moringa).

[ADVANCED PHYTO-THERAPY - PAGE 251-505]
The chemistry of healing across diverse biomes.
  `,
  'sexual-vitality': `
[FRONT MATTER - PAGE 1-15]
SEXUAL VITALITY & EDUCATION
Special Bonus Program: 502 Pages
By Dr. Jovin George Mabunga

[REPRODUCTIVE BIOMECHANICS - PAGE 16-120]
Hormonal optimization and reproductive anatomy.

[PSYCHOLOGY OF INTIMACY - PAGE 121-300]
Stress response, Cortisol impact, and psychological wellness.

[PREVENTIVE PROTOCOLS - PAGE 301-502]
Modern STI diagnostics and hormonal balance preservation.
  `,
  'viral-marketing': `
[FRONT MATTER - PAGE 1-10]
VIRAL HEALTH MARKETING
Master Volume: 515 Pages
By Dr. Jovin George Mabunga

[CONTENT ARCHITECTURE - PAGE 11-150]
The Attention Economy. How to build medical authority in the digital age.

[ALGORITHM OPTIMIZATION - PAGE 151-350]
SEO for healthcare and global scaling strategies.

[ETHICAL VIRALITY - PAGE 351-515]
Maintaining clinical integrity while mastering social dynamics.
  `,
  'presidential-protocol': `
[FRONT MATTER - PAGE 1-25]
THE PRESIDENTIAL HEALTH PROTOCOL: ELITE LONGEVITY
Elite Master Volume: 640 Pages
By Dr. Jovin George Mabunga

[STRESS MANAGEMENT FOR LEADERS - PAGE 26-150]
The HPA axis under pressure. Strategies for high-stakes decision makers to avoid burnout.

[BIOLOGICAL AGE REVERSAL - PAGE 151-400]
The science of Telomeres. Fasting and hyperbaric oxygen protocols.

[ELITE BIO-HACKING - PAGE 401-640]
Nutritional Biochemistry and Cognitive Preservation techniques.

[NEXUS CERTIFICATION]
This 640-page master volume is part of the Nexus Elite Clinical Series.
Verified for High-Capacity Wellness Architecture.
  `
};

export default function Ebooks() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [purchasedBooks, setPurchasedBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookPreview, setSelectedBookPreview] = useState<Ebook | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          where('status', '==', 'verified')
        );
        const snapshot = await getDocs(q);
        const titles = snapshot.docs.map(doc => doc.data().productName);
        setPurchasedBooks(titles);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleAction = (book: Ebook) => {
    if (purchasedBooks.includes(book.title)) {
      // Logic for downloading with expanded content
      const content = bookContents[book.id] || `Nexus E-Book: ${book.title}\n\nJ-Nexus Clinical Content Package\n\nClinical guidelines and educational material provided by Dr. Jovin George Mabunga.`;
      downloadFile(`${book.title.replace(/\s+/g, '_')}_Nexus`, content);
    } else {
      navigate('/checkout', { state: { product: { name: book.title, price: book.price } } });
    }
  };

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Logo className="absolute -top-20 -left-20 w-[400px] h-[400px]" />
          <Logo className="absolute -bottom-20 -right-20 w-[400px] h-[400px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            {language === 'en' ? 'Official Clinical Education Series' : 'Mfululizo Rasmi wa Elimu ya Kliniki'}
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic">
            {language === 'en' ? 'E-Books by' : 'Vitabu vya'} <span className="text-secondary italic">Jovin</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-bold italic">
            {language === 'en' 
              ? 'Unlocking medical mysteries and advancing global health literacy through deep research and clinical experience.' 
              : 'Kufumbua mafumbo ya matibabu na kuendeleza uelewa wa afya duniani kupitia utafiti wa kina na uzoefu wa kliniki.'}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-[4rem] p-16 shadow-3xl border border-slate-50 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Book className="w-64 h-64" />
          </div>
          <div className="max-w-4xl relative z-10">
            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-6">Author's Preface</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase mb-8 tracking-tighter italic leading-none">"A Legacy of Healing"</h3>
            <p className="text-slate-600 font-bold leading-relaxed mb-6 text-lg italic">
              {language === 'en' 
                ? 'Every word in these volumes has been meticulously written by Dr. Jovin George Mabunga. These are not merely digital files; they are a lifetime of clinical observation, heart care research, and a deep commitment to human vitality.' 
                : 'Kila neno katika vitabu hivi limeandikwa kwa uangalifu na Dr. Jovin George Mabunga. Haya si mafaili ya kidijitali tu; ni maisha ya uchunguzi wa kliniki, utafiti wa huduma ya moyo, na kujitolea kwa kina kwa nguvu ya binadamu.'}
            </p>
            <p className="text-slate-400 font-medium leading-relaxed italic">
              10% of all proceeds are dedicated to the J-Nexus Foundations for heart disease research in Tanzania.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ebooksList.map((book, i) => {
            const isPurchased = purchasedBooks.includes(book.title);
            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[3.5rem] border border-slate-50 overflow-hidden shadow-3xl shadow-slate-200/50 hover:shadow-secondary/10 hover:border-secondary/20 transition-all duration-500 relative"
              >
                <div className={`h-2 bg-gradient-to-r ${book.color}`} />
                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-44 h-60 bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500 relative ring-4 ring-white">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {book.isBestseller && (
                        <div className="absolute top-4 left-4 bg-amber-400 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Bestseller</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-slate-900 tracking-tighter italic">
                        {isPurchased ? (
                           <span className="text-emerald-500 flex items-center gap-1 text-sm">
                             <ShieldCheck className="w-4 h-4" /> Own it
                           </span>
                        ) : `$${book.price}`}
                      </div>
                      <div className="flex items-center justify-end text-amber-500 mt-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        <span className="text-xs font-black">{book.rating}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-none uppercase italic group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2 font-bold italic">"{language === 'en' ? book.description : book.descriptionSw}"</p>

                  <div className="flex gap-4 mb-8">
                     <button 
                       onClick={() => setSelectedBookPreview(book)}
                       className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                     >
                        <BookOpen className="w-3 h-3" />
                        {language === 'en' ? 'Read Sample' : 'Soma Sehemu'}
                     </button>
                     <div className="text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1.5 border-l border-slate-100 pl-4">
                        <Layers className="w-3 h-3 text-secondary" />
                        {book.pageCount} Pages
                     </div>
                  </div>

                  <div className="space-y-3 mb-10">
                    {book.chapters.slice(0, 3).map((chapter, idx) => (
                      <div key={idx} className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3" />
                        {chapter}
                      </div>
                    ))}
                    {book.chapters.length > 3 && (
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-4">+{book.chapters.length - 3} More Modules</div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleAction(book)}
                    disabled={loading}
                    className={`w-full flex items-center justify-center space-x-3 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl ${
                      isPurchased 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 scale-[1.02]' 
                      : 'bg-slate-900 text-white hover:bg-primary'
                    }`}
                  >
                    {loading ? (
                       <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isPurchased ? (
                       <>
                         <Download className="w-4 h-4" />
                         <span>{language === 'en' ? 'Download Assets' : 'Pakua Sasa'}</span>
                       </>
                    ) : (
                       <>
                         <Package className="w-4 h-4" />
                         <span>{language === 'en' ? 'Secure Access' : 'Pata Sasa'}</span>
                       </>
                    )}
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 opacity-30 grayscale group-hover:grayscale-0 transition-all">
                      <Logo className="w-6 h-6" />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Nexus Certified</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-slate-900 rounded-[5rem] p-20 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Logo className="w-[500px] h-[500px]" />
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-10 text-secondary opacity-80" />
            <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase tracking-tight italic leading-tight">
              {language === 'en' 
                ? '"Education is the most powerful medicine our heart can receive."' 
                : '"Elimu ni dawa yenye nguvu zaidi ambayo moyo wetu unaweza kupokea."'}
            </h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mb-10 rounded-full" />
            <p className="text-2xl font-black italic tracking-tighter">DR. JOVIN GEORGE MABUNGA</p>
            <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-500 mt-2">Nexus Medical Director</p>
          </motion.div>
        </div>
      </section>
      {/* Preview Modal */}
      {selectedBookPreview && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white w-full max-w-3xl rounded-[3.5rem] overflow-hidden shadow-4xl relative"
            >
               <button 
                 onClick={() => setSelectedBookPreview(null)}
                 className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors z-20"
               >
                 <Zap className="w-5 h-5 rotate-45" />
               </button>

               <div className="flex flex-col md:flex-row h-[70vh]">
                  <div className={`w-full md:w-1/3 bg-gradient-to-br ${selectedBookPreview.color} p-12 flex flex-col justify-end`}>
                     <img src={selectedBookPreview.image} alt="" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl mb-6 shadow-black/20" referrerPolicy="no-referrer" />
                     <h4 className="text-white font-black uppercase text-lg leading-tight tracking-tighter italic">{selectedBookPreview.title}</h4>
                  </div>
                  <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-slate-50">
                     <div className="flex items-center gap-2 mb-6">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Exclusive Nexus Insights</span>
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Chapter Preview</h3>
                     <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 font-bold leading-relaxed mb-6 italic whitespace-pre-wrap">
                           {bookContents[selectedBookPreview.id] || "Content being synchronized with Nexus cloud databases..."}
                        </p>
                     </div>
                     {!purchasedBooks.includes(selectedBookPreview.title) && (
                        <div className="mt-12 p-8 bg-white rounded-[2rem] border border-slate-100 text-center shadow-xl">
                           <p className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Unlock the full Clinical Guide</p>
                           <button 
                             onClick={() => {
                               setSelectedBookPreview(null);
                               navigate('/checkout', { state: { product: { name: selectedBookPreview.title, price: selectedBookPreview.price } } });
                             }}
                             className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition-all shadow-lg"
                           >
                             Purchase for ${selectedBookPreview.price}
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         </div>
      )}
    </div>
  );
}
