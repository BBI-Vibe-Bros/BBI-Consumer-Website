import React from 'react';
import { Button } from '@/components/ui/button';
const CTASection = () => {
  return <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="rounded-xl overflow-hidden bg-bb-blue">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6 text-white">Get Your Free Medicare Guide</h2>
              <p className="text-xl mb-8 leading-relaxed text-white/90">
                Download our comprehensive guide to understanding Medicare coverage options. Learn about plans, costs, and how to make the right choice for your healthcare needs.
              </p>
              <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-xl font-bold w-fit px-8 py-6">
                Get Your Free Guide
              </Button>
            </div>
            <div className="md:w-1/2 relative flex justify-end overflow-hidden">
              <img alt="Medicare Guide Book" src="/lovable-uploads/09fb238e-88bd-46d6-a5d2-05fc5fdbbf42.png" className="ml-auto scale-150 h-auto object-cover block" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;