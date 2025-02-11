"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Mail, PhoneCall, Twitter } from 'lucide-react'
import Link from "next/link";
import Image from "next/image";
import { Whatsapp } from 'iconsax-react'


import { useAppInfo } from "@/contexts/info";
import { Footer } from "@/components/landing";


export default function Contact() {
    const { appInfo } = useAppInfo()

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: Record<string, any>) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            alert("Message sent!");
        } catch (error) {
            console.error("Form submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socials = [
        {
            platform: "Twitter",
            handle: "@IMStudioz",
            link: appInfo?.footer.x_link || '#',
            icon: <Twitter className="w-7 h-7" />,
        },
        {
            platform: "Whatsapp",
            handle: "@IMStudioz",
            link: appInfo?.footer.whatsapp_url || '#',
            icon: <Whatsapp className="w-7 h-7" />,
        },
        {
            platform: "Instagram",
            handle: appInfo?.footer.instagram_link || "@IMStudioz",
            link: "https://instagram.com/IMStudioz",
            icon: <Instagram className="w-7 h-7" />,
        },
        {
            platform: "Facebook",
            handle: appInfo?.footer.facebook_link || "@IMStudioz",
            link: "https://facebook.com/IMStudioz",
            icon: <Facebook className="w-7 h-7" />,
        },
        {
            platform: "LinkedIn",
            handle: appInfo?.footer.x_link || "@IMStudioz",
            link: "https://linkedin.com/in/IMStudioz",
            icon: <Linkedin className="w-7 h-7" />,
        },
    ];

    return (
        <main className=" bg-[#0E0E0E] text-white">
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex flex-col lg:grid grid-cols-2 justify-center items-center mx-auto min-h-screen space-y-8 p-4 md:p-10  xl:p-20 !pt-20 md:pt-20 gap-20 image-background"
            >
                <div className="self-center w-full">
                    <h1 className="text-5xl font-bold mt-7 font-bebas xl:text-[9rem] tracking-tight">CONTACT US</h1>
                    <div className="flex max-md:flex-col gap-7 mt-4">
                        <Link href={`tel:${appInfo?.footer.contact_phone_number || ""}`} className="text-lg flex flex-row gap-3 items-center">
                            <PhoneCall className="bg-[#212121] rounded-full p-1.5 w-8 h-8" />
                            <span>{appInfo?.footer.contact_phone_number || "+123-456-7890"}</span>
                        </Link>
                        <div className="text-lg flex flex-row gap-3 items-center">
                            <Mail className="bg-[#212121] rounded-full p-1.5 w-8 h-8" />
                            <span>contact@imstudioz.com</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <p className="text-sm font-semibold">Socials</p>
                        <div className="flex items-center text-center gap-4 flex-wrap">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-gray-400"
                                >
                                    <span className="bg-[#212121] rounded-full p-2.5">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative  text-white bg-[#0000004D] rounded-lg shadow-lg p-6 xl:p-10 space-y-4 z-10 max-w-[520px] mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <p className="text-base font-medium text-[#818181]">
                        Feel free to Contact us by sending us a message today
                    </p>

                    <div>
                        <input
                            {...register("fullName", {
                                required: "Full name is required",
                            })}
                            placeholder="Full name"
                            aria-label="Full name"
                            className="w-full bg-[#0E0E0E] p-3 py-4 text-[0.925rem] rounded-md focus:outline-none focus:ring-transparent"
                        />
                        {errors.fullName && (
                            <span className="text-sm text-red-400">
                                {errors.fullName.message as string}
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            placeholder="Email"
                            aria-label="Email"
                            className="w-full bg-[#0E0E0E] p-3 py-4 text-[0.925rem] rounded-md focus:outline-none focus:ring-transparent"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-400">
                                {errors.email.message as string}
                            </span>
                        )}
                    </div>

                    <div>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            placeholder="Message"
                            rows={5}
                            aria-label="Message"
                            className="w-full bg-[#0E0E0E] bg-opacity-20 p-3 rounded-md focus:outline-none focus:ring-transparent"
                        />
                        {errors.message && (
                            <span className="text-sm text-red-400">
                                {errors.message.message as string}
                            </span>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        className={`w-full p-3 rounded-md font-bold ${isSubmitting
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white text-gray-900 hover:bg-gray-200"
                            }`}
                        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send message"}
                    </motion.button>
                </motion.form>
                <Image
                    className="absolute bottom-0 right-0 rounded-[50px] blur-2xl opacity-30"
                    src="/images/contact_bg_gradient.png"
                    alt="bg-gradient"
                    width={650}
                    height={650}
                />
            </motion.div>

            <section className="snap-start flex flex-col">
                <Footer />
            </section>
        </main>
    );
}