import React from 'react';
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';

const FabGroup = () => {
    return (
        <Stack direction="column" spacing={2}>
            <Fab color="primary" aria-label="projects">
                <FolderIcon />
            </Fab>
            <Fab color="secondary" aria-label="resume">
                <DescriptionIcon />
            </Fab>
            <Fab color="success" aria-label="email">
                <EmailIcon />
            </Fab>
            <Fab color="default" aria-label="github">
                <GitHubIcon />
            </Fab>
        </Stack>
    );
}

export default FabGroup;