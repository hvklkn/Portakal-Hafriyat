import AdvantageCard from '../components/AdvantageCard'
import SectionTitle from '../components/SectionTitle'

const reasons = [
  {
    icon: 'time',
    title: 'Zamanında Teslim Disiplini',
    description:
      'İş programına bağlı ilerleme ve saha koordinasyonu ile proje takvimine uygun teslim performansı sağlarız.'
  },
  {
    icon: 'shield',
    title: 'Güvenilir Operasyon Yönetimi',
    description:
      'İş güvenliği ve kalite standartlarına uyumlu süreç tasarımıyla saha operasyonlarını kontrollü şekilde yürütürüz.'
  },
  {
    icon: 'machine',
    title: 'Modern Ekipman Gücü',
    description:
      'Güncel makine parkımız sayesinde farklı zemin ve saha koşullarında verimli, kesintisiz çalışma kapasitesi sunarız.'
  },
  {
    icon: 'team',
    title: 'Uzman Kadro',
    description:
      'Tecrübeli operatörler ve teknik ekiplerimizle projeye uygun uygulama kararlarını hızlı ve doğru şekilde alırız.'
  },
  {
    icon: 'solution',
    title: 'Çözüm Odaklı Yaklaşım',
    description:
      'Sahadaki değişken koşullara hızlı uyum sağlayarak süreci aksatmadan alternatif planlar üretiriz.'
  },
  {
    icon: 'experience',
    title: 'Saha Deneyimi',
    description:
      'Yıllara yayılan proje tecrübemizle olası riskleri önden görür, maliyet ve zaman yönetiminde öngörü sunarız.'
  }
]

function WhyChooseUsSection() {
  return (
    <section id="neden-biz" className="section section-soft why-section">
      <div className="container">
        <SectionTitle
          eyebrow="Neden Biz?"
          title="Projelerinizde güvenilir performans sağlayan operasyon partneri"
          description="Portakal Hafriyat; teknik doğruluk, güçlü saha koordinasyonu ve çözüm odaklı yaklaşımıyla projelerinizi güvenle destekler."
        />

        <div className="why-intro-card">
          <p>
            Amacımız yalnızca işi tamamlamak değil; işin her aşamasında size öngörülebilir süreç, net iletişim ve
            sürdürülebilir kalite sunmaktır.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((reason) => (
            <AdvantageCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
