import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cardiology from './pages/Cardiology';
import BodySystems from './pages/BodySystems';
import Herbal from './pages/Herbal';
import Shop from './pages/Shop';
import Consultation from './pages/Consultation';
import AIAssistant from './pages/AIAssistant';
import Symptoms from './pages/Symptoms';
import Account from './pages/Account';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardiology" element={<Cardiology />} />
          <Route path="/systems" element={<BodySystems />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/herbal" element={<Herbal />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
