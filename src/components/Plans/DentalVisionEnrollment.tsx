
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const DentalVisionEnrollment = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Help With Dental & Vision Coverage</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            As an independent Medicare brokerage, we guide you through the process of finding the right dental and vision coverage from multiple carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-bb-blue rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold mb-3">Understand Your Options</h3>
              <p className="text-gray-600">
                We educate you on standalone dental and vision plans and Medicare Advantage plans that include these benefits.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-bb-blue rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold mb-3">Check Network Providers</h3>
              <p className="text-gray-600">
                We help verify that your preferred dentists and optometrists are in-network across various carrier options.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-bb-blue rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold mb-3">Compare Coverage</h3>
              <p className="text-gray-600">
                We provide side-by-side comparisons of plans from multiple carriers based on your specific priorities.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-bb-blue rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold mb-3">Guide Your Enrollment</h3>
              <p className="text-gray-600">
                Our Medicare specialists assist with the enrollment process for your chosen carrier's plan at no cost to you.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg shadow-sm max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">When to Enroll in Dental & Vision Plans</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Standalone Dental & Vision Plans</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Most dental and vision insurance plans allow enrollment at any time during the year.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Coverage typically begins on the first of the month following enrollment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Some services may have waiting periods before coverage begins.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Medicare Advantage Plans with Dental & Vision</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Enroll during your Initial Enrollment Period when you first become eligible for Medicare.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Change plans during the Annual Enrollment Period (October 15 - December 7).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Medicare Advantage Open Enrollment Period (January 1 - March 31) if you're already in a Medicare Advantage plan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionEnrollment;
