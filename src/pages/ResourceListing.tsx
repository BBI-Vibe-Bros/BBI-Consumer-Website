
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';

const ResourceListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 9;
  const contentfulService = ContentfulService.getInstance();

  const { data, isLoading } = useQuery({
    queryKey: ['resourceGuides', currentPage],
    queryFn: () => contentfulService.getResourceGuides(
      resourcesPerPage, 
      (currentPage - 1) * resourcesPerPage
    ),
    placeholderData: (previousData) => previousData,
  });

  const resources = data?.items || [];
  const totalResources = data?.total || 0;
  const totalPages = Math.ceil(totalResources / resourcesPerPage);

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources/guides', isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title="Medicare Resources & Guides"
        description="Access comprehensive Medicare resource guides to help you understand your Medicare options and make informed decisions."
        schemaType="webpage"
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bb-dark">Medicare Resources & Guides</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Access comprehensive guides to help you understand Medicare and make informed decisions
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No resources found</h2>
            <p className="text-gray-500 mt-2">Check back soon for new content</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource: any) => {
                const { fields, sys } = resource;
                const updatedDate = new Date(sys.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <Link 
                    key={sys.id}
                    to={`/resources/guides/${fields.slug}`} 
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100"
                  >
                    {fields.coverImage?.fields?.file?.url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={`https:${fields.coverImage.fields.file.url}`}
                          alt={fields.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-grow">
                      {fields.category && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mb-2 inline-block">
                          {fields.category}
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-bb-dark mb-2 hover:text-bb-blue transition-colors">
                        {fields.title}
                      </h2>
                      <p className="text-gray-500 text-sm mb-3">Updated: {updatedDate}</p>
                      <p className="text-gray-700 line-clamp-3">{fields.summary}</p>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="text-bb-blue font-medium flex items-center gap-1">
                        Read guide
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    &larr;
                  </button>
                  
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          pageNum === currentPage
                            ? 'bg-bb-blue text-white'
                            : 'border border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    aria-label="Next page"
                  >
                    &rarr;
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <CTASection />
    </Layout>
  );
};

export default ResourceListing;
