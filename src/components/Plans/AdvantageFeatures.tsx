import React from 'react';

const AdvantageFeatures = () => {
  const features = [
    {
      id: 1,
      title: "All-in-One Coverage",
      description: "Medicare Advantage plans combine Part A (hospital), Part B (medical), and often Part D (prescription) coverage in one plan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      )
    },
    {
      id: 2,
      title: "Additional Benefits",
      description: "Many plans include dental, vision, hearing aids, fitness programs, and other benefits not covered by Original Medicare.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><path d="M8 19h8a4 4 0 0 0 0-8h-1a4 4 0 0 0-8 0H6a4 4 0 0 0 0 8h1"/><path d="M12 19v3"/><path d="M12 6V3"/><path d="M15 6.5a3.5 3.5 0 0 0-6.17-.11"/></svg>
      )
    },
    {
      id: 3,
      title: "Provider Networks",
      description: "Choose the right plan type (HMO, PPO, or SNP) based on your preferred doctors, hospitals, and medical needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
    },
    {
      id: 4,
      title: "Annual Enrollment",
      description: "Change your Medicare Advantage plan each year during Annual Enrollment Period (AEP) from October 15 to December 7.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark">Key Benefits of Medicare Advantage Plans</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Medicare Advantage plans offer comprehensive coverage with valuable benefits beyond Original Medicare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => (
            <div 
              key={feature.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-bb-dark mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageFeatures;
