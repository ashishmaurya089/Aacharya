import React, { useState } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
	CircularProgress,
	Grid,
	Paper,
	Snackbar,
	TextField,
	Typography,
	Button,
} from '@material-ui/core';
import useStyles from './styles';
import { Alert } from '@material-ui/lab';

function ContactForm() {
	const classes = useStyles();
	const [name, setname] = useState('');
	const [email, setemail] = useState('');
	const [number, setnumber] = useState('');
	const [place, setplace] = useState('');
	const [message, setmessage] = useState('');
	const [submit, setsubmit] = useState(false);

	const handleSubmit = () => {
		setsubmit(true);
		setTimeout(() => {
			setsubmit(false);
		}, 5000);
	};
	return (
		<ValidatorForm onSubmit={handleSubmit}>
			<Paper elevation={3} className={classes.paper}>
				<div className={classes.subHead}>
					<h3>Drop a message here.</h3>
				</div>
				<Grid container spacing={2} className={classes.formRoot}>
					<Grid item xs={6}>
						<TextValidator
							label='Full Name'
							fullWidth={true}
							value={name}
							onChange={(e) => setname(e.target.value)}
							validators={['required']}
							errorMessages={['Please enter at least 4 chars']}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextValidator
							label='Email'
							fullWidth={true}
							name='email'
							value={email}
							onChange={(e) => setemail(e.target.value)}
							validators={['required', 'isEmail']}
							errorMessages={['Email is required', 'email is not valid']}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextValidator
							label='Contact Number'
							fullWidth={true}
							value={number}
							type='number'
							onChange={(e) => setnumber(e.target.value)}
							validators={[
								'required',
								// 'minNumber:0',
								// 'maxNumber:9',
								// 'matchRegexp:^[0-9]$',
							]}
							errorMessages={['Please enter at least 10 numbers']}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label='Place'
							fullWidth={true}
							value={place}
							onChange={(e) => setplace(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextValidator
							label='Subject'
							fullWidth={true}
							multiline
							maxRows={4}
							value={message}
							onChange={(e) => setmessage(e.target.value)}
							validators={['required']}
							errorMessages={['Please write something for us']}
							helperText='one or two line of subject'
						/>
					</Grid>
					<Grid
						item
						xs={6}
						className={`${submit ? classes.faliureMsg : classes.successMsg}`}
					>
						<div className='mb-3'>
							{/* {submit && <CircularProgress color='primary' />}
							<div className='error-message'></div> */}
							{submit && (
								<Alert severity='success'>
									Your message has been sent. Thank you!
								</Alert>
							)}
						</div>
					</Grid>
					<Grid item xs={12}>
						<Button
							color='primary'
							variant='contained'
							type='submit'
							disabled={submit}
						>
							{(submit && 'Your form is submitted!') || (!submit && 'Submit')}
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</ValidatorForm>
	);
}

export default ContactForm;
