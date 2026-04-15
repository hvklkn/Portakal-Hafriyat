function ContactSection() {
  return (
    <section id="iletisim" className="section contact-scene">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">İletişim</p>
          <h2>Projeyi 15 dakikada çerçeveleyelim.</h2>
          <p>
            Talebinizi iletin. Kapsam, takvim ve saha yaklaşımını hızlıca netleştirelim.
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
              <dd>İstanbul merkez, Türkiye genelinde saha kabiliyeti</dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <h3>Hızlı Proje Talebi</h3>
          <label htmlFor="company">Proje / Firma</label>
          <input id="company" name="company" type="text" placeholder="Örn. Lojistik Merkez Etap 2" />

          <label htmlFor="scope">Kapsam</label>
          <input id="scope" name="scope" type="text" placeholder="Kazı, yıkım, dolgu, altyapı" />

          <label htmlFor="message">Kısa Not</label>
          <textarea id="message" name="message" rows="4" placeholder="Saha büyüklüğü ve hedef başlangıç tarihi" />

          <button className="btn" type="submit">
            Ön Keşif Talep Et
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
