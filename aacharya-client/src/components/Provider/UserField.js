import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	TextField,
	IconButton,
	Avatar,
	FormControlLabel,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	Backdrop,
	Paper,
	MenuItem,
} from '@material-ui/core';
import { getAvatar } from '../../actions/commonActions';
import { useHistory } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
// Styles
import useStyles from './styles';

export default function UserField({ providerType }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	// Redux States
	const { profileImage, loading } = useSelector((state) => state.commonData);

	useEffect(() => {
		if (providerType === 'student') {
			setisLearner(true);
		} else {
			setisParent(true);
		}
	}, [providerType]);

	// Local States
	const [surname, setsurname] = useState('');
	const [name, setname] = useState('');
	const [gender, setgender] = useState('');
	const [profileImg, setprofileImg] = useState('');
	const [isLearner, setisLearner] = useState(false);
	const [isParent, setisParent] = useState(false);

	const [ugDegreeName, setugDegreeName] = useState('');
	const [pgDegreeName, setpgDegreeName] = useState('');

	useEffect(() => {
		if (profileImage) {
			setprofileImg(profileImage);
		}
	}, [profileImage]);

	const uploadAvatar = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		dispatch(getAvatar(formData));
	};

	const handleSave = (type) => {
		let formData = {
			// surname: surname,
			name: name,
			gender: gender,
			isLearner: isLearner,
			isParent: isParent,
			profileImage: profileImg,
			// : pgDegreeName,
		};

		if (!profileImg) {
			toast.error("Profile image can't be empty");
		} else if (!name) {
			toast.error('Please fill your name');
		} else if (!gender) {
			toast.error('Please select the gender');
		} else {
			//console.log(formData);
			dispatch(updateProfile(formData));
		}
	};

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Typography
				variant='h2'
				className={classes.subGreeting}
				style={{ textTransform: 'capitalize' }}
			>
				{providerType} Profile
			</Typography>
			<input
				accept='image/*'
				className={classes.input}
				onChange={(event) => uploadAvatar(event)}
				id='icon-button-file'
				type='file'
			/>
			<label htmlFor='icon-button-file' className={classes.avatar}>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='span'
				>
					<Avatar alt={name} src={profileImg} className={classes.avatarImg} />
				</IconButton>
			</label>
			<Typography variant='body1' align='center'>
				Click to Upload Picture
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						value={name}
						onChange={(e) => setname(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
						fullWidth={true}
						label='Full Name'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Gender</FormLabel>
						<RadioGroup
							aria-label='gender'
							name='gender'
							value={gender}
							onChange={(e) => setgender(e.target.value)}
							className={classes.gender}
						>
							<FormControlLabel value='male' control={<Radio />} label='Male' />
							<FormControlLabel
								value='female'
								control={<Radio />}
								label='Female'
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
			{providerType == "student" ? <>
				<Grid item xs={12}>
					<TextField
						select
						fullWidth={true}
						label='Educational *'
						variant='outlined'
						value={pgDegreeName}
						onChange={(e) => setpgDegreeName(e.target.value)}
					>
						<MenuItem value="school">School</MenuItem>
						<MenuItem value="inter">Inter</MenuItem>
						<MenuItem value="diploma">Diploma</MenuItem>
						<MenuItem value="undergraduate">Undergraduate</MenuItem>
						<MenuItem value="postgraduate">Postgraduate</MenuItem>
						<MenuItem value="researchScholar">Research Scholar</MenuItem>
					</TextField>
				</Grid>
		
			</> : null}
			{providerType == "parent" ? <>
				<Grid item xs={12}>
					<TextField
						select
						fullWidth={true}
						label='Profession *'
						variant='outlined'
						value={pgDegreeName}
						onChange={(e) => setpgDegreeName(e.target.value)}
					>
						<MenuItem >Pvt. Employee</MenuItem>
						<MenuItem >Govt.employee</MenuItem>
						<MenuItem >Business</MenuItem>
						<MenuItem >House Wife</MenuItem>
					</TextField>
				</Grid>
			</> : null}

			<div className={classes.creatingButtonContainer}>
				<Button
					onClick={() => handleSave()}
					size='large'
					variant='contained'
					color='primary'
					fullWidth
					className={classes.createAccountButton}
				>
					Save
				</Button>
			</div>
		</>
	);
}
