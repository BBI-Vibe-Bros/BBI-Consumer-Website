import React from 'react';
import { Users, GraduationCap, Headphones } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Users className="w-8 h-8 text-[#00a3e0]" />,
    title: 'Local Expertise',
    description: "Deep understanding of Mississippi's Medicare landscape and local healthcare providers."
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-[#00a3e0]" />,
    title: 'Education First',
    description: 'We believe in empowering you with knowledge to make informed Medicare decisions.'
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#00a3e0]" />,
    title: 'Ongoing Support',
    description: 'Continuous assistance throughout your Medicare journey, from enrollment to annual reviews.'
  }
];

const FeatureGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002a3a] mb-6">
            Why Choose Bobby Brock Insurance
          </h2>
          <p className="text-lg text-gray-600">
            We combine local expertise with personalized service to ensure you get the Medicare coverage that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#002a3a] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid; 