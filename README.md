# CodeCrafters

**CodeCrafters**, yazılım geliştiriciler için tasarlanmış kapsamlı bir topluluk, işbirliği ve öğrenme platformudur. Bu depo, projenin hem Frontend (Web) hem de Backend (API) kodlarını barındıran monorepo yapısındadır.

🚀 **Canlı Demo:** [https://codecrafters-seven.vercel.app/](https://codecrafters-seven.vercel.app/)

## Proje Hakkında

CodeCrafters, geliştiricilerin bir araya gelerek projelerini paylaştığı, blog yazıları yayınladığı, etkinlikler düzenlediği ve birbirlerine destek olduğu bir ekosistem sunar.

### Temel Özellikler

*   **Topluluk Odaklı:** Forumlar, etkinlikler ve proje vitrinleri.
*   **Kariyer:** İş ilanları ve kariyer fırsatları.
*   **Öğrenim:** Kaynak paylaşımı ve rehberler.
*   **Modern Teknoloji:** En güncel web teknolojileri ile geliştirilmiştir.

## Dosya Yapısı ve Mantığı

Proje iki ana klasöre ayrılmıştır:

```
codecrafters/
├── api/      # Backend (Node.js, Express, Prisma, PostgreSQL)
└── web/      # Frontend (Next.js, React, Tailwind CSS)
```

### 1. Web (Frontend)
`web` klasörü, kullanıcı arayüzünü barındırır. Next.js App Router yapısı kullanılarak modern ve hızlı bir deneyim sunar.
*   **Teknolojiler:** Next.js, React, Tailwind CSS, TypeScript.
*   **Detaylar:** `web/README.md` dosyasında daha fazla bilgi bulabilirsiniz.

### 2. API (Backend)
`api` klasörü, tüm iş mantığını ve veri yönetimini sağlayan RESTful servistir.
*   **Teknolojiler:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL.
*   **Detaylar:** `api/README.md` dosyasında veritabanı kurulumu ve endpoint detaylarını bulabilirsiniz.

## Hızlı Başlangıç

Projeyi yerel ortamınızda çalıştırmak için her iki parçayı da ayrı ayrı ayağa kaldırmanız gerekir.

### API'yi Çalıştırma
```bash
cd api
npm install
npm run dev
```

### Web Arayüzünü Çalıştırma
```bash
cd web
npm install
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı kullanmaya başlayabilirsiniz.
