import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Checkbox,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import {
	getAllSubjects,
	getCategories,
	getStreams,
} from '../../../actions/subjectActions';
import { addServices } from '../../../actions/userActions';
import NoItemsFound from '../../../components/NoItemsFound';
import ProgressBar from '../../../components/ProgressBar';

import useStyles from './styles';
import { toast } from 'react-toastify';

function ProviderSubjectsList() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		selectedLevelId,
		selectedStreamId,
		selectedCategoryId,
		streams,
		categories,
		subjects,
		loading,
	} = useSelector((state) => state.subjectsData);

	const [selectedStreamDetails, setselectedStreamDetails] = useState({});
	const [selectedCategoryDetails, setselectedCategoryDetails] = useState({});
	const [checked, setChecked] = React.useState([]);
	const [subjectsIds, setsubjectsIds] = React.useState([]);

	useEffect(() => {
		let selectedStreamDetails = streams.filter(
			(levl) => levl._id === selectedStreamId
		);
		if (selectedStreamDetails.length > 0) {
			setselectedStreamDetails(selectedStreamDetails[0]);
		}
	}, []);

	useEffect(() => {
		debugger
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
	}, []);

	const handleToggle = (value) => () => {
		debugger	
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		newChecked.filter((item) => {
			setsubjectsIds([
				...subjectsIds,
				{ subId: item._id, levelId: item.level },
			]);
		});
	};

	// const uniq = new Set(subjectsIds.map((e) => JSON.stringify(e)));
	// const res = Array.from(uniq).map((e) => JSON.parse(e));
	// //console.log('res', res);

	const homeRouting = (route) => {
		history.push(route);
	};
	const handleAddSerives = () => {
		debugger
		//console.log(subjectsIds);
		if (subjectsIds.length > 0) {
			dispatch(addServices(subjectsIds, homeRouting));
		} else {
			toast.error('Select Subject');
		}

		dispatch({
			type: 'RESET_CATEGORY',
		});
	};

	return (
		<>
			<Container maxWidth='lg' fixed>
				<Typography variant='h6' className={classes.slectedListName}>
					{!selectedCategoryDetails.name
						? selectedStreamDetails.name
						: selectedCategoryDetails.name}
				</Typography>
				<Button
					variant='contained'
					color='primary'
					size='large'
					align='center'
					className={classes.addSubjectButton}
					onClick={handleAddSerives}
				>
					Add Subject
				</Button>
				{!loading ? (
					<Grid container>
						{subjects && subjects.length > 0 ? (
							subjects.map((value) => (
								<Grid item xs={12}>
									<List dense className={classes.ProviderSubjectsListRoot}>
										<ListItem key={value}>
											<ListItemText id={value._id} primary={value.name} />
											<ListItemSecondaryAction>
												<Checkbox
													edge='end'
													onChange={handleToggle(value)}
													checked={checked.indexOf(value) > -1}
													inputProps={{ 'aria-labelledby': value._id }}
												/>
											</ListItemSecondaryAction>
										</ListItem>
										<Divider />
									</List>
								</Grid>
							))
						) : (
							<>
								<NoItemsFound dialogline='No Permitted Subjects!' />
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

export default ProviderSubjectsList;
