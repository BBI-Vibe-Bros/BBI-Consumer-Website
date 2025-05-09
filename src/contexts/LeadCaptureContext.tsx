import React, { createContext, useContext, useState } from 'react';
import LeadCaptureModal from '@/components/LeadCapture/LeadCaptureModal';

interface LeadCaptureContextType {
  openLeadCapture: (source?: string) => void;
  closeLeadCapture: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export const LeadCaptureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>('Medicare Breakdown');

  const openLeadCapture = (source?: string) => {
    if (source) {
      setSource(source);
    }
    setIsOpen(true);
  };

  const closeLeadCapture = () => {
    setIsOpen(false);
  };

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture, closeLeadCapture }}>
      {children}
      <LeadCaptureModal isOpen={isOpen} onClose={closeLeadCapture} source={source} />
    </LeadCaptureContext.Provider>
  );
};

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);
  if (context === undefined) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
}; 