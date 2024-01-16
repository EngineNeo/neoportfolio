import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
// import NavBar from "./navigation/NavBar";
import FabGroup from "./navigation/FabGroup";
import "aos/dist/aos.css";
import Routing from "./Routing";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);

  const selectHome = useCallback(() => {
    document.title =
      "Neo Maralit";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  return (
    <div className={classes.wrapper}>
      <FabGroup />
      <Routing />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
