import { useTheme, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { createStyles } from "../../../styles/pages/reviews/StarRatingStyles";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: "small" | "medium" | "large";
}

export default function StarRating({ value, max = 5, size = "small" }: StarRatingProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const filled = Math.round(value);

  return (
    <Box sx={styles.BoxMain}>
      {Array.from({ length: max }, (_, i) =>
        i < filled ? (
          <StarIcon key={i} fontSize={size} sx={styles.StarFilled} />
        ) : (
          <StarBorderIcon key={i} fontSize={size} sx={styles.StarBorder} />
        )
      )}
    </Box>
  );
};
