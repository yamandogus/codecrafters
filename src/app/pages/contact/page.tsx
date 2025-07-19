"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock, Users, Heart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      description: "Türkiye'nin Her Yerinde",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Mail,
      title: "E-posta İle",
      description: "destek@codecrafters.com",
      bgColor: "bg-blue-100 dark:bg-blue-900", 
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Phone,
      title: "Bizi Arayın",
      description: "+90 XXX XXX XX XX",
      bgColor: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      description: "24/7 Topluluk Desteği",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      iconColor: "text-orange-600 dark:text-orange-400"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 dark:from-purple-950/30 dark:via-violet-950/30 dark:to-pink-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sizden{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Haber Almaktan
              </span>{" "}
              Memnuniyet Duyarız
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Yazılım konusundaki sorularınız ve görüşleriniz bizim için değerli. 
              Topluluğa nasıl katkıda bulunabileceğinizi öğrenmek için bize ulaşın.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                İletişime Geç
              </Button>
              <Button variant="outline" className="border-purple-200 hover:border-purple-300">
                <Users className="w-4 h-4 mr-2" />
                Topluluğa Katıl
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <info.icon className={`w-8 h-8 ${info.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Partnership */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">İletişim Formu</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mesajınızı gönderin, size en kısa sürede dönüş yapalım.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Ad</Label>
                      <Input
                        id="firstName"
                        placeholder="Adınız"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input
                        id="lastName"
                        placeholder="Soyadınız"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      placeholder="Telefon Numaranız"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea
                      id="message"
                      placeholder="Mesajınızı buraya yazın..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                  >
                    Mesajı Gönder
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Partnership Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30">
                <div className="mb-4">
                  <Users className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ortaklık ve İş Birliği
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    codecrafters@community.com
                  </p>
                </div>
              </Card>

              {/* Additional Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Gönüllü Fırsatları
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Yazılım topluluğuna katkıda bulunun ve deneyim kazanın.
                      </p>
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Katıl <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-green-50 dark:bg-green-950/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Bağış Bilgileri
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Açık kaynak projelerimizi desteklemek için bağış yapın.
                      </p>
                      <Button variant="outline" size="sm" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                        Destek Ol <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Şimdi Topluluğa Katılın ve Yazılım 
              <br />
              Kariyerinizi Hızlandırın
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Bağışınız, yazılım öğrenen kişilere kaynak sağlamak ve açık kaynak projeler 
              geliştirmek için kullanılacaktır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Hemen Katıl ve Topluluğun Büyümesine Katkı Sağla
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
