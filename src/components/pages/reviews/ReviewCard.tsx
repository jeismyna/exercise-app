import { useTheme, Card, CardActionArea, CardContent, Typography, Box, Chip, Divider } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import type { Review } from "../../../models/reviews-model";
import { formatDate } from "../../../utils/dateGrouping";
import { createStyles } from "../../../styles/pages/reviews/ReviewCardStyles";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
  onClick?: (review: Review) => void;
}

export default function ReviewCard({ review, onClick }: ReviewCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Card
      elevation={0} sx={styles.ReviewCardMain}>
      <CardActionArea onClick={() => onClick?.(review)} sx={styles.ReviewCardActionArea}>
        <CardContent sx={styles.ReviewCardContent}>
          {/* Rating row */}
          <Box sx={styles.ReviewCardRatingBox}>
            <StarRating value={review.stars} />
            {review.version && (
              <Chip label={`v${review.version}`} size="small" variant="outlined" sx={styles.ReviewCardVersion} />
            )}
          </Box>

          {/* Title */}
          {review.title && (
            <Typography variant="subtitle2" sx={styles.ReviewCardTitle}>
              {review.title}
            </Typography>
          )}

          {/* Body */}
          <Typography variant="body2" sx={styles.ReviewCardBody}>
            {review.review}
          </Typography>

          <Divider sx={styles.ReviewCardDivider} />

          {/* Meta row */}
          <Box sx={styles.ReviewCardMetaBox}>
            <Box sx={styles.ReviewCardMetaText}>
              <PersonOutlinedIcon sx={styles.ReviewCardMetaIcon} />
              <Typography variant="caption" color={styles.ReviewCardMetaIcon.color}>
                {review.author || "Anonymous"}
              </Typography>
            </Box>
            <Box sx={styles.ReviewCardMetaText}>
              <CalendarTodayOutlinedIcon sx={styles.ReviewCardMetaIcon} />
              <Typography variant="caption" color={styles.ReviewCardMetaIcon.color}>
                {formatDate(review.date)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
