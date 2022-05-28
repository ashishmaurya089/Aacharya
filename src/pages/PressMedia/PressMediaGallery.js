import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Backdrop,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { getGallery } from '../../actions/commonActions';

function PressMediaGallery() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { gallery, loading } = useSelector((state) => state.commonData);

	const [page, setpage] = useState(0);
	const [perPage, setperPage] = useState(8);

	useEffect(() => {
		dispatch(getGallery(page, perPage));
	}, [page]);

	const handleExlpore = () => {
		setpage((page) => page + 1);
	};
	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<section className='ftco-section testimony-section'>
				<div className='container'>
					<div className='row justify-content-center '>
						<div className='col-md-7 heading-section ftco-animate text-center'>
							<h2>Our Latest Gallery</h2>

						</div>
					</div>
				</div>
			</section>

			<Container maxWidth='lg' fixed>
				<Grid container spacing={2}>
					{gallery &&
						gallery.map((gal, i) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={gal._id}
								className={`mx-auto`}
							>
								<Card className={classes.pressMediaGalleryRoot}>
									<CardActionArea className={classes.pressMediaGalleryZoom}>
										<CardMedia
											className={classes.pressMediaGalleryImg}
											component='img'
											alt='Contemplative Reptile'
											image={gal.url}
											title='Contemplative Reptile'
										/>
										<CardContent className={classes.pressMediaCaption}>
											<Typography variant='h5' component='h2'>
												{gal.caption}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
				</Grid>
				<Button
					variant='outlined'
					color='secondary'
					className={classes.exploreButton}
					onClick={handleExlpore}
				>
					Explore More
				</Button>
			</Container>
		</>
	);
}

export default PressMediaGallery;
