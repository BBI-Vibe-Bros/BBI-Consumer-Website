import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';
import VideoTemplate from '@/components/Templates/VideoTemplate';

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

  // Transform data for VideoTemplate
  const templateData = {
    title: videoData.title,
    description: videoData.description || '',
    videoUrl: videoData.videoUrl || '',
    thumbnailUrl: videoData.thumbnail?.fields?.file?.url ? `https:${videoData.thumbnail.fields.file.url}` : '',
    transcript: videoData.transcript || '',
    relatedVideos: videoData.relatedVideos?.map((relatedVideo: any) => ({
      title: relatedVideo.fields.title,
      slug: relatedVideo.fields.slug,
      thumbnailUrl: relatedVideo.fields.thumbnail?.fields?.file?.url 
        ? `https:${relatedVideo.fields.thumbnail.fields.file.url}`
        : ''
    })) || []
  };

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

      <div className="bg-0">
        <div className="container mx-auto px-0 pb-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 mb-[-4]lg:pt-20 lg:pb-5">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div className="max-w-7xl object-cover">
              <h1 className="text-3xl font-bold text-bb-dark mb-6 leading-tight md:text-5xl">
                {videoData.title}
              </h1>
              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                {videoData.description}
              </p>
              <p className="text-sm text-gray-500">
                Published on {publishDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-[65%]">
            <article className="prose max-w-none lg:prose-lg">
              <VideoTemplate video={templateData} />
            </article>
          </div>

          {/* Sidebar */}
          <aside className="sticky top-0 self-start mt-8 lg:mt-0 lg:w-1/4">
            {templateData.relatedVideos.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-bb-dark mb-4">Related Videos</h3>
                <div className="space-y-4">
                  {templateData.relatedVideos.map((relatedVideo) => (
                    <a
                      key={relatedVideo.slug}
                      href={`/videos/watch/${relatedVideo.slug}`}
                      className="block hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    >
                      {relatedVideo.thumbnailUrl && (
                        <img
                          src={relatedVideo.thumbnailUrl}
                          alt={relatedVideo.title}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      )}
                      <h4 className="text-sm font-semibold text-bb-dark hover:text-bb-blue">
                        {relatedVideo.title}
                      </h4>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default VideoPage;
