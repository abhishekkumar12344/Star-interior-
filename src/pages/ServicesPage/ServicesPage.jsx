import { useState } from 'react';
import { useRouter } from '../../router/RouterContext.jsx';
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx';
import ServiceModal from '../../components/ServiceModal/ServiceModal.jsx';
import Reveal from '../../components/Reveal/Reveal.jsx';
import { SERVICES } from '../../data/constants.js';
import './ServicesPage.css';

export default function ServicesPage() {
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
            {SERVICES.map(svc => <ServiceCard key={svc.id} service={svc} onClick={setModalService} />)}
          </div>
          <Reveal>
            <div className="estimator-banner">
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
      <ServiceModal service={modalService} onClose={() => setModalService(null)} />
    </div>
  );
}
