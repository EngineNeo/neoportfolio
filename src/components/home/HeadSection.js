import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@mui/styles/withStyles";
import { Typography } from "@mui/material";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
    // svh = visible height with mobile browser bars shown, so no phantom scroll
    minHeight: "100svh",
    fallbacks: {
      minHeight: "100vh",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  container: {
    // keep clear of the vertically centred Work button
    paddingRight: `${theme.spacing(10)} !important`,
    [theme.breakpoints.up("md")]: {
      paddingLeft: `${theme.spacing(8)} !important`,
      paddingRight: `${theme.spacing(24)} !important`,
    },
  },
  // Text starts transparent and floats up into place
  floatIn: {
    animation: "$floatIn 0.9s ease-in both",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
  title: {
    fontWeight: 800,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    maxWidth: 720,
    color: theme.palette.text.secondary,
    animationDelay: "0.35s",
  },
  "@keyframes floatIn": {
    from: { opacity: 0, transform: "translateY(32px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

function HeadSection(props) {
  const { classes } = props;

  return (
    <Fragment>
      <div id="head-section" className={classes.wrapper}>
        <div className={classNames("container-fluid", classes.container)}>
          <Typography variant="h1" align="left" className={classNames(classes.floatIn, classes.title)}>
            Hello, I'm Neo
          </Typography>
          <Typography variant="h5" align="left" className={classNames(classes.floatIn, classes.subtitle)}>
            a senior software engineer building machine-learning recommendation systems, data pipelines and full-stack web apps
          </Typography>
        </div>
      </div>
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);
