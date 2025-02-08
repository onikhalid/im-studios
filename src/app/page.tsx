import { Testimonials, Footer, Hero, FAQ, ShowcaseCarousel } from '@/components/landing';
import { ServicesSection } from '@/components/landing/services';
import React from 'react';

const LandingPage = () => {
  return (
    <main className="h-screen  overflow-y-scroll">
  

      <Hero />

      <section className="lg:h-screen flex flex-col">
        <ServicesSection />
      </section>

    
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
