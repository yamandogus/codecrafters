"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Video,
  Download
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { eventService, Event } from "@/services/eventsService";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth/auth-guard";

interface MyEvent extends Event {
  registrationDate?: string;
  registrationStatus?: string;
  ticketUrl?: string;
}

export default function MyEventsPage() {
  return (
    <AuthGuard>
      <MyEventsContent />
    </AuthGuard>
  );
}

function MyEventsContent() {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getMyRegistrations();
        if (response.success && response.data) {
          const adaptedEvents = response.data.map((event: Event) => ({
            ...event,
            registrationDate: event.registrations?.[0]?.registeredAt,
            registrationStatus: event.registrations?.[0]?.status || 'confirmed',
            ticketUrl: "#"
          } as MyEvent));
          setEvents(adaptedEvents);
        }
      } catch (error) {
        console.error("Etkinlikler yüklenirken hata:", error);
        toast.error("Etkinlikler yüklenemedi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getFilteredEvents = () => {
    return events.filter(event => {
      // Status filtering logic
      // Backend status: UPCOMING, ONGOING, COMPLETED, CANCELLED
      // Tab IDs: upcoming, ongoing, completed, cancelled
      const matchesTab = event.status?.toLowerCase() === selectedTab;

      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  };

  const filteredEvents = getFilteredEvents();

  const getTabCount = (tabId: string) => {
    return events.filter(e => e.status?.toLowerCase() === tabId).length;
  };

  const tabs = [
    { id: "upcoming", name: "Yaklaşan", count: getTabCount("upcoming") },
    { id: "ongoing", name: "Devam Eden", count: getTabCount("ongoing") },
    { id: "completed", name: "Tamamlanan", count: getTabCount("completed") },
    { id: "cancelled", name: "İptal Edilen", count: getTabCount("cancelled") }
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="text-gray-500">Etkinlikler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Etkinliklerim</h1>
          <p className="text-gray-500">
            Kayıt olduğunuz ve katıldığınız tüm etkinlikleri buradan takip edebilirsiniz.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Takvime Ekle
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${selectedTab === tab.id
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${selectedTab === tab.id
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Etkinlik ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-xl border hover:border-green-500/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Event Image & Date */}
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={event.image || "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-center text-sm font-bold shadow-sm">
                    <div className="text-green-600">
                      {new Date(event.startDate).toLocaleDateString('tr-TR', { day: 'numeric' })}
                    </div>
                    <div className="text-gray-600 text-xs uppercase">
                      {new Date(event.startDate).toLocaleDateString('tr-TR', { month: 'short' })}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 py-2">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                    </div>
                    {/* Action Menu (Optional) */}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(event.startDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {event.isOnline ? (
                        <>
                          <Video className="w-4 h-4" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${event.registrationStatus === 'confirmed' ? 'bg-green-500' :
                        event.registrationStatus === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                      <span className="text-sm text-gray-600">
                        Kayıt: {event.registrationDate ? new Date(event.registrationDate).toLocaleDateString('tr-TR') : '-'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}`}>Detaylar</Link>
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Bileti Görüntüle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Etkinlik Bulunamadı</h3>
            <p className="text-gray-500 mb-6">
              {selectedTab === 'upcoming'
                ? "Henüz kayıt olduğunuz yaklaşan bir etkinlik yok."
                : "Bu kategoride etkinlik bulunmuyor."}
            </p>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/events">Etkinlikleri Keşfet</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
