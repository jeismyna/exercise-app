export const createStyles = (theme: any) => {

    return {
        ReviewCardMain: {
            height: "100%",
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: 2,
            overflow: "hidden",
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            "&:hover": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                borderColor: theme.palette.primary.light
            }
        },
        ReviewCardActionArea: {
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            height: "100%",
            justifyContent: "space-between"
        },
        ReviewCardContent: {
            p: 2.5,
            "&:last-child": {
                pb: 2.5
            },
            flexGrow: 1
        },
        ReviewCardRatingBox: {
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1
        },
        ReviewCardVersion: {
            height: 20,
            fontSize: "0.65rem",
            borderRadius: 1
        },
        ReviewCardTitle: {
            fontWeight: 700,
            fontSize: "0.95rem",
            color: theme.palette.text.primary,
            mb: 0.75,
            lineHeight: 1.3,
        },
        ReviewCardBody: {
            lineHeight: 1.65,
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: theme.palette.text.darker
        },
        ReviewCardDivider: {
            mb: 1.5
        },
        ReviewCardMetaBox: {
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap"
        },
        ReviewCardMetaText: {
            display: "flex",
            alignItems: "center",
            gap: 0.5
        },
        ReviewCardMetaIcon: {
            fontSize: 14,
            color: theme.palette.text.disabled
        }
    }
}