"use client"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"

export default function FooterSkeleton() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-12">
          {/* Logo Skeleton */}
          <div className="h-10 w-48 bg-neutral-800 rounded"></div>

          {/* Navigation and Social Links Skeleton */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-between">
            {/* Left Social Icons Skeleton */}
            <div className="flex items-center gap-4">
              {[Twitter, Send].map((Icon, index) => (
                <div key={index} className="p-3 rounded-full bg-neutral-800">
                  <Icon className="w-5 h-5 text-neutral-700" />
                </div>
              ))}
            </div>

            {/* Navigation Skeleton */}
            <nav className="flex items-center gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-4 w-20 bg-neutral-800 rounded"></div>
              ))}
            </nav>

            {/* Right Social Icons Skeleton */}
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <div key={index} className="p-3 rounded-full bg-neutral-800">
                  <Icon className="w-5 h-5 text-neutral-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section Skeleton */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <div className="h-4 w-48 bg-neutral-800 rounded"></div>
            <div className="flex items-center gap-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="h-4 w-24 bg-neutral-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

