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
  ArrowLeft,
  Share2,
  Heart,
  UserPlus,
  CheckCircle,
  Globe,
  Video,
  Trophy,
  BookOpen,
  ExternalLink,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EventDetailPage() {
 
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    experience: '',
    motivation: ''
  });

  // Mock event data - gerçek uygulamada API'den gelecek
  const event = {
    id: 1,
    title: "React Türkiye Hackathon 2024",
    description: "React ve modern web teknolojileri ile 48 saatlik hackathon. En yaratıcı projeler ödüllendirilecek!",
    longDescription: `
      React Türkiye Hackathon 2024, yazılım geliştiricilerini bir araya getiren en büyük etkinliklerden biridir. 
      Bu hackathon'da React, Next.js, TypeScript ve modern web teknolojileri kullanarak yaratıcı projeler geliştireceksiniz.
      
      **Etkinlik Detayları:**
      - 48 saat sürecek yoğun kodlama maratonu
      - 5 kişilik takımlar halinde çalışma
      - Mentör desteği ve teknik yardım
      - Ödül töreni ve networking etkinliği
      
      **Ödüller:**
      - 1. Takım: ₺10,000 + MacBook Pro
      - 2. Takım: ₺5,000 + iPad Pro
      - 3. Takım: ₺2,500 + AirPods Pro
      
      **Kimler Katılabilir:**
      - Frontend geliştiriciler
      - Full-stack geliştiriciler
      - UI/UX tasarımcılar
      - Yeni başlayanlar da katılabilir
    `,
    category: "hackathon",
    startDate: "2024-03-15T09:00:00Z",
    endDate: "2024-03-17T18:00:00Z",
    location: "İstanbul Teknik Üniversitesi",
    address: "Maslak Mahallesi, Sarıyer/İstanbul",
    isOnline: false,
    maxParticipants: 100,
    currentParticipants: 67,
    organizer: "React Türkiye",
    organizerInfo: {
      name: "React Türkiye",
      email: "info@reactturkiye.com",
      phone: "+90 212 555 0123",
      website: "https://reactturkiye.com",
      description: "Türkiye'nin en büyük React topluluğu"
    },
    tags: ["React", "JavaScript", "Hackathon", "Web Development", "Next.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    status: "upcoming",
    price: "Ücretsiz",
    requirements: [
      "Laptop ve şarj aleti",
      "React temel bilgisi",
      "Git ve GitHub hesabı",
      "Yaratıcılık ve takım çalışması"
    ],
    schedule: [
      {
        time: "09:00",
        title: "Kayıt ve Kahvaltı",
        description: "Etkinlik kaydı ve açılış kahvaltısı"
      },
      {
        time: "10:00",
        title: "Açılış Konuşması",
        description: "Etkinlik kuralları ve tanıtım"
      },
      {
        time: "10:30",
        title: "Hackathon Başlangıcı",
        description: "48 saatlik kodlama maratonu başlıyor!"
      },
      {
        time: "18:00",
        title: "İlk Gün Sonu",
        description: "İlk gün tamamlandı, dinlenme zamanı"
      }
    ],
         participants: [
       {
         id: 1,
         name: "Ahmet Yılmaz",
         avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format",
         role: "Frontend Developer",
         company: "TechCorp"
       },
       {
         id: 2,
         name: "Elif Kaya",
         avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format",
         role: "UI/UX Designer",
         company: "DesignStudio"
       },
       {
         id: 3,
         name: "Mehmet Demir",
         avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format",
         role: "Full Stack Developer",
         company: "StartupXYZ"
       }
     ]
  };

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

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // API call burada yapılacak
    console.log('Registration data:', registrationData);
    setIsRegistered(true);
    setShowRegistrationForm(false);
  };

  const addToCalendar = () => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const CategoryIcon = getCategoryIcon(event.category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/events" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              Etkinliklere Dön
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favorile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200">
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <CategoryIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {event.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Başlangıç</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(event.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Bitiş</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(event.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {event.isOnline ? (
                    <Video className="w-5 h-5 text-green-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Konum</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.location}</p>
                    {!event.isOnline && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">{event.address}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Katılımcılar</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.currentParticipants}/{event.maxParticipants}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Etkinlik Hakkında
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {event.longDescription.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-600 dark:text-gray-400">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Program
                  </h2>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 text-sm font-medium text-green-600">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Gereksinimler
                  </h2>
                  <ul className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600 dark:text-gray-400">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Participants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Katılımcılar ({event.currentParticipants})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Image
                          src={participant.avatar}
                          alt={participant.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {participant.role}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {participant.company}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  {!isRegistered ? (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Etkinliğe Katıl
                      </h3>
                      <div className="space-y-4">
                        <Button 
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          onClick={() => setShowRegistrationForm(true)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Kayıt Ol
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addToCalendar}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Takvime Ekle
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Kayıt Tamamlandı!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Etkinlik detayları e-posta adresinize gönderildi.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={addToCalendar}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Takvime Ekle
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizer Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Organizatör
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {event.organizerInfo.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.organizerInfo.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${event.organizerInfo.email}`} className="text-sm text-green-600 hover:underline">
                          {event.organizerInfo.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${event.organizerInfo.phone}`} className="text-sm text-green-600 hover:underline">
                          {event.organizerInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                        <a href={event.organizerInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline">
                          Web Sitesi
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Etiketler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Etkinliğe Kayıt Ol
            </h2>
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şirket/Organizasyon
                </label>
                <input
                  type="text"
                  value={registrationData.company}
                  onChange={(e) => setRegistrationData({...registrationData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deneyim Seviyesi
                </label>
                <select
                  value={registrationData.experience}
                  onChange={(e) => setRegistrationData({...registrationData, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="beginner">Başlangıç</option>
                  <option value="intermediate">Orta</option>
                  <option value="advanced">İleri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bu etkinliğe katılma motivasyonunuz
                </label>
                <textarea
                  value={registrationData.motivation}
                  onChange={(e) => setRegistrationData({...registrationData, motivation: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Kayıt Ol
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
