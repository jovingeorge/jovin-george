import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { LogOut, User as UserIcon, Calendar, Heart, Shield, Settings, Activity, Receipt, CreditCard, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

const mockReceipts = [
  { id: 'REC-001', date: '2024-03-15', product: "The Heart's Silent Language", price: 45, status: 'Paid' },
  { id: 'REC-002', date: '2024-02-28', product: "Internal Alchemy: Body Systems", price: 39, status: 'Paid' },
  { id: 'REC-003', date: '2024-04-10', product: "The Presidential Health Protocol", price: 99, status: 'Paid' },
];

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
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
       {/* Profile Header */}
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
                  Joined {new Date(profile?.createdAt?.seconds * 1000).getFullYear() || '2024'}
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
          {/* Dashboard Nav */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 px-4">Nexus Navigation</h3>
                <nav className="space-y-3">
                   {[
                     { icon: Activity, label: "Overview" },
                     { icon: Receipt, label: "Receipts" },
                     { icon: Calendar, label: "Bookings" },
                     { icon: Heart, label: "Saved Topics" },
                     { icon: Shield, label: "Medical Data" },
                     { icon: Settings, label: "Settings" },
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

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
             {activeTab === 'Overview' && (
               <>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl text-center flex flex-col items-center">
                       <Calendar className="w-12 h-12 mb-6 text-primary" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Next Consultation</h4>
                       <p className="font-black text-slate-900 uppercase italic">No Pending Sessions</p>
                       <button onClick={() => navigate('/consultation')} className="mt-8 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Book Dr. Jovin →</button>
                    </div>
                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl text-center flex flex-col items-center">
                       <Heart className="w-12 h-12 mb-6 text-rose-500" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Saved Topics</h4>
                       <p className="font-black text-slate-900 uppercase italic">Research Empty</p>
                       <button onClick={() => navigate('/diseases')} className="mt-8 text-[10px] font-black text-secondary uppercase tracking-widest hover:underline">Explore Database →</button>
                    </div>
                 </div>

                 <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center">
                          <Receipt className="w-6 h-6 mr-4 text-emerald-500" />
                          Recent Transactions
                       </h3>
                       <div className="flex items-center gap-2 text-slate-400">
                         <CreditCard className="w-4 h-4" />
                         <span className="text-[10px] font-bold uppercase tracking-widest italic">Nexus Secured Card</span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       {mockReceipts.map((rec) => (
                          <div key={rec.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 transition-all">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-colors shadow-sm">
                                   <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{rec.product}</p>
                                   <div className="flex items-center gap-3">
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{rec.date}</span>
                                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{rec.id}</span>
                                   </div>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-lg font-black text-slate-900 mb-2">${rec.price}.00</p>
                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-200">
                                  Verified Payment
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[3.5rem] p-16 text-white relative overflow-hidden shadow-3xl">
                    <div className="relative z-10 w-full md:w-2/3">
                       <h3 className="text-4xl font-black leading-none tracking-tighter uppercase mb-6">Nexus Digital <span className="text-secondary">Marketplace</span></h3>
                       <p className="text-slate-400 font-bold leading-relaxed mb-10 italic">Secure elite knowledge directly from Dr. Jovin. Every purchase facilitates further clinical heart care research.</p>
                       <button 
                         onClick={() => navigate('/shop')} 
                         className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-secondary transition-all"
                       >
                          Access Vault
                       </button>
                    </div>
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                       <HeartPulse className="w-80 h-80 text-secondary" />
                    </div>
                 </div>
               </>
             )}

             {activeTab !== 'Overview' && (
               <div className="bg-white rounded-[3.5rem] p-24 text-center border border-slate-100 shadow-2xl">
                 <Shield className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Nexus Module Locked</h3>
                 <p className="text-slate-400 font-medium">This section is currently being updated for clinical consistency.</p>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}
