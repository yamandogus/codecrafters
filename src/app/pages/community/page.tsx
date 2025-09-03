"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserPlus, 
  Star, 
  MessageCircle, 
  Github, 
  Linkedin,
  Award,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("members");

  const tabs = [
    { id: "members", name: "Üyeler", icon: Users },
    { id: "mentors", name: "Mentorlar", icon: UserPlus },
    { id: "leaders", name: "Liderler", icon: Award }
  ];

  const members = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      github: "ahmetyilmaz",
      linkedin: "ahmetyilmaz",
      projects: 12,
      contributions: 45,
      isMentor: true,
      skills: ["React", "TypeScript", "Next.js"],
      bio: "3 yıllık frontend geliştirme deneyimi. React ve modern web teknolojileri konusunda mentorluk yapıyorum."
    },
    {
      id: 2,
      name: "Elif Kaya",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      github: "elifkaya",
      linkedin: "elifkaya",
      projects: 8,
      contributions: 32,
      isMentor: false,
      skills: ["Node.js", "Python", "PostgreSQL"],
      bio: "Backend geliştirme alanında kendimi geliştiriyorum. API tasarımı ve veritabanı yönetimi konularında öğrenmeye devam ediyorum."
    },
    {
      id: 3,
      name: "Mehmet Demir",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      github: "mehmetdemir",
      linkedin: "mehmetdemir",
      projects: 15,
      contributions: 67,
      isMentor: true,
      skills: ["React", "Node.js", "Docker", "AWS"],
      bio: "5 yıllık full stack geliştirme deneyimi. DevOps ve cloud teknolojileri konusunda mentorluk yapıyorum."
    }
  ];

  const stats = [
    { label: "Toplam Üye", value: "1,247", icon: Users },
    { label: "Aktif Mentor", value: "89", icon: UserPlus },
    { label: "Tamamlanan Proje", value: "342", icon: Award },
    { label: "Topluluk Puanı", value: "4.8", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              CodeCrafters{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Topluluğu
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Yazılım geliştiricileri bir araya geliyor. Projeler paylaşılıyor, 
              deneyimler aktarılıyor ve birlikte büyüyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Topluluğa Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pages/projects">Projeleri Keşfet</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Tabs */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Topluluk Üyeleri
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Deneyimli geliştiricilerden yeni başlayanlara kadar herkes burada
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                    selectedTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                        {member.isMentor && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mt-1">
                            <UserPlus className="w-3 h-3 mr-1" />
                            Mentor
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {member.projects} proje
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {member.contributions} katkı
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Mesaj
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Topluluğumuzun Bir Parçası Olun
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Projelerinizi paylaşın, deneyimlerinizi aktarın ve 
              birlikte büyüyen bir topluluk oluşturalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/register">
                  Hemen Katıl
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pages/forum">Forum&apos;a Git</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 