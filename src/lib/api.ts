export async function fetchProduct(lang: "en" | "bn") {
  const res = await fetch(
    `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
    {
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
        accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
