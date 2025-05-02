
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdvantageHero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-bb-dark mb-6 leading-tight">
              Medicare Advantage Plans <span className="text-bb-blue">with Expert Guidance</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Get comprehensive coverage with Medicare Advantage (Part C) plans that combine hospital, medical, and often prescription drug coverage in one convenient plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-xl font-bold px-8 py-6">
                Compare Plans
              </Button>
              <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10 text-xl font-bold px-8 py-6">
                Schedule Consultation
              </Button>
            </div>
            <div className="mt-6 bg-white p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Medicare Compliance Notice:</span> Not connected with or endorsed by the U.S. Government or the Federal Medicare Program. 
                Plan availability varies by county and state.
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="public/lovable-uploads/9de67b07-07ab-47e8-af0a-c57d775e1416.png" 
              alt="Senior couple reviewing Medicare Advantage plans" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageHero;
