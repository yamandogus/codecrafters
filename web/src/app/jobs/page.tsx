"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight,
  Search,
  Star,
  Bookmark,
  Share2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = [
    { id: "all", name: "Tümü", icon: Briefcase, color: "bg-purple-100 dark:bg-purple-900" },
    { id: "frontend", name: "Frontend", icon: Briefcase, color: "bg-blue-100 dark:bg-blue-900" },
    { id: "backend", name: "Backend", icon: Briefcase, color: "bg-green-100 dark:bg-green-900" },
    { id: "fullstack", name: "Full Stack", icon: Briefcase, color: "bg-orange-100 dark:bg-orange-900" },
    { id: "mobile", name: "Mobil", icon: Briefcase, color: "bg-pink-100 dark:bg-pink-900" },
    { id: "devops", name: "DevOps", icon: Briefcase, color: "bg-red-100 dark:bg-red-900" },
    { id: "data", name: "Data Science", icon: Briefcase, color: "bg-indigo-100 dark:bg-indigo-900" }
  ];

  const locations = [
    { id: "all", name: "Tüm Şehirler" },
    { id: "istanbul", name: "İstanbul" },
    { id: "ankara", name: "Ankara" },
    { id: "izmir", name: "İzmir" },
    { id: "bursa", name: "Bursa" },
    { id: "remote", name: "Uzaktan" }
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop",
      location: "İstanbul",
      type: "Tam Zamanlı",
      salary: "25.000 - 35.000 TL",
      experience: "3-5 yıl",
      category: "frontend",
      description: "React, TypeScript ve modern frontend teknolojileri ile kullanıcı deneyimi odaklı uygulamalar geliştirecek deneyimli frontend geliştiricisi arıyoruz.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      postedDate: "2024-02-15",
      isRemote: false,
      isFeatured: true
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      company: "StartupXYZ",
      logo: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=60&h=60&fit=crop",
      location: "Ankara",
      type: "Tam Zamanlı",
      salary: "20.000 - 30.000 TL",
      experience: "2-4 yıl",
      category: "backend",
      description: "Mikroservis mimarisi ve cloud teknolojileri ile ölçeklenebilir backend sistemleri geliştirecek Node.js developer arıyoruz.",
      skills: ["Node.js", "Express", "MongoDB", "Docker"],
      postedDate: "2024-02-14",
      isRemote: true,
      isFeatured: false
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "DigitalAgency",
      logo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=60&h=60&fit=crop",
      location: "İzmir",
      type: "Tam Zamanlı",
      salary: "22.000 - 32.000 TL",
      experience: "3-6 yıl",
      category: "fullstack",
      description: "Frontend ve backend teknolojilerinde deneyimli, proje yönetimi becerileri olan full stack developer arıyoruz.",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      postedDate: "2024-02-13",
      isRemote: false,
      isFeatured: true
    },
    {
      id: 4,
      title: "Mobile Developer (React Native)",
      company: "AppStudio",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop",
      location: "İstanbul",
      type: "Tam Zamanlı",
      salary: "18.000 - 28.000 TL",
      experience: "2-4 yıl",
      category: "mobile",
      description: "Cross-platform mobil uygulamalar geliştirecek React Native developer arıyoruz.",
      skills: ["React Native", "JavaScript", "Redux", "Firebase"],
      postedDate: "2024-02-12",
      isRemote: true,
      isFeatured: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      logo: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=60&h=60&fit=crop",
      location: "Bursa",
      type: "Tam Zamanlı",
      salary: "30.000 - 45.000 TL",
      experience: "4-7 yıl",
      category: "devops",
      description: "CI/CD pipeline'ları, containerization ve cloud infrastructure yönetimi konularında deneyimli DevOps engineer arıyoruz.",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      postedDate: "2024-02-11",
      isRemote: false,
      isFeatured: true
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AnalyticsPro",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
      location: "İstanbul",
      type: "Tam Zamanlı",
      salary: "35.000 - 50.000 TL",
      experience: "3-6 yıl",
      category: "data",
      description: "Machine learning modelleri ve veri analizi projeleri geliştirecek data scientist arıyoruz.",
      skills: ["Python", "TensorFlow", "Pandas", "SQL"],
      postedDate: "2024-02-10",
      isRemote: true,
      isFeatured: false
    }
  ];

  const features = [
    {
      icon: Briefcase,
      title: "Güncel İlanlar",
      description: "Türkiye'nin önde gelen şirketlerinden güncel iş ilanları"
    },
    {
      icon: Users,
      title: "Topluluk Referansları",
      description: "CodeCrafters topluluğu üyelerinden gelen referanslar"
    },
    {
      icon: Star,
      title: "Kaliteli Fırsatlar",
      description: "Sadece kaliteli ve güvenilir şirketlerden iş ilanları"
    },
    {
      icon: MapPin,
      title: "Uzaktan Çalışma",
      description: "Uzaktan çalışma fırsatları ve hibrit modeller"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "all" || 
                          (selectedLocation === "remote" && job.isRemote) ||
                          (selectedLocation !== "remote" && job.location.toLowerCase().includes(selectedLocation));
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 gün önce";
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
    return `${Math.floor(diffDays / 30)} ay önce`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Yazılım{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Kariyer Fırsatları
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                             Türkiye&apos;nin önde gelen teknoloji şirketlerinden güncel iş ilanları. 
              Kariyerinizi bir üst seviyeye taşıyacak fırsatları keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                İş İlanlarını Keşfet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">İş İlanı Ver</Link>
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
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
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
              İş İlanlarını Keşfedin
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              İhtiyacınıza uygun iş fırsatını bulun
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="İş pozisyonu, şirket veya teknoloji ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Location Filters */}
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedLocation === location.id
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-lg object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                              {job.company}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {job.isFeatured && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                Öne Çıkan
                              </span>
                            )}
                            <Button variant="ghost" size="sm">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                              {job.isRemote && <span className="text-green-600">(Uzaktan)</span>}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.experience}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(job.postedDate)}
                            </span>
                                                         <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" asChild>
                               <Link href={`/jobs/${job.id}`}>
                                 Başvur
                                 <ExternalLink className="w-4 h-4 ml-2" />
                               </Link>
                             </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Uygun iş ilanı bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
              <Button variant="outline" onClick={() => {
                setSelectedCategory("all");
                setSelectedLocation("all");
                setSearchTerm("");
              }}>
                Filtreleri Temizle
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              İş İlanınızı Paylaşın
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Şirketiniz için kaliteli yazılımcılar bulun. CodeCrafters topluluğu 
              ile hedef kitlenize ulaşın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">
                  İş İlanı Ver
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/register">Ücretsiz Üye Ol</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 