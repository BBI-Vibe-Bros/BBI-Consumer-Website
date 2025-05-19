import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import CTASection from '@/components/Home/CTASection';
import GoogleReviews from '@/components/Reviews/GoogleReviews';

const ClientTestimonials = () => {
  // Schema markup for reviews
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bobby Brock Insurance',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Verified Client'
      },
      reviewBody: 'Excellent service and support throughout the Medicare enrollment process. The team at Bobby Brock Insurance made everything clear and easy to understand.'
    }
  };

  // Google My Business URL
  const gmbUrl = 'https://www.google.com/maps/place/Bobby+Brock+Insurance/@34.2577,-88.7047,17z/data=!4m8!3m7!1s0x888a3c8c8c8c8c8c:0x888a3c8c8c8c8c8c!8m2!3d34.2577!4d-88.7047!9m1!1b1!16s%2Fg%2F11c5c5c5c5';

  return (
    <Layout>
      <Helmet>
        <title>Client Testimonials | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Read what our clients have to say about their experience with Bobby Brock Insurance. Real testimonials from satisfied Medicare insurance customers."
        />
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
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
          <div className="mt-12 text-center">
            <a
              href={gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-bb-blue hover:bg-bb-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bb-blue transition-colors duration-200"
            >
              See All of Our Reviews
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default ClientTestimonials; 