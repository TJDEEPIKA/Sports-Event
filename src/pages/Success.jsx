import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import ConfirmationCard from '../components/ConfirmationCard.jsx';
export default function Success({ confirmation }) { return <div className="success-page section-wrap"><ProgressBar current={3} /><ConfirmationCard confirmation={confirmation} /><div className="success-next"><span>THE COUNTDOWN IS ON</span><p>We’ll see you in Chennai. Until then, keep showing up.</p><Link className="button button-dark" to="/">Back to home <b>→</b></Link></div><p className="browser-note">Your confirmation is saved in this browser. Please download a copy for your records.</p></div>; }
