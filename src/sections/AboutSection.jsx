import AboutHighlightCard from '../components/AboutHighlightCard'
import SectionTitle from '../components/SectionTitle'

const highlights = [
  {
    title: 'Plan Disiplini',
    text: 'Her etabı takvim ve kaynak doğruluğu ile yürütürüz.'
  },
  {
    title: 'Saha Komutası',
    text: 'Kararları sahadaki gerçek verilerle anlık alırız.'
  },
  {
    title: 'Ölçek Kabiliyeti',
    text: 'Büyük hacimli işlerde aynı kalite çizgisini koruruz.'
  },
  {
    title: 'Net İletişim',
    text: 'Karar vericilere sade ve ölçülebilir çıktı sunarız.'
  }
]

function AboutSection() {
  return (
    <section id="hakkimizda" className="section about-scene">
      <div className="container about-layout">
        <div className="about-content">
          <SectionTitle
            eyebrow="Marka Duruşu"
            title="Güvenin kaynağı: net plan, kararlı uygulama"
            description="Portakal Hafriyat, ağır saha işlerinde belirsizliği azaltan ve sonucu öngörülebilir kılan operasyon kültürüyle çalışır."
          />

          <p>
            Bizim için hafriyat, yalnızca güç değil; doğru sıra ve doğru karar hızıdır.
          </p>

          <p className="about-emphasis">
            "Sahada güç. Yönetimde sakinlik. Teslimde netlik."
          </p>
        </div>

        <div className="about-visual">
          <div className="about-kpis">
            <article>
              <strong>120+</strong>
              <span>Kurumsal Referans</span>
            </article>
            <article>
              <strong>11 İl</strong>
              <span>Operasyon Coğrafyası</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>Kesintisiz Koordinasyon</span>
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
