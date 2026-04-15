import StatCard from '../components/StatCard'

const metrics = [
  { value: '20+', label: 'Yıl Saha Deneyimi' },
  { value: '600+', label: 'Tamamlanan Operasyon' },
  { value: '%98', label: 'Takvime Uygun Teslim' },
  { value: '24/7', label: 'Proje Destek Hattı' }
]

function HeroSection() {
  return (
    <section id="anasayfa" className="hero-scene section">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />

      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Portakal Hafriyat</p>
          <h1>
            Ağır saha operasyonlarında
            <span> güven veren başlangıç.</span>
          </h1>
          <p>
            Büyük ölçekli kazı, yıkım ve altyapı hazırlık süreçlerini; disiplinli planlama, güçlü ekipman ve net
            koordinasyonla kusursuz başlatıyoruz.
          </p>

          <div className="hero-actions">
            <a className="btn" href="#teklif">
              Teklif Al
            </a>
            <a className="btn btn-outline" href="#hizmetler">
              Hizmetlerimizi İncele
            </a>
          </div>

          <ul className="hero-signals">
            <li>Kurumsal raporlama standardı</li>
            <li>Risk odaklı saha planlaması</li>
            <li>Tek merkezden operasyon yönetimi</li>
          </ul>
        </div>

        <aside className="hero-panel" aria-label="Operasyonel güç göstergeleri">
          <p className="hero-panel-kicker">Operasyon Çekirdeği</p>
          <h2>Planla. Uygula. Teslim Et.</h2>
          <p>
            Her projede zemin etüdünden son saha temizliğine kadar tüm adımları ölçülebilir bir akışta yönetiyoruz.
          </p>
          <div className="hero-panel-grid">
            <article>
              <strong>Hızlı Mobilizasyon</strong>
              <span>Kısa sürede saha hazırlığı</span>
            </article>
            <article>
              <strong>Teknik Kontrol</strong>
              <span>Anlık kalite ve güvenlik takibi</span>
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
