import './ProjectCard.css';

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="proj" onClick={() => onClick(project)}>
      <div className="proj-img">
        <img src={project.img} alt={project.title} loading="lazy" />
        <span className="proj-badge">{project.cat}</span>
      </div>
      <div className="proj-info">
        <h3>{project.title}</h3>
        <p>{project.loc} • {project.time}</p>
      </div>
      <div className="proj-hover"><span>↗</span></div>
    </div>
  );
}
