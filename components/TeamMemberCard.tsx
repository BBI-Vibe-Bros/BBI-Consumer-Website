import React from 'react';
import { TeamMember } from '@/types/index';
import OptimizedImage from '@/components/ui/optimized-image';

interface TeamMemberCardProps {
  name: string;
  title: string;
  image: string;
  email: string;
}

export default function TeamMemberCard({ name, title, image, email }: TeamMemberCardProps) {
  // Check if image is a Contentful URL (starts with https://)
  const isContentfulImage = image.startsWith('https://');
  
  // For Contentful images, use the URL directly
  // For local images, use the team directory path
  const imgSrc = isContentfulImage ? image : `/team/${image}`;
  const altText = `${name} - ${title}`;

  return (
    <div className="group text-center">
      {/* Square Image */}
      <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-sm transition-all duration-300 group-hover:shadow-lg">
        {isContentfulImage ? (
          // Use regular img tag for Contentful images (already optimized by Contentful CDN)
          <img
            src={imgSrc}
            alt={altText}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            width={192}
            height={192}
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if Contentful image fails
              const target = e.target as HTMLImageElement;
              target.src = '/team/female-placeholder.png';
            }}
          />
        ) : (
          // Use OptimizedImage for local team images
          <OptimizedImage
            src={imgSrc}
            alt={altText}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            width={192}
            height={192}
            sizes="192px"
            placeholder="blur"
          />
        )}
      </div>
      
      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
        <a
          href={`mailto:${email}`}
          className="inline-block text-xs text-blue-600 hover:text-blue-800 transition-colors mt-1 hover:underline"
          tabIndex={0}
        >
          {email}
        </a>
      </div>
    </div>
  );
} 