import React from 'react';

const SupplementCompliance = () => {
  return (
    <section className="py-10 bg-gray-50 text-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto medicare-disclaimer">
          <h2 className="font-heading font-bold text-bb-dark mb-4">Important Medicare Information</h2>
          <p className="mb-3 font-semibold">Medicare Supplement Insurance Disclaimer:</p>
          <p className="mb-2">
            Medicare Supplement insurance policies are underwritten by private insurance companies that are not connected with or endorsed by the U.S. government or the federal Medicare program.
          </p>
          <p className="mb-2">
            Policy benefits, premiums, and eligibility requirements vary by plan and insurance company. Not all plans are available in all states. Plan availability and costs may depend on factors such as age, gender, location, and health status.
          </p>
          <p>
            This is a solicitation of insurance. Bobby Brock Insurance is not connected with or endorsed by the United States government or the federal Medicare program. This is not a complete description of all plans available. For more information, please contact the insurance company or Medicare.gov.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupplementCompliance;
