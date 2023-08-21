import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@mui/styles/withStyles";
import { Typography } from "@mui/material";
import WaveBorder from "../../../shared/components/WaveBorder";
import { useTypingEffect } from "../../../shared/components/useTypingEffect";
import DigitalRainComponent from "../../../shared/components/digitalRain";

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
  blinkingUnderscore: {
    animation: `$blink 1s infinite`
  },
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 }
  },
  digitalRain: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '70%', // Display only the right half
    height: '100%',
    zIndex: 0,  // to make sure it's behind the text
  },
});

function HeadSection(props) {
  const { classes, theme } = props;

  const [title, isTitleTyping] = useTypingEffect("Hello, I'm Neo", 80, true);
  const [subtitle] = useTypingEffect("a software engineer dedicated to crafting efficient and innovative solutions", 80, !isTitleTyping);

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <DigitalRainComponent className={classes.digitalRain} />
        <div className={classNames("container-fluid", classes.container)}>
          <Typography variant="h1" align="left" className="lg-mg-top" color="white">
            {title}
            {isTitleTyping && <span className={classes.blinkingUnderscore}>_</span>}
          </Typography>
          <Typography variant="h5" align="left" className="lg-mg-bottom" color="white">
            {subtitle}
            {!isTitleTyping && <span className={classes.blinkingUnderscore}>_</span>}
          </Typography>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#353839"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);
