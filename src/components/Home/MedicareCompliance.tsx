
import React from 'react';

const MedicareCompliance = () => {
  return (
    <div className="medicare-disclaimer bg-gray-100 border border-gray-300 mx-auto max-w-5xl my-12">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Medicare Compliance Statement</h3>
        <p className="text-sm lg:text-base">
          This website represents no obligation to enroll. Not affiliated with or endorsed by the government or Federal Medicare program. Bobby Brock Insurance is a nationally recognized independent Medicare brokerage serving over 50,000 beneficiaries. We represent multiple insurance carriers to help you find the plan that best fits your needs.
        </p>
        <p className="text-sm lg:text-base mt-2">
          Medicare has neither reviewed nor endorsed this information. As an independent brokerage, Bobby Brock Insurance offers comparison services to find the best plan for your needs from multiple carriers. For a complete list of available plans please contact 1-800-MEDICARE (TTY users should call 1-877-486-2048), 24 hours a day/7 days a week or consult www.medicare.gov.
        </p>
      </div>
    </div>
  );
};

export default MedicareCompliance;
