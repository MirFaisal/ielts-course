import { ReactNode } from "react";

interface SectionWrapperProps {
  sectionId: string;
  title?: string;
  children: ReactNode;
}

export default function SectionWrapper({ sectionId, title, children }: SectionWrapperProps) {
  return (
    <div id={sectionId} className="min-h-[300px] rounded-lg scroll-mt-[120px] py-6 ">
      {title && <h2 className="text-3xl font-bold mb-6 text-gray-900 pb-4">{title}</h2>}
      <div className="section-content">{children}</div>
    </div>
  );
}
