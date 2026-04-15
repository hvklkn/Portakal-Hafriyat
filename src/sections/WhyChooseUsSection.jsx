import SectionTitle from '../components/SectionTitle'

const reasons = [
  'Sözleşmeye uygun iş programı ve zamanında teslim yaklaşımı',
  'Güvenlik, kalite ve çevre yönetmeliğine uyumlu operasyon disiplini',
  'Farklı ölçeklerde projelere adapte olabilen esnek ekip ve ekipman gücü',
  'Saha ilerleyişini görünür kılan düzenli raporlama ve hızlı geri dönüş'
]

function WhyChooseUsSection() {
  return (
    <section id="neden-biz" className="section">
      <div className="container split-layout reverse">
        <div className="accent-panel">
          <p>Portakal Hafriyat, yalnızca uygulama değil; planlama ve risk yönetimi partnerinizdir.</p>
        </div>

        <div>
          <SectionTitle
            eyebrow="Neden Biz"
            title="Kurumsal projeler için güvenilir saha ortağı"
            description="Operasyonel doğruluk ve sürdürülebilir iş akışıyla projelerinizin takvimine güç katıyoruz."
          />
          <ul className="check-list">
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
