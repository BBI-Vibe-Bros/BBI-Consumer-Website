
import React from 'react';

const DrugPlanCompliance = () => {
  return (
    <section className="py-10 bg-gray-50 text-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto medicare-disclaimer">
          <p className="mb-3 font-semibold">Medicare Part D Prescription Drug Coverage Disclaimer:</p>
          <p className="mb-2">
            Medicare Part D prescription drug plans are offered by private insurance companies approved by Medicare. Actual plan premiums, deductibles, formularies, pharmacy networks, and cost-sharing amounts may vary.
          </p>
          <p className="mb-2">
            Plan formularies (list of covered drugs) may change during the year. Plans may require prior authorization, step therapy, or quantity limits for certain medications. The coverage gap ("donut hole") and catastrophic coverage thresholds are set by Medicare and may change annually.
          </p>
          <p>
            This is a solicitation of insurance. Bobby Brock Insurance is not connected with or endorsed by the United States government or the federal Medicare program. This is not a complete description of plans available. For more information, please contact the insurance company or Medicare.gov.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DrugPlanCompliance;
