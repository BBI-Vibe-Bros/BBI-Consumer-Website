import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
        className={`w-auto flex flex-col items-center sm:items-start ${className}`}
        aria-label="breadcrumb"
      >
        <ol className="flex flex-row items-center gap-1.5 sm:gap-2 py-2">
          {items.map((item, index) => (
            <li key={`item-${index}`} className="inline-flex items-center">
              {item.isLast ? (
                <span
                  className={`rounded-full px-3 py-0.5 font-semibold text-sm ${getPillClass(index, item.isLast)}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`rounded-full px-3 py-0.5 font-regular text-sm transition-colors hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getPillClass(index, false)}`}
                >
                  {item.label}
                </Link>
              )}
              {/* Mobile-only blue pill indicators after first pill */}
              {index === 0 && (
                <span className="flex sm:hidden ml-1 gap-0.5">
                  <span className="inline-block w-2 h-3 rounded-full bg-blue-400" />
                  <span className="inline-block w-2 h-3 rounded-full bg-blue-400" />
                  <span className="inline-block w-2 h-3 rounded-full bg-blue-400" />
                </span>
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
