import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-bb-blue px-4 py-1 rounded-full mb-4">
              <span className="font-medium">Free Resource</span>
            </div>
            <h2 className="font-bold text-xl md:text-3xl text-bb-dark mt-2">
              Get Your Free Medicare Guide
            </h2>
            <p className="text-lg md:text-base text-gray-700 mb-8">
              Download our comprehensive guide to understanding Medicare coverage options. Learn about plans, costs, and how to make the right choice for your healthcare needs.
            </p>
            <Link to="/medicare-breakdown">
              <Button>
                Get Your Free Guide
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img 
              alt="Medicare Guide Book" 
              src="/lovable-uploads/bbi-medbreakdown-img.png" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
