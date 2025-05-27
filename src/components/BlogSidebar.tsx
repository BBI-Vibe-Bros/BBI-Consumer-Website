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
    <div className="sticky top-20 md:top-24 self-start space-y-4">
      {/* Category Filter */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        {isLoadingCategories ? (
          <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
        ) : (
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
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

      {/* Lead Magnet Section - Medicare Breakdown */}
      <div className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-xl font-bold mb-2 leading-tight">Medicare Breakdown: The Alphabet Soup of Medicare</h2>
        <h4 className="font-medium italic text-sm mb-3 text-gray-600">Download the Guide That Makes Medicare Make Sense</h4>
        <p className="text-sm leading-snug text-gray-700 mb-4">
          No fluff, no jargon—just clear, helpful answers to your most important Medicare questions.
        </p>
        <Link
          to="/medicare-breakdown"
          className="flex items-center justify-center bg-bb-blue text-white rounded-lg px-4 py-2.5 hover:bg-bb-dark-blue transition group text-sm"
        >
          <Download className="mr-2" size={18} />
          <span className="font-medium">Download Free Guide</span>
        </Link>
      </div>

      {/* Lead Magnet Section - Avoid Mistakes */}
      <div className="bg-red-50 rounded-xl p-5 border border-red-100">
        <h2 className="text-xl font-bold mb-2 leading-tight">Avoid Costly Medicare Mistakes</h2>
        <h4 className="font-medium italic text-sm mb-3 text-gray-600">Your Free Guide to Smart Decisions</h4>
        <p className="text-sm leading-snug text-gray-700 mb-4">
          Don't let Medicare mistakes cost you thousands. Learn the most common pitfalls and how to avoid them.
        </p>
        <Link
          to="/avoid-mistakes-with-medicare"
          className="flex items-center justify-center bg-red-600 text-white rounded-lg px-4 py-2.5 hover:bg-red-700 transition group text-sm"
        >
          <Download className="mr-2" size={18} />
          <span className="font-medium">Download Free Guide</span>
        </Link>
      </div>

      {/* Appointment Section */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-bold text-lg mb-2">Schedule a Consultation</h3>
        <p className="text-gray-700 mb-3 text-sm leading-snug">
          Get personalized help understanding your Medicare options from our licensed insurance agents.
        </p>
        <Link
          to="/contact"
          className="flex items-center justify-center bg-green-600 text-white rounded-lg px-4 py-2.5 hover:bg-green-700 transition group text-sm"
        >
          <Calendar className="mr-2" size={18} />
          <span className="font-medium">Book Appointment</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogSidebar; 