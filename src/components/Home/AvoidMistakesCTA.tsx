import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AvoidMistakesCTA = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full mb-4">
              <span className="font-medium">Free Resource</span>
            </div>
            <h2 className="font-bold text-xl md:text-3xl text-bb-dark mt-2">
              Avoid Costly Medicare Mistakes
            </h2>
            <p className="text-lg md:text-base text-gray-700 mb-8">
              Don't let Medicare mistakes cost you thousands. Download our free guide to learn the most common pitfalls and how to avoid them, so you can make confident decisions about your coverage.
            </p>
            <Link to="/avoid-mistakes-with-medicare">
              <Button className="bg-red-600 hover:bg-red-700">
                Get Your Free Guide
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img 
              alt="Avoid Medicare Mistakes Guide" 
              src="/lovable-uploads/bbi-avoid-mistakes-img.png" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvoidMistakesCTA; 