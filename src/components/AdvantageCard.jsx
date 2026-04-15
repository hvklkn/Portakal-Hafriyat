function AdvantageIcon({ type }) {
  switch (type) {
    case 'time':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 6.5V12l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4l6 2.5V12c0 3.8-2.4 6.8-6 8-3.6-1.2-6-4.2-6-8V6.5L12 4z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.3 12.2l1.8 1.8 3.6-3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'machine':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 15h8l2-3h6v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 15v2.5M17 15v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'team':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 18c.5-2.3 2.2-3.5 4.5-3.5s4 1.2 4.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 17.5c.3-1.5 1.4-2.5 3-2.5 1.5 0 2.5.7 3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'solution':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'experience':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8L12 3.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function AdvantageCard({ icon, title, description }) {
  return (
    <article className="advantage-card">
      <span className="advantage-icon">
        <AdvantageIcon type={icon} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default AdvantageCard
