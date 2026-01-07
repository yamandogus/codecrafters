import { Card, CardContent } from "@/components/ui/card";
import { ProfileUser } from "../types";
import { formatDate } from "../utils";

interface ProfileActivityProps {
  recentActivity: ProfileUser['recentActivity'];
}

export default function ProfileActivity({ recentActivity }: ProfileActivityProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Son Aktiviteler
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const IconComponent = typeof activity.icon === 'function' ? activity.icon : null;
            return (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5 text-green-600" />
                  ) : (
                    activity.icon
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
