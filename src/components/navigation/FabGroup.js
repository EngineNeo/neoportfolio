import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { withStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const paperShadow = '0 3px 0 rgba(120, 165, 205, 0.35), 0 10px 20px rgba(50, 95, 145, 0.18)';

const styles = theme => ({
    // Work sits on the right edge, vertically centred
    workPosition: {
        position: 'fixed',
        top: '50%',
        right: theme.spacing(3),
        transform: 'translateY(-50%)',
        zIndex: 1000,
        [theme.breakpoints.down('md')]: {
            right: theme.spacing(2),
        },
    },
    backPosition: {
        position: 'fixed',
        top: '50%',
        left: theme.spacing(3),
        transform: 'translateY(-50%)',
        zIndex: 1000,
        // Below md the cards reach the screen edges, so park Back in the
        // bottom-left corner opposite the speed dial
        [theme.breakpoints.down('md')]: {
            left: theme.spacing(2),
            top: 'auto',
            bottom: theme.spacing(2),
            transform: 'none',
        },
    },
    navFab: {
        boxShadow: paperShadow,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
        '@media (hover: hover)': {
            '&:hover': {
                transform: 'translateX(4px)',
            },
        },
    },
    backFab: {
        '&.MuiFab-default': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.primary,
            '&:hover': {
                backgroundColor: '#f0f7fe',
            },
        },
        '@media (hover: hover)': {
            '&:hover': {
                transform: 'translateX(-4px)',
            },
        },
    },
    navLabel: {
        marginLeft: theme.spacing(1),
        fontSize: '1rem',
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(3),
        zIndex: 1000,
        [theme.breakpoints.down('md')]: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '& .MuiSpeedDial-fab': {
            boxShadow: paperShadow,
        },
    },
    actionFab: {
        boxShadow: paperShadow,
        '&.MuiFab-root': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.primary,
        },
        '&.MuiFab-root:hover': {
            backgroundColor: '#e6f2fd',
            color: theme.palette.primary.main,
        },
    },
});

const FabGroup = ({ classes, onEmailClick, onResumeClick, onWorkClick, onBackClick, showWorkSection }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const actions = [
        { label: 'Resume', icon: <DescriptionIcon />, onClick: onResumeClick },
        { label: 'Email', icon: <EmailIcon />, onClick: onEmailClick },
        { label: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/neo-m-9063b3137/' },
        { label: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com/EngineNeo' },
    ];

    const handleAction = (action) => {
        setOpen(false);
        if (action.url) {
            window.open(action.url, '_blank', 'noopener,noreferrer');
        } else {
            action.onClick();
        }
    };

    return (
        <>
            {showWorkSection ? (
                <div className={classes.backPosition}>
                    <Fab
                        onClick={onBackClick}
                        aria-label="Back"
                        className={`${classes.navFab} ${classes.backFab}`}
                    >
                        <ArrowBackIcon />
                    </Fab>
                </div>
            ) : (
                <div className={classes.workPosition}>
                    <Fab
                        variant={isMobile ? 'circular' : 'extended'}
                        color="primary"
                        aria-label="Work"
                        onClick={onWorkClick}
                        className={classes.navFab}
                    >
                        <WorkIcon />
                        {!isMobile && <span className={classes.navLabel}>Work</span>}
                    </Fab>
                </div>
            )}
            {/* The other links pop out sideways from the corner button */}
            <SpeedDial
                ariaLabel="Resume, email and links"
                direction="left"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.label}
                        icon={action.icon}
                        tooltipTitle={action.label}
                        tooltipPlacement="top"
                        FabProps={{ className: classes.actionFab }}
                        onClick={() => handleAction(action)}
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default withStyles(styles)(FabGroup);
