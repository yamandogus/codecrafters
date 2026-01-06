"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogService, BlogPost } from "@/services/blogService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Tag, Heart, Eye, Share2 } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (typeof params.id === "string") {
          const response = await blogService.getById(params.id);
          setPost(response.data || null);
        }
      } catch (error) {
        toast.error("Blog yazısı yüklenirken bir hata oluştu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h1>
        <Button onClick={() => router.push("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Blog&apos;a Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3 w-3" /> {post.readTime || "5 dk"}{" "}
                okuma
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-y">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {post.user?.avatar ? (
                      <Image
                        src={post.user.avatar}
                        alt={post.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {post.user?.name || post.author || "Anonim"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{post.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {post.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {/* HTML içeriği varsa dangerouslySetInnerHTML kullanılabilir, 
                şimdilik düz metin varsayıyoruz. Markdown ise markdown renderer gerekir. */}
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>

          <div className="pt-8 border-t">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" /> Etiketler
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
