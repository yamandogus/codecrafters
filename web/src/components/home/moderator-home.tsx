"use client";

import React from 'react';
import { CardHoverEffect } from "./card";
import Header from "./header";
import CommunityShowcase from "./community-showcase";

// This will be similar to user home but with moderator-specific functionality
export default function ModeratorHome() {
  return (
    <div className="w-full">
      <Header />

      {/* Moderator ana içerik bölümü */}
      <div className="py-16">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Moderatör Paneli - Neler Sunuyoruz?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Topluluk moderasyonu ve yönetimi için araçlar
          </p>
          <CardHoverEffect />
          
          {/* Moderator specific content */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-4">İçerik Moderasyonu</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Forum gönderilerini ve yorumları moderasyon yapın
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Kullanıcı Yönetimi</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kullanıcı hesaplarını yönetin ve raporları inceleyin
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Etkinlik Yönetimi</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Topluluk etkinliklerini düzenleyin ve yönetin
              </p>
            </div>
          </div>
        </div>
        <CommunityShowcase />
      </div>
    </div>
  );
}