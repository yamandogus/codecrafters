"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  ArrowLeft,
  Bookmark,
  Share2,
  ExternalLink,
  Globe,
  Upload,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetter: "",
    resume: null as File | null,
    linkedin: "",
    github: "",
    experience: "",
    skills: "",
    availability: "immediate",
    salary: "",
    noticePeriod: ""
  });

  // Mock job data - gerçek uygulamada API'den gelecek
  const job = {
    id: params.id,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop",
    location: "İstanbul",
    type: "Tam Zamanlı",
    salary: "25.000 - 35.000 TL",
    experience: "3-5 yıl",
    category: "frontend",
    description: "React, TypeScript ve modern frontend teknolojileri ile kullanıcı deneyimi odaklı uygulamalar geliştirecek deneyimli frontend geliştiricisi arıyoruz.",
    requirements: [
      "React, TypeScript ve modern JavaScript deneyimi",
      "Next.js, Tailwind CSS ve modern CSS framework'leri",
      "Git versiyon kontrol sistemi",
      "Responsive design ve cross-browser uyumluluğu",
      "API entegrasyonu ve state management",
      "Test yazma deneyimi (Jest, React Testing Library)",
      "Agile/Scrum metodolojileri deneyimi"
    ],
    responsibilities: [
      "Kullanıcı deneyimi odaklı web uygulamaları geliştirmek",
      "Mevcut uygulamaları optimize etmek ve yeni özellikler eklemek",
      "Frontend mimarisi ve kod kalitesi standartlarını belirlemek",
      "Backend ekibi ile işbirliği yaparak API entegrasyonları",
      "Code review süreçlerine katılmak",
      "Teknik dokümantasyon hazırlamak"
    ],
    benefits: [
      "Uzaktan çalışma imkanı",
      "Esnek çalışma saatleri",
      "Yıllık izin ve özel günler",
      "Sağlık sigortası",
      "Eğitim ve konferans desteği",
      "Performans primi",
      "Stok opsiyonları"
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git", "Jest", "Agile"],
    postedDate: "2024-02-15",
    isRemote: false,
    isFeatured: true,
    companyInfo: {
      name: "TechCorp",
      description: "Türkiye'nin önde gelen teknoloji şirketlerinden biri. 2015 yılından beri dijital dönüşüm projeleri geliştiriyoruz.",
      employees: "50-100",
      industry: "Teknoloji",
      founded: "2015",
      website: "https://techcorp.com"
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setApplicationStep(3);
    setIsApplying(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h1>
                          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                            {job.company}
                          </p>
                        </div>
                        {job.isFeatured && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            Öne Çıkan
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                          {job.isRemote && <span className="text-green-600">(Uzaktan)</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    İş Tanımı
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Sorumluluklar
                  </h3>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-400">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Gereksinimler
                  </h3>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-400">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Faydalar
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Şirket Bilgileri
                  </h2>
                  <div className="space-y-3 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{job.companyInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.companyInfo.employees} çalışan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {job.companyInfo.website}
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {job.companyInfo.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Application Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Hızlı Başvuru
                  </h3>
                  
                  {applicationStep === 1 && (
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Bu pozisyona başvurmak için aşağıdaki formu doldurun.
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        onClick={() => setApplicationStep(2)}
                      >
                        Başvuru Yap
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {applicationStep === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Ad *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Soyad *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">E-posta *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profili</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="github">GitHub Profili</Label>
                        <Input
                          id="github"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="portfolio">Portfolio/Website</Label>
                        <Input
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="experience">Deneyim (Yıl) *</Label>
                        <Input
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="skills">Teknik Beceriler *</Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          required
                          placeholder="React, TypeScript, Node.js, vb."
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="coverLetter">Ön Yazı</Label>
                        <Textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          placeholder="Neden bu pozisyona başvurduğunuzu ve neden sizi seçmeleri gerektiğini açıklayın..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="resume">CV/Özgeçmiş *</Label>
                        <div className="mt-1">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                          />
                          <label
                            htmlFor="resume"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">
                              {formData.resume ? formData.resume.name : "Dosya Seç"}
                            </span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="availability">Müsaitlik Durumu</Label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="immediate">Hemen başlayabilirim</option>
                          <option value="2weeks">2 hafta içinde</option>
                          <option value="1month">1 ay içinde</option>
                          <option value="3months">3 ay içinde</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="salary">Beklenen Maaş</Label>
                        <Input
                          id="salary"
                          name="salary"
                          value={formData.salary}
                          onChange={handleInputChange}
                          placeholder="25.000 TL"
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setApplicationStep(1)}
                          className="flex-1"
                        >
                          İptal
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          disabled={isApplying}
                        >
                          {isApplying ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                        </Button>
                      </div>
                    </form>
                  )}

                  {applicationStep === 3 && (
                    <div className="text-center py-4">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Başvurunuz Gönderildi!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Başvurunuz başarıyla alındı. En kısa sürede size dönüş yapacağız.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setApplicationStep(1)}
                        className="w-full"
                      >
                        Yeni Başvuru
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    İlan Bilgileri
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">İlan Tarihi:</span>
                      <span className="text-gray-900 dark:text-white">{formatDate(job.postedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Başvuru Sayısı:</span>
                      <span className="text-gray-900 dark:text-white">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Görüntülenme:</span>
                      <span className="text-gray-900 dark:text-white">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
