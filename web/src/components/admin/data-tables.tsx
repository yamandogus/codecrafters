"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock data - gerçek uygulamada API'den gelecek
const recentUsers = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "USER", joinDate: "2 saat önce" },
  { id: 2, name: "Fatma Kaya", email: "fatma@example.com", role: "USER", joinDate: "5 saat önce" },
  { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", role: "MODERATOR", joinDate: "1 gün önce" },
  { id: 4, name: "Ayşe Çelik", email: "ayse@example.com", role: "USER", joinDate: "2 gün önce" },
];

const recentActivity = [
  { id: 1, type: "user_register", user: "Ahmet Yılmaz", action: "Yeni kullanıcı kaydı", time: "2 saat önce" },
  { id: 2, type: "blog_post", user: "Fatma Kaya", action: "Yeni blog yazısı yayınlandı", time: "4 saat önce" },
  { id: 3, type: "event_create", user: "Mehmet Demir", action: "Yeni etkinlik oluşturuldu", time: "6 saat önce" },
  { id: 4, type: "comment", user: "Ayşe Çelik", action: "Blog yazısına yorum yapıldı", time: "8 saat önce" },
];

const pendingReports = [
  { id: 1, type: "spam", reporter: "User123", target: "Spam blog yazısı", priority: "high", time: "1 saat önce" },
  { id: 2, type: "inappropriate", reporter: "User456", target: "Uygunsuz yorum", priority: "medium", time: "3 saat önce" },
  { id: 3, type: "harassment", reporter: "User789", target: "Kullanıcı tacizi", priority: "high", time: "5 saat önce" },
];

const systemAlerts = [
  { id: 1, type: "warning", message: "Sunucu CPU kullanımı %85", time: "30 dk önce" },
  { id: 2, type: "info", message: "Yedekleme işlemi tamamlandı", time: "2 saat önce" },
  { id: 3, type: "error", message: "Email servisinde geçici kesinti", time: "4 saat önce" },
];

export function RecentUsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Son Kayıt Olan Kullanıcılar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.role === 'MODERATOR' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
                <span className="text-xs text-muted-foreground">{user.joinDate}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Tüm Kullanıcıları Görüntüle
        </Button>
      </CardContent>
    </Card>
  );
}

export function RecentActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_register': return <Users className="h-4 w-4" />;
      case 'blog_post': return <FileText className="h-4 w-4" />;
      case 'event_create': return <Calendar className="h-4 w-4" />;
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Son Aktiviteler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Tüm Aktiviteleri Görüntüle
        </Button>
      </CardContent>
    </Card>
  );
}

export function PendingReportsTable() {
  const getPriorityColor = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Bekleyen Raporlar
          <Badge variant="destructive" className="ml-auto">
            {pendingReports.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{report.target}</p>
                <p className="text-xs text-muted-foreground">Rapor eden: {report.reporter}</p>
                <p className="text-xs text-muted-foreground">{report.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityColor(report.priority)}>
                  {report.priority}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Tüm Raporları Görüntüle
        </Button>
      </CardContent>
    </Card>
  );
}

export function SystemAlertsTable() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Sistem Uyarıları
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Tüm Uyarıları Görüntüle
        </Button>
      </CardContent>
    </Card>
  );
}