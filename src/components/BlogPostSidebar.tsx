import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download } from 'lucide-react';
import TableOfContents from '@/components/Content/TableOfContents';
import { Document } from '@contentful/rich-text-types';

interface BlogPostSidebarProps {
  content: Document;
}

const BlogPostSidebar = ({ content }: BlogPostSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <TableOfContents content={content} />

      {/* Lead Magnet Section */}
      <div className="bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl leading-normal font-bold mb-4">Medicare Breakdown: The Alphabet Soup of Medicare</h2>
        <h4 className="font-medium italic text-base mb-4">Download the Guide That Makes Medicare Make Sense</h4>
        <p className="text-sm leading-normal text-gray-700 mb-4">
          No fluff, no jargon—just clear, helpful answers to your most important Medicare questions. Download your free copy now and take the guesswork out of getting the right coverage.
        </p>
        <Link
          to="/medicare/medicare-breakdown"
          className="flex items-center justify-center bg-bb-blue text-white rounded-lg px-4 py-3 hover:bg-bb-dark-blue transition group"
        >
          <Download className="mr-2" size={20} />
          <span className="font-medium">Download Free Guide</span>
        </Link>
      </div>

      {/* Appointment Section */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200">
        <h3 className="font-bold text-xl mb-4">Schedule a Consultation</h3>
        <p className="text-gray-700 mb-4">
          Get personalized help understanding your Medicare options from our licensed insurance agents.
        </p>
        <Link
          to="/contact"
          className="flex items-center justify-center bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-700 transition group"
        >
          <Calendar className="mr-2" size={20} />
          <span className="font-medium">Book Appointment</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostSidebar; 