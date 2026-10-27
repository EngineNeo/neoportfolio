import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
import FabGroup from "./navigation/FabGroup";
import "aos/dist/aos.css";
import Routing from "./Routing";
import Modal from "@mui/material/Modal";
import Slide from '@mui/material/Slide';
import CloudLayer from "../shared/components/CloudLayer";

import ContactSection from "./home/ContactSection";
import ResumeSection from "./home/ResumeSection";
import WorkSection from "./home/WorkSection";

AOS.init({ once: true });

const backdropProps = {
  style: {
    backgroundColor: 'rgba(29, 53, 87, 0.3)',
    backdropFilter: 'blur(4px)',
  },
};

const pageEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    // svh = visible height with mobile browser bars shown, so no phantom scroll
    minHeight: '100svh',
    fallbacks: {
      minHeight: '100vh',
    },
    overflowX: "hidden",
  },
  // Both pages share one grid cell so they overlap while sliding
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
  },
  page: {
    gridArea: '1 / 1',
    minWidth: 0,
  },
  modalContent: {
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    outline: 'none',
  },
});

function Main(props) {
  const { classes } = props;
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isResumeModalOpen, setResumeModalOpen] = useState(false); 
  const [activeSection, setActiveSection] = useState('routing');

  // Start each page at the top so the incoming page isn't off-screen
  const showWork = () => {
    window.scrollTo(0, 0);
    setActiveSection('work');
  };

  const showRouting = () => {
    window.scrollTo(0, 0);
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
    <CloudLayer />
    <Modal
      open={isContactModalOpen}
      onClose={handleToggleContactModal}
      className={classes.modalContent}
      BackdropProps={backdropProps}
    >
      <div className={classes.modalInner}>
        <ContactSection />
      </div>
    </Modal>
    <Modal
      open={isResumeModalOpen}
      onClose={handleToggleResumeModal}
      className={classes.modalContent}
      BackdropProps={backdropProps}
    >
      <div className={classes.modalInner}>
        <ResumeSection />
      </div>
    </Modal>
    {/*
      Going to Work everything travels right, with the clouds: home exits
      off the right edge and Work enters from the left. Back reverses it.
      Both slides share one easing so the pages stay edge to edge (MUI's
      default eases enter and exit differently, so they overlapped), and
      appear={false} keeps the first load to the header's own fade-up.
    */}
    <div className={classes.content}>
      <Slide direction="left" in={activeSection === 'routing'} appear={false} easing={pageEasing} mountOnEnter unmountOnExit timeout={600}>
        <div className={classes.page}>
          <Routing />
        </div>
      </Slide>
      <Slide direction="right" in={activeSection === 'work'} appear={false} easing={pageEasing} mountOnEnter unmountOnExit timeout={600}>
        <div className={classes.page}>
          <WorkSection />
        </div>
      </Slide>
    </div>
    <FabGroup
      onEmailClick={handleToggleContactModal}
      onResumeClick={handleToggleResumeModal}
      onWorkClick={showWork}
      onBackClick={showRouting}
      showWorkSection={activeSection === 'work'}
    />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
