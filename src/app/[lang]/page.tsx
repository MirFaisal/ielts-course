import Banner from "@/components/Course/Banner";
import CourseDetails from "@/components/Course/CourseDetails";
import CourseMeta from "@/components/Course/CourseMeta";
import Recommendations from "@/components/Course/Recommendations";
import { fetchProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ lang: "en" | "bn" }> }) {
  const { lang } = await params;
  const { data } = await fetchProduct(lang);

  // console.log("Course Data:", data);

  return (
    <>
      <Banner />
      <CourseMeta courseData={data} />
      <CourseDetails courseData={data} />
      <Recommendations />
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  try {
    const { lang } = await params;
    const { data } = await fetchProduct(lang as "en" | "bn");

    // Fallback metadata
    const fallback = {
      title: "IELTS Course",
      description: "Best IELTS Preparation Course",
    };

    if (!data?.seo) return fallback;

    // Extract OpenGraph data simply
    const ogMeta: Record<string, string> = {};
    data.seo.defaultMeta?.forEach((meta: { content: string; value: string }) => {
      if (meta.value.startsWith("og:")) {
        const key = meta.value.replace("og:", "");
        ogMeta[key] = meta.content;
      }
    });

    // Get schemas
    const schemas =
      data.seo.schema
        ?.map((s: { meta_value: string }) => s.meta_value)
        .filter((value: string) => value && value.trim()) || [];

    return {
      title: data.seo.title || fallback.title,
      description: data.seo.description || fallback.description,
      keywords: Array.isArray(data.seo.keywords) ? data.seo.keywords.join(", ") : data.seo.keywords,
      openGraph: {
        title: ogMeta.title || data.seo.title,
        description: ogMeta.description || data.seo.description,
        type: ogMeta.type === "product" ? "website" : ogMeta.type || "website",
        url: ogMeta.url,
        locale: ogMeta.locale || "en_US",
        images: ogMeta.image
          ? [
              {
                url: ogMeta.image,
                secureUrl: ogMeta["image:secure_url"] || ogMeta.image,
                alt: ogMeta["image:alt"] || data.seo.title || "IELTS Course",
                type: ogMeta["image:type"] || "image/jpeg",
              },
            ]
          : undefined,
      },
      other: schemas.reduce((acc: Record<string, string>, schema: string, index: number) => {
        if (schema.trim()) {
          acc[`script:ld+json${index > 0 ? `-${index}` : ""}`] = schema;
        }
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "IELTS Course",
      description: "Best IELTS Preparation Course",
    };
  }
}
