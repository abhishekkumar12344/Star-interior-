import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { SERVICES, PROJECTS, TESTIMONIALS, PROCESS_STEPS, HERO_SLIDES } from './data/siteData';

const RouterContext = createContext(null);

function Router({ children }) {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

function useRouter() {
  return useContext(RouterContext);
}

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [duration, start, target]);

  return count;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = '', delay = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/process', label: 'Process' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return route === '/' || route === '';
    return route.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => handleNav('/')}>
            <div className="brand-badge">
              <svg viewBox="0 0 24 24"><path d="M5 11V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v3c0 2.2-1.8 4-4 4h-.5l1 4H13l-1-4H8l-1 4H4.5l1-4H5c-.3 0-.5-.2-.5-.5V11H5zm2 0h10V8H7v3zM5 20h14v1.5H5V20z" /></svg>
            </div>
            <div className="brand-text">
              <h2>SKY<span>STAR</span></h2>
              <small>INTERIORS PVT. LTD.</small>
            </div>
          </button>

          <nav className="main-nav">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNav(item.path)}
              >
                {item.label}
              </button>
            ))}
            <button className="btn btn-gold btn-sm" onClick={() => handleNav('/consultation')}>
              Get Consultation
            </button>
          </nav>

          <button className={`hamburger ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(!drawerOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`overlay ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />

      <aside className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3>SKYSTAR</h3>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>

        {navItems.map((item) => (
          <button key={item.path} className={`m-link ${isActive(item.path) ? 'active' : ''}`} onClick={() => handleNav(item.path)}>
            {item.label} <span>→</span>
          </button>
        ))}

        <button className="btn btn-gold" style={{ marginTop: '14px' }} onClick={() => handleNav('/consultation')}>
          Get Consultation
        </button>

        <div className="drawer-foot">
          📞 6207283158
          <br />
          ✉ info@skystarinteriors.com
          <br />
          📍 Bihar, India
        </div>
      </aside>
    </>
  );
}

function Footer() {
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
          <button className="foot-link" onClick={() => navigate('/')}>Home</button>
          <button className="foot-link" onClick={() => navigate('/about')}>About Us</button>
          <button className="foot-link" onClick={() => navigate('/services')}>Services</button>
          <button className="foot-link" onClick={() => navigate('/projects')}>Projects</button>
          <button className="foot-link" onClick={() => navigate('/process')}>Our Process</button>
          <button className="foot-link" onClick={() => navigate('/consultation')}>Get Consultation</button>
        </div>

        <div className="foot-col">
          <h4>Services</h4>
          <button className="foot-link" onClick={() => navigate('/services')}>Space Planning</button>
          <button className="foot-link" onClick={() => navigate('/services')}>Interior Designing</button>
          <button className="foot-link" onClick={() => navigate('/services')}>False Ceiling &amp; Lighting</button>
          <button className="foot-link" onClick={() => navigate('/services')}>Modular Furniture</button>
          <button className="foot-link" onClick={() => navigate('/services')}>Turnkey Projects</button>
          <button className="foot-link" onClick={() => navigate('/services')}>3D Visualization</button>
        </div>

        <div className="foot-col">
          <h4>Stay Inspired</h4>
          <p style={{ fontSize: '14px', color: '#8FA0B8' }}>Monthly design trends &amp; offers. No spam.</p>
          <form className="news-box" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your email" type="email" required />
            <button type="submit">→</button>
          </form>
          <p style={{ fontSize: '14px', marginTop: '16px', color: '#9FB0C6' }}>
            📞 6207283158<br />
            ✉ info@skystarinteriors.com<br />
            📍 Bihar, India<br />
            🌐 www.skystarinteriors.com
          </p>
        </div>
      </div>

      <div className="foot-bottom">
        <span>© 2026 Skystar Interiors Pvt. Ltd. • Designing Spaces, Elevating Lifestyles</span>
        <span>Director: Dhananjay Singh • Crafted with excellence in Bihar, India</span>
      </div>
    </footer>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <div className="svc" onClick={() => onClick(service)}>
      <div className="svc-img">
        <img src={service.img} alt={service.title} loading="lazy" />
        <span className="svc-cat">{service.cat}</span>
      </div>
      <div className="svc-icon">
        <svg viewBox="0 0 24 24"><path d={service.icon} /></svg>
      </div>
      <div className="svc-body">
        <h3>{service.title}</h3>
        <p>{service.desc.substring(0, 90)}...</p>
        <div className="svc-foot">
          <button type="button">Learn More →</button>
          <span className="svc-price">{service.price}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <div className="proj" onClick={() => onClick(project)}>
      <div className="proj-img">
        <img src={project.img} alt={project.title} loading="lazy" />
        <span className="proj-badge">{project.cat}</span>
      </div>
      <div className="proj-info">
        <h3>{project.title}</h3>
        <p>{project.loc} • {project.time}</p>
      </div>
      <div className="proj-hover"><span>↗</span></div>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="testi">
      <img className="testi-avatar" src={testimonial.avatar} alt={testimonial.name} />
      <div>
        <div className="stars">{'★'.repeat(testimonial.stars)}</div>
        <p>"{testimonial.text}"</p>
        <h5>{testimonial.name}</h5>
        <small>{testimonial.role}</small>
      </div>
    </div>
  );
}

function ProcessStep({ step }) {
  return (
    <div className="p-step">
      <div className="p-num">{step.num}</div>
      <h4>{step.title}</h4>
      <p>{step.desc}</p>
    </div>
  );
}

function CTASection() {
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

function Counter({ target, suffix = '' }) {
  const [ref, visible] = useReveal();
  const count = useCounter(target, 2000, visible);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Estimator() {
  const [area, setArea] = useState(1200);
  const [rate, setRate] = useState(1450);
  const [mult, setMult] = useState(1);
  const estimate = Math.round((area * rate * mult) / 100000 * 10) / 10;

  return (
    <Reveal>
      <div className="estimator">
        <div>
          <div className="eyebrow left" style={{ color: 'var(--gold-2)' }}>Instant Estimator</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', lineHeight: '1.3' }}>
            Estimate your project<br />in <span style={{ color: 'var(--gold-2)', fontStyle: 'italic' }}>30 seconds.</span>
          </h3>

          <div className="est-control" style={{ marginTop: '20px' }}>
            <label>Carpet Area • <b>{area.toLocaleString()} sq.ft</b></label>
            <input type="range" min="300" max="5000" value={area} step="50" onChange={(e) => setArea(+e.target.value)} />
          </div>

          <div className="est-control">
            <label>Scope</label>
            <div className="est-pills">
              {[
                { label: 'Essential', rate: 1450 },
                { label: 'Premium', rate: 1950 },
                { label: 'Luxury', rate: 2650 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`est-pill ${rate === item.rate ? 'active' : ''}`}
                  onClick={() => setRate(item.rate)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="est-control">
            <label>Property Type</label>
            <div className="est-pills">
              {[
                { label: '2/3 BHK Home', mult: 1 },
                { label: 'Villa / Bungalow', mult: 1.25 },
                { label: 'Office / Retail', mult: 1.15 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`est-pill ${mult === item.mult ? 'active' : ''}`}
                  onClick={() => setMult(item.mult)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="est-result">
          <span>Estimated Investment</span>
          <strong>₹{estimate} L</strong>
          <p style={{ color: '#9FB0C6', fontSize: '14px', fontWeight: '300' }}>
            Inclusive of design, materials, labour &amp; project management. Final quote after free site visit.
          </p>
          <a href="#/consultation" className="btn btn-gold btn-sm" style={{ marginTop: '16px' }}>
            Get Exact Quote →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ContactForm() {
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    e.target.reset();
  };

  return (
    <>
      <div className="contact-grid">
        <div className="c-info">
          {[
            { icon: 'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z', title: 'Call Us', info: '6207283158', sub: 'Mon–Sat, 10am–7pm' },
            { icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', title: 'Email', info: 'info@skystarinteriors.com', sub: 'Reply within 4 working hours' },
            { icon: 'M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z', title: 'Studio', info: 'Bihar, India', sub: 'www.skystarinteriors.com' },
          ].map((item, idx) => (
            <Reveal key={idx}>
              <div className="c-card">
                <div className="ic"><svg viewBox="0 0 24 24"><path d={item.icon} /></svg></div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.info}</p>
                  <small>{item.sub}</small>
                </div>
              </div>
            </Reveal>
          ))}

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)' }}>
            <iframe title="Map Bihar" src="https://www.google.com/maps?q=Patna,Bihar,India&output=embed" style={{ width: '100%', height: '190px', border: '0' }} loading="lazy" />
          </div>
        </div>

        <Reveal delay="reveal-d1">
          <div className="form-card">
            <h3>Request a Callback</h3>
            <p>Tell us about your project — our designer will call you back today.</p>
            <form onSubmit={handleSubmit}>
              <div className="f-row">
                <div className="f-group"><label>Full Name *</label><input name="name" placeholder="e.g. Priya Sharma" required /></div>
                <div className="f-group"><label>Phone *</label><input name="phone" inputMode="numeric" placeholder="e.g. 98765 43210" required /></div>
              </div>
              <div className="f-row">
                <div className="f-group"><label>Email</label><input name="email" type="email" placeholder="you@email.com" /></div>
                <div className="f-group">
                  <label>Service Needed</label>
                  <select name="service">
                    <option>Full Home Interiors</option>
                    <option>Modular Kitchen</option>
                    <option>Office / Commercial</option>
                    <option>Retail / Hospitality</option>
                    <option>Only 3D Design</option>
                  </select>
                </div>
              </div>
              <div className="f-group"><label>Message *</label><textarea name="message" placeholder="Plot / flat size, city, budget, timeline..." required /></div>
              <button className="btn btn-navy" style={{ width: '100%' }} type="submit">Send Request →</button>
            </form>
          </div>
        </Reveal>
      </div>

      {toast && <div className="toast show"><i>✓</i><span>Thank you! Our designer will call you shortly.</span></div>}
    </>
  );
}

function HomePage() {
  const { navigate } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalService, setModalService] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects = activeFilter === 'all' ? PROJECTS.slice(0, 4) : PROJECTS.filter((p) => p.cat === activeFilter).slice(0, 4);

  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero-gold-line"></div>
        <div className="hero-slides">
          {HERO_SLIDES.map((slide, idx) => (
            <div key={idx} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url('${slide}')` }} />
          ))}
        </div>
        <div className="container hero-content">
          <span className="hero-badge"><i></i>Luxury Interior Architecture • Bihar • Pan India</span>
          <h1>WE DESIGN SPACES<br />THAT <span className="gold">ELEVATE LIFE.</span></h1>
          <p className="sub">From bespoke residences to retail and hospitality — Skystar Interiors crafts timeless, functional luxury. Designing Spaces. Delivering Excellence.</p>
          <div className="hero-cta">
            <button className="btn btn-gold" onClick={() => navigate('/consultation')}>Book Free Consultation →</button>
            <button className="btn btn-outline" onClick={() => navigate('/projects')}>Explore Our Work</button>
          </div>
          <div className="hero-meta">
            <div className="hm-item"><strong><Counter target={12} suffix="+" /></strong><span>Years of Craft</span></div>
            <div className="hm-item"><strong><Counter target={350} suffix="+" /></strong><span>Projects Delivered</span></div>
            <div className="hm-item"><strong><Counter target={98} suffix="%" /></strong><span>On-Time Handover</span></div>
            <div className="hm-item"><strong>★ 4.9</strong><span>Client Rating</span></div>
          </div>
        </div>

        <div className="hero-side">
          {HERO_SLIDES.map((_, idx) => (
            <button key={idx} className={`hero-dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)} />
          ))}
        </div>
        <div className="scroll-hint">Scroll</div>
      </section>

      <section className="sec sec-ivory">
        <div className="container">
          <div className="eyebrow">About Skystar</div>
          <h2 className="sec-title">Transforming Spaces, <em>Enriching Lives.</em></h2>
          <p className="sec-sub">A full-service luxury interior studio led by Director Dhananjay Singh — blending architecture, craftsmanship and heartfelt hospitality.</p>

          <div className="about-grid">
            <Reveal>
              <div className="about-media">
                <div className="exp-badge"><strong>12+</strong><span>Years<br />of Excellence</span></div>
                <div className="main-img"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="Luxury living room" loading="lazy" /></div>
                <div className="small-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" alt="Premium bedroom" loading="lazy" /></div>
              </div>
            </Reveal>

            <Reveal delay="reveal-d1">
              <div className="about-copy">
                <div className="eyebrow left">Designing Spaces, Elevating Lifestyles</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', color: 'var(--navy)', lineHeight: '1.3' }}>
                  We don't just design interiors,<br />we design <span style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>experiences.</span>
                </h3>
                <p>Skystar Interiors Pvt. Ltd. is Bihar's premier luxury interior firm delivering end-to-end design — from space planning and 3D visualization to modular furniture, lighting and turnkey execution.</p>
                <div className="about-list">
                  <div><svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z" /></svg>In-house design + build team</div>
                  <div><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-2 16l-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9l-8 8z" /></svg>Branded materials only</div>
                  <div><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" /></svg>Transparent pricing</div>
                  <div><svg viewBox="0 0 24 24"><path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-2h6v2H10V4zm10 17H4V8h16v13z" /></svg>10-year warranty support</div>
                </div>

                <div className="director-quote">
                  <p>"Great design is not just about beautiful spaces, it's about creating places that inspire and elevate life."</p>
                  <cite>— Dhananjay Singh, Director</cite>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-navy" onClick={() => navigate('/about')}>Our Story</button>
                  <button className="btn btn-light-gold" onClick={() => navigate('/consultation')}>Talk to Designer</button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="stats-row">
              <div className="stat"><strong><Counter target={350} suffix="+" /></strong><span>Projects Completed</span></div>
              <div className="stat"><strong><Counter target={120} suffix="+" /></strong><span>Happy Families</span></div>
              <div className="stat"><strong><Counter target={45} suffix="+" /></strong><span>Commercial Spaces</span></div>
              <div className="stat"><strong><Counter target={15} suffix="+" /></strong><span>Cities Served</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">Our Services</div>
          <h2 className="sec-title">Complete Design &amp; Build <em>Under One Roof</em></h2>
          <p className="sec-sub">Six specialised studios, one accountable team. Click any service for scope, process &amp; pricing.</p>
          <div className="services-grid">
            {SERVICES.map((service) => <ServiceCard key={service.id} service={service} onClick={setModalService} />)}
          </div>
        </div>
      </section>

      <section className="sec sec-ivory" style={{ paddingTop: '90px' }}>
        <div className="container">
          <div className="eyebrow">Our Projects</div>
          <h2 className="sec-title">Featured <em>Portfolio</em></h2>
          <p className="sec-sub">Residential • Commercial • Retail • Hospitality — filter to explore our signature work.</p>

          <div className="filter-bar">
            {['all', 'Residential', 'Commercial', 'Retail', 'Hospitality'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => navigate(`/project/${project.id}`)} />
            ))}
          </div>

          <div className="view-all"><button className="btn btn-navy" onClick={() => navigate('/projects')}>View All Projects →</button></div>
        </div>
      </section>

      <section className="sec why">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--gold-2)' }}>Why Choose Us</div>
          <h2 className="sec-title">We Don't Just Design Interiors,<br /><span style={{ color: 'var(--gold-2)', fontStyle: 'italic' }}>We Design Experiences.</span></h2>
          <div className="why-grid">
            {[
              { title: 'Client-Centric Approach', desc: 'Dedicated designer, weekly video updates & a single point of contact from concept to keys.', icon: 'M9 8a3.2 3.2 0 106.4 0 3.2 3.2 0 00-6.4 0zM17 9a2.4 2.4 0 100-4.8 2.4 2.4 0 000 4.8zM2.5 19c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5' },
              { title: 'Premium Quality', desc: 'Hettich, Hafele, Century & Asian Paints — branded materials with up to 10-year warranty.', icon: 'M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM12 7a5 5 0 100 10 5 5 0 000-10z' },
              { title: 'Innovative Designs', desc: 'Photorealistic 3D, VR walkthroughs & Vaastu-aligned modern aesthetics tailored to you.', icon: 'M9 21h6v-1H9v1zm3-19a7 7 0 00-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0012 2z' },
              { title: 'On-Time Delivery', desc: '45-day modular & 90-day turnkey promise with penalty-backed project tracking.', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={`reveal-d${idx}`}>
                <div className="why-card">
                  <div className="why-icon"><svg viewBox="0 0 24 24"><path d={item.icon} /></svg></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="why-banner">Trusted Professionals • Premium Quality • Transparent Pricing • End-to-End Support<small>Skystar's signature banner promise</small></div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">How We Work</div>
          <h2 className="sec-title">A Seamless <em>Design Process</em></h2>
          <p className="sec-sub">Six steps. Zero stress. Complete transparency from first call to final polish.</p>
          <div className="process-track">
            {PROCESS_STEPS.map((step) => <ProcessStep key={step.num} step={step} />)}
          </div>
          <div className="view-all"><button className="btn btn-light-gold" onClick={() => navigate('/process')}>See Detailed Process</button></div>
        </div>
      </section>

      <section className="sec philo" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <Reveal>
            <div className="philo-inner">
              <span className="quote-mark">"</span>
              <blockquote>The details are not the details.<br />They make the design.</blockquote>
              <cite>— Charles Eames • Our Design Philosophy</cite>
            </div>
          </Reveal>

          <div className="trust-strip" style={{ marginTop: '36px' }}>
            <div><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" /></svg>Trusted Professionals</div>
            <div><svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z" /></svg>Premium Quality</div>
            <div><svg viewBox="0 0 24 24"><path d="M11.5 2C6.8 2 3 5.8 3 10.5S6.8 19 11.5 19c.9 0 1.8-.1 2.6-.4l3.4 2.1-.6-3.2c1.5-1.4 2.6-3.5 2.6-5.9C19.5 6 16 2 11.5 2z" /></svg>Transparent Pricing</div>
            <div><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 017 7c0 2.4-1.2 4.2-2.6 5.7-.7.8-1.4 1.6-1.9 2.6-.3.6-.5 1.4-.5 2.2H10c0-.8-.2-1.6-.5-2.2-.5-1-1.2-1.8-1.9-2.6C6.2 13.2 5 11.4 5 9a7 7 0 017-7z" /></svg>End-to-End Support</div>
          </div>
        </div>
      </section>

      <section className="sec sec-ivory">
        <div className="container">
          <Estimator />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">Client Love</div>
          <h2 className="sec-title">Stories From <em>Beautiful Homes</em></h2>

          <div className="testi-wrap">
            <div className="testi-track" style={{ transform: `translateX(-${testiIndex * 100}%)` }}>
              {TESTIMONIALS.map((item) => <TestimonialCard key={item.name} testimonial={item} />)}
            </div>
          </div>

          <div className="testi-nav">
            <button className="t-btn" onClick={() => setTestiIndex((i) => i === 0 ? TESTIMONIALS.length - 1 : i - 1)}>←</button>
            <button className="t-btn" onClick={() => setTestiIndex((i) => (i + 1) % TESTIMONIALS.length)}>→</button>
          </div>

          <div className="t-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} className={`t-dot ${idx === testiIndex ? 'active' : ''}`} onClick={() => setTestiIndex(idx)} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <section className="sec sec-white" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="eyebrow">Get In Touch</div>
          <h2 className="sec-title">Visit Our <em>Experience Studio</em></h2>
          <ContactForm />
        </div>
      </section>

      {modalService && (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setModalService(null); }}>
          <div className="modal-bg" onClick={() => setModalService(null)}></div>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalService(null)}>✕</button>
            <img className="top" src={modalService.img} alt={modalService.title} />
            <div className="modal-body">
              <span style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: '700' }}>{modalService.cat}</span>
              <h3>{modalService.title}</h3>
              <p style={{ color: 'var(--muted)', margin: '10px 0 16px', fontWeight: '300' }}>{modalService.desc}</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '8px', color: 'var(--navy)', fontSize: '15px', marginBottom: '18px' }}>
                {modalService.points.map((point, idx) => <li key={idx}>✓ {point}</li>)}
              </ul>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-gold btn-sm" onClick={() => { setModalService(null); navigate('/consultation'); }}>Get Quote →</button>
                <a href="tel:+916207283158" className="btn btn-navy btn-sm">Call Expert</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • About</span>
          <h1>Designing Spaces,<br /><span>Elevating Lifestyles.</span></h1>
          <p>The story, people and principles behind Bihar's most loved luxury interior studio.</p>
        </div>
      </div>

      <section className="sec sec-ivory">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <div className="about-copy">
                <div className="eyebrow left">Our Story Since 2013</div>
                <h2 className="sec-title left">From a Patna workshop to <em>Pan-India turnkey.</em></h2>
                <p style={{ color: '#4A576C', marginTop: '14px', fontWeight: '300' }}>Founded with two carpenters and one drafting table, Skystar Interiors Pvt. Ltd. today runs its own modular factory, 3D studio and 40+ site crew — delivering homes, offices, showrooms and restaurants that feel deeply personal yet unmistakably premium.</p>
                <p style={{ color: '#4A576C', fontWeight: '300' }}>We believe luxury is not gold paint — it's perfect joints, silent channels, honest pricing and light that flatters life.</p>
                <div style={{ display: 'flex', gap: '32px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <div><strong style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--navy)' }}>350+</strong><br /><span style={{ fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Projects</span></div>
                  <div><strong style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--navy)' }}>40+</strong><br /><span style={{ fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>In-house Team</span></div>
                  <div><strong style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--navy)' }}>10yr</strong><br /><span style={{ fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Warranty</span></div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="about-media">
                <div className="main-img"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop" alt="Skystar studio" loading="lazy" /></div>
                <div className="small-img"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" alt="Craft detail" loading="lazy" /></div>
              </div>
            </Reveal>
          </div>

          <div className="values-grid">
            {[
              { icon: '◈', title: 'Craft First', desc: 'Factory-finished modules, seasoned timber, laser-measured sites. No jugaad, ever.' },
              { icon: '♡', title: 'Client Family', desc: '78% of our work comes from referrals. We treat your home like our own drawing room.' },
              { icon: '✦', title: 'Honest Luxury', desc: 'Itemised BOQ, branded materials, daily photo updates. What we quote is what you get.' },
            ].map((value, idx) => (
              <Reveal key={idx} delay={`reveal-d${idx}`}>
                <div className="value-card">
                  <div style={{ fontSize: '34px', color: 'var(--gold-dark)' }}>{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="sec-title" style={{ marginTop: '70px' }}>Meet Our <em>Leadership</em></h2>
          <div className="team-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', role: 'Founder & Director', name: 'Dhananjay Singh', desc: 'Vision, client relations & turnkey delivery. 12+ years shaping premium Bihar.' },
              { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', role: 'Principal Designer', name: 'Anjali Verma', desc: 'Residential storytelling, colour psychology & bespoke furniture curation.' },
              { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', role: 'Head – Projects', name: 'Rohit Kumar', desc: 'Execution, QC checklists & on-time handover across 15+ cities.' },
            ].map((member, idx) => (
              <Reveal key={idx} delay={`reveal-d${idx}`}>
                <div className="team-card">
                  <img src={member.img} alt={member.name} loading="lazy" />
                  <div className="t-body">
                    <span>{member.role}</span>
                    <h3>{member.name}</h3>
                    <p>{member.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

function ServicesPage() {
  const { navigate } = useRouter();
  const [modalService, setModalService] = useState(null);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Services</span>
          <h1>Services Crafted for <span>Every Space.</span></h1>
          <p>Design, build, furnish &amp; light — six studios, one accountable contract.</p>
        </div>
      </div>

      <section className="sec sec-white">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((service) => <ServiceCard key={service.id} service={service} onClick={setModalService} />)}
          </div>

          <Reveal>
            <div className="estimator" style={{ marginTop: '60px' }}>
              <div>
                <div className="eyebrow left" style={{ color: 'var(--gold-2)' }}>Why Bundle With Us</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px' }}>One team = <span style={{ color: 'var(--gold-2)' }}>zero blame-game.</span></h3>
                <p style={{ color: '#B9C4D6', fontWeight: '300', marginTop: '10px' }}>Civil, electrical, false ceiling, furniture &amp; decor managed by a single project manager with penalty-backed timelines.</p>
                <ul style={{ listStyle: 'none', marginTop: '16px', display: 'grid', gap: '10px', color: '#D9E0EC' }}>
                  <li>✓ Free 3D design with turnkey booking</li>
                  <li>✓ Branded plywood, hardware &amp; finishes</li>
                  <li>✓ Daily WhatsApp photo &amp; video updates</li>
                </ul>
              </div>

              <div className="est-result">
                <span>Starting From</span>
                <strong style={{ fontSize: '38px' }}>₹1,450<span style={{ fontSize: '20px' }}>/sq.ft</span></strong>
                <p style={{ color: '#9FB0C6', fontSize: '14px' }}>Modular • Turnkey from ₹1,950/sq.ft</p>
                <button className="btn btn-gold btn-sm" style={{ marginTop: '14px' }} onClick={() => navigate('/consultation')}>Get Detailed BOQ →</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {modalService && (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setModalService(null); }}>
          <div className="modal-bg" onClick={() => setModalService(null)}></div>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalService(null)}>✕</button>
            <img className="top" src={modalService.img} alt={modalService.title} />
            <div className="modal-body">
              <span style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: '700' }}>{modalService.cat}</span>
              <h3>{modalService.title}</h3>
              <p style={{ color: 'var(--muted)', margin: '10px 0 16px', fontWeight: '300' }}>{modalService.desc}</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '8px', color: 'var(--navy)', fontSize: '15px', marginBottom: '18px' }}>
                {modalService.points.map((point, idx) => <li key={idx}>✓ {point}</li>)}
              </ul>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-gold btn-sm" onClick={() => { setModalService(null); navigate('/consultation'); }}>Get Quote →</button>
                <a href="tel:+916207283158" className="btn btn-navy btn-sm">Call Expert</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsPage() {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PROJECTS.filter((project) => {
    const matchCat = activeFilter === 'all' || project.cat === activeFilter;
    const matchSearch = !search || project.title.toLowerCase().includes(search.toLowerCase()) || project.loc.toLowerCase().includes(search.toLowerCase()) || project.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Projects</span>
          <h1>Portfolio of <span>Quiet Luxury.</span></h1>
          <p>Filter by typology. Click any project for scope, materials, timeline &amp; gallery.</p>
        </div>
      </div>

      <section className="sec sec-ivory">
        <div className="container">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
            <input id="projSearch" placeholder="Search — e.g. Patna, villa, cafe..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: '380px', width: '100%', padding: '13px 20px', borderRadius: '100px', border: '1px solid #D9CDAE', background: '#fff', fontFamily: 'inherit', outline: 'none' }} />
          </div>

          <div className="filter-bar">
            {['all', 'Residential', 'Commercial', 'Retail', 'Hospitality'].map((filter) => (
              <button key={filter} className={`filter-btn ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>

          <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {filtered.map((project) => <ProjectCard key={project.id} project={project} onClick={() => navigate(`/project/${project.id}`)} />)}
          </div>

          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '20px' }}>No projects match your search. Try "Patna" or "Villa".</p>}
        </div>
      </section>
    </div>
  );
}

function ProjectDetailsPage({ projectId }) {
  const { navigate } = useRouter();
  const project = PROJECTS.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="page-enter">
        <div className="container" style={{ padding: '100px 28px', textAlign: 'center' }}>
          <h2>Project not found</h2>
          <button className="btn btn-navy" onClick={() => navigate('/projects')}>← Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ height: '52vh', minHeight: '380px', backgroundImage: `url('${project.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top,rgba(4,18,36,.92),rgba(4,18,36,.2))' }}></div>
        <div style={{ position: 'relative', zIndex: '2', maxWidth: '1280px', margin: 'auto', padding: '0 28px 36px', width: '100%', color: '#fff' }}>
          <span className="crumb" style={{ borderColor: 'var(--line)' }}><button className="crumb-link" onClick={() => navigate('/')}>Home</button> • <button className="crumb-link" onClick={() => navigate('/projects')}>Projects</button> • {project.title}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: '1.1' }}>{project.title}</h1>
        </div>
      </div>

      <section className="sec sec-ivory" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', margin: '26px 0', background: '#fff', border: '1px solid #E9E1CC', borderRadius: '16px', padding: '22px' }}>
            {[
              { label: 'Category', value: project.cat },
              { label: 'Location', value: project.loc.split('•')[0].trim() },
              { label: 'Timeline', value: project.time },
              { label: 'Investment', value: project.budget },
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center', borderRight: idx < 3 ? '1px solid #EDE4CC' : 'none' }}>
                <small style={{ display: 'block', fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: '700' }}>{item.label}</small>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--navy)' }}>{item.value}</strong>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .8fr', gap: '28px', marginBottom: '40px' }}>
            <div>
              <p style={{ color: '#4A576C', fontSize: '17px', fontWeight: '300', marginBottom: '24px' }}>{project.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {project.gallery.map((image, idx) => (
                  <img key={idx} src={image} alt={`${project.title} gallery ${idx + 1}`} loading="lazy" style={{ borderRadius: '14px', height: idx === 0 ? '340px' : '240px', width: '100%', objectFit: 'cover', gridColumn: idx === 0 ? 'span 2' : 'span 1', cursor: 'zoom-in', transition: '.4s', border: '1px solid var(--line-soft)' }} />
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--navy)', borderRadius: '18px', padding: '30px', color: '#fff', border: '1px solid var(--gold)', height: 'fit-content', position: 'sticky', top: '110px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold-2)', marginBottom: '10px' }}>Project Scope</h3>
              <p style={{ color: '#CBD4E2', fontWeight: '300', fontSize: '15px' }}>{project.desc}</p>
              <h4 style={{ margin: '18px 0 8px', fontSize: '13px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-2)' }}>Deliverables</h4>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '6px', color: '#D9E0EC', fontSize: '14.5px' }}>
                {project.scope.map((item, idx) => <li key={idx}>✓ {item}</li>)}
              </ul>
              <button className="btn btn-gold btn-sm" style={{ width: '100%', marginTop: '20px' }} onClick={() => navigate('/consultation')}>Start Similar Project →</button>
              <a href="tel:+916207283158" className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '10px', textAlign: 'center', display: 'block' }}>Call 6207283158</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProcessPage() {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'How long does a full home take?', a: 'Modular-only homes: 35–45 days. Full turnkey 2/3 BHK: 75–90 days. Villas & commercial: 90–140 days with a penalty-backed schedule shared upfront.' },
    { q: 'Do you work outside Bihar?', a: 'Yes — we deliver across Jharkhand, UP, West Bengal & Delhi-NCR with our travelling execution crew and local support partners.' },
    { q: 'What brands & warranty do you offer?', a: 'Century / Greenply, Hettich / Hafele, Asian Paints / Berger, Philips / Wipro lighting. Up to 10-year warranty on modular woodwork, 1-year free service.' },
    { q: 'Is 3D design charged separately?', a: 'Photorealistic 3D + VR walkthrough is complimentary with turnkey booking, or ₹49/sq.ft standalone (adjusted on execution).' },
    { q: 'How do payments work?', a: '10% booking • 40% on material arrival • 40% stage-wise • 10% on handover. 100% GST-billed, milestone-linked, no hidden extras.' },
  ];

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Process</span>
          <h1>From First Call to <span>Final Polish.</span></h1>
          <p>A proven 6-stage system refined over 350+ handovers.</p>
        </div>
      </div>

      <section className="sec sec-white">
        <div className="container">
          <div className="process-track" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {PROCESS_STEPS.map((step) => <ProcessStep key={step.num} step={step} />)}
          </div>

          <h2 className="sec-title" style={{ marginTop: '70px' }}>Questions, <em>Answered.</em></h2>
          <div className="faq">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span>{faq.q}</span><span>+</span>
                </button>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>

          <div className="view-all"><button className="btn btn-gold" onClick={() => navigate('/consultation')}>Start With Free Consultation →</button></div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    e.target.reset();
  };

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Contact</span>
          <h1>Let's Talk About <span>Your Space.</span></h1>
          <p>Call, WhatsApp, email or drop by our Patna experience studio.</p>
        </div>
      </div>

      <section className="sec sec-ivory">
        <div className="container">
          <div className="contact-grid">
            <div className="c-info">
              {[
                { icon: 'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z', title: 'Phone / WhatsApp', info: '6207283158', sub: 'Tap to call or chat instantly' },
                { icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', title: 'Email', info: 'info@skystarinteriors.com', sub: 'www.skystarinteriors.com' },
                { icon: 'M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z', title: 'Studio Address', info: 'Bihar, India', sub: 'Open Mon–Sat • 10am–7pm' },
              ].map((item, idx) => (
                <div key={idx} className="c-card">
                  <div className="ic"><svg viewBox="0 0 24 24"><path d={item.icon} /></svg></div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                    <small>{item.sub}</small>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/916207283158" target="_blank" rel="noreferrer" className="btn btn-gold btn-sm" style={{ flex: '1' }}>WhatsApp Us</a>
                <a href="tel:+916207283158" className="btn btn-navy btn-sm" style={{ flex: '1' }}>Call Now</a>
              </div>
            </div>

            <div className="form-card">
              <h3>Send an Enquiry</h3>
              <p>We respond within 4 working hours.</p>
              <form onSubmit={handleSubmit}>
                <div className="f-row">
                  <div className="f-group"><label>Name *</label><input name="name" placeholder="Your name" required /></div>
                  <div className="f-group"><label>Phone *</label><input name="phone" inputMode="numeric" placeholder="10-digit mobile" required /></div>
                </div>
                <div className="f-group"><label>Subject</label><select name="service"><option>Home Interior</option><option>Office</option><option>Retail / Restaurant</option><option>Renovation</option></select></div>
                <div className="f-group"><label>Message *</label><textarea name="message" placeholder="How can we help?" required /></div>
                <button className="btn btn-gold" style={{ width: '100%' }} type="submit">Send Message →</button>
              </form>
            </div>
          </div>

          <div style={{ borderRadius: '20px', overflow: 'hidden', marginTop: '26px', border: '1px solid var(--line)' }}>
            <iframe title="Studio map" src="https://www.google.com/maps?q=Boring+Road+Patna+Bihar&output=embed" style={{ width: '100%', height: '320px', border: '0' }} loading="lazy" />
          </div>
        </div>
      </section>

      {toast && <div className="toast show"><i>✓</i><span>Message sent! We'll get back to you within 4 hours.</span></div>}
    </div>
  );
}

function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('1:00 PM');
  const [toast, setToast] = useState(false);

  const dates = [];
  for (let i = 1; i <= 6; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
  }

  const times = ['11:00 AM', '1:00 PM', '4:00 PM', '6:00 PM', 'Video Call', 'Studio Visit'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Consultation</span>
          <h1>Book Your Free <span>Design Consultation.</span></h1>
          <p>45 minutes with a senior designer • Site measurement • Transparent estimate.</p>
        </div>
      </div>

      <section className="sec sec-ivory">
        <div className="container">
          <div className="consult-layout">
            <div className="consult-side">
              <h3>What you get, free.</h3>
              <p style={{ color: '#9FB0C6', fontWeight: '300' }}>No pushy sales. Just clarity on design, cost &amp; timeline.</p>
              <ul>
                <li><i>✓</i><span><b style={{ color: '#fff' }}>Site visit &amp; laser measurement</b><br />Patna &amp; nearby cities within 48 hrs</span></li>
                <li><i>✓</i><span><b style={{ color: '#fff' }}>Moodboards + 3D direction</b><br />See your style before you spend</span></li>
                <li><i>✓</i><span><b style={{ color: '#fff' }}>Itemised BOQ in 48 hours</b><br />Brand-wise, room-wise, no hidden lines</span></li>
                <li><i>✓</i><span><b style={{ color: '#fff' }}>Director review</b> — Dhananjay Singh<br />Every proposal is personally vetted</span></li>
              </ul>

              <div className="cta-phone" style={{ marginTop: '10px' }}>
                <div className="ic"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg></div>
                <div><span>Prefer to talk?</span><strong style={{ fontSize: '22px' }}>6207283158</strong></div>
              </div>
            </div>

            <div className="steps-card">
              <div className="progress-bar">
                <span className={step >= 1 ? 'on' : ''}></span>
                <span className={step >= 2 ? 'on' : ''}></span>
                <span className={step >= 3 ? 'on' : ''}></span>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step-pane on">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--navy)' }}>1 • What are we designing?</h3>
                    <div className="f-group" style={{ marginTop: '14px' }}>
                      <label>Project Type</label>
                      <div className="est-pills" style={{ marginTop: '6px' }}>
                        {['Full Home', 'Villa', 'Office', 'Retail / Cafe', 'Kitchen Only'].map((type, idx) => (
                          <button key={type} type="button" className={`est-pill ${idx === 0 ? 'active' : ''}`} style={{ color: 'var(--navy)', borderColor: '#D9CDAE' }} onClick={(e) => {
                            e.target.parentElement.querySelectorAll('.est-pill').forEach((pill) => pill.classList.remove('active'));
                            e.target.classList.add('active');
                          }}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="f-row">
                      <div className="f-group"><label>City *</label><input name="city" placeholder="e.g. Patna" required /></div>
                      <div className="f-group"><label>Size (sq.ft) *</label><input name="size" inputMode="numeric" placeholder="e.g. 1200" required /></div>
                    </div>
                    <div className="f-group">
                      <label>Budget Range</label>
                      <select name="budget">
                        <option>₹3 – ₹6 Lakh</option>
                        <option>₹6 – ₹12 Lakh</option>
                        <option selected>₹12 – ₹25 Lakh</option>
                        <option>₹25 Lakh+</option>
                      </select>
                    </div>
                    <button type="button" className="btn btn-navy" style={{ width: '100%' }} onClick={() => setStep(2)}>Continue →</button>
                  </div>
                )}

                {step === 2 && (
                  <div className="step-pane on">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--navy)' }}>2 • Pick your slot</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Free visit — online or at your site.</p>

                    <div className="f-group" style={{ marginTop: '12px' }}>
                      <label>Preferred Date</label>
                      <div className="slot-grid">
                        {dates.map((date) => (
                          <button key={date} type="button" className={`slot ${selectedDate === date ? 'sel' : ''}`} onClick={() => setSelectedDate(date)}>{date}</button>
                        ))}
                      </div>
                    </div>

                    <div className="f-group">
                      <label>Preferred Time</label>
                      <div className="slot-grid">
                        {times.map((time) => (
                          <button key={time} type="button" className={`slot ${selectedTime === time ? 'sel' : ''}`} onClick={() => setSelectedTime(time)}>{time}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" className="btn btn-light-gold" style={{ flex: '1' }} onClick={() => setStep(1)}>← Back</button>
                      <button type="button" className="btn btn-navy" style={{ flex: '2' }} onClick={() => setStep(3)}>Continue →</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="step-pane on">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--navy)' }}>3 • Your details</h3>
                    <div className="f-row" style={{ marginTop: '12px' }}>
                      <div className="f-group"><label>Name *</label><input name="name" placeholder="Full name" required /></div>
                      <div className="f-group"><label>Phone *</label><input name="phone" inputMode="numeric" placeholder="10-digit mobile" required /></div>
                    </div>
                    <div className="f-group"><label>Email</label><input name="email" type="email" placeholder="you@email.com" /></div>
                    <div className="f-group"><label>Anything we should know?</label><textarea name="note" style={{ minHeight: '80px' }} placeholder="Floor, possession date, style you love..." /></div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" className="btn btn-light-gold" style={{ flex: '1' }} onClick={() => setStep(2)}>← Back</button>
                      <button type="submit" className="btn btn-gold" style={{ flex: '2' }}>Confirm Booking ✓</button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="step-pane on" style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: '#E8F5E9', border: '2px solid #4CAF50', display: 'grid', placeItems: 'center', margin: '0 auto 16px', fontSize: '36px', color: '#2E7D32' }}>✓</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--navy)' }}>Booking Confirmed!</h3>
                    <p style={{ color: 'var(--muted)' }}>We'll call you shortly to confirm your {selectedTime} slot{selectedDate ? ` on ${selectedDate}` : ''}.</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '18px', flexWrap: 'wrap' }}>
                      <a href="https://wa.me/916207283158" target="_blank" rel="noreferrer" className="btn btn-navy btn-sm">Chat on WhatsApp</a>
                      <button className="btn btn-light-gold btn-sm" type="button" onClick={() => setStep(1)}>Book Again</button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {toast && <div className="toast show"><i>✓</i><span>Consultation booked! Our designer will call you shortly.</span></div>}
    </div>
  );
}

function App() {
  const { route } = useRouter();
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderPage = () => {
    if (route.startsWith('/project/')) {
      const projectId = route.split('/project/')[1];
      return <ProjectDetailsPage projectId={projectId} />;
    }

    switch (route) {
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/process':
        return <ProcessPage />;
      case '/contact':
        return <ContactPage />;
      case '/consultation':
        return <ConsultationPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <div className={`preloader ${!loading ? 'hide' : ''}`}>
        <div className="loader-mark"><span>S</span></div>
        <p>Skystar Interiors</p>
      </div>

      <Navbar />
      <main>{renderPage()}</main>
      <Footer />

      <a className="float-wa" href="https://wa.me/916207283158?text=Hi%20Skystar!%20I%20want%20a%20free%20design%20consultation." target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .1 0 .7-.1 1.4z" /></svg>
      </a>

      <button className={`float-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
    </>
  );
}

export default function AppRoot() {
  return (
    <Router>
      <App />
    </Router>
  );
}
