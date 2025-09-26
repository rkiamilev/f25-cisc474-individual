import Link from 'next/link';
// import {prisma} from '@repo/database';
// import { NextResponse } from 'next/server'; 

export default function Reading() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Reading Page</h1>

        <p className="text-gray-600 mt-2">Text scanner and dictionary lookup functionality will be implemented here.</p>
      </div>
    </div>
  );
}