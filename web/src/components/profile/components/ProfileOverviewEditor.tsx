import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProfileUser } from "../types";
import { toast } from "sonner";
import { UserService } from "@/services/userService";

interface ProfileOverviewEditorProps {
  user: ProfileUser;
  onSaved: (user: ProfileUser) => void;
  onCancel: () => void;
}

export default function ProfileOverviewEditor({
  user,
  onSaved,
  onCancel,
}: ProfileOverviewEditorProps) {
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.socialLinks?.website || "");
  const [github, setGithub] = useState(user.socialLinks?.github || "");
  const [linkedin, setLinkedin] = useState(user.socialLinks?.linkedin || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [achievements, setAchievements] = useState(user.achievements || []);

  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner", color: "bg-gray-500" });
  const [newAchievement, setNewAchievement] = useState({ title: "", description: "", date: new Date().toISOString(), icon: undefined as React.ReactNode | undefined });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill({ name: "", level: "Beginner", color: "bg-gray-500" });
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (!newAchievement.title.trim()) return;
    setAchievements([...achievements, newAchievement]);
    setNewAchievement({ title: "", description: "", date: new Date().toISOString(), icon: undefined });
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const payload = {
      bio,
      location,
      website,
      github,
      linkedin,
    };
    const updated = await UserService.updateProfile(payload);
    if (updated) {
      const merged: ProfileUser = {
        ...updated,
        socialLinks: {
          ...(updated.socialLinks || {}),
          website,
          github,
          linkedin,
        },
        skills,
        achievements,
      };
      onSaved(merged);
      toast.success("Profil güncellendi");
    } else {
      toast.error("Profil güncellenemedi");
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium">Hakkında</div>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={5} maxLength={500} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Konum</div>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Website</div>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">GitHub</div>
            <Input value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">LinkedIn</div>
            <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-lg font-semibold">Teknik Beceriler</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Beceri adı" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
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
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <Button onClick={addSkill}>Ekle</Button>
          </div>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${s.color}`} />
                  <span className="font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700">{s.level}</span>
                  <Button variant="outline" size="sm" onClick={() => removeSkill(i)}>Sil</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-lg font-semibold">Başarılar</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Başlık" value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} />
            <Input placeholder="Açıklama" value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })} />
            <Button onClick={addAchievement}>Ekle</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{a.description}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => removeAchievement(i)}>Sil</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>İptal</Button>
          <Button onClick={handleSave}>Kaydet</Button>
        </div>
      </CardContent>
    </Card>
  );
}
