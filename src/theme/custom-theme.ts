import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface PaletteColor {
        brand?: string;
        star?: string;
    }

    interface TypeText {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        brand?: string;
        star?: string;
        darker?: string;
    }
}

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data"
    },
    palette: {
        primary: {
            main: "#1a6bff",
            brand: "#ff4600",
            contrastText: "#0c0d0eb8",
            star: "#f5a623"
        },
        secondary: {
            main: "#fff",
            contrastText: "#0c0d0e",
        },
        text: {
            primary: "#0d1117",
            secondary: "#959da5",
            darker: "#586074"
        },
        background: {
            paper: "#fff",
            default: "#f6f8fa"
        }
    },
    typography: {
        fontFamily: "Inter, sans-serif"
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "Inter, sans-serif",
                    fontVariationSettings: "'opsz' 0"
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        }
    }
});

export default theme;