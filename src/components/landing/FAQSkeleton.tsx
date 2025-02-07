"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSkeleton() {
  return (
    <section className="flex flex-col justify-center h-screen snap-start bg-black text-white py-24">
      <div className="w-[95%] md:w-[90%] max-w-[1600px] mx-auto xl:flex items-start gap-16 xl:gap-24 xl:justify-between">
        <motion.h2
          initial={{ opacity: 0.2, y: 20 }}
          whileInView={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-7xl font-bold mb-16 font-mono text-center"
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h2>

        <Accordion type="single" collapsible className="w-full max-w-[750px]">
          {[...Array(5)].map((_, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-sans md:font-semibold font-medium hover:text-white/90 no-underline lg:py-6">
                <div className="h-6 w-3/4 bg-neutral-800 rounded animate-pulse"></div>
              </AccordionTrigger>
              <AccordionContent className="text-[#99999A] font-sans md:max-w-[620px] text-balance text-sm md:text-base max-md:font-light leading-loose">
                <div className="h-20 bg-neutral-800 rounded animate-pulse"></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

