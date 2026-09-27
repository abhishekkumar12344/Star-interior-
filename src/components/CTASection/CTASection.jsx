import { useRouter } from '../../router/RouterContext.jsx';
import './CTASection.css';

export default function CTASection() {
  const { navigate } = useRouter();
  return (
    <div className="cta-sec">
      <div className="cta-box">
        <div>
          <div className="eyebrow left" style={{ color: 'var(--gold-2)' }}>Let's Create Something Extraordinary Together</div>
          <h2>Your dream space is one <span>consultation</span> away.</h2>
          <p>Free site visit • Free 3D consultation • Transparent BOQ within 48 hours. Serving Patna, Gaya, Muzaffarpur &amp; pan-India turnkey.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => navigate('/consultation')}>Book Free Visit</button>
            <a href="tel:+916207283158" className="btn btn-outline">Call 6207283158</a>
          </div>
        </div>
        <div className="cta-phone">
          <div className="ic"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg></div>
          <div>
            <span>Call Our Design Expert</span>
            <strong>6207283158</strong>
            <small style={{ color: '#8FA0B8', fontSize: '13px' }}>info@skystarinteriors.com • Bihar, India</small>
          </div>
        </div>
      </div>
    </div>
  );
}
