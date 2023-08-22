import React from "react";
import { Grid, Typography } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import ProjectCard from "./ProjectCard";
import useWidth from "../../shared/functions/useWidth";
import { CardProvider } from "./CardContext"

const features = [
  {
    headline: "Project 1",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    mdDelay: "0",
    smDelay: "0",
  },
  {
    headline: "Project 2",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    mdDelay: "200",
    smDelay: "200",
  },
  {
    headline: "Project 3",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    mdDelay: "400",
    smDelay: "0",
  },
];

function ProjectSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div id="project-section" style={{ backgroundColor: "#353839" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h2" align="center" className="lg-mg-bottom" color="white">
          Projects <BuildIcon style={{ fontSize: 50 }} />
        </Typography>
        <div className="container-fluid">
          <CardProvider>
            <Grid container spacing={calculateSpacing(width, theme)}>
              {features.map((element) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                  key={element.headline}
                >
                    <ProjectCard
                      Icon={element.icon}
                      color={element.color}
                      headline={element.headline}
                      text={element.text}
                    />
                </Grid>
              ))}
            </Grid>
          </CardProvider>
        </div>
      </div>
    </div>
  );
}

ProjectSection.propTypes = {};

export default withTheme(ProjectSection);
