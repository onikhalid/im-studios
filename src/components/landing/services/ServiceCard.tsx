/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { services_images } from "@/components/ServicesSlideshow"
import { Service } from "@/contexts/info"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  service: Service;
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem]"
    >
      <Link href={`/services?s=${service.service_type.toLowerCase()}`} className="block">
        <div className="relative flex items-center justify-center aspect-[5/3] overflow-hidden">
          <Image
            src={service.icon || services_images[index] || "/images/landing/landing-service-mixing.png"}
            alt={service.service_name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-[2] p-4 px-6  rounded-full bg-[#171717] flex items-center justify-center">
            <h3 className="text-xl text-white font-light">{convertKebabAndSnakeToTitleCase(service.service_name)}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

