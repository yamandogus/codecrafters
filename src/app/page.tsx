import { CardHoverEffect } from "@/components/home/card";
import { Gallery } from "@/components/home/galleryCarousel";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Header />

      {/* Ana içerik bölümü */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Neler Sunuyoruz?
          </h2>
          <CardHoverEffect />
        </div>
        <div>
          <Gallery />
        </div>
      </div>
    </div>
  );
}
