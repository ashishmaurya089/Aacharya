import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import {
	Backdrop,
	Button,
	CircularProgress,
	Grid,
	Paper,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import TutorSubjects from './TutorSubjects';
import { useHistory } from 'react-router-dom';

export default function TutorHeader() {
	const classes = useStyles();
	const theme = useTheme();
	const { user, providerProfile, loading } = useSelector(
		(state) => state.usersData
	);
	//console.log('user>>>>', user);
	const history = useHistory();
	const handleAddSubject = () => {
		history.push('/tutor-subjects');
	};
	const handleClick = () => {
		history.push('/tutor-subscriptions');
	};
	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			{providerProfile && (
				<Paper elevation={3} className={classes.paper}>
					<Card className={classes.providerRoot}>
						<div className={classes.providerDetails}>
							<Grid container>
								<Grid item xs={12} md={6}>
									<div style={{ position: 'relative' }}>
										<CardMedia
											className={classes.providerCover}
											component='img'
											image={user && user.profileImage}
											title={providerProfile.instituteName}
										/>
										<div className={classes.credit}>
											💰 {user && user.credits}
										</div>
									</div>
								</Grid>
								<Grid item xs={12} md={6}>
									<CardContent
										className={classes.providerContent}
										onClick={handleClick}
									>
										<Typography component='h5' variant='h5'>
											Hi, {providerProfile.name}
										</Typography>
										<Typography
											variant='h6'
											className={`${
												providerProfile.approved
													? classes.verified
													: classes.notVerified
											}`}
											color={providerProfile.approved ? `primary` : `error`}
										>
											{providerProfile.approved
												? 'Your account is verified'
												: 'Your account is under verification'}
										</Typography>
										<div className={classes.providerAccount}>
											<div className={classes.providerAccountValidity}>
												<Typography variant='h6' color='initial'>
													Valid Upto
												</Typography>
												<Typography variant='subtitle1' color='textSecondary'>
													{user && user.premiumValidity}
												</Typography>
											</div>
											<div className={classes.providerAccountValidity}>
												<Typography variant='h6' color='initial'>
													Account
												</Typography>
												<Typography
													variant='subtitle1'
													color='textSecondary'
													className={classes.premium}
												>
													{user && user.premiumType} Level
												</Typography>
											</div>
										</div>
									</CardContent>
									<Button
										variant='contained'
										size='large'
										color='primary'
										className={classes.addCourseButton}
										onClick={handleAddSubject}
									>
										Add Subjects to Your Profile
									</Button>
								</Grid>
							</Grid>
						</div>
					</Card>
				</Paper>
			)}
		</>
	);
}
