import * as React from "react"
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavLink } from "react-router-dom"
import { List, ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material"

import { createStyles } from "../../styles/header/NavBarStyles.ts";
import ROUTES from "../../models/routes-model.ts"

const pages = ["Reviews", "TBD"];

export default function NavBar() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const styles = createStyles(theme);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={[styles.NavBar, styles.NavBarHeight]}>
            <Container maxWidth="xl" sx={styles.NavBarHeight}>
                <Toolbar disableGutters sx={styles.NavBarHeight}>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={ROUTES.ROOT}
                        sx={[styles.NavBarLogoMain, styles.NavBarLogo]}
                    >
                        Exercise App
                    </Typography>

                    <Box sx={styles.NavBarMenuMobile}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={styles.NavBarMenuMobileOpen}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    component={NavLink}
                                    to={ROUTES[page.toUpperCase() as keyof typeof ROUTES]}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography sx={styles.NavBarMenuItemMobileText}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to={ROUTES.ROOT}
                        sx={[styles.NavBarLogoMain, styles.NavBarLogoMobile]}
                    >
                        Exercise App
                    </Typography>
                    <Box sx={styles.NavBarMenu}>
                        <List sx={styles.NavBarMenuList}>
                            {pages.map((page) => (
                                <ListItem key={page} disablePadding>
                                    <ListItemButton sx={styles.NavBarMenuListButton}
                                        onClick={handleCloseNavMenu}>
                                        <NavLink to={ROUTES[page.toUpperCase() as keyof typeof ROUTES]}
                                            style={
                                                ({ isActive }) => ({
                                                    color: isActive ? styles.NavBarLinkActive.color : "inherit"
                                                })}>
                                            <ListItemText primary={page} />
                                        </NavLink>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
