import React from 'react';

import bredImg from '../../images/bg_2.jpg';

function Contact() {
	return (
		<>
			<div
				className='hero-wrap hero-wrap-2'
				style={{
					backgroundImage: `url(${bredImg})`,
					backgroundAttachment: 'fixed',
				}}
			>
				<div className='overlay'></div>
				<div className='container'>
					<div
						className='row no-gutters slider-text align-items-center justify-content-center'
						data-scrollax-parent='true'
					>
						<div className='col-md-8 ftco-animate text-center'>
							<p className='breadcrumbs'>
								<span className='mr-2'>
									<a href='/'>Home</a>
								</span>{' '}
								<span>Contact</span>
							</p>
							<h1 className='mb-3 bread'>Contact Us</h1>
						</div>
					</div>
				</div>
			</div>
			<section className='ftco-section contact-section ftco-degree-bg'>
				<div className='container'>
					<div className='row d-flex mb-5 contact-info'>

						{/* <div className='col-md-3'>
							<p>
								<span>Address:</span> 198 West 21th Street, Suite 721 New York
								NY 10016
							</p>
						</div>
						<div className='col-md-3'>
							<p>
								<span>Phone:</span>{' '}
								<a href='tel://1234567920'>+ 1235 2355 98</a>
							</p>
						</div>
						<div className='col-md-3'>
							<p>
								<span>Email:</span>{' '}
								<a href='mailto:info@yoursite.com'>info@yoursite.com</a>
							</p>
						</div>
						<div className='col-md-3'>
							<p>
								<span>Website</span> <a href='#'>yoursite.com</a>
							</p>
						</div> */}
					</div>
					<div className='row block-9'>
						<div className='col-md-6 pr-md-5'>
							<h4 className='mb-4'>Contact Us</h4>
							<form action='#'>
								<div className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Your Name'
									/>
								</div>
								<div className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Your Email'
									/>
								</div>
								<div className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Subject'
									/>
								</div>
								<div className='form-group'>
									<textarea
										name=''
										id=''
										cols='30'
										rows='7'
										className='form-control'
										placeholder='Message'
									></textarea>
								</div>
								<div className='form-group'>
									<input
										type='submit'
										value='Send Message'
										className='btn btn-primary py-3 px-5'
									/>
								</div>
							</form>
						</div>
						<div className='col-md-6 mt-5'>
							<p>
								<span>Address:</span> 198 West 21th Street, Suite 721 New York
								NY 10016
							</p>
							<p>
								<span>Phone:</span>{' '}
								<a href='tel://1234567920'>+91 7386141814</a>
							</p>
							<p>
								<span>Email:</span>{' '}
								<a href='mailto:info@yoursite.com'>info@aacharya.net</a>
							</p>
							<p>
								<span>Website</span> <a href='#'>aacharya.net</a>
							</p>
						</div>

						{/* <div className='col-md-6' id='map'></div> */}
					</div>
				</div>
			</section>
		</>
	);
}

export default Contact;
