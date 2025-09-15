"use client";

import React from 'react';
import { CardHoverEffect } from "./card";
import Header from "./header";
import CommunityShowcase from "./community-showcase";

// This is the current user home page content
export default function UserHome() {
  return (
    <div className="w-full">
      <Header />

      {/* Ana içerik bölümü */}
      <div className="py-16">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Neler Sunuyoruz?
          </h2>
          <CardHoverEffect />
        </div>
        <CommunityShowcase />
      </div>
    </div>
  );
}