import AdvantageCard from '../components/AdvantageCard'
import SectionTitle from '../components/SectionTitle'

const steps = [
  {
    title: 'Saha Analizi ve Keşif',
    description: 'Projeyi başlamadan önce zemin, erişim ve risk parametreleriyle teknik olarak haritalarız.'
  },
  {
    title: 'Operasyon Tasarımı',
    description: 'Ekipman, ekip ve takvim planını proje hedeflerine göre net bir yürütme modeline dönüştürürüz.'
  },
  {
    title: 'Disiplinli Uygulama',
    description: 'Sahada güvenlik, kalite ve hız dengesini koruyarak uygulamayı kesintisiz sürdürürüz.'
  },
  {
    title: 'Teslim ve Raporlama',
    description: 'İşi sadece bitirmeyiz; süreç çıktısını ölçülebilir raporlarla kurumsal olarak teslim ederiz.'
  }
]

function WhyChooseUsSection() {
  return (
    <section id="surec" className="section process-scene">
      <div className="container process-layout">
        <div className="process-intro">
          <SectionTitle
            eyebrow="Çalışma Metodumuz"
            title="Kontrollü süreç, öngörülebilir sonuç"
            description="Her işte aynı yaklaşımı uygularız: belirsizliği azaltan planlama, kararlı uygulama, güçlü teslim."
          />
          <p>
            Bu metodoloji sayesinde proje ekipleri, sahadaki ilerlemeyi anlık takip eder ve kritik kararları gecikmeden
            alabilir.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <AdvantageCard
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
