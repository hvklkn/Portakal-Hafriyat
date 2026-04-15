function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div>
          <p className="footer-brand">Portakal Hafriyat</p>
          <p>Kurumsal hafriyat operasyonlarında güçlü planlama, kararlı uygulama ve güvenilir teslim.</p>
        </div>
        <nav className="footer-links" aria-label="Footer menü">
          <a href="#hakkimizda">Hakkımızda</a>
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
