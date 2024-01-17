import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
import FabGroup from "./navigation/FabGroup";
import "aos/dist/aos.css";
import Routing from "./Routing";
import Modal from "@mui/material/Modal";
import Slide from '@mui/material/Slide';

import ContactSection from "./home/ContactSection";
import ResumeSection from "./home/ResumeSection";
import ProjectSection from "./home/ProjectSection";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.darkBlack,
    overflowX: "hidden",
  },
  fabGroupPosition: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000, 
  },
  modalContent: {
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function Main(props) {
  const { classes } = props;
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isResumeModalOpen, setResumeModalOpen] = useState(false); 
  const [activeSection, setActiveSection] = useState('routing');
  const [slideDirection, setSlideDirection] = useState('left');

  const showProjects = () => {
    setSlideDirection('left'); // Slide left when showing projects
    setActiveSection('projects');
  };

  const showRouting = () => {
    setSlideDirection('right'); // Slide right when going back
    setActiveSection('routing');
  };

  const handleToggleContactModal = () => {
    setContactModalOpen(!isContactModalOpen);
  };

  const handleToggleResumeModal = () => {
    setResumeModalOpen(!isResumeModalOpen);
  };

return (
    <div className={classes.wrapper}>
    <Modal
      open={isContactModalOpen}
      onClose={handleToggleContactModal}
      className={classes.modalContent}
    >
      <ContactSection />
    </Modal>
    <Modal
      open={isResumeModalOpen}
      onClose={handleToggleResumeModal}
      className={classes.modalContent}
    >
      <ResumeSection />
    </Modal>
    <Slide direction={slideDirection} in={activeSection === 'routing'} mountOnEnter unmountOnExit>
      <div>
        {activeSection === 'routing' && <Routing />}
      </div>
    </Slide>
    <Slide direction={slideDirection} in={activeSection === 'projects'} mountOnEnter unmountOnExit>
      <div>
        {activeSection === 'projects' && <ProjectSection />}
      </div>
    </Slide>
      <div className={classes.fabGroupPosition}>
        <FabGroup
          onEmailClick={handleToggleContactModal}
          onResumeClick={handleToggleResumeModal}
          onProjectsClick={showProjects}
          onBackClick={showRouting}
          showProjectSection={activeSection === 'projects'}
        />
      </div>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
