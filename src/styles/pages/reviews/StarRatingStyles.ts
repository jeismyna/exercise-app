export const createStyles = (theme: any) => {

    return {
        BoxMain: {
            display: "flex",
            alignItems: "center",
            gap: 0.25 
        },
        StarFilled: {
            color: theme.palette.primary.star
        },
        StarBorder: {
            color: theme.palette.primary.star,
            opacity: 0.4
        }
    }
}