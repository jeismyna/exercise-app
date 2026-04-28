export const createStyles = (theme: any) => {

    return {
        DialogMain: {
            "& .MuiDialog-paper": {
                borderRadius: 3
            }
        },
        DialogTitleMain: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mt: 0
        },
        DialogTitleBox: {
            flex: 1,
            minWidth: 0
        },
        StarRatingBox: {
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0
        },
        VersionText: {
            height: 24,
            fontSize: "0.7rem",
            borderRadius: 1
        },
        DialogContentMain: {
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            mb: 1,
            color: theme.palette.text.darker
        },
        AuthorIcon: {
            fontSize: 14
        },
        AuthorText: {
            color: theme.palette.text.darker
        },
        DialogContentText: {
            whiteSpace: "pre-line",
            color: theme.palette.text.primary,
            mb: 2
        },
        ReviewDateBox: {
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            flexWrap: "wrap"
        },
        ReviewDateIcon: {
            fontSize: 14,
            color: theme.palette.text.darker
        }
    }
}