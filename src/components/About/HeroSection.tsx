import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="bg-[#002a3a] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-white">
            <span className="text-[#d5effc] uppercase text-sm font-bold tracking-wider mb-4 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-lg text-gray-200 mb-8 max-w-2xl">
            Founded by Bobby Brock, our agency began with a simple vision: to provide honest, straightforward Medicare guidance to the Tupelo community.<br/><br/>
What started as a small family business has grown into a trusted Medicare resource for seniors across Mississippi. Throughout our growth, we've maintained our commitment to personalized service and putting our clients' needs first.
<br/><br/>Today, our team of Medicare specialists continues this tradition, combining extensive knowledge with genuine care to ensure every client finds the perfect coverage solution.
 
            </p>
            <Link to="/about-us/team">
              <Button 
                className="bg-[#00a3e0] hover:bg-[#00a3e0]/90 text-white px-8 py-6 text-lg font-semibold rounded-lg"
                aria-label="Learn more about our team"
              >
                Get to Know Our Team
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="/lovable-uploads/bbi-meet-the-team.png"
              alt="Bobby Brock Insurance team members working together to help clients"
              className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 