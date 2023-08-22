import React from "react";
import { Typography, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from '@mui/icons-material/Download';
import { withTheme } from "@mui/styles";
import ZoomImage from "../../shared/components/ZoomImage";  // Adjust the path to where ZoomImage is saved

function ProjectSection(props) {
  return (
    <div id="resume-section" style={{ backgroundColor: "#353839" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h2" align="center" className="lg-mg-bottom" color="white">
          Resume <DescriptionIcon style={{ fontSize: 50 }} />
        </Typography>
        <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            
            {/* Use the ZoomImage component */}
            <ZoomImage 
              src="Neo Maralit Resume.jpg" 
              alt="Neo Maralit Resume" 
              style={{ 
                width: "50%", 
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)'
              }}
              data-aos="zoom-out"
            />

            {/* Download button */}
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<DownloadIcon />}
              style={{ marginTop: 20 }}
              href="Neo Maralit Resume.pdf" 
              download
            >
              Download Resume
            </Button>
            
        </div>
      </div>
    </div>
  );
}

ProjectSection.propTypes = {};

export default withTheme(ProjectSection);
