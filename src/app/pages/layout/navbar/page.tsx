"use client";

import { useState } from "react";
import {
  MenuIcon,
  User,
  Settings,
  LogOut,
  Bell,
  Heart,
  Calendar,
  Code,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useTheme } from "next-themes";

export const Navbar = () => {
  // Mock user state - gerçek uygulamada context/state management'dan gelecek
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Test için true
  const [user] = useState({
    name: "Ahmet Yılmaz",
    username: "ahmetyilmaz",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    notifications: 3,
  });

  const features = [
    {
      title: "Projeler",
      description: "Topluluk projelerini keşfet",
      href: "/pages/projects",
    },
    {
      title: "Öğrenme Merkezi",
      description: "Junior odaklı yazılım kaynakları",
      href: "/pages/learning",
    },
    {
      title: "Etkinlikler",
      description: "Yaklaşan topluluk etkinlikleri",
      href: "/pages/events",
    },
    {
      title: "Forum",
      description: "Soru-cevap ve tartışmalar",
      href: "/pages/forum",
    },
    {
      title: "Topluluk",
      description: "Kullanıcı profilleri ve mentorluk",
      href: "/pages/community",
    },
    {
      title: "İş İlanları",
      description: "Yazılım sektörü kariyer fırsatları",
      href: "/pages/jobs",
    },
  ];

 const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
 }


  return (
    <section className="py-4">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter font-mono">
              CodeCrafters
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Özellikler</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={feature.title}>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/pages/blog"
                  className={navigationMenuTriggerStyle()}
                >
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/pages/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  İletişim
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/pages/about"
                  className={navigationMenuTriggerStyle()}
                >
                  Hakkımızda
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {/* Theme Toggle - Her zaman görünür */}
            <div className="flex items-center space-x-2">
              <Button
                id="dark-mode"
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="data-[state=checked]:bg-primary cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-500" />
                )}
              </Button>
            </div>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {user.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {user.notifications}
                    </span>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block text-sm font-medium">
                        {user.name}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/pages/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profilim</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pages/my-events"
                        className="flex items-center"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Etkinliklerim</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pages/my-projects"
                        className="flex items-center"
                      >
                        <Code className="mr-2 h-4 w-4" />
                        <span>Projelerim</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pages/favorites"
                        className="flex items-center"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorilerim</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pages/settings"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Ayarlar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setIsLoggedIn(false)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/pages/login">Giriş Yap</Link>
                </Button>
                <Button asChild>
                  <Link href="/pages/register">Ücretsiz Başla</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <span className="text-lg font-semibold tracking-tighter">
                    CodeCrafters
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Özellikler
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="/pages/blog" className="font-medium">
                    Blog
                  </a>
                  <a href="/pages/contact" className="font-medium">
                    İletişim
                  </a>
                  <a href="/pages/about" className="font-medium">
                    Hakkımızda
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/pages/profile">Profilim</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/pages/my-events">Etkinliklerim</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/pages/settings">Ayarlar</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsLoggedIn(false)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Çıkış Yap
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/pages/login">Giriş Yap</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/pages/register">Ücretsiz Başla</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
