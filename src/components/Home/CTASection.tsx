
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CTASection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-bb-blue p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Get Your Free Medicare Guide</h2>
                <p className="text-xl mb-8 leading-relaxed text-white/90">
                  Download our comprehensive guide to understanding Medicare coverage options, enrollment periods, and how to make the most of your benefits.
                </p>
                <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-xl font-bold w-fit">
                  Get Your Free Guide
                </Button>
              </div>
              <div className="flex items-center justify-center bg-white p-8">
                <img 
                  src="public/lovable-uploads/9c5770bc-a599-4a73-8a2d-e4237a73d219.png"
                  alt="Medicare Breakdown Guide Book" 
                  className="max-w-xs md:max-w-sm rounded-lg shadow-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
