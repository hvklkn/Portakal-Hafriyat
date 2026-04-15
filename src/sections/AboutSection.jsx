import SectionTitle from '../components/SectionTitle'

function AboutSection() {
  return (
    <section id="hakkimizda" className="section">
      <div className="container split-layout">
        <div>
          <SectionTitle
            eyebrow="Portakal Hafriyat"
            title="Sahada güven, ofiste planlı yönetim"
            description="Projelerin ilk adımından teslim aşamasına kadar tüm hafriyat sürecini entegre bir yaklaşımla yürütüyoruz."
          />
          <p>
            Kamu ve özel sektör projelerinde, iş güvenliği ve kalite standartlarına uygun operasyon modeliyle
            çalışıyoruz. Her işte teknik doğruluk, zaman disiplini ve iletişim netliğini ön planda tutuyoruz.
          </p>
        </div>
        <div className="info-panel">
          <h3>Kurumsal Yaklaşımımız</h3>
          <p>Her saha için özel risk analizi, makine planı ve etaplandırılmış çalışma takvimi oluşturuyoruz.</p>
          <p>Müşterilerimize tek temas noktasıyla hızlı koordinasyon ve düzenli ilerleme raporları sunuyoruz.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
