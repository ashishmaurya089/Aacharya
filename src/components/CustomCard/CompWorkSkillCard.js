import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import { EventSeat } from '@material-ui/icons';

import ProgressBar from '../ProgressBar';
import NoItemsFound from '../NoItemsFound';

import useStyles from './styles';

function CompWorkSkillCard({ loading, data, type, basePath }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleSelect = (skill) => {
		dispatch({
			type: 'SELECTED_SKILL',
			payload: skill,
		});
	};
	return (
		<Container maxWidth='lg' fixed>
			{!loading ? (
				<Grid container spacing={2} className='my-3'>
					{data && data.length > 0 ? (
						data.map((value) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
								<Link to={`${basePath}/${value._id}`}>
									<Card
										className={classes.root}
										onClick={() => handleSelect(value)}
									>
										<CardActionArea>
											{type === 'competition' ? (
												<CardMedia
													className={classes.media}
													component='img'
													image={value.banner}
													title={value.name}
												/>
											) : (
												<div className={classes.courseType}>
													<CardMedia
														className={classes.media}
														component='img'
														image={value.banner}
														title={value.name}
													/>
													<Typography
														variant='body2'
														color='textSecondary'
														component='p'
													>
														{value.type}
													</Typography>
												</div>
											)}

											<CardContent className={classes.contentRoot}>
												<Typography variant='h6' gutterBottom>
													{value.name}
												</Typography>
												{type === 'competition' ? (
													<div
														className={`d-flex ${
															type === 'competition' ? 'mb-3' : null
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
												) : (
													<>
														<Typography
															variant='body2'
															color='textSecondary'
															component='p'
														>
															{type === 'skill'
																? 'Courses Starts On:'
																: type === 'workshop' &&
																  'Workshop Starts On:'}{' '}
															{new Date(value.startDate).toDateString()}
														</Typography>
													</>
												)}
											</CardContent>
										</CardActionArea>
										<CardActions disableSpacing className={classes.price}>
											{type === 'skill' ? (
												<>
													<Typography
														variant='body1'
														color='textSecondary'
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
												</>
											) : (
												<>
													{type === 'workshop' && (
														<>
															<Typography
																variant='subtitle1'
																color='secondary'
																className={classes.priceStrike}
															>
																{value.currencySymbol}
																{value.originalPrice}
															</Typography>
															<Typography
																variant='subtitle2'
																color='textSecondary'
															>
																{value.currencySymbol}
																{value.price}
															</Typography>
														</>
													)}
												</>
											)}
										</CardActions>
									</Card>
								</Link>
							</Grid>
						))
					) : (
						<>
							<NoItemsFound dialogline='No Items Found!' />
						</>
					)}
				</Grid>
			) : (
				<ProgressBar />
			)}
		</Container>
	);
}

export default CompWorkSkillCard;
