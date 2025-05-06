import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  const features = [{
    id: 1,
    title: "Trusted Medicare Experts in Tupelo",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 2,
    title: "Compare Medicare Plans from Top Carriers",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 3,
    title: "Local Support You Can Count On",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 4,
    title: "Free Medicare Help—No Hidden Costs",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }];
  return <section className="py-16 bg-bb-light-gray">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img alt="Bobby Brock Insurance Advisors" className="w-full h-auto rounded-lg shadow-lg" src="/lovable-uploads/bbi-meet-the-team.png" />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="font-bold text-bb-blue text-base">ABOUT US</h2>
              <h3 className="text-3xl font-bold text-bb-dark mt-2">Your Local Medicare Insurance Specialists</h3>
            </div>

            <p className="mb-8 text-base text-[#002a3a]">At Bobby Brock Insurance, we've been helping Tupelo residents navigate the complexities of Medicare for over two decades. We believe everyone deserves personalized guidance to find the right healthcare coverage.</p>

            <div className="space-y-4 mb-8">
              {features.map(feature => <div key={feature.id} className="flex gap-3 items-start py-0">
                  <div className="text-bb-blue">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-bb-dark">{feature.title}</h4>
                  </div>
                </div>)}
            </div>

            <Link to="/about">
              <Button className="bg-bb-blue hover:bg-bb-light-blue my-[5px] px-[30px] py-[20px] font-medium text-[inheri] text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;