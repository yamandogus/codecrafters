"use client";


import DeveloperShowcase from "../ui/developer-showcase";


export default function CommunityShowcase() {

  return (
    <div className="min-h-screen">
      {/* Grid Layout: Developer Showcase + Comments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col">
            {/* Developer Showcase - Takes 2/3 of the space */}
            <div className="mb-8">
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Topluluk Üyeleri
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Farklı alanlardan deneyimli geliştiricilerle tanışın ve
                  onların projelerini keşfedin.
                </p>
              </div>
              <DeveloperShowcase />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
