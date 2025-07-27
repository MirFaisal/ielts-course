import { ChecklistItem, CTA, MediaItem } from "@/types/productTypes";
import Image from "next/image";
import { FaPhoneFlip } from "react-icons/fa6";
import Slider from "./Slider";

export default function CourseCart({
  enableSlider,
  media,
  cta_text,
  checklist,
}: {
  enableSlider?: boolean;
  media: MediaItem[];
  cta_text: CTA;
  checklist: ChecklistItem[];
}) {
  return (
    <>
      <div className="w-full md:w-[290px] lg:w-full bg-white border border-gray-200 p-1">
        {enableSlider && <Slider media={media} />}
        {/* Course CTA Button */}
        <div className="px-3 flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-gray-900">৳3850</span>
            <span className="text-lg text-gray-500 line-through">৳5000</span>
            <span className="relative bg-orange-400 text-white px-3 py-[2.8px] text-sm font-medium rounded ml-2">
              <span className="absolute top-[1px] left-[1px] transform -translate-x-full">
                <span className="block w-0 h-0 border-r-[12px] border-r-orange-400 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></span>
              </span>
              . ৳1150 ছাড়
            </span>
          </div>
          <button className="w-full py-1 bg-green-500 text-white font-semibold text-lg rounded-lg hover:bg-green-600 transition-colors duration-200 capitalize shadow-sm border-b-[7px] border-b-green-600">
            {cta_text.value}
          </button>
        </div>
        {/* list of course features */}
        <div className="my-4 px-3">
          <h3 className="text-lg font-semibold py-4 text-gray-700">এই কোর্সে যা থাকছে</h3>
          <div>
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 mb-2">
                <Image src={item.icon} alt={item.text} width={20} height={20} />
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:flex justify-between mt-3 hidden">
        <span className="text-[12px] text-gray-600">কোর্সটি সম্পর্কে বিস্তারিত জানতে</span>
        <a href="tel:16910" className="text-[12px] text-green-600 underline">
          <span className="flex items-center gap-1">
            <FaPhoneFlip /> ফোন করুন (16910)
          </span>
        </a>
      </div>
    </>
  );
}
