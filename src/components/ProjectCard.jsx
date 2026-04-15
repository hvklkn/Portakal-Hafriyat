function ProjectCard({ title, location, scope, year, className = '' }) {
  return (
    <article className={`project-item ${className}`.trim()}>
      <div className="project-meta">
        <span>{location}</span>
        <span>{year}</span>
      </div>
      <h3>{title}</h3>
      <p>{scope}</p>
      <a href="#iletisim">Proje Detayı Talep Et</a>
    </article>
  )
}

export default ProjectCard
