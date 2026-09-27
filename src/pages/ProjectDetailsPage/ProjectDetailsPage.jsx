import { useRouter } from '../../router/RouterContext.jsx';
import CTASection from '../../components/CTASection/CTASection.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import { PROJECTS } from '../../data/constants.js';
import './ProjectDetailsPage.css';

export default function ProjectDetailsPage({ id }) {
  const { navigate } = useRouter();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="page-enter container" style={{ padding: '140px 28px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--navy)' }}>Project not found</h2>
        <button className="btn btn-navy" style={{ marginTop: '20px' }} onClick={() => navigate('/projects')}>← Back to Projects</button>
      </div>
    );
  }

  const related = PROJECTS.filter(p => p.cat === project.cat && p.id !== project.id).slice(0, 3);

  return (
    <div className="page-enter">
      <div className="pd-hero" style={{ backgroundImage: `url('${project.img}')` }}>
        <div className="pd-hero-overlay"></div>
        <div className="container pd-hero-content">
          <span className="crumb" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>← All Projects</span>
          <span className="proj-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '14px' }}>{project.cat}</span>
          <h1>{project.title}</h1>
          <p>{project.loc}</p>
        </div>
      </div>
      <section className="sec sec-white">
        <div className="container">
          <div className="pd-grid">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', color: 'var(--navy)' }}>Project Overview</h2>
              <p style={{ color: 'var(--muted)', fontWeight: '300', margin: '14px 0 26px', fontSize: '17px' }}>{project.desc}</p>
              <div className="pd-gallery">
                {project.gallery.map((img, i) => <img key={i} src={img} alt={`${project.title} view ${i + 1}`} loading="lazy" />)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--navy)', marginTop: '32px' }}>Scope of Work</h3>
              <ul className="pd-scope">
                {project.scope.map((s, i) => <li key={i}>✓ {s}</li>)}
              </ul>
            </div>
            <aside className="pd-sidebar">
              <div className="pd-fact"><span>Category</span><strong>{project.cat}</strong></div>
              <div className="pd-fact"><span>Location</span><strong>{project.loc}</strong></div>
              <div className="pd-fact"><span>Completion Time</span><strong>{project.time}</strong></div>
              <div className="pd-fact"><span>Project Investment</span><strong>{project.budget}</strong></div>
              <button className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }} onClick={() => navigate('/consultation')}>Start Similar Project →</button>
              <a href="tel:+916207283158" className="btn btn-navy" style={{ width: '100%' }}>Call 6207283158</a>
            </aside>
          </div>
          {related.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <h2 className="sec-title left" style={{ marginBottom: '30px' }}>More <em>{project.cat}</em> Projects</h2>
              <div className="projects-grid" style={{ gridTemplateColumns: `repeat(${related.length}, 1fr)` }}>
                {related.map(p => <ProjectCard key={p.id} project={p} onClick={() => navigate(`/project/${p.id}`)} />)}
              </div>
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </div>
  );
}
