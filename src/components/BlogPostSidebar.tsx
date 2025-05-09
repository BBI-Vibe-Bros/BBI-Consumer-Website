import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import TableOfContents from '@/components/Content/TableOfContents';
import { useLeadCapture } from '@/contexts/LeadCaptureContext';

interface BlogPostSidebarProps {
  content: any;
}

const BlogPostSidebar = ({ content }: BlogPostSidebarProps) => {
  const { openLeadCapture } = useLeadCapture();

  const handleLeadCaptureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLeadCapture('Blog Sidebar');
  };

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <TableOfContents content={content} />

      {/* Lead Magnet Section */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="leading-snug text-2xl mb-2">Medicare Made <i>Really</i> Simple</h3>
        <h4 className="text-base leading-normal text-bb-dark mb-2">Your Free Guide to the ABCs</h4>
        <p className="leading-normal text-gray-700 mb-4">
          Confused by Parts A, B, C, and D? This free guide breaks it all down in plain English to help you make sense of Medicare and choose the right coverage with confidence.
        </p>
        <Button 
          onClick={handleLeadCaptureClick}
          className="w-full flex items-center justify-center gap-2"
        >
          Download Free Guide
          <Download className="inline-block" size={20} />
        </Button>
      </div>

      {/* Appointment Section */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200">
        <h3 className="leading-snug text-2xl mb-2">Talk to a Licensed Medicare Agent</h3>
        <p className="leading-normal text-gray-700 mb-4">
          Get personalized guidance from a real person—no pressure, just friendly help choosing a Medicare plan that fits your needs.
        </p>
        <Link to="/contact">
          <Button className="w-full flex items-center justify-center gap-2">
            Book Appointment
            <Calendar className="inline-block" size={20}/>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostSidebar; 