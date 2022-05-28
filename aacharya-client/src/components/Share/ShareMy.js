import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	Card,
	CardContent,
	Container,
	Paper,
	Typography,
	Button,
} from '@material-ui/core';
import {
	callTutor,
	getAllInstitutes,
	getTutorById,
} from "../../actions/tutorActions";
import { makeStyles } from '@material-ui/core/styles';
import { getReferralCode } from '../../actions/commonActions';
import ProgressBar from '../ProgressBar';
import { getProfile, getRating } from "../../actions/userActions";
import { useParams } from "react-router";
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	subGreeting: {
		fontWeight: 600,
		textAlign: 'center',
		margin: theme.spacing(2, 'auto'),
	},
	root: {
		minWidth: 275,
		background: theme.palette.primary.main,
	},
	title: {
		color: '#fff',
		fontSize: 23,
	},
}));

function ShareMy() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { instituteId } = useParams();
	const { referral, loading } = useSelector((state) => state.commonData);
	const { user } = useSelector((state) => state.usersData);
	let [userId, setUserId] = useState("");
	const { tutors, tutorProfile, selectedSearchSubject, institutes } =
		useSelector((state) => state.tutorsData);

	useEffect(() => {
		debugger
		dispatch(getTutorById(instituteId));
	}, [instituteId]);


	useEffect(() => {
		debugger
		console.log(user)
		console.log(institutes)
		if (institutes && institutes.length != 0) {
			console.log(institutes[0].userId._id)
			userId = institutes[0].userId._id
			setUserId(userId)
		}
		// if (tutorProfile && tutorProfile._id) {
		// 	if (tutorProfile.userId) dispatch(getRating(tutorProfile.userId._id));
		// }
	}, [tutorProfile]);
	const handleAddSubject = () => {

		let copyCode = navigator.clipboard.writeText("https://aacharya.net/institutes/"+userId)
		if (copyCode != '') {
			toast.success("Copy Sharing URL");
		}
		else {
			toast.error("Please Copy Again Sharing URL!!");
		}
	};
	return (
		<>
			{loading ? (
				<ProgressBar />
			) : (
				<Container maxWidth='md' className='my-3'>
					<Paper elevation={3}>
						<Card className={classes.root}>
							<CardContent>
								<Typography
									variant='h5'
									className={classes.subGreeting}
									align='center'
								>
									Hey 👋 {user && user.name}, this is your share link
								</Typography>
								<Typography
									variant='h5'
									className={classes.title}
									align='center'
								>
									https://aacharya.net/institutes{userId}

								</Typography>


							</CardContent>
						</Card>
					</Paper>
					<Button
						type='submit'
						fullWidth={true}
						variant='contained'
						color='primary'
						className="my-3"
						onClick={handleAddSubject}
					>
						Copy Link
					</Button>





				</Container>
			)}
		</>
	);
}

export default ShareMy;
