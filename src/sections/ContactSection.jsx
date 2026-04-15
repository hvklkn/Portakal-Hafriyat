function ContactSection() {
  return (
    <section id="iletisim" className="section contact-scene">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">İletişim</p>
          <h2>Projenizi konuşalım, operasyonu netleştirelim.</h2>
          <p>
            Hafriyat, yıkım veya altyapı hazırlık ihtiyaçlarınız için ekibimizle doğrudan iletişime geçin. Kısa sürede
            sahaya uygun çözüm modeli paylaşalım.
          </p>

          <dl className="contact-details">
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href="tel:+905551112233">+90 555 111 22 33</a>
              </dd>
            </div>
            <div>
              <dt>E-posta</dt>
              <dd>
                <a href="mailto:info@portakalhafriyat.com">info@portakalhafriyat.com</a>
              </dd>
            </div>
            <div>
              <dt>Lokasyon</dt>
              <dd>İstanbul merkezli, Türkiye geneli operasyon</dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <h3>Hızlı Talep Formu</h3>
          <label htmlFor="company">Firma / Proje Adı</label>
          <input id="company" name="company" type="text" placeholder="Örn. Lojistik Depo Genişleme" />

          <label htmlFor="scope">İş Kapsamı</label>
          <input id="scope" name="scope" type="text" placeholder="Kazı, yıkım, dolgu, altyapı hazırlık" />

          <label htmlFor="message">Kısa Not</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Saha büyüklüğü, hedef tarih veya özel koşulları paylaşabilirsiniz."
          />

          <button className="btn" type="submit">
            Ön Değerlendirme Talep Et
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
