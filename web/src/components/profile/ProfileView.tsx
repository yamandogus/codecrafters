"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Code, 
  MessageCircle, 
  Settings,
  Shield,
  Share2,
  Heart,
  Edit3,
  X,
  Bell,
  Globe,
  Phone,
  Mail,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface ProfileUser {
  id: number | string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar: string;
  coverImage: string;
  joinDate: string;
  isVerified?: boolean;
  isMentor?: boolean;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    projects: number;
    events: number;
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  skills: { name: string; level: string; color: string }[];
  achievements: {
    title: string;
    description: string;
    icon: React.ReactNode; // Using ReactNode for Lucide icons passed around or string if mapped    
    date: string;
  }[];
  recentActivity: {
    type: string;
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode; // Using ReactNode for Lucide icons passed around or string if mapped    
  }[];
}

interface ProfileViewProps {
  user: ProfileUser;
  isEditable?: boolean;
}

export default function ProfileView({ user, isEditable = false }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Genel Bakış", icon: User },
    { id: "activity", name: "Aktivite", icon: MessageCircle },
    { id: "projects", name: "Projeler", icon: Code },
    { id: "events", name: "Etkinlikler", icon: Calendar },
  ];

  if (isEditable) {
    tabs.push({ id: "settings", name: "Ayarlar", icon: Settings });
  }

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
              {!isEditable && (
                 <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                 <Heart className="w-4 h-4 mr-2" />
                 Takip Et
               </Button>
              )}
              {isEditable && (
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
              )}
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
                            {/* Assuming Icon is a component or we need to handle it properly if it's data */}
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
                      {isEditable && (
                        <Button asChild>
                          <Link href="/my-events">
                            Etkinliklerimi Gör
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "settings" && isEditable && (
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
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.posts}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Paylaşım
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {user.stats.likes}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Beğeni
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
                    İletişim Bilgileri
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Mail className="w-5 h-5 text-green-600" />
                      <a href={`mailto:${user.email}`} className="hover:text-green-600">
                        {user.email}
                      </a>
                    </div>
                    {user.phone && (
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                             <Phone className="w-5 h-5 text-green-600" />
                             <span>{user.phone}</span>
                        </div>
                    )}
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Sosyal Medya
                      </h4>
                      <div className="flex gap-4">
                        {user.socialLinks?.github && (
                          <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {user.socialLinks?.linkedin && (
                          <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {user.socialLinks?.twitter && (
                          <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {user.socialLinks?.website && (
                          <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                            <Globe className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
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
