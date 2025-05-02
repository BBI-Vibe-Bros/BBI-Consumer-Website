import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-bb-dark mb-6 leading-tight md:text-5xl">
              Making Medicare Easy,<br />
              <span className="text-bb-blue">One Choice at a Time</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Professional guidance from trusted experts makes finding the right Medicare coverage simple, so you can enjoy your benefits with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark px-6 py-3 text-base font-medium">
                Schedule an Appointment
              </Button>
              <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10 px-6 py-3 text-base font-medium">Learn More</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img alt="Senior couple with Medicare advisor" className="w-full h-auto rounded-lg" src="/lovable-uploads/da120831-f52b-49e4-b5eb-052580d72b99.png" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;