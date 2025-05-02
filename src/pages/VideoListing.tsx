import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';

const VideoListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;
  const contentfulService = ContentfulService.getInstance();

  const { data, isLoading } = useQuery({
    queryKey: ['videos', currentPage],
    queryFn: () => contentfulService.getVideos(
      videosPerPage, 
      (currentPage - 1) * videosPerPage
    ),
    placeholderData: (previousData) => previousData,
  });

  const videos = data?.items || [];
  const totalVideos = data?.total || 0;
  const totalPages = Math.ceil(totalVideos / videosPerPage);

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Videos', path: '/videos', isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title="Medicare Video Library"
        description="Watch our educational videos explaining Medicare Advantage, Medicare Supplements, and Part D plans."
        schemaType="webpage"
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bb-dark">Medicare Video Library</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Watch our educational videos to better understand Medicare insurance
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No videos found</h2>
            <p className="text-gray-500 mt-2">Check back soon for new content</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video: any) => {
                const { fields, sys } = video;
                const publishDate = new Date(sys.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <Link 
                    key={sys.id}
                    to={`/videos/watch/${fields.slug}`} 
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="relative">
                      {fields.thumbnail?.fields?.file?.url ? (
                        <img 
                          src={`https:${fields.thumbnail.fields.file.url}`}
                          alt={fields.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200"></div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white bg-opacity-80 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-bb-blue">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                      {fields.duration && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {fields.duration} mins
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-bold text-bb-dark mb-2 hover:text-bb-blue transition-colors">
                        {fields.title}
                      </h2>
                      <p className="text-gray-500 text-sm mb-3">{publishDate}</p>
                      <p className="text-gray-700 line-clamp-2">{fields.description}</p>
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

export default VideoListing;
