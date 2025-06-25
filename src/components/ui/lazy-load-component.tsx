import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface LazyLoadComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  height?: number | string;
}

/**
 * LazyLoadComponent provides performant lazy loading for any component
 * using Intersection Observer API. Helps reduce initial bundle size and 
 * improve Core Web Vitals by only rendering content when it's about to be visible.
 * 
 * @param children - The content to lazy load
 * @param fallback - Optional placeholder content while loading
 * @param className - CSS classes for the wrapper
 * @param threshold - Intersection observer threshold (0-1)
 * @param rootMargin - Margin around intersection root
 * @param height - Fixed height for better layout stability
 */
export const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({
  children,
  fallback = null,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  height,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const style = height 
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : undefined;

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
    >
      {isVisible ? children : fallback}
    </div>
  );
};

/**
 * LazyLoadSection - A specialized version for page sections
 * with better default margins and styling
 */
export const LazyLoadSection: React.FC<LazyLoadComponentProps> = ({
  children,
  fallback = (
    <div className="w-full h-32 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400">Loading...</div>
    </div>
  ),
  className = '',
  ...props
}) => {
  return (
    <LazyLoadComponent
      fallback={fallback}
      className={className}
      rootMargin="200px"
      {...props}
    >
      {children}
    </LazyLoadComponent>
  );
};

export default LazyLoadComponent; 