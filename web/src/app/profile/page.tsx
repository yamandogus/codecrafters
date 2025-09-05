"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Github, 
  Linkedin, 
  Twitter,
  Edit3,
  X,
  Award,
  BookOpen,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Settings,
  Bell,
  Shield,
  Globe,
  Code,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Genel Bakış", icon: User },
    { id: "activity", name: "Aktivite", icon: MessageCircle },
    { id: "projects", name: "Projeler", icon: Code },
    { id: "events", name: "Etkinlikler", icon: Calendar },
    { id: "settings", name: "Ayarlar", icon: Settings }
  ];

  // Mock user data - gerçek uygulamada API'den gelecek
  const user = {
    id: 1,
    name: "Ahmet Yılmaz",
    username: "ahmetyilmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 45 67",
    location: "İstanbul, Türkiye",
    bio: "Full-stack developer with 5+ years of experience. Passionate about React, Node.js, and modern web technologies. Love sharing knowledge with the community.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop&auto=format",
    joinDate: "2023-01-15",
    isVerified: true,
    isMentor: true,
    socialLinks: {
      github: "https://github.com/ahmetyilmaz",
      linkedin: "https://linkedin.com/in/ahmetyilmaz",
      twitter: "https://twitter.com/ahmetyilmaz",
      website: "https://ahmetyilmaz.dev"
    },
    stats: {
      projects: 12,
      events: 8,
      followers: 245,
      following: 89,
      posts: 34,
      likes: 156
    },
    skills: [
      { name: "React", level: "Expert", color: "bg-blue-500" },
      { name: "Node.js", level: "Advanced", color: "bg-green-500" },
      { name: "TypeScript", level: "Advanced", color: "bg-blue-600" },
      { name: "PostgreSQL", level: "Intermediate", color: "bg-purple-500" },
      { name: "Docker", level: "Intermediate", color: "bg-cyan-500" },
      { name: "AWS", level: "Beginner", color: "bg-orange-500" }
    ],
    achievements: [
      {
        title: "Top Contributor",
        description: "En çok katkı sağlayan üye",
        icon: Award,
        date: "2024-01-15"
      },
      {
        title: "Mentor",
        description: "Topluluk mentoru",
        icon: Users,
        date: "2023-08-20"
      },
      {
        title: "Event Organizer",
        description: "3 etkinlik düzenledi",
        icon: Calendar,
        date: "2023-12-10"
      }
    ],
    recentActivity: [
      {
        type: "project",
        title: "E-commerce API",
        description: "Yeni proje oluşturdu",
        date: "2024-02-15",
        icon: Code
      },
      {
        type: "event",
        title: "React Workshop",
        description: "Etkinliğe katıldı",
        date: "2024-02-10",
        icon: Calendar
      },
      {
        type: "post",
        title: "TypeScript Best Practices",
        description: "Blog yazısı paylaştı",
        date: "2024-02-08",
        icon: BookOpen
      }
    ]
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 to-emerald-600">
        <Image
          src={user.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <Image
                src={user.avatar}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isMentor && (
                  <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-medium rounded-full">
                    Mentor
                  </span>
                )}
              </div>
              <p className="text-white/80">@{user.username}</p>
              <p className="text-white/70 text-sm">
                {user.location} • {formatDate(user.joinDate)} tarihinde katıldı
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Takip Et
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    İptal
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Düzenle
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 border-b">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-green-600 border-b-2 border-green-600"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                {/* Bio */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Hakkında
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {user.bio}
                    </p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Teknik Beceriler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)} text-white`}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Başarılar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {user.achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                            <Icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Son Aktiviteler
                    </h2>
                    <div className="space-y-4">
                      {user.recentActivity.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <Icon className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {activity.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {activity.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {formatDate(activity.date)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Projeler ({user.stats.projects})
                    </h2>
                    <div className="text-center py-12">
                      <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Projeler yakında gelecek
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Kullanıcının projeleri burada görüntülenecek
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Etkinlikler ({user.stats.events})
                    </h2>
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Etkinlikler yakında gelecek
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Kullanıcının katıldığı etkinlikler burada görüntülenecek
                      </p>
                      <Button asChild>
                        <Link href="/my-events">
                          Etkinliklerimi Gör
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Hesap Ayarları
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Bildirimler
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              E-posta ve push bildirimleri
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Gizlilik
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Profil görünürlüğü ve veri koruma
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Dil ve Bölge
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Türkçe, Türkiye
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    İstatistikler
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.projects}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Proje
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.events}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Etkinlik
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.followers}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Takipçi
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.following}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Takip
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    İletişim
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${user.email}`} className="text-sm text-green-600 hover:underline">
                        {user.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${user.phone}`} className="text-sm text-green-600 hover:underline">
                        {user.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Sosyal Medya
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href={user.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        GitHub
                      </span>
                    </a>
                    <a 
                      href={user.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        LinkedIn
                      </span>
                    </a>
                    <a 
                      href={user.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Twitter
                      </span>
                    </a>
                    <a 
                      href={user.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Web Sitesi
                      </span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
