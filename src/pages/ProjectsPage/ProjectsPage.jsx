import { useState } from 'react';
import { useRouter } from '../../router/RouterContext.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import CTASection from '../../components/CTASection/CTASection.jsx';
import { PROJECTS } from '../../data/constants.js';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: '0', backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '.22' }}></div>
        <div className="container">
          <span className="crumb">Home • Projects</span>
          <h1>A Portfolio Built on <span>Trust.</span></h1>
          <p>350+ residences, offices, showrooms &amp; restaurants delivered across Bihar &amp; beyond.</p>
        </div>
      </div>
      <section className="sec sec-white">
        <div className="container">
          <div className="filter-bar">
            {['all', 'Residential', 'Commercial', 'Retail', 'Hospitality'].map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f === 'all' ? 'All Projects' : f}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map(proj => (
              <ProjectCard key={proj.id} project={proj} onClick={() => navigate(`/project/${proj.id}`)} />
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '40px' }}>No projects in this category yet.</p>}
        </div>
      </section>
      <CTASection />
    </div>
  );
}
