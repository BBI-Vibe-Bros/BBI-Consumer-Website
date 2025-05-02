
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ResourceSection = () => {
  const resources = [
    {
      id: 1,
      title: 'What To Do If Your Medicare Card Expires, Is Lost, or Damaged!',
      date: 'January 21, 2024',
      image: '/lovable-uploads/e9a50103-153f-420a-b667-5f76c69fd66d.png',
      slug: '/blog/medicare-card-lost-expired-damaged'
    },
    {
      id: 2,
      title: '3 Reasons Why Medicare Supplements Make Sense',
      date: 'February 15, 2024',
      image: '/lovable-uploads/b5ebd66f-258a-442f-b477-05d9eca83670.png',
      slug: '/blog/medicare-supplements-make-sense'
    },
    {
      id: 3,
      title: 'Is Original Medicare Parts A & B Enough Coverage?',
      date: 'March 10, 2024',
      image: '/lovable-uploads/9de67b07-07ab-47e8-af0a-c57d775e1416.png',
      slug: '/blog/is-original-medicare-enough-coverage'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Medicare Resources</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Expert insight to help you understand your Medicare options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map(resource => (
            <Card key={resource.id} className="border border-gray-200 shadow-card hover:shadow-lg transition-shadow">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader className="pb-2">
                <p className="text-sm text-gray-500">{resource.date}</p>
                <CardTitle className="text-xl font-bold hover:text-bb-blue transition-colors">
                  <Link to={resource.slug}>
                    {resource.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={resource.slug} className="text-bb-blue hover:text-bb-light-blue font-medium flex items-center gap-2">
                  Read Article 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" className="border-bb-blue text-bb-blue hover:bg-bb-blue/10 text-lg font-semibold">
              View More Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourceSection;
