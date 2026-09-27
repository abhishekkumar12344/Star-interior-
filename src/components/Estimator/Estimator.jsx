import { useState } from 'react';
import Reveal from '../Reveal/Reveal.jsx';
import './Estimator.css';

export default function Estimator() {
  const [area, setArea] = useState(1200);
  const [rate, setRate] = useState(1450);
  const [mult, setMult] = useState(1);
  const estimate = Math.round(area * rate * mult / 100000 * 10) / 10;

  return (
    <Reveal>
      <div className="estimator">
        <div>
          <div className="eyebrow left" style={{ color: 'var(--gold-2)' }}>Instant Estimator</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', lineHeight: '1.3' }}>Estimate your project<br />in <span style={{ color: 'var(--gold-2)', fontStyle: 'italic' }}>30 seconds.</span></h3>
          <div className="est-control" style={{ marginTop: '20px' }}>
            <label>Carpet Area • <b>{area.toLocaleString()} sq.ft</b></label>
            <input type="range" min="300" max="5000" value={area} step="50" onChange={e => setArea(+e.target.value)} />
          </div>
          <div className="est-control">
            <label>Scope</label>
            <div className="est-pills">
              {[{ label: 'Essential', rate: 1450 }, { label: 'Premium', rate: 1950 }, { label: 'Luxury', rate: 2650 }].map(s => (
                <button key={s.label} className={`est-pill ${rate === s.rate ? 'active' : ''}`} onClick={() => setRate(s.rate)}>{s.label}</button>
              ))}
            </div>
          </div>
          <div className="est-control">
            <label>Property Type</label>
            <div className="est-pills">
              {[{ label: '2/3 BHK Home', mult: 1 }, { label: 'Villa / Bungalow', mult: 1.25 }, { label: 'Office / Retail', mult: 1.15 }].map(t => (
                <button key={t.label} className={`est-pill ${mult === t.mult ? 'active' : ''}`} onClick={() => setMult(t.mult)}>{t.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="est-result">
          <span>Estimated Investment</span>
          <strong>₹{estimate} L</strong>
          <p style={{ color: '#9FB0C6', fontSize: '14px', fontWeight: '300' }}>Inclusive of design, materials, labour &amp; project management. Final quote after free site visit.</p>
          <a href="#/consultation" className="btn btn-gold btn-sm" style={{ marginTop: '16px' }}>Get Exact Quote →</a>
        </div>
      </div>
    </Reveal>
  );
}
