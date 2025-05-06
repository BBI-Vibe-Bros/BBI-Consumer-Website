import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineEntry {
  year: string;
  description: string;
}

const timelineData: TimelineEntry[] = [
  {
    year: '2014',
    description: 'Justin Brock was honorably discharged from the Marine Corps and decided to start a career in the Insurance arena after seeing his Dad experience small wins helping folks save money on life and health policies. Using his operational experience from the military, Justin quickly realized he needed to build a team of gifted and hard-working folks to make a notable positive impact on an industry that was falling behind.'
  },
  {
    year: '2018',
    description: 'Justin started documenting their success on social media like a journal, and the appetite for this feedback in the agent community was astounding. The team at BBI began building out a process to help agents replicate their success, focusing on high-quality marketing and high-impact help. Justin maintained that after eight years in the Marine Corps, he had no intention of building a company solely profit-focused. His desire was to create the esprit de corps he had felt while deployed in the Marines.'
  },
  {
    year: '2020',
    description: 'Justin founded MedicareCon, which in 2025 is slated to have 1,500 Medicare and health insurance focused agents in attendance in Orlando. Shortly after its creation, a smaller and more directed event called Behind the Agency was created, focusing on helping people build highly efficient and well-reviewed Medicare and health insurance focused insurance agencies around the country. The team at BBI also created the GoGuru University sales and marketing system, and in 2021 upgraded the offerings of GoGuru to include a full-service CRM and marketing platform, which has now received Gold Saasprenuer awards three years in a row at the High Level Summit.'
  },
  {
    year: '2022',
    description: 'In 2022, Justin Brock bought Gary Alford Insurance, and in 2023 he purchased the business. The BBI team was added to INC5000 fastest-growing companies list. Shortly before that award, Justin renamed the company Bobby Brock Insurance after a trademark issue with a previous name. He did this to honor his family name and because he always said it "rolls off the tongue like Coca Cola."'
  },
  {
    year: '2023',
    description: 'In 2024, Bobby Brock Insurance was acquired by Amerilife. Justin Brock stayed on as a minority owner and CEO of the company. Today, BBI and Justin Brock have more than 2,000 five-star reviews online, and Justin has helped tens of thousands of insurance agents. They now have multiple office locations, but for consumers who want the original experience, you can still see them at their Tupelo and Olive Branch locations.'
  }
];

const TimelineSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00a3e0] uppercase text-sm font-bold tracking-wider mb-4 block">
            Our History
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002a3a]">
            Our Journey
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
            <Button
              onClick={scrollPrev}
              className="rounded-full w-12 h-12 bg-white shadow-lg hover:bg-[#d5effc] pointer-events-auto border border-gray-100"
              aria-label="Previous timeline entry"
            >
              <ChevronLeft className="w-6 h-6 text-[#002a3a]" />
            </Button>
            <Button
              onClick={scrollNext}
              className="rounded-full w-12 h-12 bg-white shadow-lg hover:bg-[#d5effc] pointer-events-auto border border-gray-100"
              aria-label="Next timeline entry"
            >
              <ChevronRight className="w-6 h-6 text-[#002a3a]" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden px-12" ref={emblaRef}>
            <div className="flex">
              {timelineData.map((entry) => (
                <div
                  key={entry.year}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="bg-white rounded-xl h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#00a3e0]/20 overflow-hidden">
                    {/* Year Header */}
                    <div className="bg-[#00a3e0] px-8 py-4">
                      <h3 className="text-white font-bold text-2xl">
                        {entry.year}
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <p className="text-[#002a3a] text-lg leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year Navigation */}
          <div className="flex justify-center gap-4 mt-12 flex-wrap">
            {timelineData.map((entry, index) => (
              <button
                key={entry.year}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  emblaApi?.selectedScrollSnap() === index
                    ? 'bg-[#00a3e0] text-white shadow-md scale-105'
                    : 'bg-[#d5effc] text-[#002a3a] hover:bg-[#00a3e0] hover:text-white'
                }`}
                aria-label={`View ${entry.year} timeline entry`}
              >
                {entry.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 