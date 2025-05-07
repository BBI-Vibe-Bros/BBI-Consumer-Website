import { Request, Response, NextFunction } from 'express';
import { securityHeaders } from '../middleware';

describe('Security Headers Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      setHeader: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('should set all required security headers', () => {
    securityHeaders(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    // Check if all security headers are set
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Content-Security-Policy',
      expect.any(String)
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'X-Content-Type-Options',
      'nosniff'
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'X-Frame-Options',
      'DENY'
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'X-XSS-Protection',
      '1; mode=block'
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Referrer-Policy',
      'strict-origin-when-cross-origin'
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()'
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );

    // Check if next() was called
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should include required CSP directives', () => {
    securityHeaders(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    const cspCall = (mockResponse.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy'
    );
    const cspValue = cspCall[1];

    // Check for required CSP directives
    expect(cspValue).toContain("default-src 'self'");
    expect(cspValue).toContain("script-src 'self'");
    expect(cspValue).toContain("style-src 'self'");
    expect(cspValue).toContain("img-src 'self'");
    expect(cspValue).toContain("connect-src 'self'");
    expect(cspValue).toContain("frame-ancestors 'none'");
  });
}); 