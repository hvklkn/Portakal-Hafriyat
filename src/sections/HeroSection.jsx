import StatCard from '../components/StatCard'

const metrics = [
  { value: '20+', label: 'Yıl Saha Tecrübesi' },
  { value: '600+', label: 'Tamamlanan Operasyon' },
  { value: '%98', label: 'Takvime Uyum' },
  { value: '48 Saat', label: 'Mobilizasyon Süresi' }
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
            Toprağı açarız.
            <span> Projenin temposunu kurarız.</span>
          </h1>
          <p>
            Hafriyat, yıkım ve altyapı hazırlık işlerini tek standartta yönetiriz: net plan, güçlü saha, güvenli teslim.
          </p>

          <div className="hero-actions">
            <a className="btn" href="#teklif">
              Teklif Al
            </a>
            <a className="btn btn-outline" href="#projeler">
              Projeleri İncele
            </a>
          </div>

          <div className="hero-signals">
            <span>Yüksek hacimli proje kabiliyeti</span>
            <span>Takvime bağlı uygulama disiplini</span>
            <span>Tek muhatapla net koordinasyon</span>
          </div>
        </div>

        <aside className="hero-stage" aria-label="Operasyon yaklaşımı">
          <p className="hero-stage-label">Operasyon Modeli</p>
          <h2>Keşiften teslime tek komuta</h2>
          <p>
            Risk, kaynak ve süre parametrelerini baştan netleştirir; sahada ivmeyi kesmeden yönetiriz.
          </p>

          <div className="hero-stage-lines">
            <article>
              <strong>01</strong>
              <span>Analiz</span>
            </article>
            <article>
              <strong>02</strong>
              <span>Uygulama</span>
            </article>
            <article>
              <strong>03</strong>
              <span>Teslim</span>
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
