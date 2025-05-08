import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import BlogSidebar from '@/components/BlogSidebar';

const BlogListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const postsPerPage = 6;
  const contentfulService = ContentfulService.getInstance();

  // Handle category from URL query parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

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

      <div className="bg-0">
        <div className="container mx-auto px-0 pb-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 lg:pt-20 lg:pb-5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-3xl">
              <h1 className="text-3xl font-bold text-bb-dark mb-6 leading-tight md:text-5xl">
                Blogs & Insights
              </h1>
              <p className="text-base text-gray-700 mb-4 leading-snug">
                Get clear answers, timely news, and helpful tips from Bobby Brock Insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
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
                        <p className="text-gray-500 text-sm mb-3">{post.publishedDate}</p>
                        <h2 className="text-lg font-bold text-bb-dark mb-2 hover:text-bb-blue transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-700 text-[16px] leading-normal line-clamp-3">{post.excerpt}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              
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

          {/* Sidebar */}
          <aside className="sticky top-0 self-start mt-8 lg:mt-0 lg:w-1/3">
            <BlogSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BlogListing;
