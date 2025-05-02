
import React from 'react';
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
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Video Player Section */}
      <section className="mb-8">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
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
