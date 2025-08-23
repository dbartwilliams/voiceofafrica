import DashStatsCards from './DashStatsCards';

const Dashboard = () => {
  return (
    <div>
      <DashStatsCards />
      
      <div className="p-6 mb-6 rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 mr-3 text-indigo-600 bg-indigo-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">New post published</p>
              <p className="text-sm text-gray-600">"Getting Started with TailwindCSS" was published by Admin</p>
              <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          {/* More activity items... */}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;