import React from 'react';
import { useLocation } from 'react-router-dom';
import UnderstandMedicare from './UnderstandMedicare';

const EnrollmentPeriods = () => {
  const location = useLocation();
  const slug = location.pathname.split('/').pop() || 'enrollment-periods';
  return <UnderstandMedicare slug={slug} />;
};

export default EnrollmentPeriods; 