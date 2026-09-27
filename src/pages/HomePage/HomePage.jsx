import { useState, useEffect } from 'react';
import { useRouter } from '../../router/RouterContext.jsx';
import Reveal from '../../components/Reveal/Reveal.jsx';
import Counter from '../../components/Counter/Counter.jsx';
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import ProcessStep from '../../components/ProcessStep/ProcessStep.jsx';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard.jsx';
import CTASection from '../../components/CTASection/CTASection.jsx';
import Estimator from '../../components/Estimator/Estimator.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import ServiceModal from '../../components/ServiceModal/ServiceModal.jsx';
import directorPhoto from '../../assets/director.jpg';
import { SERVICES, PROJECTS, TESTIMONIALS, PROCESS_STEPS, HERO_SLIDES } from '../../data/constants.js';
import './HomePage.css';

const WHY_ITEMS = [
  { title: 'Client-Centric Approach', desc: 'Dedicated designer, weekly video updates & a single point of contact from concept to keys.', icon: 'M9 8a3.2 3.2 0 106.4 0 3.2 3.2 0 00-6.4 0zM17 9a2.4 2.4 0 100-4.8 2.4 2.4 0 000 4.8zM2.5 19c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5' },
  { title: 'Premium Quality', desc: 'Hettich, Hafele, Century & Asian Paints — branded materials with up to 10-year warranty.', icon: 'M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM12 7a5 5 0 100 10 5 5 0 000-10z' },
  { title: 'Innovative Designs', desc: 'Photorealistic 3D, VR walkthroughs & Vaastu-aligned modern aesthetics tailored to you.', icon: 'M9 21h6v-1H9v1zm3-19a7 7 0 00-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0012 2z' },
  { title: 'On-Time Delivery', desc: '45-day modular & 90-day turnkey promise with penalty-backed project tracking.', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' }
];

const ABOUT_LIST = [
  { icon: 'M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z', label: 'In-house design + build team' },
  { icon: 'M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-2 16l-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9l-8 8z', label: 'Branded materials only' },
  { icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z', label: 'Transparent pricing' },
  { icon: 'M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-2h6v2H10V4zm10 17H4V8h16v13z', label: '10-year warranty support' }
];

export default function HomePage() {
  const { navigate } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalService, setModalService] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects = activeFilter === 'all' ? PROJECTS.slice(0, 4) : PROJECTS.filter(p => p.cat === activeFilter).slice(0, 4);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-gold-line"></div>
        <div className="hero-slides">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url('${slide}')` }}></div>
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
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></button>
          ))}
        </div>
        <div className="scroll-hint">Scroll</div>
      </section>

      {/* About */}
      <section className="sec sec-ivory">
        <div className="container">
          <div className="eyebrow">About Skystar</div>
          <h2 className="sec-title">Transforming Spaces, <em>Enriching Lives.</em></h2>
          <p className="sec-sub">A full-service luxury interior studio led by Director Dhananjay Singh — blending architecture, craftsmanship and heartfelt hospitality.</p>
          <div className="about-grid">
            <Reveal>
              <div className="about-media">
                <div className="exp-badge"><strong>12+</strong><span>Years<br />of Excellence</span></div>
                <div className="main-img"><img src={directorPhoto} alt="Dhananjay Singh, Director of Skystar Interiors" loading="lazy" /></div>
                <div className="small-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" alt="Premium bedroom" loading="lazy" /></div>
              </div>
            </Reveal>
            <Reveal delay="reveal-d1">
              <div className="about-copy">
                <div className="eyebrow left">Designing Spaces, Elevating Lifestyles</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', color: 'var(--navy)', lineHeight: '1.3' }}>We don't just design interiors,<br />we design <span style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>experiences.</span></h3>
                <p>Skystar Interiors Pvt. Ltd. is Bihar's premier luxury interior firm delivering end-to-end design — from space planning and 3D visualization to modular furniture, lighting and turnkey execution.</p>
                <div className="about-list">
                  {ABOUT_LIST.map((item, i) => (
                    <div key={i}><svg viewBox="0 0 24 24"><path d={item.icon} /></svg>{item.label}</div>
                  ))}
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

      {/* Services */}
      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">Our Services</div>
          <h2 className="sec-title">Complete Design &amp; Build <em>Under One Roof</em></h2>
          <p className="sec-sub">Six specialised studios, one accountable team. Click any service for scope, process &amp; pricing.</p>
          <div className="services-grid">
            {SERVICES.map(svc => <ServiceCard key={svc.id} service={svc} onClick={setModalService} />)}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="sec sec-ivory" style={{ paddingTop: '90px' }}>
        <div className="container">
          <div className="eyebrow">Our Projects</div>
          <h2 className="sec-title">Featured <em>Portfolio</em></h2>
          <p className="sec-sub">Residential • Commercial • Retail • Hospitality — filter to explore our signature work.</p>
          <div className="filter-bar">
            {['all', 'Residential', 'Commercial', 'Retail', 'Hospitality'].map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f === 'all' ? 'All' : f}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filteredProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} onClick={() => navigate(`/project/${proj.id}`)} />
            ))}
          </div>
          <div className="view-all"><button className="btn btn-navy" onClick={() => navigate('/projects')}>View All Projects →</button></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="sec why">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--gold-2)' }}>Why Choose Us</div>
          <h2 className="sec-title">We Don't Just Design Interiors,<br /><span style={{ color: 'var(--gold-2)', fontStyle: 'italic' }}>We Design Experiences.</span></h2>
          <div className="why-grid">
            {WHY_ITEMS.map((item, i) => (
              <Reveal key={i} delay={`reveal-d${i}`}>
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

      {/* Process */}
      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">How We Work</div>
          <h2 className="sec-title">A Seamless <em>Design Process</em></h2>
          <p className="sec-sub">Six steps. Zero stress. Complete transparency from first call to final polish.</p>
          <div className="process-track">
            {PROCESS_STEPS.map(step => <ProcessStep key={step.num} step={step} />)}
          </div>
          <div className="view-all"><button className="btn btn-light-gold" onClick={() => navigate('/process')}>See Detailed Process</button></div>
        </div>
      </section>

      {/* Philosophy */}
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

      {/* Estimator */}
      <section className="sec sec-ivory">
        <div className="container">
          <Estimator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="sec sec-white">
        <div className="container">
          <div className="eyebrow">Client Love</div>
          <h2 className="sec-title">Stories From <em>Beautiful Homes</em></h2>
          <div className="testi-wrap">
            <div className="testi-track" style={{ transform: `translateX(-${testiIndex * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
            </div>
          </div>
          <div className="testi-nav">
            <button className="t-btn" onClick={() => setTestiIndex(i => i === 0 ? TESTIMONIALS.length - 1 : i - 1)}>←</button>
            <button className="t-btn" onClick={() => setTestiIndex(i => (i + 1) % TESTIMONIALS.length)}>→</button>
          </div>
          <div className="t-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`t-dot ${i === testiIndex ? 'active' : ''}`} onClick={() => setTestiIndex(i)}></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

      {/* Contact */}
      <section className="sec sec-white" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="eyebrow">Get In Touch</div>
          <h2 className="sec-title">Visit Our <em>Experience Studio</em></h2>
          <ContactForm />
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={modalService} onClose={() => setModalService(null)} />
    </div>
  );
}
