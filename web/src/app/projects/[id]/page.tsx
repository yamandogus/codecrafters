"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectService, Project } from "@/services/projectsService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Github, Globe, User,  Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (typeof params.id === "string") {
          const response = await projectService.getById(params.id);
          setProject(response.data || null);
        }
      } catch (error) {
        toast.error("Proje yüklenirken bir hata oluştu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
        <Button onClick={() => router.push("/projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Projelere Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Ana İçerik */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge>{project.category}</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold">{project.title}</h1>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Sağ Kolon - Bilgiler */}
        <motion.div 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Proje Bağlantıları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.demo && (
                <Button className="w-full" asChild>
                  <Link href={project.demo} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> Canlı Demo
                  </Link>
                </Button>
              )}
              {project.github && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={project.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> GitHub Kaynak Kodu
                  </Link>
                </Button>
              )}
              {!project.demo && !project.github && (
                <p className="text-sm text-muted-foreground text-center">Bağlantı bulunmuyor.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geliştirici</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {project.user?.avatar ? (
                    <Image 
                      src={project.user.avatar} 
                      alt={project.user.username} 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{project.user?.username || "Anonim"}</p>
                  <p className="text-xs text-muted-foreground">Proje Sahibi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teknolojiler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
