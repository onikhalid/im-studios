"use client";

import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Mixing Engineer",
      image: "/images/john-doe.png",
    },
    {
      name: "Jennifer Dickson",
      role: "DJ & Sound Engineer",
      image: "/images/jennifer-dickson.png",
    },
    {
      name: "Jason Lee",
      role: "Sound Engineer",
      image: "/images/jason-lee.png",
    },
    {
      name: "Jordan Smith",
      role: "DJ & Sound Engineer",
      image: "/images/jordan-smith.png",
    },
  ];

  return (
    <div className="text-white">
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row justify-center py-56 gap-32 bg-[#0E0E0E]">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:text-[318.11px] text-[10rem] text-right uppercase text-[#ffffff21] tracking-[-12px] gap-0 leading-[185.92px] font-neue"
        >
          About <br /> <span className="text-[#DBDBDB] mr-10">Us</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg font-inter"
        >
          <p className="max-w-[340px]">
            Imperiah Music Studios (IM Studios) – Your Premier Destination for
            Rehearsal, Recording, and Live Streaming, in London.
          </p>
          <div className="text-base mt-3">
            <h3 className="font-bold text-white font-sans text-3xl">
              Our mission
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
              vel modi recusandae debitis iste temporibus distinctio praesentium
              porro laudantium esse omnis, placeat assumenda ducimus quibusdam
              sed itaque, consequuntur hic quasi.
            </p>
          </div>
          <div>
            <ArrowDown className="mt-5 h  w-12" />
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen px-8 md:px-16 py-20 bg-black text-white">
        <div className="flex flex-row">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:text-[318.11px] text-[10rem] uppercase text-[#ffffff21] tracking-[-10px] gap-0 leading-[185.92px] font-neue"
          >
            <div>The</div>

            <div className="text-[#DBDBDB] ml-60   ">Team</div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="-ml-[33%] text-xs max-w-[359.16px] mt-16"
          >
            At IM STUDIOZ, our team combines creativity and technical expertise to deliver exceptional sound and overall level of professionalism for your music process..
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-row gap-14 -mt-48 justify-center w-full h-[565px]"
        >
          <Image src='/images/john-doe.png' alt="john-doe" width={197.98} height={280.45} className="self-center -mt-[120px]"/>
          <Image src='/images/jennifer-dickson.png' alt="john-doe" width={197.98} height={280.45} className="self-center"/>
          <Image src='/images/jason-lee.png' alt="john-doe" width={197.98} height={280.45} className="self-start"/>
          <Image src='/images/jordan-smith.png' alt="john-doe" width={197.98} height={280.45} className="self-end -ml-28"/>

        </motion.div>
      </section>
      
      <section className="bg-[#0E0E0E] h-[337px]"></section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
