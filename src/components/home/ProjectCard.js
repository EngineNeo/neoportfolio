import withStyles from "@mui/styles/withStyles";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useCard } from './CardContext';

const styles = (theme) => ({
  item: {
    width: '320px',
    height: '450px',
    background: '#3b444b no-repeat center center / cover',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.4s ease-in-out',
    cursor: 'pointer',
  },
  itemActive: {
    width: '450px',
    boxShadow: '12px 40px 40px rgba(0, 0, 0, 0.25)',
    transition: 'width 0.4s ease',
  },
  title: {
    transform: 'translateY(0)', // initial position
    transition: 'all 0.4s ease-in-out', // transition to make the slide effect
    margin: '0 30px 0',
    whiteSpace: 'nowrap',
    position: 'absolute', // Positioning title at the bottom
    bottom: '20px',
  },
  titleActive: {
    transform: 'translateY(-70px)', // You can adjust this value based on your design needs.
    bottom: '30px', // Adjust this value based on the height of the description or as needed
  },
  itemDesc: {
    opacity: 0,
    transform: 'translateY(0)',  // Adjust this to start from the title's bottom position
    transition: 'all 0.4s ease-in-out',
    position: 'absolute',  // Set this to absolute
    bottom: '0px',  // Place it below the title initially
    margin: '0 30px 0',
    minWidth: '400px'
  },
  itemDescActive: {
    opacity: 1,
    transform: 'translateY(-20px)',  // Reset position for active state
  },
});

function ProjectCard(props) {
  const { classes, headline, text } = props;
  
  const { activeCard, setActiveCard } = useCard(); // Access the context values

  const isActive = activeCard === headline;

  const handleCardClick = () => {
    if (isActive) {
      setActiveCard(null); // If the card is currently active, close it
    } else {
      setActiveCard(headline); // Otherwise, make it the active card
    }
  };

  return (
    <Fragment>
      <div className={`${classes.item} ${isActive ? classes.itemActive : ''}`} onClick={handleCardClick}>
        <Typography variant="h4" color="white" className={`${classes.title} ${isActive ? classes.titleActive : ''}`}>
          {headline}
        </Typography>
        <div className={`${classes.itemDesc} ${isActive ? classes.itemDescActive : ''}`}>
          <Typography variant="body1" color="white">
            {text}
          </Typography>
        </div>
      </div>
    </Fragment>
  );
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ProjectCard);