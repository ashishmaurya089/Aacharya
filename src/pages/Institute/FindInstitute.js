import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import { Container, Paper } from '@material-ui/core';
import ProgressBar from '../../components/ProgressBar';
import {
	findInstituteBySubject,
	findTutorBySubject,
} from '../../actions/tutorActions';
import NoItemsFound from '../../components/NoItemsFound';
import { Link } from 'react-router-dom';
import TutorFilter from '../../components/TutorFilter';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		// maxWidth: '36ch',
		// backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));
function FindInstitute() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { findInstitute, selectedSearchSubject, loading } = useSelector(
		(state) => state.tutorsData
	);
	//console.log('findInstitute', findInstitute);

	useEffect(() => {
		dispatch(findInstituteBySubject({ subjectId: selectedSearchSubject._id }));
	}, [selectedSearchSubject]);

	return (
		<>
			<CustomBreadCrumbs
				heading='Institute Results'
				subHeading='Find Institute'
			/>
			<TutorFilter provider='institute' />

			{!loading ? (
				<Container maxWidth='sm' fixed>
					{findInstitute && findInstitute.length > 0 ? (
						<>
							{findInstitute.map((value) => (
								<Link to={`institutes/${value.userId?._id}`} key={value._id}>
									<Paper elevation={3}>
										<List className={classes.root}>
											<ListItem alignItems='flex-start'>
												<ListItemAvatar>
													<Avatar alt={value.name} src={value.instituteLogo} />
												</ListItemAvatar>
												<ListItemText
													primary={value.instituteName}
													secondary={
														<>
															<Typography
																component='span'
																variant='body2'
																className={classes.inline}
																color='textPrimary'
															>
																{value.instituteHeadName}
															</Typography>
															{`— ${value.rating}`}
														</>
													}
												/>
											</ListItem>
										</List>
									</Paper>
								</Link>
							))}
						</>
					) : (
						<NoItemsFound dialogline='No Institutes Found!' />
					)}
				</Container>
			) : (
				<ProgressBar />
			)}
		</>
	);
}

export default FindInstitute;
