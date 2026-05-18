import { hash } from "bcryptjs";

import { prisma } from "../lib/prisma";

const SITE_SETTINGS_ID = "site_settings";
const DEV_ADMIN_EMAIL = "admin@portakalhafriyat.com";
const DEV_ADMIN_PASSWORD = "change-me-now";

function getSeedAdminEmail() {
  const email = (process.env.ADMIN_SEED_EMAIL ?? DEV_ADMIN_EMAIL)
    .trim()
    .toLowerCase();

  if (!process.env.ADMIN_SEED_EMAIL && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SEED_EMAIL must be set in production.");
  }

  return email;
}

function getSeedAdminPassword() {
  const password = process.env.ADMIN_SEED_PASSWORD ?? DEV_ADMIN_PASSWORD;

  if (!process.env.ADMIN_SEED_PASSWORD && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SEED_PASSWORD must be set in production.");
  }

  if (!process.env.ADMIN_SEED_PASSWORD) {
    console.warn(
      "Using insecure development admin seed password. Set ADMIN_SEED_PASSWORD before production."
    );
  }

  return password;
}

async function seedSiteSettings() {
  await prisma.siteSetting.upsert({
    where: { id: SITE_SETTINGS_ID },
    update: {
      companyName: process.env.COMPANY_NAME ?? "Portakal Hafriyat",
      slogan: "Guvenilir hafriyat ve is makinesi cozumleri",
      description:
        "Altyapi, kazi, dolgu, nakliye ve saha hazirligi alanlarinda kurumsal hafriyat cozumleri.",
      phone: process.env.COMPANY_PHONE ?? "+90 555 000 00 00",
      email: process.env.COMPANY_EMAIL ?? "info@portakalhafriyat.com",
      address: process.env.COMPANY_ADDRESS ?? "Adana, Turkiye",
      whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP ?? "+905550000000",
      googleMapsUrl: null,
      instagramUrl: null,
      facebookUrl: null,
      heroTitle: "Guvenilir Hafriyat ve Is Makinesi Cozumleri",
      heroSubtitle:
        "Temel kazisi, hafriyat tasima, moloz tasima, dolgu isleri ve arazi duzenleme hizmetlerinde profesyonel cozumler sunuyoruz.",
      heroImageUrl: "/images/hero-excavation.png",
      seoTitle: "Portakal Hafriyat",
      seoDescription:
        "Adana ve cevresinde hafriyat, moloz tasima, dolgu ve is makinesi hizmetleri.",
      logoUrl: null
    },
    create: {
      id: SITE_SETTINGS_ID,
      singletonKey: 1,
      companyName: process.env.COMPANY_NAME ?? "Portakal Hafriyat",
      slogan: "Guvenilir hafriyat ve is makinesi cozumleri",
      description:
        "Altyapi, kazi, dolgu, nakliye ve saha hazirligi alanlarinda kurumsal hafriyat cozumleri.",
      phone: process.env.COMPANY_PHONE ?? "+90 555 000 00 00",
      email: process.env.COMPANY_EMAIL ?? "info@portakalhafriyat.com",
      address: process.env.COMPANY_ADDRESS ?? "Adana, Turkiye",
      whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP ?? "+905550000000",
      googleMapsUrl: null,
      instagramUrl: null,
      facebookUrl: null,
      heroTitle: "Guvenilir Hafriyat ve Is Makinesi Cozumleri",
      heroSubtitle:
        "Temel kazisi, hafriyat tasima, moloz tasima, dolgu isleri ve arazi duzenleme hizmetlerinde profesyonel cozumler sunuyoruz.",
      heroImageUrl: "/images/hero-excavation.png",
      seoTitle: "Portakal Hafriyat",
      seoDescription:
        "Adana ve cevresinde hafriyat, moloz tasima, dolgu ve is makinesi hizmetleri.",
      logoUrl: null
    }
  });
}

async function seedAdminUser() {
  const email = getSeedAdminEmail();
  const passwordHash = await hash(getSeedAdminPassword(), 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      isActive: true,
      role: "admin"
    },
    create: {
      email,
      name: "Site Yoneticisi",
      passwordHash,
      role: "admin",
      isActive: true
    }
  });
}

async function seedServices() {
  const services = [
    {
      title: "Temel Kazısı",
      slug: "temel-kazisi",
      summary: "Konut ve ticari yapilar icin kontrollu temel kazisi.",
      description:
        "Proje kotlarina uygun temel kazisi, saha guvenligi ve hafriyat tasima sureci planli sekilde yurutulur.",
      icon: "Shovel",
      sortOrder: 1
    },
    {
      title: "Hafriyat Taşıma",
      slug: "hafriyat-tasima",
      summary: "Hafriyat topragi ve dolgu malzemesi icin kamyon nakliyesi.",
      description:
        "Saha cikisindan dokum noktasina kadar hafriyat tasima operasyonu zamanlama ve arac takibiyle organize edilir.",
      icon: "Truck",
      sortOrder: 2
    },
    {
      title: "Moloz Taşıma",
      slug: "moloz-tasima",
      summary: "Yikim ve tadilat sonrasi molozlarin sahadan kaldirilmasi.",
      description:
        "Moloz toplama, yukleme ve uygun dokum alanina nakliye surecleri temiz saha teslimiyle tamamlanir.",
      icon: "Construction",
      sortOrder: 3
    },
    {
      title: "Dolgu İşleri",
      slug: "dolgu-isleri",
      summary: "Stabil dolgu, serim ve sikistirma calismalari.",
      description:
        "Proje ihtiyacina gore dolgu malzemesi temini, serimi ve katmanli sikistirma calismalari yapilir.",
      icon: "Layers3",
      sortOrder: 4
    },
    {
      title: "Arazi Düzenleme",
      slug: "arazi-duzenleme",
      summary: "Saha tesviyesi, kot duzenleme ve is oncesi hazirlik.",
      description:
        "Insaat, depo, fabrika ve tarla sahalarinda arazi duzenleme ve tesviye operasyonlari gerceklestirilir.",
      icon: "Layers3",
      sortOrder: 5
    },
    {
      title: "İş Makinesi Kiralama",
      slug: "is-makinesi-kiralama",
      summary: "Operatorlu ekskavator, kepce ve yardimci makine kiralama.",
      description:
        "Kisa veya uzun sureli is makinesi ihtiyaclari icin operatorlu ekipman cozumleri saglanir.",
      icon: "Construction",
      sortOrder: 6
    },
    {
      title: "Kamyon Nakliye",
      slug: "kamyon-nakliye",
      summary: "Santiye ve malzeme tasima icin kamyon nakliye hizmeti.",
      description:
        "Dolgu, kum, mucur, hafriyat ve santiye malzemeleri icin bolgesel kamyon nakliye planlamasi yapilir.",
      icon: "Truck",
      sortOrder: 7
    },
    {
      title: "Yol Açma Çalışmaları",
      slug: "yol-acma-calismalari",
      summary: "Saha ici ulasim, servis yolu ve gecici yol acma islemleri.",
      description:
        "Santiye ve arazi icinde makine gecisi, lojistik ve ulasim icin yol acma calismalari tamamlanir.",
      icon: "Shovel",
      sortOrder: 8
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    });
  }
}

async function seedProjects() {
  const projects = [
    {
      title: "Sarıçam Temel Kazısı",
      slug: "saricam-temel-kazisi",
      location: "Adana",
      district: "Sarıçam",
      category: "Temel Kazısı",
      year: "2026",
      summary: "Konut projesi icin temel kazisi ve hafriyat tasima calismasi.",
      description:
        "Saha kotlarina uygun kazı, kamyon koordinasyonu ve temiz teslim sureci tamamlandi.",
      imageUrl: "/images/hero-excavation.png",
      status: "COMPLETED" as const,
      isFeatured: true,
      isPublished: true
    },
    {
      title: "Seyhan Moloz Taşıma",
      slug: "seyhan-moloz-tasima",
      location: "Adana",
      district: "Seyhan",
      category: "Moloz Taşıma",
      year: "2026",
      summary: "Tadilat sonrasi molozlarin sahadan kaldirilmasi ve nakliyesi.",
      description:
        "Dar alan lojistigine uygun arac planlamasiyla moloz tasima operasyonu yurutuldu.",
      imageUrl: "/images/hero-excavation.png",
      status: "IN_PROGRESS" as const,
      isFeatured: true,
      isPublished: true
    },
    {
      title: "Çukurova Arazi Düzenleme",
      slug: "cukurova-arazi-duzenleme",
      location: "Adana",
      district: "Çukurova",
      category: "Arazi Düzenleme",
      year: "2025",
      summary: "Ticari alan icin tesviye, dolgu ve saha hazirligi.",
      description:
        "Arazi duzenleme, dolgu serimi ve makineyle tesviye calismalari planli sekilde tamamlandi.",
      imageUrl: "/images/hero-excavation.png",
      status: "COMPLETED" as const,
      isFeatured: false,
      isPublished: true
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }
}

async function seedGalleryImages() {
  const saricamProject = await prisma.project.findUnique({
    where: { slug: "saricam-temel-kazisi" }
  });
  const seyhanProject = await prisma.project.findUnique({
    where: { slug: "seyhan-moloz-tasima" }
  });
  const cukurovaProject = await prisma.project.findUnique({
    where: { slug: "cukurova-arazi-duzenleme" }
  });

  const images = [
    {
      title: "Temel kazısı saha görünümü",
      slug: "temel-kazisi-saha-gorunumu",
      alt: "Temel kazisi yapilan hafriyat sahasi",
      imageUrl: "/images/hero-excavation.png",
      provider: "local",
      sortOrder: 1,
      projectId: saricamProject?.id
    },
    {
      title: "Kamyon yükleme operasyonu",
      slug: "kamyon-yukleme-operasyonu",
      alt: "Hafriyat kamyonuna malzeme yukleme operasyonu",
      imageUrl: "/images/hero-excavation.png",
      provider: "local",
      sortOrder: 2,
      projectId: saricamProject?.id
    },
    {
      title: "Moloz taşıma hazırlığı",
      slug: "moloz-tasima-hazirligi",
      alt: "Moloz tasima oncesi saha hazirligi",
      imageUrl: "/images/hero-excavation.png",
      provider: "local",
      sortOrder: 3,
      projectId: seyhanProject?.id
    },
    {
      title: "Arazi tesviye çalışması",
      slug: "arazi-tesviye-calismasi",
      alt: "Arazi duzenleme ve tesviye calismasi",
      imageUrl: "/images/hero-excavation.png",
      provider: "local",
      sortOrder: 4,
      projectId: cukurovaProject?.id
    }
  ];

  for (const image of images) {
    await prisma.galleryImage.upsert({
      where: { slug: image.slug },
      update: image,
      create: image
    });
  }
}

async function main() {
  await seedSiteSettings();
  await seedAdminUser();
  await seedServices();
  await seedProjects();
  await seedGalleryImages();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
