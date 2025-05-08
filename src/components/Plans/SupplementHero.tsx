import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const SupplementHero = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-bb-blue px-4 py-2 rounded-full mb-4">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Medicare Supplement Plans</span>
            </div>
            <h1 className="font-heading font-bold text-bb-dark mb-6">
              Fill the Gaps in Your Medicare Coverage
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Medicare Supplement (Medigap) plans work alongside Original Medicare to help cover out-of-pocket costs like copayments, coinsurance, and deductibles. Compare options and find the right fit for your healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bb-blue hover:bg-bb-light-blue text-white px-8">
                Compare Plans
              </Button>
              <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-heading font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Coverage for Medicare Part A & B deductibles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Help with coinsurance and copayments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Standardized benefits that are the same across all insurance companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Freedom to choose any doctor that accepts Medicare</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">No network restrictions or referrals needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplementHero;
