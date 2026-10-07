const steps = ['Your details', 'Review', 'Complete'];
export default function ProgressBar({ current = 1 }) 
{ return <div className="progress" aria-label={`Step ${current} of 3`}><div className="progress-line"><span style={{ width: `${((current - 1) / 2) * 100}%` }} /></div>{steps.map((name, i) => <div className={`progress-step ${i + 1 <= current ? 'active' : ''}`} key={name}><span>{i + 1 < current ? '✓' : `0${i + 1}`}</span><small>{name}</small></div>)}</div>; }
