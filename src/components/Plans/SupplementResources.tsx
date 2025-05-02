
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupplementResources = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Medicare Supplement Resources</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn more about Medicare Supplement plans with these helpful resources.
          </p>
        </div>

        <Tabs defaultValue="faqs" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="faqs" className="mt-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">What's the difference between Medicare Advantage and Medicare Supplement plans?</h3>
                <p className="text-gray-700">
                  Medicare Supplements work with Original Medicare and help cover out-of-pocket costs. Medicare Advantage plans replace Original Medicare and often include additional benefits like prescription drugs, dental, and vision.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">Can I switch Medicare Supplement plans anytime?</h3>
                <p className="text-gray-700">
                  You can apply to switch Medicare Supplement plans at any time, but outside your Medigap Open Enrollment Period, you may have to answer health questions and could be denied coverage based on pre-existing conditions.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">Do Medicare Supplements cover prescription drugs?</h3>
                <p className="text-gray-700">
                  No, Medicare Supplement plans don't cover prescription drugs. For medication coverage, you'll need to enroll in a separate Medicare Part D prescription drug plan.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold mb-2">Are Medicare Supplement plan benefits the same across all insurance companies?</h3>
                <p className="text-gray-700">
                  Yes, Medicare Supplement plans are standardized. For example, Plan G offers the same benefits regardless of which insurance company sells it. However, premiums and customer service can vary between companies.
                </p>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-2">Why are some Medicare Supplement plans more expensive than others?</h3>
                <p className="text-gray-700">
                  Medicare Supplement plan costs vary based on the level of coverage, your location, age, gender, and the insurance company's pricing methods. Plans with more comprehensive coverage generally cost more.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare Supplement Plan Comparison Guide</h3>
                <p className="text-gray-700 mb-4">
                  Compare the benefits and coverage levels of all Medicare Supplement plans side-by-side to find the right fit for your needs.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Understanding Medicare Supplement Costs</h3>
                <p className="text-gray-700 mb-4">
                  Learn about the factors that affect Medicare Supplement pricing and how to find the best value for your coverage.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Choosing Between Plan G and Plan N</h3>
                <p className="text-gray-700 mb-4">
                  A detailed analysis of the two most popular Medicare Supplement plans to help you make an informed decision.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Medicare Supplement Enrollment Checklist</h3>
                <p className="text-gray-700 mb-4">
                  A step-by-step checklist to ensure you have everything you need when enrolling in a Medicare Supplement plan.
                </p>
                <Button variant="outline" className="mt-2 w-full">Download Guide</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-200 aspect-video flex items-center justify-center">
                  <span className="text-gray-600">Video: Medicare Supplement Basics</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Medicare Supplement Basics</h3>
                  <p className="text-gray-700 text-sm">10:25 • A comprehensive overview of Medicare Supplement plans</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-200 aspect-video flex items-center justify-center">
                  <span className="text-gray-600">Video: Plan G vs. Plan N</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Plan G vs. Plan N Comparison</h3>
                  <p className="text-gray-700 text-sm">8:15 • Which popular Medicare Supplement is right for you?</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-200 aspect-video flex items-center justify-center">
                  <span className="text-gray-600">Video: Enrollment Tips</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Medicare Supplement Enrollment Tips</h3>
                  <p className="text-gray-700 text-sm">12:40 • How to enroll and timing considerations</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-200 aspect-video flex items-center justify-center">
                  <span className="text-gray-600">Video: Cost Comparison</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Understanding Medicare Supplement Costs</h3>
                  <p className="text-gray-700 text-sm">9:30 • Factors that affect your premium rates</p>
                </div>
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

export default SupplementResources;
