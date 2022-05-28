import { Card, Container, Divider, Grid, Typography } from '@material-ui/core';
import { Call, Email } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCallHistory,
	getGlobalLeads,
	getStatistics,
} from '../../actions/tutorActions';
import CallHistory from '../../components/CallHistory';
import SubscriptionBanner from '../../components/SubscriptionBanner';

import useStyles from './styles';

function TutorDashboard() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { globalLeads, statistics, callHistory } = useSelector(
		(state) => state.tutorsData
	);
	const { user, loading } = useSelector((state) => state.usersData);

	const [open, setopen] = useState(false);

	useEffect(() => {
		if (user && user.approved) {
			dispatch(getGlobalLeads());
			dispatch(getStatistics());
			dispatch(getCallHistory());
		}
	}, []);

	const handleCallHistory = () => {
		setopen(true);
	};
	return (
		<>
			<CallHistory
				open={open}
				handleClose={() => setopen(false)}
				callHistory={callHistory}
			/>
			<Container maxWidth='lg'>
				<SubscriptionBanner type='gold' />
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Card
							className={`${classes.cardLeadRoot} `}
							onClick={handleCallHistory}
						>
							<div className={classes.leadRoot}>
								<Call />
								<div className={classes.leads}>
									<Typography
										className={classes.title}
										color='textSecondary'
										gutterBottom
									>
										Call Leads
									</Typography>
									<Typography variant='h2' className='my-2' align='center'>
										{statistics && statistics.callLeads}
									</Typography>
								</div>
							</div>
						</Card>
					</Grid>
					<Grid item xs={6}>
						<Card className={`${classes.cardMsgRoot}`}>
							<div className={classes.leadRoot}>
								<Email color='error' />
								<div className={classes.leads}>
									<Typography
										className={classes.title}
										color='textSecondary'
										gutterBottom
									>
										Message Leads
									</Typography>
									<Typography variant='h2' className='my-2' align='center'>
										{statistics && statistics.msgLeads}
									</Typography>
								</div>
							</div>
						</Card>
					</Grid>
					<Grid xs={12}>
						<Typography variant='h6' className='my-2' align='center'>
						Tuition enquiries {statistics && statistics.globalLeads}
						</Typography>
					</Grid>
					{globalLeads &&
						globalLeads.map((value) => (
							<Grid item xs={4}>
								<div className='staff'>
									<div className='d-flex mb-4'>
										<div
											className='img'
											style={{
												backgroundImage: `url(${value.seeker.profileImage})`,
											}}
										></div>
										<div className='info ml-4'>
											<h3>{value.seeker.name}</h3>
											<span className='position'>
												Valid upto:{' '}
												<strong>{value.seeker.premiumValidity}</strong>
											</span>
											<span className='position'>
												Account: <strong>{value.seeker.premiumType}</strong>
											</span>
										</div>
									</div>
									{/* <div className='text'>
								<h6>M.Tech, Ph.D</h6>
								<span className='position mb-2'>
									Professor of Mechanical Engineering
								</span>
								<p>
									Even the all-powerful Pointing has no control about the blind
									texts it is an almost unorthographic life One day however a
									small line of blind text by the name
								</p>
							</div> */}
								</div>
							</Grid>
						))}
				</Grid>

				<SubscriptionBanner type='silver' />
			</Container>
		</>
	);
}

export default TutorDashboard;
