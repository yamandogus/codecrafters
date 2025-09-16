"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatsCard } from "../admin/stats-card";
import { 
  MessageSquare, 
  Calendar, 
  FileText, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Flag,
  Eye
} from "lucide-react";

// Mock data - gerçek uygulamada API'den gelecek
const moderatorStats = {
  pendingReviews: 12,
  reviewedToday: 8,
  totalReports: 45,
  activeWarnings: 3
};

const pendingContent = [
  { 
    id: 1, 
    type: "blog", 
    title: "React Hooks Kullanımı", 
    author: "Ahmet Yılmaz", 
    date: "2 saat önce",
    status: "pending"
  },
  { 
    id: 2, 
    type: "comment", 
    title: "Harika makale, teşekkürler!", 
    author: "Fatma Kaya", 
    date: "4 saat önce",
    status: "flagged"
  },
  { 
    id: 3, 
    type: "event", 
    title: "React Workshop", 
    author: "Mehmet Demir", 
    date: "6 saat önce",
    status: "pending"
  },
];

const reportedUsers = [
  {
    id: 1,
    name: "ProblemUser123",
    email: "problem@example.com",
    reportCount: 3,
    lastReport: "2 saat önce",
    reason: "Spam içerik paylaşımı",
    severity: "high"
  },
  {
    id: 2,
    name: "AnotherUser456",
    email: "another@example.com",
    reportCount: 1,
    lastReport: "1 gün önce",
    reason: "Uygunsuz yorum",
    severity: "medium"
  },
];

const recentActions = [
  { id: 1, action: "Blog yazısı onaylandı", target: "React Hooks Rehberi", time: "1 saat önce", type: "approve" },
  { id: 2, action: "Yorum silindi", target: "Spam yorum", time: "2 saat önce", type: "delete" },
  { id: 3, action: "Kullanıcı uyarıldı", target: "User123", time: "3 saat önce", type: "warn" },
];

export function ModeratorDashboard() {
  const getSeverityColor = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Moderator Dashboard</h1>
          <p className="text-muted-foreground">
            İçerik moderasyonu ve topluluk yönetimi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-medium">Moderator Panel</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="İnceleme Bekleyen"
          value={moderatorStats.pendingReviews}
          description="Moderasyon gereken içerik"
          icon={Clock}
        />
        <StatsCard
          title="Bugün İncelenen"
          value={moderatorStats.reviewedToday}
          description="Bugün tamamlanan"
          icon={CheckCircle}
        />
        <StatsCard
          title="Toplam Rapor"
          value={moderatorStats.totalReports}
          description="Bu ay alınan rapor"
          icon={Flag}
        />
        <StatsCard
          title="Aktif Uyarı"
          value={moderatorStats.activeWarnings}
          description="Kullanıcı uyarısı"
          icon={AlertTriangle}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Bekleyen İçerik</TabsTrigger>
          <TabsTrigger value="reports">Kullanıcı Raporları</TabsTrigger>
          <TabsTrigger value="actions">Son İşlemler</TabsTrigger>
          <TabsTrigger value="stats">İstatistikler</TabsTrigger>
        </TabsList>

        {/* Pending Content Tab */}
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Moderasyon Bekleyen İçerik
                <Badge variant="destructive" className="ml-auto">
                  {pendingContent.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {content.type === 'blog' && <FileText className="h-5 w-5" />}
                        {content.type === 'comment' && <MessageSquare className="h-5 w-5" />}
                        {content.type === 'event' && <Calendar className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{content.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Yazar: {content.author} • {content.date}
                        </p>
                        <Badge 
                          variant={content.status === 'flagged' ? 'destructive' : 'default'}
                          className="mt-2"
                        >
                          {content.status === 'flagged' ? 'Raporlandı' : 'İnceleme Bekliyor'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        İncele
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Onayla
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reddet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Raporlanan Kullanıcılar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.reportCount} rapor • Son: {user.lastReport}
                        </p>
                        <p className="text-sm text-muted-foreground">Sebep: {user.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(user.severity)}>
                        {user.severity === 'high' ? 'Yüksek' : user.severity === 'medium' ? 'Orta' : 'Düşük'}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Son Moderasyon İşlemleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="mt-1">
                      {action.type === 'approve' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {action.type === 'delete' && <XCircle className="h-4 w-4 text-red-500" />}
                      {action.type === 'warn' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{action.action}</p>
                      <p className="text-xs text-muted-foreground">
                        Hedef: {action.target} • {action.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Bu Hafta İncelenen"
              value="56"
              description="Toplam incelenen içerik"
              icon={CheckCircle}
            />
            <StatsCard
              title="Onay Oranı"
              value="78%"
              description="İçerik onay yüzdesi"
              icon={CheckCircle}
            />
            <StatsCard
              title="Ortalama Süre"
              value="1.2h"
              description="Ortalama inceleme süresi"
              icon={Clock}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Moderasyon Özeti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium">Onaylanan İçerik</span>
                  <span className="text-sm font-bold text-green-600">42</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm font-medium">Reddedilen İçerik</span>
                  <span className="text-sm font-bold text-red-600">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-sm font-medium">Bekleyen İnceleme</span>
                  <span className="text-sm font-bold text-yellow-600">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}