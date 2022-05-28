import React from 'react';

export default function Card() {
	return (
		<>
			<div className='font-card roboto-card'>
				<h3 className='font--roboto'>Roboto</h3>
				<p className='font--roboto'>
					Roboto is a sans-serif typeface family developed for the mobile
					operating system, Android.
				</p>
				<a
					target='_blank'
					href='https://fonts.google.com/specimen/Roboto'
					className='explore-button'
					rel='noreferrer'
				>
					Explore
				</a>
			</div>
		</>
	);
}
