import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'Lojistik Depo Sahası Altyapı Hazırlığı',
    location: 'İstanbul',
    scope: 'Geniş alan kazı, zemin düzenleme ve etaplı dolgu uygulamaları başarıyla tamamlandı.'
  },
  {
    title: 'Kentsel Dönüşüm Yıkım ve Temizleme',
    location: 'Kocaeli',
    scope: 'Kontrollü yıkım, atık yönetimi ve yeni yapı sürecine uygun saha teslimi gerçekleştirildi.'
  },
  {
    title: 'Sanayi Tesisi Saha İyileştirme',
    location: 'Bursa',
    scope: 'Yoğun iş programına uygun hızlı operasyon ile üretim takvimi kesintisiz desteklendi.'
  }
]

function ProjectsSection() {
  return (
    <section id="projeler" className="section section-soft">
      <div className="container">
        <SectionTitle
          eyebrow="Projeler"
          title="Farklı ölçeklerde tamamlanan saha çalışmaları"
          description="Sektör gereksinimlerine uygun, ölçülebilir sonuçlar üreten proje deneyimlerimizden örnekler."
        />

        <div className="card-grid projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              location={project.location}
              scope={project.scope}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
