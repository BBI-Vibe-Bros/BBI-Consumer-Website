import { useEffect, useRef } from 'react';

type MetricType = 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB';

interface Metric {
  name: MetricType;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface WebVitalsConfig {
  onCLS?: (metric: Metric) => void;
  onFCP?: (metric: Metric) => void;
  onFID?: (metric: Metric) => void;
  onLCP?: (metric: Metric) => void;
  onTTFB?: (metric: Metric) => void;
  reportToAnalytics?: boolean;
  debug?: boolean;
}

/**
 * Hook to monitor Core Web Vitals and performance metrics
 * Tracks LCP, FID, CLS, FCP, and TTFB for performance optimization
 */
export function useWebVitals(config: WebVitalsConfig = {}) {
  const metricsRef = useRef<Map<string, Metric>>(new Map());
  const {
    onCLS,
    onFCP,
    onFID,
    onLCP,
    onTTFB,
    reportToAnalytics = false,
    debug = false,
  } = config;

  const logMetric = (metric: Metric) => {
    if (debug) {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // Store metric
    metricsRef.current.set(metric.name, metric);

    // Report to analytics if enabled
    if (reportToAnalytics && typeof window !== 'undefined') {
      // Send to Google Analytics 4 if available
      if ('gtag' in window) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          metric_id: metric.id,
        });
      }

      // Send to other analytics platforms
      if ('dataLayer' in window) {
        (window as any).dataLayer?.push({
          event: 'web_vitals',
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
    }

    // Call specific metric handlers
    switch (metric.name) {
      case 'CLS':
        onCLS?.(metric);
        break;
      case 'FCP':
        onFCP?.(metric);
        break;
      case 'FID':
        onFID?.(metric);
        break;
      case 'LCP':
        onLCP?.(metric);
        break;
      case 'TTFB':
        onTTFB?.(metric);
        break;
    }
  };

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Dynamic import of web-vitals library
    const initWebVitals = async () => {
      try {
        // Use CDN version to avoid adding to bundle
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
        script.onload = () => {
          if ('webVitals' in window) {
            const { getCLS, getFCP, getFID, getLCP, getTTFB } = (window as any).webVitals;
            
            // Monitor all Core Web Vitals
            getCLS(logMetric);
            getFCP(logMetric);
            getFID(logMetric);
            getLCP(logMetric);
            getTTFB(logMetric);
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.warn('[Web Vitals] Failed to load web-vitals library:', error);
      }
    };

    initWebVitals();

    // Custom performance observations
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            size?: number;
            element?: Element;
          };
          
          if (debug) {
            console.log('[LCP] Candidate element:', lastEntry.element);
            console.log('[LCP] Size:', lastEntry.size);
            console.log('[LCP] Start time:', lastEntry.startTime);
          }
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support LCP observation
      }

      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (debug && entry.hadRecentInput === false) {
            console.log('[CLS] Layout shift detected:', {
              value: entry.value,
              sources: entry.sources?.map((source: any) => source.node),
            });
          }
        });
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Browser doesn't support CLS observation
      }

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, [debug, reportToAnalytics, onCLS, onFCP, onFID, onLCP, onTTFB]);

  const getMetrics = () => {
    return Object.fromEntries(metricsRef.current);
  };

  const getMetricsByRating = () => {
    const metrics = getMetrics();
    return {
      good: Object.values(metrics).filter(m => m.rating === 'good'),
      needsImprovement: Object.values(metrics).filter(m => m.rating === 'needs-improvement'),
      poor: Object.values(metrics).filter(m => m.rating === 'poor'),
    };
  };

  return {
    getMetrics,
    getMetricsByRating,
  };
} 