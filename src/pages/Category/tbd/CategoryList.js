import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import bredImg from '../../images/bg_2.jpg';

import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import NoItemsFound from '../../components/NoItemsFound';

function CategoryList({ breadCrumbs, data, loading, basePath }) {
	const classes = useStyles();
	return (
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
								{breadCrumbs.length > 0 &&
									breadCrumbs.map((breadCrumb, i) => (
										<span className='mr-2' key={i}>
											<Link to={breadCrumb.path}>{breadCrumb.name}</Link>
											{' /'}
										</span>
									))}
							</p>
							<h1 className='mb-3 bread'>Our Services</h1>
						</div>
					</div>
				</div>
			</div>

			{!loading ? (
				<Grid container>
					{data && data.length > 0 ? (
						data.map((value) => (
							<Grid item xs={12} sm={6} md={3} key={value._id}>
								<Link to={`${basePath}/${value._id}`}>
									<Card className={classes.root} variant='outlined'>
										<CardActionArea>
											<CardMedia
												className={classes.media}
												component='img'
												// image={value.icon}
												image='https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
												title={value.name}
											/>
											<CardContent>
												<Typography variant='h6' gutterBottom>
													{value.name}
												</Typography>
												<Typography
													variant='subtitle2'
													color='textSecondary'
													component='p'
												>
													{value.description}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Link>
							</Grid>
						))
					) : (
						<>
							<NoItemsFound dialogline='No Categories Found!' />
						</>
					)}
				</Grid>
			) : (
				<ProgressBar />
			)}
		</>
	);
}

export default CategoryList;
