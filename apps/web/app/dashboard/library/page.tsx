import Link from 'next/link';

export default function Library() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Library Page</h1>
        <p className="text-gray-600 mt-2">Content library and study materials will be displayed here.</p>
      </div>
    </div>
  );
}