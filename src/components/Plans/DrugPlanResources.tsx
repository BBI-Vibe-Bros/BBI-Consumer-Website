
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DrugPlanResources = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Medicare Part D Resources</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn more about Medicare prescription drug coverage with these helpful resources.
          </p>
        </div>

        <Tabs defaultValue="faqs" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="tools">Drug Tools</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>
          <TabsContent value="faqs" className="mt-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">Do I need Medicare Part D if I don't take any medications?</h3>
                <p className="text-gray-700">
                  Even if you don't currently take prescription drugs, enrolling in Part D when you're first eligible is recommended. If you decide to join later, you may face a late enrollment penalty unless you have other creditable drug coverage.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What is the "donut hole" or coverage gap?</h3>
                <p className="text-gray-700">
                  The "donut hole" is a coverage gap that begins after you and your plan have spent a certain amount on covered drugs. While in this gap, you'll pay no more than 25% of the cost for covered brand-name and generic drugs until you reach catastrophic coverage.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">How do I know if my medications are covered by a plan?</h3>
                <p className="text-gray-700">
                  Each Part D plan has a formulary (list of covered drugs). You can check if your medications are covered by reviewing a plan's formulary online, calling the plan, or working with us to compare plans based on your specific medications.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What is Extra Help for Medicare Part D?</h3>
                <p className="text-gray-700">
                  Extra Help is a Medicare program that helps people with limited income and resources pay Medicare Part D costs, including premiums, deductibles, and copayments. You can apply through Social Security.
                </p>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-2">Can I change my Part D plan during the year?</h3>
                <p className="text-gray-700">
                  Generally, you can only change Part D plans during the Annual Enrollment Period (October 15 - December 7) or if you qualify for a Special Enrollment Period due to certain life events, like moving or losing other coverage.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare Plan Finder Tool</h3>
                <p className="text-gray-700 mb-4">
                  Use Medicare's official tool to compare Part D plans based on your specific medications and local pharmacies.
                </p>
                <Button variant="outline" className="mt-2 w-full">Access Tool</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Prescription Drug Coverage Calculator</h3>
                <p className="text-gray-700 mb-4">
                  Calculate your potential out-of-pocket costs for different Part D plans based on your medication list.
                </p>
                <Button variant="outline" className="mt-2 w-full">Use Calculator</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Formulary Look-Up Tool</h3>
                <p className="text-gray-700 mb-4">
                  Quickly check if your medications are covered by specific Part D plans and what tier they fall under.
                </p>
                <Button variant="outline" className="mt-2 w-full">Check Coverage</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Pharmacy Network Finder</h3>
                <p className="text-gray-700 mb-4">
                  Find participating pharmacies for different Part D plans in your area, including preferred pharmacies.
                </p>
                <Button variant="outline" className="mt-2 w-full">Find Pharmacies</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare Part D Explained</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive guide to understanding how Medicare prescription drug coverage works, including costs and coverage stages.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Understanding Drug Formularies</h3>
                <p className="text-gray-700 mb-4">
                  Learn about drug tiers, formulary restrictions, and how to navigate prescription drug coverage under Medicare Part D.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Extra Help & Assistance Programs</h3>
                <p className="text-gray-700 mb-4">
                  Information on financial assistance programs that can help with Medicare Part D costs if you have limited income.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Annual Plan Review Checklist</h3>
                <p className="text-gray-700 mb-4">
                  A step-by-step checklist to review your Part D coverage each year and determine if you should switch plans.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
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

export default DrugPlanResources;
