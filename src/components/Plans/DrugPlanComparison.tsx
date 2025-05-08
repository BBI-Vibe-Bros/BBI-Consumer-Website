import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const DrugPlanComparison = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold mb-4">Compare Medicare Part D Plans</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Medicare Part D plans can vary widely in costs, coverage, and pharmacy networks. Here's a comparison of typical plan features.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full bg-white rounded-lg shadow-sm">
            <TableCaption>Actual plans and costs may vary. Contact us for personalized comparisons.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Features</TableHead>
                <TableHead>Basic Coverage Plans</TableHead>
                <TableHead>Enhanced Coverage Plans</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Monthly Premium</TableCell>
                <TableCell>$15-$30</TableCell>
                <TableCell>$40-$90+</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Annual Deductible</TableCell>
                <TableCell>$0-$505 (2023 maximum)</TableCell>
                <TableCell>$0-$505 (often lower or $0)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Formulary Coverage</TableCell>
                <TableCell>Standard coverage of common medications</TableCell>
                <TableCell>More extensive drug coverage, including some specialty medications</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coverage Gap Protection</TableCell>
                <TableCell>Limited or none</TableCell>
                <TableCell>Some plans offer coverage through the "donut hole"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pharmacy Network Size</TableCell>
                <TableCell>Standard network</TableCell>
                <TableCell>Usually larger network with more preferred pharmacies</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mail Order Options</TableCell>
                <TableCell>Basic mail order</TableCell>
                <TableCell>Enhanced savings with mail order</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>People who take few generic medications</TableCell>
                <TableCell>People with multiple or specialty medications</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-10 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-heading font-bold mb-4">Finding the Right Part D Plan</h3>
          <p className="text-gray-700 mb-4">
            The best Medicare Part D plan for you depends on your specific medication needs, preferred pharmacies, and budget. We can help you compare plans based on:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Your specific prescription drugs
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Dosages and frequency
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Preferred local pharmacies
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mail-order preferences
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Your budget constraints
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Eligibility for Extra Help programs
            </li>
          </ul>
          <div className="text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md bg-bb-blue px-8 py-3 text-lg font-medium text-white hover:bg-bb-light-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bb-blue"
            >
              Get a Free Part D Plan Comparison
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrugPlanComparison;
