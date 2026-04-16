import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sw';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    nav_home: 'Home',
    nav_diseases: 'Diseases',
    nav_ebooks: 'E-Books',
    nav_consultation: 'Consultation',
    nav_hospitals: 'Global Hospitals',
    nav_account: 'Account',
    hero_title: 'J-Nexus Health',
    hero_subtitle: 'Elite Clinical Excellence & Global Medical Intelligence',
    cta_consult: 'Book Consultation',
    cta_explore: 'Explore Database',
    footer_tagline: 'Leading the future of clinical heart care and global health education.',
  },
  sw: {
    nav_home: 'Nyumbani',
    nav_diseases: 'Magonjwa',
    nav_ebooks: 'Vitabu',
    nav_consultation: 'Ushauri',
    nav_hospitals: 'Hospitali za Dunia',
    nav_account: 'Akaunti',
    hero_title: 'J-Nexus Health',
    hero_subtitle: 'Ubora wa Kliniki na Akili ya Matibabu ya Global',
    cta_consult: 'Agiza Ushauri',
    cta_explore: 'Chunguza Kanzi-data',
    footer_tagline: 'Kuongoza mustakabali wa utunzaji wa moyo na elimu ya afya duniani.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('j-nexus-lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('j-nexus-lang', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
