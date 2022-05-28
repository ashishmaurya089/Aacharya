import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
	getCategories,
	getStreams,
	searchCategory,
} from '../../../actions/subjectActions';
import ProgressBar from '../../../components/ProgressBar';
import SegmentSearch from '../SegmentSearch';
import SegmentBreadCrumbs from '../SegmentBreadCrumbs';

import useStyles from '../styles';
import bredImg from '../../../images/bg_2.jpg';

function CategoryList() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { streamId } = useParams();

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
			<SegmentBreadCrumbs
				data={selectedStreamDetails}
				// previousData={selectedStreamDetails}
			/>
			<Container maxWidth='lg' fixed>
				<SegmentSearch
					searchTerm={searchTerm}
					setsearchTerm={setsearchTerm}
					data={searchedCategories}
					route={'/category'}
					handleSelected={handleSelected}
					placeHolder={'Search Category'}
				/>
				{!loading ? (
					<Grid container>
						{categories && categories.length > 0 ? (
							categories.map((value) => (
								<Grid item xs={12} key={value._id} className='my-2'>
									<Link to={`/subjects`}>
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
								<>{history.push('/subjects')}</>
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

export default CategoryList;
