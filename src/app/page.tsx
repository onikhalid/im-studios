import { Testimonials, Footer, Hero, FAQ, ShowcaseCarousel } from '@/components/landing';
import { ServicesSection } from '@/components/landing/services';
import React from 'react';

const LandingPage = () => {
  return (
    <main className="h-screen snap-y snap-normal overflow-y-scroll">
  

      <Hero />

      <section className="h-screen flex flex-col">
        <ServicesSection />
      </section>

      {/* <section className="md:h-screen bg-[#0E0E0E] text-white flex items-center justify-center">
        <h2 className="text-4xl">Section 1</h2>
      </section> */}

      <ShowcaseCarousel/>

      <FAQ />


      <section className="md:h-screen flex flex-col">
        <Testimonials />
      </section>
      
      <section className=" flex flex-col">
        <Footer />
      </section>
    </main>
  );
};

export default LandingPage;
