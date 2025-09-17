"use client";

import React, { useState } from "react";
import {
  MenuIcon,
  LogOut,
  Bell,
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
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { 
  getRoleBasedNavigation, 
  getRoleBasedUserMenu, 
  getRoleBasedQuickActions 
} from "./role-based-navigation";

export const Navbar = () => {
  const { user, isAuthenticated, logout: authLogout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications] = useState(3); // Bu gelecekte backend'den gelecek

  // Get role-based navigation
  const navigation = getRoleBasedNavigation(user?.role);
  const userMenuItems = getRoleBasedUserMenu(user?.role);
  const quickActions = getRoleBasedQuickActions(user?.role);

  const logout = async () => {
    await authLogout();
    router.push("/");
  };

  // Scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <section
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 border-b-2 border-transparent hover:border-[#974eff] transition-colors duration-400"
          >
            <span className="text-lg font-semibold tracking-tighter font-mono">
              CodeCrafters
            </span>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navigation.map((item, index) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 p-3">
                          {item.children.map((child, childIndex) => (
                            <NavigationMenuLink
                              href={child.href}
                              key={childIndex}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <div className="flex items-center gap-2">
                                {child.icon && <child.icon className="h-4 w-4" />}
                                <div>
                                  <p className="mb-1 font-semibold text-foreground">
                                    {child.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {child.description}
                                  </p>
                                </div>
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }
              })}
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

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {notifications}
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
                        <AvatarImage src="" alt={`${user.name} ${user.surname}`} />
                        <AvatarFallback>
                          {user.name[0]}{user.surname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block text-sm font-medium">
                        {user.name} {user.surname}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name} {user.surname}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item, index) => {
                      if (item.separator) {
                        return <DropdownMenuSeparator key={index} />;
                      }
                      return (
                        <DropdownMenuItem asChild key={index}>
                          <Link href={item.href} className="flex items-center">
                            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                            <span>{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
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
                  <Link href="/auth/login">Giriş Yap</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Ücretsiz Başla</Link>
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
                  {navigation.map((item, index) => {
                    if (item.children && item.children.length > 0) {
                      return (
                        <AccordionItem value={`nav-${index}`} className="border-none" key={index}>
                          <AccordionTrigger className="text-base hover:no-underline">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid md:grid-cols-2">
                              {item.children.map((child, childIndex) => (
                                <a
                                  href={child.href}
                                  key={childIndex}
                                  className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                >
                                  <div className="flex items-center gap-2">
                                    {child.icon && <child.icon className="h-4 w-4" />}
                                    <div>
                                      <p className="mb-1 font-semibold text-foreground">
                                        {child.title}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {child.description}
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                    return null;
                  })}
                </Accordion>
                <div className="flex flex-col gap-6">
                  {navigation.map((item, index) => {
                    if (!item.children || item.children.length === 0) {
                      return (
                        <a href={item.href} className="font-medium" key={index}>
                          {item.title}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" alt={`${user.name} ${user.surname}`} />
                          <AvatarFallback>
                            {user.name[0]}{user.surname[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name} {user.surname}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <Button variant="outline" size="sm" asChild key={index}>
                            <Link href={action.href}>{action.title}</Link>
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={logout}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Çıkış Yap
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/auth/login">Giriş Yap</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/auth/register">Ücretsiz Başla</Link>
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
