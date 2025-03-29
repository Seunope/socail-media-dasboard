export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 h-32 animate-pulse"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 h-64 animate-pulse lg:col-span-2"></div>
        <div className="bg-white rounded-xl shadow-md p-6 h-64 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 h-64 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
