import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface DropdownCalloutProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon?: LucideIcon;
  bgColor?: string;
  textColor?: string;
}

const DropdownCallout: React.FC<DropdownCalloutProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
  icon: Icon,
  bgColor = "bg-gray-50",
  textColor = "text-blue-500"
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 flex flex-col justify-center shadow-sm`}>
      <div className="font-bold text-base text-gray-800 mb-1.5">{title}</div>
      <div className="text-gray-500 text-sm mb-3">{description}</div>
      <Link 
        to={ctaLink} 
        className={`${textColor} font-semibold text-sm flex items-center gap-1 hover:underline`}
      >
        {ctaText}
        {Icon && <Icon className="h-4 w-4" />}
      </Link>
    </div>
  );
};

export default DropdownCallout; 