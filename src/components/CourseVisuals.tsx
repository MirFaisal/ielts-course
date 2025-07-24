import { MediaItem } from "@/types/productTypes";
import Slider from "./Slider";

const CourseVisuals = ({ media }: { media: MediaItem[] }) => {
  return (
    <div className="w-full h-[900px] bg-white shadow p-2">
      <Slider media={media} />
    </div>
  );
};

export default CourseVisuals;
