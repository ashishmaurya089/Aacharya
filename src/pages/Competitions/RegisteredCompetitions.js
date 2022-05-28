import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../axios';
import {
	Card,
	CardContent,
	Typography,
	Button,
	CardActions,
	Container,
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import {
	eventUploads,
	getSubscribedCompetitions,
} from '../../actions/competitionAction';
import NoItemsFound from '../../components/NoItemsFound';
import ProgressBar from '../../components/ProgressBar';

import useStyles from './styles';

function RegisteredCompetitions() {
	const classes = useStyles();
	const dispatch = useDispatch();
	// Redux State
	const { subscribedCompetitions, loading } = useSelector(
		(state) => state.competitionsData
	);

	// Local State
	const [selectedComp, setSelectedComp] = useState('');

	useEffect(() => {
		dispatch(getSubscribedCompetitions());
	}, []);

	// Upload funationality of multiple Files
	const uploadCompDocs = (event) => {
		const uploadedFiles = event.target.files;
		var formData = new FormData();
		for (let i = 0; i < uploadedFiles.length; i++) {
			formData.append(`file[${i}]`, uploadedFiles[i]);
		}
		const fetchData = async () => {
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});
			try {
				const { data } = await axios.post(`/api/upload/documents`, formData, {
					headers: {
						'content-type': 'multipart/form-data',
					},
				});
				dispatch(
					eventUploads({
						registrationId: selectedComp,
						uploads: data.data,
					})
				);
				setTimeout(() => {
					dispatch({
						type: 'SET_LOADING',
						payload: false,
					});
				}, 600);
			} catch (error) {
				if (error.response.data.msg) {
					toast.error(error.response.data.msg);
				} else {
					toast.error(error);
				}
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}
		};
		fetchData();
	};

	return (
		<>
			<Container maxWidth='sm' fixed className={classes.registeredContainer}>
				<Typography
					component='h5'
					variant='h5'
					align='center'
					className={classes.registeredTitle}
				>
					Registered Competitions
				</Typography>
				{loading ? (
					<ProgressBar />
				) : (
					<>
						{subscribedCompetitions && subscribedCompetitions.length > 0 ? (
							subscribedCompetitions.map((comp) => (
								<Card className={classes.registeredRoot}>
									<CardContent className={classes.registeredInfo}>
										<div className={classes.registeredName}>
											<Typography component='h5' variant='h5'>
												{comp.subEventId.name}
											</Typography>
											<Typography variant='body1'>
												{comp.participantName}
											</Typography>
											<Typography variant='subtitle1'>
												{comp.participantEmail}
											</Typography>
										</div>
										<div className={classes.registeredStage}>
											<Typography component='h5' variant='h5'>
												{comp.currentStage}
											</Typography>
											<Typography variant='body1'>Current Stage</Typography>
										</div>
									</CardContent>
									<CardActions>
										<div>
											<input
												accept='image/*'
												className={classes.input}
												id={comp.event.name}
												multiple
												type='file'
												onChange={(event) => uploadCompDocs(event)}
											/>
											<label htmlFor={comp.event.name}>
												<Button
													size='small'
													variant='outlined'
													color='primary'
													component='span'
													startIcon={<CloudUpload />}
													onClick={() => setSelectedComp(comp._id)}
												>
													Upload Documents
												</Button>
											</label>
										</div>
									</CardActions>
								</Card>
							))
						) : (
							<NoItemsFound dialogline='No Competitions Registered Yet!' />
						)}
					</>
				)}
			</Container>
		</>
	);
}

export default RegisteredCompetitions;
