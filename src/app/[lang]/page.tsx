import Banner from "@/components/Course/Banner";
import CourseDetails from "@/components/Course/CourseDetails";
import CourseMeta from "@/components/Course/CourseMeta";
import { fetchProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: Promise<{ lang: "en" | "bn" }> }) {
  const { lang } = await params;
  const { data } = await fetchProduct(lang);

  return (
    <>
      <Banner />
      <CourseMeta courseData={data} />
      <CourseDetails courseData={data} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}

// export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
//   const { lang } = await params;
//   const data = await fetchProduct(lang as "en" | "bn");

//   if (!data.seo) {
//     return {
//       title: "IELTS Course",
//       description: "Best IELTS Preparation Course",
//     };
//   }

//   const ogData = data.seo.defaultMeta?.reduce(
//     (acc: Record<string, string>, meta: { content: string; value: string }) => {
//       if (meta.value.startsWith("og:")) {
//         const key = meta.value.replace("og:", "");
//         acc[key] = meta.content;
//       }
//       return acc;
//     },
//     {} as Record<string, string>,
//   );

//   const schemas =
//     data.seo.schema?.map((schema: { meta_value: string }) => schema.meta_value).filter(Boolean) || [];

//   return {
//     title: data.seo.title,
//     description: data.seo.description,
//     keywords: data.seo.keywords,
//     openGraph: {
//       title: ogData?.title,
//       description: ogData?.description,
//       type: ogData?.type,
//       url: ogData?.url,
//       locale: ogData?.locale,
//       images: ogData?.image
//         ? [
//             {
//               url: ogData.image,
//               secureUrl: ogData["image:secure_url"],
//               alt: ogData["image:alt"],
//               type: ogData["image:type"],
//             },
//           ]
//         : undefined,
//     },
//     other: {
//       ...schemas.reduce((acc: Record<string, string>, schema: string, index: number) => {
//         if (schema) {
//           acc[`script:ld+json${index > 0 ? `-${index}` : ""}`] = schema;
//         }
//         return acc;
//       }, {} as Record<string, string>),
//     },
//   };
// }

type OGMeta = {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  locale?: string;
  image?: {
    url?: string;
    secure_url?: string;
    alt?: string;
    type?: string;
  };
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  try {
    const { lang } = await params;
    const { data } = await fetchProduct(lang as "en" | "bn");

    if (!data?.seo) {
      return {
        title: "IELTS Course",
        description: "Best IELTS Preparation Course",
      };
    }

    const ogData: OGMeta = {};

    interface Meta {
      value: string;
      content: string;
      type?: string;
    }

    interface SEOData {
      defaultMeta?: Meta[];
      schema?: Schema[];
      title?: string;
      description?: string;
      keywords?: string[];
    }

    (data.seo as SEOData).defaultMeta?.forEach((meta: Meta) => {
      const { value, content } = meta;

      if (value.startsWith("og:image")) {
        const parts: string[] = value.split(":").slice(1); // remove 'og'
        const [first, ...rest]: string[] = parts;

        if (!ogData.image) ogData.image = {};

        if (first === "image" && rest.length === 0) {
          ogData.image.url = content;
        } else if (first === "image" && rest.length > 0) {
          const subKey: string = rest.join("_"); // convert 'secure_url' etc.
          (ogData.image as Record<string, string>)[subKey] = content;
        }
      } else if (value.startsWith("og:")) {
        const key = value.replace("og:", "") as keyof OGMeta;
        (ogData as OGMeta)[key] = content;
      }
    });

    interface Schema {
      meta_value: string;
      meta_name?: string;
      type?: string;
    }

    const schemas: string[] =
      data.seo.schema
        ?.map((s: Schema) => s.meta_value)
        .filter((value: string) => value && value.trim() !== "") || [];

    return {
      title: data.seo.title || "IELTS Course",
      description: data.seo.description || "Best IELTS Preparation Course",
      keywords: Array.isArray(data.seo.keywords) ? data.seo.keywords.join(", ") : data.seo.keywords,
      openGraph: {
        title: ogData.title || data.seo.title,
        description: ogData.description || data.seo.description,
        type: ogData.type || "website",
        url: ogData.url,
        locale: ogData.locale || "en_US",
        images: ogData.image?.url
          ? [
              {
                url: ogData.image.url,
                secureUrl: ogData.image.secure_url ?? ogData.image.url,
                alt: ogData.image.alt ?? data.seo.title ?? "IELTS Course",
                type: ogData.image.type ?? "image/jpeg",
              },
            ]
          : undefined,
      },
      other: schemas.reduce((acc, schema, index) => {
        if (schema && schema.trim() !== "") {
          acc[`script:ld+json${index > 0 ? `-${index}` : ""}`] = schema;
        }
        return acc;
      }, {} as Record<string, string>),
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "IELTS Course",
      description: "Best IELTS Preparation Course",
    };
  }
}
