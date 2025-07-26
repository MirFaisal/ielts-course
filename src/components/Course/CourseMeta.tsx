import { Course } from "@/types/productTypes";
import Image from "next/image";
import CourseVisuals from "./CourseVisuals";

const CourseMeta = ({ courseData }: { courseData: Course }) => {
  return (
    <>
      <div className="w-full bg-[url('/background/course_meta_bg.jpeg')] bg-cover bg-center h-64 flex items-center justify-center">
        <div className="max-w-6xl mx-auto grid grid-cols-6 justify-between items-center h-full gap-4">
          {/* Course Title and Rating */}
          <div className="col-span-4 h-full flex items-center justify-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-white">{courseData.title}</h1>
              {/* Course Rating */}
              <div className="flex gap-2">
                <span className="inline-block">
                  <Image
                    src="/elements/five_star.jpeg"
                    alt="course rating"
                    width={100}
                    height={20}
                    className="rounded"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </span>
                <span className="inline-block text-white font-medium">
                  (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                </span>
              </div>
              {/* Course Description */}
              <div
                className="text-gray-400 font-medium"
                dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
            </div>
          </div>
          {/* Course Image and cta */}
          <div className="col-span-2 h-full relative">
            <div className="absolute top-[50px] left-0 w-full flex items-center justify-center">
              <CourseVisuals
                media={courseData.media}
                cta_text={courseData.cta_text}
                checklist={courseData.checklist}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseMeta;
