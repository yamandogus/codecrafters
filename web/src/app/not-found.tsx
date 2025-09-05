import React from 'react'
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <div className="relative">
        <h1 className="relative z-10 text-9xl font-bold text-purple-600 dark:text-purple-500">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-50"></div>
      </div>
      <h2 className="mt-8 text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Sayfa Bulunamadı
      </h2>
      <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
        Aradığınız sayfayı bulamadık. URL'yi kontrol edebilir veya ana sayfaya dönebilirsiniz.
      </p>
      <Link href="/">
        <button className="group/btn relative mt-8 inline-block h-12 rounded-md bg-gradient-to-br from-purple-600 to-purple-800 px-8 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]">
          Ana Sayfaya Dön
          <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
          <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </button>
      </Link>
    </div>
  )
}

export default NotFound