import { useTheme, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { createStyles } from "../../../styles/pages/reviews/ReviewCardDialogStyles";
import type { Review } from "../../../models/reviews-model";
import { formatDate } from "../../../utils/dateGrouping";
import StarRating from "./StarRating";

interface ReviewCardDialogProps {
    selectedReview: Review | null;
    onCloseClick?: () => void;
}

export default function ReviewCardDialog({ selectedReview, onCloseClick }: ReviewCardDialogProps) {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Dialog open={Boolean(selectedReview)} onClose={onCloseClick} fullWidth maxWidth="sm" sx={styles.DialogMain} >
            <DialogTitle sx={styles.DialogTitleMain}>
                <Box sx={styles.DialogTitleBox}> {selectedReview?.title || "Review details"} </Box>
                {selectedReview && (
                    <Box sx={styles.StarRatingBox}>
                        <StarRating value={selectedReview.stars} size="medium"  />
                        {selectedReview.version && (
                            <Chip label={`v${selectedReview.version}`} size="small" variant="outlined" sx={styles.VersionText} />
                        )}
                    </Box>
                )}
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={styles.DialogContentMain}>
                    <PersonOutlinedIcon sx={styles.AuthorIcon} />
                    <Typography variant="subtitle2" sx={styles.AuthorText}>
                        {selectedReview?.author || "Anonymous"}
                    </Typography>
                </Box>
                <DialogContentText sx={styles.DialogContentText}>
                    {selectedReview?.review}
                </DialogContentText>
                {selectedReview && (
                    <Box sx={styles.ReviewDateBox}>
                        <CalendarTodayOutlinedIcon sx={styles.ReviewDateIcon} />
                        <Typography variant="caption" color={styles.ReviewDateIcon.color}>
                            {formatDate(selectedReview.date)}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseClick}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
