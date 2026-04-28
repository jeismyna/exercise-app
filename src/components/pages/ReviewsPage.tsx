import { useMemo, useState } from "react";
import { useTheme, Container, Box, Typography, Button, Alert, Chip, CircularProgress, Divider } from "@mui/material"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { createStyles } from "../../styles/pages/ReviewsPageStyles";
import { useReviews } from "../../hooks/useReviews";
import { groupReviewsByDate } from "../../utils/dateGrouping";
import type { RatingOption, Review } from "../../models/reviews-model";

import FilterBar from "./reviews/FilterBar";
import ReviewsSkeleton from "./reviews/ReviewsSkeleton";
import DateGroupSection from "./reviews/DateGroupSection";
import ReviewCardDialog from "./reviews/ReviewCardDialog";

export default function ReviewsPage() {
    const theme = useTheme();
    const styles = createStyles(theme);

    const { reviews, total, loading, error, hasMore, filters, setKeyword, setRating, resetFilters, loadMore } = useReviews();
    const displayedTotal = total;
    const isInitialLoad = reviews.length === 0 && loading;
    const isLoadingMore = loading && reviews.length > 0;
    const dateGroups = useMemo(() => groupReviewsByDate(reviews), [reviews]);


    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const handleReviewClick = (review: Review) => {
        setSelectedReview(review);
    };

    const closeReviewDialog = () => setSelectedReview(null);

    return (
        <Container maxWidth="xl" sx={styles.ContainerMain}>
            <Box >
                {/* Title */}
                <Box sx={styles.TitleBoxMain}>
                    <Typography variant="h4" sx={styles.TitleText}>
                        Reviews
                    </Typography>
                    <ChatBubbleOutlineOutlinedIcon sx={styles.TitleIcon} />
                </Box>
                <Typography variant="body2" sx={styles.SubTitleText}>
                    User reviews for the ChatGPT iOS app
                </Typography>

                {/* Filter bar */}
                <Box sx={styles.FilterBarBox}>
                    <FilterBar
                        keyword={filters.keyword.trim()}
                        rating={filters.rating as RatingOption}
                        onKeywordChange={setKeyword}
                        onRatingChange={setRating}
                        onClearFilters={resetFilters}
                    />
                </Box>

                {/* Totals label */}
                {!isInitialLoad && !error && (
                    <Box sx={styles.TotalReviewsBox}>
                        <Chip
                            label={loading ? "Loading…" : `${displayedTotal.toLocaleString()} ${displayedTotal === 1 ? "review" : "reviews"}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={styles.TotalReviewsChip}
                        />
                    </Box>
                )}

                <Divider sx={styles.FilterDivider} />

                {/* Error state */}
                {error && (
                    <Alert severity="error" sx={styles.ErrorAlert}
                        action={
                            <Button color="inherit" size="small" onClick={() => setKeyword(filters.keyword)}>
                                Reset
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                )}

                {/* Initial loading skeleton */}
                {isInitialLoad && <ReviewsSkeleton count={6} />}

                {/* Results */}
                {!isInitialLoad && !error && (
                    <>
                        {reviews.length === 0 && !loading ? (
                            <Box sx={styles.NoResultsBox}>
                                <ChatBubbleOutlineOutlinedIcon sx={styles.NoResultsIcon} />
                                <Typography variant="body1" sx={styles.NoResultsText}>
                                    No reviews found
                                </Typography>
                                <Typography variant="body2" sx={styles.NoResultsSubText}>
                                    Try adjusting your filters or search term.
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                {dateGroups.map((group) => (
                                    <DateGroupSection key={group.label} group={group} onReviewClick={handleReviewClick} />
                                ))}

                                {/* Load more */}
                                {(hasMore || isLoadingMore) && (
                                    <Box sx={styles.LoadMoreBox}>
                                        <Button variant="outlined" onClick={loadMore} disabled={isLoadingMore}
                                            startIcon={
                                                isLoadingMore ? (
                                                    <CircularProgress size={16} />
                                                ) : undefined
                                            }
                                            sx={styles.LoadMoreButton}
                                        >
                                            {isLoadingMore ? "Loading…" : "Load more"}
                                        </Button>
                                    </Box>
                                )}
                                <ReviewCardDialog selectedReview={selectedReview} onCloseClick={closeReviewDialog} />
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}