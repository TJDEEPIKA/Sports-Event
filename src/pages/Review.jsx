import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';

const sections = [
  ['About you', ['fullName','Full name'],['dateOfBirth','Date of birth'],['age','Age'],['gender','Gender'],['mobile','Mobile number'],['email','Email address']],
  ['Institution', ['institution','College / school'],['department','Department'],['yearOfStudy','Year of study'],['district','District'],['state','State']],
  ['Event', ['eventCategory','Event category'],['eventName','Event name'],['participation','Participation type'],['teamName','Team name']],
  ['Address', ['address','Address'],['city','City / town'],['pincode','Pincode']],
  ['Documents', ['profilePhoto','Profile photo'],['schoolId','College / school ID'],['ageProof','Age proof']],
];
export default function Review({ formData, onConfirm }) {
  const [accepted, setAccepted] = useState(false); const [error, setError] = useState(''); const navigate = useNavigate();
  const submit = () => { if (!accepted) { setError('Please accept the terms and conditions to continue.'); return; } onConfirm(); };
  return <div className="review-page section-wrap"><div className="register-heading"><Link className="back-link" to="/register?resume=1">← Edit your details</Link><span className="eyebrow">ONE LAST LOOK</span><h1>Review & <em>confirm.</em></h1><p>Make sure everything looks right before you submit.</p></div><ProgressBar current={2} /><div className="review-card">{sections.map(([title,...items]) => <section className="review-section" key={title}><div className="review-section-head"><h2>{title}</h2><Link to="/register?resume=1">Edit</Link></div><div className="review-grid">{items.filter(([key]) => key !== 'teamName' || formData[key]).map(([key,label]) => <div className="review-item" key={key}><small>{label}</small><strong>{formData[key]?.name || formData[key] || '—'}</strong></div>)}</div></section>)}</div><div className="terms-area"><label className="terms-check"><input type="checkbox" checked={accepted} onChange={e => { setAccepted(e.target.checked); setError(''); }} /><span className="checkmark"/><span>I confirm that the information above is accurate and agree to the <a href="#terms" onClick={e => { e.preventDefault(); document.getElementById('terms-copy').hidden = !document.getElementById('terms-copy').hidden; }}>terms & conditions</a>.</span></label>{error && <small className="field-error">{error}</small>}<p id="terms-copy" hidden className="terms-copy">By submitting, you confirm that you meet the event eligibility requirements, the information provided is accurate, and the organizers may contact you about the championship. Registration details are saved in this browser only.</p></div><div className="review-actions"><button className="button button-secondary" onClick={() => navigate('/register?resume=1')}>← Back to form</button><button className="button button-dark" onClick={submit}>Confirm & submit <b>→</b></button></div></div>;
}
