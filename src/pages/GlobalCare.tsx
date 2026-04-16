import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Globe, Star, ShieldCheck, Heart, Stethoscope, Building2, Search, Filter } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

const hospitals = [
  {
    name: "Jakaya Kikwete Cardiac Institute (JKCI)",
    location: "Dar es Salaam, Tanzania",
    specialty: "Advanced Cardiology & Cardiothoracic Surgery",
    description: "The premier cardiac center in East Africa, offering specialized treatment for all cardiovascular conditions.",
    rating: 4.9,
    phone: "+255 22 215 0000",
    isTanzania: true,
    website: "https://www.jkci.or.tz"
  },
  {
    name: "Muhimbili National Hospital",
    location: "Dar es Salaam, Tanzania",
    specialty: "General Internal Medicine & Surgery",
    description: "Tanzania's leading referral hospital providing comprehensive medical services with top-tier professional staff.",
    rating: 4.7,
    phone: "+255 22 215 1367",
    isTanzania: true,
    website: "https://www.mnh.or.tz"
  },
  {
    name: "Mayo Clinic",
    location: "Rochester, USA",
    specialty: "Comprehensive Cardiology",
    description: "Ranked #1 hospital in the world for cardiovascular care and medical research.",
    rating: 5.0,
    phone: "+1 507-284-2511",
    isTanzania: false,
    website: "https://www.mayoclinic.org"
  },
  {
    name: "Cleveland Clinic",
    location: "Cleveland, USA",
    specialty: "Heart & Vascular Center",
    description: "Consistently ranked as the best hospital for cardiovascular care in the United States.",
    rating: 5.0,
    phone: "+1 216-444-2200",
    isTanzania: false,
    website: "https://my.clevelandclinic.org"
  },
  {
    name: "Apollo Hospitals",
    location: "Chennai, India",
    specialty: "Multi-organ Transplants & Cardiac Care",
    description: "One of Asia's largest healthcare groups, highly referred from East Africa for advanced cardiac surgery.",
    rating: 4.8,
    phone: "+91 44 2829 3333",
    isTanzania: false,
    website: "https://www.apollohospitals.com"
  },
  {
    name: "Aga Khan Hospital",
    location: "Dar es Salaam, Tanzania",
    specialty: "Multi-Specialty Clinical Care",
    description: "A premier private facility in Tanzania known for its rigorous medical standards and international accreditation.",
    rating: 4.8,
    phone: "+255 22 211 5151",
    isTanzania: true,
    website: "https://www.agakhanhospitals.org/dar"
  },
  {
    name: "Stanford Health Care",
    location: "Stanford, USA",
    specialty: "Advanced Heart Failure & Transplant",
    description: "A leader in pioneering heart transplant techniques and robotic-assisted surgeries.",
    rating: 4.9,
    phone: "+1 650-723-4000",
    isTanzania: false,
    website: "https://stanfordhealthcare.org"
  },
  {
    name: "Bugando Medical Centre",
    location: "Mwanza, Tanzania",
    specialty: "Zonal Referral Hospital",
    description: "Providing elite healthcare services to the Lake Zone of Tanzania with advanced surgical capabilities.",
    rating: 4.5,
    phone: "+255 28 250 0513",
    isTanzania: true,
    website: "https://www.bmc.or.tz"
  },
  {
    name: "Singapore General Hospital",
    location: "Singapore",
    specialty: "Vascular & Cardiology Excellence",
    description: "The largest and oldest hospital in Singapore, ranked among the top global healthcare providers.",
    rating: 4.9,
    phone: "+65 6222 3322",
    isTanzania: false,
    website: "https://www.sgh.com.sg"
  }
];

export default function GlobalCare() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Tanzania' | 'Global'>('All');

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         h.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || 
                         (filter === 'Tanzania' && h.isTanzania) || 
                         (filter === 'Global' && !h.isTanzania);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-full opacity-5 pointer-events-none">
          <Logo className="absolute top-0 left-0 w-80 h-80 grayscale" />
          <Logo className="absolute bottom-0 right-0 w-80 h-80 grayscale" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 italic"
          >
            {language === 'en' ? 'Global Care' : 'Huduma ya Dunia'} <span className="text-secondary opacity-80">Network</span>
          </motion.h1>
          <p className="text-xl text-slate-400 font-bold mb-12 max-w-2xl mx-auto leading-relaxed italic">
            Connecting Elite Hearts to Global Centers. 10,000+ Hospital mappings indexed for the J-Nexus community worldwide.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder={language === 'en' ? "Search hospitals by name or city..." : "Tafuta hospitali kwa jina au mji..."}
              className="w-full bg-slate-800 border-none rounded-[2rem] py-6 px-16 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary transition-all text-sm font-bold shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 mb-12 relative z-20">
         <div className="flex justify-center gap-4">
            {['All', 'Tanzania', 'Global'].map((f) => (
               <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all border shadow-2xl ${
                    filter === f 
                    ? 'bg-slate-900 text-white border-slate-900 scale-105' 
                    : 'bg-white text-slate-400 border-slate-50 hover:border-secondary'
                  }`}
               >
                  {f === 'Tanzania' ? (language === 'en' ? 'Tanzania' : 'Tanzania') : 
                   f === 'Global' ? (language === 'en' ? 'Global' : 'Duniani') :
                   (language === 'en' ? 'All Centers' : 'Zote')}
               </button>
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredHospitals.map((hosp, i) => (
            <motion.div
              key={hosp.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-50 rounded-[3.5rem] p-10 shadow-3xl shadow-slate-200 hover:shadow-primary/10 hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Logo className="w-32 h-32" />
              </div>
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`p-5 rounded-[2rem] ${hosp.isTanzania ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600 shadow-xl shadow-blue-500/10'}`}>
                  {hosp.isTanzania ? <Building2 className="w-8 h-8" /> : <Globe className="w-8 h-8" />}
                </div>
                <div className="flex items-center text-amber-500 font-extrabold bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                  <Star className="w-4 h-4 fill-current mr-2" />
                  <span className="text-sm">{hosp.rating}</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-none uppercase tracking-tighter group-hover:text-primary transition-colors italic">
                {hosp.name}
              </h3>
              <div className="flex items-center text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] italic">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {hosp.location}
              </div>

              <div className="mb-8">
                <span className="text-[9px] font-black bg-slate-900 text-white px-4 py-2 rounded-full uppercase tracking-[0.1em]">
                   Nexus Indexed: {hosp.specialty}
                </span>
              </div>

              <p className="text-sm text-slate-500 mb-10 leading-relaxed font-bold italic">
                "{hosp.description}"
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center text-xs font-black text-slate-900 uppercase tracking-widest bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Phone className="w-4 h-4 mr-4 text-emerald-500" />
                  {hosp.phone}
                </div>
                <button 
                  onClick={() => window.open(hosp.website, '_blank')}
                  className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-3"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'Direct Referral Portal' : 'Tovuti ya Rufaa'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredHospitals.length === 0 && (
          <div className="py-24 text-center">
             <Stethoscope className="w-20 h-20 text-slate-100 mx-auto mb-6" />
             <p className="text-lg font-black text-slate-300 uppercase tracking-widest italic">No clinical centers found for this region.</p>
          </div>
        )}
      </div>

      {/* Global Partnership Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <Logo className="w-96 h-96" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter italic">
              Join the <span className="text-secondary italic">Nexus Network</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-bold italic leading-relaxed">
              Are you an elite healthcare institution? Register your center to support patients in Tanzania and across 150+ countries.
            </p>
            <button className="px-12 py-6 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform">
               Apply for Clinical Partnership
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
