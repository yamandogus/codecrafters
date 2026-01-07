"use client";

import { 
  FileText, 
  Calendar, 
  Users, 
  Shield, 
  BarChart3, 
  Settings,
  MessageSquare,
  Code,
  BookOpen,
  Briefcase,
  Heart,
  User,
  Activity,
  Info,
  Mail,
  Newspaper,
  LayoutGrid
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon | null;
  role?: 'USER' | 'MODERATOR' | 'ADMIN' | 'ALL';
  children?: NavigationItem[];
}

export interface UserMenuItem {
  title: string;
  href: string;
  icon: LucideIcon | null;
  role?: 'USER' | 'MODERATOR' | 'ADMIN' | 'ALL';
  separator?: boolean;
}

// Role-based navigation configuration
export const getRoleBasedNavigation = (userRole?: string): NavigationItem[] => {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Özellikler",
      description: "Platform özellikleri",
      href: "#",
      icon: LayoutGrid,
      role: 'ALL',
      children: [
        {
          title: "Projeler",
          description: "Topluluk projelerini keşfet",
          href: "/projects",
          icon: Code,
          role: 'ALL'
        },
        {
          title: "Öğrenme Merkezi",
          description: "Junior odaklı yazılım kaynakları", 
          href: "/learning",
          icon: BookOpen,
          role: 'ALL'
        },
        {
          title: "Etkinlikler",
          description: "Yaklaşan topluluk etkinlikleri",
          href: "/events",
          icon: Calendar,
          role: 'ALL'
        },
        {
          title: "Forum",
          description: "Soru-cevap ve tartışmalar",
          href: "/forum",
          icon: MessageSquare,
          role: 'ALL'
        },
        {
          title: "Topluluk",
          description: "Kullanıcı profilleri ve mentorluk",
          href: "/community",
          icon: Users,
          role: 'ALL'
        },
        {
          title: "İş İlanları",
          description: "Yazılım sektörü kariyer fırsatları",
          href: "/jobs",
          icon: Briefcase,
          role: 'ALL'
        }
      ]
    },
    {
      title: "Blog",
      description: "Yazılım ve teknoloji makaleleri",
      href: "/blog",
      icon: Newspaper,
      role: 'ALL'
    },
    {
      title: "İletişim",
      description: "Bizimle iletişime geçin",
      href: "/contact",
      icon: Mail,
      role: 'ALL'
    },
    {
      title: "Hakkımızda",
      description: "CodeCrafters hakkında bilgi",
      href: "/about",
      icon: Info,
      role: 'ALL'
    }
  ];

  // Add role-specific navigation items
  if (userRole === 'MODERATOR' || userRole === 'ADMIN') {
    baseNavigation.push({
      title: "Moderasyon",
      description: "Moderator araçları",
      href: "#",
      icon: Shield,
      role: 'MODERATOR',
      children: [
        {
          title: "Dashboard",
          description: "Moderator ana paneli",
          href: "/moderator/dashboard",
          icon: Activity,
          role: 'MODERATOR'
        },
        {
          title: "Etkinlik Yönetimi",
          description: "Etkinlik onayları ve moderasyonu",
          href: "/moderator/events",
          icon: Calendar,
          role: 'MODERATOR'
        },
        {
          title: "İçerik Moderasyonu",
          description: "Blog, yorum ve forum moderasyonu",
          href: "/moderator/content",
          icon: FileText,
          role: 'MODERATOR'
        },
        {
          title: "Kullanıcı Yönetimi",
          description: "Kullanıcı moderasyonu ve raporlar",
          href: "/moderator/users",
          icon: Users,
          role: 'MODERATOR'
        }
      ]
    });
  }

  if (userRole === 'ADMIN') {
    baseNavigation.push({
      title: "Admin",
      description: "Yönetici araçları",
      href: "#",
      icon: Settings,
      role: 'ADMIN',
      children: [
        {
          title: "Admin Dashboard",
          description: "Sistem yönetimi ana paneli",
          href: "/admin/dashboard",
          icon: BarChart3,
          role: 'ADMIN'
        },
        {
          title: "Kullanıcı Yönetimi",
          description: "Tüm kullanıcıları yönet",
          href: "/admin/users",
          icon: Users,
          role: 'ADMIN'
        },
        {
          title: "İçerik Yönetimi",
          description: "Platform içeriği yönetimi",
          href: "/admin/content",
          icon: FileText,
          role: 'ADMIN'
        },
        {
          title: "Analitik",
          description: "Platform istatistikleri",
          href: "/admin/analytics",
          icon: BarChart3,
          role: 'ADMIN'
        },
        {
          title: "Sistem Ayarları",
          description: "Platform konfigürasyonu",
          href: "/admin/settings",
          icon: Settings,
          role: 'ADMIN'
        }
      ]
    });
  }

  return baseNavigation.filter(item => 
    item.role === 'ALL' || 
    item.role === userRole || 
    (userRole === 'ADMIN' && (item.role === 'MODERATOR' || item.role === 'USER'))
  );
};

// Role-based user menu configuration
export const getRoleBasedUserMenu = (userRole?: string): UserMenuItem[] => {
  const baseUserMenu: UserMenuItem[] = [
    {
      title: "Profilim",
      href: "/profile",
      icon: User,
      role: 'ALL'
    },
    {
      title: "Etkinliklerim",
      href: "/my-events",
      icon: Calendar,
      role: 'ALL'
    },
    {
      title: "Projelerim",
      href: "/my-projects",
      icon: Code,
      role: 'ALL'
    },
    {
      title: "Favorilerim",
      href: "/favorites",
      icon: Heart,
      role: 'ALL'
    }
  ];

  // Add role-specific menu items
  if (userRole === 'MODERATOR' || userRole === 'ADMIN') {
    baseUserMenu.push({
      title: "",
      href: "",
      icon: null,
      separator: true,
      role: 'ALL'
    });
    
    baseUserMenu.push({
      title: "Moderator Panel",
      href: "/moderator/dashboard",
      icon: Shield,
      role: 'MODERATOR'
    });
  }

  if (userRole === 'ADMIN') {
    baseUserMenu.push({
      title: "Admin Panel",
      href: "/admin/dashboard",
      icon: Settings,
      role: 'ADMIN'
    });
  }

  // Add settings at the end
  baseUserMenu.push({
    title: "",
    href: "",
    icon: null,
    separator: true,
    role: 'ALL'
  });

  baseUserMenu.push({
    title: "Ayarlar",
    href: "/settings",
    icon: Settings,
    role: 'ALL'
  });

  return baseUserMenu.filter(item => 
    item.separator || 
    item.role === 'ALL' || 
    item.role === userRole || 
    (userRole === 'ADMIN' && (item.role === 'MODERATOR' || item.role === 'USER'))
  );
};

// Mobile navigation items for role-based quick access
export const getRoleBasedQuickActions = (userRole?: string): UserMenuItem[] => {
  const baseActions: UserMenuItem[] = [
    {
      title: "Profilim",
      href: "/profile",
      icon: User,
      role: 'ALL'
    },
    {
      title: "Etkinliklerim",
      href: "/my-events", 
      icon: Calendar,
      role: 'ALL'
    }
  ];

  if (userRole === 'MODERATOR' || userRole === 'ADMIN') {
    baseActions.push({
      title: "Moderator Panel",
      href: "/moderator/dashboard",
      icon: Shield,
      role: 'MODERATOR'
    });
  }

  if (userRole === 'ADMIN') {
    baseActions.push({
      title: "Admin Panel", 
      href: "/admin/dashboard",
      icon: Settings,
      role: 'ADMIN'
    });
  }

  baseActions.push({
    title: "Ayarlar",
    href: "/settings",
    icon: Settings,
    role: 'ALL'
  });

  return baseActions.filter(item => 
    item.role === 'ALL' || 
    item.role === userRole || 
    (userRole === 'ADMIN' && (item.role === 'MODERATOR' || item.role === 'USER'))
  );
};