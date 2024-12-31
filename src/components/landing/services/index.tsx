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
    id: 4,
    title: "Duplications",
    image: "/images/landing/landing-service-duplications.png",
    link: "/services/duplications"
  },
  {
    id: 5,
    title: "Podcast",
    image: "/images/landing/landing-service-podcasts.png",
    link: "/services/podcast"
  },
  {
    id: 6,
    title: "Mixing",
    image: "/images/landing/landing-service-mixing.png",
    link: "/services/mixing"
  }
]
// Define the positions for each card slot
const positions = [
  { top: "0", left: "50%", transform: "translateX(-50%)" }, // Top Center
  { top: "20%", left: "0", transform: "translateY(0%)" }, // Left
  { top: "20%", right: "0", transform: "translateY(0%)" }, // Right
  { bottom: "20%", left: "0", transform: "translateX(0)" }, // Bottom Left
  { bottom: "0", left: "50%", transform: "translateX(-50%)" }, // Bottom Center
  { bottom: "20%", right: "0", transform: "translateX(0)" }, // Bottom Right
]

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
    }, 10000000000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-black py-20">
      <div className="w-[95vw] max-w-[1400px] mx-auto px-4">
        {/* Title Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white mb-8 font-display" style={{ fontFamily: 'brush script, cursive' }}>
            OUR SERVICES
          </h2>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-black rounded-full px-8"
          >
            Learn more
          </Button>
        </motion.div> */}

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
              className="text-center mb-16 justify-self-center place-self-center"
            >
              <h2 className="text-6xl font-bold text-white mb-8 ">
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
              {
                currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    layout
                    layoutId={service.id.toString()}
                    initial={positions[index]}
                    animate={{
                      // ...positions[index],
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      mass: 1,
                    }}
                    className="absolute w-[380px]"
                  >
                    <ServiceCard service={service} index={index} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

