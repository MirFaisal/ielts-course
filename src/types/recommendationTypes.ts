export interface RecommendationProduct {
  product_id: number;
  sku_id: number;
  price: number;
  final_price: number;
  discount_amount: number;
  title: string;
  permalink: string;
  slug: string;
  media: Array<{
    name: string;
    resource_type: string;
    resource_value: string;
    thumbnail_url?: string;
  }>;
  instructors: Array<{
    name: string;
    image: {
      sqr_img: string;
      thumbnail: string;
      banner_img?: string;
    };
  }>;
  plan: null | Record<string, unknown>;
}

export interface RecommendationsResponse {
  status: number;
  message: string;
  payload: null | Record<string, unknown>;
  errors: unknown[];
  data: {
    products: RecommendationProduct[];
    paginate_meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}
