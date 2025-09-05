"use client";

import { useState } from "react";
import { BlogGrid } from "@/components/blog/blog-card";
import { BlogFilter, BlogSearch } from "@/components/blog/blog-filter";
import { blogPosts, blogCategories, getFilteredPosts } from "@/components/blog/blog-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = getFilteredPosts(blogPosts, selectedCategory, searchTerm);

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
              {filteredPosts.length} yazı bulundu
              {searchTerm && ` "${searchTerm}" araması için`}
              {selectedCategory !== "all" && ` "${blogCategories.find(c => c.id === selectedCategory)?.label}" kategorisinde`}
            </p>
          </div>

          {/* Blog Yazıları */}
          {filteredPosts.length > 0 ? (
            <BlogGrid posts={filteredPosts} />
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