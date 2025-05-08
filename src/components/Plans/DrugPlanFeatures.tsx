import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PillIcon, Heart } from 'lucide-react';

const DrugPlanFeatures = () => {
  const features = [
    {
      icon: <PillIcon className="h-10 w-10 text-bb-blue" />,
      title: 'Formulary Coverage',
      description: 'Each Part D plan has a list of covered drugs (formulary) organized in tiers with different costs.'
    },
    {
      icon: <Heart className="h-10 w-10 text-bb-blue" />,
      title: 'Pharmacy Networks',
      description: 'Plans work with specific pharmacy networks where you can fill prescriptions at the lowest cost.'
    },
    {
      icon: <PillIcon className="h-10 w-10 text-bb-blue" />,
      title: 'Monthly Premium',
      description: 'You pay a monthly fee to the insurance company in addition to your Part B premium.'
    },
    {
      icon: <Heart className="h-10 w-10 text-bb-blue" />,
      title: 'Annual Deductible',
      description: 'The amount you pay for prescriptions before your plan begins to cover its share of costs.'
    },
    {
      icon: <PillIcon className="h-10 w-10 text-bb-blue" />,
      title: 'Copayments & Coinsurance',
      description: 'Your share of costs for each prescription after meeting the deductible.'
    },
    {
      icon: <Heart className="h-10 w-10 text-bb-blue" />,
      title: 'Coverage Stages',
      description: 'Part D has several coverage stages including the donut hole and catastrophic coverage.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark mb-4">Understanding Medicare Part D</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Medicare Part D prescription drug plans help cover the cost of your medications. Here's what you need to know about how they work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-heading font-bold text-bb-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-heading font-bold text-bb-dark mb-4">Understanding the Coverage Gap (Donut Hole)</h3>
          <p className="mb-4">
            Most Medicare Part D plans have a coverage gap, known as the "donut hole." This begins after you and your plan have spent a certain amount on covered drugs. While in the coverage gap, you'll pay no more than 25% of the cost for covered brand-name and generic drugs.
          </p>
          <p className="text-sm text-gray-600 italic">
            Once your out-of-pocket costs reach a certain limit, you exit the coverage gap and enter catastrophic coverage, where you pay significantly less for covered drugs for the rest of the year.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DrugPlanFeatures;
