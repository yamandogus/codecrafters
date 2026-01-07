"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Users, TrendingUp, Search, Plus } from "lucide-react";
import Link from "next/link";

const forumCategories = [
  {
    id: 1,
    title: "Frontend Geliştirme",
    description: "React, Vue, Angular ve diğer frontend teknolojileri",
    posts: 248,
    members: 1543,
    lastPost: "2 saat önce",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Backend Geliştirme",
    description: "Node.js, Python, Java, .NET ve backend mimarisi",
    posts: 189,
    members: 987,
    lastPost: "4 saat önce",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Mobil Uygulama",
    description: "React Native, Flutter, iOS ve Android geliştirme",
    posts: 156,
    members: 756,
    lastPost: "6 saat önce",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, Azure ve deployment",
    posts: 98,
    members: 432,
    lastPost: "1 gün önce",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "Kariyer & İş Fırsatları",
    description: "CV inceleme, mülakat deneyimleri ve kariyer tavsiyeler",
    posts: 324,
    members: 2156,
    lastPost: "3 saat önce",
    color: "bg-pink-500"
  },
  {
    id: 6,
    title: "Proje Paylaşımı",
    description: "Projelerini paylaş, feedback al ve işbirliği yap",
    posts: 267,
    members: 1234,
    lastPost: "5 saat önce",
    color: "bg-cyan-500"
  }
];

const recentPosts = [
  {
    title: "Next.js 14 ile SSR optimizasyonu",
    category: "Frontend Geliştirme",
    author: "Ahmet K.",
    replies: 12,
    views: 234,
    time: "2 saat önce"
  },
  {
    title: "Python ile microservice mimarisi",
    category: "Backend Geliştirme",
    author: "Elif S.",
    replies: 8,
    views: 156,
    time: "4 saat önce"
  },
  {
    title: "React Native vs Flutter karşılaştırması",
    category: "Mobil Uygulama",
    author: "Mehmet Y.",
    replies: 15,
    views: 387,
    time: "6 saat önce"
  },
  {
    title: "Junior developer olarak ilk iş deneyimim",
    category: "Kariyer & İş Fırsatları",
    author: "Zeynep A.",
    replies: 23,
    views: 512,
    time: "1 gün önce"
  }
];

export default function ForumPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Topluluk Forumu
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Yazılım geliştiriciler için bilgi paylaşım platformu
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Ara
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Yeni Konu
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
                             <div className="flex items-center gap-4">
                 <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                   <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                 </div>
                                 <div>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,247</h3>
                   <p className="text-gray-600 dark:text-gray-300">Toplam Konu</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-6">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                   <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8,543</h3>
                   <p className="text-gray-600 dark:text-gray-300">Aktif Üye</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-6">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                   <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
                   <p className="text-gray-600 dark:text-gray-300">Bu Hafta Yeni</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forum Categories */}
          <div className="lg:col-span-2">
                         <div className="mb-6">
               <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                 Forum Kategorileri
               </h2>
             </div>
            <div className="space-y-4">
              {forumCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                                         <div className="flex items-center gap-4">
                       <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                           {category.title}
                         </h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                           {category.description}
                         </p>
                         <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                           <span>{category.posts} konu</span>
                           <span>{category.members} üye</span>
                           <span>Son gönderi: {category.lastPost}</span>
                         </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Posts Sidebar */}
          <div>
                         <div className="mb-6">
               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                 Son Gönderiler
               </h2>
             </div>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                                     <CardContent className="p-4">
                     <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                       {post.title}
                     </h4>
                     <div className="flex items-center gap-2 mb-3">
                       <Avatar className="h-6 w-6">
                         <AvatarFallback className="text-xs">
                           {post.author.charAt(0)}
                         </AvatarFallback>
                       </Avatar>
                       <span className="text-sm text-gray-600 dark:text-gray-300">{post.author}</span>
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                       <div className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full inline-block">
                         {post.category}
                       </div>
                       <div className="flex justify-between">
                         <span>{post.replies} yanıt</span>
                         <span>{post.views} görüntüleme</span>
                       </div>
                       <div className="text-right">{post.time}</div>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Links */}
                         <Card className="mt-6">
               <CardHeader>
                 <CardTitle className="text-lg dark:text-white">Hızlı Linkler</CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                 <Link href="/tutorials" className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                   → Eğitim Materyalleri
                 </Link>
                 <Link href="/projects" className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                   → Açık Kaynak Projeler
                 </Link>
                 <Link href="/mentorship" className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                   → Mentorluk Programı
                 </Link>
                 <Link href="/events" className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                   → Yaklaşan Etkinlikler
                 </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 