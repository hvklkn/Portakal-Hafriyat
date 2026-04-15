function ProjectCard({ title, location, scope }) {
  return (
    <article className="card project-card">
      <p className="project-location">{location}</p>
      <h3>{title}</h3>
      <p>{scope}</p>
    </article>
  )
}

export default ProjectCard
