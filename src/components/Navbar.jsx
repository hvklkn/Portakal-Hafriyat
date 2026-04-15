import { useState } from 'react'

const navItems = [
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#neden-biz', label: 'Neden Biz' },
  { href: '#projeler', label: 'Projeler' },
  { href: '#iletisim', label: 'İletişim' }
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="#anasayfa" aria-label="Portakal Hafriyat Ana Sayfa">
          <span className="brand-mark" />
          <div>
            <strong>Portakal Hafriyat</strong>
            <small>Zemin, Altyapı, Güven</small>
          </div>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-label="Menüyü aç"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-sm" href="#iletisim" onClick={() => setIsOpen(false)}>
            Teklif Al
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
