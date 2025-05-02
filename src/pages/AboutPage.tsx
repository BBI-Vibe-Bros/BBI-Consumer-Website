
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import CTASection from '@/components/Home/CTASection';
import { useLocation } from 'react-router-dom';

const AboutPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine page title and breadcrumb based on the path
  let pageTitle = 'About Bobby Brock Insurance';
  let pageDescription = 'Learn more about Bobby Brock Insurance, our mission, and our commitment to helping clients find the best Medicare coverage.';
  
  let breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about', isLast: true }
  ];
  
  if (path.includes('/medicare/basics')) {
    pageTitle = 'Medicare Basics';
    pageDescription = 'Learn the fundamentals of Medicare coverage, eligibility, enrollment periods, and more.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Medicare', path: '/medicare' },
      { label: 'Basics', path: '/medicare/basics', isLast: true }
    ];
  } else if (path.includes('/medicare/eligibility')) {
    pageTitle = 'Medicare Eligibility';
    pageDescription = 'Find out if you qualify for Medicare coverage and when you can enroll.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Medicare', path: '/medicare' },
      { label: 'Eligibility', path: '/medicare/eligibility', isLast: true }
    ];
  } else if (path.includes('/medicare/parts')) {
    pageTitle = 'Medicare Parts A, B, C, and D';
    pageDescription = 'Understanding the different parts of Medicare coverage and what they mean for you.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Medicare', path: '/medicare' },
      { label: 'Parts', path: '/medicare/parts', isLast: true }
    ];
  } else if (path.includes('/about/team')) {
    pageTitle = 'Our Team';
    pageDescription = 'Meet the dedicated professionals at Bobby Brock Insurance who help clients navigate Medicare.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Team', path: '/about/team', isLast: true }
    ];
  } else if (path.includes('/resources/calculators')) {
    pageTitle = 'Medicare Cost Calculators';
    pageDescription = 'Use our calculators to estimate your Medicare costs and find the right coverage.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Resources', path: '/resources' },
      { label: 'Calculators', path: '/resources/calculators', isLast: true }
    ];
  } else if (path.includes('/resources/glossary')) {
    pageTitle = 'Medicare Glossary';
    pageDescription = 'Essential Medicare terminology explained in plain language.';
    breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Resources', path: '/resources' },
      { label: 'Glossary', path: '/resources/glossary', isLast: true }
    ];
  }

  return (
    <Layout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        schemaType="webpage"
      />
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-bb-dark mb-6">{pageTitle}</h1>
          
          {path === '/about' && (
            <>
              <div className="mb-10">
                <img 
                  src="/lovable-uploads/1ac2fffd-5fdf-42bd-bca7-22683515d254.png" 
                  alt="Bobby Brock Insurance Team" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg mb-6">
                  At Bobby Brock Insurance, we've been helping Tupelo residents navigate the complexities of Medicare for over two decades. Our mission is to provide expert guidance and personalized service to every client.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                <p className="mb-6">
                  We believe that everyone deserves access to the healthcare coverage they need without confusion or uncertainty. Our team of Medicare specialists works tirelessly to simplify the process and find the perfect plan for each individual's unique circumstances.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Bobby Brock Insurance</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Decades of Medicare experience</li>
                  <li>Independent agency representing multiple carriers</li>
                  <li>No-cost consultation and plan comparison</li>
                  <li>Ongoing support throughout your Medicare journey</li>
                  <li>Local expertise with nationwide service</li>
                </ul>
              </div>
            </>
          )}
          
          {/* Placeholder content for other pages - would be replaced with actual content */}
          {path !== '/about' && (
            <div className="prose prose-lg max-w-none">
              <p className="text-lg mb-6">
                This page is currently under construction. Please check back soon for more information about {pageTitle}.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default AboutPage;
