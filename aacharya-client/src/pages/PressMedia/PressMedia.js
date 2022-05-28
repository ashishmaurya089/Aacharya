import React from 'react';
import PressMediaCarouselCard from '../../components/CarouselCard/PressMediaCarouselCard';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import PressMediaGallery from './PressMediaGallery';

function PressMedia() {
	return (
		<div>
			<CustomBreadCrumbs heading='Our Gallery' subHeading='Press & Media' />
			{/* <PressMediaCarouselCard /> */}
			<PressMediaGallery />
		</div>
	);
}

export default PressMedia;
