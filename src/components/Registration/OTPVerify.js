import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	CircularProgress,
	Backdrop,
} from '@material-ui/core';
import { loginVerify, loginWithPhone } from '../../actions/registrationActions';

import useStyles from './styles';
import logo from './logo.png';

export default function OTPVerify(props) {
	const { user, loading } = useSelector((state) => state.registrationsData);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [otp, setotp] = useState('');
	const handleOtp = () => {
		if (user.phoneNumber) {
			dispatch(loginVerify(Number(otp), user.phoneNumber, props.history));
		}
	};
	const handleResendOtp = () => {
		// dispatch(loginWithPhone(user.phoneNumber, countryCode, props.history));
		dispatch(loginVerify(Number(otp), user.phoneNumber, props.history));
	};

	let [seconds, setseconds] = useState(0);
	let [minutes, setminutes] = useState(5);
	const [timer, settimer] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			if (minutes === 0 && seconds === 0) {
				settimer(false);
			} else {
				setCountdownTimer();
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [minutes, seconds]);

	const setCountdownTimer = () => {
		if (seconds === 0) {
			setseconds(59);
			setminutes(--minutes);
		} else {
			setseconds(--seconds);
		}
	};

	const addLeadingZero = (number) => {
		return number < 10 ? '0' + number : number;
	};
	return (
		<>
			{' '}
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />

				<div className={classes.paper}>
					<img src={logo} alt='logo' className={classes.logo} />
					<Typography component='h1' variant='h5' className='my-3'>
						OTP Verification
					</Typography>

					<div className={`${classes.form} mb-5`}>
						<TextField
							value={otp}
							onChange={(e) => setotp(e.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth={true}
							label='Enter OTP here'
							type='number'
							autoFocus
							className='my-2'
							// maxlength='4'
						/>
						<Typography
							component='h1'
							variant='h5'
							className='my-2'
							align='center'
						>
							{addLeadingZero(minutes)} : {addLeadingZero(seconds)}
						</Typography>
						<Button
							type='submit'
							fullWidth={true}
							variant='contained'
							color='primary'
							className='my-2'
							onClick={() => handleOtp()}
						>
							Next
						</Button>
						<Grid container>
							<Grid item xs>
								<Typography variant='body2'>
									Haven't received the OTP yet?
								</Typography>
								{/* <Link href='#' variant='body2'>
								Haven't received the OTP yet?
							</Link> */}
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									size='small'
									disabled={minutes > 0 || seconds > 0}
								>
									Resend OTP
								</Button>
								{/* <Link href='#' variant='body2'>
								{'Resend OTP'}
							</Link> */}
							</Grid>
						</Grid>
					</div>
				</div>
			</Container>
		</>
	);
}
