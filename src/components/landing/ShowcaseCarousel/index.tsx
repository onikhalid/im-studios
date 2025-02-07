'use client'

import { LinkButton } from '@/components/ui'
import BackgroundPerLine from '@/components/ui/LineBgColor'
import { motion, AnimatePresence } from 'framer-motion'
import { MoveLeft, MoveRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'


interface Carousel {
    id: number
    image: string
    title: string
    description: string
}

const carousels: Carousel[] = [
    {
        id: 1,
        title: `Transforming Sound /n into Art, One Beat /n at a Time.`,
        description: `Every sound tells a story, and we're here to help you craft yours\n. From the raw energy of a live recording to the polished perfection of a studio mix, our passion lies in turning your musical vision into an unforgettable masterpiece. Let us transform every beat into a work of art that resonates with the world.`,
        image: '/images/caroImage1.png'
    },
    {
        id: 2,
        title: `Your Voice, Amplified /n Your Story, Heard.`,
        description: `Every great podcast starts with a clear, captivating voice. At our studio, we provide the perfect space and tools to bring your stories to life. From crisp audio recordings to seamless editing, we ensure your podcast resonates with your audience. Whether you're sharing insights, sparking conversations, or entertaining the world, we're here to help you sound your best.`,
        image: '/images/caroImage2.png'
    },
    {
        id: 3,
        title: `Where Sound Meets /n Soul , and Creativity /n Knows No Limits`,
        description: `Every sound tells a story, and we're here to help you craft yours. From the raw energy of a live recording to the polished perfection of a studio mix, our passion lies in turning your musical vision into an unforgettable masterpiece. Let us transform every beat into a work of art that resonates with the world.`,
        image: '/images/caroImage3.png'
    },
]
const ShowcaseCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === carousels.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carousels.length - 1 : prevIndex - 1
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#0E0E0E] text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className=""
                >
                    <article className='grid lg:grid-cols-2 px-5'>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="font-poppins font-semibold max-w-[600px] mb-6 !leading-[4rem] text-balance">
                                <BackgroundPerLine
                                    text={carousels[currentIndex].title}
                                />
                            </h1>
                            <p className="text-[#99999A] text-sm md:text-lg font-sans leading-loose lg:mb-8 text-balance max-md:px-1.5 max-w-[600px]">
                                {carousels[currentIndex].description}
                            </p>
                            <div className='hidden lg:flex gap-10'>
                                <LinkButton variant="cta" size="cta" href="/book" className='text-base'>
                                    Book a session
                                </LinkButton>
                                <div className="flex justify-between items-center gap-5 pointer-events-none z-10">
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
                            </div>
                        </div>
                        <div className='mt-5 lg:mt-10 w-full max-lg:aspect-video max-lg:overflow-hidden max-lg:max-h-[200px] max-w-[600px] flex max-lg:justify-center max-lg:items-center lg:justify-self-end lg:translate-y-[20%]'>
                            <Image
                                src={carousels[currentIndex].image}
                                alt="image"
                                width={700}
                                height={700}
                                className='max-lg:object-cover'
                            />
                        </div>
                        <div className='flex lg:hidden gap-10 mt-5 max-w-[600px] w-full'>
                            <LinkButton variant="cta" size="cta" href="/book" className='text-base'>
                                Book a session
                            </LinkButton>
                            <div className="flex justify-between items-center gap-5 pointer-events-none z-10">
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
                        </div>
                    </article>

                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default ShowcaseCarousel