import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  const features = [{
    id: 1,
    title: "National Medicare Experts",
    description: "Our team helps over 50,000 Medicare beneficiaries nationwide find optimal coverage.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 2,
    title: "Independent Plan Comparison",
    description: "We compare plans from multiple carriers to find the perfect Medicare coverage for you.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 3,
    title: "Client Advocacy & Support",
    description: "We represent you, not the insurance companies, throughout your Medicare journey.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  }, {
    id: 4,
    title: "No-Cost Brokerage Services",
    description: "Our personalized guidance and enrollment assistance come at no cost to you.",
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
                Your National Medicare Insurance Brokerage
              </h3>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Founded in 1992, Bobby Brock Insurance has grown into a nationally recognized Medicare brokerage serving over 50,000 beneficiaries across the United States. As independent brokers, we represent you—not the insurance companies—helping you compare plans from multiple carriers to find the best coverage for your needs.
            </p>

            <div className="space-y-4 mb-8">
              {features.map(feature => {})}
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