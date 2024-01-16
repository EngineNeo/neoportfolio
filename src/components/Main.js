import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
import FabGroup from "./navigation/FabGroup";
import "aos/dist/aos.css";
import Routing from "./Routing";
import Modal from "@mui/material/Modal";

import ContactSection from "./home/ContactSection";
import ResumeSection from "./home/ResumeSection";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background,
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
      <div className={classes.fabGroupPosition}>
        <FabGroup 
          onEmailClick={handleToggleContactModal}
          onResumeClick={handleToggleResumeModal}
        />
      </div>
      <Routing />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
