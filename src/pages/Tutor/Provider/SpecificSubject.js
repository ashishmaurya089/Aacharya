import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { addServices } from '../../../actions/userActions';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	details: {
		margin: theme.spacing(3, 'auto'),
	},
	specificSubjectButton: {
		margin: theme.spacing(5, 'auto'),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function SpecificSubject({ data, open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const { user, providerProfile } = useSelector((state) => state.usersData);
	const [subject, setsubject] = useState(false);

	useEffect(() => {
		providerProfile &&
			providerProfile.permittedLevels &&
			providerProfile.permittedLevels.filter((item) => {
				if (item._id === data._id) {
					setsubject(true);
				} else {
					setsubject(false);
				}
			});
	}, [data]);

	const homeRouting = (route) => {
		history.push(route);
	};
	const handleAddSubject = (subjectsId) => {
		dispatch(addServices([subjectsId], homeRouting));
	};
	return (
		<div>
			<Dialog
				// fullScreen
				fullWidth={true}
				maxWidth='md'
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant='h5' className={classes.title}>
							{data && data.name}
						</Typography>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={classes.details}>
					{data && (
						<>
							<Typography variant='h6' gutterBottom>
								<strong>Name:</strong> {data.name}
							</Typography>
							{data.category && (
								<Typography variant='h6' gutterBottom>
									<strong>Category:</strong> {data.category.name}
								</Typography>
							)}
							{data.stream && (
								<Typography variant='h6' gutterBottom>
									<strong>Stream:</strong> {data.stream.name}
								</Typography>
							)}
							{data.level && (
								<Typography variant='h6' gutterBottom>
									<strong>Level:</strong> {data.level.name}
								</Typography>
							)}
							<Typography variant='h6' gutterBottom>
								<strong>Active Tutors:</strong> {data.providersCount}
							</Typography>
							<Typography variant='h6' gutterBottom>
								<strong>Permitted Subject:</strong>{' '}
								{subject ? 'Approved' : 'Not Approved'}
							</Typography>
							<Button
								variant='contained'
								color='primary'
								size='large'
								disabled={!subject}
								className={classes.specificSubjectButton}
								onClick={() => handleAddSubject(data._id)}
							>
								{subject ? 'Add Subject' : 'Subject not permitted'}
							</Button>
						</>
					)}
				</div>
			</Dialog>
		</div>
	);
}
