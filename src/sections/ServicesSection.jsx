import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Kazı ve Dolgu Yönetimi',
    text: 'Kazı, taşıma ve dolgu akışını zemine göre optimize ederiz.'
  },
  {
    title: 'Yıkım ve Saha Dönüşümü',
    text: 'Yıkımı güvenlik ve hız dengesini koruyarak tamamlarız.'
  },
  {
    title: 'Altyapı Ön Hazırlık',
    text: 'Altyapı ekipleri için zemini eksiksiz ve hazır teslim ederiz.'
  },
  {
    title: 'Hafriyat Lojistiği',
    text: 'Saha lojistiğini akışı yavaşlatmadan yönetiriz.'
  }
]

function ServicesSection() {
  return (
    <section id="hizmetler" className="section services-scene">
      <div className="container services-layout">
        <SectionTitle
          eyebrow="Hizmet Çerçevesi"
          title="Operasyonu büyütürken kaliteyi sabit tutarız"
          description="Dört ana hatta, tek uygulama standardı."
        />

        <div className="services-list">
          {services.map((item, index) => (
            <ServiceCard key={item.title} index={index + 1} title={item.title} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
