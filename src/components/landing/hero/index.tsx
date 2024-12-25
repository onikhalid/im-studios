import InfiniteMarquee from "./InfiniteMarquee"
import { LinkButton } from "../../ui"
import { Clock } from "lucide-react"

export default function Hero() {
    return (
        <section
            className="relative h-screen bg-cover bg-center snap-start"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative flex flex-col h-full pt-20">
                <div className="grow flex flex-col justify-center items-start w-[90%] md:w-[95%] max-w-[1920px] mx-auto">
                    <h2 className="text-white/70 font-mono text-lg md:text-xl mb-4">
                        WHERE CREATIVITY AND CRAFT MEETS
                    </h2>
                    <h1 className="text-white font-poppins [font-size:clamp(3.75rem,22vw,350px)] 2xl:[font-size:clamp(4rem,25vw,380px)] font-bold h-[0.9lh] leading-[0.9] -mt-4 -ml-2.5 md:-ml-4">
                        RHYTHM
                    </h1>

                    <p className="text-white/70 font-poppins md:text-lg mt-4 max-w-2xl">
                        For those who dare to dream in sound, blend innovation with passion, and turn every beat into a masterpiece.
                    </p>
                    <div className="flex max-md:flex-col md:items-center gap-8 mt-8">
                        <LinkButton
                            variant="cta"
                            size="cta"
                            href="/book"
                        // className=""
                        >
                            Book now
                        </LinkButton>
                        <div className="flex items-center gap-2 text-white/70">
                            <Clock className="w-5 h-5" />
                            <span className="font-mono">Mon-Sat 8:00AM - 9:00PM</span>
                        </div>
                    </div>
                </div>
                <InfiniteMarquee />
            </div>
        </section>
    )
}
