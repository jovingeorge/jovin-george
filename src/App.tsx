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
import Account from './pages/Account';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardiology" element={<Cardiology />} />
          <Route path="/diseases" element={<DiseaseDB />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/global-care" element={<GlobalCare />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
