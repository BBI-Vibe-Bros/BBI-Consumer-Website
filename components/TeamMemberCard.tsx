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
    <div className="bg-white rounded-lg border border-gray-100 flex flex-col overflow-hidden shadow hover:shadow-lg transition-shadow group">
      {/* Top: Square Image */}
      <div className="w-full aspect-square overflow-hidden">
        {isContentfulImage ? (
          // Use regular img tag for Contentful images (already optimized by Contentful CDN)
          <img
            src={imgSrc}
            alt={altText}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            width={200}
            height={200}
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
            width={200}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
          />
        )}
      </div>
      
      {/* Bottom: Info */}
      <div className="p-4 text-center">
        <div className="font-semibold text-gray-900 mb-1">{name}</div>
        <div className="text-sm text-gray-600 mb-2">{title}</div>
        <a
          href={`mailto:${email}`}
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          tabIndex={0}
        >
          {email}
        </a>
      </div>
    </div>
  );
} 