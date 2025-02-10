import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ShadowTextProps {
    text: string
    className?: string
}

export default function ShadowText({ text, className = "" }: ShadowTextProps) {
    return (
        <div className="relative">
            {/* Shadow text */}
            <span
                className={cn("absolute top-[-15%] left-0 select-none text-white/10 scale-x-125 transform text-5xl md:text-7xl xl:text-8xl font-bold font-heaters")}
                aria-hidden="true"
            >
                {text}
            </span>
            {/* Main text */}
            <motion.h2
                className={cn("relative z-[2] text-5xl md:text-7xl xl:text-8xl font-medium text-white font-heaters", className)}
                initial={{ opacity: 0.2, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {text}
            </motion.h2>
        </div>
    )
}

