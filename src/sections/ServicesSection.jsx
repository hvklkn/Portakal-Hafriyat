import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Kazı ve Dolgu Uygulamaları',
    text: 'Proje ihtiyacına uygun hassas kazı, malzeme yönetimi ve kontrollü dolgu operasyonları.'
  },
  {
    title: 'Yıkım ve Saha Temizliği',
    text: 'Mevzuata uyumlu yıkım planlaması, atık ayrıştırma ve güvenli saha temizleme süreçleri.'
  },
  {
    title: 'Altyapı Hazırlık Çalışmaları',
    text: 'Yol, bina ve endüstriyel tesis projeleri için zemini teknik gereksinimlere uygun hale getirme.'
  },
  {
    title: 'Nakliye ve Lojistik Yönetimi',
    text: 'Malzeme sevkiyatı ve operasyon akışının kesintisiz ilerlemesi için güçlü saha lojistiği.'
  }
]

function ServicesSection() {
  return (
    <section id="hizmetler" className="section section-soft">
      <div className="container">
        <SectionTitle
          eyebrow="Hizmetler"
          title="Projeye değer katan uçtan uca saha hizmetleri"
          description="Teknik kapasitemiz ve tecrübeli ekiplerimizle operasyonlarınızı hızlandıran çözümler sunuyoruz."
        />

        <div className="card-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} title={service.title} text={service.text} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
