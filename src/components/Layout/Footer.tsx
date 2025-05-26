import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-bb-dark text-white mt-20">
      <div className="container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
          <Link to="/" className="flex items-center">
              <img alt="Bobby Brock Insurance" className="h-16 mb-4" src="https://www.bobbybrockinsurance.com/lovable-uploads/bobby-brock-insurance-logo.png" />
            </Link>
            <p className="text-[16px] leading-snug">
              A nationally recognized Medicare insurance brokerage serving over 50,000 beneficiaries across the United States since 1992.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com/bobbybrockinsurance" aria-label="Facebook" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.youtube.com/@bobbybrockinsurance" aria-label="YouTube" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/bobbybrockinsurance" aria-label="LinkedIn" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          {/* Medicare Basics */}
          <div>
            <p className="text-lg font-bold mb-3">Understand Medicare</p>
            <ul className="space-y-4">
              <li>
                <Link to="/medicare/what-is-medicare" className="text-[16px] hover:text-bb-blue transition-colors">What is Medicare?</Link>
              </li>
              <li>
                <Link to="/medicare/four-parts-of-medicare" className="text-[16px] hover:text-bb-blue transition-colors">The Four Parts of Medicare</Link>
              </li>
              <li>
                <Link to="/medicare/enrollment-periods" className="text-[16px] hover:text-bb-blue transition-colors">Enrollment Periods</Link>
              </li>
              <li>
                <Link to="/medicare/eligibility" className="text-[16px] hover:text-bb-blue transition-colors">Eligibility</Link>
              </li>
              <li>
                <Link to="/medicare/medicare-costs" className="text-[16px] hover:text-bb-blue transition-colors">Medicare Costs</Link>
              </li>
              <li>
                <Link to="/medicare/by-state" className="text-[16px] hover:text-bb-blue transition-colors">Medicare by State</Link>
              </li>
            </ul>
          </div>

          {/* Medicare Plans */}
          <div>
            <p className="text-lg font-bold mb-3">Medicare Plans</p>
            <ul className="space-y-4">
              <li>
                <Link to="/plans/medicare-advantage" className="text-[16px] hover:text-bb-blue transition-colors">Medicare Advantage</Link>
              </li>
              <li>
                <Link to="/plans/medicare-supplements" className="text-[16px] hover:text-bb-blue transition-colors">Medicare Supplements</Link>
              </li>
              <li>
                <Link to="/plans/medicarepartd" className="text-[16px] hover:text-bb-blue transition-colors">Medicare Part D</Link>
              </li>
              <li>
                <Link to="/plans/medicare-add-on-coverage-options" className="text-[16px] hover:text-bb-blue transition-colors">Medicare Add-Ons</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-lg font-bold mb-3">Contact Us</p>
            <div>
            <p>
              <span className="text-[16px]">499 Air Park Rd,</span><br />
              <span className="text-[16px]">Tupelo, MS 38801</span>
              </p>
              <p className="mt-3">
                <span className="text-[16px] font-bold">Phone:</span>{" "}
                <a href="tel:6628443300" className="text-[16px] hover:text-bb-blue transition-colors">(662) 844-3300</a>
              </p>
              <p>
                <span className="text-[16px] font-bold">Email:</span>{" "}
                <span className="text-[16px]"><Link to="mailto:info@bobbybrockinsurance.com">info@bobbybrockinsurance.com</Link></span>
              </p>
            </div>
            <Link to="/contact-us" className="inline-block text-bb-blue hover:underline mt-4">Contact Us →</Link>
          </div>
        </div>

        <div className="mt-12 my-[30px] py-0">
          {/* Medicare Required Disclaimer */}
          
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p className="text-sm">© 2025 Bobby Brock Insurance. All rights reserved. As a national Medicare brokerage, we work with multiple carriers to provide comprehensive plan options. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options. This is not a complete listing of plans available in your service area. For a complete listing please contact 1-800-MEDICARE (TTY users should call 1-877-486-2048), 24 hours a day/7 days a week or consult www.medicare.gov.</p>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-400">
            <p className="text-xs">© {currentYear} Bobby Brock Insurance</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;