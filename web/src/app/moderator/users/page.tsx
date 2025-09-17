"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  Eye, 
  Mail,
  Calendar,
  Clock,
  Ban,
  MessageSquare,
  Search,
  Filter,
  UserCheck,
  UserX
} from "lucide-react";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  status: 'active' | 'suspended' | 'banned' | 'pending';
  joinDate: string;
  lastActive: string;
  reportCount: number;
  contentCount: number;
  warnings: number;
}

// Mock data
const users: User[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    role: "USER",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 saat önce",
    reportCount: 0,
    contentCount: 5,
    warnings: 0
  },
  {
    id: 2,
    name: "Fatma Kaya",
    email: "fatma@example.com",
    role: "USER",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "1 gün önce",
    reportCount: 2,
    contentCount: 12,
    warnings: 1
  },
  {
    id: 3,
    name: "Mehmet Demir",
    email: "mehmet@example.com",
    role: "USER",
    status: "suspended",
    joinDate: "2024-01-05",
    lastActive: "3 gün önce",
    reportCount: 5,
    contentCount: 8,
    warnings: 3
  },
  {
    id: 4,
    name: "Ayşe Öz",
    email: "ayse@example.com",
    role: "MODERATOR",
    status: "active",
    joinDate: "2023-12-20",
    lastActive: "30 dakika önce",
    reportCount: 0,
    contentCount: 25,
    warnings: 0
  },
  {
    id: 5,
    name: "ProblemUser123",
    email: "problem@example.com",
    role: "USER",
    status: "pending",
    joinDate: "2024-01-20",
    lastActive: "5 saat önce",
    reportCount: 8,
    contentCount: 3,
    warnings: 2
  }
];

export default function ModeratorUsersPage() {
  const { user, isAuthenticated } = useSelector((s: RootState) => s.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }
    const role = user?.role;
    if (role !== 'MODERATOR' && role !== 'ADMIN') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  const role = user?.role;
  if (!isAuthenticated || (role !== 'MODERATOR' && role !== 'ADMIN')) return null;

  const getRoleColor = (userRole: string) => {
    switch (userRole) {
      case 'ADMIN': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'MODERATOR': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'USER': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'suspended': return 'default';
      case 'banned': return 'destructive';
      case 'pending': return 'outline';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'suspended': return 'Askıya Alındı';
      case 'banned': return 'Yasaklandı';
      case 'pending': return 'İnceleme Bekliyor';
      default: return status;
    }
  };

  const handleSuspend = (userId: number) => {
    console.log('Suspending user:', userId);
    // API call to suspend user
  };

  const handleActivate = (userId: number) => {
    console.log('Activating user:', userId);
    // API call to activate user
  };

  const handleBan = (userId: number) => {
    console.log('Banning user:', userId);
    // API call to ban user
  };

  const handleWarn = (userId: number) => {
    console.log('Warning user:', userId);
    // API call to warn user
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'reported':
        return matchesSearch && user.reportCount > 0;
      case 'suspended':
        return matchesSearch && (user.status === 'suspended' || user.status === 'banned');
      case 'pending':
        return matchesSearch && user.status === 'pending';
      default:
        return matchesSearch;
    }
  });

  const renderUserCard = (userData: User) => (
    <Card key={userData.id} className="p-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback>{userData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-lg">{userData.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Katılım: {userData.joinDate}</span>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>Son aktif: {userData.lastActive}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(userData.status)}>
              {getStatusText(userData.status)}
            </Badge>
            <Badge className={getRoleColor(userData.role)}>
              {userData.role}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Stats */}
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="font-medium">{userData.contentCount}</div>
            <div className="text-muted-foreground">İçerik</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="font-medium">{userData.reportCount}</div>
            <div className="text-muted-foreground">Rapor</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="font-medium">{userData.warnings}</div>
            <div className="text-muted-foreground">Uyarı</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="font-medium">{userData.role === 'ADMIN' ? '∞' : '100'}</div>
            <div className="text-muted-foreground">Güven</div>
          </div>
        </div>

        {/* Warning Messages */}
        {userData.reportCount > 3 && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700 dark:text-red-300">
              Bu kullanıcı çok sayıda rapor aldı ve acil inceleme gerektiriyor.
            </span>
          </div>
        )}

        {userData.status === 'pending' && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-yellow-700 dark:text-yellow-300">
              Bu kullanıcı moderatör incelemesi bekliyor.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Profil
          </Button>
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-1" />
            Mesaj
          </Button>
          
          {userData.status === 'active' ? (
            <>
              <Button 
                size="sm" 
                variant="outline"
                className="text-yellow-600 hover:text-yellow-700"
                onClick={() => handleWarn(userData.id)}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Uyar
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-orange-600 hover:text-orange-700"
                onClick={() => handleSuspend(userData.id)}
              >
                <UserX className="h-4 w-4 mr-1" />
                Askıya Al
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleBan(userData.id)}
              >
                <Ban className="h-4 w-4 mr-1" />
                Yasakla
              </Button>
            </>
          ) : userData.status === 'suspended' || userData.status === 'pending' ? (
            <Button 
              size="sm" 
              variant="outline"
              className="text-green-600 hover:text-green-700"
              onClick={() => handleActivate(userData.id)}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Aktifleştir
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  const activeUsers = users.filter(u => u.status === 'active').length;
  const reportedUsers = users.filter(u => u.reportCount > 0).length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended' || u.status === 'banned').length;

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground">
            Topluluk üyeleri ve kullanıcı moderasyonu
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcılar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Online ve aktif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raporlanan</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportedUsers}</div>
            <p className="text-xs text-muted-foreground">İnceleme gereken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beklemede</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingUsers}</div>
            <p className="text-xs text-muted-foreground">Onay bekliyor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Askıda/Yasaklı</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspendedUsers}</div>
            <p className="text-xs text-muted-foreground">Kısıtlanmış hesap</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            Tüm Kullanıcılar ({filteredUsers.length})
          </TabsTrigger>
          <TabsTrigger value="reported">
            Raporlanan ({reportedUsers})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Beklemede ({pendingUsers})
          </TabsTrigger>
          <TabsTrigger value="suspended">
            Askıda/Yasaklı ({suspendedUsers})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredUsers.map(userData => renderUserCard(userData))}
          </div>
        </TabsContent>

        <TabsContent value="reported" className="space-y-4">
          <div className="space-y-4">
            {filteredUsers.map(userData => renderUserCard(userData))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {filteredUsers.map(userData => renderUserCard(userData))}
          </div>
        </TabsContent>

        <TabsContent value="suspended" className="space-y-4">
          <div className="space-y-4">
            {filteredUsers.map(userData => renderUserCard(userData))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}