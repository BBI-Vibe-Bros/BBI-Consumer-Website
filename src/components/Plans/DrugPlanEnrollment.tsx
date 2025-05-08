import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

const DrugPlanEnrollment = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark mb-4">Medicare Part D Enrollment Periods</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Knowing when you can enroll in or change Medicare Part D plans is essential to avoid late enrollment penalties and get the coverage you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-bb-blue" />
                <CardTitle className="text-xl">Initial Enrollment Period</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                When you first become eligible for Medicare, you have a 7-month period to enroll in a Part D plan:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Begins 3 months before the month you turn 65</li>
                <li>Includes the month you turn 65</li>
                <li>Ends 3 months after the month you turn 65</li>
                <li>For those under 65 with disabilities, begins 3 months before your 25th month of disability benefits</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-bb-blue" />
                <CardTitle className="text-xl">Annual Enrollment Period</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                Each year, you have an opportunity to join, switch, or drop a Part D plan:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>October 15 - December 7 each year</li>
                <li>Coverage begins January 1 of the following year</li>
                <li>This is the best time to review your current coverage and compare it with other available options</li>
                <li>You can change plans even if you're satisfied with your current coverage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-bb-blue" />
                <CardTitle className="text-xl">Special Enrollment Periods</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                You may qualify for a Special Enrollment Period (SEP) in certain situations:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Moving to a new area not covered by your current plan</li>
                <li>Losing other creditable prescription drug coverage</li>
                <li>Moving into or out of a long-term care facility</li>
                <li>Qualifying for Extra Help with Medicare drug costs</li>
                <li>Having Medicaid or qualifying for state assistance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-red-50 rounded-lg shadow-sm">
          <h3 className="font-heading font-bold text-bb-dark mb-4">Late Enrollment Penalty</h3>
          <p className="text-gray-800 mb-4">
            If you go without Part D or other creditable prescription drug coverage for 63 days or more after your Initial Enrollment Period ends, you may have to pay a late enrollment penalty if you join later.
          </p>
          <p className="text-gray-800">
            The penalty is calculated by multiplying 1% of the "national base beneficiary premium" by the number of full months you went without Part D or creditable coverage. This amount is added to your monthly premium for as long as you have Part D coverage.
          </p>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="font-heading font-bold text-bb-dark mb-4">Ready to Enroll or Have Questions?</h3>
      </div>
    </section>
  );
};

export default DrugPlanEnrollment;
