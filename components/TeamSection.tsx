import React from 'react';
import { TeamSection as TeamSectionType } from '@/types/index';
import TeamMemberCard from './TeamMemberCard';

interface TeamSectionProps {
  section: string;
  members: TeamSectionType['members'];
}

export default function TeamSection({ section, members }: TeamSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-blue-100 pb-3">{section}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {members.map(member => (
          <TeamMemberCard key={member.email} {...member} />
        ))}
      </div>
    </section>
  );
} 