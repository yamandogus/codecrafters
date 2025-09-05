"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter, Github, Mail, MapPin, Phone, ArrowUp } from "lucide-react"
import { useTheme } from "next-themes";
import Link from "next/link"

function Footerdemo() {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = React.useState("")
  const [isSubscribed, setIsSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground transition-all duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="container relative max-w-7xl mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Newsletter Section */}
          <div className="relative lg:col-span-2">
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Bağlantıda Kalın
              </h2>
              <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                En son güncellemeler, özel teklifler ve topluluk haberleri için bültenimize katılın.
              </p>
              <form onSubmit={handleSubscribe} className="relative max-w-md">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  className="pr-12 h-12 text-base backdrop-blur-sm border-primary/20 focus:border-primary/50 transition-all duration-300"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isSubscribed}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Abone Ol</span>
                </Button>
                {isSubscribed && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 animate-in slide-in-from-top-2 duration-300">
                    Başarıyla abone oldunuz! 🎉
                  </p>
                )}
              </form>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
            <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Hızlı Bağlantılar</h3>
            <nav className="space-y-3">
              {[
                { href: "/", label: "Ana Sayfa" },
                { href: "/about", label: "Hakkımızda" },
                { href: "/tutorials", label: "Eğitimler" },
                { href: "/projects", label: "Projeler" },
                { href: "/community", label: "Topluluk" },
                { href: "/events", label: "Etkinlikler" },
                { href: "/jobs", label: "İş İlanları" },
                { href: "/contact", label: "İletişim" }
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="block text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-1 group"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">İletişim</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Adres</p>
                  <p className="text-sm">123 İnovasyon Caddesi</p>
                  <p className="text-sm">Teknoloji Şehri, TC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Telefon</p>
                  <p className="text-sm">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">E-posta</p>
                  <p className="text-sm">hello@codecrafters.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Theme */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Bizi Takip Edin</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-500 hover:text-white" },
                { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500 hover:text-white" },
                { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-500 hover:text-white" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
                { icon: Github, href: "#", label: "GitHub", color: "hover:bg-gray-800 hover:text-white" }
              ].map((social) => (
                <TooltipProvider key={social.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`rounded-full transition-all duration-300 hover:scale-110 ${social.color}`}
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <social.icon className="h-4 w-4" />
                          <span className="sr-only">{social.label}</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.label}&apos;da bizi takip edin</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Tema</span>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="dark-mode" className="sr-only">
                    Karanlık modu değiştir
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-8 text-center md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CodeCrafters. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>❤️</span>
              <span>ile Türkiye&apos;de geliştirildi</span>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-4 text-sm">
            {[
              { href: "#", label: "Gizlilik Politikası" },
              { href: "#", label: "Kullanım Şartları" },
              { href: "#", label: "Çerez Ayarları" },
              { href: "#", label: "KVKK" }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="transition-colors hover:text-primary hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary z-50 opacity-0 invisible hover:opacity-100 hover:visible"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="sr-only">Yukarı çık</span>
      </Button>
    </footer>
  )
}

export { Footerdemo } 