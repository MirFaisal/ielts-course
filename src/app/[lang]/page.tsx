import { fetchProduct } from "@/lib/api";
import { InstructorBlock } from "@/types/productSections";

export default async function ProductPage({ params }: { params: Promise<{ lang: "en" | "bn" }> }) {
  const { lang } = await params;
  const { data } = await fetchProduct(lang);

  const instructors = data.sections.find((s: InstructorBlock) => s.type === "instructors");

  console.log("Product Data:", data);
  console.log("Instructors:", instructors);
  return <div>Hello World</div>;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data = await fetchProduct(lang as "en" | "bn");
  return {
    title: data.seo?.metaTitle,
    description: data.seo?.metaDescription,
  };
}
