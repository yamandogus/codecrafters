import { Mail, Phone, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileUser } from "../types";

interface ProfileContactProps {
  user: ProfileUser;
}

export default function ProfileContact({ user }: ProfileContactProps) {
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
        </div>
      </CardContent>
    </Card>
  );
}
