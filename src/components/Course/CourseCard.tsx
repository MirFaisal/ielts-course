import { RecommendationProduct } from "@/types/recommendationTypes";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  product: RecommendationProduct;
}

export default function CourseCard({ product }: CourseCardProps) {
  // Get the thumbnail image
  const thumbnail =
    product.media.find((media) => media.name === "thumbnail" || media.name === "sqr_img")?.resource_value ||
    product.media[0]?.resource_value;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳");
  };

  // Check if course has discount
  const hasDiscount = product.discount_amount > 0;
  const discountPercentage = hasDiscount ? Math.round((product.discount_amount / product.price) * 100) : 0;

  // Get instructor name
  const instructorName = product.instructors[0]?.name || "";

  return (
    <div className="bg-white rounded-lg  border border-gray-200 hover:border-green-500 duration-300 overflow-hidden ">
      <Link href={"#"} className="block">
        {/* Course Image */}
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            )}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                {discountPercentage}% ছাড়
              </span>
            </div>
          )}

          {/* Popular Badge - You can add logic to determine if course is popular */}
          {product.product_id === 153 && ( // IELTS course as example
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
                POPULAR
              </span>
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-4">
          {/* Course Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Instructor */}
          {instructorName && <p className="text-sm text-gray-600 mb-3">{instructorName}</p>}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-green-600">{formatPrice(product.final_price)}</span>
                  <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-green-600">
                  {product.price === 0 ? "ফ্রি" : formatPrice(product.final_price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
