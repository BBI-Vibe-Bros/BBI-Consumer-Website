import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const PlanOptions = () => {
  const plans = [{
    id: 'advantage',
    title: 'Medicare Advantage Plans',
    description: 'Medicare Advantage (Part C) offers all-in-one alternatives to Original Medicare with additional benefits.',
    image: '/services/MedicareAdvantage_FeaturedImg.png',
    link: '/plans/medicare-advantage'
  }, {
    id: 'supplement',
    title: 'Medicare Supplements',
    description: 'Medicare Supplements (Medigap) help fill the "gaps" in Original Medicare coverage and provide more flexibility.',
    image: '/services/MedicareSupplement_FeaturedImg.png',
    link: '/plans/medicare-supplement'
  }, {
    id: 'prescription',
    title: 'Prescription Drug Plans',
    description: 'Medicare Part D helps cover the cost of prescription drugs, including many recommended shots or vaccines.',
    image: '/services/MedicarePartD_FeaturedImg.png',
    link: '/plans/medicarepartd'
  }];
  return <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-bold mb-4 text-bb-blue text-2xl md:text-3xl">Explore Your Medicare Coverage Options with Confidence</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">We make it easy to understand your Medicare coverage options available to you. Learn how to compare Medicare Advantage, Supplements, and Prescription Drug Plans in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {plans.map(plan => <Card key={plan.id} className="border border-gray-200 shadow-card hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <img src={plan.image} alt={plan.title} className="w-full h-60 object-top object-cover overflow-hidden rounded-t" />
            </CardHeader>
            <div className="px-6 pt-4 pb-0">
              <CardTitle className="text-lg font-bold">{plan.title}</CardTitle>
            </div>
            <CardContent className="px-6 pt-2 pb-4">
              <p className="text-base text-gray-700">{plan.description}</p>
            </CardContent>
            <CardFooter className="px-6 pt-0 pb-4">
              <Link to={plan.link} className="text-bb-blue hover:text-bb-light-blue font-semibold text-base flex items-center gap-2">
                 Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </CardFooter>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default PlanOptions;