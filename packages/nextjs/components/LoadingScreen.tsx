// components/LoadingScreen.js
export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading QuestBoard</h2>
        <p className="text-gray-500">Preparing your community experience...</p>

        {/* Cultural Accent */}
        <div className="flex justify-center mt-6">
          <div className="w-12 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
