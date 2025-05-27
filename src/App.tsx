import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/utils/scrollToTop";
import { LeadCaptureProvider } from "@/contexts/LeadCaptureContext";
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

// Initialize QueryClient for data fetching
const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <LeadCaptureProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Home page */}
                <Route path="/" element={<Index />} />
                <Route path="/medicare-breakdown" element={<MedicareBreakdown />} />
                <Route path="/avoid-mistakes-with-medicare" element={<AvoidMistakesMedicare />} />
                {/* Medicare basics and information routes */}
                <Route path="/medicare">
                  <Route path="what-is-medicare" element={<MedicareBasics />} />
                  <Route path="enrollment-periods" element={<EnrollmentPeriods />} />
                  <Route path="eligibility" element={<MedicareEligibility />} />
                  <Route path="four-parts-of-medicare" element={<MedicareParts />} />
                  <Route path="medicare-costs" element={<MedicareCosts />} />
                  <Route path="by-state" element={<MedicareByStateListing />} />
                  <Route path="by-state/:state" element={<MedicareByState />} />
                </Route>
                
                {/* Plan routes */}
                <Route path="/plans">
                  <Route path="medicare-advantage" element={<MedicareAdvantage />} />
                  <Route path="medicare-supplements" element={<MedicareSupplement />} />
                  <Route path="medicarepartd" element={<PrescriptionDrugPlans />} />
                  <Route path="medicare-add-on-coverage-options" element={<AdditionalCoverage />} />
                </Route>
                
                {/* Resources routes */}
                <Route path="/resources" element={<ResourceListing />} />
                <Route path="/resources/guides/:slug" element={<ResourceGuide />} />
                <Route path="/resources/calculators" element={<AboutPage />} />
                <Route path="/resources/glossary" element={<AboutPage />} />
                
                {/* Blog and video content */}
                <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/videos" element={<VideoListing />} />
                <Route path="/videos/watch/:slug" element={<VideoPage />} />
                
                {/* Static routes */}
                <Route path="/medicarepartd" element={<PrescriptionDrugPlans />} />
                <Route path="/medicare-supplements" element={<MedicareSupplement />} />
                <Route path="/what-is-medicare" element={<MedicareBasics />} />
                <Route path="/enrollment-periods" element={<EnrollmentPeriods />} />
                <Route path="/eligibility" element={<MedicareEligibility />} />
                <Route path="/four-parts-of-medicare" element={<MedicareParts />} />
                <Route path="/medicare-costs" element={<MedicareCosts />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/client-reviews" element={<ClientTestimonials />} />
                
                {/* Catch all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LeadCaptureProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
