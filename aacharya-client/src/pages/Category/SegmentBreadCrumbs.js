import React from 'react';
import useStyles from './styles';
import bredImg from '../../images/bg_2.jpg';

function SegmentBreadCrumbs({ data, previousData }) {
	const classes = useStyles();
	return (
		<>
			{data && (
				<>
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
										<span></span>
									</p>
									<h4 className={`mb-3 bread`} style={{ color: '#fff' }}>
										{data.name}
									</h4>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default SegmentBreadCrumbs;
