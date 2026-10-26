import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WorkCard from './WorkCard';
import { withStyles } from '@mui/styles';

// Taken from the 2026 resume, newest first
const work = [
  {
    role: 'Senior Software Development Engineer',
    company: 'Fortune',
    dates: 'May 2025 – Present',
    location: 'New York, NY',
    highlights: [
      'Independently designed and built an end-to-end ML recommendation system, owning data ingestion, model training, ranking and production inference; increased recommendation click-through rate by 35%.',
      'Reduced recommendation API latency by 70% through backend query optimization and Redis caching.',
      'Built analytics and webhook ingestion pipelines with Dagster to keep engagement data fresh for model training and personalization.',
      'Automated infrastructure provisioning and deployment with AWS CDK, Docker and ECS for repeatable releases.',
    ],
    tags: ['Python', 'FastAPI', 'AWS OpenSearch', 'GraphQL', 'Redis', 'Dagster', 'AWS CDK', 'Docker', 'ECS'],
    websiteLink: 'https://fortune.com/',
  },
  {
    role: 'Fullstack Developer',
    company: 'FundNJ',
    dates: 'Aug 2024 – Feb 2025',
    location: 'Newark, NJ',
    highlights: [
      'Developed an end-to-end web application with Next.js, Django and MySQL, owning frontend components, backend APIs and database integration.',
      'Designed application data models and optimized MySQL-backed API endpoints, reducing data retrieval times by 30%.',
      'Built reusable UI components and backend modules to speed up feature work and simplify maintenance.',
    ],
    tags: ['Next.js', 'Django', 'MySQL'],
  },
  {
    role: 'Machine Learning & LLM Research Assistant',
    company: 'New Jersey Institute of Technology',
    dates: 'May 2024 – May 2025',
    location: 'Newark, NJ',
    highlights: [
      'Developed TensorFlow models classifying economic headlines as positive, negative or neutral with 93% accuracy, across 200+ headlines a day.',
      'Built data preparation and analysis workflows with NumPy and Pandas for economic-news modeling.',
      'Automated ETL workflows, reducing manual processing by 60%, raising field completeness above 90% and keeping error rates under 5%.',
    ],
    tags: ['TensorFlow', 'Python', 'NumPy', 'Pandas', 'ETL'],
    websiteLink: 'https://www.njit.edu/',
  },
];

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(10, 2, 14),
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 2, 12),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10, 12, 14),
    },
  },
  heading: {
    fontWeight: 800,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  gridContainer: {
    justifyContent: 'center',
    maxWidth: 1400,
    margin: '0 auto',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const WorkSection = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <div id="work-section" className={classes.wrapper}>
        <Typography variant="h2" component="h2" className={classes.heading}>
          Work
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} className={classes.gridContainer}>
          {work.map((job) => (
            <Grid item key={`${job.company}-${job.dates}`} xs={12} sm={6} lg={4} className={classes.gridItem}>
              <WorkCard {...job} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(WorkSection);
