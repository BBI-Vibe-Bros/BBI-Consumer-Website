import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="font-extrabold mb-4 text-bb-blue text-4xl md:text-5xl">
              Making Medicare Easy, One Choice at a Time 
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">Personalized Medicare advice from America's most trusted insurance agency. Our well-trained, experienced agents are ready to answer questions.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="https://go.bobbybrockinsurance.com/appointment/">
                <Button>Schedule an Appointment</Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img alt="Senior couple with Medicare advisor" className="w-full h-auto rounded-lg" src="/lovable-uploads/bbi-home-hero.png" />
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
