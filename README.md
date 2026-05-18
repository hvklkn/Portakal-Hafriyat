# Portakal Hafriyat

Modern, mobil uyumlu hafriyat şirketi web sitesi ve admin paneli temeli.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Basit JWT admin authentication
- React Hook Form + Zod
- Lucide React
- Framer Motion

## Kurulum

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

PostgreSQL bağlantısını `.env` icindeki `DATABASE_URL` ile ayarlayın. İlk migration icin:

```bash
npm run prisma:migrate
npm run prisma:seed
```

Admin girisi veritabanındaki `AdminUser.passwordHash` uzerinden dogrulanır. Seed komutu admin kullanıcısını `ADMIN_SEED_EMAIL` ve `ADMIN_SEED_PASSWORD` ile olusturur veya gunceller.

Development ortamında env degerleri yoksa guvenli olmayan fallback degerler kullanılır. Production icin mutlaka guclu bir `JWT_SECRET`, `ADMIN_SEED_EMAIL` ve `ADMIN_SEED_PASSWORD` tanımlayın; fallback degerlerle production deploy etmeyin.

## Cloudinary Görsel Yükleme

Admin panelde hizmet, proje, galeri ve hero görselleri için manuel URL girilebilir veya Cloudinary üzerinden dosya yüklenebilir. Dosya yükleme için `.env` dosyasına şu değerleri ekleyin:

```bash
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

Bu değerler tanımlı değilse admin formlarında manuel URL girişi çalışmaya devam eder; dosya yükleme denemesinde kullanıcıya yapılandırma hatası gösterilir. `CLOUDINARY_API_SECRET` sadece server-side upload API tarafından kullanılır, client bundle’a gönderilmez.

## Güvenlik Notları

- Admin login, public teklif/iletişim formları ve admin görsel yükleme endpointi IP bazlı in-memory rate limit ile korunur. Bu koruma Vercel/serverless ortamında kalıcı değildir; yüksek trafikli production ortamında Redis veya Upstash gibi merkezi bir store ile değiştirilmelidir.
- Public iletişim ve teklif formlarında görünmeyen honeypot alanı bulunur. Normal kullanıcı deneyimini etkilemez, bot gönderimlerini veritabanına yazmadan süzer.
- `JWT_SECRET`, `ADMIN_SEED_PASSWORD`, Neon/PostgreSQL bağlantı bilgileri ve Cloudinary secret değerleri asla repoya commitlenmemelidir. Production ortamında güçlü ve benzersiz değerler kullanılmalıdır.
- Admin session cookie değeri `httpOnly`, `sameSite=lax`, `path=/` olarak set edilir; production ortamında `secure=true` çalışır.
- Temel güvenlik header’ları Next.js config üzerinden eklenir: frame engelleme, MIME sniffing koruması, referrer policy ve kısıtlı permissions policy.

## Scriptler

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:seed`
- `npm run prisma:studio`

## Route Yapısı

- `/`
- `/hizmetler`
- `/projeler`
- `/galeri`
- `/iletisim`
- `/teklif-al`
- `/admin/login`
- `/admin/dashboard`
- `/admin/services`
- `/admin/projects`
- `/admin/gallery`
- `/admin/quotes`
- `/admin/settings`

## Sonraki Adımlar

- Admin CRUD formları
- Teklif formunun veritabanına yazılması
- Public site içeriklerinin Prisma üzerinden okunması
