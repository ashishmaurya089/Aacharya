import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { Call, Email, LocationOn } from '@material-ui/icons';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import ContactForm from './ContactForm';

import useStyles from './styles';
import { Link } from 'react-router-dom';
function MuiContact() {
	const classes = useStyles();
	return (
		<>
			<CustomBreadCrumbs heading='Contact Us' subHeading='Contact' />
			<Container fixed>
				<Grid container spacing={2} className={classes.root}>
					<Grid item xs={12} md={6}>
						<Paper elevation={3} className={classes.contact}>
							<LocationOn color='primary' />
							<h3>Our Address</h3>
							<p>
								Flat.No.A2, Sri Vijaya Nilayam, Hanumaiah street, Bhavanipuram,
								Vijayawada, Andhra Pradesh, India, 520012
							</p>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3}>
						<a href={'mailto:info@aacharya.net'}>
							<Paper elevation={3} className={classes.contact}>
								<Email color='primary' />
								<h3>Email</h3>
								<p>info@aacharya.net</p>
							</Paper>
						</a>
					</Grid>
					<Grid item xs={12} md={3}>
						<a href={'tel:+917386141814'}>
							<Paper elevation={3} className={classes.contact}>
								<Call color='primary' />
								<h3>Call</h3>
								<p>+91 7386141814</p>
							</Paper>
						</a>
					</Grid>
				</Grid>
				<ContactForm />
			</Container>
		</>
	);
}

export default MuiContact;
