/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  service: any
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
      <Link href={service.link} className="block">
        <div className="relative flex items-center justify-center aspect-[5/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-[2] p-4 px-6  rounded-full bg-[#171717] flex items-center justify-center">
            <h3 className="text-xl text-white font-light">{service.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

