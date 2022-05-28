import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	Button,
	Card,
	CardMedia,
	Chip,
	Container,
	Dialog,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AdjustIcon from '@material-ui/icons/Adjust';

import { getCompetitionById } from '../../actions/competitionAction';
import { getProfile } from '../../actions/userActions';

import AddParticipant from '../../components/AddParticipant/AddParticipant';
import ProgressBar from '../../components/ProgressBar';

import useStyles from './styles';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 3000, min: 1200 },
		items: 3,
	},
	desktop: {
		breakpoint: { max: 1200, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

function CompetitionInfo() {
	const classes = useStyles();
	const dispatch = useDispatch();
	let accessToken = localStorage.getItem('accessToken');

	const { competition, loading } = useSelector(
		(state) => state.competitionsData
	);
	const { user } = useSelector((state) => state.usersData);

	const { competitionId } = useParams();

	const [selectedSubEventDetails, setselectedSubEventDetails] = useState([]);
	const [open, setopen] = useState(false);
	const [openModal, setopenModal] = useState(false);

	useEffect(() => {
		dispatch(getCompetitionById(competitionId));
	}, [competitionId]);

	// useEffect(() => {
	// 	if (accessToken) {
	// 		dispatch(getProfile());
	// 	}
	// }, [accessToken]);

	const handleRegistration = (subEvent) => {
		setselectedSubEventDetails(subEvent);
		setopen(true);
		setopenModal(false);
	};
	const handleRegistrationButton = () => {
		if (user && user.isTutor) {
			return toast.error('Login in as a Student / Parent');
		}
		if (user && user.isCoachingCenter) {
			return toast.error('Login in as a Student / Parent');
		}
		if (!user) {
			return toast.error('Please Login');
		}
		setopenModal(true);
	};
	const handleClose = () => {
		setopen(false);
	};

	return (
		<>
			{loading ? (
				<>
					<ProgressBar />
				</>
			) : (
				<>
					{competition && (
						<>
							<AddParticipant
								data={selectedSubEventDetails}
								type='event'
								open={open}
								handleClose={handleClose}
							/>
							<Dialog
								onClose={() => setopenModal(false)}
								aria-labelledby='simple-dialog-title'
								open={openModal}
								maxWidth='sm'
								fullWidth={true}
							>
								<Typography variant='h6' align='center' className='my-2'>
									Levels of Competition
								</Typography>
								<Divider className='my-2' />
								{competition.subEvents &&
									competition.subEvents.map((subEvent) => (
										<div key={subEvent._id}>
											<List
												key={subEvent._id}
												className={classes.subEventList}
												onClick={() => handleRegistration(subEvent)}
											>
												<ListItem>
													<ListItemIcon>
														<FormatListBulletedIcon />
													</ListItemIcon>
													<ListItemText
														primary={subEvent.name}
														secondary='Tap to register'
													/>
												</ListItem>
											</List>
											<Divider />
										</div>
									))}
							</Dialog>
							<Container maxWidth='lg' fixed>
								<div className={classes.header}>
									<Grid container spacing={2}>
										<Grid item xs>
											<Typography variant='h3' gutterBottom>
												{competition.name}
											</Typography>
											<Typography variant='body1' gutterBottom>
												Registration On:{' '}
												{new Date(
													competition.registrationStartDate
												).toDateString()}
											</Typography>
											<Typography variant='body1' gutterBottom>
												Competition:{' '}
												{competition.isActive ? 'Open' : 'Coming Soon'}
											</Typography>
										</Grid>
										<Grid item xs>
											{competition.isActive ? (
												<Button
													variant='contained'
													color='primary'
													onClick={handleRegistrationButton}
												>
													Register Now
												</Button>
											) : (
												<Button
													variant='contained'
													color='secondary'
													disabled={!competition.isActive}
												>
													Registrations Closed
												</Button>
											)}
										</Grid>
									</Grid>
								</div>
							</Container>

							<CardMedia
								className={classes.cardMedia}
								component='img'
								image={competition.banner}
								title={competition.name}
							/>

							<Container maxWidth='lg'>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={8} md={8}>
										<Card className='p-4 my-3'>
											<>
												<Typography variant='h5' className='mt-2' gutterBottom>
													{competition.name}
												</Typography>
												<div>
													{competition.tags &&
														competition.tags.map((tag, i) => (
															<Chip
																label={tag}
																key={i + 1}
																className={classes.chips}
																color='primary'
															/>
														))}
												</div>
											</>

											<>
												<Typography
													variant='body1'
													className='my-3'
													gutterBottom
												>
													{competition.shortDescription}
												</Typography>
											</>

											<Typography variant='h6' align='center'>
												Gallery
											</Typography>
											<Divider className='my-2' />
											{competition.gallery && competition.gallery.length > 0 && (
												<Carousel responsive={responsive}>
													{competition.gallery.map((gal) => (
														<img
															src={gal}
															alt='gallery'
															className={classes.galleryMedia}
														/>
													))}
												</Carousel>
											)}
											<>
												<Typography variant='h6' align='center'>
													About
												</Typography>
												<Divider className='my-2' />
												{competition.longDescription
													? competition.longDescription.length > 0 &&
													  competition.longDescription.map((lgdes, i) => (
															<Typography
																variant='body1'
																gutterBottom
																key={i + 2}
															>
																{lgdes}
															</Typography>
													  ))
													: null}
											</>

											<Typography variant='h6' align='center'>
												Levels of Competition
											</Typography>
											<Divider className='my-2' />
											{competition.subEvents &&
												competition.subEvents.map((subEvent) => (
													<div key={subEvent._id}>
														<List
															className={classes.subEventList}
															onClick={() => handleRegistration(subEvent)}
														>
															<ListItem>
																<ListItemIcon>
																	<FormatListBulletedIcon />
																</ListItemIcon>
																<ListItemText
																	primary={subEvent.name}
																	secondary='Tap to register'
																/>
															</ListItem>
														</List>
														<Divider />
													</div>
												))}
											<div>
												<Typography variant='h6' align='center'>
													Guidelines
												</Typography>
												<Divider className='my-2' />
												{competition.guidelines &&
													competition.guidelines.map((guide, i) => (
														<Typography
															variant='body1'
															gutterBottom
															key={i + 3}
														>
															<i className='fas fa-chevron-right'></i> {guide}
														</Typography>
													))}
											</div>

											<div>
												<Typography variant='h6' align='center'>
													Sponsors
												</Typography>
												<Divider className='my-2' />
												<div className={classes.sponsor}>
													{competition.sponsors &&
														competition.sponsors.map((spo, i) => (
															<Card
																className={`${classes.sponsorCard} my-2`}
																key={i + 4}
															>
																<CardMedia
																	className={classes.sponsorMedia}
																	component='img'
																	image={spo.logo}
																	title={spo.name}
																/>
															</Card>
														))}
												</div>
											</div>

											<Typography variant='h6' align='center'>
												FAQ's
											</Typography>
											<Divider className='my-2' />
											{competition.faqs &&
												competition.faqs.map((faq, i) => (
													<List key={i + 5}>
														<ListItem>
															<ListItemIcon>
																<AdjustIcon />
															</ListItemIcon>
															<ListItemText
																primary={faq.question}
																secondary={faq.awnser}
															/>
														</ListItem>
													</List>
												))}
										</Card>
									</Grid>
									<Grid item xs={12} sm={4} md={4}>
										<Card className='p-4 my-3'>
											<Typography variant='h6' align='center'>
												Event Details
											</Typography>
											<Divider />

											<div className={classes.eventDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.eventDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Registrations Open
													</Typography>
													<span>
														{new Date(
															competition.registrationStartDate
														).toDateString()}
													</span>
												</div>
											</div>
											<Divider />

											<div className={classes.eventDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.eventDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Registrations Close
													</Typography>
													<span>
														{new Date(
															competition.registrationEndDate
														).toDateString()}
													</span>
												</div>
											</div>

											<Divider />
											<CardMedia
												className={classes.media}
												component='img'
												image={competition.banner}
											/>
											{/* <Typography variant='h6' className='my-2'>
								<i className={`fas fa-calendar-week ${classes.fontIcon}`}></i>{' '}
								Registrations Close:{' '}
								<span className={classes.span}>
									{new Date(
										competition.registrationEndDate
									).toDateString()}
								</span>
							</Typography> */}
										</Card>
										<div className={classes.cardMedia}>
											{competition.isActive ? (
												<Button
													variant='contained'
													color='primary'
													className='my-2 w-100'
													onClick={handleRegistrationButton}
												>
													Register Now
												</Button>
											) : (
												<Button
													variant='contained'
													color='secondary'
													className='my-2 w-100'
													disabled={!competition.isActive}
												>
													Registrations Closed
												</Button>
											)}
										</div>
									</Grid>
								</Grid>
							</Container>
						</>
					)}
				</>
			)}
		</>
	);
}

export default CompetitionInfo;
