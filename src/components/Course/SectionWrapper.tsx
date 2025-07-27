import { SectionWrapperProps } from "@/types/sectionTypes";

export default function SectionWrapper({ sectionId, title, children }: SectionWrapperProps) {
  return (
    <div id={sectionId} className="md:min-h-[300px] rounded-lg scroll-mt-[120px] py-2 md:py-6 ">
      {title && <h2 className="text-xl md:text-2xl font-semibold md:mb-6 pb-1 md:pb-4">{title}</h2>}
      <div className="section-content">{children}</div>
    </div>
  );
}
