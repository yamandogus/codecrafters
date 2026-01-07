import { Card, CardContent } from "@/components/ui/card";
import { ProfileUser } from "../types";

interface ProfileStatsProps {
  stats: ProfileUser['stats'];
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          İstatistikler
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.projects}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Proje
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.events}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Etkinlik
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.followers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Takipçi
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.following}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Takip
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.posts}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Paylaşım
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.likes}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Beğeni
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
