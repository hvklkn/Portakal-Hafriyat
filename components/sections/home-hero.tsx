"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-graphite-950 text-white">
      <Image
        src="/images/hero-excavation.png"
        alt="Hafriyat sahasında ekskavatör ve kamyon"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,16,0.92),rgba(11,13,16,0.72)_42%,rgba(11,13,16,0.18))]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-graphite-950 to-transparent" />

      <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <StatusPill className="border-white/15 bg-white/10 text-primary backdrop-blur">
            Kurumsal hafriyat cozumleri
          </StatusPill>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Portakal Hafriyat
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
            Kazı, dolgu, nakliye ve saha hazırlığı operasyonlarını planlı,
            guvenli ve zamanında tamamlayan modern hafriyat ekibi.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/teklif-al">
                Teklif Al
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/projeler">Projeleri Incele</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-white/76 sm:grid-cols-3">
            {["Guclu ekipman parkı", "Planlı saha yonetimi", "Hızlı teklif sureci"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
