'use client'

import { ReactNode, useRef } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion"
import { wrap } from "@motionone/utils"
import { useAppInfo } from "@/contexts/info"

interface MarqueeProps {
  children: ReactNode
  baseVelocity: number
}

function MarqueeText({ children, baseVelocity = 100 }: MarqueeProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
      </motion.div>
    </div>
  )
}

export default function InfiniteMarquee() {
  const { appInfo } = useAppInfo()

  const services = appInfo?.services.map(service => service.service_name) || [
    "Recording",
    "Rehearsals",
    "Mixing",
    "Mastering",
    "Podcast",
    "Live streams",
    "Duplications",
  ]

  // const servicesString = services.join(" • ")

  return (
    <div className="bg-transparent py-4 lg:py-6 overflow-hidden mb-6 border-y border-white/50 mt-auto w-full">
      <MarqueeText baseVelocity={-1}>
        <div className="flex">
          {[...services, ...services].map((service, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white/80 font-mono md:text-lg xl:text-xl mx-8">{service}</span>
              <span className="text-white/40 mx-8">•</span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  )
}

