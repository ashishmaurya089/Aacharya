import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	Avatar,
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
} from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import {
	getLevels,
	getStreams,
	SearchStream,
} from '../../../actions/subjectActions';
import ProgressBar from '../../../components/ProgressBar';
import NoItemsFound from '../../../components/NoItemsFound';
import SegmentSearch from '../SegmentSearch';
import SegmentBreadCrumbs from '../SegmentBreadCrumbs';

import useStyles from '../styles';
import bredImg from '../../../images/bg_2.jpg';

function StreamList() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { levelId } = useParams();

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
	}, [selectedLevelId]);

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
			<SegmentBreadCrumbs data={selectedLevelDetails} />

			<Container maxWidth='lg' fixed>
				<SegmentSearch
					searchTerm={searchTerm}
					setsearchTerm={setsearchTerm}
					data={searchedStreams}
					route={'/category'}
					handleSelected={handleSelected}
					placeHolder={'Search Stream'}
				/>
				{!loading ? (
					<Grid container>
						{streams && streams.length > 0 ? (
							streams.map((value) => (
								<Grid item xs={12} key={value._id} className='my-2'>
									<Link to={`/category`}>
										<Paper elevation={3}>
											<List onClick={() => handleSelected(value._id)}>
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
								<NoItemsFound dialogline='No Streams Found!' />
							</>
						)}
					</Grid>
				) : (
					<ProgressBar />
				)}
			</Container>
		</>
	);
}

export default StreamList;
