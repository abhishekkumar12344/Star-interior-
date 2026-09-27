import { useState } from 'react';
import Reveal from '../Reveal/Reveal.jsx';
import Toast from '../Toast/Toast.jsx';
import './ContactForm.css';

const CONTACT_ITEMS = [
  { icon: 'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z', title: 'Call Us', info: '6207283158', sub: 'Mon–Sat, 10am–7pm' },
  { icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', title: 'Email', info: 'info@skystarinteriors.com', sub: 'Reply within 4 working hours' },
  { icon: 'M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z', title: 'Studio', info: 'Bihar, India', sub: 'www.skystarinteriors.com' }
];

export default function ContactForm() {
  const [toast, setToast] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setToast(true); setTimeout(() => setToast(false), 3000); e.target.reset(); };

  return (
    <>
      <div className="contact-grid">
        <div className="c-info">
          {CONTACT_ITEMS.map((item, i) => (
            <Reveal key={i}>
              <div className="c-card">
                <div className="ic"><svg viewBox="0 0 24 24"><path d={item.icon} /></svg></div>
                <div><h4>{item.title}</h4><p>{item.info}</p><small>{item.sub}</small></div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)' }}>
            <iframe title="Map Bihar" src="https://www.google.com/maps?q=Patna,Bihar,India&output=embed" style={{ width: '100%', height: '190px', border: '0' }} loading="lazy"></iframe>
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
                <div className="f-group"><label>Service Needed</label>
                  <select name="service">
                    <option>Full Home Interiors</option>
                    <option>Modular Kitchen</option>
                    <option>Office / Commercial</option>
                    <option>Retail / Hospitality</option>
                    <option>Only 3D Design</option>
                  </select>
                </div>
              </div>
              <div className="f-group"><label>Message *</label><textarea name="message" placeholder="Plot / flat size, city, budget, timeline..." required></textarea></div>
              <button className="btn btn-navy" style={{ width: '100%' }} type="submit">Send Request →</button>
            </form>
          </div>
        </Reveal>
      </div>
      {toast && <Toast message="Thank you! Our designer will call you shortly." />}
    </>
  );
}
