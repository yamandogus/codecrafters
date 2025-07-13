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
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"
import { useTheme } from "next-themes";
import Link from "next/link"

function Footerdemo() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Bağlantıda Kalın</h2>
            <p className="mb-6 text-muted-foreground">
              En son güncellemeler ve özel teklifler için bültenimize katılın.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="E-posta adresinizi girin"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Abone Ol</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hızlı Bağlantılar</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block transition-colors hover:text-primary">
                Ana Sayfa
              </Link>
              <Link href="/about" className="block transition-colors hover:text-primary">
                Hakkımızda
              </Link>
              <Link href="/tutorials" className="block transition-colors hover:text-primary">
                Eğitimler
              </Link>
              <Link href="/projects" className="block transition-colors hover:text-primary">
                Projeler
              </Link>
              <Link href="/contact" className="block transition-colors hover:text-primary">
                İletişim
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">İletişim</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>123 İnovasyon Caddesi</p>
              <p>Teknoloji Şehri, TC 12345</p>
              <p>Telefon: (123) 456-7890</p>
              <p>E-posta: hello@codecrafters.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Bizi Takip Edin</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook&apos;ta bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter&apos;da bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram&apos;da bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn&apos;de bizimle bağlantı kurun</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Karanlık modu değiştir
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 CodeCrafters. Tüm hakları saklıdır.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Gizlilik Politikası
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Kullanım Şartları
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Çerez Ayarları
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo } 