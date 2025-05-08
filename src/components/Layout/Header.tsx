import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { ChevronDown, BookOpen, FileText, Users, HelpCircle, Calendar, DollarSign, Shield, Pill, PlusCircle, Download, Star } from 'lucide-react';
import DropdownCallout from './DropdownCallout';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      title: 'Understand Medicare',
      href: '/medicare/basics',
      submenu: [
        { title: 'What is Medicare?', href: '/medicare/basics/what-is-medicare', icon: BookOpen, description: 'Learn about Medicare, its different parts, and how it works.' },
        { title: 'Enrollment Periods', href: '/medicare/basics/enrollment-periods', icon: Calendar, description: 'Discover the different enrollment periods for Medicare.' },
        { title: 'Medicare Costs', href: '/medicare/basics/medicare-costs', icon: DollarSign, description: 'Understand the costs associated with Medicare.' },
        { title: 'Medicare Eligibility', href: '/medicare/eligibility', icon: Shield, description: 'Check your eligibility for Medicare.' },
        { title: 'Four Parts of Medicare', href: '/medicare/four-parts-of-medicare', icon: FileText, description: 'Learn about the four parts of Medicare.' }
      ]
    },
    {
      title: 'Medicare Plans',
      href: '/plans',
      submenu: [
        { title: 'Medicare Advantage', href: '/plans/advantage', icon: Shield, description: 'Explore Medicare Advantage plans, which combine medical and drug coverage.' },
        { title: 'Medicare Supplements', href: '/plans/supplement', icon: PlusCircle, description: 'Learn about Medicare Supplements, which cover the gaps in Original Medicare.' },
        { title: 'Prescription Drug Plans', href: '/plans/prescription', icon: Pill, description: 'Discover Medicare Part D, which cover prescription medications.' },
        { title: 'Additional Coverage', href: '/plans/additional-coverage', icon: PlusCircle, description: 'Explore additional coverage options for Medicare.' }
      ]
    },
    {
      title: 'Why Choose Us',
      href: '/about-us',
      submenu: [
        { title: 'About Us', href: '/about-us', icon: Users, description: 'Learn about our company and our mission.' },
        { title: 'Our Team', href: '/about-us/team', icon: Users, description: 'Meet the team behind our company.' },
        { title: 'Client Testimonials', href: '/client-reviews', icon: Star, description: 'Read what our clients have to say about us.' }
      ]
    },
    {
      title: 'Resources',
      href: '/resources',
      submenu: [
        { title: 'Blogs & Insights', href: '/blog', icon: FileText, description: 'Read our latest articles and updates on Medicare.' },
        { title: 'Video Center', href: '/videos', icon: FileText, description: 'Watch educational videos about Medicare.' },
        { title: 'Medicare Breakdown', href: '/medicare-breakdown', icon: FileText, description: 'Explore a detailed breakdown of Medicare.' }
      ]
    }
  ];

  const getCalloutForBranch = (title: string) => {
    switch (title) {
      case 'Understand Medicare':
        return (
          <DropdownCallout
            title="Medicare Myth Buster"
            description="No fluff, no jargon—just clear, helpful answers to your most important Medicare questions. Download your free copy now and take the guesswork out of getting the right coverage."
            ctaText="Download Free Guide"
            ctaLink="/medicare/medicare-breakdown"
            icon={Download}
          />
        );
      case 'Medicare Plans':
        return (
          <DropdownCallout
            title="Get Personalized Medicare Plan Guidance"
            description="Our licensed agents can help you compare plans and find the right coverage for your needs. Schedule a free consultation today."
            ctaText="Schedule Appointment"
            ctaLink="/contact"
            icon={Calendar}
            bgColor="bg-blue-50"
          />
        );
      case 'Why Choose Us':
        return (
          <DropdownCallout
            title="Join Our Growing Family of Satisfied Clients"
            description="See why thousands of Medicare beneficiaries trust us with their healthcare coverage. Read real stories from our clients."
            ctaText="Read Testimonials"
            ctaLink="/client-reviews"
            icon={Star}
            bgColor="bg-green-50"
          />
        );
      case 'Resources':
        return null;
      default:
        return null;
    }
  };

  return (
    <header className="bg-white py-[25px]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img alt="Bobby Brock Insurance" className="h-12" src="/lovable-uploads/bobby-brock-insurance-logo.png" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-5">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-base font-medium text-[#002a3a] hover:bg-transparent hover:text-bb-blue focus:bg-transparent focus:text-bb-blue focus:outline-none data-[state=open]:bg-transparent">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[900px] p-6 grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 border border-white border-[10px] rounded-lg">
                            {/* Left: PLAN TYPES */}
                            <div>
                              <div className="flex flex-col gap-2">
                                {item.submenu.slice(0, Math.ceil(item.submenu.length / 2)).map((subItem) => (
                                  <NavigationMenuLink asChild key={subItem.title}>
                                    <Link to={subItem.href} className="flex items-start gap-3 group bg-white rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-100">
                                      {subItem.icon && <subItem.icon className="w-5 h-5 text-blue-400 mt-0.5" />}
                                      <div>
                                        <div className="font-semibold text-[16px] text-gray-900 group-hover:text-bb-blue transition-colors leading-tight">{subItem.title}</div>
                                        <div className="text-gray-400 text-[14px] mt-0.5 leading-snug">{subItem.description || 'Description here'}</div>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                            {/* Middle: RESOURCES */}
                            <div>
                              <div className="flex flex-col gap-4">
                                {item.submenu.slice(Math.ceil(item.submenu.length / 2)).map((subItem) => (
                                  <NavigationMenuLink asChild key={subItem.title}>
                                    <Link to={subItem.href} className="flex items-start gap-3 group bg-white border border-gray-100 border-solid rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-100">
                                      {subItem.icon && <subItem.icon className="w-5 h-5 text-blue-400 mt-0.5" />}
                                      <div>
                                        <div className="font-semibold text-[16px] text-gray-900 group-hover:text-bb-blue transition-colors leading-tight">{subItem.title}</div>
                                        <div className="text-gray-400 text-[14px] mt-0.5 leading-snug">{subItem.description || 'Description here'}</div>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="text-base font-medium text-[#002a3a] hover:text-bb-blue"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button>Schedule an Appointment</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <div key={item.title} className="py-1">
              {item.submenu ? (
                <div className="flex flex-col">
                  <button
                    className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      /* Toggle submenu */
                    }}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pl-4">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 px-4">
            <Button className="w-full bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark font-bold text-lg">
              Schedule an Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;