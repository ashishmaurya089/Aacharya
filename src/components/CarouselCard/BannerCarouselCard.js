import React from 'react';
import Carousel from 'react-multi-carousel';
import { Card, CardMedia } from '@material-ui/core';
import ProgressBar from '../ProgressBar';

import useStyles from './styles';

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
		partialVisibilityGutter: 40
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		partialVisibilityGutter: 40
	},
};

function BannerCarouselCard({ data, loading }) {
	const classes = useStyles();
	let color = '#F6F5F5';
	return (
		<div style={{ background: `${color}` }}>
			{!loading ? (
				<Carousel
					responsive={responsive}
					removeArrowOnDeviceType={['tablet', 'mobile']}
					autoPlay
					autoPlaySpeed={5000}
					infinite
					partialVisbile
				>
					{data.length > 0 ? (
						data.map((value, i) => {
							return (
								<Card className={classes.bannerCardRoot} key={i}>
									<CardMedia
										className={classes.bannerCardMedia}
										component='img'
										image={value.url}
										title={value.type}
									/>
								</Card>
							);
						})
					) : (
						<>
							<ProgressBar />
						</>
					)}
				</Carousel>
			) : (
				<ProgressBar />
			)}
		</div>
	);
}

export default BannerCarouselCard;
