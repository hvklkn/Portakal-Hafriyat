function ContactSection() {
  return (
    <section id="iletisim" className="section contact-scene">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">İletişim</p>
          <h2>Karar süreçlerini hızlandıran net bir ilk görüşme yapalım.</h2>
          <p>
            Hafriyat, yıkım ve altyapı hazırlık ihtiyaçlarınızı ekibimize iletin. Projenize uygun kapsamı kısa sürede
            netleştirip ön operasyon çerçevesini paylaşalım.
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
              <dt>Operasyon Merkezi</dt>
              <dd>İstanbul merkezli, Türkiye genelinde proje yürütme kabiliyeti</dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <h3>Ön Talep Formu</h3>
          <label htmlFor="company">Firma / Proje Adı</label>
          <input id="company" name="company" type="text" placeholder="Örn. Lojistik Merkez Zemin Hazırlığı" />

          <label htmlFor="scope">İş Kapsamı</label>
          <input id="scope" name="scope" type="text" placeholder="Kazı, yıkım, dolgu, altyapı" />

          <label htmlFor="message">Proje Notu</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Saha büyüklüğü, hedef başlangıç tarihi ve özel koşullar"
          />

          <button className="btn" type="submit">
            Ön Değerlendirme Al
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
