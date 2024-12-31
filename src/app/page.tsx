import { Testimonials, Footer, Hero, FAQ } from '@/components/landing';
import { ServicesSection } from '@/components/landing/services';
import React from 'react';

const LandingPage = () => {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* Hero Section */}
      {/* <section
        className="relative h-screen bg-cover bg-center snap-start"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 lg:bg-black/70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-6xl font-bold">Welcome</h1>
          <p className="mt-4 text-lg">Experience the magic of sound.</p>
        </div>
      </section> */}

      <Hero />

      <section className="h-screen snap-start flex flex-col">
        <ServicesSection />
      </section>

      <section className="h-screen bg-[#0E0E0E] text-white snap-start flex items-center justify-center">
        <h2 className="text-4xl">Section 1</h2>
      </section>

      <FAQ />


      <section className="h-screen snap-start flex flex-col">
        <Testimonials />
      </section>
      
      <section className=" snap-start flex flex-col">
        <Footer />
      </section>
    </main>
  );
};

export default LandingPage;
