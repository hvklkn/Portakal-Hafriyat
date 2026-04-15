import AboutHighlightCard from '../components/AboutHighlightCard'
import SectionTitle from '../components/SectionTitle'

const highlights = [
  {
    title: 'Operasyon Netliği',
    text: 'Saha kararlarını takvime ve üretim hedeflerine göre anlık optimize ederiz.'
  },
  {
    title: 'Teslim Güvencesi',
    text: 'Kaynak planı ve uygulama sırasını projenin kritik tarihlerini koruyacak şekilde kurarız.'
  },
  {
    title: 'Ölçeklenebilir Ekip',
    text: 'İhtiyaca göre büyüyebilen ekip yapısıyla farklı etapları eşzamanlı yürütebiliriz.'
  },
  {
    title: 'Kurumsal İletişim',
    text: 'Süreç boyunca karar vericilere sade, düzenli ve ölçülebilir ilerleme çıktısı sunarız.'
  }
]

function AboutSection() {
  return (
    <section id="hakkimizda" className="section about-scene">
      <div className="container about-layout">
        <div className="about-content">
          <SectionTitle
            eyebrow="Marka Pozisyonu"
            title="Ağır saha işlerinde güven duygusu üreten uygulama standardı"
            description="Portakal Hafriyat; büyük projelerde başlangıç anından teslim gününe kadar belirsizliği azaltan operasyon kültürüyle çalışır."
          />

          <p>
            Bizim için hafriyat, yalnızca ekipman gücü değil; sıra, zaman ve saha kararlarının doğru yönetimidir. Bu
            nedenle her projeyi teknik yeterlilik kadar yürütme kalitesiyle ele alırız.
          </p>

          <p className="about-emphasis">
            "Güçlü ekipman kadar güçlü metodoloji." İşimizi bu ilke ile yönetir, projelerinize sürdürülebilir bir tempo
            kazandırırız.
          </p>
        </div>

        <div className="about-visual">
          <div className="about-kpis">
            <article>
              <strong>120+</strong>
              <span>Kurumsal İş Ortağı</span>
            </article>
            <article>
              <strong>11 İl</strong>
              <span>Aktif Operasyon Kabiliyeti</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>Proje İletişim Desteği</span>
            </article>
          </div>

          <div className="about-highlights">
            {highlights.map((item) => (
              <AboutHighlightCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
