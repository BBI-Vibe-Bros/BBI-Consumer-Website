import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ContentfulService from '@/services/contentfulService';
import { Calendar, Download } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const BlogSidebar = ({ selectedCategory, onCategoryChange }: { selectedCategory: string, onCategoryChange: (category: string) => void }) => {
  const contentfulService = ContentfulService.getInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => contentfulService.getCategories(),
  });

  const handleCategoryChange = (category: string) => {
    if (isBlogPost) {
      // On blog post page, navigate to listing with category filter
      navigate(`/blog?category=${category}`);
    } else {
      // On listing page, use the provided callback
      onCategoryChange(category);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-bold text-xl mb-4">Categories</h3>
        {isLoadingCategories ? (
          <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
        ) : (
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Lead Magnet Section */}
      <div className="bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl leading-normal font-bold mb-4">Medicare Breakdown: The Alphabet Soup of Medicare</h2>
        <h4 className="font-medium italic text-base mb-4">Download the Guide That Makes Medicare Make Sense</h4>
        <p className="text-sm leading-normal text-gray-700 mb-4">
          No fluff, no jargon—just clear, helpful answers to your most important Medicare questions.
        </p>
        <Link
          to="/medicare-breakdown"
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

export default BlogSidebar; 