import { fetchProduct } from "@/lib/api";
import { InstructorBlock } from "@/types/productSections";

export default async function ProductPage({ params }: { params: { lang: "en" | "bn" } }) {
  const { data } = await fetchProduct(params.lang);

  const instructors = data.sections.find((s: InstructorBlock) => s.type === "instructors");

  console.log("Product Data:", data);
  console.log("Instructors:", instructors);
  return <div>Hello World</div>;
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang as "en" | "bn";
  const data = await fetchProduct(lang);
  return {
    title: data.seo?.metaTitle,
    description: data.seo?.metaDescription,
  };
}
