function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Portakal Hafriyat</h3>
          <p>Güvenilir hafriyat, yıkım ve altyapı operasyonlarında kurumsal çözüm ortağınız.</p>
        </div>
        <div>
          <h4>İletişim</h4>
          <p>Telefon: +90 555 111 22 33</p>
          <p>E-posta: info@portakalhafriyat.com</p>
        </div>
        <div>
          <h4>Adres</h4>
          <p>İstanbul, Türkiye</p>
          <p>Hafta içi 08:30 - 18:00</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} Portakal Hafriyat. Tüm hakları saklıdır.</small>
      </div>
    </footer>
  )
}

export default Footer
