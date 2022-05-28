import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@material-ui/core';
import { EventSeat } from '@material-ui/icons';

import ProgressBar from '../ProgressBar';
import NoItemsFound from '../NoItemsFound';
import useStyles from './styles';

function RegisteredSWCard({ loading, data, type, dialogline }) {
	const classes = useStyles();
	return (
		<>
			{!loading ? (
				<Grid container>
					{data && data.length > 0 ? (
						data.map((value) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
								<Card className={classes.root}>
									<CardActionArea>
										<CardMedia
											className={classes.media}
											component='img'
											image={value.banner}
											title={value.name}
										/>
										<CardContent className={classes.contentRoot}>
											<Typography variant='h6' gutterBottom>
												{value.name}
											</Typography>
											<Typography
												variant='body2'
												color='textSecondary'
												component='p'
											>
												{type === 'skill'
													? 'Courses Starts On:'
													: 'Workshop Starts On:'}{' '}
												{'  '}
												{new Date(value.startDate).toDateString()}
											</Typography>
										</CardContent>
									</CardActionArea>
									{type === 'skill' ? (
										<CardActions disableSpacing className={classes.price}>
											<Typography variant='body1' color='textSecondary'>
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
									) : (
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
							</Grid>
						))
					) : (
						<>
							<NoItemsFound dialogline={dialogline} />
						</>
					)}
				</Grid>
			) : (
				<ProgressBar />
			)}
		</>
	);
}

export default RegisteredSWCard;
