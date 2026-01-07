import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { ProfileUser } from "../types";
import { getSkillLevelColor } from "../utils";

interface ProfileOverviewProps {
  user: ProfileUser;
}

export default function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Bio */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Hakkında
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {user.bio}
          </p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Teknik Beceriler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)} text-white`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Başarılar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.achievements.map((achievement, index) => {
              const IconComponent = achievement.icon && typeof achievement.icon === 'function' ? achievement.icon : null;
              return (
                <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  ) : achievement.icon ? (
                    achievement.icon
                  ) : (
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  )}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
