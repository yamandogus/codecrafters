"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Play, 
  Clock, 
  Star, 
  Users, 
  ArrowRight,
  Search,
  Target
} from "lucide-react";
import Link from "next/link";

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "Tümü", icon: BookOpen, color: "bg-purple-100 dark:bg-purple-900" },
    { id: "git", name: "Git & GitHub", icon: Code, color: "bg-blue-100 dark:bg-blue-900" },
    { id: "web", name: "Web Temelleri", icon: Code, color: "bg-green-100 dark:bg-green-900" },
    { id: "backend", name: "Backend Temelleri", icon: Code, color: "bg-orange-100 dark:bg-orange-900" },
    { id: "database", name: "Veritabanı", icon: Code, color: "bg-red-100 dark:bg-red-900" },
    { id: "api", name: "API Kullanımı", icon: Code, color: "bg-pink-100 dark:bg-pink-900" },
    { id: "deploy", name: "Deploy & Hosting", icon: Code, color: "bg-indigo-100 dark:bg-indigo-900" }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Git & GitHub Temelleri",
      description: "Versiyon kontrolü, commit, branch, merge ve pull request süreçlerini öğrenin.",
      category: "git",
      duration: "3 saat",
      level: "Başlangıç",
      rating: 4.8,
      students: 1250,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["Git", "GitHub", "Version Control", "Collaboration"]
    },
    {
      id: 2,
      title: "HTML, CSS ve JavaScript Temelleri",
      description: "Web geliştirmenin temel taşlarını öğrenin ve ilk projelerinizi yapın.",
      category: "web",
      duration: "6 saat",
      level: "Başlangıç",
      rating: 4.7,
      students: 1890,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      tags: ["HTML", "CSS", "JavaScript", "Web Development"]
    },
    {
      id: 3,
      title: "Node.js ile Backend Geliştirme",
      description: "Sunucu tarafı programlama ve API geliştirme temellerini öğrenin.",
      category: "backend",
      duration: "5 saat",
      level: "Başlangıç",
      rating: 4.9,
      students: 1100,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      tags: ["Node.js", "Express", "API", "Backend"]
    },
    {
      id: 4,
      title: "SQL ve Veritabanı Temelleri",
      description: "Veritabanı tasarımı, SQL sorguları ve veri yönetimi öğrenin.",
      category: "database",
      duration: "4 saat",
      level: "Başlangıç",
      rating: 4.6,
      students: 950,
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
      tags: ["SQL", "Database", "MySQL", "Data Management"]
    },
    {
      id: 5,
      title: "REST API ve HTTP Temelleri",
      description: "API kullanımı, HTTP metodları ve veri alışverişi öğrenin.",
      category: "api",
      duration: "3 saat",
      level: "Başlangıç",
      rating: 4.8,
      students: 850,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      tags: ["REST API", "HTTP", "JSON", "API Integration"]
    },
    {
      id: 6,
      title: "Vercel ve Netlify ile Deploy",
      description: "Projelerinizi canlıya alın ve hosting süreçlerini öğrenin.",
      category: "deploy",
      duration: "2 saat",
      level: "Başlangıç",
      rating: 4.7,
      students: 780,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tags: ["Deploy", "Hosting", "Vercel", "Netlify"]
    }
  ];

  const features = [
    {
      icon: Play,
      title: "Topluluk Kaynakları",
      description: "Topluluk üyeleri tarafından paylaşılan kaliteli öğrenme materyalleri"
    },
    {
      icon: Code,
      title: "Pratik Projeler",
      description: "Gerçek dünya projeleri ile öğrendiklerinizi pekiştirin"
    },
    {
      icon: Users,
      title: "Mentorluk Desteği",
      description: "Deneyimli geliştiricilerden mentorluk ve rehberlik alın"
    },
    {
      icon: Target,
      title: "Kariyer Rehberliği",
      description: "Junior'dan senior'a kariyer yolculuğunuzda rehberlik"
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 dark:from-purple-950/30 dark:via-violet-950/30 dark:to-pink-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Öğrenme{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Merkezi
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Junior yazılımcılar için temel konuları öğrenin. Topluluk tarafından paylaşılan 
              kaynaklar ve mentorluk desteği ile kariyerinizi başlatın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                Eğitimlere Başla
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pages/contact">Danışmanlık Al</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Öğrenme Kaynaklarını Keşfedin
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Junior yazılımcılar için hazırlanmış temel konuları keşfedin
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Kaynak ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="relative">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                                         <div className="absolute top-4 left-4">
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200">
                         {tutorial.level}
                       </span>
                     </div>
                  </div>
                  <CardContent className="p-6">
                                         <div className="flex items-center gap-2 mb-3">
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                         {categories.find(c => c.id === tutorial.category)?.name}
                       </span>
                     </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {tutorial.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {tutorial.students}
                      </div>
                    </div>

                                         <div className="flex flex-wrap gap-1 mb-4">
                       {tutorial.tags.slice(0, 3).map((tag, tagIndex) => (
                         <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                           {tag}
                         </span>
                       ))}
                     </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                      Kaynağı İncele
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Arama kriterlerinize uygun kaynak bulunamadı.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Yazılım Kariyerinizi Başlatın
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Temel konuları öğrenin, pratik deneyim kazanın ve 
              topluluk desteği ile kariyerinizi bir üst seviyeye taşıyın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/register">
                  Ücretsiz Başla
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/contact">Danışmanlık Al</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 