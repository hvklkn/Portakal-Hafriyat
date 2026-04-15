import StatCard from '../components/StatCard'

const stats = [
  { value: '20+', label: 'Yıllık Sektör Deneyimi' },
  { value: '24 Saat', label: 'Hızlı Keşif ve Geri Dönüş' },
  { value: '%98', label: 'Zamanında Teslim Başarısı' },
  { value: '400+', label: 'Kurumsal Proje Desteği' }
]

const trustPoints = [
  'Uzman ekip, modern makine parkı',
  'Güvenlik ve mevzuata tam uyum',
  'Şeffaf raporlama ve güçlü koordinasyon'
]

function HeroSection() {
  return (
    <section id="anasayfa" className="hero">
      <div className="hero-surface" aria-hidden="true" />
      <div className="hero-pattern" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Portakal Hafriyat</p>
          <h1>Projeleriniz için güven veren, hızlı ve profesyonel saha başlangıcı</h1>
          <p className="hero-subtitle">
            Kazı, yıkım ve altyapı hazırlık süreçlerinizi; tecrübeli kadromuz, planlı operasyon yönetimimiz ve
            zamanında teslim anlayışımızla kurumsal standartta yönetiyoruz.
          </p>

          <div className="hero-actions">
            <a className="btn" href="#iletisim">
              Teklif Al
            </a>
            <a className="btn btn-ghost" href="#hizmetler">
              Hizmetlerimizi İncele
            </a>
          </div>

          <ul className="hero-trust-list" aria-label="Güven göstergeleri">
            {trustPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="hero-visual" aria-label="Portakal Hafriyat operasyonel yaklaşımı">
          <div className="hero-visual-tag">Aktif Saha Planlama</div>
          <div className="hero-visual-card">
            <p className="hero-visual-title">Kurumsal Operasyon Çerçevesi</p>
            <p>
              Her projede risk analizi, ekipman planı ve etaplandırılmış iş programı ile işin başından teslimine
              kadar kontrolü tek merkezde tutuyoruz.
            </p>
          </div>

          <div className="hero-visual-grid">
            <article>
              <strong>Aynı Gün Keşif</strong>
              <span>Hızlı saha değerlendirmesi ve net teklif süreci</span>
            </article>
            <article>
              <strong>Tek Nokta İletişim</strong>
              <span>Proje boyunca düzenli bilgi akışı ve koordinasyon</span>
            </article>
          </div>
        </aside>
      </div>

      <div className="container stats-grid hero-stats">
        {stats.map((item) => (
          <StatCard key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
