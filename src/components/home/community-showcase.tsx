"use client";

import { useState } from "react";

import DeveloperShowcase from "../ui/developer-showcase";
import { Carousel, CarouselItem, CarouselApi } from "../ui/carousel";

const communityData = [
  {
    id: "comment-1",
    author: "Ahmet Yılmaz",
    content:
      "CodeCrafters topluluğu sayesinde kariyer hedeflerime ulaştım! Buradaki mentorlar ve projeler gerçekten değerli.",
    rating: 5,
    date: "2024-01-15",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-2",
    author: "Ayşe Kaya",
    content:
      "Harika bir öğrenme ortamı! Projeler üzerinde çalışırken hem eğleniyor hem de öğreniyorum.",
    rating: 5,
    date: "2024-01-12",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-3",
    author: "Mehmet Demir",
    content:
      "Toplulukta öğrendiğim DevOps teknikleri sayesinde işimde büyük fark yarattım. Teşekkürler!",
    rating: 4,
    date: "2024-01-10",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-4",
    author: "Fatma Şahin",
    content:
      "Mobile development alanında kendimi geliştirmek için mükemmel bir platform. Sürekli yeni şeyler öğreniyorum.",
    rating: 5,
    date: "2024-01-08",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-5",
    author: "Ali Çelik",
    content:
      "Backend geliştirme konusunda aldığım eğitimler ve projeler kariyer gelişimime çok katkı sağladı.",
    rating: 4,
    date: "2024-01-05",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

export default function CommunityShowcase() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <div className="min-h-screen">
      {/* Grid Layout: Developer Showcase + Comments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col">
            {/* Developer Showcase - Takes 2/3 of the space */}
            <div className="mb-8">
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Topluluk Üyeleri
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Farklı alanlardan deneyimli geliştiricilerle tanışın ve
                  onların projelerini keşfedin.
                </p>
              </div>
              <DeveloperShowcase />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
