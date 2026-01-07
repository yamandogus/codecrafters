import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, X, Check, Plus, Trash2, Award } from "lucide-react";
import { ProfileUser } from "../types";
import { UserService } from "@/services/userService";
import { toast } from "sonner";

interface AchievementsEditorProps {
  user: ProfileUser;
  isEditable: boolean;
  onUpdate: (user: ProfileUser) => void;
}

export default function AchievementsEditor({ user, isEditable, onUpdate }: AchievementsEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState(user.achievements || []);
  const [newAchievement, setNewAchievement] = useState({ 
    title: "", 
    description: "", 
    date: new Date().toISOString().split('T')[0],
    icon: undefined as React.ReactNode | undefined 
  });
  const [isSaving, setIsSaving] = useState(false);

  const addAchievement = () => {
    if (!newAchievement.title.trim()) {
      toast.error("Başlık gerekli");
      return;
    }
    setAchievements([...achievements, { ...newAchievement }]);
    setNewAchievement({ 
      title: "", 
      description: "", 
      date: new Date().toISOString().split('T')[0],
      icon: undefined 
    });
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await UserService.updateProfile({
        achievements: achievements.map(a => ({
          title: a.title,
          description: a.description || "",
          icon: undefined,
          date: a.date || new Date().toISOString()
        }))
      });
      if (updated) {
        onUpdate(updated);
        setIsEditing(false);
        toast.success("Başarılar güncellendi");
      } else {
        toast.error("Güncelleme başarısız oldu");
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setAchievements(user.achievements || []);
    setIsEditing(false);
  };

  if (!isEditable) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Başarılar
          </h2>
          {user.achievements && user.achievements.length > 0 ? (
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
                    {achievement.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString('tr-TR')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Henüz başarı eklenmemiş.</p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Başarılar
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Başlık (örn: Hackathon Birinciliği)"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              />
              <Input
                type="date"
                value={newAchievement.date}
                onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Açıklama"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                rows={2}
                className="flex-1"
              />
              <Button onClick={addAchievement} size="sm" className="self-start">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </div>
                      {achievement.date && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {new Date(achievement.date).toLocaleDateString('tr-TR')}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Henüz başarı eklenmemiş.</p>
            )}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                İptal
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Check className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Başarılar
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-green-600 hover:text-green-700"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Düzenle
          </Button>
        </div>
        {user.achievements && user.achievements.length > 0 ? (
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
                  {achievement.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(achievement.date).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Henüz başarı eklenmemiş.</p>
        )}
      </CardContent>
    </Card>
  );
}

