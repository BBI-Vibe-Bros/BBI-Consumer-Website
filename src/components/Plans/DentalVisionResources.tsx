
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DentalVisionResources = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Dental & Vision Resources</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn more about Medicare dental and vision coverage with these helpful resources.
          </p>
        </div>

        <Tabs defaultValue="faqs" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="tools">Coverage Tools</TabsTrigger>
          </TabsList>
          <TabsContent value="faqs" className="mt-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">Does Original Medicare cover dental and vision services?</h3>
                <p className="text-gray-700">
                  Original Medicare (Parts A and B) generally doesn't cover routine dental or vision services. It doesn't cover dental cleanings, fillings, dentures, eye exams, glasses, or contact lenses. That's why many Medicare beneficiaries choose additional dental and vision coverage.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What are my options for getting Medicare dental and vision coverage?</h3>
                <p className="text-gray-700">
                  You have several options: 1) Enroll in a Medicare Advantage plan that includes dental and vision benefits, 2) Purchase a standalone dental and/or vision insurance plan, 3) Consider a dental or vision discount plan, or 4) Join a Medicare Supplement plan and purchase separate dental/vision coverage.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What's the difference between dental insurance and a dental discount plan?</h3>
                <p className="text-gray-700">
                  Dental insurance typically has monthly premiums, deductibles, and copays but provides more comprehensive coverage. Dental discount plans have lower monthly fees but offer reduced rates (not coverage) at participating providers. Insurance is generally better for regular dental needs, while discount plans may work for basic care.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What vision services are typically covered in Medicare vision plans?</h3>
                <p className="text-gray-700">
                  Medicare vision plans typically cover routine eye exams, prescription glasses or contact lenses (with an allowance limit), and sometimes enhancements like progressive lenses or anti-glare coating. Some plans also offer discounts on LASIK or other corrective surgeries.
                </p>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-2">Can I use the same dentist and eye doctor with these plans?</h3>
                <p className="text-gray-700">
                  Most dental and vision plans have provider networks. You'll save the most by using in-network providers, though many plans offer some coverage for out-of-network care. Before enrolling, check if your preferred providers are in-network for any plan you're considering.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare & Dental Coverage Guide</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive overview of dental coverage options for Medicare beneficiaries, including standalone plans and Medicare Advantage.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Understanding Vision Benefits</h3>
                <p className="text-gray-700 mb-4">
                  Learn about vision coverage options, what they typically include, and how to choose the right plan for your eye care needs.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Dental Insurance vs. Discount Plans</h3>
                <p className="text-gray-700 mb-4">
                  A detailed comparison of dental insurance and dental discount plans to help you determine which option is best for your situation.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Maximizing Your Dental & Vision Benefits</h3>
                <p className="text-gray-700 mb-4">
                  Tips and strategies for getting the most value from your dental and vision coverage, including timing procedures and preventive care.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Dental Provider Search</h3>
                <p className="text-gray-700 mb-4">
                  Find dentists in your area that accept various dental insurance plans and see which are in-network for specific carriers.
                </p>
                <Button variant="outline" className="mt-2 w-full">Search Providers</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Vision Provider Locator</h3>
                <p className="text-gray-700 mb-4">
                  Locate optometrists, ophthalmologists, and eyewear retailers that participate in different vision insurance networks.
                </p>
                <Button variant="outline" className="mt-2 w-full">Find Vision Providers</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Dental Procedure Cost Estimator</h3>
                <p className="text-gray-700 mb-4">
                  Get estimates for common dental procedures with and without insurance to understand potential out-of-pocket costs.
                </p>
                <Button variant="outline" className="mt-2 w-full">Calculate Costs</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare Advantage Plan Finder</h3>
                <p className="text-gray-700 mb-4">
                  Compare Medicare Advantage plans in your area that include dental and vision benefits to find comprehensive coverage.
                </p>
                <Button variant="outline" className="mt-2 w-full">Compare Plans</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <a 
            href="/resources"
            className="inline-flex items-center justify-center text-bb-blue hover:text-bb-light-blue font-semibold text-lg"
          >
            View All Medicare Resources 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionResources;
