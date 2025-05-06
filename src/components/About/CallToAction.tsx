import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-[#d5effc]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002a3a] mb-8">
            Ready to Get Started?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                className="bg-[#ffd700] hover:bg-[#ffd700]/90 text-[#002a3a] px-8 py-6 text-lg font-semibold rounded-lg w-full sm:w-auto"
                aria-label="Schedule a Medicare consultation"
              >
                Schedule an Appointment
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                variant="outline"
                className="border-2 border-[#002a3a] text-[#002a3a] hover:bg-[#002a3a] hover:text-white px-8 py-6 text-lg font-semibold rounded-lg w-full sm:w-auto"
                aria-label="Contact our Medicare team"
              >
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 