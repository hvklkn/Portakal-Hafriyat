import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'Kuzey Marmara Lojistik Üssü Saha Hazırlığı',
    location: 'İstanbul',
    year: '2025',
    scope: '120.000 m² alanda etaplı kazı, dolgu ve ağır ekipman geçiş altyapısı uygulandı.',
    className: 'featured'
  },
  {
    title: 'Gebze Endüstriyel Dönüşüm Operasyonu',
    location: 'Kocaeli',
    year: '2024',
    scope: 'Yıkım sonrası yeni tesis kurulumuna uygun, takvime bağlı saha temizliği tamamlandı.'
  },
  {
    title: 'Bursa Üretim Kampüsü Altyapı Açılımı',
    location: 'Bursa',
    year: '2024',
    scope: 'Yoğun üretim takvimine paralel, kesintisiz saha genişletme ve zemin hazırlığı yürütüldü.'
  },
  {
    title: 'Ankara Karma Proje Zemin Stabilizasyonu',
    location: 'Ankara',
    year: '2023',
    scope: 'Farklı etaplarda paralel operasyon yönetimi ile yüksek hacimli hafriyat süreci yönetildi.'
  }
]

function ProjectsSection() {
  return (
    <section id="projeler" className="section projects-scene">
      <div className="container">
        <SectionTitle
          eyebrow="Seçili Projeler"
          title="Büyük ölçekli işlerde test edilmiş operasyon kabiliyeti"
          description="Farklı şehirlerde, farklı koşullarda aynı standart: kontrollü ilerleme ve güçlü teslim performansı."
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
