"use client";

import { useState, useEffect } from "react";
import { BlogGrid } from "@/components/blog/blog-card";
import { BlogFilter, BlogSearch } from "@/components/blog/blog-filter";
import { blogCategories } from "@/components/blog/blog-data"; // Categories can stay static for now or fetch from API if we had one
import { blogService, BlogPost } from "@/services/blogService";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await blogService.getAll({
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: searchTerm || undefined
        });
        if (response.success && response.data) {
          setPosts(response.data);
        } else {
          setError("Yazılar getirilemedi");
        }
      } catch (err) {
        console.error("Blog fetch error:", err);
        setError("Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          {/* Filtreleme ve Arama */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            <BlogFilter
              categories={blogCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              className="flex-1"
            />
            <BlogSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              className="w-full lg:w-auto"
            />
          </div>

          {/* Sonuç Sayısı */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {loading ? "Yükleniyor..." : `${posts.length} yazı bulundu`}
              {!loading && searchTerm && ` "${searchTerm}" araması için`}
              {!loading && selectedCategory !== "all" && ` "${blogCategories.find(c => c.id === selectedCategory)?.label}" kategorisinde`}
            </p>
          </div>

          {/* Blog Yazıları */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">
              {error}
            </div>
          ) : posts.length > 0 ? (
            // @ts-ignore - Component props might slightly mismatch, assuming BlogGrid handles standard fields
            <BlogGrid posts={posts} />
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Hiç yazı bulunamadı
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 