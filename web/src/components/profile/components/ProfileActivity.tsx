"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileUser } from "../types";
import { formatDate } from "../utils";
import { Activity, Code, BookOpen, Calendar, MessageCircle } from "lucide-react";
import { UserService } from "@/services/userService";
import { eventService } from "@/services/eventsService";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfileActivityProps {
  recentActivity: ProfileUser['recentActivity'];
  isEditable?: boolean;
}

export default function ProfileActivity({ recentActivity, isEditable = false }: ProfileActivityProps) {
  const [allActivities, setAllActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditable) {
      loadAllActivities();
    }
  }, [isEditable]);

  const loadAllActivities = async () => {
    setLoading(true);
    try {
      const [projects, events] = await Promise.all([
        UserService.getMyProjects(),
        eventService.getMyRegistrations(),
      ]);

      const activities: any[] = [];

      // Projeler
      if (projects && projects.length > 0) {
        projects.forEach((project: any) => {
          activities.push({
            type: "project",
            title: project.title,
            description: project.description,
            date: project.createdAt,
            icon: Code,
            link: `/projects/${project.id}`,
          });
        });
      }

      // Etkinlikler
      if (events.success && events.data && events.data.length > 0) {
        events.data.forEach((event: any) => {
          activities.push({
            type: "event",
            title: event.title,
            description: `Etkinliğe kayıt oldunuz`,
            date: event.startDate,
            icon: Calendar,
            link: `/events/${event.id}`,
          });
        });
      }

      // Blog yazıları (recentActivity'den)
      if (recentActivity) {
        recentActivity.forEach((activity) => {
          if (activity.type === "post") {
            activities.push({
              ...activity,
              link: `/blog/${(activity as any).id}`,
            });
          }
        });
      }

      // Tarihe göre sırala
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAllActivities(activities);
    } catch (error) {
      console.error("Error loading activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const activitiesToShow = isEditable && allActivities.length > 0 ? allActivities : recentActivity || [];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Son Aktiviteler
          </h2>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activitiesToShow || activitiesToShow.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Son Aktiviteler
          </h2>
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Henüz aktivite yok
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isEditable 
                ? "Projeleriniz, etkinlik kayıtlarınız ve blog yazılarınız burada görüntülenecek"
                : "Kullanıcının aktiviteleri burada görüntülenecek"}
            </p>
            {isEditable && (
              <div className="flex gap-2 justify-center">
                <Link href="/projects">
                  <Button variant="outline" size="sm">
                    <Code className="w-4 h-4 mr-2" />
                    Proje Ekle
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Etkinliklere Katıl
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEditable ? "Tüm Aktiviteler" : "Son Aktiviteler"}
          </h2>
          {isEditable && (
            <Button variant="outline" size="sm" onClick={loadAllActivities}>
              Yenile
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {activitiesToShow.map((activity, index) => {
            const IconComponent = typeof activity.icon === 'function' ? activity.icon : null;
            const ActivityCard = (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  activity.link ? 'cursor-pointer' : ''
                }`}
                onClick={() => activity.link && window.open(activity.link, '_self')}
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    activity.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                    {activity.type && (
                      <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {activity.type === "project" ? "Proje" : 
                         activity.type === "event" ? "Etkinlik" : 
                         activity.type === "post" ? "Blog" : "Aktivite"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
            );

            return activity.link ? (
              <Link key={index} href={activity.link}>
                {ActivityCard}
              </Link>
            ) : (
              ActivityCard
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
