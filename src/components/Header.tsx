import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Activity, ShoppingBag, User, MessageCircle, BookOpen, Globe } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: 'Cardiology', path: '/cardiology', icon: Heart },
    { name: 'Diseases', path: '/diseases', icon: Shield },
    { name: 'E-Books', path: '/ebooks', icon: BookOpen },
    { name: 'Global Care', path: '/global-care', icon: Globe },
    { name: 'Consultation', path: '/consultation', icon: MessageCircle },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed top-0 w-full h-[64px] z-50 bg-surface border-b border-border-theme flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-3">
          <Logo className="w-9 h-9" />
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">J-NEXUS</span>
        </Link>
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="hidden lg:flex items-center space-x-4">
        {user ? (
          <Link to="/account" className="flex items-center gap-3 px-3 py-1.5 bg-bg border border-border-theme rounded-full">
            <div className="w-6 h-6 bg-slate-300 rounded-full overflow-hidden">
               {user.photoURL && <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
            </div>
            <span className="text-[13px] font-semibold text-text-main">{user.displayName || 'Account'}</span>
          </Link>
        ) : (
          <Link to="/login" className="btn-theme-primary !py-2">
            Log In
          </Link>
        )}
      </div>

      <div className="flex items-center lg:hidden">
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
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-6 py-4 text-base font-semibold text-text-muted hover:bg-bg hover:text-primary transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border-theme px-6 text-center">
                {user ? (
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center py-3 bg-bg rounded-lg font-bold text-text-main"
                  >
                    <User className="w-5 h-5 mr-3" />
                    My Account
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-theme-primary block"
                  >
                    Log In
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
