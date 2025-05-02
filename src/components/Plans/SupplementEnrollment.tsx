
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

const SupplementEnrollment = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Medicare Supplement Enrollment</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding when and how to enroll in a Medicare Supplement plan is crucial to getting the best coverage at the best price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-bb-blue" />
                <CardTitle className="text-2xl">Initial Enrollment Period</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                The best time to enroll in a Medicare Supplement plan is during your 6-month Medigap Open Enrollment Period, which starts the first month you have Medicare Part B and you're 65 or older.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>During this period, you can buy any Medicare Supplement plan sold in your state, even if you have health problems.</li>
                <li>Insurance companies cannot deny you coverage or charge you more based on pre-existing conditions.</li>
                <li>After this period ends, you may have to go through medical underwriting to qualify for a plan.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-bb-blue" />
                <CardTitle className="text-2xl">Outside Open Enrollment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                If you're looking to switch plans or enroll outside your Medigap Open Enrollment Period:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>You may have to answer health questions and go through medical underwriting.</li>
                <li>Insurance companies can deny coverage or charge higher premiums based on your health.</li>
                <li>Some states have special exceptions or "guaranteed issue rights" for certain situations.</li>
                <li>Working with an experienced Medicare agent can help you navigate these complexities.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Need Help Enrolling?</h3>
          <p className="text-gray-700 mb-4">
            At Bobby Brock Insurance, we can help you understand your Medicare Supplement options and guide you through the enrollment process at no cost to you.
          </p>
          <div className="flex justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-bb-blue px-8 py-3 text-lg font-medium text-white hover:bg-bb-light-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bb-blue"
            >
              Speak With a Medicare Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplementEnrollment;
