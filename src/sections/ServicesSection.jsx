import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Kazı ve Dolgu Yönetimi',
    text: 'Zemin karakterine göre kazı, taşıma ve dolgu sırasını teknik kontrol altında yürütürüz.'
  },
  {
    title: 'Yıkım ve Saha Dönüşümü',
    text: 'Yıkım sonrası sahayı yeni uygulama ekiplerine hazır, temiz ve güvenli şekilde teslim ederiz.'
  },
  {
    title: 'Altyapı Ön Hazırlık',
    text: 'Yol, depo, tesis ve karma projelerde zemini uygulama takvimine uygun hale getiririz.'
  },
  {
    title: 'Hafriyat Lojistiği',
    text: 'Malzeme hareketini optimize ederek sahada bekleme sürelerini ve maliyet baskısını azaltırız.'
  }
]

function ServicesSection() {
  return (
    <section id="hizmetler" className="section services-scene">
      <div className="container services-layout">
        <SectionTitle
          eyebrow="Operasyon Alanlarımız"
          title="Geniş ölçekte saha hizmeti, rafine uygulama disiplini"
          description="Her hizmet başlığında aynı yaklaşım: doğru sıra, yüksek kontrol, temiz teslim."
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
