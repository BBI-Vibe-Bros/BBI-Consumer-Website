import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PlanComparison = () => {
  const plans = [
    {
      type: "HMO (Health Maintenance Organization)",
      network: "Use in-network providers except for emergencies",
      referrals: "Typically required to see specialists",
      outOfNetwork: "Not covered except for emergencies",
      costs: "Generally lower premiums and copays",
      bestFor: "Those who prefer lower costs and coordinated care through a primary doctor"
    },
    {
      type: "PPO (Preferred Provider Organization)",
      network: "More flexibility to see any doctor that accepts Medicare",
      referrals: "Usually not required to see specialists",
      outOfNetwork: "Covered at higher cost-sharing",
      costs: "Generally higher premiums than HMOs",
      bestFor: "Those who want more provider flexibility and don't mind higher costs"
    },
    {
      type: "SNP (Special Needs Plans)",
      network: "Tailored networks for specific conditions",
      referrals: "Often required, with care coordination",
      outOfNetwork: "Varies by plan type",
      costs: "Specialized cost structures for eligible individuals",
      bestFor: "People with specific chronic conditions, those in nursing facilities, or dual eligible (Medicare & Medicaid)"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-bb-dark">Compare Medicare Advantage Plan Types</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Understanding the differences between plan types helps you select coverage that fits your healthcare needs and preferences
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[250px] font-bold text-bb-dark">Plan Type</TableHead>
                <TableHead className="font-bold text-bb-dark">Network Access</TableHead>
                <TableHead className="font-bold text-bb-dark">Specialist Referrals</TableHead>
                <TableHead className="font-bold text-bb-dark">Out-of-Network Coverage</TableHead>
                <TableHead className="font-bold text-bb-dark">Cost Structure</TableHead>
                <TableHead className="font-bold text-bb-dark">Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="font-semibold text-bb-blue">{plan.type}</TableCell>
                  <TableCell>{plan.network}</TableCell>
                  <TableCell>{plan.referrals}</TableCell>
                  <TableCell>{plan.outOfNetwork}</TableCell>
                  <TableCell>{plan.costs}</TableCell>
                  <TableCell>{plan.bestFor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-gray-700 border border-blue-100">
          <p className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bb-blue mr-2 mt-1 flex-shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>This chart provides general information only. Specific plan features, networks, costs, and benefits vary by insurance carrier and may change annually. Always review the plan's Summary of Benefits for complete details.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlanComparison;
