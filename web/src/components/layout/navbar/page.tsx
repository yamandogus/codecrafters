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
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 py-3 transition-all duration-300 ${isScrolled ? "shadow-sm border-border/50" : "shadow-none border-transparent"
        }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <NavigationMenuList className="gap-2">
              {navigation.map((item, index) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 h-10 px-4 text-sm font-medium transition-colors">
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 p-4 gap-2">
                          {item.children.map((child, childIndex) => (
                            <NavigationMenuLink
                              asChild
                              key={childIndex}
                            >
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                    {child.icon && <child.icon className="h-4 w-4" />}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium leading-none mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                      {child.title}
                                    </div>
                                    <p className="line-clamp-1 text-xs leading-snug text-muted-foreground group-hover:text-muted-foreground/80">
                                      {child.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={index}>
                      <Link href={item.href}>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-accent/50 h-10 px-4 text-sm font-medium transition-colors`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
                            <span>{item.title}</span>
                          </div>
                        </NavigationMenuLink>
                      </Link>
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
                className="rounded-full hover:bg-accent/50 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 rotate-0 scale-100" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-500 transition-all duration-300 rotate-0 scale-100" />
                )}
              </Button>
            </div>

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-accent/50 transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  {notifications > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 pl-2 pr-4 h-12 rounded-full hover:bg-accent/50 transition-all border border-transparent hover:border-border/50"
                    >
                      <Avatar className="h-8 w-8 border-2 border-background shadow-sm">
                        <AvatarImage src="" alt={`${user.name} ${user.surname}`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-medium">
                          {user.name[0]}{user.surname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-semibold leading-none">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-none mt-1">
                          @{user.username}
                        </span>
                      </div>
                      <ChevronDown className="h-3 w-3 text-muted-foreground ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2">
                    <DropdownMenuLabel className="font-normal p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name} {user.surname}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email || `@${user.username}`}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item, index) => {
                      if (item.separator) {
                        return <DropdownMenuSeparator key={index} />;
                      }
                      return (
                        <DropdownMenuItem asChild key={index} className="cursor-pointer rounded-md p-2.5">
                          <Link href={item.href} className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                            <span>{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer rounded-md p-2.5"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hover:bg-accent/50">
                  <Link href="/auth/login">Giriş Yap</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                  <Link href="/auth/register">Ücretsiz Başla</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b bg-muted/30">
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-purple-600 to-blue-600 p-1.5 rounded-lg">
                      <span className="text-white font-bold text-lg leading-none">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">CodeCrafters</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto py-6 px-4">
                  <Accordion type="single" collapsible className="w-full">
                    {navigation.map((item, index) => {
                      if (item.children && item.children.length > 0) {
                        return (
                          <AccordionItem value={`nav-${index}`} className="border-b-0 mb-2" key={index}>
                            <AccordionTrigger className="hover:bg-accent/50 px-4 py-2 rounded-md hover:no-underline [&[data-state=open]]:bg-accent/50">
                              <div className="flex items-center gap-3 text-base">
                                {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                                {item.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pt-1">
                              <div className="flex flex-col gap-1 pl-4">
                                {item.children.map((child, childIndex) => (
                                  <a
                                    href={child.href}
                                    key={childIndex}
                                    className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
                                  >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                      {child.icon && <child.icon className="h-4 w-4" />}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium">{child.title}</span>
                                      <span className="text-xs text-muted-foreground line-clamp-1">{child.description}</span>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }
                      return (
                        <div key={index} className="mb-2">
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent/50 transition-colors text-base font-medium"
                          >
                            {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                            {item.title}
                          </Link>
                        </div>
                      );
                    })}
                  </Accordion>
                </div>

                <div className="p-4 border-t bg-muted/30 mt-auto">
                  {isAuthenticated && user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background border shadow-sm">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src="" alt={`${user.name} ${user.surname}`} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name[0]}{user.surname[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.name} {user.surname}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            @{user.username}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <Button variant="outline" size="sm" asChild key={index} className="justify-start h-9">
                            <Link href={action.href}>
                              {action.icon && <action.icon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />}
                              {action.title}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/auth/login">Giriş Yap</Link>
                      </Button>
                      <Button asChild className="w-full bg-primary text-primary-foreground">
                        <Link href="/auth/register">Ücretsiz Başla</Link>
                      </Button>
                    </div>
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
