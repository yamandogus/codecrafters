# CodeCrafters API

Bu proje, **CodeCrafters** topluluk platformunun backend (arka uç) servisidir. Node.js, Express ve PostgreSQL kullanılarak geliştirilmiştir.

## Özellikler

- **Kimlik Doğrulama:** JWT tabanlı güvenli oturum yönetimi.
- **Veritabanı Yönetimi:** Prisma ORM ile güçlü ve tip güvenli veritabanı işlemleri.
- **Modüler Yapı:** Controller, Service ve Route katmanlarına ayrılmış temiz mimari.

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Çevresel Değişkenleri Ayarlayın:**
   `env.example` dosyasını kopyalayarak `.env` dosyasını oluşturun:
   ```bash
   cp env.example .env
   ```
   `.env` dosyasını kendi veritabanı bağlantı bilgileriniz ve JWT secret anahtarınızla güncelleyin.

3. **Prisma Client'ı Oluşturun:**
   ```bash
   npm run prisma:generate
   ```

4. **Veritabanı Migrasyonlarını Çalıştırın:**
   ```bash
   npm run prisma:migrate
   ```

## Çalıştırma

**Geliştirme Modu (Development):**
Değişiklikleri anlık olarak izleyen nodemon ile çalışır:
```bash
npm run dev
```

**Prodüksiyon Modu (Production):**
Derlenmiş dosyalar üzerinden çalışır:
```bash
npm start
```

## API Endpoints

Ana API rotaları şunlardır:

- `/api/auth` - Kayıt olma, giriş yapma ve profil işlemleri.
- `/api/users` - Kullanıcı listeleme ve detayları.
- `/api/blog` - Blog yazıları oluşturma, okuma, güncelleme.
- `/api/projects` - Proje paylaşımları.
- `/api/events` - Topluluk etkinlikleri.
- `/api/jobs` - İş ilanları.
- `/api/forum` - Tartışma forumu.
- `/api/learning` - Öğrenme kaynakları ve rehberler.

## Veritabanı ve ORM

Proje veritabanı olarak **PostgreSQL** kullanmaktadır. Veritabanı şeması ve sorguları **Prisma ORM** ile yönetilmektedir.

## Dosya Yapısı

```
src/
├── config/         # Veritabanı ve diğer konfigürasyonlar
├── controllers/    # İstekleri karşılayan ve yanıt dönen katman
├── middleware/     # Kimlik doğrulama ve hata yakalama ara katmanları
├── models/         # (Prisma kullanıldığı için genelde şema dosyaları)
├── routes/         # API rotalarının tanımları
├── services/       # İş mantığının bulunduğu katman
├── utils/          # Yardımcı fonksiyonlar ve araçlar
├── types/          # TypeScript tip tanımlamaları
├── app.ts          # Express uygulamasının yapılandırılması
└── server.ts       # Sunucunun başlatıldığı giriş dosyası
```
