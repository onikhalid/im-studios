"use client";

import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Icons for Mail and Phone
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa"; // Social media icons
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      link: "https://twitter.com/IMStudioz",
      icon: <FaTwitter className="w-5 h-5" />,
    },
    {
      platform: "Instagram",
      handle: "@IMStudioz",
      link: "https://instagram.com/IMStudioz",
      icon: <FaInstagram className="w-5 h-5" />,
    },
    {
      platform: "Facebook",
      handle: "@IMStudioz",
      link: "https://facebook.com/IMStudioz",
      icon: <FaFacebookF className="w-5 h-5" />,
    },
    {
      platform: "LinkedIn",
      handle: "@IMStudioz",
      link: "https://linkedin.com/in/IMStudioz",
      icon: <FaLinkedinIn className="w-5 h-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0E0E0E] text-white">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col lg:flex-row justify-center items-center mx-auto space-y-8 p-20 gap-20 image-background"
      >
        <div className="lg:self-baseline self-center">
          <h1 className="text-5xl font-bold mt-7 font-sans">Contact Us</h1>
          <div className="flex flex-row gap-7 mt-4">
            <div className="text-lg flex flex-row gap-3 items-center">
              <FaPhoneAlt className="bg-[#212121] rounded-full p-1.5 w-8 h-8" />
              <span>+123-456-7890</span>
            </div>
            <div className="text-lg flex flex-row gap-3 items-center">
              <FaEnvelope className="bg-[#212121] rounded-full p-1.5 w-8 h-8" />
              <span>contact@imstudioz.com</span>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-sm font-semibold">Socials</p>
            <div className="grid grid-cols-2 justify-center text-center gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-400"
                >
                  <span className="bg-[#212121] rounded-full p-1.5">
                    {social.icon}
                  </span>
                  {social.handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black text-white bg-opacity-10 rounded-lg shadow-lg p-6 space-y-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm font-medium text-gray-400">
            Feel free to Contact us by sending us a message today
          </p>

          <div>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Full name"
              aria-label="Full name"
              className="w-full bg-[#0E0E0E] bg-opacity-20 p-3 rounded-md focus:outline-none focus:ring-transparent"
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
              className="w-full bg-[#0E0E0E] bg-opacity-20 p-3 rounded-md focus:outline-none focus:ring-transparent"
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
              rows={4}
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
            className={`w-full p-3 rounded-md font-bold ${
              isSubmitting
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
      </motion.div>

      <section className="snap-start flex flex-col">
        <Footer />
      </section>
    </main>
  );
}
