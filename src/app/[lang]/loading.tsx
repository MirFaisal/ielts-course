export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Skeleton */}
      <div className="h-[150px] bg-gray-200 animate-pulse"></div>

      {/* Course Meta Skeleton */}
      <div className="w-full bg-gray-300 animate-pulse h-64">
        <div className="max-w-6xl mx-auto grid grid-cols-6 justify-between items-center h-full gap-4 px-4">
          <div className="col-span-4 h-full flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full">
              <div className="h-8 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded w-3/4 animate-pulse"></div>
              <div className="h-16 bg-gray-400 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="col-span-2 h-full">
            <div className="h-48 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Checklist Skeleton */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded mb-8 w-1/2 mx-auto animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Details Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-12 bg-gray-200 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
