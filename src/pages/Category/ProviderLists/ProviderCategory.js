import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
	getCategories,
	getStreams,
	searchCategory,
} from '../../../actions/subjectActions';
import ProgressBar from '../../../components/ProgressBar';
import SegmentSearch from '../SegmentSearch';

import useStyles from './styles';

function ProviderCategory() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		selectedSegmentId,
		selectedLevelId,
		selectedStreamId,
		streams,
		categories,
		searchedCategories,
		loading,
	} = useSelector((state) => state.subjectsData);

	const [selectedStreamDetails, setselectedStreamDetails] = useState({});
	const [searchTerm, setsearchTerm] = useState('');

	useEffect(() => {
		dispatch(getStreams());
		dispatch(getCategories(selectedStreamId));
		let selectedStreamDetails = streams.filter(
			(levl) => levl._id === selectedStreamId
		);
		if (selectedStreamDetails.length > 0) {
			setselectedStreamDetails(selectedStreamDetails[0]);
		}
	}, [selectedStreamId]);

	const handleSelected = (id) => {
		debugger
		dispatch({
			type: 'SELECT_CATEGORY',
			payload: id,
		});
	};

	useEffect(() => {
		dispatch(
			searchCategory(
				searchTerm,
				selectedSegmentId,
				selectedLevelId,
				selectedStreamId
			)
		);
	}, [searchTerm]);
	return (
		<>
			<Container maxWidth='lg' fixed>
				{/* <div className={classes.search}>
					<div className={classes.searchIcon}>
						<Search />
					</div>
					<InputBase
						placeholder='Search Category'
						vaue={searchTerm}
						onChange={(e) => setsearchTerm(e.target.value)}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
				{searchedCategories.length > 0 && (
					<Card className={classes.cardList}>
						<div className={classes.dataResult}>
							{searchedCategories.map((value) => (
								<Link to='/providersubjects'>
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
					data={searchedCategories}
					route={'/providersubjects'}
					handleSelected={handleSelected}
					placeHolder={'Search Category'}
				/>
				{!loading ? (
					<>
						<Typography variant='h6' className={classes.slectedListName}>
							{selectedStreamDetails.name}
						</Typography>
						<Grid container>
							{categories && categories.length > 0 ? (
								categories.map((value) => (
									<Grid item xs={12} key={value._id} className='my-2'>
										<Link to='/providersubjects'>
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
								<>{history.push('/providersubjects')}</>
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

export default ProviderCategory;
