import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'Kuzey Marmara Lojistik Üssü Zemin Operasyonu',
    location: 'İstanbul',
    year: '2025',
    scope: '120.000 m² alanda etaplı kazı, dolgu ve ağır araç trafiği için ana saha omurgası oluşturuldu.',
    className: 'featured'
  },
  {
    title: 'Gebze Endüstriyel Dönüşüm Saha Açılımı',
    location: 'Kocaeli',
    year: '2024',
    scope: 'Yıkım sonrası yeni üretim hattı kurulumuna uygun, takvim odaklı saha dönüşümü tamamlandı.'
  },
  {
    title: 'Bursa Üretim Kampüsü Altyapı Hazırlığı',
    location: 'Bursa',
    year: '2024',
    scope: 'Mevcut operasyonu kesmeden genişleme alanlarında paralel hafriyat yönetimi yürütüldü.'
  },
  {
    title: 'Ankara Karma Proje Stabilizasyon Etabı',
    location: 'Ankara',
    year: '2023',
    scope: 'Çok etaplı projede yüksek hacimli kazı ve zemin hazırlık süreci kontrollü tempoda tamamlandı.'
  }
]

function ProjectsSection() {
  return (
    <section id="projeler" className="section projects-scene">
      <div className="container">
        <SectionTitle
          eyebrow="Seçili İşler"
          title="Prestijli projelerde sahayı zamanla yarışmadan yönettik"
          description="Farklı şehirler, farklı zeminler, aynı kalite çizgisi: planlı uygulama ve net teslim."
        />

        <div className="projects-showcase">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              className={project.className}
              title={project.title}
              location={project.location}
              scope={project.scope}
              year={project.year}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
