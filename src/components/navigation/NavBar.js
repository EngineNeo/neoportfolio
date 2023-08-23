import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Hidden, IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import MailIcon from '@mui/icons-material/Mail';
import BuildIcon from "@mui/icons-material/Build";
import NavigationDrawer from "../../shared/components/NavigationDrawer";

const styles = theme => ({
  appBarTop: {
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.darkBlack,
    transition: 'background-color 0.3s ease'  // This line adds the transition effect
  },
  toolbar: {
    display: "flex",
    justifyContent: "center"
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    padding: "0 50px"
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

function NavBar(props) {
  const [isTransparent, setTransparent] = useState(true);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const isTop = window.scrollY < 750; // You can adjust this value
      if (isTop !== isTransparent) {
        setTransparent(isTop);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); // Cleanup on unmount
  }, [isTransparent]);

  const {
    classes,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;

  const menuItems = [
    {
      id: "head-section",  // Assuming this is the id of the Home section
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white" />
    },
    {
      id: "project-section", // Assuming this is the id of the Projects section
      link: "/Projects",
      name: "Projects",
      icon: <BuildIcon className="text-white" />
    },
    {
      id: "resume-section",  // Assuming this is the id of the Resume section
      link: "/Resume",
      name: "Resume",
      icon: <DescriptionIcon className="text-white" />
    },
    {
      id: "contact-section",  // Assuming this is the id of the Resume section
      link: "/Contact",
      name: "Contact",
      icon: <MailIcon className="text-white" />
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar 
        position="fixed" 
        className={isTransparent ? classes.appBarTop : classes.appBar} // Conditionally switching styles
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
                size="large">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              {menuItems.map(element => {
                return (
                  <Link
                    key={element.name}
                    to={element.link}
                    className={classes.noDecoration}
                    onClick={() => {
                      handleMobileDrawerClose();
                      if (element.id) {
                        scrollTo(element.id);
                      }
                    }}
                  >
                    <Button
                      color="primary"
                      size="large"
                      classes={{ text: classes.menuButtonText }}
                    >
                      {element.name}
                    </Button>
                  </Link>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
        scrollTo={scrollTo}  // Passing scrollTo function as a prop
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
