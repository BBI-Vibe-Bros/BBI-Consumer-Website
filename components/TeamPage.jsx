import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import { team } from '../data/team-data';
import TeamSection from './TeamSection';
import Sidebar from './Sidebar';

export default function TeamPage() {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Team', path: '/team', isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title="Meet Our Team"
        description="Get to know the people behind Bobby Brock Insurance. Meet our leadership, sales, administrative, and marketing teams."
        schemaType="webpage"
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <h1 className="text-3xl font-bold mb-8">Meet Our Team</h1>
            {team.map(section => (
              <TeamSection key={section.section} {...section} />
            ))}
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