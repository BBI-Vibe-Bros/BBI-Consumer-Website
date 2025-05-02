
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import SEO from "@/utils/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <SEO 
        title="Page Not Found"
        description="The page you are looking for cannot be found. Return to Bobby Brock Insurance homepage."
        noIndex={true}
      />
      
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center max-w-lg">
          <h1 className="text-5xl font-bold text-bb-blue mb-4">404</h1>
          <h2 className="text-3xl font-bold text-bb-dark mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-700 mb-8">
            We're sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button className="bg-bb-blue hover:bg-bb-light-blue text-xl font-medium">
                Return to Home
              </Button>
            </Link>
            <p className="text-lg mt-6">
              Need assistance with Medicare? Call us at{" "}
              <a href="tel:6626421512" className="text-bb-blue font-medium hover:underline">
                (662) 642-1512
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
