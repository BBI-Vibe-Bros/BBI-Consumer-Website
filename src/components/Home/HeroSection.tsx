import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-bb-dark mb-6 leading-tight">
              Making Medicare Easy,<br />
              <span className="text-bb-blue">One Choice at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Professional guidance from trusted experts makes finding the right Medicare coverage simple, so you can enjoy your benefits with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark px-8 py-6 text-base font-semibold">
                Schedule an Appointment
              </Button>
              <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10 px-10 py-6 text-base font-semibold">Learn More</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src="public/lovable-uploads/6767ab2a-b324-4d9b-a5b9-768d527eaa07.png" alt="Senior couple illustration" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;