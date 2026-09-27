import './ServiceCard.css';

export default function ServiceCard({ service, onClick }) {
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
          <button>Learn More →</button>
          <span className="svc-price">{service.price}</span>
        </div>
      </div>
    </div>
  );
}
