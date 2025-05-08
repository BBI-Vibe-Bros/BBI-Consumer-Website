import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdvantageResources = () => {
  const resources = [
    {
      id: 1,
      title: "Medicare Advantage vs. Medicare Supplement: What's the Difference?",
      type: "Guide",
      description: "Learn the key differences between Medicare Advantage plans and Medicare Supplement policies to make an informed choice.",
      link: "/resources/guides/advantage-vs-supplement"
    },
    {
      id: 2,
      title: "Medicare Advantage Networks: Finding In-Network Providers",
      type: "Video",
      description: "Watch our step-by-step guide to finding doctors, specialists and hospitals in your Medicare Advantage plan's network.",
      link: "/videos/watch/medicare-advantage-networks"
    },
    {
      id: 3,
      title: "Understanding Medicare Advantage Prescription Drug Coverage",
      type: "Guide",
      description: "Learn how prescription drug coverage works with Medicare Advantage plans, including formularies and tiers.",
      link: "/resources/guides/advantage-prescription-coverage"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark">Medicare Advantage Resources</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Access our guides and videos to better understand Medicare Advantage plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map(resource => (
            <Card key={resource.id} className="border border-gray-200 shadow-card hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader>
                <div className="bg-bb-light-blue/20 text-bb-blue text-sm font-semibold rounded-full px-3 py-1 mb-2 w-fit">
                  {resource.type}
                </div>
                <CardTitle className="font-heading font-bold hover:text-bb-blue transition-colors">
                  <Link to={resource.link}>
                    {resource.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">{resource.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={resource.link} className="text-bb-blue hover:text-bb-light-blue font-medium flex items-center gap-2">
                  View Resource 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/resources/guides">
            <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10 text-lg font-semibold">
              View All Medicare Resources
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvantageResources;
