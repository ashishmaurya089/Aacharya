import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
	getAllSubjects,
	getCategories,
	searchSubjects,
} from '../../../actions/subjectActions';

import ProgressBar from '../../../components/ProgressBar';
import NoItemsFound from '../../../components/NoItemsFound';
import SegmentSearch from '../SegmentSearch';
import SegmentBreadCrumbs from '../SegmentBreadCrumbs';

import useStyles from '../styles';
import bredImg from '../../../images/bg_2.jpg';

function SubjectsList() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { categoryId } = useParams();

	const {
		selectedSegmentId,
		selectedLevelId,
		selectedStreamId,
		selectedCategoryId,
		streams,
		categories,
		subjects,
		searchedSubjects,
		loading,
	} = useSelector((state) => state.subjectsData);

	const [selectedStreamDetails, setselectedStreamDetails] = useState({});
	const [selectedCategoryDetails, setselectedCategoryDetails] = useState({});
	const [searchTerm, setsearchTerm] = useState('');

	useEffect(() => {
		let selectedStreamDetails = streams.filter(
			(levl) => levl._id === selectedStreamId
		);
		if (selectedStreamDetails.length > 0) {
			setselectedStreamDetails(selectedStreamDetails[0]);
		}
	}, []);

	useEffect(() => {
		dispatch(getCategories());
		dispatch(
			getAllSubjects(selectedLevelId, selectedStreamId, selectedCategoryId)
		);
		let selectedCategoryDetails = categories.filter(
			(cat) => cat._id === selectedCategoryId
		);
		if (selectedCategoryDetails.length > 0) {
			setselectedCategoryDetails(selectedCategoryDetails[0]);
		}
	}, [selectedLevelId, selectedStreamId, selectedCategoryId]);

	const handleSelected = (value) => {
		dispatch({
			type: 'SELECTED_SEARCH_SUBJECT',
			payload: value,
		});
		dispatch({
			type: 'RESET_CATEGORY',
		});
	};

	useEffect(() => {
		dispatch(
			searchSubjects(
				searchTerm,
				selectedSegmentId,
				selectedLevelId,
				selectedStreamId,
				selectedCategoryId
			)
		);
	}, [searchTerm]);

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
								<span></span>
							</p>
							<h4 className='mb-3 bread' style={{ color: '#fff' }}>
								{!selectedCategoryDetails.name
									? selectedStreamDetails.name
									: selectedCategoryDetails.name}
							</h4>
						</div>
					</div>
				</div>
			</div>

			<Container maxWidth='lg' fixed>
				<SegmentSearch
					searchTerm={searchTerm}
					setsearchTerm={setsearchTerm}
					data={searchedSubjects}
					route={'/findTutor'}
					handleSelected={handleSelected}
					placeHolder={'Search Subjects'}
					type={'subject'}
				/>
				{!loading ? (
					<Grid container>
						{subjects && subjects.length > 0 ? (
							subjects.map((value) => (
								<Grid item xs={12} key={value._id} className='my-2'>
									<Link to='/findTutor'>
										<Paper elevation={3}>
											<List onClick={() => handleSelected(value)}>
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
								<NoItemsFound dialogline='No Subjects Found!' />
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

export default SubjectsList;
