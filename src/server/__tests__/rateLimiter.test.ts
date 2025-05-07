import { Request, Response, NextFunction } from 'express';
import { apiLimiter, authLimiter, formLimiter, contentfulLimiter, healthCheckLimiter } from '../rateLimiter';

describe('Rate Limiters', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      ip: '127.0.0.1',
      headers: {},
    };
    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('API Limiter', () => {
    it('should allow requests within limit', async () => {
      await apiLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests over limit', async () => {
      // Simulate hitting the limit
      for (let i = 0; i < 101; i++) {
        await apiLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      }
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.send).toHaveBeenCalledWith('Too many requests from this IP, please try again later.');
    });
  });

  describe('Auth Limiter', () => {
    it('should allow requests within limit', async () => {
      await authLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests over limit', async () => {
      // Simulate hitting the limit
      for (let i = 0; i < 6; i++) {
        await authLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      }
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.send).toHaveBeenCalledWith('Too many authentication attempts, please try again later.');
    });
  });

  describe('Form Limiter', () => {
    it('should allow requests within limit', async () => {
      await formLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests over limit', async () => {
      // Simulate hitting the limit
      for (let i = 0; i < 11; i++) {
        await formLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      }
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.send).toHaveBeenCalledWith('Too many form submissions, please try again later.');
    });
  });

  describe('Contentful Limiter', () => {
    it('should allow requests within limit', async () => {
      await contentfulLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests over limit', async () => {
      // Simulate hitting the limit
      for (let i = 0; i < 31; i++) {
        await contentfulLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      }
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.send).toHaveBeenCalledWith('Too many content requests, please try again later.');
    });
  });

  describe('Health Check Limiter', () => {
    it('should allow requests within limit', async () => {
      await healthCheckLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests over limit', async () => {
      // Simulate hitting the limit
      for (let i = 0; i < 61; i++) {
        await healthCheckLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
      }
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.send).toHaveBeenCalledWith('Too many health check requests, please try again later.');
    });
  });
}); 