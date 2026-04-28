export interface ReviewsResponse {
    total: number;
    pages: number;
    this_page: number;
    reviews: Review[];
}

export interface Review {
    id: string;
    title: string;
    review: string;
    author: string;
    date: string;
    stars: number;
    product: number;
    version?: string;
}

export interface ReviewFilters {
  keyword: string;
  rating: string;
  page: number;
}

export type RatingOption = "all" | "1" | "2" | "3" | "4" | "5";

export interface DateGroup {
  label: string;
  reviews: Review[];
}