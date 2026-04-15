import AboutHighlightCard from '../components/AboutHighlightCard'
import SectionTitle from '../components/SectionTitle'

const highlights = [
  {
    title: 'Operasyon Disiplini',
    text: 'Saha akışını takvim, kaynak ve risk parametreleriyle birlikte yönetiriz.'
  },
  {
    title: 'Süreç Şeffaflığı',
    text: 'İlerlemeyi karar vericilere düzenli, net ve anlaşılır formatta raporlarız.'
  },
  {
    title: 'Çözüm Hızı',
    text: 'Sahadaki değişkenleri hızlı analiz eder, üretimi durdurmadan aksiyon alırız.'
  },
  {
    title: 'Kurumsal Yaklaşım',
    text: 'Her projede kalite, güvenlik ve maliyet dengesini birlikte gözetiriz.'
  }
]

function AboutSection() {
  return (
    <section id="hakkimizda" className="section about-scene">
      <div className="container about-layout">
        <div className="about-content">
          <SectionTitle
            eyebrow="Marka Konumumuz"
            title="Sahada güç, yönetimde netlik"
            description="Portakal Hafriyat; ağır saha operasyonlarını yüksek standartta yöneten, güvenilir bir proje partneridir."
          />
          <p>
            Yıllardır kamu ve özel sektör projelerinde edindiğimiz saha refleksiyle, işin yalnızca uygulama tarafını
            değil; planlama, koordinasyon ve teslim performansını da yönetiyoruz.
          </p>
          <p>
            Hedefimiz basit: projenin ilk günü ile teslim günü arasında hiçbir belirsizlik bırakmadan, güçlü ve
            öngörülebilir bir operasyon akışı sunmak.
          </p>
        </div>

        <div className="about-visual">
          <div className="about-statement">
            <p>
              "Doğru ekipman, doğru ekip, doğru sıra." Portakal Hafriyat için operasyon kalitesi, bu üçlü dengede
              başlar.
            </p>
            <div className="about-kpis">
              <article>
                <strong>120+</strong>
                <span>Aktif Kurumsal Müşteri</span>
              </article>
              <article>
                <strong>11 İl</strong>
                <span>Operasyon Kabiliyeti</span>
              </article>
            </div>
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
