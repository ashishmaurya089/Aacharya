import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../actions/commonActions';
import BannerCarouselCard from '../../components/CarouselCard/BannerCarouselCard';

export default function SkillBanner() {
	const { banners, loading } = useSelector((state) => state.commonData);
	const dispatch = useDispatch();
	// const [filteredBanner, setfilteredBanner] = useState([]);
	useEffect(() => {
		dispatch(getBanners());
	}, []);
	let filteredBanner = banners.filter((fl) => fl.type === 'skill');
	return (
		<div>
			<BannerCarouselCard data={filteredBanner} loading={loading} />
		</div>
	);
}
