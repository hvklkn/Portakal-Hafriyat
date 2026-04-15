import StatCard from '../components/StatCard'

const metrics = [
  { value: '20+', label: 'Yıllık Saha Hafızası' },
  { value: '600+', label: 'Tamamlanan Operasyon' },
  { value: '%98', label: 'Takvime Uyum' },
  { value: '48 Saat', label: 'Ortalama Mobilizasyon' }
]

function HeroSection() {
  return (
    <section id="anasayfa" className="hero-scene section">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-word" aria-hidden="true">
        PORTAKAL
      </div>

      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Portakal Hafriyat</p>
          <h1>
            Toprağı yalnızca açmıyoruz.
            <span> Projenin ritmini kuruyoruz.</span>
          </h1>
          <p>
            Büyük ölçekli hafriyat operasyonlarında planlama, ekipman ve saha koordinasyonunu tek bir disiplin altında
            birleştiririz. Sonuç: hızlı başlangıç, kontrollü ilerleme, güvenli teslim.
          </p>

          <div className="hero-actions">
            <a className="btn" href="#teklif">
              Teklif Al
            </a>
            <a className="btn btn-outline" href="#projeler">
              Seçili Projeleri Gör
            </a>
          </div>

          <div className="hero-signals">
            <span>Kurumsal raporlama disiplini</span>
            <span>Yüksek hacimli saha yönetimi</span>
            <span>Tek muhatap ile net koordinasyon</span>
          </div>
        </div>

        <aside className="hero-stage" aria-label="Operasyon yaklaşımı">
          <p className="hero-stage-label">Saha Kurgusu</p>
          <h2>Keşiften teslime tek akış</h2>
          <p>
            Projenin ilk gününde risk ve kaynak planı çıkarır, uygulama boyunca performansı canlı verilerle yönetiriz.
          </p>

          <div className="hero-stage-lines">
            <article>
              <strong>01</strong>
              <span>Analiz ve Mobilizasyon</span>
            </article>
            <article>
              <strong>02</strong>
              <span>Disiplinli Uygulama</span>
            </article>
            <article>
              <strong>03</strong>
              <span>Kontrollü Teslim</span>
            </article>
          </div>
        </aside>
      </div>

      <div className="container hero-metric-strip" aria-label="Güven metrikleri">
        {metrics.map((item) => (
          <StatCard key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
