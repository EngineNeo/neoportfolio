import React from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  Typography,
  Toolbar,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = (theme) => ({
  closeIcon: {
    marginRight: theme.spacing(0.5),
  },
  headSection: {
    width: 200,
    backgroundColor: theme.palette.common.darkBlack
  },
  blackList: {
    backgroundColor: theme.palette.common.black,
    height: "100%",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});

function NavigationDrawer(props) {
  const { open, onClose, anchor, classes, menuItems, selectedItem, theme, scrollTo } =
    props;
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  window.onresize = () => {
    if (isWidthUpSm && open) {
      onClose();
    }
  };

  return (
    <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
      <Toolbar className={classes.headSection}>
        <ListItem
          style={{
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            height: "100%",
            justifyContent: anchor === "left" ? "flex-start" : "flex-end",
          }}
          disableGutters
        >
          <ListItemIcon className={classes.closeIcon}>
            <IconButton
              onClick={onClose}
              aria-label="Close Navigation"
              size="large"
            >
              <CloseIcon color="primary" />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </Toolbar>
      <List className={classes.blackList}>
        {menuItems.map((element) => {
          return (
            <ListItem
              button
              key={element.name}
              selected={selectedItem === element.name}
              onClick={() => {
                onClose();
                if (element.id) {
                  scrollTo(element.id);
                }
              }}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" color="white">
                    {element.name}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

NavigationDrawer.propTypes = {
  anchor: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  selectedItem: PropTypes.string,
  scrollTo: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavigationDrawer);
