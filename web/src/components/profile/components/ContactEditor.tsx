import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Github, Linkedin, Twitter, Globe, Edit3, X, Check } from "lucide-react";
import { ProfileUser } from "../types";
import { UserService } from "@/services/userService";
import { toast } from "sonner";

interface ContactEditorProps {
  user: ProfileUser;
  isEditable: boolean;
  onUpdate: (user: ProfileUser) => void;
}

export default function ContactEditor({ user, isEditable, onUpdate }: ContactEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [email] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [github, setGithub] = useState(user.socialLinks?.github || "");
  const [linkedin, setLinkedin] = useState(user.socialLinks?.linkedin || "");
  const [twitter, setTwitter] = useState(user.socialLinks?.twitter || "");
  const [website, setWebsite] = useState(user.socialLinks?.website || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // URL formatını düzelt
      let githubUrl = github;
      if (github && !github.startsWith('http')) {
        githubUrl = `https://github.com/${github.replace(/^@?/, '')}`;
      }

      let linkedinUrl = linkedin;
      if (linkedin && !linkedin.startsWith('http')) {
        linkedinUrl = `https://linkedin.com/in/${linkedin.replace(/^\/?/, '')}`;
      }

      const updated = await UserService.updateProfile({
        phone,
        github: githubUrl || undefined,
        linkedin: linkedinUrl || undefined,
        website: website || undefined,
      });
      if (updated) {
        onUpdate(updated);
        setIsEditing(false);
        toast.success("İletişim bilgileri güncellendi");
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
    setPhone(user.phone || "");
    setGithub(user.socialLinks?.github || "");
    setLinkedin(user.socialLinks?.linkedin || "");
    setTwitter(user.socialLinks?.twitter || "");
    setWebsite(user.socialLinks?.website || "");
    setIsEditing(false);
  };

  const getSocialIcon = (url: string) => {
    if (url.includes('github')) return <Github className="w-5 h-5" />;
    if (url.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
    if (url.includes('twitter') || url.includes('x.com')) return <Twitter className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  if (!isEditable) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            İletişim Bilgileri
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="w-5 h-5 text-green-600" />
              <a href={`mailto:${user.email}`} className="hover:text-green-600">
                {user.email}
              </a>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-green-600" />
                <span>{user.phone}</span>
              </div>
            )}
            {(user.socialLinks?.github || user.socialLinks?.linkedin || user.socialLinks?.twitter || user.socialLinks?.website) && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Sosyal Medya
                </h4>
                <div className="flex gap-4">
                  {user.socialLinks?.github && (
                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {user.socialLinks?.linkedin && (
                    <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {user.socialLinks?.twitter && (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {user.socialLinks?.website && (
                    <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              İletişim Bilgileri
            </h3>
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
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="w-5 h-5 text-green-600" />
              <span>{email}</span>
              <span className="text-xs text-gray-500">(Değiştirilemez)</span>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Telefon
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 555 123 45 67"
                type="tel"
              />
            </div>
            <div className="pt-4 border-t space-y-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Sosyal Medya
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-gray-400" />
                  <Input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub kullanıcı adı veya URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                  <Input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn kullanıcı adı veya URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-gray-400" />
                  <Input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter/X kullanıcı adı veya URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website URL"
                    type="url"
                  />
                </div>
              </div>
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            İletişim Bilgileri
          </h3>
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
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Mail className="w-5 h-5 text-green-600" />
            <a href={`mailto:${user.email}`} className="hover:text-green-600">
              {user.email}
            </a>
          </div>
          {user.phone && (
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Phone className="w-5 h-5 text-green-600" />
              <span>{user.phone}</span>
            </div>
          )}
          {(user.socialLinks?.github || user.socialLinks?.linkedin || user.socialLinks?.twitter || user.socialLinks?.website) && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Sosyal Medya
              </h4>
              <div className="flex gap-4">
                {user.socialLinks?.github && (
                  <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {user.socialLinks?.linkedin && (
                  <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {user.socialLinks?.twitter && (
                  <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {user.socialLinks?.website && (
                  <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

