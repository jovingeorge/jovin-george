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
  "The Heart's Silent Language": "THE HEART'S SILENT LANGUAGE\n\nMODULE 1: ELECTROPHYSIOLOGY\n\nPREVENTIVE PROTOCOL\n\nFull edition by Dr. Jovin George Mabunga.",
  "Internal Alchemy: Body Systems": "INTERNAL ALCHEMY\n\nMODULE 1: THE ENDOCRINE SYMPHONY\n\nFull edition by Dr. Jovin George Mabunga.",
  "The Herbal Nexus": "THE HERBAL NEXUS\n\nCHAPTER 1: PHYTOCHEMICAL FOUNDATIONS\n\nFull edition by Dr. Jovin George Mabunga.",
  "Sexual Vitality & Education": "SEXUAL VITALITY\n\nCHAPTER 1: HORMONAL OPTIMIZATION\n\nFull edition by Dr. Jovin George Mabunga.",
  "Viral Health Marketing": "VIRAL HEALTH MARKETING\n\nCHAPTER 1: THE ATTENTION ECONOMY\n\nFull edition by Dr. Jovin George Mabunga.",
  "The Presidential Health Protocol": "THE PRESIDENTIAL HEALTH PROTOCOL\n\nCHAPTER 1: ELITE LONGEVITY\n\nFull edition by Dr. Jovin George Mabunga."
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
