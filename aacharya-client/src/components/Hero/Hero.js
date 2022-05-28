import React from 'react';

import bgImg from '../../images/bg_1.jpg';

import './Hero.css';

function Hero() {
	return (
		
			<div
				className='hero-wrap'
				style={{
					backgroundImage: `url(${bgImg})`,
					backgroundAttachment: 'fixed',
				}}
			>
				
			</div>
		
	);
}

export default Hero;
