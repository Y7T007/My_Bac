/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import Cookies from 'js-cookie';


// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from "../../../Axios_api_cfg";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const [userInfos, setUserInfos] = useState({});
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchInfosUser = async () => {
      try {


        const data = JSON.parse(localStorage.getItem('userInfos'));
        console.log(data)
        setUserInfos(data);
        setUserName(data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle other errors if needed
      }
    };

    fetchInfosUser();
  }, []);


  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(string) {
    const name = string ?? 'Wait Response';
    const splitName = name.split(' ');

    let children;

    if (splitName.length === 2) {
      // If the name contains two words, take the first letter of each word
      children = `${splitName[0][0].toUpperCase()}${splitName[1][0].toUpperCase()}`;
    } else {
      // If the name contains one word or more than two words, use the original name
      children = name[0].toUpperCase();
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: children,
    };
  }
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );
  const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
  if (route[0]==="quizzes" && route.length >= 2 ){
  route.length-=1;
  }

  const decodedRoute = route.map((element) => decodeURIComponent(element));
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>

        {isMini ? (
            <>

                <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
                  <SoftBox className={'w-50'}>
                    <SoftInput
                        placeholder="hello here..."
                        icon={{ component: "search", direction: "left" }}
                    />
                  </SoftBox>
                  <SoftBox color={light ? "white" : "inherit"}>
                    {token ? (
                        // if the user is connected
                        <Link to="/profile">
                          <IconButton sx={navbarIconButton} size="small">
                            <Avatar {...stringAvatar(userInfos.name)} />
                            <SoftTypography
                                variant="button"
                                fontWeight="medium"
                                color={light ? "white" : "dark"}
                            >
                              {userInfos.name}
                            </SoftTypography>
                          </IconButton>
                        </Link>
                    ) : (
                        // if the user is not connected
                        <Link to="/profile">
                          <IconButton sx={navbarIconButton} size="small">
                            <Icon
                                sx={({ palette: { dark, white } }) => ({
                                  color: light ? white.main : dark.main,
                                })}
                            >
                              account_circle
                            </Icon>
                            <SoftTypography
                                variant="button"
                                fontWeight="medium"
                                color={light ? "white" : "dark"}
                            >
                              Sign In
                            </SoftTypography>
                          </IconButton>
                        </Link>
                    )}


                    <IconButton
                        size="small"
                        color="inherit"
                        sx={navbarMobileMenu}
                        onClick={handleMiniSidenav}
                    >
                      <Icon className={light ? "text-white" : "text-dark"}>
                        {miniSidenav ? "menu_open" : "menu"}
                      </Icon>
                    </IconButton>
                    <IconButton
                        size="small"
                        color="inherit"
                        sx={navbarIconButton}
                        onClick={handleConfiguratorOpen}
                    >
                      <Icon>settings</Icon>
                    </IconButton>
                    <IconButton
                        size="small"
                        color="inherit"
                        sx={navbarIconButton}
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleOpenMenu}
                    >
                      <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
                    </IconButton>
                    {renderMenu()}
                  </SoftBox>
                </SoftBox>
            </>
            ) : (
                <>
                  <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={decodedRoute[decodedRoute.length - 1]} route={decodedRoute} light={light} />
                  </SoftBox>
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
            <SoftBox color={light ? "white" : "inherit"}>
              {token ? (
                  // if the user is connected
                  <Link to="/profile">
                    <IconButton sx={navbarIconButton} size="small">
                      <Avatar {...stringAvatar(userInfos.name)} />
                      <SoftTypography
                          variant="button"
                          fontWeight="medium"
                          color={light ? "white" : "dark"}
                      >
                        {userInfos.name}
                      </SoftTypography>
                    </IconButton>
                  </Link>
              ) : (
                  // if the user is not connected
                  <Link to="/profile">
                    <IconButton sx={navbarIconButton} size="small">
                      <Icon
                          sx={({ palette: { dark, white } }) => ({
                            color: light ? white.main : dark.main,
                          })}
                      >
                        account_circle
                      </Icon>
                      <SoftTypography
                          variant="button"
                          fontWeight="medium"
                          color={light ? "white" : "dark"}
                      >
                        Sign In
                      </SoftTypography>
                    </IconButton>
                  </Link>
              )}


              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
                </>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
