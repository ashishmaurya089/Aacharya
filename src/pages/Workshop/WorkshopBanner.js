import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../actions/commonActions';
import BannerCarouselCard from '../../components/CarouselCard/BannerCarouselCard';

export default function WorkshopBanner() {
	const { banners, loading } = useSelector((state) => state.commonData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBanners());
	}, []);
	let filteredBanner = banners.filter((fl) => fl.type === 'workshop');
	return (
		<>
			<BannerCarouselCard data={filteredBanner} loading={loading} />
		</>
	);
}
