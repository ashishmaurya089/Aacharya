import React from 'react';
import Carousel from 'react-multi-carousel';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Grid
} from '@material-ui/core';
import { EventSeat } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import SeeMoreCard from '../CustomCard/SeeMoreCard';
import ProgressBar from '../ProgressBar';

import useStyles from './styles.js';

// Images
import CourseOne from '../../images/course-1.jpg';
import CourseTwo from '../../images/course-2.jpg';
import CourseThree from '../../images/course-3.jpg';

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
		breakpoint: { max: 1024, min: 500 },
		items: 2,
		partialVisibilityGutter: 30
	},
	mobile: {
		breakpoint: { max: 500, min: 0 },
		items: 1,
		partialVisibilityGutter: 60
	},
};

function CSWCarouselCard({ data, type, loading, heading, tagline, basePath }) {
	const classes = useStyles();
	const history = useHistory();

	const handleLinks = () => {
		if (type === 'skill') {
			history.push('/skills');
		} else if (type === 'workshop') {
			history.push('/workshops');
		} else {
			history.push('/competitions');
		}
	};
	return (
		<>
			<section className='ftco-section'>
				<div >
					{/* <div className='row justify-content-center '> */}
					<Grid container justifyContent='center' style={{textAlign:'center'}} >
						{/* <div className='col-md-7 heading-section ftco-animate text-center'> */}
						<Grid item >
							<h2 className={classes.headingStyle}>{heading}</h2>
							<p className={classes.tagline}>{tagline}</p>
						{/* </div> */}
						</Grid>
						</Grid>
					{/* </div> */}

					<SeeMoreCard type={type} />

					{!loading ? (
						<Carousel
							responsive={responsive}
							removeArrowOnDeviceType={['tablet', 'mobile']}
							infinite
							partialVisbile
						>
							{data.length > 0 &&
								data.map((value) => (
									<Link to={`${basePath}/${value._id}`} key={value._id}>
										<Card className={classes.root}>
											<CardActionArea>
												<CardMedia
													className={classes.media}
													component='img'
													image={value.banner}
													title={value.name}
												/>
												<CardContent className={classes.cardContent}>
													<Typography variant='h6' gutterBottom>
														{value.name}
													</Typography>
													{type === 'competition' && (
														<div
															className={`d-flex ${type === 'competition' ? 'mb-3' : null
																}`}
														>
															<Typography
																variant='body2'
																color='textSecondary'
																component='p'
															>
																Registrations:{'  '}
															</Typography>
															<Typography
																variant='body2'
																color='textSecondary'
																component='p'
																className={
																	value.isActive
																		? classes.registrationsOpen
																		: classes.registrationsClosed
																}
															>
																{/* Ends on:{' '}
															{new Date(
																value.registrationEndDate
															).toDateString()} */}
																{value.isActive ? 'OPEN' : 'CLOSE'}
															</Typography>
														</div>
													)}
													{type === 'skill' && (
														<>
															<Typography
																variant='body2'
																color='textSecondary'
																component='p'
															>
																Courses Starts On:{'  '}
																{new Date(value.startDate).toDateString()}
															</Typography>
														</>
													)}
													{type === 'workshop' && (
														<>
															<Typography
																variant='body2'
																color='textSecondary'
																component='p'
															>
																Workshop Starts On:{'  '}
																{new Date(value.startDate).toDateString()}
															</Typography>
														</>
													)}
												</CardContent>
											</CardActionArea>
											{type === 'skill' && (
												<CardActions disableSpacing className={classes.price}>
													<Typography
														variant='body1'
														color='textSecondary'
														// component='p'
														className='d-flex'
													>
														<EventSeat />
														{value.seatsLeft}
													</Typography>
													<Typography
														variant='subtitle1'
														color='secondary'
														className={classes.priceStrike}
													>
														{value.currencySymbol}
														{value.originalPrice}
													</Typography>
													<Typography variant='subtitle2' color='textSecondary'>
														{value.currencySymbol}
														{value.price}
													</Typography>
												</CardActions>
											)}
											{type === 'workshop' && (
												<CardActions disableSpacing className={classes.price}>
													<Typography
														variant='subtitle1'
														color='secondary'
														className={classes.priceStrike}
													>
														{value.currencySymbol}
														{value.originalPrice}
													</Typography>
													<Typography variant='subtitle2' color='textSecondary'>
														{value.currencySymbol}
														{value.price}
													</Typography>
												</CardActions>
											)}
										</Card>
									</Link>
								))}
						</Carousel>
					) : (
						<ProgressBar />
					)}
				</div>
			</section>
		</>
	);
}

export default CSWCarouselCard;
