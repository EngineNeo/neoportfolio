import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language'; // Import for web icon
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    width: '400px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  cardContent: {
    flexGrow: 1,
    overflow: 'auto',
  },
  cardActions: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
  title: {
    color: theme.palette.common.white,
  },
  description: {
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.grey[400],
    fontSize: '1.5em',
  },
});


const ProjectCard = (props) => {
  const { classes, image, title, description, githubLink, websiteLink } = props;

  const renderGitHubLinks = () => {
    if (Array.isArray(githubLink)) {
      return githubLink.map((link, index) => (
        <IconButton key={index} aria-label="github link" onClick={() => window.open(link, '_blank')}>
          <GitHubIcon className={classes.icon} />
        </IconButton>
      ));
    } else {
      return (
        <IconButton aria-label="github link" onClick={() => window.open(githubLink, '_blank')}>
          <GitHubIcon className={classes.icon} />
        </IconButton>
      );
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h4" component="div" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {renderGitHubLinks()}
        {websiteLink && (
          <IconButton aria-label="website link" onClick={() => window.open(websiteLink, '_blank')}>
            <LanguageIcon className={classes.icon} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ProjectCard);