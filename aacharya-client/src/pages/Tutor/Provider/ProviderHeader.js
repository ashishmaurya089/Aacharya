import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { Button, Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProviderHeader({ provider }) {
	const classes = useStyles();
	const { user, providerProfile, learnerProfile, loading } = useSelector(
		(state) => state.usersData
	);
	const history = useHistory();
	console.log(user, "----------------------------")

	const handleAddSubject = () => {
		if (provider === 'tutor') {
			history.push('/tutor-subjects');
		} else if (provider === 'institute') {
			history.push('/institute-courses');
		}
	};
	const handleClick = () => {
		if (provider === 'tutor') {
			history.push('/tutor-subscriptions');
		} else if (provider === 'institute') {
			history.push('/institute-courses');
		}
	};
	const handleRoute = () => {
		if (provider === 'tutor') {
			history.push('/tutor-credits');
		} else if (provider === 'institute') {
			history.push('/institute-credits');
		}
	};
	return (
		<>
			<Container maxWidth="md">
				{providerProfile && (
					<Card elevation={3} className={classes.providerRoot}>
						<div
							className={
								user && user.premiumType === 'bronze'
									? classes.borderBronze
									: user && user.premiumType === 'silver'
										? classes.borderSilver
										: classes.borderGold
							}
						>
							<div className={classes.providerDetails}>
								<Grid container>
									<Grid item xs={12} md={6}>
										<div
											className={classes.providerProfileRoot}
											onClick={() => handleRoute()}
										>
											{provider === 'tutor' && (
												<CardMedia
													className={classes.providerCover}
													component='img'
													image={user && user.profileImage}
													title={providerProfile.instituteName}
												/>
											)}
											{provider === 'institute' && (
												<CardMedia
													className={classes.providerCover}
													component='img'
													image={providerProfile.instituteLogo}
													title={providerProfile.instituteName}
												/>
											)}
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
												Hi,
												{provider === 'tutor'
													? ` ${user && user.salutation} ${providerProfile.name}`
													: `${providerProfile.instituteName}`}
											</Typography>
											<Typography
												variant='h6'
												className={`${providerProfile.approved
													? classes.verified
													: classes.notVerified
													}`}
												color={providerProfile.approved ? `primary` : `error`}
											>
												{providerProfile.approved
													? 'Your account is verified'
													: 'Your account is under verification'}
											</Typography>

											{provider === 'tutor' ? <>
												<div className={classes.providerAccount} style={{ marginBottom: 16 }}>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Contact Number
														</Typography>
														<Typography variant='subtitle1' color='textSecondary'>
															{user && user.phoneNumber}
														</Typography>
													</div>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Email
														</Typography>
														<Typography
															variant='subtitle1'
															color='textSecondary'
														>
															{user && user.email}
														</Typography>
													</div>
												</div>
											</> : null}

											{provider === 'tutor' ? <>
												<div className={classes.providerAccount} style={{ marginBottom: 16 }}>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Teacher ID
														</Typography>
														<Typography variant='subtitle1' color='textSecondary'>
															{user && user.userId}
														</Typography>
													</div>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															User Type
														</Typography>
														<Typography
															variant='subtitle1'
															color='textSecondary'
															className={classes.premium}
														>
															{user && user.isTutor ? "Tutor" : null}
														</Typography>
													</div>
												</div>
											</> : null}
											{provider === 'institute' ? <>
												<div className={classes.providerAccount} style={{ marginBottom: 16 }}>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Contact Number
														</Typography>
														<Typography variant='subtitle1' color='textSecondary'>
															{user && user.phoneNumber}
														</Typography>
													</div>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Email
														</Typography>
														<Typography
															variant='subtitle1'
															color='textSecondary'
														>
															{user && user.email}
														</Typography>
													</div>
												</div>

												<div className={classes.providerAccount} style={{ marginBottom: 16 }}>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															Coaching Center ID
														</Typography>
														<Typography variant='subtitle1' color='textSecondary'>
															{user && user.userId}
														</Typography>
													</div>
													<div className={classes.providerAccountValidity}>
														<Typography variant='h6' color='initial'>
															User Type
														</Typography>
														<Typography
															variant='subtitle1'
															color='textSecondary'
															className={classes.premium}
														>
															{user && user.isCoachingCenter ? "Coaching Center" : null}
														</Typography>
													</div>
												</div>
											</> : null}
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
											disabled={!providerProfile.approved}
											onClick={handleAddSubject}
										>
											{provider === 'tutor'
												? 'Add Subjects to Your Profile'
												: 'Add Courses to Your Profile'}
										</Button>
									</Grid>
								</Grid>
							</div>
						</div>
					</Card>
				)}
			</Container>
		</>
	);
}
