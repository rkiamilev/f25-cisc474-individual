import Link from 'next/link';

export default function Progress() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Progress Page</h1>
        <p className="text-gray-600 mt-2">Charts and statistics will be displayed here.</p>
      </div>
    </div>
  );
}