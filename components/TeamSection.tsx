import React from 'react';
import { TeamSection as TeamSectionType } from '@/types/index';
import TeamMemberCard from './TeamMemberCard';

interface TeamSectionProps {
  section: string;
  members: TeamSectionType['members'];
}

export default function TeamSection({ section, members }: TeamSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <TeamMemberCard key={member.email} {...member} />
        ))}
      </div>
    </section>
  );
} 