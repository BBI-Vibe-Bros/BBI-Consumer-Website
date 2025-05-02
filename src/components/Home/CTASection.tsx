
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-bb-blue py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Get Your Free Medicare Guide</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Download our comprehensive guide to understanding Medicare coverage options, enrollment periods, and how to make the most of your benefits.
            </p>
            <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-xl font-bold">
              Get Your Free Guide
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img 
              src="public/lovable-uploads/e9a50103-153f-420a-b667-5f76c69fd66d.png"
              alt="Medicare Guide" 
              className="max-w-xs md:max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
