import AdvantageCard from '../components/AdvantageCard'
import SectionTitle from '../components/SectionTitle'

const steps = [
  {
    title: 'Saha Etüdü',
    description: 'Proje başlamadan önce zemin, erişim ve risk başlıklarını netleştiririz.'
  },
  {
    title: 'Operasyon Kurgusu',
    description: 'Ekipman, ekip ve etap planını tek bir uygulama ritmine dönüştürürüz.'
  },
  {
    title: 'Canlı Saha Yönetimi',
    description: 'İlerlemeyi sahadan gelen verilerle anlık izler, kritik kararları geciktirmeyiz.'
  },
  {
    title: 'Kurumsal Teslim',
    description: 'İşin sonunda yalnızca sahayı değil, sürecin tamamını raporlanmış şekilde teslim ederiz.'
  }
]

function WhyChooseUsSection() {
  return (
    <section id="surec" className="section process-scene">
      <div className="container process-layout">
        <div className="process-intro">
          <SectionTitle
            eyebrow="Çalışma Metodumuz"
            title="Öngörülebilir süreç, güçlü sonuç"
            description="Belirsizliği azaltan dört adımlı modelimiz, büyük ölçekli operasyonları yönetilebilir hale getirir."
          />
          <p>
            Bu yaklaşım sayesinde proje sahipleri, sahada ne zaman ne olacağını net bilir; ekipler ise aynı hedefte
            hizalanır.
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
