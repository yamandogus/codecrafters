"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  ArrowRight,
  Search,
  Video,
  Globe,
  Trophy,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "Tümü", icon: Calendar, color: "bg-purple-100 dark:bg-purple-900" },
    { id: "hackathon", name: "Hackathon", icon: Trophy, color: "bg-red-100 dark:bg-red-900" },
    { id: "meetup", name: "Meetup", icon: Users, color: "bg-blue-100 dark:bg-blue-900" },
    { id: "webinar", name: "Webinar", icon: Video, color: "bg-green-100 dark:bg-green-900" },
    { id: "workshop", name: "Workshop", icon: BookOpen, color: "bg-orange-100 dark:bg-orange-900" },
    { id: "conference", name: "Konferans", icon: Globe, color: "bg-indigo-100 dark:bg-indigo-900" }
  ];

  const events = [
    {
      id: 1,
      title: "React Türkiye Hackathon 2024",
      description: "React ve modern web teknolojileri ile 48 saatlik hackathon. En yaratıcı projeler ödüllendirilecek!",
      category: "hackathon",
      startDate: "2024-03-15T09:00:00Z",
      endDate: "2024-03-17T18:00:00Z",
      location: "İstanbul Teknik Üniversitesi",
      isOnline: false,
      maxParticipants: 100,
      currentParticipants: 67,
      organizer: "React Türkiye",
      tags: ["React", "JavaScript", "Hackathon", "Web Development"],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz"
    },
    {
      id: 2,
      title: "Node.js ile Backend Geliştirme Workshop",
      description: "Node.js, Express ve MongoDB kullanarak RESTful API geliştirme workshop'u. Başlangıç seviyesi.",
      category: "workshop",
      startDate: "2024-02-28T14:00:00Z",
      endDate: "2024-02-28T18:00:00Z",
      location: "Online",
      isOnline: true,
      maxParticipants: 50,
      currentParticipants: 23,
      organizer: "CodeCrafters",
      tags: ["Node.js", "Backend", "API", "MongoDB"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz"
    },
    {
      id: 3,
      title: "Yazılım Kariyeri Meetup",
      description: "Deneyimli yazılımcılarla kariyer sohbeti. Networking ve mentorluk fırsatları.",
      category: "meetup",
      startDate: "2024-02-20T19:00:00Z",
      endDate: "2024-02-20T21:00:00Z",
      location: "Kadıköy, İstanbul",
      isOnline: false,
      maxParticipants: 30,
      currentParticipants: 18,
      organizer: "Yazılım Geliştiriciler Derneği",
      tags: ["Kariyer", "Networking", "Mentorluk"],
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz"
    },
    {
      id: 4,
      title: "AI ve Machine Learning Webinar",
      description: "Yapay zeka ve makine öğrenmesi temelleri. Python ve TensorFlow ile pratik örnekler.",
      category: "webinar",
      startDate: "2024-02-25T20:00:00Z",
      endDate: "2024-02-25T21:30:00Z",
      location: "Online",
      isOnline: true,
      maxParticipants: 200,
      currentParticipants: 145,
      organizer: "AI Türkiye",
      tags: ["AI", "Machine Learning", "Python", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz"
    },
    {
      id: 5,
      title: "DevOps ve Cloud Computing Konferansı",
      description: "Docker, Kubernetes, AWS ve modern DevOps araçları hakkında kapsamlı konferans.",
      category: "conference",
      startDate: "2024-04-10T09:00:00Z",
      endDate: "2024-04-10T17:00:00Z",
      location: "Ankara Üniversitesi",
      isOnline: false,
      maxParticipants: 150,
      currentParticipants: 89,
      organizer: "DevOps Türkiye",
      tags: ["DevOps", "Docker", "Kubernetes", "AWS", "Cloud"],
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "₺150"
    },
    {
      id: 6,
      title: "Frontend Geliştirme Workshop",
      description: "Modern CSS, JavaScript ES6+ ve React hooks ile interaktif workshop.",
      category: "workshop",
      startDate: "2024-03-05T10:00:00Z",
      endDate: "2024-03-05T16:00:00Z",
      location: "Online",
      isOnline: true,
      maxParticipants: 40,
      currentParticipants: 32,
      organizer: "Frontend Türkiye",
      tags: ["Frontend", "CSS", "JavaScript", "React"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Yaklaşan';
      case 'ongoing': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Topluluk{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Etkinlikleri
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Hackathon&apos;lar, workshop&apos;lar, meetup&apos;lar ve konferanslar. 
              Yazılım topluluğunun en güncel etkinliklerini keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                Etkinliklere Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/events">Etkinlik Düzenle</Link>
              </Button>
            </div>
          </motion.div>
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
              Etkinlikleri Keşfedin
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              İlgi alanınıza uygun etkinlikleri bulun ve topluluğa katılın
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Etkinlik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={250}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200">
                        {event.price}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                        {categories.find(c => c.id === event.category)?.name}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.startDate)}
                      </div>
                      <div className="flex items-center gap-2">
                        {event.isOnline ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.currentParticipants}/{event.maxParticipants} katılımcı
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        {event.organizer}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" asChild>
                      <Link href={`/events/${event.id}`}>
                        Detayları Gör
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Arama kriterlerinize uygun etkinlik bulunamadı.
              </p>
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
              Kendi Etkinliğinizi Düzenleyin
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Topluluk için workshop, meetup veya hackathon düzenleyin. 
              Deneyimlerinizi paylaşın ve birlikte öğrenin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/register">
                  Etkinlik Düzenle
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">İletişime Geç</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 