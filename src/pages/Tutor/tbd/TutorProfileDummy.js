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
	MenuItem,
	FormControlLabel,
	Switch,
	Paper,
	Checkbox,
	Chip,
	Divider,
	Backdrop,
	Container,
	Card,
	CardMedia,
	CardHeader,
} from '@material-ui/core';
import {
	AccessTime,
	Call,
	Cancel,
	CloudUpload,
	Mail,
} from '@material-ui/icons';
// Styles
import useStyles from './styles';

import { scheduleSlots } from '../../utils/data/tutor';
import { getAvatar, uploadDocuments } from '../../actions/commonActions';
import {
	getOptionsForProviderProfile,
	getTutorById,
	updateTutorProfile,
} from '../../actions/tutorActions';
import YearPicker from '../../components/Provider/YearPicker';
import { useHistory } from 'react-router-dom';

export default function TutorProfileDummy({ providerType }, props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	// Redux States
	const { providerProfileOptions, loading, tutOnboardingCompleted } =
		useSelector((state) => state.tutorsData);
	const { profileImage, idProof, workProof, degreeProof } = useSelector(
		(state) => state.commonData
	);
	const { user } = useSelector((state) => state.usersData);

	//   SETTING INITIAL FIELDS IF IS AVAILABLE
	useEffect(() => {
		if (user && user.providerProfile) {
			setInitialFields(user.providerProfile);
		}
	}, [user]);

	// Options Info
	useEffect(() => {
		dispatch(getOptionsForProviderProfile());
	}, [providerType]);

	useEffect(() => {
		if (tutOnboardingCompleted) {
			history.push('/tutor');
		}
	}, [tutOnboardingCompleted]);
	// useEffect(() => {
	// 	if (user && user.providerProfile) {
	// 		if (!profileImage) {
	// 			setprofileImg(user && user.user.profileImage);
	// 		} else {
	// 			setprofileImg(profileImage);
	// 		}
	// 		if (!idProof) {
	// 			settutorIdentityProof(user.providerProfile.identityProof);
	// 		} else {
	// 			settutorIdentityProof(idProof[0]);
	// 		}
	// 		if (!workProof) {
	// 			settutorWorkIdentity(user.providerProfile.workIdentity);
	// 		} else {
	// 			settutorWorkIdentity(workProof[0]);
	// 		}
	// 		if (degreeProof.length > 0) {
	// 			settutorDegreeProofs(degreeProof);
	// 		} else {
	// 			settutorDegreeProofs(user.providerProfile.degreeProofs);
	// 		}
	// 	}
	// }, [profileImage, idProof, workProof, degreeProof]);

	// Local States
	const [profileImg, setprofileImg] = useState('');
	const [tutorIdentityProof, settutorIdentityProof] = useState('');
	const [tutorWorkIdentity, settutorWorkIdentity] = useState('');
	const [tutorDegreeProofs, settutorDegreeProofs] = useState([]);
	const [salutation, setsalutation] = useState('');
	const [name, setname] = useState('');
	const [gender, setgender] = useState('');
	const [address, setaddress] = useState('');
	const [locality, setlocality] = useState('');
	const [city, setcity] = useState('');
	const [state, setstate] = useState('');
	const [country, setcountry] = useState('');
	const [incognito, setincognito] = useState(false);
	const [isIndividualTutor, setisIndividualTutor] = useState(false);
	const [hasTuitionCenter, sethasTuitionCenter] = useState(false);

	const [hasUg, sethasUg] = useState(false);
	const [ugInstituteName, setugInstituteName] = useState('');
	const [ugDegreeName, setugDegreeName] = useState('');
	const [ugBranchName, setugBranchName] = useState('');
	const [ugCompletionYear, setugCompletionYear] = useState('');

	const [hasPg, sethasPg] = useState(false);
	const [pgInstituteName, setpgInstituteName] = useState('');
	const [pgDegreeName, setpgDegreeName] = useState('');
	const [pgBranchName, setpgBranchName] = useState('');
	const [pgSpecializationName, setpgSpecializationName] = useState('');
	const [pgCompletionYear, setpgCompletionYear] = useState('');

	const [hasSplDeg, sethasSplDeg] = useState(false);
	const [splDegInstituteName, setsplDegInstituteName] = useState('');
	const [splDegDegreeName, setsplDegDegreeName] = useState('');
	const [splDegBranchName, setsplDegBranchName] = useState('');
	const [spSpecializationName, setspSpecializationName] = useState('');
	const [splDegCompletionYear, setsplDegCompletionYear] = useState('');

	const [currentWork, setcurrentWork] = useState('');
	const [currentDeisgnation, setcurrentDeisgnation] = useState('');
	const [totalWorkExperienceInYears, settotalWorkExperienceInYears] =
		useState('');
	const [oneToOne, setoneToOne] = useState(false);
	const [oneToMany, setoneToMany] = useState(false);
	const [offersOnline, setoffersOnline] = useState(false);
	const [offersOffline, setoffersOffline] = useState(false);
	const [teachingPrefer, setteachingPrefer] = useState('');
	const [shortTerm, setshortTerm] = useState(false);
	const [avgRatePerHr, setavgRatePerHr] = useState('');
	const [monthly, setmonthly] = useState(false);
	const [avgRatePerMonth, setavgRatePerMonth] = useState('');
	const [availability, setavailability] = useState([]);
	const [slotAt, setslotAt] = useState('');
	const [slotEnd, setslotEnd] = useState('');

	const setInitialFields = (data) => {
		let ctcAddress = JSON.parse(data.communicationAddress);
		setaddress(ctcAddress.Address);
		setlocality(ctcAddress.Locality);
		setcity(ctcAddress.City);
		setstate(ctcAddress.State);
		setcountry(ctcAddress.Country);

		setincognito(data.incognito);
		setisIndividualTutor(data.isIndividualTutor);
		sethasTuitionCenter(data.hasTuitionCenter);

		sethasUg(data.ug.hasDegree);
		setugInstituteName(data.ug.instituteName);
		setugDegreeName(data.ug.name);
		setugBranchName(data.ug.branch);
		setugCompletionYear(data.ug.yearOfCompletion);

		sethasPg(data.pg.hasDegree);
		setpgInstituteName(data.pg.instituteName);
		setpgDegreeName(data.pg.name);
		setpgBranchName(data.pg.branch);
		// setpgSpecializationName(data.pg.)
		setpgCompletionYear(data.pg.yearOfCompletion);

		sethasSplDeg(data.special_degrees.hasDegree);
		setsplDegInstituteName(data.special_degrees.instituteName);
		setsplDegDegreeName(data.special_degrees.name);
		setsplDegBranchName(data.special_degrees.branch);
		// setspSpecializationName(data.special_degrees.s)
		setsplDegCompletionYear(data.special_degrees.yearOfCompletion);

		setcurrentWork(data.currentWork);
		setcurrentDeisgnation(data.currentDeisgnation);
		settotalWorkExperienceInYears(data.totalWorkExperienceInYears);

		setoneToOne(data.oneToOne);
		setoneToMany(data.oneToMany);
		setoffersOnline(data.offersOnline);
		setoffersOffline(data.offersOffline);
		setteachingPrefer(data.teachingPreferences);
		setshortTerm(data.shortTerm);
		setavgRatePerHr(data.avgRatePerHr);
		setmonthly(data.monthly);
		setavgRatePerMonth(data.avgRatePerMonth);
		setavailability(data.availability);

		// if (!profileImage) {
		// 	setprofileImg(user && user.user.profileImage);
		// } else {
		// 	setprofileImg(profileImage);
		// }
		// if (!idProof) {
		// 	settutorIdentityProof(data.identityProof);
		// } else {
		// 	settutorIdentityProof(idProof[0]);
		// }
		// if (!workProof) {
		// 	settutorWorkIdentity(data.workIdentity);
		// } else {
		// 	settutorWorkIdentity(workProof[0]);
		// }
		// if (degreeProof.length > 0) {
		// 	settutorDegreeProofs(degreeProof);
		// } else {
		// 	settutorDegreeProofs(data.degreeProofs);
		// }
		setprofileImg(data.profileImage);
		settutorIdentityProof(data.identityProof);
		settutorWorkIdentity(data.workIdentity);
		settutorDegreeProofs(data.degreeProofs);
	};

	// //console.log(tutorIdentityProof);
	// //console.log(tutorWorkIdentity);
	const handleClickSlot = () => {
		if (!slotAt || !slotEnd) {
			toast.error('Select the Slots');
		} else {
			let slotData = [...availability, `${slotAt} - ${slotEnd}`];
			setavailability(slotData);
		}
		resetSlots();
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
	const resetSlots = () => {
		setslotAt('');
		setslotEnd('');
	};
	const uploadAvatar = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		dispatch(getAvatar(formData));
	};
	const uploadIdProof = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorIdProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadWorkProof = (event) => {
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorWorkProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadDegreeProof = (event) => {
		const uploadedFiles = event.target.files;
		var data = new FormData();
		for (let i = 0; i < uploadedFiles.length; i++) {
			data.append(`file[${i}]`, uploadedFiles[i]);
		}
		dispatch(uploadDocuments(data));
	};

	const handleSave = (type) => {
		let formData = {
			profileImage: profileImg,
			providerType: 'tutor',
			// salutation: salutation,
			// name: name,
			// gender: gender,
			communicationAddress: JSON.stringify({
				Address: address,
				Locality: locality,
				City: city,
				State: state,
				Country: country,
			}),
			incognito: incognito,
			isIndividualTutor: isIndividualTutor,
			hasTuitionCenter: hasTuitionCenter,
			ug: {
				hasDegree: hasUg,
				instituteName: ugInstituteName,
				name: ugDegreeName,
				branch: ugBranchName,
				yearOfCompletion: Number(ugCompletionYear),
			},
			pg: {
				hasDegree: hasPg,
				instituteName: pgInstituteName,
				name: pgDegreeName,
				branch: pgBranchName,
				yearOfCompletion: Number(pgCompletionYear),
			},
			special_degrees: {
				hasDegree: hasSplDeg,
				instituteName: splDegInstituteName,
				name: splDegDegreeName,
				branch: splDegBranchName,
				yearOfCompletion: Number(splDegCompletionYear),
			},
			currentWork: currentWork,
			currentDeisgnation: currentDeisgnation,
			totalWorkExperienceInYears: totalWorkExperienceInYears,
			oneToOne: oneToOne,
			oneToMany: oneToMany,
			offersOnline: offersOnline,
			offersOffline: offersOffline,
			teachingPreferences: teachingPrefer,
			shortTerm: shortTerm,
			avgRatePerHr: avgRatePerHr,
			monthly: monthly,
			avgRatePerMonth: avgRatePerMonth,
			availability: availability,
			identityProof: tutorIdentityProof,
			workIdentity: tutorWorkIdentity,
			degreeProofs: tutorDegreeProofs,
		};

		if (!profileImg) {
			toast.error("Profile image can't be empty");
		} else if (!address || !locality || !city || !state || !country) {
			toast.error('Please fill the contact adrress');
		} else if (!hasUg) {
			toast.error("Graduation degree can't be empty");
		} else if (
			!tutorIdentityProof ||
			!tutorWorkIdentity ||
			!tutorDegreeProofs
		) {
			toast.error('Please upload your proofs');
		} else {
			//console.log(formData);
			dispatch(updateTutorProfile(type, formData));
		}
	};

	//console.log(tutorIdentityProof);
	//console.log(tutorWorkIdentity);
	//console.log(tutorDegreeProofs);

	return (
		<Container maxWidth='sm' fixed>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Card className={classes.tutorProfile}>
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
						<Avatar alt='user' src={profileImg} className={classes.avatarImg} />
					</IconButton>
				</label>
				<Typography variant='body1' align='center'>
					Click to Update Picture
				</Typography>
				<div className={classes.tutorProfileInfo}>
					<Typography variant='h3' className={classes.tutorProfileTitle}>
						{user && user.user.name}
					</Typography>

					<Typography variant='subtitle1'>
						<Mail /> {user && user.user.email}
					</Typography>
					<Typography variant='subtitle1'>
						<Call /> {user && user.user.countryCode}
						{user && user.user.phoneNumber}
					</Typography>
				</div>
			</Card>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Location Details
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
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
						className='mt-3'
					/>
				</Grid>
				<Grid item xs={6} md={6}>
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
				<Grid item xs={6} md={6}>
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
				<Grid item xs={6} md={6}>
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
				<Grid item xs={6} md={6}>
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
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Aditional Details
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Switch
								checked={incognito}
								onChange={(e) => setincognito(e.target.checked)}
								name='checkedB'
								color='primary'
							/>
						}
						label='Display Profile Photo To Users'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Switch
								checked={isIndividualTutor}
								onChange={(e) => setisIndividualTutor(e.target.checked)}
								name='checkedB'
								color='primary'
							/>
						}
						label='I am an Individual Tutor'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Switch
								checked={hasTuitionCenter}
								onChange={(e) => sethasTuitionCenter(e.target.checked)}
								name='checkedB'
								color='primary'
							/>
						}
						label='I have a Tution Point'
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Educational Details
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={hasUg}
								onChange={(e) => sethasUg(e.target.checked)}
							/>
						}
						label='I have a graduation degree'
					/>
				</Grid>
				{hasUg && (
					<Paper elevation={3}>
						<Grid container spacing={2} className='p-3'>
							<Grid item xs={12}>
								<TextField
									select
									fullWidth={true}
									label='Graduation'
									variant='outlined'
									value={ugDegreeName}
									onChange={(e) => setugDegreeName(e.target.value)}
								>
									{providerProfileOptions &&
										providerProfileOptions.levels &&
										providerProfileOptions.levels.map((levl) => {
											if (levl.levelName === 'ug') {
												return levl.options.map((item, i) => (
													<MenuItem key={i} value={item}>
														{item}
													</MenuItem>
												));
											}
										})}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name='instituteName'
									value={ugInstituteName}
									onChange={(e) => setugInstituteName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Institute Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={ugBranchName}
									onChange={(e) => setugBranchName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Branch'
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<YearPicker
									selectedDate={ugCompletionYear}
									setselectedDate={setugCompletionYear}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={hasPg}
								onChange={(e) => sethasPg(e.target.checked)}
							/>
						}
						label='I have a post graduation degree'
					/>
				</Grid>
				{hasPg && (
					<Paper elevation={3}>
						<Grid container spacing={2} className='p-3'>
							<Grid item xs={12}>
								<TextField
									select
									fullWidth={true}
									label='Post Graduation'
									variant='outlined'
									value={pgDegreeName}
									onChange={(e) => setpgDegreeName(e.target.value)}
								>
									{providerProfileOptions &&
										providerProfileOptions.levels &&
										providerProfileOptions.levels.map((levl) => {
											if (levl.levelName === 'pg') {
												return levl.options.map((item, i) => (
													<MenuItem key={i} value={item}>
														{item}
													</MenuItem>
												));
											}
										})}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={pgInstituteName}
									onChange={(e) => setpgInstituteName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Institute Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={pgBranchName}
									onChange={(e) => setpgBranchName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Branch'
									autoFocus
									helperText="Don't have give NA"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={pgSpecializationName}
									onChange={(e) => setpgSpecializationName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Specialisation'
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<YearPicker
									selectedDate={pgCompletionYear}
									setselectedDate={setpgCompletionYear}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={hasSplDeg}
								onChange={(e) => sethasSplDeg(e.target.checked)}
							/>
						}
						label='I have a special degree'
					/>
				</Grid>
				{hasSplDeg && (
					<Paper elevation={3} className='p-3'>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									select
									fullWidth={true}
									label='Special Degree'
									variant='outlined'
									value={splDegDegreeName}
									onChange={(e) => setsplDegDegreeName(e.target.value)}
								>
									{providerProfileOptions &&
										providerProfileOptions.levels &&
										providerProfileOptions.levels.map((levl) => {
											if (levl.levelName === 'special_degrees') {
												return levl.options.map((item, i) => (
													<MenuItem key={i} value={item}>
														{item}
													</MenuItem>
												));
											}
										})}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={splDegInstituteName}
									onChange={(e) => setsplDegInstituteName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Institute Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={splDegBranchName}
									onChange={(e) => setsplDegBranchName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Branch'
									autoFocus
									helperText="Don't have give NA"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={spSpecializationName}
									onChange={(e) => setspSpecializationName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Specialisation'
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<YearPicker
									selectedDate={splDegCompletionYear}
									setselectedDate={setsplDegCompletionYear}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Work Experience (Optional)
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={currentWork}
						onChange={(e) => setcurrentWork(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						fullWidth={true}
						label='Current Organisation'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={currentDeisgnation}
						onChange={(e) => setcurrentDeisgnation(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						fullWidth={true}
						label='Designation / Role'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={totalWorkExperienceInYears}
						onChange={(e) => settotalWorkExperienceInYears(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						fullWidth={true}
						label='Experience in Years'
						autoFocus
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Teaching Preferences
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={oneToOne}
								onChange={(e) => setoneToOne(e.target.checked)}
							/>
						}
						label='One-on-One Offline Tution'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={oneToMany}
								onChange={(e) => setoneToMany(e.target.checked)}
							/>
						}
						label='Group Tution'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={offersOnline}
								onChange={(e) => setoffersOnline(e.target.checked)}
							/>
						}
						label='Online'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={offersOffline}
								onChange={(e) => setoffersOffline(e.target.checked)}
							/>
						}
						label='Offline'
					/>
				</Grid>
				{offersOffline && (
					<>
						<Grid item xs={12}>
							<TextField
								select
								fullWidth={true}
								label="I'm Comfortable With"
								variant='outlined'
								value={teachingPrefer}
								onChange={(e) => setteachingPrefer(e.target.value)}
							>
								{providerProfileOptions &&
									providerProfileOptions.teachingPreferences &&
									providerProfileOptions.teachingPreferences.map(
										(option, i) => (
											<MenuItem key={i} value={option.value}>
												{option.display}
											</MenuItem>
										)
									)}
							</TextField>
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={shortTerm}
								onChange={(e) => setshortTerm(e.target.checked)}
							/>
						}
						label='Short Term Tution'
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={avgRatePerHr}
						onChange={(e) => setavgRatePerHr(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						fullWidth={true}
						label='Estimate Amount / Hour'
						autoFocus
						helperText='Estimate Amount / Hour'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='primary'
								checked={monthly}
								onChange={(e) => setmonthly(e.target.checked)}
							/>
						}
						label='Montly Tution'
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={avgRatePerMonth}
						onChange={(e) => setavgRatePerMonth(e.target.value)}
						id='outlined-basic'
						variant='outlined'
						fullWidth={true}
						label='Estimate Amount / Month'
						autoFocus
						helperText='Estimate Amount / Month'
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Available Slots
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
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
						fullWidth={true}
						variant='contained'
						color='primary'
						onClick={() => handleClickSlot()}
					>
						Select
					</Button>
				</Grid>
				<Grid item xs={12}>
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
					<Typography variant='h6' className={classes.tutorProfileSubHeading}>
						Uploads
					</Typography>
					<Divider className={classes.tutorProfileDivider} />
				</Grid>

				<Grid item xs={6}>
					<Card>
						<CardHeader
							className={classes.uploadMediaHeader}
							action={
								<IconButton
									aria-label='settings'
									onClick={() => settutorIdentityProof('')}
								>
									<Cancel />
								</IconButton>
							}
						/>
						<CardMedia
							className={classes.uploadMedia}
							component='img'
							image={tutorIdentityProof}
							title='Id Proof'
						/>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardHeader
							className={classes.uploadMediaHeader}
							action={
								<IconButton
									aria-label='settings'
									onClick={() => settutorWorkIdentity('')}
								>
									<Cancel />
								</IconButton>
							}
						/>
						<CardMedia
							className={classes.uploadMedia}
							component='img'
							image={tutorWorkIdentity}
							title='Work Proof'
						/>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-file1'
						multiple
						type='file'
						onChange={(event) => uploadIdProof(event)}
					/>
					<label htmlFor='contained-button-file1'>
						<Button
							variant='contained'
							color='primary'
							component='span'
							className={classes.button}
							startIcon={<CloudUpload />}
						>
							Id Proof
						</Button>
					</label>
				</Grid>
				<Grid item xs={4}>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-file2'
						multiple
						type='file'
						onChange={(event) => uploadWorkProof(event)}
					/>
					<label htmlFor='contained-button-file2'>
						<Button
							variant='contained'
							color='primary'
							component='span'
							startIcon={<CloudUpload />}
						>
							Work Proof
						</Button>
					</label>
				</Grid>
				<Grid item xs={4}>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-file3'
						multiple
						type='file'
						onChange={(event) => uploadDegreeProof(event)}
					/>
					<label htmlFor='contained-button-file3'>
						<Button
							variant='contained'
							color='primary'
							component='span'
							startIcon={<CloudUpload />}
						>
							Degree Proof
						</Button>
					</label>
				</Grid>
				<Grid item xs={12}>
					<Button
						onClick={() => handleSave('Tutor')}
						size='large'
						variant='contained'
						color='primary'
						fullWidth={true}
						className='mb-5'
					>
						Update Details
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

/* <div className={classes.selectYear}>
		<YearPicker onChange={() => handleChange()} />
	</div> */
/* <Typography varaint='body1'>Select Year</Typography>
  		<DatePicker
  			selected={ugCompletionYear}
  			onChange={(date) => setugCompletionYear(date)}
  			showYearPicker
  			dateFormat='yyyy'
  		/> */
/* {providerProfileOptions && (
				<>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography className={classes.heading}>
								I have a graduation degree
							</Typography>
						</AccordionSummary>
						<AccordionDetails></AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography className={classes.heading}>
								I have a post graduation degree
							</Typography>
						</AccordionSummary>
						<AccordionDetails></AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography className={classes.heading}>
								I have a special degree
							</Typography>
						</AccordionSummary>
						<AccordionDetails></AccordionDetails>
					</Accordion>
				</>
			)} */
