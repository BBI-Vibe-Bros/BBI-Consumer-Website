import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { securityHeaders, applyRateLimits } from './src/server/middleware';
import type { ViteDevServer } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: true,
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use(applyRateLimits);
      server.middlewares.use(securityHeaders);
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
