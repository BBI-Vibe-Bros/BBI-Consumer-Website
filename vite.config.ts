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
        '/',
        '/about',
        '/contact',
        '/services',
        '/blog',
        '/medicare',
        '/auto-insurance',
        '/home-insurance',
        '/life-insurance',
        '/business-insurance'
      ],
      exclude: [
        '/404',
        '/admin/**'
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
