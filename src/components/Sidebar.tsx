import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentfulService from '@/services/contentfulService';
import { ArrowRight } from 'lucide-react';

const STATIC_GUIDES = [
  { title: 'Understanding Medicare', slug: '/resources/medicare-overview' },
  { title: 'Medicare Advantage', slug: '/resources/medicare-advantage' },
  { title: 'Medicare Supplement', slug: '/resources/medicare-supplements' },
  { title: 'Medicare Part D', slug: '/resources/medicare-part-d' },
];

const Sidebar = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getBlogPosts(1, 3);
        console.log('Sidebar blog fetch response:', response);
        if (response && response.items && response.items.length > 0) {
          setBlogs(response.items);
        } else {
          setBlogs([]);
          setError('No blogs found.');
        }
      } catch (err) {
        setBlogs([]);
        setError('Failed to load blogs.');
        console.error('Sidebar blog fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Blog Section */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-bold text-xl mb-4">Read Our Blog</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-gray-500 text-sm">No blogs available.</div>
          ) : (
            blogs.map(blog => (
              <Link
                to={`/blog/${blog.slug}`}
                key={blog.slug}
                className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm hover:bg-blue-50 transition group"
              >
                <img
                  src={blog.featuredImage || '/static/blog-placeholder.png'}
                  alt={blog.title}
                  className="w-14 h-14 rounded-md object-cover mr-3 flex-shrink-0"
                />
                <span className="flex-1 text-sm font-medium text-gray-900 group-hover:text-bb-blue">
                  {blog.title}
                </span>
                <ArrowRight className="ml-2 text-bb-blue group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Guides Section */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-bold text-xl mb-4">Medicare Guides</h3>
        <ul className="space-y-2">
          {STATIC_GUIDES.map(guide => (
            <li key={guide.slug}>
              <Link
                to={guide.slug}
                className="text-bb-blue font-medium hover:underline text-base"
              >
                {guide.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Appointment Button */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <Link
          to="/contact"
          className="block w-full bg-bb-blue text-white text-center rounded-lg py-3 text-lg font-semibold hover:bg-bb-dark-blue transition"
        >
          Schedule an Appointment
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 