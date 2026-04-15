import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Kazı ve Dolgu Yönetimi',
    text: 'Zemin koşuluna uygun teknikle kazı, taşıma ve dolgu süreçlerini kontrollü biçimde yürütürüz.'
  },
  {
    title: 'Yıkım ve Saha Dönüşümü',
    text: 'Yıkım operasyonunu güvenlik protokollerine bağlı, çevresel etkileri yöneterek tamamlarız.'
  },
  {
    title: 'Altyapı Ön Hazırlık',
    text: 'Yol, tesis ve yapı projeleri için zemini uygulama ekiplerine hazır hale getiririz.'
  },
  {
    title: 'Lojistik ve Hafriyat Nakli',
    text: 'Sahadaki malzeme hareketini aksamasız planlar, iş programını hızlandırırız.'
  }
]

function ServicesSection() {
  return (
    <section id="hizmetler" className="section services-scene">
      <div className="container services-layout">
        <SectionTitle
          eyebrow="Hizmetler"
          title="Geniş ölçekte saha operasyonu, tek kalite standardı"
          description="Hizmet kalemlerimizi proje hedeflerinize göre ölçeklendirir, sahayı iş programına hazır teslim ederiz."
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
