import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface VideoTemplateProps {
  video: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    transcript?: string;
    relatedVideos?: Array<{
      title: string;
      slug: string;
      thumbnailUrl: string;
    }>;
  };
}

const VideoTemplate = ({ video }: VideoTemplateProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  // Process video URL to handle different platforms
  const getEmbedUrl = (url: string) => {
    try {
      // YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&loading=lazy` : url;
      }
      // Vimeo
      if (url.includes('vimeo.com')) {
        const videoId = url.match(/vimeo.com\/(\d+)/)?.[1];
        return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0&dnt=1` : url;
      }
      // Default to original URL
      return url;
    } catch (err) {
      console.error('Error processing video URL:', err);
      return url;
    }
  };

  useEffect(() => {
    // Preload the thumbnail
    if (video.thumbnailUrl) {
      const img = new Image();
      img.src = video.thumbnailUrl;
    }

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPlayerVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      observer.observe(videoContainer);
    }

    return () => {
      observer.disconnect();
    };
  }, [video.thumbnailUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load video. Please try again later.');
  };

  return (
    <div className="container mx-auto px-0 py-2">
      {/* Video Player Section */}
      <section className="mb-8">
        <div id="video-container" className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                {video.thumbnailUrl && (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                )}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-blue z-10"></div>
              </div>
            )}
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <p className="text-red-600 mb-2">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-bb-blue hover:text-bb-blue/80 underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : isPlayerVisible && (
              <iframe
                src={getEmbedUrl(video.videoUrl)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </section>

      {/* Video Information */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <p className="text-gray-700 mb-4">{video.description}</p>
      </section>

      {/* Transcript Section */}
      {video.transcript && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
          <div className="prose max-w-none">
            {video.transcript}
          </div>
        </section>
      )}

      {/* Related Videos */}
      {video.relatedVideos && video.relatedVideos.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Related Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {video.relatedVideos.map((related) => (
              <Link
                key={related.slug}
                to={`/videos/watch/${related.slug}`}
                className="block group"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={related.thumbnailUrl}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium group-hover:text-bb-blue">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default VideoTemplate;
