export const createStyles = (theme: any) => {

    const { elevation } = {
        elevation: 0
    };

    return {
        NavBarHeight: {
            height: "68px"
        },
        NavBar: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: `${theme.shadows[elevation]}!important`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.secondary
        },
        NavBarLogoMain: {
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: theme.palette.primary.brand
        },
        NavBarLogo: {
            mr: 5,
            display: { xs: "none", md: "flex" }
        },
        NavBarLogoMobile: {
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1
        },
        NavBarMenu: {
            flexGrow: 1,
            display: { xs: "none", md: "flex" }
        },
        NavBarMenuList: {
            display: "flex",
            justifyContent: "flex-end"
        },
        NavBarMenuListButton: {
            my: 2,
            display: "block",
            "& .MuiTypography-root": {
                fontWeight: 600,
                fontSize: "1rem"
            }
        },
        NavBarMenuMobile: {
            flexGrow: 1,
            display: { xs: "flex", md: "none" }
        },
        NavBarMenuMobileOpen: {
            display: { xs: "block", md: "none" }
        },
        NavBarMenuItemMobileText: {
            textAlign: "center"
        },
        NavBarLinkActive: {
            color: theme.vars.palette.text.primary
        }
    }
}