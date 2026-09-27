import { useState, useEffect } from 'react';
import { useRouter } from '../../router/RouterContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/process', label: 'Process' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return route === '/' || route === '';
    return route.startsWith(path);
  };

  const handleNav = (path) => { navigate(path); setDrawerOpen(false); };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="brand" onClick={(e) => { e.preventDefault(); handleNav('/'); }} href="#/">
            <div className="brand-badge">
              <svg viewBox="0 0 24 24"><path d="M5 11V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v3c0 2.2-1.8 4-4 4h-.5l1 4H13l-1-4H8l-1 4H4.5l1-4H5c-.3 0-.5-.2-.5-.5V11H5zm2 0h10V8H7v3zM5 20h14v1.5H5V20z" /></svg>
            </div>
            <div className="brand-text">
              <h2>SKY<span>STAR</span></h2>
              <small>INTERIORS PVT. LTD.</small>
            </div>
          </a>
          <nav className="main-nav">
            {navItems.map(item => (
              <button key={item.path} className={`nav-link ${isActive(item.path) ? 'active' : ''}`} onClick={() => handleNav(item.path)}>{item.label}</button>
            ))}
            <button className="btn btn-gold btn-sm" onClick={() => handleNav('/consultation')}>Get Consultation</button>
          </nav>
          <button className={`hamburger ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(!drawerOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div className={`overlay ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)}></div>
      <aside className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3>SKYSTAR</h3>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        {navItems.map(item => (
          <button key={item.path} className={`m-link ${isActive(item.path) ? 'active' : ''}`} onClick={() => handleNav(item.path)}>
            {item.label} <span>→</span>
          </button>
        ))}
        <button className="btn btn-gold" style={{ marginTop: '14px' }} onClick={() => handleNav('/consultation')}>Get Consultation</button>
        <div className="drawer-foot">📞 6207283158<br />✉ info@skystarinteriors.com<br />📍 Bihar, India</div>
      </aside>
    </>
  );
}
