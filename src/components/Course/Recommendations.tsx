import CourseSlideshow from "@/components/Course/CourseSlideshow";
import { fetchRecommendations } from "@/lib/api";
import { RecommendationsResponse } from "@/types/recommendationTypes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default async function Recommendations() {
  try {
    const recommendations: RecommendationsResponse = await fetchRecommendations();
    if (!recommendations?.data?.products?.length) {
      return null;
    }

    return (
      <section className="py-16 max-w-7xl mx-auto recommendations">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">আপনার জন্য আরও কিছু কোর্স</h2>
          </div>
          <CourseSlideshow products={recommendations.data.products} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading recommendations:", error);
    return (
      <section className="py-16 max-w-7xl mx-auto recommendations">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading recommendations</p>
          </div>
        </div>
      </section>
    );
  }
}
