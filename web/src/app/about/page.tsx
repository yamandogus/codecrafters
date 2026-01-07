"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Heart, 
  Code, 
  Award, 
  Globe, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Aktif Üye", color: "text-blue-600" },
    { icon: Code, value: "500+", label: "Tamamlanan Proje", color: "text-purple-600" },
    { icon: Award, value: "50+", label: "Başarı Hikayesi", color: "text-green-600" },
    { icon: Globe, value: "25+", label: "Ülke", color: "text-orange-600" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Topluluk Odaklı",
      description: "Herkesin katkıda bulunabileceği açık ve kapsayıcı bir ortam yaratıyoruz.",
      color: "bg-gray-100 dark:bg-gray-800"
    },
    {
      icon: Code,
      title: "Kaliteli Kod",
      description: "En iyi pratikleri takip eden, sürdürülebilir ve ölçeklenebilir kod yazımını teşvik ediyoruz.",
      color: "bg-gray-100 dark:bg-gray-800"
    },
    {
      icon: Target,
      title: "Sürekli Öğrenme",
      description: "Teknolojinin hızla değiştiği dünyada sürekli gelişim ve öğrenmeyi destekliyoruz.",
      color: "bg-gray-100 dark:bg-gray-800"
    },
    {
      icon: Users,
      title: "Mentorluk",
      description: "Deneyimli geliştiricilerin yeni başlayanlara rehberlik etmesini sağlıyoruz.",
      color: "bg-gray-100 dark:bg-gray-800"
    }
  ];

  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "Kurucu & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "10+ yıl yazılım geliştirme deneyimi. Topluluk odaklı yaklaşımı ile CodeCrafters'ı kurdu."
    },
    {
      name: "Zeynep Kaya",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Teknoloji lideri. Mikroservis mimarisi ve cloud native teknolojiler konusunda uzman."
    },
    {
      name: "Mehmet Demir",
      role: "Topluluk Yöneticisi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Topluluk etkinlikleri ve mentorluk programlarının organizasyonundan sorumlu."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Yazılım Geliştirme{" "}
              <span className="text-primary">
                Topluluğu
              </span>
            </h1>
                         <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
               2020&apos;den beri Türkiye&apos;nin en büyük yazılım geliştirme topluluğu olarak, 
               geliştiricilerin kariyerlerini ilerletmelerine ve modern teknolojileri 
               öğrenmelerine yardımcı oluyoruz.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Topluluğa Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">İletişime Geç</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full">
                <div className="mb-6">
                  <Target className="w-12 h-12 text-purple-600 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Misyonumuz
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Yazılım geliştiricilerin kariyerlerini ilerletmelerine yardımcı olmak, 
                  modern teknolojileri öğrenmelerini sağlamak ve güçlü bir topluluk 
                  oluşturmak. Herkesin katkıda bulunabileceği açık ve kapsayıcı bir 
                  ortam yaratıyoruz.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full">
                <div className="mb-6">
                  <TrendingUp className="w-12 h-12 text-violet-600 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Vizyonumuz
                  </h2>
                </div>
                                 <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                   Türkiye&apos;nin en büyük ve etkili yazılım geliştirme topluluğu olmak. 
                   Teknoloji dünyasında söz sahibi olan, yenilikçi projeler üreten ve 
                   global standartlarda yazılımcılar yetiştiren bir platform haline gelmek.
                 </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Değerlerimiz
            </h2>
                         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
               CodeCrafters&apos;ı özel kılan temel değerlerimiz ve prensiplerimiz
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ekibimiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              CodeCrafters&apos;ı yöneten deneyimli ekip üyelerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    width={128}
                    height={128}
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Topluluğumuzun Bir Parçası Olun
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Yazılım geliştirme yolculuğunuzda size rehberlik eden modern araçlar 
              ve topluluk desteği ile kariyerinizi hızlandırın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/register">
                  Ücretsiz Katıl
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-black px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">Daha Fazla Bilgi</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
