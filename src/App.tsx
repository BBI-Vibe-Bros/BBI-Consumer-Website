
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MedicareAdvantage from "./pages/MedicareAdvantage";
import MedicareSupplement from "./pages/MedicareSupplement";
import PrescriptionDrugPlans from "./pages/PrescriptionDrugPlans";
import DentalVisionPlans from "./pages/DentalVisionPlans";

// Initialize QueryClient for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Index />} />
            
            {/* Medicare basics and information routes */}
            <Route path="/medicare">
              <Route path="basics" element={<NotFound />} />
              <Route path="eligibility" element={<NotFound />} />
              <Route path="parts/*" element={<NotFound />} />
            </Route>
            
            {/* Plan routes */}
            <Route path="/plans">
              <Route path="advantage" element={<MedicareAdvantage />} />
              <Route path="supplement" element={<MedicareSupplement />} />
              <Route path="prescription" element={<PrescriptionDrugPlans />} />
              <Route path="dental" element={<DentalVisionPlans />} />
            </Route>
            
            {/* Resources routes */}
            <Route path="/resources">
              <Route path="guides/*" element={<NotFound />} />
              <Route path="calculators" element={<NotFound />} />
              <Route path="glossary" element={<NotFound />} />
            </Route>
            
            {/* Blog and video content */}
            <Route path="/blog/*" element={<NotFound />} />
            <Route path="/videos/watch/*" element={<NotFound />} />
            
            {/* Company information */}
            <Route path="/about" element={<NotFound />} />
            <Route path="/about/team" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/privacy-policy" element={<NotFound />} />
            
            {/* Catch all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
