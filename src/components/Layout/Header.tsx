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
import { ChevronDown, GraduationCap, ClipboardList, Calendar, DollarSign, Shield, Pill, PlusCircle, Download, Star, Users, BookOpen, Video, FileText, Heart, MessageCircle, Building2, ChevronRight, MapPin } from 'lucide-react';
import DropdownCallout from './DropdownCallout';
import StickyFooter from './StickyFooter';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navigation = [
    {
      title: 'Understand Medicare',
      submenu: [
        { title: 'What is Medicare?', href: '/medicare/what-is-medicare', icon: GraduationCap, description: 'Learn about Medicare, its different parts, and how it works.' },
        { title: 'The 4 Parts of Medicare', href: '/medicare/four-parts-of-medicare', icon: ClipboardList, description: 'Learn about the four parts of Medicare and what they cover.' },
        { title: 'Enrollment Periods', href: '/medicare/enrollment-periods', icon: Calendar, description: 'Discover the different enrollment periods for Medicare.' },
        { title: 'Medicare Costs', href: '/medicare/medicare-costs', icon: DollarSign, description: 'Learn about premiums, deductibles, and other out-of-pocket costs associated with Medicare.' },
        { title: 'Medicare Eligibility', href: '/medicare/eligibility', icon: Shield, description: 'Learn what makes you eligible for Medicare based on age, disability, and residency status.' },
        { title: 'Medicare by State', href: '/medicare/by-state', icon: MapPin, description: 'Find state-specific Medicare information, rules, and available plans in your area.' }
      ]
    },
    {
      title: 'Medicare Plans',
      href: '/plans',
      submenu: [
        { title: 'Medicare Advantage', href: '/plans/medicare-advantage', icon: Heart, description: 'Explore Medicare Advantage plans, which combine medical and drug coverage.' },
        { title: 'Medicare Supplements', href: '/plans/medicare-supplements', icon: PlusCircle, description: 'Learn about Medicare Supplements, which cover the gaps in Original Medicare.' },
        { title: 'Prescription Drug Plans', href: '/plans/medicarepartd', icon: Pill, description: 'Discover Medicare Part D, which cover prescription medications.' },
        { title: 'Medicare Add-Ons', href: '/plans/medicare-add-on-coverage-options', icon: Shield, description: 'Explore additional coverage options for Medicare like dental, vision, and hearing.' }
      ]
    },
    {
      title: 'Resources',
      href: '/resources',
      submenu: [
        { title: 'Blogs & Insights', href: '/blog', icon: BookOpen, description: 'Read our latest insights on Medicare.' },
        { title: 'Video Center', href: '/videos', icon: Video, description: 'Watch educational videos about Medicare.' },
        { title: 'Medicare Breakdown', href: '/medicare-breakdown', icon: FileText, description: 'Explore a detailed breakdown of Medicare.' }
      ]
    },
    {
      title: 'The BBI Difference',
      href: '/about-us',
      submenu: [
        { title: 'About Us', href: '/about-us', icon: Building2, description: 'Learn about our company and our mission.' },
        { title: 'Client Testimonials', href: '/client-reviews', icon: MessageCircle, description: 'Read what our clients have to say about us.' },
        { title: 'Our Team', href: '/team', icon: Users, description: 'Meet the team behind our company.' },
        { title: 'Get in Touch', href: '/contact-us', icon: MessageCircle, description: 'Contact us to get started on your journey.' }
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

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <>
      <header className="bg-white py-4 md:py-[25px] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  alt="Bobby Brock Insurance" 
                  className="h-8 md:h-12 w-auto" 
                  src="https://www.bobbybrockinsurance.com/lovable-uploads/bobby-brock-insurance-logo.png" 
                />
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
                                      <Link to={subItem.href} className="flex items-center gap-3 group bg-white rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-100">
                                        {subItem.icon && <subItem.icon className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                                        <div className="flex-1">
                                          <div className="font-semibold text-[16px] text-gray-900 group-hover:text-bb-blue transition-colors leading-tight">{subItem.title}</div>
                                          <div className="text-gray-400 text-[14px] mt-0.5 leading-snug">{subItem.description || 'Description here'}</div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>
                              {/* Middle: RESOURCES */}
                              <div>
                                <div className="flex flex-col gap-2">
                                  {item.submenu.slice(Math.ceil(item.submenu.length / 2)).map((subItem) => (
                                    <NavigationMenuLink asChild key={subItem.title}>
                                      <Link to={subItem.href} className="flex items-center gap-3 group bg-white border border-gray-100 border-solid rounded-lg p-3 hover:bg-blue-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-100">
                                        {subItem.icon && <subItem.icon className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                                        <div className="flex-1">
                                          <div className="font-semibold text-[16px] text-gray-900 group-hover:text-bb-blue transition-colors leading-tight">{subItem.title}</div>
                                          <div className="text-gray-400 text-[14px] mt-0.5 leading-snug">{subItem.description || 'Description here'}</div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
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
              <Link to="https://go.bobbybrockinsurance.com/appointment/"><Button>
                Schedule an Appointment
                </Button> </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
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
        <div 
          className={cn(
            "lg:hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t">
            {navigation.map((item) => (
              <div key={item.title} className="py-1">
                {item.submenu ? (
                  <div className="flex flex-col">
                    <button
                      className="flex justify-between items-center w-full px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          openSubmenu === item.title ? "transform rotate-180" : ""
                        )} 
                      />
                    </button>
                    <div 
                      className={cn(
                        "transition-all duration-200 ease-in-out",
                        openSubmenu === item.title ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      )}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.icon && <subItem.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      <StickyFooter />
    </>
  );
};

export default Header;