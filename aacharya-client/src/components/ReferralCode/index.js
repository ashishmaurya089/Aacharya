import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Card,
	CardContent,
	Container,
	Paper,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getReferralCode } from '../../actions/commonActions';
import ProgressBar from '../ProgressBar';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	subGreeting: {
		fontWeight: 600,
		textAlign: 'center',
		margin: theme.spacing(2, 'auto'),
	},
	root: {
		minWidth: 275,
		background: theme.palette.primary.main,
	},
	title: {
		color: '#fff',
		fontSize: 23,
	},
}));

function ReferralCode() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { referral, loading } = useSelector((state) => state.commonData);
	const { user } = useSelector((state) => state.usersData);

	useEffect(() => {
		dispatch(getReferralCode());
	}, []);
	return (
		<>
			{loading ? (
				<ProgressBar />
			) : (
				<Container maxWidth='md' className='my-3'>
					<Paper elevation={3}>
						<Card className={classes.root}>
							<CardContent>
								<Typography
									variant='h5'
									className={classes.subGreeting}
									align='center'
								>
									Hey 👋 {user && user.name}, this is your referral code
								</Typography>
								<Typography
									variant='h5'
									className={classes.title}
									align='center'
								>
									{referral && referral.referralCode}
								</Typography>
								<Typography
									variant='body2'
									component='p'
									align='center'
									className='my-2'
								>
									Share with you friends to earn points
								</Typography>
							</CardContent>
						</Card>
					</Paper>
				</Container>
			)}
		</>
	);
}

export default ReferralCode;
