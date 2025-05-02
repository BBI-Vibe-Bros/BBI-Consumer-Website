import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-bb-dark text-white mt-20">
      <div className="container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Bobby Brock Insurance</h3>
            <p className="text-lg mb-4">
              Your trusted Medicare insurance agency in Tupelo, Mississippi. We're here to help you find the right coverage for your needs.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" aria-label="Facebook" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-bb-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
            </div>
          </div>

          {/* Medicare Plans */}
          <div>
            <h3 className="text-xl font-bold mb-6">Medicare Plans</h3>
            <ul className="space-y-4 text-lg">
              <li>
                <Link to="/plans/advantage" className="hover:text-bb-blue transition-colors">Medicare Advantage</Link>
              </li>
              <li>
                <Link to="/plans/supplement" className="hover:text-bb-blue transition-colors">Medicare Supplement</Link>
              </li>
              <li>
                <Link to="/plans/prescription" className="hover:text-bb-blue transition-colors">Medicare Part D</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-bb-blue transition-colors">Medicare Plans</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <address className="not-italic text-lg space-y-3">
              <p>499 Air Park Rd</p>
              <p>Tupelo, MS 38801</p>
              <p className="mt-4">
                <span className="font-bold">Phone:</span>{" "}
                <a href="tel:6626421512" className="hover:text-bb-blue transition-colors">(662) 642-1512</a>
              </p>
              <p>
                <span className="font-bold">Fax:</span>{" "}
                <span>(662) 844-3600</span>
              </p>
            </address>
            <Link to="/contact" className="inline-block text-bb-blue hover:underline mt-4">Contact Us →</Link>
          </div>
        </div>

        <div className="mt-12  my-[30px] py-0">
          {/* Medicare Required Disclaimer */}
          
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p className="text-sm">© 2025 Bobby Brock Insurance. All rights reserved. We work with every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options. This is not a complete listing of plans available in your service area. For a complete listing please contact 1-800-MEDICARE (TTY users should call 1-877-486-2048), 24 hours a day/7 days a week or consult www.medicare.gov.</p>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-400">
            <p>© {currentYear} Bobby Brock Insurance</p>
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