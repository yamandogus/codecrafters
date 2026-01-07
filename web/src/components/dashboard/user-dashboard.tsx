"use client";

import { useEffect, useState } from "react";
import { dashboardService, DashboardData } from "@/services/dashboardService";
import { Card, CardContent,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  TrendingUp,
  Video
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function UserDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getUserDashboard();
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Dashboard yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Toplam Başvuru</p>
              <h3 className="text-2xl font-bold text-gray-900">{data.stats.totalApplications}</h3>
            </div>
            <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Kayıtlı Etkinlikler</p>
              <h3 className="text-2xl font-bold text-gray-900">{data.stats.totalEvents}</h3>
            </div>
            <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        {/* Placeholder for future stats */}
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Forum Katkıları</p>
              <h3 className="text-2xl font-bold text-gray-900">0</h3>
            </div>
            <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Yaklaşan Etkinliklerim</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-events" className="text-green-600 hover:text-green-700">
                Tümünü Gör <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {data.upcomingEvents.length > 0 ? (
              data.upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-24 relative hidden sm:block">
                      <Image 
                        src={event.image || "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop"} 
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex-1">
                      <div className="flex flex-col h-full justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 line-clamp-1">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(event.startDate).toLocaleDateString('tr-TR', { 
                                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {event.isOnline ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          <span className="line-clamp-1">{event.isOnline ? 'Online' : event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center text-gray-500">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Yaklaşan etkinlik bulunmuyor</p>
                  <Button variant="link" asChild className="mt-2 text-green-600">
                    <Link href="/events">Etkinlikleri Keşfet</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Son Başvurularım</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-applications" className="text-green-600 hover:text-green-700">
                Tümünü Gör <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {data.recentApplications.length > 0 ? (
              data.recentApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{app.job.title}</h4>
                        <p className="text-sm text-gray-500">{app.job.company}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <span>{app.job.type}</span>
                      <span>{new Date(app.appliedAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center text-gray-500">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Henüz başvuru yapmadınız</p>
                  <Button variant="link" asChild className="mt-2 text-green-600">
                    <Link href="/jobs">İş İlanlarına Bak</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
