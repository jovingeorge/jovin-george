import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, ShieldCheck, Globe, CreditCard } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black text-white tracking-tighter uppercase">J-NEXUS</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advancing human health through professional clinical education, heart care innovation, and herbal heritage. Directed by Dr. Jovin George Mabunga.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Medical Hub</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/cardiology" className="hover:text-primary transition-colors">Cardiology Center</Link></li>
              <li><Link to="/diseases" className="hover:text-primary transition-colors">Disease Database</Link></li>
              <li><Link to="/ebooks" className="hover:text-primary transition-colors">E-Books by Jovin</Link></li>
              <li><Link to="/global-care" className="hover:text-primary transition-colors">Professional Hospitals</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Global Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> Jovingeorge24@gmail.com</li>
              <li className="flex items-center"><Globe className="w-4 h-4 mr-2" /> Tanzania & Worldwide</li>
              <li className="text-slate-500 mt-2 italic text-xs">Available for worldwide health consultation.</li>
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Secure Payments</h4>
            <div className="flex space-x-4 mb-6">
              <CreditCard className="w-8 h-8 opacity-50" />
              <ShieldCheck className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-xs text-slate-500">
              Payments secured via Visa / Mastercard. 10% profit revenue supported research.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium tracking-wide">
          <p>© 2024 J-NEXUS HEALTH | DR. JOVIN GEORGE MABUNGA | ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 opacity-60">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
