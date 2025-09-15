"use client";

import React from 'react';

export default function AdminHome() {
  return (
    <div className="w-full">
      <div className="py-16">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Yönetici arayüzüne hoş geldiniz
          </p>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Home Page</h2>
          </div>
        </div>
      </div>
    </div>
  );
}