"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  MessageSquare,
  Calendar,
  Eye,
  CheckCircle,
  AlertTriangle,
  Flag,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Edit
} from "lucide-react";

// Types
interface ContentItem {
  id: number;
  type: 'blog' | 'comment' | 'forum' | 'project';
  title: string;
  author: string;
  content: string;
  status: 'pending' | 'flagged' | 'approved' | 'rejected';
  createdAt: string;
  reportCount: number;
  reportReason?: string;
}

// Mock data
const pendingContent: ContentItem[] = [
  {
    id: 1,
    type: "blog",
    title: "React Hooks Kullanımı ve En İyi Uygulamalar",
    author: "Ahmet Yılmaz",
    content: "React Hooks, React 16.8 ile gelen ve function componentlerde state ve lifecycle yönetimini sağlayan özelliklerdir...",
    status: "pending",
    createdAt: "2 saat önce",
    reportCount: 0
  },
  {
    id: 2,
    type: "comment",
    title: "Gerçekten çok yararlı bir makale olmuş!",
    author: "Fatma Kaya",
    content: "Bu konuyu çok güzel anlatmışsınız. Özellikle useEffect kısmı çok açıklayıcıydı. Teşekkürler!",
    status: "flagged",
    createdAt: "4 saat önce",
    reportCount: 2,
    reportReason: "Spam şüphesi"
  },
  {
    id: 3,
    type: "forum",
    title: "Next.js 14 ile ilgili sorum var",
    author: "Mehmet Demir",
    content: "Next.js 14'ün yeni özelliklerini kullanan var mı? App Router konusunda deneyimlerinizi paylaşabilir misiniz?",
    status: "pending",
    createdAt: "6 saat önce",
    reportCount: 0
  },
  {
    id: 4,
    type: "project",
    title: "E-ticaret Sitesi - MERN Stack",
    author: "Ayşe Kaya",
    content: "MongoDB, Express, React ve Node.js kullanarak geliştirdiğim e-ticaret projesi. Kullanıcı girişi, sepet yönetimi ve ödeme entegrasyonu var.",
    status: "flagged",
    createdAt: "1 gün önce",
    reportCount: 1,
    reportReason: "Uygunsuz içerik"
  }
];

import { AuthGuard } from "@/components/auth/auth-guard";

export default function ModeratorContentPage() {
  return (
    <AuthGuard roles={['MODERATOR', 'ADMIN']}>
      <ModeratorContent />
    </AuthGuard>
  );
}

function ModeratorContent() {
  const [activeTab, setActiveTab] = useState("pending");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="h-5 w-5" />;
      case 'comment': return <MessageSquare className="h-5 w-5" />;
      case 'forum': return <MessageSquare className="h-5 w-5" />;
      case 'project': return <Calendar className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'comment': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'forum': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'project': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'flagged': return 'destructive';
      case 'approved': return 'secondary';
      case 'rejected': return 'outline';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'İnceleme Bekliyor';
      case 'flagged': return 'Raporlandı';
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      default: return status;
    }
  };

  const handleApprove = (contentId: number) => {
    console.log('Approving content:', contentId);
    // API call to approve content
  };

  const handleReject = (contentId: number) => {
    console.log('Rejecting content:', contentId);
    // API call to reject content
  };

  const handleEdit = (contentId: number) => {
    console.log('Editing content:', contentId);
    // Navigate to edit page
  };

  const renderContentCard = (content: ContentItem) => (
    <Card key={content.id} className="p-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getTypeIcon(content.type)}
            </div>
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{content.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" alt={content.author} />
                  <AvatarFallback className="text-xs">{content.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{content.author}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{content.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(content.status)}>
              {getStatusText(content.status)}
            </Badge>
            <Badge className={getTypeColor(content.type)}>
              {content.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {content.content}
        </p>

        {content.status === 'flagged' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div className="flex-1">
                <span className="text-sm text-red-700 dark:text-red-300 font-medium">
                  Bu içerik rapor edildi
                </span>
                {content.reportReason && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Sebep: {content.reportReason}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Flag className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  {content.reportCount}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Detaylar
          </Button>

          {content.status === 'pending' || content.status === 'flagged' ? (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-700"
                onClick={() => handleApprove(content.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Onayla
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleReject(content.id)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Reddet
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => handleEdit(content.id)}>
              <Edit className="h-4 w-4 mr-1" />
              Düzenle
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const pendingItems = pendingContent.filter(item => item.status === 'pending');
  const flaggedItems = pendingContent.filter(item => item.status === 'flagged');

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">İçerik Moderasyonu</h1>
          <p className="text-muted-foreground">
            Blog yazıları, yorumlar ve forum gönderilerinin moderasyonu
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems.length}</div>
            <p className="text-xs text-muted-foreground">Moderasyon gereken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raporlanan</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedItems.length}</div>
            <p className="text-xs text-muted-foreground">Acil inceleme</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Hafta Onaylanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Onaylanmış içerik</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Süre</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-muted-foreground">İnceleme süresi</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            İnceleme Bekleyen ({pendingItems.length})
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Raporlanan ({flaggedItems.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Onaylanmış (0)
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Reddedilmiş (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {pendingItems.length > 0 ? (
              pendingItems.map(content => renderContentCard(content))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                İnceleme bekleyen içerik bulunmuyor.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <div className="space-y-4">
            {flaggedItems.length > 0 ? (
              flaggedItems.map(content => renderContentCard(content))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Raporlanan içerik bulunmuyor.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            Onaylanmış içerikler burada görüntülenecek.
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            Reddedilmiş içerikler burada görüntülenecek.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}