import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: !isLoaded ? '#f3f4f6' : 'transparent',
        display: 'block',
        position: 'relative',
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        decoding={priority ? 'sync' : 'async'}
        style={{ display: 'block', width: '100%', height: '100%', objectFit }}
      />
    </div>
  );
};

export default OptimizedImage; 