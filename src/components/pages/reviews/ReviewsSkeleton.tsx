import { Box, Skeleton, Card, CardContent } from "@mui/material";

import { createStyles } from "../../../styles/pages/reviews/ReviewsSkeletonStyles";

const ReviewCardSkeleton = ({ styles }: any) => (
  <Card elevation={0} sx={styles.CardMain}>
    <CardContent sx={styles.CardContentMain}>
      <Skeleton variant="rectangular" width={100} height={18} sx={styles.SkeletonTitle} />
      <Skeleton variant="text" width="60%" sx={styles.SkeletonRating} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rectangular" width="100%" height={1} sx={styles.SkeletonDivider} />
      <Box sx={styles.SkeletonAuthorDate}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
      </Box>
    </CardContent>
  </Card>
);

interface ReviewsSkeletonProps {
  count?: number;
}

export default function ReviewsSkeleton({ count = 6 }: ReviewsSkeletonProps) {
  const styles = createStyles();

  return (
    <Box>
      <Skeleton variant="text" width={60} height={10} sx={styles.SkeletonDivider} />
      <Box sx={styles.SkeletonGrid}>
        {Array.from({ length: count }).map((_, i) => (
          <ReviewCardSkeleton key={i} styles={styles} />
        ))}
      </Box>
    </Box>
  );
};

