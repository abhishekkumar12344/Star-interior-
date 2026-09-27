import ProcessStep from '../../components/ProcessStep/ProcessStep.jsx';
import CTASection from '../../components/CTASection/CTASection.jsx';
import Reveal from '../../components/Reveal/Reveal.jsx';
import { PROCESS_STEPS } from '../../data/constants.js';
import './ProcessPage.css';

const DETAILS = [
  'A free 30-minute call (in person or video) where we learn your family size, lifestyle, style preference and realistic budget band — no pressure, no pushy sales.',
  'Our site team visits with laser measuring tools, checks electrical/plumbing points, natural light direction and Vaastu, all logged into a digital site report within 24 hours.',
  'You receive 2–3 moodboards, a material & colour palette and a 2D floor plan proposal. We revise until the layout truly fits how you live.',
  'Every room is rendered in photorealistic 4K, with an optional VR walkthrough — so you can "stand" inside your new kitchen before a single board is cut.',
  'Factory production begins alongside site prep. You get WhatsApp photo/video updates daily and a dedicated project manager for any question.',
  'Deep clean, snag-list walkthrough with you, styling of soft furnishings, and activation of your 10-year hardware warranty & AMC option.'
];

export default function ProcessPage() {
  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Process</span>
          <h1>From First Call to <span>Final Polish.</span></h1>
          <p>A transparent, six-stage journey designed to remove every ounce of renovation stress.</p>
        </div>
      </div>
      <section className="sec sec-white">
        <div className="container">
          <div className="process-track">
            {PROCESS_STEPS.map(step => <ProcessStep key={step.num} step={step} />)}
          </div>
        </div>
      </section>
      <section className="sec sec-ivory">
        <div className="container">
          <div className="timeline">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={`reveal-d${i % 3}`}>
                <div className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="tl-num">{step.num}</div>
                  <div className="tl-body">
                    <h3>{step.title}</h3>
                    <p>{DETAILS[i]}</p>
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
