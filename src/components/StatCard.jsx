function StatCard({ value, label }) {
  return (
    <article className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

export default StatCard
