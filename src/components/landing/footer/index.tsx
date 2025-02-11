'use client'

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Send, Twitter, } from 'lucide-react'
import { useAppInfo } from "@/contexts/info"
import FooterSkeleton from "./FooterSkeleton"
import { Whatsapp } from 'iconsax-react'


export default function Footer() {

  const { appInfo, isFetchingAppInfo } = useAppInfo()
  if (isFetchingAppInfo) {
    return <FooterSkeleton />
  }
  return (

    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-12">
          {/* Logo */}
          <Link
            href="/" className="text-4xl md:text-5xl font-mono">
            IM STUDIOZ
          </Link>

          {/* Navigation and Social Links */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-between">
            {/* Left Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                href={appInfo?.footer?.x_link || '#'}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                href={appInfo?.footer?.telegram_link || "#"}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                href={appInfo?.footer?.whatsapp_url || "#"}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Telegram"
              >
                <Whatsapp className="w-5 h-5" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-white/80 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                contact us
              </Link>
            </nav>

            {/* Right Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                href={appInfo?.footer?.instagram_link || "#"}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                href={appInfo?.footer?.facebook_link || "#"}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                href={appInfo?.footer?.telegram_link || "#"}
                className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              {appInfo?.footer?.copyright_text}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

