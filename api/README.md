# CodeCrafters Backend API

Bu proje, CodeCrafters platformu için NestJS ile geliştirilmiş backend API'sidir.

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn
- PostgreSQL (opsiyonel)

### Kurulum Adımları

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Environment dosyasını oluşturun:**
```bash
cp env.example .env
```

3. **Environment değişkenlerini düzenleyin:**
`.env` dosyasındaki değişkenleri kendi ortamınıza göre ayarlayın.

4. **Development modunda çalıştırın:**
```bash
npm run start:dev
```

## 📁 Proje Yapısı

```
src/
├── common/           # Ortak kullanım dosyaları
│   ├── decorators/  # Custom decorators
│   ├── filters/     # Exception filters
│   ├── guards/      # Auth guards
│   ├── interfaces/  # TypeScript interfaces
│   └── pipes/       # Validation pipes
├── config/          # Konfigürasyon dosyaları
├── modules/         # Feature modülleri
│   ├── auth/        # Kimlik doğrulama
│   ├── users/       # Kullanıcı yönetimi
│   ├── projects/    # Proje yönetimi
│   ├── community/   # Topluluk özellikleri
│   ├── blog/        # Blog yönetimi
│   ├── mentorship/  # Mentorluk sistemi
│   ├── jobs/        # İş ilanları
│   ├── events/      # Etkinlik yönetimi
│   ├── tutorials/   # Eğitim içerikleri
│   └── forum/       # Forum sistemi
└── main.ts          # Ana uygulama dosyası
```

## 🛠️ Kullanılabilir Komutlar

- `npm run start` - Uygulamayı production modunda başlatır
- `npm run start:dev` - Uygulamayı development modunda başlatır (hot reload)
- `npm run start:debug` - Debug modunda başlatır
- `npm run build` - Uygulamayı derler
- `npm run test` - Testleri çalıştırır
- `npm run test:watch` - Testleri watch modunda çalıştırır
- `npm run lint` - ESLint ile kod analizi yapar

## 🌐 API Endpoints

API, `/api` prefix'i ile çalışır. Örnek endpoint'ler:

- `GET /api` - Ana endpoint
- `GET /api/auth` - Kimlik doğrulama
- `GET /api/users` - Kullanıcılar
- `GET /api/projects` - Projeler
- `GET /api/community` - Topluluk
- `GET /api/blog` - Blog
- `GET /api/mentorship` - Mentorluk
- `GET /api/jobs` - İş ilanları
- `GET /api/events` - Etkinlikler
- `GET /api/tutorials` - Eğitimler
- `GET /api/forum` - Forum

## 🔧 Geliştirme

### Yeni Modül Ekleme

1. `src/modules/` altında yeni klasör oluşturun
2. `module.ts`, `controller.ts`, `service.ts` dosyalarını ekleyin
3. Ana `app.module.ts` dosyasına import edin

### Yeni Endpoint Ekleme

1. İlgili controller dosyasında yeni method ekleyin
2. Gerekli DTO'ları oluşturun
3. Service'te business logic'i implement edin

## 📝 Notlar

- Tüm modüller şu anda boş olarak oluşturulmuştur
- Sadece temel yapı kurulmuştur
- Her modül için gerekli implementasyon yapılmalıdır
- Database bağlantısı ve entity'ler eklenmelidir
- Validation ve error handling geliştirilmelidir

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun
