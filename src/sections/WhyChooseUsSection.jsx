import AdvantageCard from '../components/AdvantageCard'
import SectionTitle from '../components/SectionTitle'

const steps = [
  {
    title: 'Ön Keşif',
    description: 'Zemin, erişim ve risk haritasını baştan netleştiririz.'
  },
  {
    title: 'Operasyon Kurgusu',
    description: 'Ekipman, ekip ve etap planını tek ritimde toplarız.'
  },
  {
    title: 'Saha İcrası',
    description: 'Süreçte kritik kararları geciktirmeden uygularız.'
  },
  {
    title: 'Raporlu Teslim',
    description: 'Sahayı ve süreci ölçülebilir çıktıyla teslim ederiz.'
  }
]

function WhyChooseUsSection() {
  return (
    <section id="surec" className="section process-scene">
      <div className="container process-layout">
        <div className="process-intro">
          <SectionTitle
            eyebrow="Çalışma Rutini"
            title="Dört adım. Tek standart."
            description="Süreç sade, sonuç öngörülebilir."
          />
          <p>
            Proje ekiplerine görünürlük, sahaya kararlı bir tempo kazandırırız.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <AdvantageCard key={step.title} step={index + 1} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
