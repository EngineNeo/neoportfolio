import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    borderRadius: 18,
    boxShadow: '0 3px 0 rgba(120, 165, 205, 0.35), 0 14px 30px rgba(50, 95, 145, 0.15)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    // Only lift on real hover, so taps on touch screens don't leave it stuck
    '@media (hover: hover)': {
      '&:hover': {
        transform: 'translateY(-6px) rotate(-0.5deg)',
        boxShadow: '0 3px 0 rgba(120, 165, 205, 0.35), 0 22px 40px rgba(50, 95, 145, 0.2)',
      },
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '420px',
    },
  },
  // Pale blue band, like a coloured strip of paper across the top
  header: {
    position: 'relative',
    padding: theme.spacing(3, 3, 2),
    background: 'linear-gradient(180deg, #e3f2fd 0%, #f1f8fe 100%)',
    borderBottom: '1px dashed #cfe2f3',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5, 2, 1.5),
    },
  },
  dates: {
    display: 'inline-block',
    marginBottom: theme.spacing(1),
    padding: '2px 10px',
    borderRadius: 999,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '0.8rem',
  },
  role: {
    fontWeight: 800,
    lineHeight: 1.2,
    paddingRight: theme.spacing(4),
  },
  company: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  location: {
    color: theme.palette.text.secondary,
  },
  link: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    color: theme.palette.text.primary,
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 3, 3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2, 2.5),
    },
  },
  highlights: {
    margin: 0,
    paddingLeft: theme.spacing(2.5),
    flexGrow: 1,
    '& li': {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.secondary,
      lineHeight: 1.6,
    },
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  tag: {
    backgroundColor: '#f0f7fe',
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
});

const WorkCard = (props) => {
  const { classes, role, company, dates, location, highlights, tags, websiteLink } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <span className={classes.dates}>{dates}</span>
        <Typography variant="h5" component="h3" className={classes.role}>
          {role}
        </Typography>
        <Typography variant="subtitle1" className={classes.company}>
          {company}
        </Typography>
        <Typography variant="body2" className={classes.location}>
          {location}
        </Typography>
        {websiteLink && (
          <IconButton
            aria-label={`${company} website`}
            className={classes.link}
            onClick={() => window.open(websiteLink, '_blank', 'noopener,noreferrer')}
          >
            <LanguageIcon />
          </IconButton>
        )}
      </div>
      <CardContent className={classes.cardContent}>
        <ul className={classes.highlights}>
          {highlights.map((item) => (
            <li key={item}>
              <Typography variant="body2" component="span">{item}</Typography>
            </li>
          ))}
        </ul>
        <div className={classes.tags}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" className={classes.tag} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(WorkCard);
