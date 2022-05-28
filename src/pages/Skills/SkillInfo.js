import React, { useEffect, useRef, useState } from 'react';
import {
	CardMedia,
	Container,
	Typography,
	List,
	ListItem,
	Chip,
	Divider,
	Button,
	Grid,
	Card,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AdjustIcon from '@material-ui/icons/Adjust';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookADemo, getSkillById, getSkills } from '../../actions/skillActions';
import Carousel from 'react-multi-carousel';

import useStyles from './styles';
import YouTube from 'react-youtube';
import AddParticipant from '../../components/AddParticipant/AddParticipant';
import { getProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';
import ProgressBar from '../../components/ProgressBar';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 3000, min: 1200 },
		items: 2,
	},
	desktop: {
		breakpoint: { max: 1200, min: 1024 },
		items: 2,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

function SkillInfo() {
	const classes = useStyles();
	const { skills, skill, loading } = useSelector((state) => state.skillsData);
	const { user } = useSelector((state) => state.usersData);

	const dispatch = useDispatch();
	const { skillId } = useParams();
	const [open, setopen] = useState(false);

	// const [selectedSkillDetails, setselectedSkillDetails] = useState([]);
	// useEffect(() => {
	// 	dispatch(getSkills());
	// 	let selectedSkillDetails = skills.filter((ski) => ski._id === skillId);
	// 	if (selectedSkillDetails.length > 0) {
	// 		setselectedSkillDetails(selectedSkillDetails[0]);
	// 	}
	// }, []);
	useEffect(() => {
		dispatch(getSkillById(skillId));
	}, [skillId]);
	let accessToken = localStorage.getItem('accessToken');

	// useEffect(() => {
	// 	if (accessToken) {
	// 		dispatch(getProfile());
	// 	}
	// }, [accessToken]);
	//console.log('selectedSkillDetails', skill);

	const handleRegistration = () => {
		if (user && user.isTutor) {
			return toast.error('Login in as a Student / Parent');
		}
		if (user && user.isCoachingCenter) {
			return toast.error('Login in as a Student / Parent');
		}
		if (!user) {
			return toast.error('Please Login');
		}
		setopen(true);
	};
	const handleBookADemo = () => {
		if (user && user.user.isTutor) {
			return toast.error('Login in as a Student / Parent');
		}
		if (user && user.user.isCoachingCenter) {
			return toast.error('Login in as a Student / Parent');
		}
		if (!user) {
			return toast.error('Please Login');
		}
		dispatch(bookADemo(skill._id, skill.name));
	};
	const handleClose = () => {
		setopen(false);
	};
	return (
		<>
			{/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
			<AddParticipant
				data={skill}
				type='skill'
				open={open}
				handleClose={handleClose}
			/>
			{loading ? (
				<>
					<ProgressBar />
				</>
			) : (
				<>
					{skill && (
						<>
							<Container maxWidth='lg' fixed>
								<div className={classes.header}>
									<Grid container spacing={2}>
										<Grid item xs>
											<Typography variant='h5' className='mt-2' gutterBottom>
												{skill.name}
											</Typography>
											<div className={classes.price}>
												<Typography variant='subtitle1'>Price:</Typography>
												<Typography
													variant='subtitle2'
													color='secondary'
													className={classes.priceStrike}
												>
													{skill.currencySymbol}
													{skill.originalPrice}
												</Typography>
												<Typography variant='subtitle1'>
													{skill.currencySymbol}
													{skill.price}
												</Typography>
											</div>
											<Typography variant='body2' component='p'>
												Registration On:{' '}
												{new Date(skill.startDate).toDateString()}
											</Typography>
											<Typography variant='body1' gutterBottom>
												Workshop: {skill.isActive ? 'Open' : 'Coming Soon'}
											</Typography>
										</Grid>
										<Grid item xs>
											{skill.isActive ? (
												<>
													<Button
														variant='contained'
														color='primary'
														onClick={handleRegistration}
														className='m-3'
													>
														Register Now
													</Button>
													<Button
														variant='contained'
														color='primary'
														onClick={handleBookADemo}
														className='m-3'
													>
														Book A Demo
													</Button>
												</>
											) : (
												<Button variant='contained' color='secondary'>
													Registrations Closed
												</Button>
											)}
										</Grid>
									</Grid>
								</div>

								<CardMedia
									className={classes.cardMedia}
									component='img'
									image={skill.banner}
									title={skill.name}
								/>

								<div className={classes.cardMedia}>
									<Typography variant='h5' className='mt-2' gutterBottom>
										{skill.name}
									</Typography>
									<div className={classes.price}>
										<Typography variant='subtitle1'>Price:</Typography>
										<Typography
											variant='subtitle2'
											color='secondary'
											className={classes.priceStrike}
										>
											{skill.currencySymbol}
											{skill.originalPrice}
										</Typography>
										<Typography variant='subtitle1'>
											{skill.currencySymbol}
											{skill.price}
										</Typography>
									</div>
									<Typography variant='body2' component='p'>
										Starts on: {new Date(skill.startDate).toDateString()}
									</Typography>
								</div>

								<Grid container spacing={2}>
									<Grid item xs={12} sm={8} md={8}>
										<Card className='p-4 my-3'>
											<>
												{skill.about
													? skill.about.length > 0 &&
													  skill.about.map((about, i) => (
															<Typography
																variant='body1'
																className='my-3'
																gutterBottom
																key={i + 1}
															>
																{about}
															</Typography>
													  ))
													: null}
											</>
											<Carousel responsive={responsive}>
												<YouTube
													videoId={skill.trailer}
													className={classes.media}
												/>
												<img
													src={skill.banner}
													alt='gallery'
													className={classes.media}
												/>
											</Carousel>
											{/* Instructor */}
											{skill.instructor ? (
												<>
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-user'></i> Conducted By:{' '}
															<span className={classes.span}>
																{skill.instructor.name}
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-graduation-cap'></i>{' '}
															Qualification:{' '}
															<span className={classes.span}>
																{skill.instructor.qualification}
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-book'></i> Skills:{' '}
															{skill.instructor.skills.map((ski, i) => (
																<Chip
																	label={ski}
																	key={i + 2}
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
																{skill.instructor.domainExperience} Years
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-globe'></i> Work Info:{' '}
															<span className={classes.span}>
																{skill.instructor.designation} at{' '}
																{skill.instructor.companyName} with{' '}
																{skill.instructor.totalExperience} Years of
																Experience
															</span>
														</Typography>
													</div>
													<Divider />
													<div>
														<Typography variant='h6' className='my-2'>
															<i className='fas fa-clone'></i> Projects:
														</Typography>
														{skill.instructor &&
															skill.instructor.projects.map((pro, i) => (
																<List key={i + 3}>
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
												</>
											) : null}
											<Typography variant='h6' align='center'>
												Curriculum
											</Typography>
											<Divider className='my-2' />
											{skill.curriculum &&
												skill.curriculum.map((curr, i) => (
													<div key={i + 4}>
														<Typography
															variant='subtitle1'
															color='textSecondary'
															align='center'
															className={classes.span}
														>
															{curr.header}
														</Typography>
														<List>
															{curr.highlights.map((para, i) => (
																<ListItem key={i + 5}>
																	<ListItemIcon>
																		<AdjustIcon />
																	</ListItemIcon>
																	<ListItemText primary={para} />
																</ListItem>
															))}
														</List>
													</div>
												))}
											<Typography variant='h6' align='center'>
												FAQ's
											</Typography>
											<Divider className='my-2' />
											{skill.faqs &&
												skill.faqs.map((faq, i) => (
													<List key={i + 6}>
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
												))}{' '}
										</Card>
									</Grid>
									<Grid item xs={12} sm={4} md={4}>
										<Card className='p-4 my-3'>
											<Typography variant='h6' align='center'>
												Skills Details
											</Typography>
											<Divider />
											<div className={classes.skillDetails}>
												<i
													className={`fas fa-file-signature ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.skillDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Certificate
													</Typography>
													<span>
														{skill.certificate ? 'Provided' : 'Not Provided'}
													</span>
												</div>
											</div>
											{/* <Typography variant='h6' className='my-2'>
									<i className='fas fa-file-signature'></i> Certificate:{' '}
									<span className={classes.span}>
										{skill.certificate
											? 'Provided'
											: 'Not Provided'}
									</span>
								</Typography> */}
											<Divider />
											<div className={classes.skillDetails}>
												<i
													className={`fas fas fa-language ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.skillDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Medium of Instruction
													</Typography>
													<span>{skill.language}</span>
												</div>
											</div>
											{/* <Typography variant='h6' className='my-2'>
									<i className='fas fa-language'></i> Medium of Instruction:{' '}
									<span className={classes.span}>
										{skill.language}
									</span>
								</Typography> */}
											<Divider />
											<div className={classes.skillDetails}>
												<i
													className={`fas fa-chalkboard-teacher ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.skillDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Mode of Training
													</Typography>
													<span>
														{skill.onlineEvent ? 'Live Online' : 'Offline'}
													</span>
												</div>
											</div>
											{/* <Typography variant='h6' className='my-2'>
								<i className='fas fa-chalkboard-teacher'></i> Mode of Training:{' '}
								<span className={classes.span}>
									{skill.onlineEvent ? 'Live Online' : 'Offline'}
								</span>
							</Typography> */}
											<Divider />
											<div className={classes.skillDetails}>
												<i
													className={`fas fa-calendar-week ${classes.fontIcon}`}
												></i>{' '}
												<div className={classes.skillDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Registration Open
													</Typography>
													<span>
														{new Date(skill.startDate).toDateString()}
													</span>
												</div>
											</div>
											{/* <Typography variant='h6' className='my-2'>
								<i className='fas fa-calendar-week'></i> Start Date:{' '}
								<span className={classes.span}>
									{new Date(skill.startDate).toDateString()}
								</span>
							</Typography> */}
											<Divider />
											<div className={classes.skillDetails}>
												<i className={`fas fa-clock ${classes.fontIcon}`}></i>{' '}
												<div className={classes.skillDates}>
													<Typography
														variant='body1'
														className={`${classes.span} my-1`}
													>
														Duration of Course
													</Typography>
													<span>{skill.durationInDays} Days</span>
												</div>
											</div>
											{/* <Typography variant='h6' className='my-2'>
									<i className='far fa-clock'></i> Duration of Course:{' '}
									<span className={classes.span}>
										{skill.durationInDays} Days
									</span>
								</Typography> */}
										</Card>
										<div className={classes.cardMedia}>
											{skill.isActive ? (
												<>
													<Button
														variant='contained'
														color='primary'
														className='my-2 w-100'
														onClick={handleRegistration}
													>
														Register Now
													</Button>
													<Typography
														variant='h6'
														className='my-2'
														align='center'
													>
														OR
													</Typography>
													<Button
														variant='contained'
														color='primary'
														className='my-2 w-100'
														onClick={handleBookADemo}
													>
														Book A Demo
													</Button>
												</>
											) : (
												<Button
													variant='contained'
													color='secondary'
													className='my-2 w-100'
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

export default SkillInfo;
