import React, { useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEntry = timelineData[activeIndex];

  if (!activeEntry) {
    return null;
  }

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

        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
            {/* Year selector: horizontal on mobile, vertical on desktop */}
            <div className="mb-6 lg:mb-0">
              <div
                className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
                role="tablist"
                aria-label="Timeline years"
              >
                {timelineData.map((entry, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={entry.year}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`timeline-panel-${entry.year}`}
                      id={`timeline-tab-${entry.year}`}
                      onClick={() => setActiveIndex(index)}
                      className={`shrink-0 rounded-full lg:rounded-xl px-5 py-2.5 text-sm lg:text-base font-semibold transition-all duration-200 border ${
                        isActive
                          ? 'bg-[#00a3e0] text-white border-[#00a3e0] shadow-md'
                          : 'bg-white text-[#002a3a] border-[#d5effc] hover:bg-[#e9f7ff]'
                      }`}
                    >
                      {entry.year}
                    </button>
                  );
                })}
              </div>
            </div>

            <article
              key={activeEntry.year}
              id={`timeline-panel-${activeEntry.year}`}
              role="tabpanel"
              aria-labelledby={`timeline-tab-${activeEntry.year}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
            >
              <div className="bg-[#00a3e0] px-6 md:px-8 py-4">
                <h3 className="text-white font-bold text-2xl md:text-3xl">
                  {activeEntry.year}
                </h3>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-[#002a3a] text-base md:text-lg leading-relaxed md:leading-9 max-w-4xl">
                  {activeEntry.description}
                </p>
              </div>
            </article>
          </div>

          <div className="mt-6 flex justify-center lg:hidden">
            <p className="text-sm text-[#002a3a]/70">
              {activeIndex + 1} of {timelineData.length}
            </p>
          </div>
          <div className="mt-3 flex justify-center gap-2 lg:hidden" aria-hidden="true">
            {timelineData.map((entry, index) => (
              <span
                key={entry.year}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === index ? 'bg-[#00a3e0]' : 'bg-[#d5effc]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 