import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from '@mui/styles/withStyles';
import FabGroup from "./navigation/FabGroup";
import "aos/dist/aos.css";
import Routing from "./Routing";
import Modal from "@mui/material/Modal";

import ContactSection from "./home/ContactSection";

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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

function Main(props) {
  const { classes } = props;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

return (
    <div className={classes.wrapper}>
      <Modal
        open={isModalOpen}
        onClose={handleToggleModal}
        className={classes.container}
      >
        <ContactSection />
      </Modal>
      <div className={classes.fabGroupPosition}>
        <FabGroup onEmailClick={handleToggleModal} />
      </div>
      <Routing />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
