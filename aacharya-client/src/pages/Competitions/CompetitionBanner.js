import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../actions/commonActions';
import BannerCarouselCard from '../../components/CarouselCard/BannerCarouselCard';

export default function CompetitionBanner() {
	const dispatch = useDispatch();
	const { banners, loading } = useSelector((state) => state.commonData);
	useEffect(() => {
		dispatch(getBanners());
	}, []);
	let filteredBanner = banners.filter((fl) => fl.type === 'competition');
	return (
		<Container maxWidth="lg">
			<BannerCarouselCard data={banners} loading={loading} />
		</Container>
	);
}
