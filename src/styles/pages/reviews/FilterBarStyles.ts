export const createStyles = () => {

    return {
        BoxMain: {
            display: "flex",
            gap: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            alignItems: "center"
        },
        TextFieldMain: {
            flex: 1,
            minWidth: 200
        },
        FormControlMain: {
            minWidth: 160,
            flexShrink: 0
        },
        ClearFiltersButton: {
            whiteSpace: "nowrap",
            flexShrink: 0,
            borderRadius: 2
        }
    }
}