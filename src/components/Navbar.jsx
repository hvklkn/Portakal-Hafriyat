import { useEffect, useState } from 'react'

const navItems = [
  { href: '#anasayfa', label: 'Anasayfa' },
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#projeler', label: 'Projeler' },
  { href: '#iletisim', label: 'İletişim' }
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <a className="brand" href="#anasayfa" aria-label="Portakal Hafriyat Ana Sayfa">
          <span className="brand-mark" aria-hidden="true">
            PH
          </span>
          <div>
            <strong>Portakal Hafriyat</strong>
            <small>Kurumsal Hafriyat ve Altyapı Çözümleri</small>
          </div>
        </a>

        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-navigation" className={`site-nav ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-sm nav-cta" href="#iletisim" onClick={closeMenu}>
            Teklif Al
          </a>
        </nav>

        <button
          aria-label="Menü dışına tıklayarak kapat"
          className={`nav-overlay ${isOpen ? 'open' : ''}`}
          onClick={closeMenu}
          type="button"
        />
      </div>
    </header>
  )
}

export default Navbar
