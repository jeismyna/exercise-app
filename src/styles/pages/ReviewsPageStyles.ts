export const createStyles = (theme: any) => {

    return {
        ContainerMain: {
            mt: 5
        },
        TitleBoxMain: {
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1,
            mt: 4
        },
        TitleText: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: theme.palette.text.primary
        },
        TitleIcon: {
            fontSize: 28,
            color: theme.palette.primary.main
        },
        SubTitleText: {
            color: theme.palette.text.darker,
            mb: 2
        },
        FilterBarBox: {
            mb: 2.5,
            borderRadius: 3
        },
        TotalReviewsBox: {
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1
        },
        TotalReviewsChip: {
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "0.75rem"
        },
        FilterDivider: {
            mb: 3
        },
        ErrorAlert: {
            mb: 3,
            borderRadius: 2
        },
        NoResultsBox: {
            textAlign: "center",
            py: 10,
            color: theme.palette.text.darker,
        },
        NoResultsIcon: {
            fontSize: 48,
            opacity: 0.2,
            mb: 2
        },
        NoResultsText: {
            fontWeight: 500
        },
        NoResultsSubText: {
            mt: 0.5
        },
        LoadMoreBox: {
            mt: 3,
            mb: 3,
            display: "flex",
            justifyContent: "center"
        },
        LoadMoreButton: {
            borderRadius: 50,
            px: 4,
            fontWeight: 600,
            textTransform: "none"
        }
    }
}