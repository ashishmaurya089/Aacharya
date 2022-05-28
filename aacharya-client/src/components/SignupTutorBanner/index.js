import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import useStyles from './styles';

function SignupTutorBanner() {
	const classes = useStyles();
	return (
		<Container maxWidth='lg' fixed >
			<div className={classes.root} style={{textAlign:"center"}}>
				<h2 className={classes.headingStyle}>Looking to teach?</h2>
				<p>
					Join Aacharya and connect with more than 55 Lack students on the
					platform. Create a strong profile and grow your network.
				</p>
				<Link to='/signup'>
					<Button
						variant='contained'
						color='primary'
						size='large'
						className={classes.button}
					>
						Signup as a Tutor
					</Button>
				</Link>
			</div>
		</Container>
	);
}

export default SignupTutorBanner;
