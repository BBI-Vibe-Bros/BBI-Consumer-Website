import { Request, Response, NextFunction } from 'express';
import { apiLimiter, authLimiter, formLimiter, contentfulLimiter, healthCheckLimiter } from './rateLimiter';

// Define CSP policy
const cspPolicy = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://cdn.gpteng.co',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'https://images.ctfassets.net',
    'https://lovable.dev'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com'
  ],
  'connect-src': [
    "'self'",
    'https://cdn.contentful.com',
    'https://api.contentful.com',
    'https://www.google-analytics.com'
  ],
  'frame-src': [
    "'self'",
    'https://www.youtube.com'
  ],
  'media-src': [
    "'self'",
    'https://images.ctfassets.net'
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

// Convert CSP policy object to string
const cspString = Object.entries(cspPolicy)
  .map(([key, value]) => `${key} ${value.join(' ')}`)
  .join('; ');

// Apply rate limiters based on route
export const applyRateLimits = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  
  // Apply specific rate limiters based on route
  if (path.startsWith('/api/auth')) {
    return authLimiter(req, res, next);
  } else if (path.startsWith('/api/forms')) {
    return formLimiter(req, res, next);
  } else if (path.startsWith('/api/content')) {
    return contentfulLimiter(req, res, next);
  } else if (path === '/api/health') {
    return healthCheckLimiter(req, res, next);
  } else if (path.startsWith('/api')) {
    return apiLimiter(req, res, next);
  }
  
  next();
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Content Security Policy
  res.setHeader('Content-Security-Policy', cspString);
  
  // Core security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Additional security headers
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  
  next();
}; 