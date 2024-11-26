'use client'

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book a session at your studio?",
    answer: "Booking is easy! You can book online through our website or contact us directly via phone or email. Sessions are confirmed once a deposit is made."
  },
  {
    question: "What equipment is available at the studio?",
    answer: "We have a comprehensive range of professional recording equipment including industry-standard microphones, pre-amps, interfaces, and monitoring systems. Contact us for a detailed equipment list."
  },
  {
    question: "Do you provide engineers or do I need to bring my own?",
    answer: "We provide experienced engineers for all sessions. However, you're welcome to bring your own engineer if you prefer."
  },
  {
    question: "Can I tour the studio before booking?",
    answer: "Yes, we offer studio tours by appointment. Contact us to schedule a convenient time."
  },
  {
    question: "Do you offer discounts for long-term projects?",
    answer: "Yes, we offer special rates for long-term bookings and full album projects. Contact us to discuss your project needs."
  },
  {
    question: "Can I bring my own instruments or equipment?",
    answer: "While we have a full range of equipment available, you're welcome to bring any specific instruments or gear you prefer."
  },
  {
    question: "Do you offer help with songwriting or arranging music?",
    answer: "Yes, our experienced team can assist with songwriting, arranging, and production services. These can be added to your booking."
  }
]

export default function FAQ() {
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
            {faqs.map((faq, index) => 
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-sans md:font-semibold font-medium hover:text-white/90 no-underline lg:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#99999A] font-sans md:max-w-[620px] text-balance text-sm md:text-base max-md:font-light leading-loose">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
    </section>
  )
}