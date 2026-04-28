import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import type { Review, ReviewFilters, RatingOption } from "../models/reviews-model";
import { getReviews } from "../data/api/reviews-api";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const VALID_RATINGS: RatingOption[] = ["all", "1", "2", "3", "4", "5"];

function parseRating(value: string | number | null): RatingOption {
  if (value && VALID_RATINGS.includes(value as RatingOption)) {
    return value as RatingOption;
  }
  return "all";
}

 function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}


export interface UseReviewsResult {
  reviews: Review[];
  total: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filters: ReviewFilters;
  setKeyword: (keyword: string) => void;
  setRating: (rating: RatingOption) => void;
  resetFilters: () => void;
  loadMore: () => void;
}

export function useReviews(): UseReviewsResult {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial state from URL
  const initialKeyword = searchParams.get("q") ?? "";
  const initialRating = parseRating(searchParams.get("stars"));

  //const initialPage = parsePage(searchParams.get("page"));
  const [keyword, setKeywordState] = useState<string>(initialKeyword);
  const [rating, setRatingState] = useState<RatingOption>(initialRating);
  //const [page, setPage] = useState<number>(initialPage);
  const [page, setPage] = useState<number>(1);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Track whether we're appending (load more) or replacing (filter change)
  const appendRef = useRef<boolean>(false);

  const filters: ReviewFilters = { keyword, rating, page };

  // Ensure ?page=1 is present on first load
  /*   useEffect(() => {
      if (!searchParams.has("page")) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        setSearchParams(params, { replace: true });
      }
    }, [searchParams, setSearchParams]); */

  // Sync URL when filters change (but not page — page is internal)
      const updateUrl = useCallback((newKeyword: string, newRating: RatingOption, newPage: number) => {
      const params: Record<string, string> = {};
      if (newKeyword.trim()) params["q"] = newKeyword.trim();
      if (newRating !== "all") params["stars"] = newRating;
      params["page"] = String(newPage);
      setSearchParams(params, { replace: false });
    },
      [setSearchParams]
    );


  // Listen to browser back/forward navigation
  useEffect(() => {
    const urlKeyword = searchParams.get("q") ?? "";
    const urlRating = parseRating(searchParams.get("stars"));
    const urlPage = parsePage(searchParams.get("page"));

    if (urlKeyword !== keyword || urlRating !== rating || urlPage !== page) {
      setKeywordState(urlKeyword);
      setRatingState(urlRating);
      setPage(urlPage);
      appendRef.current = false;
    }
  }, [searchParams, keyword, rating, page]);


  const matchesRating = (review: Review, ratingValue: RatingOption) => {
    if (ratingValue === "all") return true;
    const expected = Number(ratingValue);
    return (
      Number(review.stars) === expected
    );
  };

  // Fetch reviews whenever filters or page change
  useEffect(() => {
    let cancelled = false;

    const doFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getReviews(API_BASE_URL, { keyword, rating, page });
        const filtered =
          rating === "all"
            ? result.reviews
            : result.reviews.filter((review) => matchesRating(review, rating));

        if (!cancelled) {
          if (appendRef.current) {
            setReviews((prev) => [...prev, ...filtered]);
          } else {
            setReviews(filtered);
          }

          const shouldUseFilteredTotal =
            rating !== "all" && filtered.length !== result.reviews.length;

          if (shouldUseFilteredTotal) {
            const nextTotal = appendRef.current ? reviews.length + filtered.length : filtered.length;
            setTotal(nextTotal);
          } else {
            setTotal(result.total);
          }

          setHasMore(result.this_page < result.pages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while fetching reviews."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          appendRef.current = false;
        }
      }
    };

    doFetch();

    return () => {
      cancelled = true;
    };
  }, [keyword, rating, page]);

  const setKeyword = useCallback(
    (newKeyword: string) => {
      setKeywordState(newKeyword);
      setPage(1);
      appendRef.current = false;
      updateUrl(newKeyword, rating, 1);
    },
    [rating, updateUrl]
  );

  const setRating = useCallback(
    (newRating: RatingOption) => {
      setRatingState(newRating);
      setPage(1);
      appendRef.current = false;
      updateUrl(keyword, newRating, 1);
    },
    [keyword, updateUrl]
  );

  const resetFilters = useCallback(() => {
    setKeywordState("");
    setRatingState("all");
    setPage(1);
    appendRef.current = false;
    updateUrl("", "all", 1);
  }, [updateUrl]);

  const loadMore = useCallback(() => {
    appendRef.current = true;
    const nextPage = page + 1;
    setPage(nextPage);
    updateUrl(keyword, rating, nextPage);
  }, [keyword, rating, page, updateUrl]);

  return {
    reviews,
    total,
    loading,
    error,
    hasMore,
    filters,
    setKeyword,
    setRating,
    resetFilters,
    loadMore,
  };
}
