import { HoverEffect } from "./card-hover-effect";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Modern Araçlar",
    description:
      "En güncel teknolojilerle geliştirilmiş araçlar ve kütüphaneler. React, Next.js, TypeScript ve daha fazlası.",
    link: "#",
  },
  {
    title: "Topluluk Desteği",
    description:
      "Deneyimli geliştiricilerden oluşan aktif topluluk. Sorularınızı sorun, deneyimlerinizi paylaşın.",
    link: "#",
  },
  {
    title: "Hızlı Öğrenme",
    description:
      "Pratik örnekler ve kapsamlı dokümantasyon ile hızlıca öğrenin. Adım adım rehberler.",
    link: "#",
  },
  {
    title: "Proje Şablonları",
    description:
      "Hazır proje şablonları ile hızlıca başlayın. Modern ve temiz kod yapısı ile geliştirin.",
    link: "#",
  },
  {
    title: "Mentorluk",
    description:
      "Deneyimli geliştiricilerden birebir mentorluk alın. Kariyerinizi hızlandırın.",
    link: "#",
  },
  {
    title: "İş Fırsatları",
    description:
      "Topluluk üyeleri için özel iş fırsatları. Şirketlerle doğrudan bağlantı kurun.",
    link: "#",
  },
];
