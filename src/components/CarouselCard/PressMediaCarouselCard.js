import React, { useState } from 'react';
import { Backdrop, Card, CardActionArea, CardMedia } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import ProgressBar from '../ProgressBar';

import useStyles from './styles';

const exampledata = [
	{
		img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		title: 'events',
	},
	{
		img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		title: 'aset',
	},
	{
		img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
		title: 'institue',
	},
	{
		img: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
		title: 'workshop',
	},
	{
		img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		title: 'events',
	},
];

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 3000, min: 1200 },
		items: 3,
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

function PressMediaCarouselCard({ loading, data }) {
	const classes = useStyles();
	const [image, setimage] = useState('');

	const [open, setOpen] = useState(false);
	const handleViewImg = (value) => {
		setimage(value.img);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<>
				<Backdrop
					className={classes.backdrop}
					open={open}
					onClick={handleClose}
				>
					<CardMedia
						className={classes.backdropImg}
						component='img'
						image={image}
						title='banner Img'
					/>
				</Backdrop>
				{!loading ? (
					<Carousel
						responsive={responsive}
						removeArrowOnDeviceType={['tablet', 'mobile']}
						autoPlay
						autoPlaySpeed={3000}
						infinite
					>
						{exampledata.length > 0 &&
							exampledata.map((value, i) => (
								<Card
									className={classes.bannerCardRoot}
									key={i}
									onClick={() => handleViewImg(value)}
								>
									<CardActionArea>
										<CardMedia
											className={classes.bannerCardMedia}
											component='img'
											image={value.img}
											title={value.type}
										/>
									</CardActionArea>
								</Card>
							))}
					</Carousel>
				) : (
					<ProgressBar />
				)}
			</>
		</div>
	);
}

export default PressMediaCarouselCard;
