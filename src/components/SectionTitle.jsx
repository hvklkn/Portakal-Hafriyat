function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <header className={`section-title ${align === 'center' ? 'center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  )
}

export default SectionTitle
