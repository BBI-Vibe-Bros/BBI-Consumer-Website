import React from 'react';
import { Button } from '@/components/ui/button';

const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
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