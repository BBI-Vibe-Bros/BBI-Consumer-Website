import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { securityHeaders, applyRateLimits } from './src/server/middleware';
import type { ViteDevServer } from 'vite';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
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
    }
  },
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
        '/medicare/by-state/florida',
        
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
        '/videos/watch/**', // These are dynamic and will be handled by the CMS
        '/medicare/by-state/**' // State pages are dynamic and will be handled by the CMS
      ],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
