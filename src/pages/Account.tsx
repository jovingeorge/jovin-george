import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { LogOut, User as UserIcon, Calendar, Heart, Shield, Settings, Activity, Receipt, CreditCard, HeartPulse, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadFile } from '../lib/download';

const bookContents: Record<string, string> = {
  "The Heart's Silent Language": `
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
  "Internal Alchemy: Body Systems": `
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
  "The Herbal Nexus": `
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
  "Sexual Vitality & Education": `
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
  "Viral Health Marketing": `
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
  "The Presidential Health Protocol": `
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
  `
};

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }

        try {
          const q = query(
            collection(db, 'orders'),
            where('userId', '==', u.uid)
          );
          const orderSnap = await getDocs(q);
          const fetchedOrders = orderSnap.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            date: doc.data().timestamp?.seconds 
              ? new Date(doc.data().timestamp.seconds * 1000).toLocaleDateString()
              : 'Recent'
          }));
          setOrders(fetchedOrders);

          // Fetch bookings
          const bQuery = query(
            collection(db, 'bookings'),
            where('userId', '==', u.uid)
          );
          const bSnap = await getDocs(bQuery);
          setBookings(bSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          console.error("Error fetching transactions:", err);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
    </div>
  );

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
       {/* ... existing Profile Header ... */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-2xl flex flex-col md:flex-row items-center gap-10 mb-12 relative overflow-hidden"
       >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <UserIcon className="w-40 h-40" />
          </div>
          <div className="w-32 h-32 bg-slate-900 rounded-[2rem] flex items-center justify-center overflow-hidden border-4 border-white shadow-xl relative z-10">
             {user?.photoURL ? (
               <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             ) : (
               <UserIcon className="w-16 h-16 text-white" />
             )}
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
             <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{profile?.name || user?.displayName || 'Elite Member'}</h1>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">{user?.email}</p>
             <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-5 py-2 bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                  Joined {profile?.createdAt?.seconds ? new Date(profile.createdAt.seconds * 1000).getFullYear() : '2024'}
                </span>
                <span className="px-5 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200">
                  {profile?.role || 'Patient'} Nexus Account
                </span>
             </div>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center space-x-3 px-10 py-5 bg-slate-50 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-200 shadow-lg"
          >
             <LogOut className="w-5 h-5" />
             <span>Secure Logout</span>
          </button>
       </motion.div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ... existing Dashboard Nav ... */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl">
                <nav className="space-y-3">
                   {[
                     { icon: Activity, label: "Overview" },
                     { icon: Receipt, label: "Receipts" },
                     { icon: Calendar, label: "Bookings" },
                     { icon: Heart, label: "Saved Topics" },
                   ].map((item) => (
                     <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex items-center px-6 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] transition-all ${
                          activeTab === item.label 
                          ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1' 
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                     >
                        <item.icon className="w-4 h-4 mr-4" />
                        {item.label}
                     </button>
                   ))}
                </nav>
             </div>
          </div>

          <div className="lg:col-span-9 space-y-8">
             {activeTab === 'Overview' && (
               <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center">
                        <Receipt className="w-6 h-6 mr-4 text-emerald-500" />
                        Recent Transactions
                     </h3>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#0070ba]">PayPal Verified</span>
                  </div>
                  <div className="space-y-4">
                     {orders.length > 0 ? orders.map((rec) => (
                        <div key={rec.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-colors shadow-sm">
                                 <ShieldCheck className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{rec.productName}</p>
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{rec.date}</span>
                              </div>
                           </div>
                           <button 
                             onClick={() => downloadFile(rec.productName, bookContents[rec.productName])}
                             className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                           >
                              <Download className="w-3.5 h-3.5" />
                              Download
                           </button>
                        </div>
                     )) : (
                        <div className="text-center py-10 text-slate-400 italic font-medium">No transactions found.</div>
                     )}
                  </div>
               </div>
             )}

             {activeTab === 'Receipts' && (
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8">All Transactions</h3>
                   <div className="space-y-4">
                     {orders.length > 0 ? orders.map((rec) => (
                        <div key={rec.id} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100">
                           <div className="flex items-center gap-6">
                              <ShieldCheck className="w-8 h-8 text-emerald-500" />
                              <div>
                                 <p className="font-black text-slate-900 uppercase">{rec.productName}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase">{rec.id} | {rec.date}</p>
                              </div>
                           </div>
                           <button onClick={() => downloadFile(rec.productName, bookContents[rec.productName])} className="btn-theme-primary !py-2 !px-6 !text-[10px]">Download Assets</button>
                        </div>
                     )) : (
                       <div className="text-center py-20 text-slate-300 italic">No receipts available yet.</div>
                     )}
                   </div>
                </div>
             )}

             {activeTab === 'Bookings' && (
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8">Medical Bookings</h3>
                   <div className="space-y-4">
                     {bookings.length > 0 ? bookings.map((b) => (
                        <div key={b.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-blue-200 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                 <Calendar className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{b.tier} Consultation</p>
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{b.date} at {b.time}</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                                b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-50 text-amber-600'
                              }`}>
                                {b.status}
                              </span>
                           </div>
                        </div>
                     )) : (
                       <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                          <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-bold italic tracking-tight">No active clinical bookings found.</p>
                          <button 
                            onClick={() => navigate('/consultation')}
                            className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all shadow-lg"
                          >
                            Schedule Now
                          </button>
                       </div>
                     )}
                   </div>
                </div>
             )}

             {activeTab !== 'Overview' && activeTab !== 'Receipts' && activeTab !== 'Bookings' && (
               <div className="bg-white rounded-[3.5rem] p-24 text-center border border-slate-100 shadow-2xl">
                 <Shield className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Module Initializing</h3>
                 <p className="text-slate-400 font-medium">Synchronizing with Nexus clinical global database...</p>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}
