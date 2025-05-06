
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-xl overflow-hidden bg-bb-blue">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Get Your Free Medicare Guide</h2>
              <p className="text-base md:text-xl mb-6 md:mb-8 leading-relaxed text-white/90">
                Download our comprehensive guide to understanding Medicare coverage options. Learn about plans, costs, and how to make the right choice for your healthcare needs.
              </p>
              <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-base md:text-xl font-bold w-fit px-6 py-3 md:px-8 md:py-6">
                Get Your Free Guide
              </Button>
            </div>
            <div className="md:w-1/2 relative flex justify-end overflow-hidden">
              <img 
                alt="Medicare Guide Book" 
                src="/lovable-uploads/bbi-medbreakdown-img.png" 
                className="h-full w-full object-cover object-right scale-110 md:scale-125" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
