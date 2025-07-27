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

export async function fetchRecommendations() {
  const res = await fetch(
    "https://api.10minuteschool.com/catalog-service/api/v2/recommendations?context_identification_id=153&context_identification_type=product&placement=product_page",
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
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}
