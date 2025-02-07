"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "./ServiceCard"
import { useAppInfo } from "@/contexts/info"
import { useWindowWidth } from "@/hooks/useWindowWidth"
import { ShadowText } from "@/components/ui"






export function ServicesSection() {
  const { appInfo } = useAppInfo()
  const windowWidth = useWindowWidth()
  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const horizontalRadius = windowWidth <= 1280 ?
      320 :
      windowWidth <= 1560 ? 420
        :
        600
    const verticalRadius = 320 // Kept vertical radius the same
    const x = Math.cos(angle) * horizontalRadius
    const y = Math.sin(angle) * verticalRadius
    return { x, y }
  }
  if (!appInfo) {
    return null
  }

  return (
    <section className="relative bg-black py-20">
      <div className="w-[95vw] max-w-[1440px] mx-auto px-4">
        {/* Services Layout */}
        <div className="relative">
          {/* Mobile Layout */}
          <div className="grid grid-cols-1 gap-6 lg:hidden">
            {appInfo?.services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Desktop Circular Layout */}
          <div className="hidden lg:flex items-center md:justify-center relative h-[900px] w-full mx-auto">
            <div className="text-center mb-16">
              <ShadowText
                text="OUR SERVICES"
              />
              <Button
                variant="outline"
                className="rounded-full px-8"
              >
                Learn more
              </Button>
            </div>

            <AnimatePresence>
              {
                appInfo?.services.map((service, index) => {
                  const { x, y } = calculatePosition(index, appInfo?.services.length)
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      layoutId={service.id.toString()}
                      style={{
                        position: 'absolute',
                        x,
                        y,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                        mass: 1,
                      }}
                      className="w-[380px] transform"
                    >
                      <ServiceCard service={service} index={index} />
                    </motion.div>
                  )
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

