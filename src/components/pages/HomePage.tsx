import { useTheme, Container, Box, Typography } from "@mui/material"

export default function HomePage() {
    const theme = useTheme();

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexGrow: 1, height: "90vh", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                    Appfigures Exercise App Homepage
                </Typography>
            </Box>
        </Container>
    );
}