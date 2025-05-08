import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdvantageEnrollment = () => {
  const enrollmentPeriods = [
    {
      id: 1,
      title: "Initial Enrollment Period (IEP)",
      description: "When you're first eligible for Medicare, you have a 7-month period to sign up that includes the 3 months before you turn 65, your birth month, and 3 months after.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="10" x2="14" y1="14" y2="18"/></svg>
      )
    },
    {
      id: 2,
      title: "Annual Enrollment Period (AEP)",
      description: "October 15 to December 7 each year is when you can join, switch, or drop a Medicare Advantage plan, with coverage beginning January 1.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
      )
    },
    {
      id: 3,
      title: "Medicare Advantage Open Enrollment Period",
      description: "January 1 to March 31 each year, you can switch from one Medicare Advantage plan to another or go back to Original Medicare.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="m2 12 10 10 10-10L12 2 2 12Z"/><path d="M12 12v10"/><path d="m12 12 7.5 3"/><path d="m12 12 3-7.5"/><path d="M12 12 4.5 9"/><path d="M12 12 9 4.5"/></svg>
      )
    },
    {
      id: 4,
      title: "Special Enrollment Periods (SEPs)",
      description: "You may qualify for a Special Enrollment Period if you move, lose other coverage, qualify for Extra Help, or have other special circumstances.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-bb-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark">Medicare Advantage Enrollment Periods</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Understanding when you can enroll in or change your Medicare Advantage plan is essential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enrollmentPeriods.map(period => (
            <Card key={period.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-50 p-2 rounded-full">
                    {period.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-bb-dark mb-2">{period.title}</h3>
                    <p className="text-gray-700">{period.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-heading font-bold text-bb-dark mb-4">Ready to Enroll or Have Questions?</h3>
          <p className="font-body text-gray-700 mb-6">
            Our Medicare specialists can help you understand your enrollment options and guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:6628443300" 
              className="inline-flex items-center justify-center bg-bb-blue text-white px-6 py-3 rounded-md hover:bg-bb-light-blue transition-colors text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call (662) 844-3300
            </a>
            <a 
              href="mailto:info@bobbybrockinsurance.com" 
              className="inline-flex items-center justify-center border border-bb-blue text-bb-blue px-6 py-3 rounded-md hover:bg-bb-blue/10 transition-colors text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageEnrollment;
