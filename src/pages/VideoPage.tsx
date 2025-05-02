
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

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <VideoTemplate video={templateData} />
      
      <CTASection />
    </Layout>
  );
};

export default VideoPage;
