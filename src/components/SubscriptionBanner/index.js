import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	goldRoot: {
		background:
			'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
		textAlign: 'center',
		// minWidth: 275,
		margin: '20px auto',
	},
	content: {
		'& > h2': {
			fontSize: 30,
			fontWeight: 700,
			color: '#fff',
			textShadow: '2px 2px 4px #000000',
		},
		'& > p': {
			fontSize: 20,
			color: '#fff',
			textShadow: '2px 2px 4px #000000',
		},
	},
	silverRoot: {
		// backgroundColor: '#2d3436',
		// backgroundImage: 'linear-gradient(315deg, #2d3436 0%, #d3d3d3 74%)',
		background:
			'linear-gradient(to right, #808080, #d3d3d3, #808080, #d3d3d3, #808080)',
		textAlign: 'center',
		margin: '20px auto',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	button: {
		color: '#fff',
		margin: '20px auto',
		display: 'block',
		textTransform: 'capitalize',
		fontSize: 20,
		width: '50%',
	},
}));

function SubscriptionBanner({ type, showButton }) {
	const classes = useStyles();
	const history = useHistory();
	const { user, providerProfile } = useSelector((state) => state.usersData);

	const handleClick = () => {
		if (user && user.isTutor) {
			history.push('/tutor-subscriptions');
		} else if (user && user.isCoachingCenter) {
			history.push('/institute-subscriptions');
		}
	};
	return (
		<>
			{type === 'gold' && (
				<Card className={classes.goldRoot} onClick={handleClick}>
					<CardContent className={classes.content}>
						<Typography variant='h5' component='h2'>
							Upgrade Now To Gold
						</Typography>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
						>
							Get featured in the top tutor's section and priority access to
							student profile
						</Typography>
					</CardContent>
				</Card>
			)}
			{showButton && (
				<Button
					variant='contained'
					color='primary'
					onClick={handleClick}
					className={classes.button}
				>
					View Subscription Plans
				</Button>
			)}
			{type === 'silver' && (
				<Card className={classes.silverRoot} onClick={handleClick}>
					<CardContent className={classes.content}>
						<Typography variant='h5' component='h2'>
							Upgrade Now To Silver
						</Typography>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
						>
							Get priority access to service requests Get tutuor enquiries in
							your inbox directly Get access to tutor requirements delivered to
							your inbox
						</Typography>
					</CardContent>
				</Card>
			)}
		</>
	);
}

export default SubscriptionBanner;
