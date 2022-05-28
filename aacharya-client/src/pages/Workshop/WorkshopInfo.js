import {
	Backdrop,
	Button,
	Card,
	CardMedia,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	getWorkshopById,
	getWorkshops,
	workshopRegistration,
} from '../../actions/workshopActions';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AdjustIcon from '@material-ui/icons/Adjust';
import ProgressBar from '../../components/ProgressBar';

import Carousel from 'react-multi-carousel';

import useStyles from './styles';
import AddParticipant from '../../components/AddParticipant/AddParticipant';
import { getProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 3000, min: 1200 },
		items: 4,
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

function WorkshopInfo() {
	const classes = useStyles();
	const { workshops, workshop, loading } = useSelector(
		(state) => state.workshopsData
	);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.usersData);

	const [open, setopen] = useState(false);
	const { workshopId } = useParams();

	// const [selectedWorkshopDetails, setselectedWorkshopDetails] = useState([]);
	// useEffect(() => {
	// 	dispatch(getWorkshops());
	// 	let selectedWorkshopDetails = workshops.filter(
	// 		(ski) => ski._id === workshopId
	// 	);
	// 	if (selectedWorkshopDetails.length > 0) {
	// 		setselectedWorkshopDetails(selectedWorkshopDetails[0]);
	// 	}
	// }, []);
	useEffect(() => {
		dispatch(getWorkshopById(workshopId));
	}, [workshopId]);
	let accessToken = localStorage.getItem('accessToken');

	useEffect(() => {
		if (accessToken) {
			dispatch(getProfile());
		}
	}, [accessToken]);
	const handleRegistration = () => {
		if (user && user.user.isTutor) {
			return toast.error('Login in as a Student / Parent');
		}
		if (user && user.user.isCoachingCenter) {
			return toast.error('Login in as a Student / Parent');
		}
		if (!user) {
			return toast.error('Please Login');
		}
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};

	return (
		<>
			{/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
			{loading ? (
				<>
					<ProgressBar />
				</>
			) : (
				<>
					{workshop && (
						<>
							<AddParticipant
								data={workshop}
								type='workshop'
								open={open}
								handleClose={handleClose}
							/>
							<Container maxWidth='lg' fixed>
								<div className={classes.header}>
									<Grid container spacing={2}>
										<Grid item xs>
											<Typography variant='h5' className='mt-2' gutterBottom>
												{workshop.name}
											</Typography>
											<div className={classes.price}>
												<Typography variant='subtitle1'>Price:</Typography>
												<Typography
													variant='subtitle2'
													color='secondary'
													className={classes.priceStrike}
												>
													{workshop.currencySymbol}
													{workshop.originalPrice}
												</Typography>
												<Typography variant='subtitle1'>
													{workshop.currencySymbol}
													{workshop.price}
												</Typography>
											</div>
											<Typography variant='body2' component='p'>
												Registration On:{' '}
												{new Date(workshop.startDate).toDateString()}
											</Typography>
											<Typography variant='body1' gutterBottom>
												Workshop: {workshop.isActive ? 'Open' : 'Coming Soon'}
											</Typography>
										</Grid>
										<Grid item xs>
											{workshop.isActive ? (
												<Button
													variant='contained'
													color='primary'
													onClick={handleRegistration}
												>
													Register Now
												</Button>
											) : (
												<Button variant='contained' color='secondary'>
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
								image={workshop.banner}
								title={workshop.name}
							/>
							<Container maxWidth='lg'>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={8} md={8}>
										<Card className='p-4 my-3'>
											<div className={classes.cardMedia}>
												<Typography variant='h5' className='mt-2' gutterBottom>
													{workshop.name}
												</Typography>
												<div className={classes.price}>
													<Typography variant='subtitle1'>Price:</Typography>
													<Typography
														variant='subtitle2'
														color='secondary'
														className={classes.priceStrike}
													>
														{workshop.currencySymbol}
														{workshop.originalPrice}
													</Typography>
													<Typography variant='subtitle1'>
														{workshop.currencySymbol}
														{workshop.price}
													</Typography>
												</div>
												<Typography variant='body2' component='p'>
													From: {new Date(workshop.startDate).toDateString()} To{' '}
													{new Date(workshop.endDate).toDateString()}
												</Typography>
											</div>

											<>
												{workshop.about
													? workshop.about.length > 0 &&
													  workshop.about.map((about, i) => (
															<Typography
																variant='body1'
																className='my-3'
																gutterBottom
																key={i}
															>
																{about}
															</Typography>
													  ))
													: null}
											</>

											{/* <CardMedia
								component='img'
								image={workshop.banner}
								className={classes.media}
							/> */}
											{/* Instructor */}

											<Typography variant='h6' align='center'>
												Gallery
											</Typography>
											<Divider className='my-2' />
											{workshop.gallery && workshop.gallery.length > 0 && (
												<Carousel responsive={responsive}>
													{workshop.gallery.map((gal) => (
														<img
															src={gal}
															alt='gallery'
															className={classes.galleryMedia}
														/>
													))}
												</Carousel>
											)}
											{workshop.instructor ? (
												<>
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-user'></i> Conducted By:{' '}
															<span className={classes.span}>
																{workshop.instructor.name}
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-graduation-cap'></i>{' '}
															Qualification:{' '}
															<span className={classes.span}>
																{workshop.instructor.qualification}
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-book'></i> Skills:{' '}
															{workshop.instructor.skills.map((ski, i) => (
																<Chip
																	label={ski}
																	key={i}
																	className={classes.chips}
																	color='primary'
																/>
															))}
														</Typography>
													</div>
													<Divider />

													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-chalkboard'></i> Domain
															Experience:{' '}
															<span className={classes.span}>
																{workshop.instructor.domainExperience} Years
															</span>
														</Typography>
													</div>
													<Divider />

													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-globe'></i> Work Info:{' '}
															<span className={classes.span}>
																{workshop.instructor.designation} at{' '}
																{workshop.instructor.companyName} with{' '}
																{workshop.instructor.totalExperience} Years of
																Experience
															</span>
														</Typography>
													</div>
													<Divider />

													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-clone'></i> Projects:
														</Typography>
														{workshop.instructor &&
															workshop.instructor.projects.map((pro, i) => (
																<List key={i}>
																	<ListItem>
																		<ListItemIcon>
																			<FormatListBulletedIcon />
																		</ListItemIcon>
																		<ListItemText primary={pro} />
																	</ListItem>
																</List>
															))}
													</div>
													<Divider />

													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-university'></i> Venue:{' '}
															<span className={classes.span}>
																{workshop.venue}
															</span>
														</Typography>
													</div>

													<div>
														<Typography variant='h6' align='center'>
															Objective
														</Typography>
														<Divider className='my-2' />

														<Typography
															variant='subtitle1'
															color='textSecondary'
														>
															{workshop.objective}
														</Typography>
													</div>
													<div>
														<Typography variant='h6' align='center'>
															Description
														</Typography>
														<Divider className='my-2' />

														<Typography
															variant='subtitle1'
															color='textSecondary'
														>
															{workshop.description}
														</Typography>
													</div>
												</>
											) : null}

											<Typography variant='h6' align='center'>
												Contents
											</Typography>
											<Divider className='my-2' />
											{workshop.contents &&
												workshop.contents.map((cont, i) => (
													<>
														<Typography
															key={i}
															variant='subtitle1'
															color='textSecondary'
															align='center'
														>
															{cont.header}
														</Typography>
														<List>
															{cont.highlights.map((para, i) => (
																<ListItem key={i}>
																	<ListItemIcon>
																		<ClearAllIcon />
																	</ListItemIcon>
																	<ListItemText primary={para} />
																</ListItem>
															))}
														</List>
													</>
												))}

											<Typography variant='h6' align='center'>
												Eligibility
											</Typography>
											<Divider className='my-2' />
											{workshop.eligibility &&
												workshop.eligibility.map((eli, i) => (
													<List key={i}>
														<ListItem>
															<ListItemIcon>
																<AdjustIcon />
															</ListItemIcon>
															<ListItemText primary={eli} />
														</ListItem>
													</List>
												))}

											<Typography variant='h6' align='center'>
												FAQ's
											</Typography>
											<Divider className='my-2' />
											{workshop.faqs &&
												workshop.faqs.map((faq, i) => (
													<List key={i}>
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
												Workshop Details
											</Typography>
											<Divider />
											<div className={classes.workshopDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.workshopDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														WorkShop Open
													</Typography>
													<span>
														{new Date(workshop.startDate).toDateString()}
													</span>
												</div>
											</div>
											<Divider />
											<div className={classes.workshopDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.workshopDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														WorkShop Close
													</Typography>
													<span>
														{new Date(workshop.endDate).toDateString()}
													</span>
												</div>
											</div>
											<Divider />
											<div className={classes.workshopDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.workshopDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Registrations Close
													</Typography>
													<span>
														{new Date(
															workshop.registrationEndDate
														).toDateString()}
													</span>
												</div>
											</div>
											<CardMedia
												component='img'
												image={workshop.banner}
												className={classes.media}
											/>
											{/* 
							<Typography variant='h6' className='my-2'>
								<i className={`fas fa-calendar-week ${classes.fontIcon}`}></i>{' '}
								WorkShop Start Date:{' '}
								<span className={classes.span}>
									{new Date(workshop.startDate).toDateString()}
								</span>
							</Typography>
							<Typography variant='h6' className='my-2'>
								<i className={`fas fa-calendar-week ${classes.fontIcon}`}></i>{' '}
								WorkShop End Date:{' '}
								<span className={classes.span}>
									{new Date(workshop.endDate).toDateString()}
								</span>
							</Typography>
							<Typography variant='h6' className='my-2'>
								<i className={`fas fa-calendar-week ${classes.fontIcon}`}></i>{' '}
								Registration Ends On:{' '}
								<span className={classes.span}>
									{new Date(
										workshop.registrationEndDate
									).toDateString()}{' '}
								</span>
							</Typography> */}
										</Card>
										<div className={classes.cardMedia}>
											{workshop.isActive ? (
												<Button
													variant='contained'
													color='primary'
													className='my-2 w-100'
													onClick={handleRegistration}
												>
													Register Now
												</Button>
											) : (
												<Button
													variant='contained'
													color='secondary'
													className='my-2 w-100'
													disabled={!workshop.isActive}
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

export default WorkshopInfo;
