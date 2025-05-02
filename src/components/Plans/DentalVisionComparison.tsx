
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DentalVisionComparison = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare Plan Options</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose the dental and vision coverage that best fits your needs and budget.
          </p>
        </div>

        <Tabs defaultValue="dental" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dental">Dental Plans</TabsTrigger>
            <TabsTrigger value="vision">Vision Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dental" className="mt-6">
            <div className="overflow-x-auto">
              <Table className="w-full bg-white rounded-lg shadow-sm">
                <TableCaption>Actual dental plan features and costs may vary. Contact us for personalized plan information.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Features</TableHead>
                    <TableHead>Basic Plan</TableHead>
                    <TableHead>Standard Plan</TableHead>
                    <TableHead>Premium Plan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Premium</TableCell>
                    <TableCell>$15-$25</TableCell>
                    <TableCell>$30-$45</TableCell>
                    <TableCell>$50-$70</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Annual Maximum Benefit</TableCell>
                    <TableCell>$1,000</TableCell>
                    <TableCell>$1,500</TableCell>
                    <TableCell>$2,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Preventive Services</TableCell>
                    <TableCell>100% covered</TableCell>
                    <TableCell>100% covered</TableCell>
                    <TableCell>100% covered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Basic Procedures</TableCell>
                    <TableCell>50% after deductible</TableCell>
                    <TableCell>70% after deductible</TableCell>
                    <TableCell>80% after deductible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Major Procedures</TableCell>
                    <TableCell>Not covered</TableCell>
                    <TableCell>50% after deductible</TableCell>
                    <TableCell>60% after deductible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Annual Deductible</TableCell>
                    <TableCell>$75</TableCell>
                    <TableCell>$50</TableCell>
                    <TableCell>$25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Waiting Period</TableCell>
                    <TableCell>6 months for basic</TableCell>
                    <TableCell>3 months for basic, 9 for major</TableCell>
                    <TableCell>No waiting for basic, 6 for major</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="vision" className="mt-6">
            <div className="overflow-x-auto">
              <Table className="w-full bg-white rounded-lg shadow-sm">
                <TableCaption>Actual vision plan features and costs may vary. Contact us for personalized plan information.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Features</TableHead>
                    <TableHead>Basic Vision</TableHead>
                    <TableHead>Enhanced Vision</TableHead>
                    <TableHead>Premium Vision</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Premium</TableCell>
                    <TableCell>$5-$10</TableCell>
                    <TableCell>$12-$18</TableCell>
                    <TableCell>$20-$30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Eye Exam</TableCell>
                    <TableCell>$10 copay, once every 12 months</TableCell>
                    <TableCell>$10 copay, once every 12 months</TableCell>
                    <TableCell>$0 copay, once every 12 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Frame Allowance</TableCell>
                    <TableCell>$100 every 24 months</TableCell>
                    <TableCell>$150 every 12 months</TableCell>
                    <TableCell>$200 every 12 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Standard Lenses</TableCell>
                    <TableCell>$25 copay, every 12 months</TableCell>
                    <TableCell>$15 copay, every 12 months</TableCell>
                    <TableCell>$0 copay, every 12 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Contact Lens Allowance</TableCell>
                    <TableCell>$100 every 12 months</TableCell>
                    <TableCell>$150 every 12 months</TableCell>
                    <TableCell>$200 every 12 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lens Enhancements</TableCell>
                    <TableCell>Discounted rates</TableCell>
                    <TableCell>Discounted rates, some included</TableCell>
                    <TableCell>Most common options included</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LASIK Discount</TableCell>
                    <TableCell>Up to 15%</TableCell>
                    <TableCell>Up to 20%</TableCell>
                    <TableCell>Up to 25%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Bundled Dental & Vision Savings</h3>
          <p className="text-gray-700 mb-4">
            Many insurance carriers offer discounted rates when you bundle dental and vision coverage together. These plans often provide:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simplified enrollment process
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Single ID card for both benefits
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Premium discounts up to 15%
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Coordinated customer service
            </li>
          </ul>
          <div className="text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md bg-bb-blue px-8 py-3 text-lg font-medium text-white hover:bg-bb-light-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bb-blue"
            >
              Get a Free Plan Comparison
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionComparison;
