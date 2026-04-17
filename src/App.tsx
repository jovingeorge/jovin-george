import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cardiology from './pages/Cardiology';
import BodySystems from './pages/BodySystems';
import Herbal from './pages/Herbal';
import Shop from './pages/Shop';
import Consultation from './pages/Consultation';
import AIAssistant from './pages/AIAssistant';
import DiseaseDB from './pages/DiseaseDB';
import Ebooks from './pages/Ebooks';
import GlobalCare from './pages/GlobalCare';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Account from './pages/Account';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardiology" element={<Cardiology />} />
            <Route path="/body-systems" element={<BodySystems />} />
            <Route path="/herbal" element={<Herbal />} />
            <Route path="/diseases" element={<DiseaseDB />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/global-care" element={<GlobalCare />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
