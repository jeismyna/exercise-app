import { useState } from "react";
import { useTheme, Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { createStyles } from "../../../styles/pages/reviews/DateGroupSectionStyles";
import type { DateGroup, Review } from "../../../models/reviews-model";
import ReviewCard from "./ReviewCard";

interface DateGroupSectionProps {
  group: DateGroup;
  onReviewClick: (review: Review) => void;
}

export default function DateGroupSection({ group, onReviewClick }: DateGroupSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  const theme = useTheme();
  const styles = createStyles(theme, collapsed);

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={styles.HeaderBox} >
        <IconButton size="small" onClick={() => setCollapsed((prev) => !prev)} sx={styles.IconButtonMain}
          aria-label={collapsed ? "Expand reviews" : "Collapse reviews"}>
          <ExpandMoreIcon sx={styles.ExpandIcon} />
        </IconButton>
        <Typography variant="caption" sx={styles.GroupTitle}>
          {group.label}
        </Typography>
        <Box sx={styles.GroupDividerBox} />
        <Typography variant="caption" sx={styles.ReviewCount}>
          {group.reviews.length}
        </Typography>
      </Box>
      <Collapse in={!collapsed}>
        <Box sx={styles.ReviewGrid}>
          {group.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onClick={onReviewClick} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};
