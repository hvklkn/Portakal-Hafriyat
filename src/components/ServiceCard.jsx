function ServiceCard({ index, title, text }) {
  return (
    <article className="service-row">
      <span className="service-index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}

export default ServiceCard
