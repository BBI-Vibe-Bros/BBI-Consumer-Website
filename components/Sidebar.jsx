export default function Sidebar() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
      <h3 className="font-bold text-lg mb-2">Why Choose Us?</h3>
      <ul className="text-sm text-gray-700 space-y-2 mb-4">
        <li>✓ Trusted Medicare Experts</li>
        <li>✓ Friendly, Local Service</li>
        <li>✓ Free Plan Comparisons</li>
        <li>✓ Fast, Personalized Support</li>
      </ul>
      <a href="/contact" className="block bg-bb-blue text-white text-center rounded py-2 font-semibold hover:bg-bb-light-blue transition">
        Contact Us
      </a>
    </div>
  );
} 