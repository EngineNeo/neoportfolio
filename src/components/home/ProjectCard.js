import React from 'react';
import Card from '@mui/material/Card';
import { withStyles } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

const styles = (theme) => ({
  card: {
    height: '500px',
    width: '300px',
  },
});

const ProjectCard = (props) => {
  const { classes, image, title, description, githubLink } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="github link" onClick={() => window.open(githubLink, '_blank')}>
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ProjectCard);