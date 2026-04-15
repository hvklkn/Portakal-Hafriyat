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
    const onScroll = () => setIsScrolled(window.scrollY > 18)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920) {
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
    <header className={`editorial-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-shell">
        <a className="brand" href="#anasayfa" aria-label="Portakal Hafriyat ana sayfa">
          <span className="brand-mark" aria-hidden="true">
            PH
          </span>
          <span className="brand-copy">
            <strong>Portakal Hafriyat</strong>
            <small>Disiplinli Saha Operasyonları</small>
          </span>
        </a>

        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>

        <nav id="site-navigation" className={`nav-menu ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-sm" href="#teklif" onClick={closeMenu}>
            Teklif Al
          </a>
        </nav>

        <button
          type="button"
          aria-label="Mobil menüyü kapat"
          className={`menu-backdrop ${isOpen ? 'open' : ''}`}
          onClick={closeMenu}
        />
      </div>
    </header>
  )
}

export default Navbar
