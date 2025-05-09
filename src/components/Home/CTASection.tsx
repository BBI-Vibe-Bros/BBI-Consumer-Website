import React from 'react';
import { Button } from '@/components/ui/button';
import { useLeadCapture } from '@/contexts/LeadCaptureContext';

const CTASection = () => {
  const { openLeadCapture } = useLeadCapture();

  const handleLeadCaptureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLeadCapture('Homepage CTA');
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden bg-bb-blue">
          <div className="flex flex-col md:flex-row">
            <div className="p-4 md:p-6 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-4xl font-bold mb-2 md:mb-3 text-white">
                Get Your Free Medicare Guide
              </h2>
              <p className="text-lg md:text-lg mb-4 md:mb-5 leading-relaxed text-white/90">
                Download our comprehensive guide to understanding Medicare coverage options. Learn about plans, costs, and how to make the right choice for your healthcare needs.
              </p>
              <Button 
                onClick={handleLeadCaptureClick}
                className="w-fit bg-white text-bb-blue hover:bg-gray-100"
              >
                Get Your Free Guide
              </Button>
            </div>
            <div className="md:w-1/2 relative flex justify-end overflow-hidden">
              <img 
                alt="Medicare Guide Book" 
                src="/lovable-uploads/bbi-medbreakdown-img.png" 
                className="h-full w-full object-cover object-right scale-100 md:scale-110" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
