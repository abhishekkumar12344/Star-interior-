import Reveal from '../../components/Reveal/Reveal.jsx';
import CTASection from '../../components/CTASection/CTASection.jsx';
import directorPhoto from '../../assets/director.jpg';
import './AboutPage.css';

const VALUES = [
  { icon: '◈', title: 'Craft First', desc: 'Factory-finished modules, seasoned timber, laser-measured sites. No jugaad, ever.' },
  { icon: '♡', title: 'Client Family', desc: "78% of our work comes from referrals. We treat your home like our own drawing room." },
  { icon: '✦', title: 'Honest Luxury', desc: 'Itemised BOQ, branded materials, daily photo updates. What we quote is what you get.' }
];

const TEAM = [
  { img: directorPhoto, role: 'Founder & Director', name: 'Dhananjay Singh', desc: 'Vision, client relations & turnkey delivery. 12+ years shaping premium Bihar.' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', role: 'Principal Designer', name: 'Anjali Verma', desc: 'Residential storytelling, colour psychology & bespoke furniture curation.' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', role: 'Head – Projects', name: 'Rohit Kumar', desc: 'Execution, QC checklists & on-time handover across 15+ cities.' }
];

export default function AboutPage() {
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
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={`reveal-d${i}`}>
                <div className="value-card"><div style={{ fontSize: '34px', color: 'var(--gold-dark)' }}>{v.icon}</div><h3>{v.title}</h3><p>{v.desc}</p></div>
              </Reveal>
            ))}
          </div>
          <h2 className="sec-title" style={{ marginTop: '70px' }}>Meet Our <em>Leadership</em></h2>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <Reveal key={i} delay={`reveal-d${i}`}>
                <div className="team-card">
                  <img src={t.img} alt={t.name} loading="lazy" />
                  <div className="t-body"><span>{t.role}</span><h3>{t.name}</h3><p>{t.desc}</p></div>
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
