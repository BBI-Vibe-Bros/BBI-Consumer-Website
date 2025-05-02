
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PlanOptions = () => {
  const plans = [
    {
      id: 'advantage',
      title: 'Medicare Advantage Plans',
      description: 'Medicare Advantage (Part C) offers all-in-one alternatives to Original Medicare with additional benefits.',
      image: '/lovable-uploads/e9a50103-153f-420a-b667-5f76c69fd66d.png',
      link: '/plans/advantage',
    },
    {
      id: 'supplement',
      title: 'Medicare Supplements',
      description: 'Medicare Supplements (Medigap) help fill the "gaps" in Original Medicare coverage and provide more flexibility.',
      image: '/lovable-uploads/b5ebd66f-258a-442f-b477-05d9eca83670.png',
      link: '/plans/supplement',
    },
    {
      id: 'prescription',
      title: 'Prescription Drug Plans',
      description: 'Medicare Part D helps cover the cost of prescription drugs, including many recommended shots or vaccines.',
      image: '/lovable-uploads/e9a50103-153f-420a-b667-5f76c69fd66d.png',
      link: '/plans/prescription',
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Getting the Right Coverage Can Be Difficult</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We understand that Medicare is a complex program with different coverage options. That's why we're here to explain your choices in simple terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="border border-gray-200 shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4" 
                />
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-lg text-gray-700">{plan.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link 
                  to={plan.link}
                  className="text-bb-blue hover:text-bb-light-blue font-semibold text-lg flex items-center gap-2"
                >
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/plans"
            className="inline-flex items-center justify-center rounded-md bg-bb-blue px-8 py-4 text-lg font-medium text-white hover:bg-bb-light-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bb-blue"
          >
            View All Medicare Options
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlanOptions;
