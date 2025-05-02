
import React from 'react';

const DentalVisionCompliance = () => {
  return (
    <section className="py-10 bg-gray-50 text-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto medicare-disclaimer">
          <p className="mb-3 font-semibold">Medicare Dental & Vision Coverage Disclaimer:</p>
          <p className="mb-2">
            Dental and vision insurance plans are not part of Original Medicare (Parts A and B). They are either offered as additional benefits in some Medicare Advantage plans or as standalone insurance policies.
          </p>
          <p className="mb-2">
            Plan benefits, premiums, copayments, coinsurance, and provider networks vary by plan and insurance company. Most dental and vision plans have waiting periods for certain services, annual maximum benefits, and limitations on pre-existing conditions.
          </p>
          <p>
            This is a solicitation of insurance. Bobby Brock Insurance is not connected with or endorsed by the United States government or the federal Medicare program. This is not a complete description of plans available. For more information, please contact the insurance company directly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionCompliance;
