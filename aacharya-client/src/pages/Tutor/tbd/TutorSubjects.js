import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Grid,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { MoreVert, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorById } from '../../actions/tutorActions';
import ProgressBar from '../../components/ProgressBar';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import SubscriptionBanner from '../../components/SubscriptionBanner';
import { removeSubject } from '../../actions/userActions';
import { searchSubjects } from '../../actions/subjectActions';
import NoItemsFound from '../../components/NoItemsFound';

function TutorSubjects() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.usersData);
	const { searchedSubjects } = useSelector((state) => state.subjectsData);
	const { tutorProfile, loading } = useSelector((state) => state.tutorsData);
	//console.log('tutorProfile>>>>>>>>>>>>>>', tutorProfile);

	const [searchTerm, setsearchTerm] = useState('');

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	// const [subjectIds, setsubjectIds] = useState([]);

	useEffect(() => {
		if (user && user._id) dispatch(getTutorById(user._id));
	}, []);

	useEffect(() => {
		if (searchTerm) {
			dispatch(searchSubjects(searchTerm));
		}
	}, [searchTerm]);

	const ITEM_HEIGHT = 48;
	const handleClick = (event, subjectId) => {
		// setsubjectIds(subjectId);
		setAnchorEl(event.currentTarget);
	};
	const hanldeRemoveSubject = (id) => {
		dispatch(removeSubject([id]));
		handleClose();
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelected = (id) => {
		//console.log(id);
		dispatch({
			type: 'SELECT_LEVEL',
			payload: id,
		});
	};
	const handleSeachedSubjects = (id) => {
		//console.log(id);
		setsearchTerm('');
	};

	return (
		<Container>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<Search />
				</div>
				<InputBase
					placeholder='Search Subject'
					vaue={searchTerm}
					onChange={(e) => setsearchTerm(e.target.value)}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
			{searchedSubjects.length > 0 && (
				<Card className={classes.cardList}>
					<div className={classes.dataResult}>
						{searchedSubjects.map((value) => (
							<Link to='#'>
								<div
									key={value._id}
									className={classes.dataItem}
									onClick={() => handleSeachedSubjects(value._id)}
								>
									<div className={classes.dataItemList}>
										<Search />
										<div>
											<p>{value.name}</p>
											<small>Stream: {value.stream && value.stream.name}</small>
											{'  '}
											<small>Level: {value.level && value.level.name}</small>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Card>
			)}

			<Typography variant='h6' className={classes.tutorSubjectsLevels}>
				Permitted Levels
			</Typography>
			{!loading ? (
				<Grid container>
					{tutorProfile && tutorProfile.permittedLevels.length > 0 ? (
						tutorProfile.permittedLevels.map((value) => (
							<Grid item xs={12} sm={6} md={3} key={value._id}>
								<Link to='/providerstream'>
									<Card
										className={classes.tutorSubjectsRoot}
										variant='outlined'
										onClick={() => handleSelected(value._id)}
									>
										<CardActionArea>
											<CardMedia
												className={classes.tutorSubjectsMedia}
												component='img'
												image={value.icon}
												title={value.name}
											/>
											<CardContent>
												<Typography variant='h6' gutterBottom>
													{value.name}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Link>
							</Grid>
						))
					) : (
						<>
							<NoItemsFound dialogline='No Permitted Levels!' />
						</>
					)}
				</Grid>
			) : (
				<ProgressBar />
			)}

			<SubscriptionBanner type='gold' />

			<Typography variant='h6' className={classes.tutorSubjectsLevels}>
				Active Subjects
			</Typography>
			{!loading ? (
				<Grid container>
					{tutorProfile && tutorProfile.subjects.length > 0 ? (
						tutorProfile.subjects.map((value) => (
							<Grid item xs={12} key={value._id}>
								<div className={classes.demo}>
									<Divider className={classes.divider} />
									<List>
										<ListItem>
											<ListItemText
												primary={value.name}
												secondary={value && value.level.name}
											/>
											<ListItemSecondaryAction>
												<IconButton
													edge='end'
													aria-label='delete'
													onClick={(e) => handleClick(e, value._id)}
												>
													<MoreVert />
												</IconButton>
												<Menu
													id='long-menu'
													anchorEl={anchorEl}
													keepMounted
													open={open}
													onClose={handleClose}
													PaperProps={{
														style: {
															maxHeight: ITEM_HEIGHT * 4.5,
															width: '20ch',
														},
													}}
												>
													<MenuItem
														onClick={() => hanldeRemoveSubject(value._id)}
													>
														Make in Active
													</MenuItem>
												</Menu>
											</ListItemSecondaryAction>
											<Divider />
										</ListItem>
									</List>
								</div>
							</Grid>
						))
					) : (
						<>
							<NoItemsFound dialogline='No Active Subjects!' />
						</>
					)}
				</Grid>
			) : (
				<ProgressBar />
			)}
			<SubscriptionBanner type='silver' />
		</Container>
	);
}

export default TutorSubjects;
