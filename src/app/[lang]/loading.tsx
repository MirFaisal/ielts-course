export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Skeleton */}
      <div className="h-[150px] bg-gray-200 animate-pulse"></div>

      {/* Course Meta Skeleton - Desktop */}
      <div className="hidden md:block w-full bg-gray-300 animate-pulse h-64">
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

      {/* Course Meta Skeleton - Mobile */}
      <div className="block md:hidden w-full bg-gray-300 animate-pulse">
        <div className="flex flex-col items-center justify-center pt-2">
          {/* Mobile Slider Skeleton */}
          <div className="p-2 mb-4 w-full overflow-hidden">
            <div className="h-48 bg-gray-400 rounded animate-pulse"></div>
          </div>
          {/* Mobile Content Skeleton */}
          <div className="flex flex-col gap-2 p-3 mb-3 w-full">
            <div className="h-6 bg-gray-400 rounded animate-pulse"></div>
            <div className="flex gap-2 items-center">
              <div className="h-5 w-20 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Mobile Course Cart Skeleton */}
        <div className="p-4 bg-white">
          <div className="h-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Checklist Skeleton - Only visible on desktop since mobile has it in the course cart */}
      <div className="hidden md:block bg-white py-12">
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
        <div className="h-8 md:h-12 bg-gray-200 rounded mb-6 md:mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 md:h-32 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="hidden lg:block space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar Skeleton */}
      <div className="block md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-2xl">
        <div className="px-3 flex flex-col gap-3 py-3">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
