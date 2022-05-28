import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';

import ProgressBar from '../ProgressBar';

import useStyles from './styles';

function InstituteCard({ loading, data, basePath }) {
	const classes = useStyles();
	const handleContactAddress = (value) => {
		let address = JSON.parse(value.communicationAddress);
		return (
			<p
				className={classes.ctcAddress}
			>{`${address.Locality}, ${address.City}`}</p>
		);
	};
	return (
		<>
			{!loading ? (
				<Container maxWidth='lg' fixed >
					<Grid container spacing={2} className='my-3' style={{justifyContent:"center"}}>
						{data &&
							data.length > 0 &&
							data.map((value) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									lg={3}
									key={value._id}
								>
									<Link to={`${basePath}/${value.userId?._id}`}>
										<Card className={classes.instRoot}>
											<CardActionArea>
												<CardMedia
													component='img'
													alt={value.instituteName}
													image={value.instituteBackdrop}
													title={value.instituteName}
													className={classes.instBackdrop}
												/>
												<CardContent className={classes.instContent}>
													<img
														className={classes.instLogoImg}
														src={value.instituteLogo}
														alt={value.instituteName}
													/>
													<Typography gutterBottom variant='h5' component='h2'>
														{value.instituteName}
													</Typography>
													{handleContactAddress(value)}
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
							))}
					</Grid>
				</Container>
			) : (
				<ProgressBar />
			)}
		</>
	);
}

export default InstituteCard;
