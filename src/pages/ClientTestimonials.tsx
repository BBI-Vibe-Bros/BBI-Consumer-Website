import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import CTASection from '@/components/Home/CTASection';
import GoogleReviews from '@/components/Reviews/GoogleReviews';

const ClientTestimonials = () => {
  return (
    <Layout>
      <Helmet>
        <title>Client Testimonials | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Read what our clients have to say about their experience with Bobby Brock Insurance. Real testimonials from satisfied Medicare insurance customers."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-600">
            See what our clients have to say about their experience with Bobby Brock Insurance
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <GoogleReviews />
        </div>
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default ClientTestimonials; 