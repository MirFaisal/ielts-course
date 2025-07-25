import CourseDetails from "@/components/Course/CourseDetails";
import CourseMeta from "@/components/Course/CourseMeta";
import { fetchProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ lang: "en" | "bn" }> }) {
  const { lang } = await params;
  const { data } = await fetchProduct(lang);

  console.log("Product Data:", data);
  return (
    <>
      <CourseMeta courseData={data} />
      <CourseDetails courseData={data} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data = await fetchProduct(lang as "en" | "bn");

  if (!data.seo) {
    return {
      title: "IELTS Course",
      description: "Best IELTS Preparation Course",
    };
  }

  const ogData = data.seo.defaultMeta?.reduce(
    (acc: Record<string, string>, meta: { content: string; value: string }) => {
      if (meta.value.startsWith("og:")) {
        const key = meta.value.replace("og:", "");
        acc[key] = meta.content;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const schemas =
    data.seo.schema?.map((schema: { meta_value: string }) => schema.meta_value).filter(Boolean) || [];

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    openGraph: {
      title: ogData?.title,
      description: ogData?.description,
      type: ogData?.type,
      url: ogData?.url,
      locale: ogData?.locale,
      images: ogData?.image
        ? [
            {
              url: ogData.image,
              secureUrl: ogData["image:secure_url"],
              alt: ogData["image:alt"],
              type: ogData["image:type"],
            },
          ]
        : undefined,
    },
    other: {
      ...schemas.reduce((acc: Record<string, string>, schema: string, index: number) => {
        if (schema) {
          acc[`script:ld+json${index > 0 ? `-${index}` : ""}`] = schema;
        }
        return acc;
      }, {} as Record<string, string>),
    },
  };
}
