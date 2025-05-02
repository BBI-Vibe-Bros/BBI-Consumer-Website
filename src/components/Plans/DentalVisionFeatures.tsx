
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooth, Eye } from 'lucide-react';

const DentalVisionFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Dental & Vision Coverage</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Medicare doesn't cover most dental care, eye exams, or glasses. Our plans help fill these important gaps in your healthcare coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Dental Coverage Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Tooth className="h-8 w-8 text-bb-blue" />
              <h3 className="text-2xl font-bold">Dental Coverage</h3>
            </div>

            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Preventive Care</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Regular cleanings (typically 2 per year)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Routine exams and evaluations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">X-rays and diagnostic imaging</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Fluoride treatments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Basic Procedures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Fillings and simple extractions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Emergency pain treatment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Repairs of crowns, dentures, and bridges</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Major Procedures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Root canals and periodontal treatment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Crowns, bridges, and implants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Full and partial dentures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Complex oral surgery</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Vision Coverage Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-8 w-8 text-bb-blue" />
              <h3 className="text-2xl font-bold">Vision Coverage</h3>
            </div>

            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Routine Eye Care</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Annual eye exams</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Vision testing and refraction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Glaucoma screening</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Vision Hardware</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Eyeglasses (frames and lenses)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Contact lenses and fittings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Lens options (progressives, anti-glare)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-3">Additional Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Discounts on LASIK and PRK procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Access to large provider networks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Retail frame allowances at major retailers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalVisionFeatures;
