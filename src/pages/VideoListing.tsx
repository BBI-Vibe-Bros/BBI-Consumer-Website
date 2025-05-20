import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import { Button } from '@/components/ui/button';

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
        schemaType="collectionpage"
        schemaData={{
          mainEntity: videos.map((video: any) => ({
            '@type': 'VideoObject',
            name: video.fields.title,
            description: video.fields.description || '',
            thumbnailUrl: video.fields.thumbnailImage?.fields?.file?.url 
              ? `https:${video.fields.thumbnailImage.fields.file.url}`
              : '',
            uploadDate: video.sys.createdAt,
            duration: video.fields.duration || 'PT0M0S',
            contentUrl: video.fields.videoUrl || '',
            embedUrl: video.fields.videoUrl || '',
            transcript: video.fields.transcript || '',
            author: video.fields.author?.fields?.name || 'Bobby Brock Insurance',
            keywords: video.fields.keywords || ['Medicare', 'Insurance', 'Education'],
            inLanguage: 'en-US',
            isFamilyFriendly: true,
            genre: 'Educational'
          })),
          about: {
            '@type': 'Thing',
            name: 'Medicare Education Videos',
            description: 'A collection of educational videos about Medicare insurance plans and coverage options.'
          },
          audience: {
            '@type': 'Audience',
            audienceType: 'Medicare Beneficiaries and Caregivers'
          }
        }}
      />

      <div>
        <div className="container mx-auto">
          <div className="-ml-5 -py-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((video: any) => {
                const { fields, sys } = video;
                const publishDate = fields.uploadDate
                  ? new Date(fields.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown date';

                return (
                  <div 
                    key={sys.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100"
                  >
                    <Link 
                      to={`/videos/watch/${fields.slug}`} 
                      className="flex flex-col flex-1"
                    >
                      <div className="relative">
                        {fields.thumbnailImage?.fields?.file?.url ? (
                          <img 
                            src={`https:${fields.thumbnailImage.fields.file.url}`}
                            alt={fields.title}
                            className="w-full object-cover transition-transform hover:scale-105"
                            loading="lazy"
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
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-gray-500 text-sm mb-1">{publishDate}</p>
                        <h2 className="text-lg font-bold text-bb-dark mb-2 hover:text-bb-blue transition-colors">
                          {fields.title}
                        </h2>
                        <p className="text-gray-700 text-[16px] leading-normal line-clamp-3 flex-1">{fields.description}</p>
                      </div>
                    </Link>
                    <div className="p-5 pt-0">
                      <Link 
                        to={`/videos/watch/${fields.slug}`} 
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-bb-blue text-white hover:bg-bb-blue/90 h-10 px-4 py-2 w-full"
                      >
                        Watch Now »
                      </Link>
                    </div>
                  </div>
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

    </Layout>
  );
};

export default VideoListing;
