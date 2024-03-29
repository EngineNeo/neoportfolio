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
        backgroundColor: "#343a40",
        padding: theme.spacing(3),
        width: '100%', // Default width
        [theme.breakpoints.up('sm')]: {
            width: '800px' // Width on screens larger than 'sm'
        },
        minHeight: "400px",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
    },
    textFieldStyles: {
        backgroundColor: '#3b444b',
        color: 'white',
    },
    submitButton: {
        marginTop: theme.spacing(1),
        color: '#3b444b',
    },
    icon: {
        fontSize: 50,
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
            <Typography variant="h2" align="center" color="white" style={{ marginBottom: '1rem' }}>
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
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    margin="normal"
                    name="user_email"
                    type="email"
                    fullWidth
                    required  // Add this line
                    className={classes.textFieldStyles}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />

                <TextField
                    label="Message"
                    variant="filled"
                    margin="normal"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    required  // Add this line
                    className={classes.textFieldStyles}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                    Send
                </Button>
            </form>
        </Paper>
    );
}

export default withStyles(styles, { withTheme: true })(ContactSection);
