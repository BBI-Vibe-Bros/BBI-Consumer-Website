
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';

const VideoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  const { data: video, isLoading, error } = useQuery({
    queryKey: ['video', slug],
    queryFn: () => contentfulService.getVideoBySlug(slug || ''),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-60 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !video) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-3xl font-bold text-center">Video Not Found</h1>
          <p className="text-center mt-4">
            We couldn't find the video you're looking for. It might have been removed or the URL might be incorrect.
          </p>
        </div>
      </Layout>
    );
  }

  const videoData = video.fields;
  const publishDate = new Date(video.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Videos', path: '/videos' },
    { label: videoData.title, path: `/videos/watch/${slug}`, isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title={videoData.title}
        description={videoData.description || ''}
        ogImage={videoData.thumbnail?.fields?.file?.url ? `https:${videoData.thumbnail.fields.file.url}` : undefined}
        ogType="video"
        schemaType="video"
        schemaData={{
          thumbnailUrl: videoData.thumbnail?.fields?.file?.url ? `https:${videoData.thumbnail.fields.file.url}` : '',
          uploadDate: video.sys.createdAt,
          duration: videoData.duration || 'PT0M0S',
          embedUrl: videoData.videoUrl || ''
        }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-bb-dark mb-4">{videoData.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span>{publishDate}</span>
            {videoData.duration && (
              <>
                <span className="mx-2">•</span>
                <span>{videoData.duration} mins</span>
              </>
            )}
          </div>

          {videoData.videoUrl && (
            <div className="mb-8 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={videoData.videoUrl}
                title={videoData.title}
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">{videoData.description}</p>
          </div>

          {videoData.tags && videoData.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {videoData.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CTASection />
    </Layout>
  );
};

export default VideoPage;
