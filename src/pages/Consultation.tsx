import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import Logo from '../components/Logo';

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Request Received</h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed italic">
            Your request for a professional session with Dr. Jovin George Mabunga has been logged. Our clinical coordination team will contact you via WhatsApp shortly.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl"
          >
            Return to Nexus
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Logo className="w-80 h-80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 border border-primary/20">
             Elite Medical Consultation
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Direct Expert <br />
            <span className="text-secondary italic">Access</span>
          </h1>
          <p className="mt-8 text-xl text-slate-400 font-bold leading-relaxed max-w-2xl italic">
            Book a 1-on-1 clinical session with Dr. Jovin George Mabunga. Personalized heart care, internal physiology assessments, and global treatment roadmaps.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
           <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5">
                 <ShieldCheck className="w-48 h-48" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Professional <br /> Session Tiers</h3>
              <div className="space-y-6">
                 {[
                   { label: "Quick Assessment", time: "20 Mins", price: "$49", desc: "Digital clinical check-up and protocol review." },
                   { label: "Full Cardiology Suite", time: "60 Mins", price: "$149", desc: "Comprehensive deep-dive and personalized treatment roadmap." },
                   { label: "Presidential Wellness", time: "Ongoing", price: "Custom", desc: "Elite longevity management for high-capacity individuals." }
                 ].map((tier, i) => (
                   <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary transition-all cursor-pointer">
                      <div>
                         <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{tier.label}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tier.time} • {tier.desc}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-primary">{tier.price}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-slate-900">
                    <MessageCircle className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-black uppercase tracking-tighter">Fast WhatsApp Booking</h4>
              </div>
              <p className="text-slate-400 font-bold leading-relaxed mb-10 italic">
                Prefer an instant connection? Direct-message our coordination team on WhatsApp for immediate specialist scheduling.
              </p>
              <a href="https://wa.me/your-number" className="w-full py-5 bg-secondary text-slate-900 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                 Launch WhatsApp Nexus
              </a>
           </div>
        </div>

        <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100">
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-10 italic">Request Your Session</h3>
           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                       <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all" placeholder="Enter name" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone (WhatsApp)</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                       <input required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all" placeholder="+255..." />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all" placeholder="your@email.com" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Preferred Date</label>
                    <div className="relative">
                       <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                       <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Time Zone</label>
                    <div className="relative">
                       <Clock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                       <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 font-bold text-slate-900 outline-none focus:border-primary appearance-none transition-all">
                          <option>Tanzania (EAT)</option>
                          <option>UK (GMT)</option>
                          <option>USA (EDT)</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Brief Medical History / Goal</label>
                 <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all" placeholder="Tell Dr. Jovin about your health goals..." />
              </div>

              <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl hover:bg-primary transition-all">
                 Request Clinical Session
              </button>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                 Secure clinical transmission • HIPPA Compliant protocols
              </p>
           </form>
        </div>
      </section>
    </div>
  );
}
