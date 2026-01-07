"use client";

import { useEffect, useState } from "react";
import { Shield, Share2, Heart, X, Edit3, Calendar, Code, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProfileUser } from "../types";
import { formatDate } from "../utils";
import { UserService } from "@/services/userService";
import Link from "next/link";

interface ProfileHeaderProps {
  user: ProfileUser;
  isEditable: boolean;
  isEditing: boolean;
  onEditToggle: () => void;
}

export default function ProfileHeader({ 
  user, 
  isEditable, 
  isEditing, 
  onEditToggle 
}: ProfileHeaderProps) {
  const [stats, setStats] = useState<{ projects: number; events: number; favorites: number } | null>(null);

  useEffect(() => {
    if (isEditable) {
      UserService.getMyStats().then(setStats);
    }
  }, [isEditable]);

  const displayStats = stats || {
    projects: user.stats.projects,
    events: user.stats.events,
    favorites: 0,
  };

  return (
    <div className="relative h-64 bg-gradient-to-r from-green-600 to-emerald-600 rounded-b-3xl">
      <Image
        src={user.coverImage}
        alt="Cover"
        fill
        className="object-cover rounded-b-3xl"
      />
      <div className="absolute inset-0 bg-black/20 rounded-b-3xl" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-end gap-4">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.isMentor && (
                <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-medium rounded-full">
                  Mentor
                </span>
              )}
            </div>
            <p className="text-white/80">@{user.username}</p>
            <p className="text-white/70 text-sm mb-3">
              {user.location} • {formatDate(user.joinDate)} tarihinde katıldı
            </p>
            
            {/* İstatistikler - Sadece kendi profilinde göster */}
            {isEditable && (
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/20">
                <Link href="/my-events" className="flex items-center gap-2 hover:text-green-200 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold">{displayStats.events}</span>
                  <span className="text-sm text-white/80">Etkinliklerim</span>
                </Link>
                <Link href="/projects" className="flex items-center gap-2 hover:text-green-200 transition-colors">
                  <Code className="w-4 h-4" />
                  <span className="font-semibold">{displayStats.projects}</span>
                  <span className="text-sm text-white/80">Projelerim</span>
                </Link>
                <div className="flex items-center gap-2 hover:text-green-200 transition-colors cursor-pointer">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold">{displayStats.favorites}</span>
                  <span className="text-sm text-white/80">Favorilerim</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Share2 className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
            {!isEditable && (
               <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
               <Heart className="w-4 h-4 mr-2" />
               Takip Et
             </Button>
            )}
            {isEditable && (
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={onEditToggle}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    İptal
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Düzenle
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
