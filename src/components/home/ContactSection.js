import React, { useRef } from "react";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import emailjs from '@emailjs/browser';

const serviceId = process.env.REACT_APP_YOUR_SERVICE_ID;
const templateId = process.env.REACT_APP_YOUR_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_YOUR_PUBLIC_KEY;

function ContactSection(props) {
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
        .then((result) => {
            console.log(result.text);
            e.target.reset();
        }, (error) => {
            console.log(error.text);
        });
    };

    const textFieldStyles = {
        backgroundColor: '#3b444b',
        color: 'white'
    };

    return (
        <Grid container id="contact-section" style={{ backgroundColor: "#353839", padding: '2rem' }}>
            <Grid item xs={12} md={12}>
                <Typography variant="h2" align="center" className="lg-mg-bottom" color="white">
                    Let's get in touch <MailIcon style={{ fontSize: 50 }} />
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} container justifyContent="center">
                <Box 
                backgroundColor="#414a4c"
                borderRadius="16px"
                p={3}
                width={{ xs: '100%', sm: '800px'}}
                minHeight="400px"
                data-aos="fade-down"
                data-aos-anchor-placement="center-center"
                style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)'}}>
                    <form ref={form} onSubmit={sendEmail}>
                        <TextField
                            label="Name"
                            variant="filled"
                            margin="normal"
                            name="user_name"
                            fullWidth
                            style={textFieldStyles}
                            InputLabelProps={{style: { color: 'white' }}}
                            InputProps={{style: { color: 'white' }}}
                        />
                        <TextField
                            label="Email"
                            variant="filled"
                            margin="normal"
                            name="user_email"
                            type="email"
                            fullWidth
                            style={textFieldStyles}
                            InputLabelProps={{style: { color: 'white' }}}
                            InputProps={{style: { color: 'white' }}}
                        />
                        <TextField
                            label="Message"
                            variant="filled"
                            margin="normal"
                            name="message"
                            multiline
                            rows={4}
                            fullWidth
                            style={textFieldStyles}
                            InputLabelProps={{style: { color: 'white' }}}
                            InputProps={{style: { color: 'white' }}}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem', color: '#3b444b' }}>
                            Send
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ContactSection;