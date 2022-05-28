import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core';
import { ClearAll } from '@material-ui/icons';
import {
	getLevels,
	getStreams,
	SearchStream,
} from '../../../actions/subjectActions';
import SegmentSearch from '../SegmentSearch';
import ProgressBar from '../../../components/ProgressBar';
import NoItemsFound from '../../../components/NoItemsFound';

import useStyles from './styles';

function ProviderStream() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const {
		selectedSegmentId,
		selectedLevelId,
		levels,
		streams,
		searchedStreams,
		loading,
	} = useSelector((state) => state.subjectsData);

	const [selectedLevelDetails, setselectedLevelDetails] = useState({});
	const [searchTerm, setsearchTerm] = useState('');

	useEffect(() => {
		dispatch(getLevels());
		dispatch(getStreams(selectedLevelId));
		let selectedLevelDetails = levels.filter(
			(levl) => levl._id === selectedLevelId
		);
		if (selectedLevelDetails.length > 0) {
			setselectedLevelDetails(selectedLevelDetails[0]);
		}
	}, []);

	const handleSelected = (id) => {
		dispatch({
			type: 'SELECT_STREAM',
			payload: id,
		});

		dispatch({
			type: 'RESET_CATEGORY',
		});
	};

	useEffect(() => {
		dispatch(SearchStream(searchTerm, selectedSegmentId, selectedLevelId));
	}, [searchTerm]);

	return (
		<>
			<Container maxWidth='lg' fixed>
				{/* <div className={classes.search}>
					<div className={classes.searchIcon}>
						<Search />
					</div>
					<InputBase
						placeholder='Search Stream'
						vaue={searchTerm}
						onChange={(e) => setsearchTerm(e.target.value)}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
				{searchedStreams.length > 0 && (
					<Card className={classes.cardList}>
						<div className={classes.dataResult}>
							{searchedStreams.map((value) => (
								<Link to='/providercategory'>
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
					data={searchedStreams}
					route={'/providercategory'}
					handleSelected={handleSelected}
					placeHolder={'Search Stream'}
				/>

				{!loading ? (
					<>
						<Typography variant='h6' className={classes.slectedListName}>
							{selectedLevelDetails.name}
						</Typography>
						<Grid container>
							{streams && streams.length > 0 ? (
								streams.map((value) => (
									<Grid item xs={12} key={value._id} className='my-2'>
										<Link to='/providercategory'>
											<Paper
												elevation={3}
												onClick={() => handleSelected(value._id)}
											>
												<List>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<ClearAll />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary={value.name} />
													</ListItem>
												</List>
											</Paper>
										</Link>
									</Grid>
								))
							) : (
								<>
									<NoItemsFound dialogline='No Streams Found!' />
								</>
							)}
						</Grid>
					</>
				) : (
					<ProgressBar />
				)}
			</Container>
		</>
	);
}

export default ProviderStream;
