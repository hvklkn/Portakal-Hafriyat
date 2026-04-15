import AboutHighlightCard from '../components/AboutHighlightCard'
import SectionTitle from '../components/SectionTitle'

const aboutHighlights = [
  {
    title: 'Hizmet Disiplini',
    text: 'Planlanan iş programına bağlı kalarak sahada düzenli, kontrollü ve kesintisiz operasyon yürütürüz.'
  },
  {
    title: 'Derin Saha Tecrübesi',
    text: 'Farklı ölçeklerdeki projelerde edinilen uygulama deneyimi ile riskleri önceden öngörürüz.'
  },
  {
    title: 'Operasyonel Güvenilirlik',
    text: 'Makine, ekip ve süreç koordinasyonunu tek merkezden yöneterek teslim sürelerinde istikrar sağlarız.'
  },
  {
    title: 'Müşteri Odaklı Yaklaşım',
    text: 'Her proje için ihtiyaç analizi yapar, hızlı geri dönüş ve şeffaf iletişimle karar süreçlerini kolaylaştırırız.'
  }
]

function AboutSection() {
  return (
    <section id="hakkimizda" className="section about-section">
      <div className="container about-grid">
        <div className="about-content">
          <SectionTitle
            eyebrow="Hakkımızda"
            title="Sahada disiplinli, çözümde hızlı ve sonuç odaklı bir iş ortağı"
            description="Portakal Hafriyat, kazıdan saha hazırlığına kadar tüm süreçleri planlı operasyon ve güçlü teknik koordinasyon ile yönetir."
          />

          <p>
            Kurulduğumuz günden bu yana kamu ve özel sektör projelerinde; güvenlik, kalite ve zaman yönetimini
            birlikte ele alan bir çalışma sistemi benimsiyoruz. Projeyi sadece uygulama açısından değil, süreç
            yönetimi ve risk kontrolü perspektifiyle de değerlendiriyoruz.
          </p>
          <p>
            Her sahada amacımız nettir: doğru ekipman, uzman kadro ve ölçülebilir iş takibiyle müşterilerimize
            öngörülebilir, güvenilir ve sürdürülebilir bir operasyon deneyimi sunmak.
          </p>

          <div className="about-signature" aria-label="Kurumsal taahhütler">
            <span>Teknik doğruluk</span>
            <span>Zamanında teslim</span>
            <span>Şeffaf iletişim</span>
          </div>
        </div>

        <div className="about-side">
          <div className="about-story-card">
            <p className="about-story-title">Kurumsal Operasyon Yaklaşımımız</p>
            <p>
              Proje başlangıcında saha keşfi, risk analizi ve etap planlaması yapar; uygulama süresince ilerlemeyi
              düzenli raporlayarak sürecin her adımını görünür tutarız.
            </p>
            <div className="about-story-stats">
              <article>
                <strong>450+</strong>
                <span>Tamamlanan İş</span>
              </article>
              <article>
                <strong>%98</strong>
                <span>Zamanında Teslim</span>
              </article>
              <article>
                <strong>20+</strong>
                <span>Yıllık Deneyim</span>
              </article>
            </div>
          </div>

          <div className="about-highlights-grid">
            {aboutHighlights.map((item) => (
              <AboutHighlightCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
