"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export const BlogGrid = ({
  posts,
  className,
}: {
  posts: BlogPost[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10",
        className
      )}
    >
      {posts.map((post, idx) => (
        <div
          key={post.id}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gray-100 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  );
};

export const BlogCard = ({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-white/[0.2] group-hover:border-gray-300 dark:group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white">
              {post.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white">
              {post.readTime}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 