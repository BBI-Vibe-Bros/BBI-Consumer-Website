import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show the footer when scrolling
      setIsVisible(true);

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to hide the footer after 2 seconds of no scrolling
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      setScrollTimeout(timeout);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a 
        href="https://go.bobbybrockinsurance.com/appointment/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button 
          className="w-full bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark hover:text-bb-dark font-bold text-base py-2"
        >
          Schedule an Appointment
        </Button>
      </a>
    </div>
  );
};

export default StickyFooter; 