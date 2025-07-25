import CourseMeta from "@/components/Course/CourseMeta";
import { fetchProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ lang: "en" | "bn" }> }) {
  const { lang } = await params;
  const { data } = await fetchProduct(lang);

  console.log("Product Data:", data);
  return (
    <>
      <CourseMeta courseData={data} />
      <div className="w-full h-[1900px]"></div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data = await fetchProduct(lang as "en" | "bn");
  return {
    title: data.seo?.metaTitle,
    description: data.seo?.metaDescription,
  };
}
