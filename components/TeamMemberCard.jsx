export default function TeamMemberCard({ name, title, image, email }) {
  // Determine if the image is a placeholder
  const isFemale = image && image.toLowerCase().includes('female');
  const isMale = image && image.toLowerCase().includes('male');
  const imgSrc = `/team/${image}`;
  const altText = `${name} - ${title}`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden shadow hover:shadow-2xl transition-shadow group">
      <img
        src={imgSrc}
        alt={altText}
        className="w-full h-75 object-cover object-top"
        loading="lazy"
      />
      <div className="flex flex-col items-;left p-6 text-left">
        <div className="font-bold text-lg tracking-wide mb-1">{name}</div>
        <div className="text-gray-500 text-sm mb-4">{title}</div>
        <a
          href={`mailto:${email}`}
          className="text-blue-600 text-xs flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
          tabIndex={0}
        >
          {email}
        </a>
      </div>
    </div>
  );
} 