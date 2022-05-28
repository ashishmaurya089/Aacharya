import React from 'react';
import { Grid, Card, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
// List Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import bredImg from '../../images/bg_2.jpg';

import useStyles from './styles';

import ProgressBar from '../../components/ProgressBar';
import NoItemsFound from '../../components/NoItemsFound';

function CategoryListDetails({ data, loading, basePath, heading }) {
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
								<span>{heading}</span>
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
							<Grid item xs={12} key={value._id}>
								<Link to={basePath}>
									<Paper elevation={3}>
										<List>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<ClearAllIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={value.name}
													secondary={value.description}
												/>
											</ListItem>
										</List>
									</Paper>
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

export default CategoryListDetails;
