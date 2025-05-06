import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Updated navigation structure to match the build guide
  const navigation = [{
    title: 'Understand Medicare',
    href: '/medicare/basics',
    submenu: [{
      title: 'What is Medicare?',
      href: '/medicare/basics/what-is-medicare'
    }, {
      title: 'Enrollment Periods',
      href: '/medicare/basics/enrollment-periods'
    }, {
      title: 'Medicare Costs',
      href: '/medicare/basics/medicare-costs'
    }, {
      title: 'Medicare Eligibility',
      href: '/medicare/eligibility'
    }, {
      title: 'Medicare Parts',
      href: '/medicare/parts'
    }]
  }, {
    title: 'Medicare Plans',
    href: '/plans',
    submenu: [{
      title: 'Medicare Advantage',
      href: '/plans/advantage'
    }, {
      title: 'Medicare Supplements',
      href: '/plans/supplement'
    }, {
      title: 'Prescription Drug Plans',
      href: '/plans/prescription'
    }, {
      title: 'Additional Coverage',
      href: '/plans/additional-coverage'
    }]
  }, {
    title: 'Why Choose Us',
    href: '/about-us',
    submenu: [{
      title: 'About Us',
      href: '/about-us'
    }, {
      title: 'Our Team',
      href: '/about-us/team'
    }, {
      title: 'Client Testimonials',
      href: '/about-us/testimonials'
    }]
  }, {
    title: 'Resources',
    href: '/resources',
    submenu: [{
      title: 'Medicare Guides',
      href: '/resources/guides'
    }, {
      title: 'Medicare Blog',
      href: '/blog'
    }, {
      title: 'Medicare Videos',
      href: '/videos'
    }, {
      title: 'Medicare FAQs',
      href: '/resources/faqs'
    }, {
      title: 'Medicare Glossary',
      href: '/resources/glossary'
    }]
  }];
  return <header className="bg-white py-[25px]">
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
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigation.map(item => <NavigationMenuItem key={item.title}>
                    {item.submenu ? <>
                        <NavigationMenuTrigger className="bg-transparent text-base hover:text-bb-blue font-normal text-[#002a3a]">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 w-[400px]">
                            {item.submenu.map(subItem => <li key={subItem.title} className="row-span-1">
                                <NavigationMenuLink asChild>
                                  <Link to={subItem.href} className="block p-2 hover:bg-muted rounded-md text-lg">
                                    {subItem.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>)}
                          </ul>
                        </NavigationMenuContent>
                      </> : <Link to={item.href} className="text-base font-semibold text-gray-800 hover:text-bb-blue px-5 py-2">
                        {item.title}
                      </Link>}
                  </NavigationMenuItem>)}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark text-base font-semibold">
              Schedule an Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded="false">
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg> : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map(item => <div key={item.title} className="py-1">
              {item.submenu ? <div className="flex flex-col">
                  <button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-md" onClick={() => {/* Toggle submenu */}}>
                    <span>{item.title}</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pl-4">
                    {item.submenu.map(subItem => <Link key={subItem.title} to={subItem.href} className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                        {subItem.title}
                      </Link>)}
                  </div>
                </div> : <Link to={item.href} className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-md">
                  {item.title}
                </Link>}
            </div>)}
          <div className="pt-4 px-4">
            <Button className="w-full bg-bb-yellow hover:bg-bb-yellow/90 text-bb-dark font-bold text-lg">
              Schedule an Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;