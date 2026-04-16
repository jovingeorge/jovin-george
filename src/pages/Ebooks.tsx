import React from 'react';
import { motion } from 'motion/react';
import { Book, Download, Star, Award, BookOpen, Clock, Heart, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const ebooks = [
  {
    id: 'heart-silent-language',
    title: "The Heart's Silent Language",
    author: "Dr. Jovin George Mabunga",
    description: "A definitive guide to advanced cardiology, anatomical mysteries, and clinical heart care. Explore the electric rhythm of life and how to protect it.",
    chapters: ["Electrophysiology of the Heart", "Ischemic Heart Disease", "Valvular Disorders", "Advanced Heart Failure Management", "The Future of Cardiology"],
    price: 45,
    rating: 4.9,
    image: "https://picsum.photos/seed/heartbook/600/800",
    color: "from-rose-500 to-red-700",
    isBestseller: true
  },
  {
    id: 'internal-alchemy',
    title: "Internal Alchemy: Body Systems",
    author: "Dr. Jovin George Mabunga",
    description: "Deep dive into the human machine. Understanding the synergy between the endocrine, digestive, and respiratory systems for total physiological balance.",
    chapters: ["The Hormonal Symphony", "Digestive Biomechanics", "Renal filtration", "Immune Resilience", "Systemic Homeostasis"],
    price: 39,
    rating: 4.8,
    image: "https://picsum.photos/seed/systembook/600/800",
    color: "from-emerald-500 to-teal-700"
  },
  {
    id: 'herbal-nexus',
    title: "The Herbal Nexus",
    author: "Dr. Jovin George Mabunga",
    description: "Pharmacology of the earth. Scientific validation of traditional herbal medicines and their role in modern clinical practice.",
    chapters: ["Phytochemical Foundations", "African Medicinal Treasures", "Herbal Cardiac Support", "Neurological Calm via Plants", "Sustainable Healing"],
    price: 35,
    rating: 5.0,
    image: "https://picsum.photos/seed/herbalbook/600/800",
    color: "from-amber-500 to-orange-700"
  },
  {
    id: 'sexual-vitality',
    title: "Sexual Vitality & Education",
    author: "Dr. Jovin George Mabunga",
    description: "Bonus Program: Comprehensive educational guide to reproductive health, hormonal balance, and psychological wellness in intimacy.",
    chapters: ["Reproductive Anatomy", "Hormonal Optimization", "Psychology of Intimacy", "Preventive Sexual Health", "Modern Relationship Dynamics"],
    price: 29,
    rating: 4.7,
    image: "https://picsum.photos/seed/sexualhealth/600/800",
    color: "from-purple-500 to-indigo-700",
    isSpecial: true
  },
  {
    id: 'viral-marketing',
    title: "Viral Health Marketing",
    author: "Dr. Jovin George Mabunga",
    description: "Master the digital health landscape. Strategies to make medical information go viral while maintaining professional integrity.",
    chapters: ["Psychology of Viral Content", "Digital Health Branding", "Algorithm Optimization", "Building Global Authority", "Ethics in Health Influence"],
    price: 49,
    rating: 4.9,
    image: "https://picsum.photos/seed/marketingbook/600/800",
    color: "from-blue-500 to-cyan-700"
  },
  {
    id: 'presidential-protocol',
    title: "The Presidential Health Protocol",
    author: "Dr. Jovin George Mabunga",
    description: "The elite roadmap to human longevity and high-capacity wellness. Originally designed for leadership under extreme stress, this protocol covers biological age reversal and cognitive preservation.",
    chapters: ["Stress Management for Leaders", "Biological Age Reversal", "Elite Nutritional Biochemistry", "Sleep Optimization for High Capacity", "The Longevity Mindset"],
    price: 99,
    rating: 5.0,
    image: "https://picsum.photos/seed/presidential/600/800",
    color: "from-slate-700 to-slate-900",
    isPremium: true
  }
];

export default function Ebooks() {
  const navigate = useNavigate();
  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Logo className="absolute -top-20 -left-20 w-[400px] h-[400px]" />
          <Logo className="absolute -bottom-20 -right-20 w-[400px] h-[400px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Official Clinical Education Series
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            E-Books by <span className="text-emerald-400">Jovin</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unlocking medical mysteries and advancing global health literacy through deep research and clinical experience.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Book className="w-64 h-64" />
          </div>
          <div className="max-w-3xl relative z-10">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Author's Preface</h2>
            <h3 className="text-3xl font-black text-slate-900 uppercase mb-6 tracking-tighter italic">"A Legacy of Healing"</h3>
            <p className="text-slate-600 font-medium leading-relaxed mb-6">
              Every word in these volumes has been meticulously written by Dr. Jovin George Mabunga. These are not merely digital files; they are a lifetime of clinical observation, heart care research, and a deep commitment to human vitality. 
            </p>
            <p className="text-slate-600 font-medium leading-relaxed">
              From the intricate electrical pathways of the heart to the viral expansion of health knowledge, these e-books cover everything needed for a modern health journey. 10% of all proceeds are dedicated to the J-Nexus Foundations for heart disease research in Tanzania.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-200/20 transition-all duration-500"
            >
              <div className={`h-4 bg-gradient-to-r ${book.color}`} />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-40 h-56 bg-slate-100 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500 relative">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {book.isBestseller && (
                      <div className="absolute top-2 left-2 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Bestseller</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">${book.price}</div>
                    <div className="flex items-center justify-end text-amber-400 mt-1">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span className="text-xs font-bold">{book.rating}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight uppercase group-hover:text-emerald-600 transition-colors">{book.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">{book.description}</p>

                <div className="space-y-3 mb-8">
                  {book.chapters.map((chapter, idx) => (
                    <div key={idx} className="flex items-center text-xs font-semibold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 opacity-50" />
                      {chapter}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate('/checkout', { state: { product: { name: book.title, price: book.price } } })}
                  className="w-full btn-theme-primary flex items-center justify-center space-x-2 py-4 rounded-xl font-black uppercase text-sm group-hover:scale-[1.02] transition-transform"
                >
                  <Download className="w-4 h-4" />
                  <span>Download E-Book Now</span>
                </button>
                <p className="text-[10px] text-center mt-3 text-slate-400 font-medium">10% profit donated to J-Nexus Health Foundation</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-emerald-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Logo className="w-[300px] h-[300px]" />
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight italic">
              "Education is the most powerful medicine our heart can receive."
            </h2>
            <div className="w-12 h-1 bg-white mx-auto mb-6 opacity-30" />
            <p className="text-lg font-bold">DR. JOVIN GEORGE MABUNGA</p>
            <p className="text-sm opacity-60">Lead Author & Medical Director</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
