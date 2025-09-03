# CodeCrafters API

Bu proje CodeCrafters topluluk sitesi için backend API'dir.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment dosyasını oluşturun:
```bash
cp env.example .env
```

3. .env dosyasını düzenleyin (veritabanı bağlantısı, JWT secret vs.)

4. Prisma client'ı oluşturun:
```bash
npm run prisma:generate
```

5. Veritabanını oluşturun:
```bash
npm run prisma:migrate
```

## Çalıştırma

Development modunda:
```bash
npm run dev
```

Production modunda:
```bash
npm start
```

## API Endpoints

- `/api/auth` - Kimlik doğrulama
- `/api/users` - Kullanıcı yönetimi
- `/api/blog` - Blog yazıları
- `/api/projects` - Projeler
- `/api/events` - Etkinlikler
- `/api/jobs` - İş ilanları
- `/api/forum` - Forum
- `/api/learning` - Öğrenme kaynakları

## Veritabanı

PostgreSQL kullanılmaktadır. Prisma ORM ile yönetilmektedir.

## Dosya Yapısı

```
src/
├── controllers/     # Route handler'lar
├── models/         # Veritabanı modelleri
├── routes/         # API route'ları
├── middleware/     # Middleware'ler
├── services/       # İş mantığı
├── utils/          # Yardımcı fonksiyonlar
├── config/         # Konfigürasyon
├── types/          # TypeScript tipleri
├── app.ts          # Express app
└── server.ts       # Server
```
