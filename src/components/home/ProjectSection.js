import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard';
import { withStyles } from '@mui/styles';

const projects = [
  {
    image: 'items/FitConnect.png',
    title: 'FitConnect',
    description: 'FitConnect, a comprehensive fitness application, is my latest full-stack development project, completed with a talented team. As the lead developer, I integrated React for a dynamic user interface, Django for robust back-end functionality, and MySQL for efficient data management. This app allows users to meticulously track their exercises, weight, mood, and calorie intake. It features a sophisticated user interface and a unique platform for coaches to interact directly with users, enhancing the fitness journey for different user types.',
    githubLink: ['https://github.com/EngineNeo/FitConnect-Frontend',
                 'https://github.com/EngineNeo/FitConnect-Backend']
  },
  {
    image: 'items/Options.png',
    title: 'Options Pricing Application',
    description: 'An advanced options pricing application using Streamlit, harnessing the power of Python\'s robust libraries. This application utilizes NumPy for numerical computations, Pandas for data handling, and Matplotlib for visualizations. I\'ve integrated Arch models for complex predictive modeling. The user - friendly Streamlit interface brings this complex functionality to life, making options pricing analysis both accessible and comprehensive for financial professionals and enthusiasts.',
    githubLink: 'https://github.com/EngineNeo/options-pricing'
  },
  {
    image: 'items/OliviaChen.png',
    title: 'Portfolio',
    description: 'I designed an innovative portfolio website using React for a dynamic, responsive user interface, and Firebase for robust back-end functionality. The site features full CRUD (Create, Read, Update, Delete) capabilities, allowing users to effortlessly manage their content. React\'s component- based architecture enhances the user experience with interactive elements, while Firebase provides a real - time database, authentication, and hosting.This combination ensures a seamless, intuitive experience for users, showcasing my skills in modern web development technologies."',
    websiteLink: 'https://oliviachen.art/'
  },
];

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
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.common.darkBlack,
    overflow: 'hidden',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center', 
  },
});

const ProjectSection = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <Grid container spacing={1} className={classes.gridContainer}>
          {projects.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} className={classes.gridItem}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(ProjectSection);