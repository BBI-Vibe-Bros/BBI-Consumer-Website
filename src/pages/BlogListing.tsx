import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';

const BlogListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const postsPerPage = 6;
  const contentfulService = ContentfulService.getInstance();

  // Fetch blog posts
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogPosts', currentPage, selectedCategory],
    queryFn: () => contentfulService.getBlogPosts(
      currentPage,
      postsPerPage,
      selectedCategory === 'all' ? undefined : selectedCategory
    ),
    placeholderData: (previousData) => previousData,
  });

  // Debug logging
  console.log('Blog listing data:', {
    data,
    isLoading,
    error,
    currentPage,
    selectedCategory
  });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => contentfulService.getCategories(),
  });

  const posts = data?.items || [];
  const totalPosts = data?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Debug logging for posts
  console.log('Processed posts:', {
    posts,
    totalPosts,
    totalPages,
    currentPage
  });

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog', isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title="Medicare Insurance Blog"
        description="Expert articles on Medicare Advantage, Medicare Supplements, and Part D plans. Stay informed about your Medicare coverage options."
        schemaType="webpage"
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Medicare Insurance Blog</h1>

        {/* Category Filter */}
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((category: any) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">Error Loading Blog Posts</h2>
            <p className="text-gray-500 mt-2">Please try again later</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No blog posts found</h2>
            <p className="text-gray-500 mt-2">Check back soon for new content</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <Link 
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100"
                >
                  {post.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-grow">
                    {post.category && (
                      <span className="bg-blue-100 text-bb-blue px-2 py-1 rounded-full text-xs mb-2 inline-block">
                        {typeof post.category === 'string' ? post.category : post.category[0]}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-bb-dark mb-2 hover:text-bb-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3">{post.publishedDate}</p>
                    <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogListing;
