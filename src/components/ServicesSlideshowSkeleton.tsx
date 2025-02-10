"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesSlideShowSkeleton() {
  return (
    <section className="relative h-screen snap-start">
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="w-1/2 relative overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute inset-0"
          >
            <Skeleton className="w-full h-full" />
          </motion.div>
        </div>
        <div className="w-1/2 bg-black/90">
          <div className="absolute top-1/2 right-12 w-[calc(100%-6rem)] -translate-y-1/2">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "tween", duration: 0.5 }}
              className="text-white"
            >
              {/* Page counter skeleton */}
              <div className="text-6xl mb-2 text-right">
                <Skeleton className="h-16 w-32 ml-auto" />
              </div>

              {/* Categories skeleton */}
              <div className="text-sm tracking-wider mb-4 flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>

              {/* Title skeleton */}
              <div className="mb-6">
                <Skeleton className="h-14 w-3/4" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-3 mb-8">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-10 w-32" />
            </motion.div>
          </div>
        </div>
      </div>
      <div 
        className="h-full overflow-y-auto"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className="h-full"
            style={{ scrollSnapAlign: "start" }}
          />
        ))}
      </div>
    </section>
  )
}