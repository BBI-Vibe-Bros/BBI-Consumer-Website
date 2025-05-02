
import React from 'react';

const MedicareCompliance = () => {
  return (
    <div className="medicare-disclaimer bg-gray-100 border border-gray-300 mx-auto max-w-5xl my-12">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Medicare Compliance Statement</h3>
        <p className="text-sm lg:text-base">
          This website and this nationally recognized Medicare insurance brokerage represent no obligation to enroll. Not affiliated with or endorsed by the government or Federal Medicare program. We offer plans from multiple insurance carriers. Material is for informational purposes only. Limitations and exclusions may apply.
        </p>
        <p className="text-sm lg:text-base mt-2">
          Medicare has neither reviewed nor endorsed this information. Bobby Brock Insurance represents multiple carriers and offers comparison services to find the best plan for your needs. For a complete list of available plans please contact 1-800-MEDICARE (TTY users should call 1-877-486-2048), 24 hours a day/7 days a week or consult www.medicare.gov.
        </p>
      </div>
    </div>
  );
};

export default MedicareCompliance;
