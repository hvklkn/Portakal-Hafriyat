import StatCard from '../components/StatCard'

const stats = [
  { value: '18+', label: 'Yıllık Sektör Deneyimi' },
  { value: '450+', label: 'Tamamlanan Proje' },
  { value: '%98', label: 'Zamanında Teslim Oranı' }
]

function HeroSection() {
  return (
    <section id="anasayfa" className="hero">
      <div className="hero-bg-shape" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Kurumsal Hafriyat Çözümleri</p>
          <h1>
            Portakal Hafriyat ile projelerinize
            <span> güçlü bir başlangıç</span>
          </h1>
          <p>
            Büyük ölçekli kazı, yıkım ve altyapı hazırlık süreçlerini; doğru ekipman, uzman saha yönetimi ve
            net raporlama ile güvenle yönetiyoruz.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#iletisim">
              Hemen Teklif Al
            </a>
            <a className="btn btn-ghost" href="#hizmetler">
              Hizmetleri İncele
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <p>Operasyonel Avantajlar</p>
          <ul>
            <li>Modern makine parkı ve sertifikalı operatörler</li>
            <li>Güvenlik öncelikli saha planlaması</li>
            <li>Şeffaf süreç takibi ve düzenli raporlama</li>
          </ul>
        </div>
      </div>

      <div className="container stats-grid">
        {stats.map((item) => (
          <StatCard key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
