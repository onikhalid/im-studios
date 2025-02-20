import { Testimonials, Footer, Hero, FAQ, ShowcaseCarousel } from '@/components/landing';
import { ServicesSection } from '@/components/landing/services';
import React from 'react';

const LandingPage = () => {
  return (
    <main className="h-screen  overflow-y-scroll max-md:w-screen max-md:overflow-x-hidden">
      <Hero />
      <ServicesSection />
      <ShowcaseCarousel />
      <FAQ />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default LandingPage;
