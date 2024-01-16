import React from "react";
import { Typography, Button, Paper } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from '@mui/icons-material/Download';
import { withStyles } from "@mui/styles";
import ZoomImage from "../../shared/components/ZoomImage";

const styles = (theme) => ({
  paper: {
    height: '700px',
    width: '500px',
    display: 'flex',
    backgroundColor: theme.palette.common.black,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: 'auto', // Centers the paper in the modal
  },
  imageStyle: {
    width: "100%",
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
  },
  downloadButton: {
    marginTop: theme.spacing(2.5),
  },
});

function ResumeSection(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      {/* Use the ZoomImage component */}
      <ZoomImage
        src="Neo Maralit Resume.jpg"
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
        href="Neo Maralit Resume.pdf"
        download
      >
        Download Resume
      </Button>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ResumeSection);
