import { useRouter } from '../../router/RouterContext.jsx';
import './ServiceModal.css';

export default function ServiceModal({ service, onClose }) {
  const { navigate } = useRouter();
  if (!service) return null;

  return (
    <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-bg" onClick={onClose}></div>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <img className="top" src={service.img} alt={service.title} />
        <div className="modal-body">
          <span style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: '700' }}>{service.cat}</span>
          <h3>{service.title}</h3>
          <p style={{ color: 'var(--muted)', margin: '10px 0 16px', fontWeight: '300' }}>{service.desc}</p>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '8px', color: 'var(--navy)', fontSize: '15px', marginBottom: '18px' }}>
            {service.points.map((p, i) => <li key={i}>✓ {p}</li>)}
          </ul>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-sm" onClick={() => { onClose(); navigate('/consultation'); }}>Get Quote →</button>
            <a href="tel:+916207283158" className="btn btn-navy btn-sm">Call Expert</a>
          </div>
        </div>
      </div>
    </div>
  );
}
