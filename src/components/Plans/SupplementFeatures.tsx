
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, ShieldCheck, ShieldPlus } from 'lucide-react';

const SupplementFeatures = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-bb-blue" />,
      title: 'Medicare Part A Coinsurance',
      description: 'Covers the coinsurance for hospital stays and additional days after Medicare benefits are used up.'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-bb-blue" />,
      title: 'Medicare Part B Coinsurance',
      description: 'Pays the 20% coinsurance for doctor visits, outpatient services, and durable medical equipment.'
    },
    {
      icon: <ShieldPlus className="h-10 w-10 text-bb-blue" />,
      title: 'Blood Coverage',
      description: 'Covers the first three pints of blood you may need for a medical procedure each year.'
    },
    {
      icon: <Shield className="h-10 w-10 text-bb-blue" />,
      title: 'Part A Hospice Care',
      description: 'Covers the copayment and coinsurance for hospice care through Medicare Part A.'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-bb-blue" />,
      title: 'Skilled Nursing Care',
      description: 'Most plans cover coinsurance for skilled nursing facility care services.'
    },
    {
      icon: <ShieldPlus className="h-10 w-10 text-bb-blue" />,
      title: 'Foreign Travel Emergency',
      description: 'Some plans include emergency healthcare coverage when traveling outside the United States.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Medicare Supplements Cover</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Medicare Supplement plans help pay for some of the costs that Original Medicare doesn't cover. Each plan offers standardized benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Understanding Medicare Supplement Letters</h3>
          <p className="mb-4">
            Medicare Supplement plans are labeled with letters (A, B, C, D, F, G, K, L, M, and N). 
            Each plan letter offers a different level of coverage at different premium costs.
            The most popular plans are Plan G and Plan N, which offer comprehensive coverage at reasonable costs.
          </p>
          <p className="text-sm text-gray-600 italic">
            Note: Plan F and Plan C are only available to those eligible for Medicare before January 1, 2020.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupplementFeatures;
