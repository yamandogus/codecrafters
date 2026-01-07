import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, X, Check } from "lucide-react";
import { ProfileUser } from "../types";
import { UserService } from "@/services/userService";
import { toast } from "sonner";

interface AboutEditorProps {
  user: ProfileUser;
  isEditable: boolean;
  onUpdate: (user: ProfileUser) => void;
}

export default function AboutEditor({ user, isEditable, onUpdate }: AboutEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await UserService.updateProfile({
        bio,
        location,
      });
      if (updated) {
        onUpdate(updated);
        setIsEditing(false);
        toast.success("Hakkında bilgisi güncellendi");
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
    setBio(user.bio || "");
    setLocation(user.location || "");
    setIsEditing(false);
  };

  if (!isEditable) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Hakkında
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {user.bio || "Henüz bir hakkında bilgisi eklenmemiş."}
          </p>
          {user.location && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              📍 {user.location}
            </p>
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
              Hakkında
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hakkında
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                maxLength={500}
                placeholder="Kendiniz hakkında bilgi verin..."
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                {bio.length}/500 karakter
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Konum
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Örn: İstanbul, Türkiye"
                maxLength={100}
              />
            </div>
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
            Hakkında
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
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {user.bio || "Henüz bir hakkında bilgisi eklenmemiş."}
        </p>
        {user.location && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            📍 {user.location}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

