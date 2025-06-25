import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { securityHeaders, applyRateLimits } from './src/server/middleware';
import type { ViteDevServer } from 'vite';
import sitemap from 'vite-plugin-sitemap';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Use only valid properties for the React SWC plugin
      jsxImportSource: "react",
      // Ensure proper React imports
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic'
          }]
        ]
      }
    }),
    mode === 'development' &&
    componentTagger(),
    sitemap({
      hostname: 'https://www.bobbybrockinsurance.com',
      dynamicRoutes: [
        // Home and main pages
        '/',
        '/about-us',
        '/about-us/team',
        '/contact-us',
        '/privacy-policy',
        '/client-reviews',
        '/medicare-breakdown',
        
        // Medicare basics and information
        '/medicare/what-is-medicare',
        '/medicare/four-parts-of-medicare',
        '/medicare/enrollment-periods',
        '/medicare/medicare-costs',
        '/medicare/eligibility',
        '/medicare/by-state',
        '/medicare/by-state/florida',
        '/medicare/by-state/mississippi',
        '/medicare/by-state/alabama',
        '/medicare/by-state/tennessee',
        '/medicare/by-state/arkansas',
        '/medicare/by-state/louisiana',
        
        // Plan routes
        '/plans/medicare-advantage',
        '/plans/medicare-supplements',
        '/plans/medicarepartd',
        '/plans/medicare-add-on-coverage-options',
        
        // Resources
        '/resources',
        
        // Content sections
        '/blog',
        '/videos',
        
        // Legacy routes (for SEO)
        '/medicarepartd',
        '/medicare-supplements',
        '/what-is-medicare',
        '/enrollment-periods',
        '/eligibility',
        '/four-parts-of-medicare',
        '/medicare-costs'
      ],
      exclude: [
        '/404',
        '/admin/**',
        '/api/**',
        '/resources/guides/**', // These are dynamic and will be handled by the CMS
        '/blog/**', // These are dynamic and will be handled by the CMS
        '/videos/watch/**' // These are dynamic and will be handled by the CMS
      ],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }),
    // PWA Plugin for Service Worker and Caching
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit for large hero images
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.contentful\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'contentful-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/images\.ctfassets\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'contentful-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        navigateFallback: null, // Don't cache navigation requests to avoid issues with dynamic routes
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: 'Bobby Brock Insurance',
        short_name: 'BBI',
        description: 'Medicare insurance guidance and plan comparison for seniors',
        theme_color: '#002a3a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/BBI-favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/BBI-favicon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    // Bundle Analyzer (only in analyze mode)
    mode === 'analyze' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-dialog'],
          contentful: ['@contentful/rich-text-types', '@contentful/rich-text-react-renderer'],
        },
      },
    },
    // Performance optimizations
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      '@contentful/rich-text-react-renderer',
    ],
  },
     // Performance and warmup configuration
   server: {
     ...(mode === 'development' && {
       warmup: {
         clientFiles: [
           './src/App.tsx',
           './src/main.tsx',
           './src/components/Layout/Layout.tsx',
           './src/components/Layout/Header.tsx',
           './src/services/contentfulService.ts',
         ],
       },
     }),
    host: "localhost",
    port: 3000,
    strictPort: false,
    middlewareMode: false, // Disabled for development
    configureServer: (server: ViteDevServer) => {
      if (mode === 'production') {
        server.middlewares.use(applyRateLimits);
        server.middlewares.use(securityHeaders);
      }
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // Add Contentful API proxy for security
      '/contentful-api': {
        target: 'https://cdn.contentful.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/contentful-api/, ''),
        configure: (proxy, options) => {
          // Add Contentful authentication headers server-side
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add the access token as a header instead of query param
            proxyReq.setHeader('Authorization', `Bearer ${process.env.VITE_CONTENTFUL_ACCESS_TOKEN}`);
          });
        },
      },
    }
  },
}));
