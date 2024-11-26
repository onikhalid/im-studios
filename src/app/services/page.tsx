import { Footer, Testimonials } from '@/components/landing'
import React from 'react'

const ServicesPage = () => {
    return (
        <main className="h-screen snap-y snap-always overflow-y-scroll">
            <section
                className="relative h-screen bg-cover bg-center snap-start"
                style={{ backgroundImage: "url('/images/services-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/80" />

                <div className="relative flex flex-col h-full pt-20">
                    <div className="grow flex flex-col justify-center items-center  w-[90%] md:w-[95%] max-w-[1920px] mx-auto">

                        <h1 className="text-white font-poppins text-center [font-size:clamp(2.75rem,14vw,220px)] 2xl:[font-size:clamp(3rem,15vw,280px)] font-bold leading-[0.9] -mt-4 -ml-2.5 md:-ml-4">
                            Our Services
                        </h1>

                        <p className="text-[#99999A] font-poppins text-lg mt-8 text-balance max-w-3xl text-center">
                            From recording to mastering, we provide the tools, expertise, and space to bring your creative vision to life.
                        </p>
                     
                    </div>
                </div>
            </section>



            <section className="min-h-screen snap-start flex flex-col">
                <div className='grow bg-[#0E0E0E]'>

                <Testimonials />
                </div>
            {/* </section> */}
            {/* <section className=" snap-start flex flex-col"> */}
                <Footer />
            </section>
        </main>
    )
}

export default ServicesPage