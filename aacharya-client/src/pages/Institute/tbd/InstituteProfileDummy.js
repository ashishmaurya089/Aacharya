import React, { useState, useEffect } from 'react';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	TextField,
	IconButton,
	Avatar,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Chip,
	Backdrop,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CardMedia,
	Card,
	CardHeader,
	Container,
	Divider,
} from '@material-ui/core';

import useStyles from './styles';
import {
	availableDays,
	firmRegistration,
	scheduleSlots,
} from '../../utils/data/tutor';
import {
	AccessTime,
	Call,
	Cancel,
	CloudUpload,
	Mail,
	MoreVert,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	getOptionsForProviderProfile,
	updateTutorProfile,
} from '../../actions/tutorActions';
import { getAvatar, uploadDocuments } from '../../actions/commonActions';
import { useHistory } from 'react-router-dom';
export default function InstituteDummy({ providerType }, props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	// Redux States
	const { providerProfileOptions, loading, InstOnboardingCompleted } =
		useSelector((state) => state.tutorsData);
	const { backdrop, profileImage, firmProof, headProof } = useSelector(
		(state) => state.commonData
	);
	const { user } = useSelector((state) => state.usersData);

	// Options Info
	useEffect(() => {
		dispatch(getOptionsForProviderProfile());
	}, [providerType]);

	useEffect(() => {
		if (InstOnboardingCompleted) {
			history.push('/institute');
		}
	}, [InstOnboardingCompleted]);

	//   SETTING INITIAL FIELDS IF IS AVAILABLE
	useEffect(() => {
		if (user && user.providerProfile) {
			setInitialFields(user.providerProfile);
		}
	}, [user]);

	useEffect(() => {
		if (!firmProof) {
			setfirmProofImg(
				user && user.providerProfile && user.providerProfile.workIdentity
			);
		} else {
			setfirmProofImg(firmProof[0]);
		}
		if (!headProof) {
			setheadProofImg(
				user && user.providerProfile && user.providerProfile.identityProof
			);
		} else {
			setheadProofImg(headProof[0]);
		}
		if (!backdrop) {
			setheadProofImg(
				user && user.providerProfile && user.providerProfile.instituteBackdrop
			);
		} else {
			setheadProofImg(backdrop[0]);
		}
	}, [firmProof, headProof, backdrop]);

	// Local States
	// const [logoImg, setlogoImg] = useState('');
	const [backdropImg, setbackdropImg] = useState('');
	const [firmProofImg, setfirmProofImg] = useState('');
	const [headProofImg, setheadProofImg] = useState('');

	const [instituteName, setinstituteName] = useState('');
	const [instituteHeadName, setinstituteHeadName] = useState('');
	const [address, setaddress] = useState('');
	const [locality, setlocality] = useState('');
	const [city, setcity] = useState('');
	const [state, setstate] = useState('');
	const [country, setcountry] = useState('');
	const [instituteContactNumber, setinstituteContactNumber] = useState('');
	const [instituteEmail, setinstituteEmail] = useState('');
	const [instituteWebsite, setinstituteWebsite] = useState('');
	const [instituteRegister, setinstituteRegister] = useState('');
	const [instituteTeachingPrefer, setinstituteTeachingPrefer] = useState('');
	const [instituteOpenOn, setinstituteOpenOn] = useState([]);
	const [selectedDay, setselectedDay] = useState('');
	const [availability, setavailability] = useState([]);
	const [slotAt, setslotAt] = useState('');
	const [slotEnd, setslotEnd] = useState('');

	const setInitialFields = (data) => {
		// setlogoImg(data.instituteLogo);
		setbackdropImg(data.instituteBackdrop);

		// if (!firmProof) {
		// 	setfirmProofImg(data.workIdentity);
		// } else {
		// 	setfirmProofImg(firmProof);
		// }
		// if (!headProof) {
		// 	setheadProofImg(data.identityProof);
		// } else {
		// 	setheadProofImg(headProof);
		// }

		setinstituteName(data.instituteName);
		setinstituteHeadName(data.instituteHeadName);
		setinstituteEmail(data.instituteEmail);
		setinstituteContactNumber(data.instituteContactNumber);
		let ctcAddress = JSON.parse(data.communicationAddress);
		setaddress(ctcAddress.Address);
		setlocality(ctcAddress.Locality);
		setcity(ctcAddress.City);
		setstate(ctcAddress.State);
		setcountry(ctcAddress.Country);

		setinstituteWebsite(data.instituteWebsite);
		setinstituteTeachingPrefer(data.instituteTeachingPreferences);
		setinstituteOpenOn(data.instituteOpenOn);
		setavailability(data.availability);
	};

	//console.log('firmProof', firmProof);
	//console.log('headProof', headProof);
	//console.log('firmProofImg', firmProofImg);
	//console.log('headProofImg', headProofImg);

	const handleClickSlot = () => {
		if (!slotAt || !slotEnd) {
			toast.error('Select the Slots');
		} else {
			let slotData = [...availability, `${slotAt} - ${slotEnd}`];
			setavailability(slotData);
		}
		resetSlots();
	};
	const handleClickWorkingDaySlots = () => {
		if (!selectedDay) {
			toast.error('Select the available days');
		} else {
			let workingSlotData = [...instituteOpenOn, selectedDay];
			setinstituteOpenOn(workingSlotData);
		}
		resetWorkingSlots();
	};
	const handleSlotDelete = (i) => {
		let newSlots = availability.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setavailability(newSlots);
	};
	const handleWorkingSlotDelete = (i) => {
		let newWorkingDaySlots = instituteOpenOn.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setinstituteOpenOn(newWorkingDaySlots);
	};
	const resetSlots = () => {
		setslotAt('');
		setslotEnd('');
	};
	const resetWorkingSlots = () => {
		setselectedDay('');
	};

	const uploadLogo = (event) => {
		//console.log('clicking LOGO ');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		dispatch(getAvatar(formData));
	};
	const uploadBackDrop = (event) => {
		//console.log('clicking Backdrop');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteBackdrop';
		dispatch(uploadDocuments(type, formData));
	};

	const uploadFirmProof = (event) => {
		//console.log('clicking uploadFirmProof');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteFirmProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadIdProof = (event) => {
		//console.log('clicking uploadIdProof');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteHeadIdProof';
		dispatch(uploadDocuments(type, formData));
	};
	const handleSave = (type) => {
		let formData = {
			providerType: 'institute',
			// instituteName: instituteName,
			instituteHeadName: instituteHeadName,
			instituteContactNumber: instituteContactNumber,
			instituteEmail: instituteEmail,
			communicationAddress: JSON.stringify({
				Address: address,
				Locality: locality,
				City: city,
				State: state,
				Country: country,
			}),
			// instituteWebsite: instituteWebsite,
			// instituteRegistrationType: instituteRegister,
			// instituteTeachingPreferences: instituteTeachingPrefer,
			// requested levels pending
			availability: availability,
			instituteOpenOn: instituteOpenOn,
			identityProof: headProofImg,
			workIdentity: firmProofImg,
		};
		//console.log(formData);

		if (!instituteHeadName) {
			toast.error('Institute Head Name Missing');
		} else if (!instituteContactNumber) {
			toast.error('Conatct Number is missing!');
		} else if (!instituteEmail) {
			toast.error('Email is required!');
		} else if (!address || !locality || !city || !state || !country) {
			toast.error('Please fill the contact adrress');
		} else if (!headProofImg || !firmProofImg) {
			toast.error('Please upload your proofs');
		} else {
			//console.log('Exicuting');
			dispatch(updateTutorProfile(type, formData, props.history));
		}
	};

	return (
		<Container maxWidth='sm' fixed>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Card
				className={classes.providerProfile}
				style={{
					backgroundImage: `url(${backdropImg})`,
				}}
			>
				<label htmlFor='icon-button-file' className={classes.avatar}>
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
					>
						<Avatar
							alt='user'
							src={profileImage}
							className={classes.avatarImg}
						/>
					</IconButton>
				</label>
				<div className={classes.providerProfileInfo}>
					<Typography variant='h3' className={classes.providerProfileTitle}>
						{user && user.providerProfile && user.providerProfile.instituteName}
					</Typography>
					<Typography variant='subtitle1'>
						<Mail />{' '}
						{user &&
							user.providerProfile &&
							user.providerProfile.instituteEmail}
					</Typography>
					<Typography variant='subtitle1'>
						<Call /> {user && user.user.countryCode}{' '}
						{user &&
							user.providerProfile &&
							user.providerProfile.instituteContactNumber}
					</Typography>
				</div>
			</Card>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Institue Details
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={instituteHeadName}
						onChange={(e) => setinstituteHeadName(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Name of the Head'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={instituteContactNumber}
						onChange={(e) => setinstituteContactNumber(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Coaching Center Telephone'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={instituteEmail}
						onChange={(e) => setinstituteEmail(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						type='email'
						fullWidth={true}
						label='Coaching Center Email'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Location Details
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={address}
						onChange={(e) => setaddress(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Contact Address'
						autoFocus
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						value={locality}
						onChange={(e) => setlocality(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Locality'
						autoFocus
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						value={city}
						onChange={(e) => setcity(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='City'
						autoFocus
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						value={state}
						onChange={(e) => setstate(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='State'
						autoFocus
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						value={country}
						onChange={(e) => setcountry(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Country'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						size='small'
						variant='contained'
						color='primary'
						fullWidth={true}
						startIcon={<CloudUpload />}
					>
						Update Map Loaction
					</Button>
				</Grid>
				{/* 	<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Teaching Preferences
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={instituteWebsite}
						onChange={(e) => setinstituteWebsite(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
						fullWidth={true}
						label='Coaching Center Website (Optional)'
						autoFocus
					/>
				</Grid> */}
				{/* <Grid item xs={12}>
					<Typography variant='body1' className={classes.subHeading}>
						Type of registration
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						select
						fullWidth={true}
						label='Type of Firm Registration'
						variant='outlined'
						value={instituteRegister}
						onChange={(e) => setinstituteRegister(e.target.value)}
					>
						{providerProfileOptions &&
							providerProfileOptions.instituteTeachingPreferences &&
							providerProfileOptions.instituteTeachingPreferences.firmRegistration.map(
								(option, i) => (
									<MenuItem key={i} value={option}>
										{option}
									</MenuItem>
								)
							)}
					</TextField>
				</Grid> */}
				{/* <Grid item xs={12}>
					<Typography variant='h5' className={classes.subGreeting}>
						Services Offered
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Competitive Exams'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Entrance Exams'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Professional Software Courses'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Fine Arts'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Hobby Club'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Languages'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								// checked={agree}
								// onChange={(e) => setagree(e.target.checked)}
							/>
						}
						label='Campus Recruitment Training'
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography variant='body1' className={classes.subHeading}>
						Services can be offered at
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						select
						fullWidth={true}
						label='Select Your Preferences'
						variant='outlined'
						value={instituteTeachingPrefer}
						onChange={(e) => setinstituteTeachingPrefer(e.target.value)}
					>
						{providerProfileOptions &&
							providerProfileOptions.instituteTeachingPreferences &&
							providerProfileOptions.instituteTeachingPreferences.preferences.map(
								(option, i) => (
									<MenuItem key={i} value={option.value}>
										{option.display}
									</MenuItem>
								)
							)}
					</TextField>
				</Grid> */}
				<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Available Time Slots
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={6}>
					<TextField
						id='outlined-select-currency-native'
						select
						label='Starts At'
						value={slotAt}
						onChange={(e) => setslotAt(e.target.value)}
						fullWidth={true}
						variant='outlined'
					>
						{scheduleSlots.map((option) => (
							<MenuItem key={option._id} value={option.time}>
								{option.time}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item xs={6}>
					<TextField
						id='outlined-select-currency-native'
						select
						label='Ends At'
						value={slotEnd}
						onChange={(e) => setslotEnd(e.target.value)}
						fullWidth={true}
						variant='outlined'
					>
						{scheduleSlots.map((option) => (
							<MenuItem key={option._id} value={option.time}>
								{option.time}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant='contained'
						color='primary'
						fullWidth={true}
						onClick={() => handleClickSlot()}
					>
						Select
					</Button>
				</Grid>
				<Grid item xs>
					{availability &&
						availability.map((sl, i) => (
							<Chip
								icon={<AccessTime />}
								className={classes.chips}
								key={i}
								color='primary'
								label={sl}
								onDelete={() => handleSlotDelete(i)}
							/>
						))}
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Working Slots
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<TextField
						id='outlined-select-currency-native'
						select
						label='Select Available Days'
						value={selectedDay}
						onChange={(e) => setselectedDay(e.target.value)}
						fullWidth={true}
						variant='outlined'
					>
						{availableDays.map((option) => (
							<MenuItem key={option._id} value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<Button
						fullWidth={true}
						variant='contained'
						color='primary'
						onClick={() => handleClickWorkingDaySlots()}
					>
						Select
					</Button>
				</Grid>
				<Grid item xs>
					{instituteOpenOn &&
						instituteOpenOn.map((wsl, i) => (
							<Chip
								icon={<AccessTime />}
								className={classes.chips}
								key={i}
								color='primary'
								label={wsl}
								onDelete={() => handleWorkingSlotDelete(i)}
							/>
						))}
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant='h6'
						className={classes.providerProfileSubHeading}
					>
						Uploads
					</Typography>
					<Divider className={classes.providerProfileDivider} />
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader
							className={classes.uploadMediaHeader}
							// avatar={
							// 	<Avatar aria-label='recipe' className={classes.avatar}>
							// 		R
							// 	</Avatar>
							// }
							action={
								<IconButton
									aria-label='settings'
									onClick={() => setfirmProofImg('')}
								>
									<Cancel />
								</IconButton>
							}
							// title='Shrimp and Chorizo Paella'
							// subheader='September 14, 2016'
						/>
						<CardMedia
							className={classes.uploadMedia}
							component='img'
							image={firmProofImg}
							title='Firm Proof'
						/>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader
							className={classes.uploadMediaHeader}
							// avatar={
							// 	<Avatar aria-label='recipe' className={classes.avatar}>
							// 		R
							// 	</Avatar>
							// }
							action={
								<IconButton
									aria-label='settings'
									onClick={() => setheadProofImg('')}
								>
									<Cancel />
								</IconButton>
							}
							// title='Shrimp and Chorizo Paella'
							// subheader='September 14, 2016'
						/>
						<CardMedia
							className={classes.uploadMedia}
							component='img'
							image={headProofImg}
							title='Id Proof'
						/>
					</Card>
				</Grid>

				<Grid item xs={6}>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-firm-idproof'
						multiple
						type='file'
						onChange={(event) => uploadFirmProof(event)}
					/>
					<label htmlFor='contained-button-firm-idproof' className='w-100'>
						<Button
							fullWidth={true}
							variant='contained'
							color='primary'
							component='span'
							className={classes.button}
							startIcon={<CloudUpload />}
						>
							Firm Resgistration Id
						</Button>
					</label>
				</Grid>
				<Grid item xs={6}>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-head-idproof'
						multiple
						type='file'
						onChange={(event) => uploadIdProof(event)}
					/>
					<label htmlFor='contained-button-head-idproof' className='w-100'>
						<Button
							fullWidth={true}
							variant='contained'
							color='primary'
							component='span'
							startIcon={<CloudUpload />}
						>
							Id Proof of Head
						</Button>
					</label>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant='contained'
						size='large'
						color='primary'
						fullWidth={true}
						className='mb-5 mt-3'
						onClick={() => handleSave('Institute')}
					>
						Update Details
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
