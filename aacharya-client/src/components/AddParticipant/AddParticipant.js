import React, { useEffect, useState } from 'react';
import axios from '../../axios/index';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
	TextField,
	Container,
	CssBaseline,
	Grid,
	MenuItem,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import logo from '../../images/logo.png';
import SearchOrganisation from './SearchOrganisation';
import { countries } from '../Registration/LoginForm';
import { workshopRegistration } from '../../actions/workshopActions';
import { skillRegistration } from '../../actions/skillActions';
import { competitionRegistration } from '../../actions/competitionAction';
import { updateLearnerProfile } from '../../actions/userActions';

import useStyles from './styles';

const educationalDetails = [
	{
		_id: 1,
		name: 'Working Professional',
	},
	{
		_id: 2,
		name: 'Recently Graduated',
	},
	{
		_id: 3,
		name: 'College Student',
	},
	{
		_id: 4,
		name: 'School Student',
	},
];

const compEducationalDetails = [
	{
		_id: 5,
		name: 'College Student',
	},
	{
		_id: 6,
		name: 'School Student',
	},
];

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddParticipant({ data, type, open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { user, learnerProfile, providerProfile, loading } = useSelector(
		(state) => state.usersData
	);

	const [countryCode, setcountryCode] = useState('91');
	const [participantName, setparticipantName] = useState('');
	const [participantAdress, setparticipantAdress] = useState('');
	const [participantEmail, setparticipantEmail] = useState('');
	const [participantPhone, setparticipantPhone] = useState('');
	const [participantStandard, setparticipantStandard] = useState('');
	const [educationalLevel, seteducationalLevel] = useState('');
	const [institute, setinstitute] = useState('');

	const [address, setaddress] = useState('');
	const [locality, setlocality] = useState('');
	const [city, setcity] = useState('');
	const [state, setstate] = useState('');
	const [country, setcountry] = useState('');
	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}
	async function displayRazorpay() {
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}

		const result = await axios.post('/api/orders/createOrder', {
			total: data.price,
			currency: 'INR',
		});
		//console.log('Coming');
		//console.log('result', result);
		if (!result) {
			toast.warn('Server error. Are you online?');
			return;
		}

		const { key, orderId, currency } = result.data.data;
		//console.log(key);

		const options = {
			key: key, // Enter the Key ID generated from the Dashboard
			//   amount: amount.toString(),
			currency: currency,
			name: data.name,
			description: 'Test Transaction',
			//   image: { logo },
			order_id: orderId,
			handler: async function (response) {
				const { data } = await axios.post('/api/orders/capture', response);
				//console.log('data', data);
				if (result.status === 200) {
					handleAddParticipant(data.invoice);
					toast.success('Payment Successfull');
				}
			},
			prefill: {
				name: user.user.name,
				email: user.user.email,
				contact: user.user.phoneNumber,
			},
			notes: {
				address: 'Soumya Dey Corporate Office',
			},
			theme: {
				color: '#FAA906',
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	useEffect(() => {
		if (learnerProfile) {
			setInitialFields(learnerProfile);
		}
	}, [learnerProfile]);

	const setInitialFields = (learnerData) => {
		setparticipantName(learnerData.learnerName);
		setlocality(learnerData.communicationAddress.locality);
		setcity(learnerData.communicationAddress.city);
		setstate(learnerData.communicationAddress.state);
		setcountry(learnerData.communicationAddress.country);
		seteducationalLevel(learnerData.educationalLevel);
		setinstitute(learnerData.institute._id);
	};

	const handleEventParticipant = () => {
		if (
			!participantName ||
			!participantEmail ||
			!participantPhone ||
			!educationalLevel ||
			!institute
		) {
			toast.error('Please fill the fields');
		} else {
			// Here data means SubEventDetails
			dispatch(
				competitionRegistration(
					data._id,
					data.name,
					participantName,
					participantEmail,
					participantPhone,
					participantStandard,
					educationalLevel,
					institute
				)
			);
			history.push('/');
		}
	};
	const handleAddParticipant = (paymentDetails) => {
		// if not Learner Profile Update
		if (
			!participantName ||
			!locality ||
			!city ||
			!state ||
			!country ||
			!educationalLevel ||
			!institute
		) {
			toast.error('Please fill the fields');
		} else {
			if (!learnerProfile) {
				let body = {
					learnerType: 'learner',
					learnerName: participantName,
					educationalLevel: educationalLevel,
					institute: institute,
					communicationAddress: {
						locality: locality,
						city: city,
						state: state,
						country: country,
					},
				};
				dispatch(updateLearnerProfile(body));
			}
		}
		// Register for Skills
		if (type === 'skill') {
			// Here data means CourseDetails
			dispatch(skillRegistration(data._id, paymentDetails._id, data.name));
			history.push('/');
		} else if (type === 'workshop') {
			// Register for Workshop

			// Here data means Workhop Details
			dispatch(workshopRegistration(data._id, paymentDetails._id, data.name));
			history.push('/');
		}
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				{data && (
					<Container component='main' maxWidth='sm'>
						<CssBaseline />
						<div className={classes.paper}>
							<img src={logo} alt='logo' className={classes.logo} />
							<Typography
								variant='h5'
								className='mt-2'
								gutterBottom
								align='left'
							>
								{data.name}
							</Typography>
							<>
								{data.about && data.about.length > 0 && (
									<Typography
										variant='body1'
										className={`my-3 ${classes.truncate}`}
										gutterBottom
									// noWrap={true}
									>
										{data.about[0]}
									</Typography>
								)}
							</>
							<>
								{type === 'event' &&
									data.description &&
									data.description.length > 0 && (
										<Typography
											variant='body1'
											className={`my-3 ${classes.truncate}`}
											gutterBottom
										// noWrap={true}
										>
											{data.description}
										</Typography>
									)}
							</>
							{type === 'event' ? (
								<>
									<Typography
										variant='h5'
										className='mt-2'
										gutterBottom
										align='left'
									>
										Student Data
									</Typography>
									<div className={`${classes.form} mb-5`}>
										<Grid container spacing={1}>
											<Grid item xs={12}>
												<TextField
													value={participantName}
													onChange={(e) => setparticipantName(e.target.value)}
													variant='outlined'
													required
													margin='normal'
													fullWidth={true}
													label='Full Name of the student'
													autoFocus
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													value={participantEmail}
													onChange={(e) => setparticipantEmail(e.target.value)}
													id='outlined-basic'
													margin='normal'
													variant='outlined'
													required
													fullWidth={true}
													label='Email Id'
													type='email'
													autoFocus
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													select
													fullWidth={true}
													label='Select Educational Details'
													variant='outlined'
													margin='normal'
													value={educationalLevel}
													onChange={(e) => seteducationalLevel(e.target.value)}
													helperText='Educational Details'
												>
													{compEducationalDetails.map((option, i) => (
														<MenuItem key={i} value={option.name}>
															{option.name}
														</MenuItem>
													))}
												</TextField>
											</Grid>
											<Grid item xs={4} sm={4}>
												<TextField
													id='outlined-select-currency-native'
													select
													label='Country'
													value={countryCode}
													onChange={(e) => setcountryCode(e.target.value)}
													fullWidth={true}
													SelectProps={{
														native: true,
													}}
													variant='outlined'
												>
													{countries.map((option) => (
														<option key={option.phone} value={option.phone}>
															{option.code} +{option.phone}
														</option>
													))}
												</TextField>
											</Grid>
											<Grid item xs={8} sm={8}>
												<TextField
													value={participantPhone}
													onChange={(e) => setparticipantPhone(e.target.value)}
													variant='outlined'
													required
													fullWidth={true}
													type='Number'
													label='Phone Number'
													autoComplete='phoneNumber'
												/>
											</Grid>
											<Grid item xs={12}>
												<SearchOrganisation setinstitute={setinstitute} />
											</Grid>
											<Grid item xs={12}>
												<TextField
													value={participantStandard}
													onChange={(e) =>
														setparticipantStandard(e.target.value)
													}
													variant='outlined'
													required
													fullWidth={true}
													label='Class'
												/>
											</Grid>
											<Grid item xs={12}>
												<Button
													type='submit'
													fullWidth
													variant='contained'
													color='primary'
													className={classes.submit}
													onClick={handleEventParticipant}
												>
													Add Participant
												</Button>
											</Grid>
										</Grid>
									</div>
								</>
							) : (
								<>
									<Typography
										variant='h5'
										className='mt-2'
										gutterBottom
										align='left'
									>
										Participant Details
									</Typography>
									<div className={`${classes.form} mb-5`}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													value={participantName}
													onChange={(e) => setparticipantName(e.target.value)}
													variant='outlined'
													required
													margin='normal'
													fullWidth={true}
													label='Participant Name'
													autoFocus
												/>
												<TextField
													value={locality}
													onChange={(e) => setlocality(e.target.value)}
													variant='outlined'
													required
													margin='normal'
													fullWidth={true}
													label='Participant Locality'
													autoFocus
												/>
												<TextField
													value={city}
													onChange={(e) => setcity(e.target.value)}
													variant='outlined'
													required
													margin='normal'
													fullWidth={true}
													label='Participant City'
													autoFocus
												/>
												<TextField
													value={state}
													onChange={(e) => setstate(e.target.value)}
													variant='outlined'
													required
													margin='normal'
													fullWidth={true}
													label='Participant State'
													autoFocus
												/>
												<TextField
													value={country}
													onChange={(e) => setcountry(e.target.value)}
													id='outlined-basic'
													margin='normal'
													variant='outlined'
													required
													fullWidth={true}
													label='Participant Country'
													autoFocus
												/>
												<TextField
													select
													fullWidth={true}
													label='Select Educational Details'
													variant='outlined'
													margin='normal'
													value={educationalLevel}
													onChange={(e) => seteducationalLevel(e.target.value)}
													helperText='Educational Details'
												>
													{educationalDetails.map((option, i) => (
														<MenuItem key={i} value={option.name}>
															{option.name}
														</MenuItem>
													))}
												</TextField>
											</Grid>
											<Grid item xs={12}>
												<SearchOrganisation setinstitute={setinstitute} />
											</Grid>
											<Grid item xs={12}>
												<Button
													type='submit'
													fullWidth
													variant='contained'
													color='primary'
													className={classes.submit}
													onClick={displayRazorpay}
												>
													Register
												</Button>
											</Grid>
										</Grid>
									</div>{' '}
								</>
							)}
						</div>
					</Container>
				)}
			</Dialog>
		</div>
	);
}
