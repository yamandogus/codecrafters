"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Github, 
  ExternalLink, 
  Users, 
  Star, 
  Eye, 
  ArrowRight,
  Search,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "Tümü", icon: Code, color: "bg-purple-100 dark:bg-purple-900" },
    { id: "web", name: "Web Uygulamaları", icon: Globe, color: "bg-blue-100 dark:bg-blue-900" },
    { id: "mobile", name: "Mobil Uygulamalar", icon: Smartphone, color: "bg-green-100 dark:bg-green-900" },
    { id: "backend", name: "Backend Sistemler", icon: Database, color: "bg-orange-100 dark:bg-orange-900" },
    { id: "ai", name: "AI/ML Projeleri", icon: Zap, color: "bg-pink-100 dark:bg-pink-900" },
    { id: "devops", name: "DevOps Araçları", icon: Cloud, color: "bg-red-100 dark:bg-red-900" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      description: "Modern React ve Node.js ile geliştirilmiş tam özellikli e-ticaret platformu. Ödeme entegrasyonu, stok yönetimi ve admin paneli içerir.",
      category: "web",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      stars: 245,
      forks: 89,
      views: 1200,
      demo: "https://demo-ecommerce.com",
      github: "https://github.com/codecrafters/ecommerce",
      featured: true
    },
    {
      id: 2,
      title: "Fitness Takip Uygulaması",
      description: "Flutter ile geliştirilmiş cross-platform fitness takip uygulaması. Egzersiz planları, beslenme takibi ve sosyal özellikler.",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      tech: ["Flutter", "Dart", "Firebase", "Provider"],
      stars: 189,
      forks: 67,
      views: 950,
      demo: "https://fitness-app-demo.com",
      github: "https://github.com/codecrafters/fitness-app",
      featured: true
    },
    {
      id: 3,
      title: "Mikroservis API Gateway",
      description: "Yüksek performanslı mikroservis mimarisi için API Gateway. Rate limiting, authentication ve load balancing özellikleri.",
      category: "backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tech: ["Go", "Docker", "Kubernetes", "Redis"],
      stars: 156,
      forks: 45,
      views: 780,
      demo: "https://api-gateway-demo.com",
      github: "https://github.com/codecrafters/api-gateway",
      featured: false
    },
    {
      id: 4,
      title: "Duygu Analizi Chatbot",
      description: "Python ve TensorFlow ile geliştirilmiş AI destekli chatbot. Metin analizi ve duygu tespiti yapabilir.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tech: ["Python", "TensorFlow", "NLTK", "FastAPI"],
      stars: 203,
      forks: 78,
      views: 1100,
      demo: "https://chatbot-demo.com",
      github: "https://github.com/codecrafters/sentiment-chatbot",
      featured: true
    },
    {
      id: 5,
      title: "CI/CD Pipeline Otomasyonu",
      description: "GitHub Actions ve Docker ile otomatik deployment pipeline. Test, build ve deploy süreçlerini otomatikleştirir.",
      category: "devops",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
      tech: ["GitHub Actions", "Docker", "AWS", "Terraform"],
      stars: 134,
      forks: 52,
      views: 650,
      demo: "https://cicd-demo.com",
      github: "https://github.com/codecrafters/cicd-pipeline",
      featured: false
    },
    {
      id: 6,
      title: "Real-time Chat Uygulaması",
      description: "Socket.io ile gerçek zamanlı mesajlaşma uygulaması. Grup sohbetleri, dosya paylaşımı ve bildirimler.",
      category: "web",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=250&fit=crop",
      tech: ["React", "Socket.io", "Express", "MongoDB"],
      stars: 178,
      forks: 63,
      views: 890,
      demo: "https://chat-app-demo.com",
      github: "https://github.com/codecrafters/real-time-chat",
      featured: false
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Açık Kaynak",
      description: "Tüm projelerimiz açık kaynak ve topluluk katkılarına açık"
    },
    {
      icon: Users,
      title: "Topluluk Odaklı",
      description: "Geliştiriciler tarafından, geliştiriciler için yapılmış projeler"
    },
    {
      icon: Star,
      title: "Kaliteli Kod",
      description: "En iyi pratikleri takip eden, sürdürülebilir kod yapısı"
    },
    {
      icon: Zap,
      title: "Modern Teknolojiler",
      description: "Güncel teknolojiler ve framework'ler kullanılarak geliştirildi"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(project => project.featured);

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
              Topluluk{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Projeleri
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              CodeCrafters topluluğu tarafından geliştirilen açık kaynak projeleri keşfedin. 
              Modern teknolojiler ile gerçek dünya problemlerini çözen çözümler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                Projeleri Keşfet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pages/contact">Proje Öner</Link>
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Öne Çıkan Projeler
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Topluluğumuzun en popüler ve yenilikçi projeleri
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600 text-white">
                          Öne Çıkan
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {categories.find(c => c.id === project.category)?.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {project.stars}
                          </div>
                          <div className="flex items-center gap-1">
                            <Github className="w-4 h-4" />
                            {project.forks}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tüm Projeler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              İhtiyacınıza uygun projeyi bulun ve katkıda bulunun
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Proje ara..."
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Github className="w-4 h-4" />
                          {project.forks}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          GitHub
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Arama kriterlerinize uygun proje bulunamadı.
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
              Projelerinizi Paylaşın
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Kendi projelerinizi topluluğumuzla paylaşın, geri bildirim alın ve 
              diğer geliştiricilerle iş birliği yapın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/contact">
                  Proje Öner
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/register">Topluluğa Katıl</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 