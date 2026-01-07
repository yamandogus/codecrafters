import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, X, Check, Plus, Trash2 } from "lucide-react";
import { ProfileUser } from "../types";
import { UserService } from "@/services/userService";
import { toast } from "sonner";
import { getSkillLevelColor } from "../utils";

interface SkillsEditorProps {
  user: ProfileUser;
  isEditable: boolean;
  onUpdate: (user: ProfileUser) => void;
}

export default function SkillsEditor({ user, isEditable, onUpdate }: SkillsEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner", color: "bg-gray-500" });
  const [isSaving, setIsSaving] = useState(false);

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error("Beceri adı gerekli");
      return;
    }
    if (skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      toast.error("Bu beceri zaten ekli");
      return;
    }
    setSkills([...skills, { ...newSkill }]);
    setNewSkill({ name: "", level: "Beginner", color: "bg-gray-500" });
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await UserService.updateProfile({
        skills: skills.map(s => ({
          name: s.name,
          level: s.level,
          color: s.color
        }))
      });
      if (updated) {
        onUpdate(updated);
        setIsEditing(false);
        toast.success("Teknik beceriler güncellendi");
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
    setSkills(user.skills || []);
    setIsEditing(false);
  };

  if (!isEditable) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Teknik Beceriler
          </h2>
          {user.skills && user.skills.length > 0 ? (
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
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Henüz beceri eklenmemiş.</p>
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
              Teknik Beceriler
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
            <div className="flex gap-2">
              <Input
                placeholder="Beceri adı (örn: JavaScript)"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addSkill();
                  }
                }}
              />
              <select
                className="rounded-md border px-3 py-2 bg-background"
                value={newSkill.level}
                onChange={(e) => {
                  const level = e.target.value;
                  const color =
                    level === "Expert" ? "bg-green-500" :
                    level === "Advanced" ? "bg-blue-500" :
                    level === "Intermediate" ? "bg-yellow-500" : "bg-gray-500";
                  setNewSkill({ ...newSkill, level, color });
                }}
              >
                <option value="Beginner">Başlangıç</option>
                <option value="Intermediate">Orta</option>
                <option value="Advanced">İleri</option>
                <option value="Expert">Uzman</option>
              </select>
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {skills.length > 0 ? (
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)} text-white`}>
                        {skill.level}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Henüz beceri eklenmemiş.</p>
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
            Teknik Beceriler
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
        {user.skills && user.skills.length > 0 ? (
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
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Henüz beceri eklenmemiş.</p>
        )}
      </CardContent>
    </Card>
  );
}

