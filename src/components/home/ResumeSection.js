import React from "react";
import { Button, Paper } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { withStyles } from "@mui/styles";
import ZoomImage from "../../shared/components/ZoomImage";

const styles = (theme) => ({
  paper: {
    width: '500px',
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    boxSizing: 'border-box',
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    boxShadow: '0 3px 0 rgba(120, 165, 205, 0.35), 0 24px 48px rgba(29, 53, 87, 0.22)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: 'auto', // Centers the paper in the modal
  },
  imageStyle: {
    width: "100%",
    minHeight: 0,
    objectFit: "contain",
    borderRadius: 8,
    boxShadow: '0 4px 14px rgba(29, 53, 87, 0.15)',
  },
  downloadButton: {
    marginTop: theme.spacing(2.5),
    borderRadius: 999,
  },
});

function ResumeSection(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      {/* Use the ZoomImage component */}
      <ZoomImage
        src="items/Neo Maralit Resume.jpg"
        alt="Neo Maralit Resume"
        className={classes.imageStyle}
        data-aos="zoom-out"
      />

      {/* Download button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        className={classes.downloadButton}
        href="items/Neo Maralit Resume.pdf"
        download
      >
        Download Resume
      </Button>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ResumeSection);
