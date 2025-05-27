export default function Sidebar() {
  return (
    <div className="sticky top-20 md:top-24 self-start bg-white rounded-xl shadow p-4 mb-6 border border-gray-100">
      <h3 className="font-bold text-lg mb-2">Why Choose Us?</h3>
      <ul className="text-sm text-gray-700 space-y-1 mb-3">
        <li>✓ Trusted Medicare Experts</li>
        <li>✓ Friendly, Local Service</li>
        <li>✓ Free Plan Comparisons</li>
        <li>✓ Fast, Personalized Support</li>
      </ul>
      <a href="/contact" className="block bg-bb-blue text-white text-center rounded py-2.5 text-sm font-semibold hover:bg-bb-light-blue transition">
        Contact Us
      </a>
    </div>
  );
} 