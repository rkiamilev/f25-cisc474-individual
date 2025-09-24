export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome back, Student</h1>
      <p className="text-gray-600 mb-4">Here's your learning dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Recommended Articles</h3>
          <p className="text-gray-600">Continue your reading journey</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Vocabulary Progress</h3>
          <p className="text-gray-600">Review your saved words</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600">See your learning stats</p>
        </div>
      </div>
    </div>
  );
}
