"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Eye, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

// Types
interface Event {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'pending' | 'flagged' | 'approved' | 'rejected';
  description: string;
  category: 'workshop' | 'bootcamp' | 'seminar';
}

// Mock data - in real app this would come from API
const pendingEvents: Event[] = [
  {
    id: 1,
    title: "React Workshop - Advanced Concepts",
    organizer: "Ahmet Yılmaz",
    date: "2024-01-15",
    time: "14:00",
    location: "İstanbul Teknik Üniversitesi",
    attendees: 45,
    maxAttendees: 50,
    status: "pending" as const,
    description: "Advanced React concepts including hooks, context, and performance optimization",
    category: "workshop" as const
  },
  {
    id: 2,
    title: "Full Stack Development Bootcamp",
    organizer: "Fatma Kaya",
    date: "2024-01-20",
    time: "10:00",
    location: "Online",
    attendees: 120,
    maxAttendees: 100,
    status: "flagged" as const,
    description: "Complete full stack development course covering frontend and backend",
    category: "bootcamp" as const
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    organizer: "Mehmet Demir",
    date: "2024-01-12",
    time: "16:00",
    location: "Ankara Bilim Üniversitesi",
    attendees: 30,
    maxAttendees: 40,
    status: "pending" as const,
    description: "Learn modern JavaScript best practices and coding standards",
    category: "seminar" as const
  }
];

const approvedEvents: Event[] = [
  {
    id: 4,
    title: "Node.js Microservices Architecture",
    organizer: "Ali Veli",
    date: "2024-01-25",
    time: "13:00",
    location: "Boğaziçi Üniversitesi",
    attendees: 35,
    maxAttendees: 40,
    status: "approved",
    description: "Learn how to build scalable microservices with Node.js",
    category: "workshop"
  }
];

import { AuthGuard } from "@/components/auth/auth-guard";

export default function ModeratorEventsPage() {
  return (
    <AuthGuard roles={['MODERATOR', 'ADMIN']}>
      <ModeratorEventsContent />
    </AuthGuard>
  );
}

function ModeratorEventsContent() {
  const { user } = useSelector((s: RootState) => s.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'bootcamp': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'seminar': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleApprove = (eventId: number) => {
    console.log('Approving event:', eventId);
    // API call to approve event
  };

  const handleReject = (eventId: number) => {
    console.log('Rejecting event:', eventId);
    // API call to reject event
  };

  const handleEdit = (eventId: number) => {
    console.log('Editing event:', eventId);
    // Navigate to edit page
  };

  const handleDelete = (eventId: number) => {
    console.log('Deleting event:', eventId);
    // API call to delete event
  };

  const renderEventCard = (event: Event, showActions = true) => (
    <Card key={event.id} className="p-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Organizatör: {event.organizer}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(event.status)}>
              {getStatusText(event.status)}
            </Badge>
            <Badge className={getCategoryColor(event.category)}>
              {event.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.attendees}/{event.maxAttendees} katılımcı</span>
          </div>
        </div>

        {event.status === 'flagged' && (
          <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700 dark:text-red-300">
              Bu etkinlik rapor edildi ve acil inceleme gerektiriyor.
            </span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => console.log('View details')}>
              <Eye className="h-4 w-4 mr-1" />
              Detaylar
            </Button>
            {event.status === 'pending' || event.status === 'flagged' ? (
              <>
                <Button size="sm" variant="outline" onClick={() => handleApprove(event.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Onayla
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleReject(event.id)}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Reddet
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => handleEdit(event.id)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Düzenle
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Etkinlik Moderasyonu</h1>
          <p className="text-muted-foreground">
            Etkinlik onayları ve topluluk etkinlikleri yönetimi
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Etkinlik
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEvents.filter(e => e.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Moderasyon gereken</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raporlanan</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEvents.filter(e => e.status === 'flagged').length}</div>
            <p className="text-xs text-muted-foreground">Acil inceleme</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Hafta Onaylanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Onaylanmış etkinlik</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Katılımcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Bu ay katılan</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            İnceleme Bekleyen ({pendingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Onaylanmış ({approvedEvents.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Reddedilmiş (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {pendingEvents.map(event => renderEventCard(event))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="space-y-4">
            {approvedEvents.map(event => renderEventCard(event))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            Henüz reddedilmiş etkinlik bulunmuyor.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}