"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "./ServiceCard"

const services = [
  {
    id: 1,
    title: "Rehearsals",
    image: "/images/landing/landing-service-rehearsals.jpg",
    link: "/services/rehearsals"
  },
  {
    id: 2,
    title: "Recording",
    image: "/images/landing/landing-service-recording.jpg",
    link: "/services/recording"
  },
  {
    id: 3,
    title: "Mastering",
    image: "/images/landing/landing-service-mastering.png",
    link: "/services/mastering"
  },
  {
    id: 6,
    title: "Mixing",
    image: "/images/landing/landing-service-mixing.png",
    link: "/services/mixing"
  },
  {
    id: 5,
    title: "Podcast",
    image: "/images/landing/landing-service-podcasts.png",
    link: "/services/podcast"
  },
  {
    id: 4,
    title: "Duplications",
    image: "/images/landing/landing-service-duplications.png",
    link: "/services/duplications"
  },
]

const calculatePosition = (index: number, total: number) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = 350 // Adjust this value to change the size of the circle
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return { x, y }
}

export function ServicesSection() {
  const [currentServices, setCurrentServices] = useState(services)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServices((prev) => {
        const newServices = [...prev]
        const first = newServices.shift()
        newServices.push(first || prev[0])
        return newServices
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-black py-20">
      <div className="w-[95vw] max-w-[1400px] mx-auto px-4">
        {/* Services Layout */}
        <div className="relative">
          {/* Mobile Layout */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {currentServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Desktop Circular Layout */}
          <div className="hidden md:flex md:items-center md:justify-center relative h-[900px] max-w-[1300px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <h2 className="text-6xl font-bold text-white mb-8">
                OUR SERVICES
              </h2>
              <Button
                variant="outline"
                className="rounded-full px-8"
              >
                Learn more
              </Button>
            </motion.div>

            <AnimatePresence>
              {currentServices.map((service, index) => {
                const { x, y } = calculatePosition(index, currentServices.length)
                return (
                  <motion.div
                    key={service.id}
                    layout
                    layoutId={service.id.toString()}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      x,
                      y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      mass: 1,
                    }}
                    className="w-[380px] transform -translate-x-1/2 -translate-y-1/2"
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

