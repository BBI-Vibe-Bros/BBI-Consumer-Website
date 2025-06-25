import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import { TeamSection as TeamSectionType } from '@/types/index';
import TeamSection from './TeamSection';
import Sidebar from './Sidebar';

export default function TeamPage() {
  const [teamSections, setTeamSections] = useState<TeamSectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Team', path: '/team', isLast: true }
  ];

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const contentfulService = ContentfulService.getInstance();
        const sections = await contentfulService.getTeamMembers();
        
        setTeamSections(sections);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <SEO 
          title="Meet Our Team"
          description="Get to know the people behind Bobby Brock Insurance. Meet our leadership, sales, administrative, and marketing teams."
          schemaType="webpage"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading team information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <SEO 
          title="Meet Our Team"
          description="Get to know the people behind Bobby Brock Insurance. Meet our leadership, sales, administrative, and marketing teams."
          schemaType="webpage"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Meet Our Team"
        description="Get to know the people behind Bobby Brock Insurance. Meet our leadership, sales, administrative, and marketing teams."
        schemaType="webpage"
      />

      <div>
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <h1 className="text-3xl font-bold mb-8">Meet Our Team</h1>
            {teamSections.length > 0 ? (
              teamSections.map(section => (
                <TeamSection key={section.section} {...section} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No team members found.</p>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <aside className="mt-8 lg:mt-0 lg:w-1/4">
            <Sidebar />
          </aside>
        </div>
      </div>
    </Layout>
  );
}