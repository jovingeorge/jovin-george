import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { LogOut, User as UserIcon, Calendar, Heart, Shield, Settings, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
    <div className="flex items-center justify-center min-h-screen">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
       {/* Profile Header */}
       <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-xl shadow-slate-100 flex flex-col md:flex-row items-center gap-10 mb-12">
          <div className="w-32 h-32 bg-blue-100 rounded-[2rem] flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
             {user?.photoURL ? (
               <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             ) : (
               <UserIcon className="w-16 h-16 text-blue-600" />
             )}
          </div>
          <div className="flex-1 text-center md:text-left">
             <h1 className="text-3xl font-extrabold text-slate-900">{profile?.name || user?.displayName || 'User'}</h1>
             <p className="text-slate-500 font-medium">{user?.email}</p>
             <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Member Since {new Date(profile?.createdAt?.seconds * 1000).getFullYear() || '2024'}</span>
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full">{profile?.role} account</span>
             </div>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center space-x-2 px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100"
          >
             <LogOut className="w-5 h-5" />
             <span>Sign Out</span>
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Dashboard Nav */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-lg shadow-slate-100">
                <h3 className="text-slate-900 font-extrabold mb-6 px-4">Dashboard</h3>
                <nav className="space-y-2">
                   {[
                     { icon: Activity, label: "Overview", active: true },
                     { icon: Calendar, label: "Bookings", active: false },
                     { icon: Heart, label: "Saved Topics", active: false },
                     { icon: Shield, label: "Medical Data", active: false },
                     { icon: Settings, label: "Account Settings", active: false },
                   ].map((item, idx) => (
                     <button
                        key={idx}
                        className={`w-full flex items-center px-6 py-4 rounded-2xl font-bold transition-all ${
                          item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                     >
                        <item.icon className="w-5 h-5 mr-4" />
                        {item.label}
                     </button>
                   ))}
                </nav>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-lg shadow-slate-100">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Upcoming consultations</h4>
                   <div className="flex flex-col items-center justify-center h-full py-8 text-center opacity-30">
                      <Calendar className="w-12 h-12 mb-4" />
                      <p className="font-bold text-slate-900">No active bookings</p>
                   </div>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-lg shadow-slate-100">
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Saved health guides</h4>
                   <div className="flex flex-col items-center justify-center h-full py-8 text-center opacity-30">
                      <Heart className="w-12 h-12 mb-4 text-rose-500" />
                      <p className="font-bold text-slate-900">No saved topics yet</p>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                <div className="relative z-10 w-full md:w-2/3">
                   <h3 className="text-3xl font-extrabold leading-tight tracking-tight">Expand Your Knowledge with Digital Shop</h3>
                   <p className="mt-4 text-slate-400 font-medium">Get immediate access to premium heart health eBooks and natural healing guides designed by Jovin George.</p>
                   <button onClick={() => navigate('/shop')} className="mt-8 px-8 py-4 bg-blue-600 rounded-full font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center">
                      Browse Digital Products
                   </button>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                   <Heart className="w-64 h-64 text-blue-500" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
