import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard';
import { withStyles } from '@mui/styles';

const projects = [
  {
    image: 'path/to/image1.jpg',
    title: 'Project One',
    description: 'This is a description for Project One.',
    githubLink: 'https://github.com/user/project-one'
  },
  {
    image: 'path/to/image2.jpg',
    title: 'Project Two',
    description: 'This is a description for Project Two.',
    githubLink: 'https://github.com/user/project-two'
  },
  {
    image: 'path/to/image2.jpg',
    title: 'Project Three',
    description: 'This is a description for Project Three.',
    githubLink: 'https://github.com/user/project-Three'
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
        <Grid container spacing={2} className={classes.gridContainer}>
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