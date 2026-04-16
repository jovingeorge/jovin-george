import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Globe, Star, ShieldCheck, Heart, Stethoscope, Building2 } from 'lucide-react';
import Logo from '../components/Logo';

const hospitals = [
  {
    name: "Jakaya Kikwete Cardiac Institute (JKCI)",
    location: "Dar es Salaam, Tanzania",
    specialty: "Advanced Cardiology & Cardiothoracic Surgery",
    description: "The premier cardiac center in East Africa, offering specialized treatment for all cardiovascular conditions.",
    rating: 4.9,
    phone: "+255 22 215 0000",
    isTanzania: true
  },
  {
    name: "Muhimbili National Hospital",
    location: "Dar es Salaam, Tanzania",
    specialty: "General Internal Medicine & Surgery",
    description: "Tanzania's leading referral hospital providing comprehensive medical services with top-tier professional staff.",
    rating: 4.7,
    phone: "+255 22 215 1367",
    isTanzania: true
  },
  {
    name: "Mayo Clinic",
    location: "Rochester, USA",
    specialty: "Comprehensive Cardiology",
    description: "Ranked #1 hospital in the world for cardiovascular care and medical research.",
    rating: 5.0,
    phone: "+1 507-284-2511",
    isTanzania: false
  },
  {
    name: "Cleveland Clinic",
    location: "Cleveland, USA",
    specialty: "Heart & Vascular Center",
    description: "Consistently ranked as the best hospital for cardiovascular care in the United States.",
    rating: 5.0,
    phone: "+1 216-444-2200",
    isTanzania: false
  },
  {
    name: "Royal Brompton Hospital",
    location: "London, UK",
    specialty: "Heart and Lung Treatment",
    description: "Europe's leading specialist heart and lung center delivering excellent patient-centered care.",
    rating: 4.8,
    phone: "+44 20 7352 8121",
    isTanzania: false
  },
  {
    name: "The Mount Sinai Hospital",
    location: "New York, USA",
    specialty: "Clinical Cardiology",
    description: "A world-renowned leader in the diagnosis and treatment of complex cardiac conditions.",
    rating: 4.8,
    phone: "+1 212-241-6500",
    isTanzania: false
  },
  {
    name: "Aga Khan Hospital",
    location: "Dar es Salaam, Tanzania",
    specialty: "Multi-Specialty Clinical Care",
    description: "A premier private facility in Tanzania known for its rigorous medical standards and international accreditation.",
    rating: 4.8,
    phone: "+255 22 211 5151",
    isTanzania: true
  },
  {
    name: "Kilimanjaro Christian Medical Centre (KCMC)",
    location: "Moshi, Tanzania",
    specialty: "Referral & Teaching Hospital",
    description: "A vital referral center for Northern Tanzania, offering specialized internal medicine and pediatric cardiology services.",
    rating: 4.6,
    phone: "+255 27 275 4377",
    isTanzania: true
  },
  {
    name: "Johns Hopkins Hospital",
    location: "Baltimore, USA",
    specialty: "Medical Research & Cardiology",
    description: "The birthplace of many modern medical advancements, providing groundbreaking cardiovascular treatments.",
    rating: 5.0,
    phone: "+1 410-955-5000",
    isTanzania: false
  }
];

export default function GlobalCare() {
  return (
    <div className="bg-bg min-h-screen pb-24">
      <section className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Logo className="absolute top-0 left-0 w-64 h-64 grayscale" />
          <Logo className="absolute bottom-0 right-0 w-64 h-64 grayscale" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Global Care <span className="text-primary">Network</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium">
            J-Nexus Health connects you with the world's most professional hospitals for advanced treatment, with a special focus on Tanzanian excellence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hosp, i) => (
            <motion.div
              key={hosp.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${hosp.isTanzania ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {hosp.isTanzania ? <Building2 className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                </div>
                <div className="flex items-center text-amber-500 font-black">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{hosp.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase group-hover:text-primary transition-colors">
                {hosp.name}
              </h3>
              <div className="flex items-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                <MapPin className="w-3 h-3 mr-2 text-primary" />
                {hosp.location}
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-600 uppercase tracking-widest">
                  {hosp.specialty}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                {hosp.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-sm font-bold text-slate-700">
                  <Phone className="w-4 h-4 mr-3 text-emerald-500" />
                  {hosp.phone}
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all">
                  Visit Official Website
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-bg border-4 border-dashed border-slate-200 rounded-[3rem] p-12 text-center">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-black text-slate-900 uppercase mb-4">Are you a professional healthcare provider?</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto font-medium leading-relaxed">
            Partner with J-Nexus Health to expand your clinical reach and help patients worldwide access your services.
          </p>
          <button className="px-10 py-5 bg-white border-2 border-slate-900 rounded-2xl font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100">
            Apply for Partnership
          </button>
        </div>
      </div>
    </div>
  );
}
