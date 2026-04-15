import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'Kuzey Marmara Lojistik Üssü | Ana Zemin Etabı',
    location: 'İstanbul',
    year: '2025',
    scope: '120.000 m² alanda etaplı kazı ve dolgu ile operasyon omurgası kuruldu.',
    className: 'featured'
  },
  {
    title: 'Gebze Endüstriyel Dönüşüm | Saha Açılımı',
    location: 'Kocaeli',
    year: '2024',
    scope: 'Yeni üretim hattı için yıkım sonrası saha, takvime bağlı şekilde hazırlandı.'
  },
  {
    title: 'Bursa Üretim Kampüsü | Altyapı Hazırlığı',
    location: 'Bursa',
    year: '2024',
    scope: 'Genişleme etaplarında mevcut üretimi kesmeden paralel hafriyat yürütüldü.'
  },
  {
    title: 'Ankara Karma Proje | Stabilizasyon Etabı',
    location: 'Ankara',
    year: '2023',
    scope: 'Çok etaplı projede yüksek hacimli kazı süreci kontrollü tempoda tamamlandı.'
  }
]

function ProjectsSection() {
  return (
    <section id="projeler" className="section projects-scene">
      <div className="container">
        <SectionTitle
          eyebrow="Referans Projeler"
          title="Yüksek ölçekli işlerde kanıtlanmış icra gücü"
          description="Farklı şehirler, aynı sonuç: kontrollü tempo, temiz teslim."
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
