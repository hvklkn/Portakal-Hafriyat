import { ChevronDown } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    question: "Hangi bölgelere hizmet veriyorsunuz?",
    answer:
      "Başta Adana ve çevre ilçeler olmak üzere proje lokasyonuna göre çevre illerde de hafriyat ve nakliye hizmeti veriyoruz."
  },
  {
    question: "Yerinde keşif yapıyor musunuz?",
    answer:
      "Evet. İşin kapsamı, saha erişimi, metraj ve ekipman ihtiyacını netleştirmek için yerinde keşif planlayabiliriz."
  },
  {
    question: "Moloz taşıma hizmetiniz var mı?",
    answer:
      "Evet. Tadilat, yıkım ve şantiye sonrası molozların yüklenmesi ve uygun alana taşınması için destek sağlıyoruz."
  },
  {
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer:
      "Fiyat; işin lokasyonu, hacmi, çalışma süresi, ekipman ihtiyacı ve nakliye mesafesine göre netleştirilir."
  },
  {
    question: "Acil işler için ulaşabilir miyiz?",
    answer:
      "Evet. Telefon veya WhatsApp üzerinden hızlıca ulaşabilir, uygun ekip ve araç durumuna göre planlama isteyebilirsiniz."
  }
];

export function FAQSection() {
  return (
    <section className="border-y border-border bg-muted py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeader
          eyebrow="Sık sorulanlar"
          title="Teklif öncesi merak edilenler"
          description="İlk görüşmede işi hızlı anlamamıza yardımcı olan temel başlıklar."
        />

        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.035}>
              <details className="group rounded-lg border border-border bg-background p-5 shadow-line open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold">
                  {faq.question}
                  <ChevronDown className="size-5 shrink-0 text-signal-600 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
