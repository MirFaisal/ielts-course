import Image from "next/image";

const CourseMeta = ({ courseData }: { courseData: any }) => {
  return (
    <>
      <div className="w-full bg-[url('/background/course_meta_bg.jpeg')] bg-cover bg-center h-64 flex items-center justify-center">
        <div className="max-w-6xl mx-auto grid grid-cols-5 justify-between items-center h-full gap-4">
          {/* Course Title and Rating */}
          <div className="col-span-3 h-full flex items-center justify-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-white">{courseData.title}</h1>
              {/* Course Rating */}
              <div className="flex gap-2">
                <span className="inline-block">
                  <Image
                    src="/elements/five_star.jpeg"
                    alt="course rating"
                    width={100}
                    height={100}
                    className="rounded"
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
          <div className="border border-white col-span-2 h-full"></div>
        </div>
      </div>
    </>
  );
};

export default CourseMeta;
