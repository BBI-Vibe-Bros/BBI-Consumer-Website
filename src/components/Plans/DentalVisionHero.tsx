
import React from 'react';
import { Button } from '@/components/ui/button';
import { Stethoscope, Eye } from 'lucide-react';

const DentalVisionHero = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-bb-blue px-4 py-2 rounded-full mb-4">
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-1" />
                <Eye className="h-5 w-5" />
              </div>
              <span className="font-medium">Dental & Vision Plans</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-bb-dark mb-6">
              Complete Your Medicare Coverage
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Original Medicare doesn't cover routine dental care, eye exams, or glasses. Our Medicare dental and vision plans help fill these important gaps in your healthcare coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bb-blue hover:bg-bb-light-blue text-white px-8">
                Compare Plans
              </Button>
              <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10">
                Check Coverage Options
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Coverage Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Regular dental checkups and cleanings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Basic and major dental procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Annual eye exams and vision tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Eyeglasses and contact lenses allowances</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Affordable monthly premiums and predictable costs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionHero;
