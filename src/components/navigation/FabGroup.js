import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import { withStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const styles = theme => ({
    fabContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: '12px 0',
    },
    fab: {
        width: '70px',
        height: '70px',
        transition: 'all 0.3s',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '50px',
            height: '50px',
        },
    },
    fabTopCentered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '120px',
    },
    label: {
        position: 'absolute',
        right: '100%',
        marginRight: '12px',
        opacity: 0,
        color: 'white',
        transition: 'opacity 0.3s',
        whiteSpace: 'nowrap',
        fontSize: '1.1rem',
        lineHeight: '70px',
    },
    labelVisible: {
        opacity: 1,
    },
    icon: {
        fontSize: '2rem',
        [theme.breakpoints.down('md')]: {
            width: '1.5rem',
            height: '1.5rem',
        },
    },
});

const FabGroup = ({ classes, onEmailClick, onResumeClick, onProjectsClick, onBackClick, showProjectSection }) => {
    const [hover, setHover] = useState({ Projects: false, Resume: false, Email: false, GitHub: false });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMouseEnter = (label) => {
        setHover({ ...hover, [label]: true });
    };

    const handleMouseLeave = (label) => {
        setHover({ ...hover, [label]: false });
    };

    const handleClick = (fab) => {
        if (fab.label === 'Email') {
            onEmailClick();
        } else if (fab.label === 'Resume') {
            onResumeClick();
        } else if (fab.label === 'Projects') {
            onProjectsClick();
        } else {
            window.open(fab.url, '_blank');
        }
    };

    const fabData = [
        { label: 'Projects', icon: <FolderIcon className={classes.icon} />, color: 'primary', url: '/projects' },
        { label: 'Resume', icon: <DescriptionIcon className={classes.icon} />, color: 'default' },
        { label: 'Email', icon: <EmailIcon className={classes.icon} />, color: 'default' },
        { label: 'LinkedIn', icon: <LinkedInIcon className={classes.icon} />, color: 'default', url: 'https://www.linkedin.com/in/neo-m-9063b3137/' },
        { label: 'GitHub', icon: <GitHubIcon className={classes.icon} />, color: 'default', url: 'https://github.com/EngineNeo' },
    ];

    if (showProjectSection) {
        return (
            <div style={{ position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)' }}>
                <Fab onClick={onBackClick}>
                    <ArrowBackIcon />
                </Fab>
            </div>
        );
    }

    const filteredFabData = showProjectSection ? fabData.filter(fab => fab.label !== 'Projects') : fabData;

    return (
        <Stack direction="column" spacing={3}>
            {filteredFabData.map((fab, index) => (
                <div className={`${classes.fabContainer} ${index === 0 && !isMobile ? classes.fabTopCentered : ''}`} key={fab.label}>
                    <Fab
                        variant="round"
                        size="large"
                        color={fab.color}
                        className={classes.fab}
                        onMouseEnter={() => handleMouseEnter(fab.label)}
                        onMouseLeave={() => handleMouseLeave(fab.label)}
                        onClick={() => handleClick(fab)}
                    >
                        {fab.icon}
                    </Fab>
                    <span className={`${hover[fab.label] ? classes.labelVisible : ''} ${classes.label}`}>
                        {fab.label}
                    </span>
                </div>
            ))}
        </Stack>
    );
};

export default withStyles(styles)(FabGroup);
