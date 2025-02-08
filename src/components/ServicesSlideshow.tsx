"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { type Service, useAppInfo } from "@/contexts/info"
import ServicesSlideShowSkeleton from "./ServicesSlideshowSkeleton"
import { LinkButton } from "./ui"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"

const filler_service = [
    {
        id: "0",
        created_at: "2024-02-08",
        categories: [],
        updated_at: "2024-02-08",
        service_name: "Mixing",
        service_type: "audio",
        service_description:
            "Our mixing service involves balancing individual tracks—vocals, instruments, and more—to create a polished, cohesive sound. We apply EQ, compression, reverb, and panning adjustments to ensure your track is professionally crafted.",
        icon: "/images/services4.png",
        equipment: null,
    },
]

export default function ServicesSlideshow() {
    const { appInfo, isFetchingAppInfo } = useAppInfo()
    const [isVisible, setIsVisible] = useState(false)

    const services = appInfo?.services || [
        {
            id: "1",
            created_at: "2024-02-08",
            categories: [],
            updated_at: "2024-02-08",
            service_name: "Mixing",
            service_type: "audio",
            service_description:
                "Our mixing service involves balancing individual tracks—vocals, instruments, and more—to create a polished, cohesive sound. We apply EQ, compression, reverb, and panning adjustments to ensure your track is professionally crafted.",
            icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8YM6Ip7C5OyZkzU2QcUtso016vbaCx.png",
            equipment: null,
        },
    ]

    const allServices = [...filler_service, ...services]

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0)
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Check initial visibility

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (isFetchingAppInfo) {
        return <ServicesSlideShowSkeleton />
    }

    return (
        <>
            <div>
                {
                    services.map((service) => (
                        <div className="lg:hidden">
                            <div className="group relative overflow-hidden rounded-[2rem]">
                                <div className="block">
                                    <div className="relative flex items-center justify-center aspect-[5/3] overflow-hidden">
                                        <Image
                                            src={service.icon || "/images/landing/landing-service-mixing.png"}
                                            alt={service.service_name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60" />
                                        <div className="z-[2] p-4 px-6  rounded-full bg-[#171717] flex items-center justify-center">
                                            <h3 className="text-xl text-white font-light">{service.service_name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div ref={containerRef} className="relative max-lg:hidden">
                <div className="sticky top-0 h-screen flex overflow-hidden">
                    <div className="w-1/2 relative">
                        {allServices.map((service, index) => (
                            <ServiceImage
                                key={service.id}
                                service={service}
                                index={index}
                                totalServices={allServices.length}
                                scrollYProgress={scrollYProgress}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>
                    <div className="relative w-1/2 bg-black/90">
                        {allServices.map((service, index) => (
                            <ServiceContent
                                key={service.id}
                                service={service}
                                index={index}
                                totalServices={allServices.length}
                                scrollYProgress={scrollYProgress}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>
                </div>
                {allServices.map((service) => (
                    <div key={service.id} className="h-screen z-[-2]" />
                ))}
            </div>
        </>
    )
}

function ServiceImage({
    service,
    index,
    totalServices,
    scrollYProgress,
    isVisible,
}: {
    service: Service
    index: number
    totalServices: number
    scrollYProgress: any
    isVisible: boolean
}) {
    const imageX = useTransform(scrollYProgress, [index / totalServices, (index + 1) / totalServices], ["0%", "-100%"])
    const opacity = useTransform(
        scrollYProgress,
        [(index - 0.5) / totalServices, index / totalServices, (index + 0.5) / totalServices],
        [0, 1, 0],
    )

    return (
        <motion.div
            style={{ x: imageX, opacity }}
            className="absolute inset-0 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <Image
                src={service.icon || "/images/services3.png"}
                alt={service.service_name}
                fill
                className="object-cover"
                priority
            />
        </motion.div>
    )
}

function ServiceContent({
    service,
    index,
    totalServices,
    scrollYProgress,
    isVisible,
}: {
    service: Service
    index: number
    totalServices: number
    scrollYProgress: any
    isVisible: boolean
}) {
    const contentY = useTransform(scrollYProgress, [index / totalServices, (index + 1) / totalServices], ["0%", "-100%"])

    const opacity = useTransform(
        scrollYProgress,
        [(index - 0.3) / totalServices,
        index / totalServices,
        index / totalServices,
        index / totalServices,
        (index + 0.3) / totalServices],
        [0, 1, 1, 1, 0],
    )
    const zIndex = useTransform(
        scrollYProgress,
        [(index - 0.3) / totalServices, index / totalServices, (index + 0.3) / totalServices],
        [1, 5, 1],
    )



    return (
        <motion.div
            style={{ y: contentY, opacity, zIndex }}
            className="absolute inset-0 flex items-center justify-end pr-12"
            initial={{ opacity: 0 }}
            animate={{ pointerEvents: isVisible ? "auto" : "none" }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-start justify-center text-white text-left w-[calc(100%-6rem)] max-w-[580px] mx-auto h-full">
                <div className="absolute flex items-end top-[100px] right-[1.5rem] text-xl mb-2 text-right text-white/60 font-dm-sans">
                    <span className="text-6xl font-bold text-white/20">
                        {String(index).padStart(2, "0")}
                    </span>
                    /{String(totalServices - 1).padStart(2, "0")}
                </div>

                {/* <div className="text-sm tracking-wider mb-4">{service.categories.map((cat) => cat.toString()).join(" | ")}</div> */}

                <h2 className="text-5xl xl:text-6xl font-semibold mb-6">{service.service_name}</h2>

                <section>
                    {service.service_description && <p className="text-lg mb-8 text-gray-300">{service.service_description}</p>}

                    <div className="">
                        {
                            service.categories?.map((category, index) => (
                                <div key={index} className="text-sm text-white mb-5 ">
                                    <h5 className="">
                                        {convertKebabAndSnakeToTitleCase(category.category_name)}
                                    </h5>
                                    <p className="text-sm text-[#99999A]">
                                        {category.category_description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </section>

                <LinkButton className="" variant="cta" size="cta" href="/book">
                    Book a session
                </LinkButton>
            </div>
        </motion.div>
    )
}

