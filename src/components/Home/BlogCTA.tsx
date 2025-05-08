import React from 'react';
import { Button } from '@/components/ui/button';

const BlogCTA = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-3 text-bb-dark">Ready to Get Started?</h2>
        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
          Our licensed Medicare agents are ready to help you find the right coverage for your needs. Get personalized guidance and answers to all your Medicare questions.
        </p>
        <Button>Read Our Blog</Button>
      </div>
    </div>
  );
};

export default BlogCTA;