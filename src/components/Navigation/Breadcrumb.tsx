import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Generate schema for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://bobbybrock.com${item.path}`
    }))
  };

  // Helper to determine pill color
  const getPillClass = (_index: number, isLast: boolean) => {
    // Only the active (current) breadcrumb is yellow, all others are blue
    return isLast ? 'bg-yellow-400 text-black' : 'bg-blue-400 text-white';
  };

  return (
    <>
      <nav
        className={`w-full ${className}`}
        aria-label="breadcrumb"
      >
        <ol className="flex flex-wrap items-baseline gap-1 sm:gap-1.5 py-2">
          {items.map((item, index) => (
            <li key={`item-${index}`} className="flex items-center">
              {item.isLast ? (
                <span
                  className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-1 font-medium text-xs sm:text-sm leading-none ${getPillClass(index, item.isLast)}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-1 font-medium text-xs sm:text-sm leading-none transition-colors hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getPillClass(index, false)}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {/* Inject breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
};

export default Breadcrumb;
