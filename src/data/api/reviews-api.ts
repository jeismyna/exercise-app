import type { ReviewFilters, ReviewsResponse } from "../../models/reviews-model";

/* export interface GetReviewsParams {
    keyword?: string;
    stars?: string;
    page?: number;
    count?: number;
} */

export async function getReviews(url: string, filters: ReviewFilters): Promise<ReviewsResponse> {

    const params = new URLSearchParams();

    if (filters.keyword.trim()) {
        params.set("q", filters.keyword.trim());
    }

    if (filters.rating !== "all") {
        params.set("stars", filters.rating);
    }

    if (filters.page) {
        params.set("count", String(25 * filters.page));
    }

    const requestUrl = params.toString() ? `${url}?${params.toString()}` : url;
    const response = await fetch(requestUrl);

    if (!response.ok) {
        const errorText = await response.json().catch(() => "Unknown error");
        throw new Error(
            `Failed to fetch reviews: ${errorText.message}`
        );
    }

    const data = await response.json() as ReviewsResponse;
    return data;
}
