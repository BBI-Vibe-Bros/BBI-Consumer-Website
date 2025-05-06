import TeamMemberCard from './TeamMemberCard';

export default function TeamSection({ section, members }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">{section}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map(member => (
          <TeamMemberCard key={member.email} {...member} />
        ))}
      </div>
    </section>
  );
} 