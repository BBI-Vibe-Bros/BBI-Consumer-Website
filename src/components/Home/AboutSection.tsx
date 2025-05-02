import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  const features = [{
    id: 1,
    title: "Local Medicare Experts",
    description: "Our team has specialized knowledge of Medicare options in your area.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 2,
    title: "Personalized Plan Comparison",
    description: "We analyze your needs to find the perfect Medicare coverage.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 3,
    title: "Continuous Medicare Support",
    description: "We're here for you throughout the year, not just during enrollment.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 4,
    title: "No-Cost Medicare Guidance",
    description: "Our services are provided at no cost to you.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }];
  return <section className="py-16 bg-bb-light-gray">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img alt="Bobby Brock Insurance Advisors" className="w-full h-auto rounded-lg shadow-lg" src="/lovable-uploads/1ac2fffd-5fdf-42bd-bca7-22683515d254.png" />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-bb-blue">ABOUT US</h2>
              <h3 className="text-3xl font-bold text-bb-dark mt-2">
                Your Local Medicare Insurance Specialists
              </h3>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              At Bobby Brock Insurance, we've been helping individuals navigate the complex world of Medicare for over 15 years. Our experienced advisors understand the local healthcare landscape and provide personalized service to ensure you get the right coverage.
            </p>

            <div className="space-y-4 mb-8">
              {features.map(feature => <div key={feature.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 text-bb-blue">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-bb-dark">{feature.title}</h4>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>)}
            </div>

            <Link to="/about">
              <Button className="bg-bb-blue hover:bg-bb-light-blue text-lg font-semibold">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;