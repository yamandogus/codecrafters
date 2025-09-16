"use client";
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "./stats-card";
import { 
  UserGrowthChart, 
  EventsChart, 
  UserTypeChart, 
  BlogStatsChart 
} from "./charts";
import { 
  RecentUsersTable, 
  RecentActivityFeed, 
  PendingReportsTable, 
  SystemAlertsTable 
} from "./data-tables";
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare,
  TrendingUp,
  BarChart3,
  Shield,
  AlertTriangle
} from "lucide-react";

// Mock data - gerçek uygulamada API'den gelecek
const dashboardStats = {
  totalUsers: 900,
  activeUsers: 456,
  totalEvents: 125,
  totalBlogs: 340,
  totalComments: 1250,
  pendingReports: 8,
  monthlyGrowth: 12.5,
  eventAttendance: 89.3
};

export function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform yönetimi ve istatistikleri
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-medium">Admin Panel</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Kullanıcı"
          value={dashboardStats.totalUsers}
          description="Kayıtlı kullanıcı sayısı"
          icon={Users}
          trend={{ value: dashboardStats.monthlyGrowth, isPositive: true }}
        />
        <StatsCard
          title="Aktif Kullanıcı"
          value={dashboardStats.activeUsers}
          description="Son 30 günde aktif"
          icon={TrendingUp}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Toplam Etkinlik"
          value={dashboardStats.totalEvents}
          description="Düzenlenen etkinlik sayısı"
          icon={Calendar}
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatsCard
          title="Blog Yazıları"
          value={dashboardStats.totalBlogs}
          description="Yayınlanan yazı sayısı"
          icon={FileText}
          trend={{ value: 22.1, isPositive: true }}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="events">Etkinlikler</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Kullanıcı Büyümesi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Kullanıcı Türleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserTypeChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivityFeed />
            <SystemAlertsTable />
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Toplam Kullanıcı"
              value={dashboardStats.totalUsers}
              description="Tüm kayıtlı kullanıcılar"
              icon={Users}
            />
            <StatsCard
              title="Yeni Kayıtlar"
              value="24"
              description="Bu ay yeni kayıt"
              icon={TrendingUp}
            />
            <StatsCard
              title="Aktif Oturum"
              value="156"
              description="Şu anda çevrimiçi"
              icon={Users}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentUsersTable />
            <Card>
              <CardHeader>
                <CardTitle>Kullanıcı İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Toplam Etkinlik"
              value={dashboardStats.totalEvents}
              description="Düzenlenen toplam etkinlik"
              icon={Calendar}
            />
            <StatsCard
              title="Bu Ay"
              value="8"
              description="Bu ay düzenlenen etkinlik"
              icon={Calendar}
            />
            <StatsCard
              title="Ortalama Katılım"
              value="89.3%"
              description="Etkinlik katılım oranı"
              icon={TrendingUp}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Etkinlik İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EventsChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Blog Yazıları"
              value={dashboardStats.totalBlogs}
              description="Toplam blog yazısı"
              icon={FileText}
            />
            <StatsCard
              title="Yorumlar"
              value={dashboardStats.totalComments}
              description="Toplam yorum sayısı"
              icon={MessageSquare}
            />
            <StatsCard
              title="Bu Ay Yazı"
              value="18"
              description="Bu ay yayınlanan"
              icon={FileText}
            />
            <StatsCard
              title="Onay Bekleyen"
              value="5"
              description="Moderasyon bekleyen"
              icon={AlertTriangle}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Blog İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BlogStatsChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Bekleyen Raporlar"
              value={dashboardStats.pendingReports}
              description="İncelenmesi gereken"
              icon={AlertTriangle}
            />
            <StatsCard
              title="Bu Ay Çözülen"
              value="42"
              description="Bu ay çözülen rapor"
              icon={Shield}
            />
            <StatsCard
              title="Ortalama Çözüm"
              value="2.3h"
              description="Ortalama çözüm süresi"
              icon={TrendingUp}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingReportsTable />
            <SystemAlertsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}