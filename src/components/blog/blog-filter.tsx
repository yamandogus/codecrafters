"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export const BlogFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: {
  categories: FilterOption[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2 mb-8", className)}>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
            selectedCategory === category.id
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
          {category.count > 0 && (
            <span className="ml-2 text-xs opacity-75">
              ({category.count})
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export const BlogSearch = ({
  searchTerm,
  onSearchChange,
  className,
}: {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  className?: string;
}) => {
  return (
    <div className={cn("relative max-w-md", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Blog yazılarında ara..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}; 