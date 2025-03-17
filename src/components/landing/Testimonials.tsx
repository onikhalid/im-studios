'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoveLeft, MoveRight } from 'lucide-react'
import { LinkButton } from "../ui"
import { useAppInfo } from "@/contexts/info"



export default function Testimonials() {

    const { appInfo } = useAppInfo()

    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === (appInfo?.testimonials?.length || 1) - 1 ? 0 : prevIndex + 1
        )
    }

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? (appInfo?.testimonials?.length || 1) - 1 : prevIndex - 1
        )
    }

    return (
        <section className="flex flex-col justify-center bg-[#0E0E0E] text-white py-24 md:py-32 h-full">
            <div className="container mx-auto px-1.5 md:px-4">
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                    <motion.h2
                        className="text-5xl md:text-7xl xl:text-8xl font-bold mb-16"
                        initial={{ opacity: 0.2, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        TESTIMONIALS
                    </motion.h2>

                    {/* <ShadowText
                        text="TESTIMONIALS"
                    /> */}
                    <div className="relative w-full">
                        {/* Navigation */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                            <motion.button
                                onClick={prev}
                                className="p-2 md:p-3 rounded-full border border-white/50 hover:bg-white/20 transition-colors pointer-events-auto"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Previous testimonial"
                            >
                                <MoveLeft className="w-4 md:w-6 h-4 md:h-6" />
                            </motion.button>
                            <motion.button
                                onClick={next}
                                className="p-2 md:p-3 rounded-full border border-white/50 hover:bg-white/20 transition-colors pointer-events-auto"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Next testimonial"
                            >
                                <MoveRight className="w-4 md:w-6 h-4 md:h-6" />
                            </motion.button>
                        </div>

                        {/* Testimonial Content */}
                        <div className="text-center px-8 md:px-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="min-h-[200px] flex flex-col items-center justify-center"
                                >
                                    <h3 className="text-xl md:text-3xl lg:text-4xl font-sans mb-6">
                                        {appInfo?.testimonials[currentIndex].name}
                                    </h3>
                                    <p className="text-[#99999A] text-sm md:text-lg font-sans leading-loose mb-8 text-balance max-md:px-1.5">
                                        {appInfo?.testimonials[currentIndex].review  || ""}
                                    </p>
                                    <p className="text-[#99999A] text-sm md:text-base font-sans leading-loose mb-8 text-balance max-md:px-1.5">
                                        {appInfo?.testimonials[currentIndex].role}
                                    </p>

                                </motion.div>
                            </AnimatePresence>
                            <LinkButton variant="cta" size="cta" href="/book">
                                Book a session
                            </LinkButton>
                        </div>

                       
                    </div>
                </div>
            </div>
        </section>
    )
}

