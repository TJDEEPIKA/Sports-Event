import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Register from './pages/Register.jsx';
import Review from './pages/Review.jsx';
import Success from './pages/Success.jsx';

const DRAFT_KEY = 'slc2026-registration-draft';
const SUCCESS_KEY = 'slc2026-registration-confirmation';

export default function App() {
  const [formData, setFormData] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    if (location.pathname === '/register' && search.has('new')) return;
    try {
      setFormData(JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'));
      setConfirmation(JSON.parse(localStorage.getItem(SUCCESS_KEY) || 'null'));
    } catch { setFormData({}); }
  }, []);

  const saveDraft = (next) => {
    setFormData(next);
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(next)); } catch { /* Browser storage can be unavailable or full. */ }
  };
  const confirm = () => {
    const saved = JSON.parse(localStorage.getItem(SUCCESS_KEY) || 'null');
    const nextNumber = Number(localStorage.getItem('slc2026-registration-number') || '0') + 1;
    const record = {
      ...formData,
      registrationId: saved?.draftKey === JSON.stringify(formData) ? saved.registrationId : `SLC2026-${String(nextNumber).padStart(4, '0')}`,
      registeredAt: new Date().toISOString(),
      draftKey: JSON.stringify(formData),
    };
    setConfirmation(record);
    try {
      localStorage.setItem(SUCCESS_KEY, JSON.stringify(record));
      localStorage.setItem('slc2026-registration-number', String(nextNumber));
      localStorage.removeItem(DRAFT_KEY);
    } catch { /* Confirmation remains available for this session. */ }
    navigate('/success');
  };

  return <div className="app-shell"><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/events" element={<Events />} />
    <Route path="/register" element={<Register formData={formData} saveDraft={saveDraft} />} />
    <Route path="/review" element={<Review formData={formData} onConfirm={confirm} />} />
    <Route path="/success" element={confirmation ? <Success confirmation={confirmation} /> : <Navigate to="/" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></main><Footer /></div>;
}
