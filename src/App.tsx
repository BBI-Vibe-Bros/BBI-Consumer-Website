import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { PageErrorBoundary, SectionErrorBoundary } from "@/components/ErrorBoundary";
import ScrollToTop from "@/utils/scrollToTop";
import { LeadCaptureProvider } from "@/contexts/LeadCaptureContext";
import PWAUpdatePrompt from "@/components/PWAUpdatePrompt";
import { useWebVitals } from "@/hooks/use-web-vitals";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MedicareAdvantage from "./pages/MedicareAdvantage";
import MedicareSupplement from "./pages/MedicareSupplement";
import PrescriptionDrugPlans from "./pages/PrescriptionDrugPlans";
import AdditionalCoverage from "./pages/AdditionalCoverage";
import BlogPost from "./pages/BlogPost";
import VideoPage from "./pages/VideoPage";
import ResourceGuide from "./pages/ResourceGuide";
import BlogListing from "./pages/BlogListing";
import VideoListing from "./pages/VideoListing";
import ResourceListing from "./pages/ResourceListing";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MedicareBasics from "./pages/MedicareBasics";
import MedicareEligibility from "./pages/MedicareEligibility";
import MedicareParts from "./pages/MedicareParts";
import EnrollmentPeriods from "./pages/EnrollmentPeriods";
import TeamPage from "./pages/TeamPage";
import MedicareCosts from './pages/MedicareCosts';
import MedicareBreakdown from './pages/MedicareBreakdown';
import ClientTestimonials from './pages/ClientTestimonials';
import MedicareByState from './pages/MedicareByState';
import MedicareByStateListing from './pages/MedicareByStateListing';
import TermsOfService from './pages/TermsOfService';
import AvoidMistakesMedicare from './pages/AvoidMistakesMedicare';
import GaryAlfordInsurance from './pages/GaryAlfordInsurance';

// Initialize QueryClient for data fetching with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on client errors (4xx), but do retry on server errors (5xx)
        if ((error as any)?.status >= 400 && (error as any)?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});

// Error logging function for production
const logApplicationError = (error: Error, errorInfo: React.ErrorInfo): void => {
  if (import.meta.env.PROD) {
    // Log to your error reporting service (e.g., Sentry, LogRocket, etc.)
    console.error('Application Error:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }
};

// Performance monitoring component
const PerformanceMonitor: React.FC = () => {
  useWebVitals({
    debug: import.meta.env.DEV,
    reportToAnalytics: import.meta.env.PROD,
    onLCP: (metric) => {
      if (metric.rating === 'poor') {
        console.warn('[Performance] Poor LCP detected:', metric.value);
      }
    },
    onCLS: (metric) => {
      if (metric.rating === 'poor') {
        console.warn('[Performance] Poor CLS detected:', metric.value);
      }
    },
    onFID: (metric) => {
      if (metric.rating === 'poor') {
        console.warn('[Performance] Poor FID detected:', metric.value);
      }
    },
  });
  return null;
};

const App = () => (
  <PageErrorBoundary onError={logApplicationError}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <LeadCaptureProvider>
            <SectionErrorBoundary componentName="Performance Monitoring">
              <PerformanceMonitor />
            </SectionErrorBoundary>
            <SectionErrorBoundary componentName="Notifications">
              <Toaster />
              <Sonner />
            </SectionErrorBoundary>
            <SectionErrorBoundary componentName="PWA">
              <PWAUpdatePrompt />
            </SectionErrorBoundary>
            <BrowserRouter>
              <ScrollToTop />
              <SectionErrorBoundary componentName="Router">
                <Routes>
                  {/* Home page */}
                  <Route path="/" element={
                    <PageErrorBoundary>
                      <Index />
                    </PageErrorBoundary>
                  } />
                  <Route path="/medicare-breakdown" element={
                    <PageErrorBoundary>
                      <MedicareBreakdown />
                    </PageErrorBoundary>
                  } />
                  <Route path="/avoid-mistakes-with-medicare" element={
                    <PageErrorBoundary>
                      <AvoidMistakesMedicare />
                    </PageErrorBoundary>
                  } />
                  
                  {/* Medicare basics and information routes */}
                  <Route path="/medicare">
                    <Route path="what-is-medicare" element={
                      <PageErrorBoundary>
                        <MedicareBasics />
                      </PageErrorBoundary>
                    } />
                    <Route path="enrollment-periods" element={
                      <PageErrorBoundary>
                        <EnrollmentPeriods />
                      </PageErrorBoundary>
                    } />
                    <Route path="eligibility" element={
                      <PageErrorBoundary>
                        <MedicareEligibility />
                      </PageErrorBoundary>
                    } />
                    <Route path="four-parts-of-medicare" element={
                      <PageErrorBoundary>
                        <MedicareParts />
                      </PageErrorBoundary>
                    } />
                    <Route path="medicare-costs" element={
                      <PageErrorBoundary>
                        <MedicareCosts />
                      </PageErrorBoundary>
                    } />
                    <Route path="by-state" element={
                      <PageErrorBoundary>
                        <MedicareByStateListing />
                      </PageErrorBoundary>
                    } />
                    <Route path="by-state/:state" element={
                      <PageErrorBoundary>
                        <MedicareByState />
                      </PageErrorBoundary>
                    } />
                  </Route>
                  
                  {/* Plan routes */}
                  <Route path="/plans">
                    <Route path="medicare-advantage" element={
                      <PageErrorBoundary>
                        <MedicareAdvantage />
                      </PageErrorBoundary>
                    } />
                    <Route path="medicare-supplements" element={
                      <PageErrorBoundary>
                        <MedicareSupplement />
                      </PageErrorBoundary>
                    } />
                    <Route path="medicarepartd" element={
                      <PageErrorBoundary>
                        <PrescriptionDrugPlans />
                      </PageErrorBoundary>
                    } />
                    <Route path="medicare-add-on-coverage-options" element={
                      <PageErrorBoundary>
                        <AdditionalCoverage />
                      </PageErrorBoundary>
                    } />
                  </Route>
                  
                  {/* Resources routes */}
                  <Route path="/resources" element={
                    <PageErrorBoundary>
                      <ResourceListing />
                    </PageErrorBoundary>
                  } />
                  <Route path="/resources/guides/:slug" element={
                    <PageErrorBoundary>
                      <ResourceGuide />
                    </PageErrorBoundary>
                  } />
                  <Route path="/resources/calculators" element={
                    <PageErrorBoundary>
                      <AboutPage />
                    </PageErrorBoundary>
                  } />
                  <Route path="/resources/glossary" element={
                    <PageErrorBoundary>
                      <AboutPage />
                    </PageErrorBoundary>
                  } />
                  
                  {/* Blog and video content */}
                  <Route path="/blog" element={
                    <PageErrorBoundary>
                      <BlogListing />
                    </PageErrorBoundary>
                  } />
                  <Route path="/blog/:slug" element={
                    <PageErrorBoundary>
                      <BlogPost />
                    </PageErrorBoundary>
                  } />
                  <Route path="/videos" element={
                    <PageErrorBoundary>
                      <VideoListing />
                    </PageErrorBoundary>
                  } />
                  <Route path="/videos/watch/:slug" element={
                    <PageErrorBoundary>
                      <VideoPage />
                    </PageErrorBoundary>
                  } />
                  
                  {/* Static routes */}
                  <Route path="/medicarepartd" element={
                    <PageErrorBoundary>
                      <PrescriptionDrugPlans />
                    </PageErrorBoundary>
                  } />
                  <Route path="/medicare-supplements" element={
                    <PageErrorBoundary>
                      <MedicareSupplement />
                    </PageErrorBoundary>
                  } />
                  <Route path="/what-is-medicare" element={
                    <PageErrorBoundary>
                      <MedicareBasics />
                    </PageErrorBoundary>
                  } />
                  <Route path="/enrollment-periods" element={
                    <PageErrorBoundary>
                      <EnrollmentPeriods />
                    </PageErrorBoundary>
                  } />
                  <Route path="/eligibility" element={
                    <PageErrorBoundary>
                      <MedicareEligibility />
                    </PageErrorBoundary>
                  } />
                  <Route path="/four-parts-of-medicare" element={
                    <PageErrorBoundary>
                      <MedicareParts />
                    </PageErrorBoundary>
                  } />
                  <Route path="/medicare-costs" element={
                    <PageErrorBoundary>
                      <MedicareCosts />
                    </PageErrorBoundary>
                  } />
                  <Route path="/about-us" element={
                    <PageErrorBoundary>
                      <AboutPage />
                    </PageErrorBoundary>
                  } />
                  <Route path="/team" element={
                    <PageErrorBoundary>
                      <TeamPage />
                    </PageErrorBoundary>
                  } />
                  <Route path="/contact-us" element={
                    <PageErrorBoundary>
                      <ContactPage />
                    </PageErrorBoundary>
                  } />
                  <Route path="/privacy-policy" element={
                    <PageErrorBoundary>
                      <PrivacyPolicy />
                    </PageErrorBoundary>
                  } />
                  <Route path="/terms-of-service" element={
                    <PageErrorBoundary>
                      <TermsOfService />
                    </PageErrorBoundary>
                  } />
                  <Route path="/client-reviews" element={
                    <PageErrorBoundary>
                      <ClientTestimonials />
                    </PageErrorBoundary>
                  } />
                  <Route path="/gary-alford-insurance" element={
                    <PageErrorBoundary>
                      <GaryAlfordInsurance />
                    </PageErrorBoundary>
                  } />
                  
                  {/* Catch all for 404 */}
                  <Route path="*" element={
                    <PageErrorBoundary>
                      <NotFound />
                    </PageErrorBoundary>
                  } />
                </Routes>
              </SectionErrorBoundary>
            </BrowserRouter>
          </LeadCaptureProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </PageErrorBoundary>
);

export default App;
