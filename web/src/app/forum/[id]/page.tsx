"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { forumService, ForumPost } from "@/services/forumService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Eye, ThumbsUp, Share2, MoreVertical, Flag, User, Lock, Pin } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function ForumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (typeof params.id === "string") {
          const response = await forumService.getById(params.id);
          setPost(response.data);
        }
      } catch (error) {
        toast.error("Konu yüklenirken bir hata oluştu.");
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
        <h1 className="text-2xl font-bold mb-4">Konu bulunamadı</h1>
        <Button onClick={() => router.push("/forum")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Foruma Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Foruma Dön
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sol Kolon - Ana Konu ve Yanıtlar */}
        <motion.div 
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ana Post Kartı */}
          <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge>{post.category}</Badge>
                    {post.isPinned && <Badge variant="secondary"><Pin className="h-3 w-3 mr-1" /> Sabit</Badge>}
                    {post.isLocked && <Badge variant="destructive"><Lock className="h-3 w-3 mr-1" /> Kilitli</Badge>}
                  </div>
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                
                <div className="flex items-center gap-2">
                   {/* Actions Menu */}
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" /> Raporla
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" /> Paylaş
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {post.user?.avatar ? (
                    <Image 
                      src={post.user.avatar} 
                      alt={post.user.username} 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{post.user?.username || "Anonim"}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="whitespace-pre-wrap">{post.content}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <ThumbsUp className="mr-2 h-4 w-4" /> {post.likes} Beğeni
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <MessageSquare className="mr-2 h-4 w-4" /> {post.replies} Yanıt
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" /> {post.views} Görüntülenme
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yanıtlar Bölümü (Placeholder) */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-sm text-muted-foreground">Yanıtlar</span>
            </div>
          </div>

          <Card className="bg-muted/30 border-dashed">
            <CardContent className="py-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium text-muted-foreground">Henüz yanıt yok</h3>
              <p className="text-sm text-muted-foreground mb-4">Bu konuya ilk yanıtı sen ver!</p>
              <Button disabled={post.isLocked}>
                Yanıt Yaz
              </Button>
            </CardContent>
          </Card>

        </motion.div>

        {/* Sağ Kolon - Bilgi/İstatistik */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-semibold">Konu Hakkında</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Kategori:</span>
                <span className="font-medium">{post.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Oluşturulma:</span>
                <span className="font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Son Aktivite:</span>
                <span className="font-medium">Şimdi</span>
              </div>
              <div className="pt-2">
                 <Button className="w-full" variant="outline" size="sm">
                   <Share2 className="mr-2 h-4 w-4" /> Paylaş
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
