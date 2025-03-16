'use client'
import Link from "next/link"
import { LinkButton } from "../ui"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function AppHeader() {
    const pathName = usePathname()
    const navLinks = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "About us",
            href: "/about-us"
        },
        {
            name: "Services",
            href: "/services"
        },
        {
            name: "Contact us",
            href: "/contact"
        }
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 b backdrop-blur-sm">
            <div className="w-[90%] md:w-[95%] max-w-[1920px] mx-auto md:px-4 h-20 ">
                <div className="flex items-center justify-between h-full">
                    <Link href="/" className="flex items-center text-white font-mono text-xl">
                        <Image src="/im-logo.jpg" width={70} height={70} alt="logo" />
                        IM STUDIOZ
                    </Link>
                    <nav className="hidden md:flex items-center space-x-12">
                        {
                            navLinks.map((link, i) => (
                                <Link key={i} href={link.href}
                                    className={cn("text-white hover:text-white/70 transition-colors font-mono",
                                        // (pathName == link.href || pathName.startsWith(link.href)) ? "!text-white font-medium" : "text-white/50"
                                        pathName == link.href ? "!text-white font-medium" : "text-white/50"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))
                        }


                    </nav>
                    <LinkButton
                        href="/book"
                        size="cta"
                        variant="cta"
                    // className="border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition-colors font-mono"
                    >
                        Book now
                    </LinkButton>
                </div>
            </div>
        </header>
    )
}

