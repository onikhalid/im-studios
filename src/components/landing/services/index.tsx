"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ServiceCard } from "./ServiceCard"
import { useAppInfo } from "@/contexts/info"
import { useWindowWidth } from "@/hooks/useWindowWidth"
import { LinkButton, ShadowText } from "@/components/ui"






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
    const verticalRadius = 360 // Kept vertical radius the same
    const x = Math.cos(angle) * horizontalRadius
    const y = Math.sin(angle) * verticalRadius
    return { x, y }
  }
  if (!appInfo) {
    return null
  }

  return (
    <section className="relative lg:min-h-screen lg:h-max bg-black py-20">
      <div className="w-[95vw] max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-16 lg:hidden">
          <ShadowText
            text="OUR SERVICES"
          />
          <LinkButton
            href="/services"
            variant="outline"
            className="rounded-full px-8 relative z-[1000] mt-4"
          >
            Learn more
          </LinkButton>
        </div>

        <div className="relative">
          {/* Mobile Layout */}
          <div className="grid grid-cols-1 gap-6 lg:hidden">
            {appInfo?.services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Desktop Circular Layout */}
          <div className="hidden lg:flex items-center md:justify-center relative h-[1400px] w-full mx-auto">
            <div className="text-center mb-16">
              <ShadowText
                text="OUR SERVICES"
              />
              <LinkButton
                href="/services"
                variant="outline"
                className="rounded-full px-8 relative z-[1000] mt-4"
              >
                Learn more
              </LinkButton>
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

