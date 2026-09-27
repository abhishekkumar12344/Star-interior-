import { useState } from 'react';
import { useRouter } from '../../router/RouterContext.jsx';
import Toast from '../../components/Toast/Toast.jsx';
import './ConsultationPage.css';

const STEPS = ['Project', 'Space', 'Contact'];
const PROJECT_TYPES = ['Full Home Interior', 'Modular Kitchen Only', 'Office / Commercial', 'Retail / Showroom', 'Restaurant / Hospitality', 'Only 3D Design'];
const BUDGETS = ['Under ₹10 L', '₹10 L – ₹30 L', '₹30 L – ₹60 L', '₹60 L+'];

export default function ConsultationPage() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ projectType: '', area: '', budget: '', city: '', name: '', phone: '', email: '' });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-enter">
        <div className="sec sec-ivory" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="success-badge">✓</div>
            <h2 className="sec-title" style={{ marginTop: '22px' }}>Thank you, {form.name.split(' ')[0] || 'there'}!</h2>
            <p className="sec-sub">Our design expert will call you on <strong>{form.phone}</strong> within 4 working hours to schedule your free site visit.</p>
            <button className="btn btn-navy" style={{ marginTop: '26px' }} onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="page-hero" style={{ padding: '70px 0 40px' }}>
        <div className="container">
          <span className="crumb">Home • Consultation</span>
          <h1>Book Your Free <span>Consultation.</span></h1>
          <p>Three quick steps. No obligation. A designer calls you back today.</p>
        </div>
      </div>
      <section className="sec sec-white" style={{ paddingTop: '50px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="steps-bar">
            {STEPS.map((label, i) => (
              <div key={label} className={`step-pill ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <span>{i < step ? '✓' : i + 1}</span>{label}
              </div>
            ))}
          </div>

          <form className="wizard-card" onSubmit={handleSubmit}>
            {step === 0 && (
              <div>
                <h3>What are you looking to design?</h3>
                <div className="option-grid">
                  {PROJECT_TYPES.map(t => (
                    <button type="button" key={t} className={`opt-btn ${form.projectType === t ? 'active' : ''}`} onClick={() => update('projectType', t)}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3>Tell us about the space</h3>
                <div className="f-group">
                  <label>Carpet Area (approx. sq.ft)</label>
                  <input value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. 1500" inputMode="numeric" />
                </div>
                <div className="f-group">
                  <label>Budget Range</label>
                  <div className="option-grid">
                    {BUDGETS.map(b => (
                      <button type="button" key={b} className={`opt-btn ${form.budget === b ? 'active' : ''}`} onClick={() => update('budget', b)}>{b}</button>
                    ))}
                  </div>
                </div>
                <div className="f-group">
                  <label>City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="e.g. Patna" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>How should we reach you?</h3>
                <div className="f-group"><label>Full Name *</label><input value={form.name} onChange={e => update('name', e.target.value)} required placeholder="e.g. Priya Sharma" /></div>
                <div className="f-group"><label>Phone Number *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} required inputMode="numeric" placeholder="e.g. 98765 43210" /></div>
                <div className="f-group"><label>Email</label><input value={form.email} onChange={e => update('email', e.target.value)} type="email" placeholder="you@email.com" /></div>
              </div>
            )}

            <div className="wizard-nav">
              {step > 0 && <button type="button" className="btn btn-light-gold" onClick={back}>← Back</button>}
              <div style={{ flex: 1 }}></div>
              {step < STEPS.length - 1
                ? <button type="button" className="btn btn-navy" onClick={next}>Continue →</button>
                : <button type="submit" className="btn btn-gold">Book Free Consultation →</button>}
            </div>
          </form>
        </div>
      </section>
      {submitted && <Toast message="Request received!" />}
    </div>
  );
}
