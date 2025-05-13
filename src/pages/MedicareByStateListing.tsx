import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';

const MedicareByStateListing = () => {
  const [loading, setLoading] = useState(true);
  const [statePages, setStatePages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatePages = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.client.getEntries({
          content_type: 'foundationalPage',
          'fields.pageSlug[match]': 'medicare-by-state-',
          include: 3,
        });
        
        if (response && response.items) {
          // Transform the response to extract state names and slugs
          const pages = response.items.map(item => ({
            name: item.fields.pageName?.replace('Medicare in ', '') || 'Unknown State',
            slug: item.fields.pageSlug?.replace('medicare-by-state-', '') || '',
            description: item.fields.metadata?.fields?.description || `Learn about Medicare coverage options, rules, and available plans in ${item.fields.pageName?.replace('Medicare in ', '') || 'this state'}`,
            image: item.fields.fShareImage?.fields?.file?.url 
              ? `https:${item.fields.fShareImage.fields.file.url}` 
              : '/static/state-placeholder.png'
          }));
          setStatePages(pages);
        } else {
          setError('Failed to load state pages');
        }
      } catch (err) {
        console.error('Error fetching state pages:', err);
        setError('Failed to load state pages');
      } finally {
        setLoading(false);
      }
    };

    fetchStatePages();
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicare', path: '/medicare' },
    { label: 'Medicare by State', path: '/medicare/by-state', isLast: true }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Medicare by State | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Find state-specific Medicare information, rules, and available plans in your area. Get detailed guidance for Medicare coverage in your state."
        />
      </Helmet>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bb-dark">Medicare by State</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Find state-specific Medicare information, rules, and available plans in your area
          </p>
        </div>

        {statePages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No state pages are currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statePages.map((state) => (
              <Card key={state.slug} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={state.image}
                    alt={`Medicare in ${state.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-bb-blue" />
                    <CardTitle className="text-xl">{state.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-snug text-base">
                    {state.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link 
                    to={`/medicare/by-state/${state.slug}`}
                    className="text-bb-blue hover:text-bb-light-blue font-semibold text-base flex items-center gap-2"
                  >
                    View Medicare in {state.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicareByStateListing; 