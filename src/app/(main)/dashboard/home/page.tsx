
const HomePage = () => {
  const currentDate = new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your team efficiently</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 mt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back, Admin! 👋</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 py-8">
        
      </div>
    </div>
  );
};

export default HomePage;