function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div>
          <p className="footer-brand">Portakal Hafriyat</p>
          <p>Ağır saha operasyonlarında yüksek standartlı planlama, uygulama ve teslim disiplini.</p>
        </div>
        <nav className="footer-links" aria-label="Footer menü">
          <a href="#anasayfa">Anasayfa</a>
          <a href="#hizmetler">Hizmetler</a>
          <a href="#projeler">Projeler</a>
          <a href="#iletisim">İletişim</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} Portakal Hafriyat. Tüm hakları saklıdır.</small>
      </div>
    </footer>
  )
}

export default Footer
