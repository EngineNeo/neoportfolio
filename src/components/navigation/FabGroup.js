import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import { withStyles } from '@mui/styles';

const styles = {
    fabContainer: {
        display: 'flex', // Use flexbox for alignment
        alignItems: 'center', // Center-align vertically
        position: 'relative',
        margin: '12px 0',
    },
    fab: {
        width: '70px',
        height: '70px',
        transition: 'all 0.3s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        position: 'absolute',
        right: '100%',
        marginRight: '12px',
        opacity: 0,
        color: 'white',
        transition: 'opacity 0.3s',
        whiteSpace: 'nowrap',
        fontSize: '1.1rem', // Increased font size
        lineHeight: '70px', // Align text vertically
    },
    labelVisible: {
        opacity: 1,
    },
    icon: {
        fontSize: '2rem',
    },
};

const FabGroup = ({ classes, onEmailClick }) => {
    const [hover, setHover] = useState({ Projects: false, Resume: false, Email: false, GitHub: false });

    const handleMouseEnter = (label) => {
        setHover({ ...hover, [label]: true });
    };

    const handleMouseLeave = (label) => {
        setHover({ ...hover, [label]: false });
    };

    const handleClick = (fab) => {
        if (fab.label === 'Email') {
            onEmailClick(); // Call the function to open the modal
        } else {
            window.location.href = fab.url; // Redirect to the URL for other Fabs
        }
    };

    const fabData = [
        { label: 'Projects', icon: <FolderIcon className={classes.icon} />, color: 'primary', url: '/projects' },
        { label: 'Resume', icon: <DescriptionIcon className={classes.icon} />, color: 'default', url: '/resume' },
        { label: 'Email', icon: <EmailIcon className={classes.icon} />, color: 'default' },
        { label: 'GitHub', icon: <GitHubIcon className={classes.icon} />, color: 'default', url: 'https://github.com/EngineNeo' },
    ];

    return (
        <Stack direction="column" spacing={3}>
            {fabData.map((fab) => (
                <div className={classes.fabContainer} key={fab.label}>
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
