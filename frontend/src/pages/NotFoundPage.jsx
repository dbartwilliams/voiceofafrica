import React from 'react'
import MainLayout from '../layouts/MainLayout'

const NotFoundPage = () => {
  return (
    
  <MainLayout>
    <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-2xl font-semibold text-[#5eeccc]">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-200 sm:text-7xl">Page not found</h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="/contact" class="rounded-md bg-[#5eeccc] px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-[#1be415] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
          <a href="#" class="text-sm font-semibold text-gray-200">Contact voa <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
  </main>
</MainLayout>
  )
}


export default NotFoundPage;