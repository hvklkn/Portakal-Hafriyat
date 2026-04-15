function AdvantageCard({ step, title, description }) {
  return (
    <article className="process-card">
      <span className="process-step">{String(step).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default AdvantageCard
