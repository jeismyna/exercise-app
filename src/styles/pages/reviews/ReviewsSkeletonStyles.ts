export const createStyles = () => {

    return {
        CardMain: {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2
        },
        CardContentMain: {
            p: 2.5,
            "&:last-child": {
                pb: 2.5
            }
        },
        SkeletonTitle: {
            mb: 1.5,
            borderRadius: 1
        },
        SkeletonRating: {
            fontSize: "1rem",
            mb: 0.5
        },
        SkeletonDivider: {
            mt: 2,
            mb: 1.5
        },
        SkeletonAuthorDate: {
            display: "flex",
            gap: 2
        },
        SkeletonGrid: {
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