import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Backdrop,
	Button,
	CircularProgress,
	Container,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import { getAvatar } from '../../actions/commonActions';
import { getProfile, updateProfile } from '../../actions/userActions';

import useStyles from './styles';
import { useHistory } from 'react-router';

function ProfileEdit(props) {
	let accessToken = localStorage.getItem('accessToken');
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();

	const { profileImage, loading } = useSelector((state) => state.commonData);
	const { user, providerProfile } = useSelector((state) => state.usersData);

	const [name, setname] = useState('');
	const [profileImg, setprofileImg] = useState('');

	useEffect(() => {
		if (accessToken) {
			dispatch(getProfile());
		}
	}, [accessToken]);

	useEffect(() => {
		if (user && user._id) {
			setInitialFields(user);
		}
	}, [user]);

	useEffect(() => {
		if (profileImage) {
			setprofileImg(profileImage);
		}
	}, [profileImage]);

	const setInitialFields = (user) => {
		setname(user.name);
		setprofileImg(user.profileImage);
	};
	const uploadProfilePic = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		dispatch(getAvatar(formData));
	};

	const homeRoute = (route) => {
		history.push(route);
	};
	const handleUpdate = () => {
		const body = {
			name: name,
			profileImage: profileImage,
		};
		dispatch(updateProfile(body, homeRoute));
	};
	return (
		<>
			<Container maxWidth='sm' fixed>
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color='inherit' />
				</Backdrop>
				<Typography variant='h5' className={classes.subGreeting} align='center'>
					Hey 👋 {user && user.name}, Update your profile details
				</Typography>
				<input
					accept='image/*'
					className={classes.input}
					onChange={(event) => uploadProfilePic(event)}
					id='profile-pic-file'
					type='file'
				/>
				<label htmlFor='profile-pic-file' className={classes.avatar}>
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
					>
						<Avatar
							alt='User img'
							src={profileImg}
							className={classes.avatarImg}
						/>
					</IconButton>
				</label>
				<Typography variant='body1' align='center'>
					Click to Update Profile Picture
				</Typography>
				<TextField
					value={name}
					onChange={(e) => setname(e.target.value)}
					id='outlined-basic'
					margin='normal'
					variant='outlined'
					required
					fullWidth={true}
					label='Your Name'
					autoFocus
				/>
				<Button
					onClick={() => handleUpdate()}
					size='large'
					variant='contained'
					color='primary'
					fullWidth
					className={classes.updateButton}
				>
					Update
				</Button>
			</Container>
		</>
	);
}

export default ProfileEdit;
