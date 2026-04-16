import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-[40px] bg-surface border-t border-border-theme flex items-center justify-center px-6 text-[11px] text-text-muted">
       <div className="flex w-full justify-between items-center max-w-7xl mx-auto px-4">
          <p>© 2024 J-Nexus Health | Doctor Jovin George Mabunga | Jovingeorge24@gmail.com</p>
          <span className="hidden md:inline font-semibold">Payments: Visa / Mastercard Secured</span>
       </div>
    </footer>
  );
}
