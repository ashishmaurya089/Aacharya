import React from 'react';
import { Link } from 'react-router-dom';

import bredImg from '../../images/bg_2.jpg';
import useStyles from './styles';

function CustomBreadCrumbs({ heading, subHeading }) {
	const classes = useStyles();
	return (
		<div>
			<div
				className={`hero-wrap hero-wrap-2 ${classes.height}`}
				style={{
					backgroundImage: `url(${bredImg})`,
					backgroundAttachment: 'fixed',
				}}
			>
				<div className='overlay'></div>
				<div className='container'>
					<div
						className={`row no-gutters slider-text align-items-center justify-content-center ${classes.height}`}
						data-scrollax-parent='true'
					>
						<div className='col-md-8 ftco-animate text-center'>
							<p className='breadcrumbs'>
								<span className='mr-2'>
									<Link to='/'>Home</Link>
								</span>{' '}
								<span>{subHeading}</span>
							</p>
							<h1 className='mb-3 bread'>{heading}</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomBreadCrumbs;
