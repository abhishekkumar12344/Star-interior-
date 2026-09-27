import { useRouter } from '../../router/RouterContext.jsx';
import './Footer.css';

export default function Footer() {
  const { navigate } = useRouter();
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="brand-badge" style={{ width: '44px', height: '44px' }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--gold-2)' }}><path d="M5 11V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v3c0 2.2-1.8 4-4 4h-.5l1 4H13l-1-4H8l-1 4H4.5l1-4H5c-.3 0-.5-.2-.5-.5V11H5zm2 0h10V8H7v3zM5 20h14v1.5H5V20z" /></svg>
            </div>
            <h3>SKY<span>STAR</span></h3>
          </div>
          <p>Designing Spaces. Delivering Excellence. Premium turnkey interiors for homes, offices, retail &amp; hospitality across Bihar &amp; India.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.5a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z" /></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.7H7.8V13h2.7v8h3z" /></svg></a>
            <a href="#" aria-label="Youtube"><svg viewBox="0 0 24 24"><path d="M23 12s0-3.9-.5-5.6c-.3-1-1.1-1.8-2.1-2C18.6 4 12 4 12 4s-6.6 0-8.4.4c-1 .2-1.8 1-2.1 2C1 8.1 1 12 1 12s0 3.9.5 5.6c.3 1 1.1 1.8 2.1 2 1.8.4 8.4.4 8.4.4s6.6 0 8.4-.4c1-.2 1.8-1 2.1-2 .5-1.7.5-5.6.5-5.6zM9.8 15.5v-7l6 3.5-6 3.5z" /></svg></a>
            <a href="https://wa.me/916207283158" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .1 0 .7-.1 1.4z" /></svg></a>
          </div>
        </div>
        <div className="foot-col">
          <h4>Explore</h4>
          <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="#/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About Us</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Services</a>
          <a href="#/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>Projects</a>
          <a href="#/process" onClick={(e) => { e.preventDefault(); navigate('/process'); }}>Our Process</a>
          <a href="#/consultation" onClick={(e) => { e.preventDefault(); navigate('/consultation'); }}>Get Consultation</a>
        </div>
        <div className="foot-col">
          <h4>Services</h4>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Space Planning</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Interior Designing</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>False Ceiling &amp; Lighting</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Modular Furniture</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Turnkey Projects</a>
          <a href="#/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>3D Visualization</a>
        </div>
        <div className="foot-col">
          <h4>Stay Inspired</h4>
          <p style={{ fontSize: '14px', color: '#8FA0B8' }}>Monthly design trends &amp; offers. No spam.</p>
          <form className="news-box" onSubmit={(e) => { e.preventDefault(); }}>
            <input placeholder="Your email" type="email" required />
            <button type="submit">→</button>
          </form>
          <p style={{ fontSize: '14px', marginTop: '16px', color: '#9FB0C6' }}>📞 6207283158<br />✉ info@skystarinteriors.com<br />📍 Bihar, India<br />🌐 www.skystarinteriors.com</p>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Skystar Interiors Pvt. Ltd. • Designing Spaces, Elevating Lifestyles</span>
        <span>Director: Dhananjay Singh • Crafted with excellence in Bihar, India</span>
      </div>
    </footer>
  );
}
