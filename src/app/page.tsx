import { CardHoverEffect } from "@/components/home/card";
import Header from "@/components/home/header";
import CommunityShowcase from "@/components/home/community-showcase";

export default function Home() {
  return (
    <div className="w-full">
      <Header />

      {/* Ana içerik bölümü */}
      <div className="py-16">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Neler Sunuyoruz?
          </h2>
          <CardHoverEffect />
        </div>
        <CommunityShowcase />
      </div>
    </div>
  );
}
