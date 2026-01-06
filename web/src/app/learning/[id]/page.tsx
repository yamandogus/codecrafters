"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { learningService, LearningResource } from "@/services/learningService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock, BarChart, Users, Star, PlayCircle, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function LearningDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [resource, setResource] = useState<LearningResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        if (typeof params.id === "string") {
          const response = await learningService.getById(params.id);
          setResource(response.data || null);
        }
      } catch (error) {
        toast.error("Kaynak yüklenirken bir hata oluştu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Kaynak bulunamadı</h1>
        <Button onClick={() => router.push("/learning")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Öğrenim Alanına Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="text-base py-1">{resource.category}</Badge>
                {resource.level && <Badge variant="outline" className="text-base py-1">{resource.level}</Badge>}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {resource.title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {resource.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base pt-4">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-foreground">{resource.rating}</span>
                  <span className="text-muted-foreground">(42 Değerlendirme)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{resource.students} Öğrenci</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                   <Clock className="h-5 w-5" />
                   <span>{resource.duration || "Süresiz"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button size="lg" className="gap-2">
                  <PlayCircle className="h-5 w-5" /> Öğrenmeye Başla
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Bookmark className="h-5 w-5" /> Kaydet
                </Button>
                <Button size="lg" variant="ghost" className="gap-2">
                  <Share2 className="h-5 w-5" /> Paylaş
                </Button>
              </div>
            </div>

            {/* Sağ Taraftaki Görsel Kart */}
            <div className="md:col-span-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-xl border bg-card"
              >
                 {resource.image ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                 ) : (
                  <div className="aspect-video w-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/40" />
                  </div>
                 )}
                 <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Bu kaynakta neler var?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PlayCircle className="h-4 w-4 text-primary" /> Video dersler
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 text-primary" /> Okuma materyalleri
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BarChart className="h-4 w-4 text-primary" /> Pratik projeler
                      </li>
                    </ul>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Açıklama</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {resource.description}
                    {/* Daha uzun açıklama için placeholder */}
                    <br /><br />
                    Bu eğitim kaynağı, {resource.category} alanında uzmanlaşmak isteyenler için özenle hazırlanmıştır. 
                    İçerisinde temel kavramlardan ileri seviye tekniklere kadar kapsamlı bilgiler bulacaksınız.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Etiketler</h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
