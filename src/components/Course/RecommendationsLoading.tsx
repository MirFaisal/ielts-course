export default function RecommendationsLoading() {
  return (
    <section className="py-16 max-w-7xl mx-auto recommendations">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-64 mb-4"></div>
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
