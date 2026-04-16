import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[64px] min-h-[calc(100vh-40px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
