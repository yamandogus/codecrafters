"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Search,
  Video,
  Globe,
  Trophy,
  BookOpen,
  Download
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyEventsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "upcoming", name: "Yaklaşan", count: 3 },
    { id: "ongoing", name: "Devam Eden", count: 1 },
    { id: "completed", name: "Tamamlanan", count: 5 },
    { id: "cancelled", name: "İptal Edilen", count: 0 }
  ];

  const myEvents = [
    {
      id: 1,
      title: "React Türkiye Hackathon 2024",
      description: "React ve modern web teknolojileri ile 48 saatlik hackathon.",
      category: "hackathon",
      startDate: "2024-03-15T09:00:00Z",
      endDate: "2024-03-17T18:00:00Z",
      location: "İstanbul Teknik Üniversitesi",
      isOnline: false,
      organizer: "React Türkiye",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz",
      registrationDate: "2024-02-10T14:30:00Z",
      registrationStatus: "confirmed",
      ticketUrl: "#"
    },
    {
      id: 2,
      title: "Node.js ile Backend Geliştirme Workshop",
      description: "Node.js, Express ve MongoDB kullanarak RESTful API geliştirme workshop'u.",
      category: "workshop",
      startDate: "2024-02-28T14:00:00Z",
      endDate: "2024-02-28T18:00:00Z",
      location: "Online",
      isOnline: true,
      organizer: "CodeCrafters",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      status: "upcoming",
      price: "Ücretsiz",
      registrationDate: "2024-02-15T10:15:00Z",
      registrationStatus: "confirmed",
      ticketUrl: "#"
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
      organizer: "Yazılım Geliştiriciler Derneği",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
      status: "ongoing",
      price: "Ücretsiz",
      registrationDate: "2024-02-18T16:45:00Z",
      registrationStatus: "confirmed",
      ticketUrl: "#"
    },
    {
      id: 4,
      title: "AI ve Machine Learning Webinar",
      description: "Yapay zeka ve makine öğrenmesi temelleri. Python ve TensorFlow ile pratik örnekler.",
      category: "webinar",
      startDate: "2024-01-25T20:00:00Z",
      endDate: "2024-01-25T21:30:00Z",
      location: "Online",
      isOnline: true,
      organizer: "AI Türkiye",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      status: "completed",
      price: "Ücretsiz",
      registrationDate: "2024-01-20T12:00:00Z",
      registrationStatus: "attended",
      ticketUrl: "#"
    },
    {
      id: 5,
      title: "DevOps ve Cloud Computing Konferansı",
      description: "Docker, Kubernetes, AWS ve modern DevOps araçları hakkında kapsamlı konferans.",
      category: "conference",
      startDate: "2024-01-10T09:00:00Z",
      endDate: "2024-01-10T17:00:00Z",
      location: "Ankara Üniversitesi",
      isOnline: false,
      organizer: "DevOps Türkiye",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
      status: "completed",
      price: "₺150",
      registrationDate: "2024-01-05T14:20:00Z",
      registrationStatus: "attended",
      ticketUrl: "#"
    }
  ];

  const filteredEvents = myEvents.filter(event => {
    const matchesTab = event.status === selectedTab || 
                      (selectedTab === "upcoming" && event.status === "upcoming") ||
                      (selectedTab === "ongoing" && event.status === "ongoing") ||
                      (selectedTab === "completed" && event.status === "completed") ||
                      (selectedTab === "cancelled" && event.status === "cancelled");
    
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
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
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Yaklaşan';
      case 'ongoing': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      default: return 'Bilinmiyor';
    }
  };

  const getRegistrationStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'attended': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRegistrationStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Onaylandı';
      case 'pending': return 'Beklemede';
      case 'attended': return 'Katıldı';
      case 'cancelled': return 'İptal Edildi';
      default: return 'Bilinmiyor';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hackathon': return Trophy;
      case 'meetup': return Users;
      case 'webinar': return Video;
      case 'workshop': return BookOpen;
      case 'conference': return Globe;
      default: return Calendar;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Etkinliklerim
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Kayıt olduğunuz etkinlikleri görüntüleyin ve yönetin
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-md">
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
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedTab === tab.id
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30"
                }`}
              >
                {tab.name}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => {
            const CategoryIcon = getCategoryIcon(event.category);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRegistrationStatusColor(event.registrationStatus)}`}>
                        {getRegistrationStatusText(event.registrationStatus)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {event.category}
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
                        <Star className="w-4 h-4" />
                        {event.organizer}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Kayıt: {formatDate(event.registrationDate)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        asChild
                      >
                        <Link href={`/pages/events/${event.id}`}>
                          Detayları Gör
                        </Link>
                      </Button>
                      {event.registrationStatus === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(event.ticketUrl, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Henüz etkinlik bulunmuyor
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedTab === "upcoming" && "Yaklaşan etkinliğiniz bulunmuyor."}
              {selectedTab === "ongoing" && "Devam eden etkinliğiniz bulunmuyor."}
              {selectedTab === "completed" && "Tamamlanan etkinliğiniz bulunmuyor."}
              {selectedTab === "cancelled" && "İptal edilen etkinliğiniz bulunmuyor."}
            </p>
            <Button asChild>
              <Link href="/pages/events">
                Etkinlikleri Keşfet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
