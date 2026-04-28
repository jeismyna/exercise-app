export const createStyles = (theme: any, collapsed: boolean) => {

    return {
        HeaderBox: {
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5
        },
        IconButtonMain: {
            color: theme.palette.text.darker,
            p: 0.5
        },
        ExpandIcon: {
            transition: "transform 0.2s ease",
            transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
        },
        GroupTitle: {
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: theme.palette.text.disabled,
            whiteSpace: "nowrap"
        },
        GroupDividerBox: {
            flex: 1,
            height: "1px",
            backgroundColor: theme.palette.divider
        },
        ReviewCount: {
            color: theme.palette.text.disabled,
            fontSize: "0.7rem"
        },
        ReviewGrid: {
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
            },
            gap: 2
        }
    }
}