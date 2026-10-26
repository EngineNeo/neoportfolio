// Add personal email copy

import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Paper, Snackbar } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import emailjs from '@emailjs/browser';
import { withStyles } from '@mui/styles';

const serviceId = process.env.REACT_APP_YOUR_SERVICE_ID;
const templateId = process.env.REACT_APP_YOUR_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_YOUR_PUBLIC_KEY;

const styles = (theme) => ({
    paperStyle: {
        backgroundColor: theme.palette.common.white,
        borderRadius: 20,
        padding: theme.spacing(4),
        width: '800px',
        maxWidth: 'calc(100vw - 32px)',
        // dvh tracks the visible area as mobile browser bars show/hide
        maxHeight: 'calc(100dvh - 32px)',
        fallbacks: {
            maxHeight: 'calc(100vh - 32px)',
        },
        overflowY: 'auto',
        boxSizing: 'border-box',
        minHeight: "400px",
        boxShadow: '0 3px 0 rgba(120, 165, 205, 0.35), 0 24px 48px rgba(29, 53, 87, 0.22)',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3, 2),
            borderRadius: 16,
            minHeight: 0,
        },
    },
    heading: {
        fontWeight: 800,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
            marginBottom: theme.spacing(1),
        },
    },
    textFieldStyles: {
        '& .MuiFilledInput-root': {
            backgroundColor: '#f0f7fe',
            borderRadius: 12,
            '&:hover, &.Mui-focused': {
                backgroundColor: '#e6f2fd',
            },
            '&:before, &:after': {
                display: 'none',
            },
        },
    },
    submitButton: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: 999,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    icon: {
        fontSize: 50,
        verticalAlign: 'middle',
        color: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            fontSize: 32,
        },
    }
});

function ContactSection(props) {
    const { classes } = props;
    const form = useRef();
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setOpenSuccessSnackbar(true);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setOpenErrorSnackbar(true);
            });
    };

    const handleCloseSuccessSnackbar = () => {
        setOpenSuccessSnackbar(false);
    };

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    };

    return (
        <Paper className={classes.paperStyle}>
            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSnackbar}
                message="Message sent successfully!"
                action={
                    <Button color="secondary" size="small" onClick={handleCloseSuccessSnackbar}>
                        Close
                    </Button>
                }
            />

            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
                message="Failed to send message. Please try again."
                action={
                    <Button color="secondary" size="small" onClick={handleCloseErrorSnackbar}>
                        Close
                    </Button>
                }
            />
            <Typography variant="h2" align="center" className={classes.heading}>
                Let's get in touch <MailIcon className={classes.icon} />
            </Typography>
            <form ref={form} onSubmit={sendEmail}>
                <TextField
                    label="Name"
                    variant="filled"
                    margin="normal"
                    name="user_name"
                    fullWidth
                    className={classes.textFieldStyles}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    margin="normal"
                    name="user_email"
                    type="email"
                    fullWidth
                    required
                    className={classes.textFieldStyles}
                />

                <TextField
                    label="Message"
                    variant="filled"
                    margin="normal"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    className={classes.textFieldStyles}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                    Send
                </Button>
            </form>
        </Paper>
    );
}

export default withStyles(styles, { withTheme: true })(ContactSection);
