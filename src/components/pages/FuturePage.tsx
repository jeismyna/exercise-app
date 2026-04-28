import { useTheme, Container, Box, Typography } from "@mui/material"
import EngineeringIcon from "@mui/icons-material/Engineering";

export default function FuturePage() {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            {/* Title */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, mt: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: theme.palette.text.primary }}>
                        TBD
                    </Typography>
                    <EngineeringIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.darker, mb: 2 }}>
                    This page is under construction. Check back later!
                </Typography>
            </Box>
        </Container>
    );
}