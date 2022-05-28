import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import {
	getLevels,
	getSegments,
	searchLevel,
} from '../../../actions/subjectActions';
import ProgressBar from '../../../components/ProgressBar';
import NoItemsFound from '../../../components/NoItemsFound';
import SegmentSearch from '../SegmentSearch';

import useStyles from './styles';

function ProviderLevel() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { levels, selectedSegmentId, segments, searchedLevels, loading } =
		useSelector((state) => state.subjectsData);

	const [selectedSegmentDetails, setselectedSegmentDetails] = useState({});
	const [searchTerm, setsearchTerm] = useState('');

	useEffect(() => {
		dispatch(getSegments());
		dispatch(getLevels(selectedSegmentId));
		let selectedSegmentDetails = segments.filter(
			(seg) => seg._id === selectedSegmentId
		);
		if (selectedSegmentDetails.length > 0) {
			setselectedSegmentDetails(selectedSegmentDetails[0]);
		}
	}, []);

	const handleSelected = (id) => {
		dispatch({
			type: 'SELECT_LEVEL',
			payload: id,
		});
	};

	useEffect(() => {
		dispatch(searchLevel(searchTerm, selectedSegmentId));
	}, [searchTerm]);

	return (
		<Container maxWidth='lg' fixed>
			{/* <div className={classes.search}>
				<div className={classes.searchIcon}>
					<Search />
				</div>
				<InputBase
					placeholder='Search Level'
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					vaue={searchTerm}
					onChange={(e) => setsearchTerm(e.target.value)}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
			{searchedLevels.length > 0 && (
				<Card className={classes.cardList}>
					<div className={classes.dataResult}>
						{searchedLevels.map((value) => (
							<Link to='/providerstream'>
								<div
									key={value._id}
									className={classes.dataItem}
									onClick={() => handleSelected(value._id)}
								>
									<div className={classes.dataItemList}>
										<Search />
										<div>
											<p>{value.name}</p>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Card>
			)} */}
			<SegmentSearch
				searchTerm={searchTerm}
				setsearchTerm={setsearchTerm}
				data={searchedLevels}
				route={`/providerstream`}
				handleSelected={handleSelected}
				placeHolder={'Search Level'}
			/>
			{!loading ? (
				<>
					<Typography variant='h6' className={classes.slectedListName}>
						{selectedSegmentDetails.name}
					</Typography>
					<Grid container spacing={2}>
						{levels && levels.length > 0 ? (
							levels.map((value) => (
								<Grid item xs={12} sm={6} md={3} key={value._id}>
									<Link to='/providerstream'>
										<Card
											className={classes.providerlevel}
											variant='outlined'
											onClick={() => handleSelected(value._id)}
										>
											<CardActionArea>
												<CardMedia
													className={classes.providerlevelMedia}
													component='img'
													image={value.icon}
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
								<NoItemsFound dialogline='No Pemitted Levels!' />
							</>
						)}
					</Grid>
				</>
			) : (
				<ProgressBar />
			)}
		</Container>
	);
}

export default ProviderLevel;
