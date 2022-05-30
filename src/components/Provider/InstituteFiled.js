import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	TextField,
	IconButton,
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
	FormControl,
	FormGroup,
} from '@material-ui/core';
import { AccessTime, Cancel, CloudUpload, Map } from '@material-ui/icons';
import {
	availableDays,
	firmRegistration,
	scheduleSlots,
} from '../../utils/data/tutor';

import { getAvatar, uploadDocuments } from '../../actions/commonActions';
import {
	getInstituteConfig,
	getOptionsForProviderProfile,
	updateTutorProfile,
} from '../../actions/tutorActions';
import { getSegments } from '../../actions/subjectActions';
import UpdateMapLocation from '../Map';

import useStyles from './styles';

export default function InstituteFiled({ providerType, updating }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	// Redux States
	const { user, providerProfile } = useSelector((state) => state.usersData);

	const { segments } = useSelector((state) => state.subjectsData);
	const {
		providerProfileOptions,
		instituteConfig,
		loading,
		InstOnboardingCompleted,
	} = useSelector((state) => state.tutorsData);
	// Uploaded Proofs Redux State
	const { backdrop, firmProof, headProof, recogProof, profileImage } = useSelector(
		(state) => state.commonData
	);

	// Options Info
	useEffect(() => {
		debugger
		dispatch(getOptionsForProviderProfile());
		dispatch(getInstituteConfig());
	}, [providerType]);

	useEffect(() => {
		dispatch(getSegments());
	}, []);

	// Local States
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
	const [selectedDay, setselectedDay] = useState([]);
	const [availability, setavailability] = useState([]);
	const [slotAt, setslotAt] = useState('');
	const [slotEnd, setslotEnd] = useState('');
	const [backdropImg, setbackdropImg] = useState('');
	const [logoImg, setlogoImg] = useState('');
	const [idproofImg, setidproofImg] = useState('');
	const [recognitionproofImg, setrecognitionproofImg] = useState('');
	const [firmProofImg, setfirmProofImg] = useState('');
	const [requestedLevelIds, setrequestedLevelIds] = useState([]);
	const [preRequestedLevelIds, setpreRequestedLevelIds] = useState([]);

	const [openMap, setopenMap] = useState(false);
	const [preferenceCoaching, setpreferenceCoaching] = useState(false);
	const [preferenceLive, setpreferenceLive] = useState(false);
	useEffect(() => {
		debugger
		if (profileImage && profileImage.length) {
			setlogoImg(profileImage);
		}
		if (backdrop && backdrop.length) {
			setbackdropImg(backdrop[0]);
		}
		if (firmProof && firmProof.length) {
			setfirmProofImg(firmProof[0]);
		}
		if (headProof && headProof.length) {
			setidproofImg(headProof[0]);
		}
		if (recogProof && recogProof.length) {
			setrecognitionproofImg(recogProof[0]);
		}
	}, [profileImage, backdrop, firmProof, headProof, recogProof]);

	//   SETTING INITIAL FIELDS IF IS AVAILABLE
	useEffect(() => {
		if (providerProfile) {
			setInitialFields(providerProfile);
		}
	}, [providerProfile]);

	const setInitialFields = (data) => {
		debugger
		setbackdropImg(data.instituteBackdrop);
		setlogoImg(data.instituteLogo);
		setinstituteRegister(data.instituteRegistrationType);
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
		// setselectedDay(data)
		// setinstituteTeachingPrefer(data.instituteTeachingPreferences);
		setinstituteOpenOn(data.instituteOpenOn);
		setavailability(data.availability);
		setpreRequestedLevelIds(data.requestedLevels);
		setidproofImg(data.identityProof);
		setrecognitionproofImg(data.recognitionProofImg)
		setfirmProofImg(data.workIdentity);

		// setpreference
		if (data.instituteTeachingPreferences) {
			let teachingPrefernce;
			if (data.instituteTeachingPreferences === 56) {
				setpreferenceCoaching(true);
				setpreferenceLive(true);
			} else if (data.instituteTeachingPreferences === 5) {
				setpreferenceCoaching(true);
			} else {
				setpreferenceLive(true);
			}
		}
	};

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
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		dispatch(getAvatar(formData));
	};
	const uploadBackDrop = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteBackdrop';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadFirmProof = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteFirmProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadIdProof = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'InstituteHeadIdProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadrecognitionsProof = (event) => {
		debugger
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'RecognitionsProof';
		dispatch(uploadDocuments(type, formData));
	};
	const handleMapLocation = () => {
		setopenMap(true);
	};

	const handleToggle = (value) => () => {
		const currentIndex = preRequestedLevelIds.indexOf(value);
		const newpreRequestedLevelIds = [...preRequestedLevelIds];
		if (currentIndex === -1) {
			newpreRequestedLevelIds.push(value);
		} else {
			newpreRequestedLevelIds.splice(currentIndex, 1);
		}
		setrequestedLevelIds(newpreRequestedLevelIds);
		setpreRequestedLevelIds(newpreRequestedLevelIds);
	};

	// Routing setUp after success api data
	const homeRoute = (route) => {
		history.push(route);
	};

	const handleSave = (type) => {
		debugger
		let preRequetestedIds = preRequestedLevelIds.map((value) => {
			if (updating) {
				return value;
			} else {
				return value._id;
			}
		});
		let teachingPrefernce;
		if (preferenceCoaching && preferenceLive) {
			teachingPrefernce = 56;
		} else if (preferenceCoaching) {
			teachingPrefernce = 5;
		} else if (preferenceLive) {
			teachingPrefernce = 6;
		}
		//console.log('teachingPrefernce', teachingPrefernce);
		let formData = {
			providerType: 'institute',
			instituteLogo: profileImage,
			instituteBackdrop: backdropImg,
			instituteName: instituteName,
			instituteHeadName: instituteHeadName,
			communicationAddress: JSON.stringify({
				Address: address,
				Locality: locality,
				City: city,
				State: state,
				Country: country,
			}),
			instituteContactNumber: instituteContactNumber,
			instituteEmail: instituteEmail,
			instituteWebsite: instituteWebsite,
			instituteRegistrationType: instituteRegister,
			instituteTeachingPreferences: teachingPrefernce,
			requestedLevels: preRequetestedIds,
			availability: availability,
			instituteOpenOn: instituteOpenOn,
			identityProof: idproofImg,
			recognitionProofImg: recognitionproofImg,
			workIdentity: firmProofImg,
		};

		if (!backdropImg) {
			toast.error("Backdrop image can't be empty");
		} else if (!logoImg) {
			toast.error("Logo image can't be empty");
		} else if (!instituteName) {
			toast.error('Please fill the Institute Name');
		} else if (!instituteHeadName) {
			toast.error('Please Institute Head Name');
		} else if (!instituteContactNumber) {
			toast.error('Conatct Number is missing!');
		} else if (!instituteEmail) {
			toast.error('Email is required!');
		} else if (!address || !locality || !city || !state || !country) {
			toast.error('Please fill the contact adrress');
		} else if (!idproofImg || !firmProofImg) {
			toast.error('Please upload your proofs');
		} else {
			dispatch(updateTutorProfile(type, formData, homeRoute));
		}
	};

	const handleCheckboxChange = (e) => {
		let x = e.target.value
		if (e.target.checked == true) {
			selectedDay.push(e.target.value)
		}
		if (e.target.checked == false) {
			let index = selectedDay.indexOf(x);
			selectedDay.splice(index, 1);
		}
	}
	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<UpdateMapLocation open={openMap} handleClose={() => setopenMap(false)} />
			<>
				<Typography variant='h2' className={classes.subGreeting}>
					{updating ? '' : 'Create Institute Account'}
				</Typography>
				<div className={`staff pb-0 ${classes.tutor}`}>
					<div
						className={classes.tutorBackdrop}
						style={{
							backgroundImage: `url(${backdropImg})`,
						}}
					></div>
					<div
						className={`img ${classes.tutorImg}`}
						style={{
							backgroundImage: `url(${logoImg})`,
						}}
					></div>
				</div>
				<div className={classes.instinput}>
					<input
						accept='image/*'
						className={classes.input}
						id='icon-button-file1'
						type='file'
						onChange={(event) => uploadBackDrop(event)}
					/>
					<label htmlFor='icon-button-file1'>
						<Typography variant='body1' style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: "5px 10px 5px 10px", borderRadius: 5 }}>
							Click to Upload Backdrop Image
						</Typography>
					</label>
					<input
						accept='image/*'
						className={classes.input}
						id='icon-button-file2'
						type='file'
						onChange={(event) => uploadLogo(event)}
					/>
					<label htmlFor='icon-button-file2'>
						<Typography variant='body1' style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: "5px 45px 5px 45px", borderRadius: 5 }}>
							Click to Upload Logo
						</Typography>
					</label>
				</div>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextField
							value={instituteName}
							onChange={(e) => setinstituteName(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							margin='normal'
							required
							fullWidth={true}
							label='Institue Name'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={instituteHeadName}
							onChange={(e) => setinstituteHeadName(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='Name of the Head'

						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={address}
							onChange={(e) => setaddress(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='Contact Address'

						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							value={locality}
							onChange={(e) => setlocality(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='Locality'

						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							value={city}
							onChange={(e) => setcity(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='City'

						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							value={state}
							onChange={(e) => setstate(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='State'

						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							value={country}
							onChange={(e) => setcountry(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='Country'

						/>
					</Grid>
					{updating && (
						<Grid item xs={12}>
							<Button
								size='small'
								variant='contained'
								color='primary'
								fullWidth={true}
								startIcon={<Map />}
								onClick={handleMapLocation}
							>
								Update Map Loaction
							</Button>
						</Grid>
					)}
					<Grid item xs={12}>
						<TextField
							value={instituteContactNumber}
							onChange={(e) => setinstituteContactNumber(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							required
							margin='normal'
							fullWidth={true}
							label='Coaching Center Telephone'

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
							margin='normal'
							fullWidth={true}
							label='Coaching Center Email'

						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={instituteWebsite}
							onChange={(e) => setinstituteWebsite(e.target.value)}
							id='outlined-basic'
							variant='outlined'
							margin='normal'
							required
							fullWidth={true}
							label='Coaching Center Website (Optional)'

						/>
					</Grid>
					<Grid item xs={12}>
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
							{instituteConfig &&
								instituteConfig.firmRegistration &&
								instituteConfig.firmRegistration.map((option, i) => (
									<MenuItem key={i} value={option}>
										{option}
									</MenuItem>
								))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.subGreeting}>
							Services Offered
						</Typography>
					</Grid>
					<Grid item xs={12}>
						{segments &&
							segments.length > 0 &&
							segments.filter((item) => item.deliveredByInstitute)
								.map((value) => (
									<List className={classes.ProviderSegmentsListRoot}>
										<ListItem key={value}>
											<ListItemIcon>
												<Checkbox
													edge='end'
													onChange={handleToggle(value._id)}
													checked={preRequestedLevelIds.indexOf(value._id) > -1}
													inputProps={{ 'aria-labelledby': value._id }}
												/>
											</ListItemIcon>
											<ListItemText id={value._id} primary={value.name} />
											{/* <ListItemSecondaryAction>
											<Checkbox
												edge='end'
												onChange={handleToggle(value._id)}
												checked={preRequestedLevelIds.indexOf(value._id) > -1}
												inputProps={{ 'aria-labelledby': value._id }}
											/>
										</ListItemSecondaryAction> */}
										</ListItem>
									</List>
								))}
					</Grid>

					<Grid item xs={12}>
						<Typography variant='body1' className={classes.subHeading}>
							Services can be offered at
						</Typography>
					</Grid>
					{/* <Grid item xs={12}>
					{instituteConfig &&
						instituteConfig.preferences &&
						instituteConfig.preferences.map((value, i) => (
							<List className={classes.ProviderSegmentsListRoot}>
								<ListItem key={value}>
									<ListItemIcon>
										<Checkbox
											edge='end'
											onChange={handleServicesToggle(value)}
											checked={checked.indexOf(value) > -1}
											inputProps={{ 'aria-labelledby': value.value }}
										/>
									</ListItemIcon>
									<ListItemText id={value.value} primary={value.display} />
								</ListItem>
							</List>
						))}
				</Grid> */}
					<Grid item xs={12}>
						<FormControl component='fieldset' className={classes.formControl}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={preferenceCoaching}
											onChange={(e) => setpreferenceCoaching(e.target.checked)}
											name='Coaching Center'
										/>
									}
									// labelPlacement="start"
									label='Coaching Center'
								/>

								<FormControlLabel
									control={
										<Checkbox
											checked={preferenceLive}
											onChange={(e) => setpreferenceLive(e.target.checked)}
											name='Live Online'
										/>
									}
									// labelPlacement="start"
									label='Live Online'
								/>
							</FormGroup>
						</FormControl>
					</Grid>
					{/* <Grid item xs={12}>
					<FormControl component='fieldset' className={classes.formControl}>
						<FormGroup>
							{instituteConfig &&
								instituteConfig.preferences &&
								instituteConfig.preferences.map((option, i) => (
									<FormControlLabel
										control={
											<Checkbox
												// checked={checked}
												// onChange={handleChange}
												name={option.display}
											/>
										}
										// labelPlacement="start"
										label={option.display}
									/>
								))}
						</FormGroup>
					</FormControl>
				</Grid> */}
					{/* <Grid item xs={12}>
					<TextField
						select
						fullWidth={true}
						label='Select Your Preferences'
						variant='outlined'
						value={instituteTeachingPrefer}
						onChange={(e) => setinstituteTeachingPrefer(e.target.value)}
					>
						{instituteConfig &&
							instituteConfig.preferences &&
							instituteConfig.preferences.map((option, i) => (
								<MenuItem key={i} value={option.value}>
									{option.display}
								</MenuItem>
							))}
					</TextField>
				</Grid> */}
					<Grid item xs={12}>
						<Typography variant='body1' className={classes.subHeading}>
							Available Days
						</Typography>
					</Grid>
					{/* <Grid item xs={12}> */}
					{/* <TextField
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
						</TextField> */}


					<Grid item xs={6}><FormControlLabel control={<Checkbox value="sunday" onChange={handleCheckboxChange} />} label="Sunday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="monday" onChange={handleCheckboxChange} />} label="Monday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="tuesday" onChange={handleCheckboxChange} />} label="Tuesday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="wednesday" onChange={handleCheckboxChange} />} label="Wednesday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="thursday" onChange={handleCheckboxChange} />} label="Thursday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="friday" onChange={handleCheckboxChange} />} label="Friday" /></Grid>
					<Grid item xs={6}><FormControlLabel control={<Checkbox value="saturday" onChange={handleCheckboxChange} />} label="Saturday" /></Grid>

					{/* </Grid> */}
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
						<Typography variant='body1' className={classes.subHeading}>
							Working Slots
						</Typography>
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
						<Typography variant='h6' className={classes.greeting}>
							Uploads
						</Typography>
					</Grid>
					{/* {idproofImg && ( */}
					<Grid item xs={6}>
						<Card>
							{firmProofImg ? (
								<>
									<CardHeader
										className={classes.uploadMediaHeader}
										action={
											<IconButton
												aria-label='settings'
												onClick={() => setfirmProofImg('')}
											>
												<Cancel />
											</IconButton>
										}
									/>
									<CardMedia
										className={classes.uploadMedia}
										component='img'
										image={firmProofImg}
										title='Firm Proof'
									/>
								</>
							) : (
								<Typography variant='h5' className={classes.noMedia}>
									Nothing to preview
								</Typography>
							)}
						</Card>
					</Grid>
					{/* )} */}
					{/* {headProof && ( */}
					<Grid item xs={6}>
						<Card>
							{idproofImg ? (
								<>
									<CardHeader
										className={classes.uploadMediaHeader}
										action={
											<IconButton
												aria-label='settings'
												onClick={() => setidproofImg('')}
											>
												<Cancel />
											</IconButton>
										}
									/>
									<CardMedia
										className={classes.uploadMedia}
										component='img'
										image={idproofImg}
										title='Id Proof'
									/>
								</>
							) : (
								<Typography variant='h5' className={classes.noMedia}>
									Nothing to preview
								</Typography>
							)}
						</Card>
					</Grid>
					{/* )} */}
					<Grid item xs={6}>
						<input
							accept='image/*'
							className={classes.input}
							id='contained-button-firm-file'
							multiple
							type='file'
							onChange={(event) => uploadFirmProof(event)}
						/>
						<label htmlFor='contained-button-firm-file' className='w-100'>
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
							id='contained-button-head-file'
							multiple
							type='file'
							onChange={(event) => uploadIdProof(event)}
						/>
						<label htmlFor='contained-button-head-file' className='w-100'>
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
						<Grid item xs={6}>
							<Card>
								{recognitionproofImg ? (
									<>
										<CardHeader
											className={classes.uploadMediaHeader}
											action={
												<IconButton
													aria-label='settings'
													onClick={() => setrecognitionproofImg('')}
												>
													<Cancel />
												</IconButton>
											}
										/>
										<CardMedia
											className={classes.uploadMedia}
											component='img'
											image={recognitionproofImg}
											title='Proof Of Recognition'
										/>
									</>
								) : (
									<Typography variant='h5' className={classes.noMedia}>
										Nothing to preview
									</Typography>
								)}
							</Card>
						</Grid>
						<Grid item xs={6}>
							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-head-file-recognitions'
								multiple
								type='file'
								onChange={(event) => uploadrecognitionsProof(event)}
							/>
							<label htmlFor='contained-button-head-file-recognitions' className='w-100'>
								<Button
									fullWidth={true}
									variant='contained'
									color='primary'
									component='span'
									startIcon={<CloudUpload />}
								>
									Proof Of Recognition
								</Button>
							</label>
						</Grid>
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
							{updating ? 'Update Profile' : 'Create your account'}
						</Button>
					</Grid>
				</Grid>
			</>
		</>
	);
}
