import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import './ContactPage.css';

export default function ContactPage() {
  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Contact</span>
          <h1>Let's Talk About <span>Your Space.</span></h1>
          <p>Free consultation • Free site visit • Reply within 4 working hours.</p>
        </div>
      </div>
      <section className="sec sec-white">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
