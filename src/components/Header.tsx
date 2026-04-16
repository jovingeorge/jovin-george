import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Activity, ShoppingBag, User, MessageCircle, BookOpen, Globe, Languages } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: t('nav_diseases'), path: '/diseases', icon: Shield },
    { name: t('nav_ebooks'), path: '/ebooks', icon: BookOpen },
    { name: t('nav_hospitals'), path: '/global-care', icon: Globe },
    { name: t('nav_consultation'), path: '/consultation', icon: MessageCircle },
    { name: t('nav_account'), path: '/account', icon: User },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <nav className="fixed top-0 w-full h-[64px] z-50 bg-surface border-b border-border-theme flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-3">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">J-NEXUS</span>
        </Link>
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[11px] font-black uppercase tracking-widest transition-all ${
                  isActive ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="hidden lg:flex items-center space-x-6">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
        >
          <Languages className="w-3.5 h-3.5" />
          {language === 'en' ? 'English' : 'Kiswahili'}
        </button>

        {user ? (
          <Link to="/account" className="flex items-center gap-3 px-3 py-1.5 bg-bg border border-border-theme rounded-full">
            <div className="w-6 h-6 bg-slate-300 rounded-full overflow-hidden border border-slate-200">
               {user.photoURL && <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-main">{user.displayName ? user.displayName.split(' ')[0] : 'Member'}</span>
          </Link>
        ) : (
          <Link to="/login" className="btn-theme-primary !py-2 !px-6 !text-[10px]">
            {language === 'en' ? 'Nexus Login' : 'Ingia'}
          </Link>
        )}
      </div>

      <div className="flex items-center lg:hidden gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-full border border-slate-200 text-[8px] font-black uppercase tracking-tighter text-slate-600"
        >
          {language === 'en' ? 'EN' : 'SW'}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-bg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-[64px] left-0 w-full bg-white border-b border-gray-200 overflow-hidden shadow-lg z-40"
          >
            <div className="pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-bg hover:text-primary transition-colors"
                >
                  <item.icon className="w-4 h-4 mr-4" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border-theme px-6 text-center">
                {user ? (
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Nexus Account
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-theme-primary block !py-4"
                  >
                    {language === 'en' ? 'Nexus Login' : 'Ingia kwenye Nexus'}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
