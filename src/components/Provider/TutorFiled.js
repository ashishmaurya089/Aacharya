import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	Checkbox,
	Chip,
	Divider,
	Backdrop,
	Card,
	CardHeader,
	CardMedia,
} from '@material-ui/core';
import { AccessTime, Cancel, CloudUpload, Map } from '@material-ui/icons';
import { salutationData, scheduleSlots } from '../../utils/data/tutor';
import {
	getAvatar,
	uploadDocuments,
	uploadProofs,
} from '../../actions/commonActions';
import {
	getOptionsForProviderProfile,
	updateTutorProfile,
} from '../../actions/tutorActions';
import YearPicker from './YearPicker';
import UpdateMapLocation from '../Map';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
// Styles
import useStyles from './styles';
import { getProfile } from '../../actions/userActions';

export default function TutorFiled({ providerType, updating }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	// Options Info
	useEffect(() => {
		dispatch(getOptionsForProviderProfile());
	}, [providerType]);

	// Redux States
	const { user, providerProfile, learnerProfile } = useSelector(
		(state) => state.usersData
	);
	const { providerProfileOptions, loading, tutOnboardingCompleted } =
		useSelector((state) => state.tutorsData);
	// Proofs Redux State
	const { profileImage, idProof, workProof, degreeProof, awardProof, highestProof } = useSelector(
		(state) => state.commonData
	);

	// Local States
	const [salutation, setsalutation] = useState('');
	const [name, setname] = useState('');
	const [gender, setgender] = useState('');
	const [address, setaddress] = useState('');
	const [locality, setlocality] = useState('');
	const [city, setcity] = useState('');
	const [state, setstate] = useState('');
	const [country, setcountry] = useState('');
	const [incognito, setincognito] = useState(false);
	const [isIndividualTutor, setisIndividualTutor] = useState(true);
	const [hasTuitionCenter, sethasTuitionCenter] = useState(false);

	const [hasUg, sethasUg] = useState(true);
	const [ugInstituteName, setugInstituteName] = useState('');
	const [ugDegreeName, setugDegreeName] = useState('');
	const [ugBranchName, setugBranchName] = useState('');
	const [ugCompletionYear, setugCompletionYear] = useState('');

	const [hasPg, sethasPg] = useState(true);
	const [pgInstituteName, setpgInstituteName] = useState('');
	const [pgDegreeName, setpgDegreeName] = useState('');
	const [pgBranchName, setpgBranchName] = useState('');
	const [pgSpecializationName, setpgSpecializationName] = useState('');
	const [pgCompletionYear, setpgCompletionYear] = useState('');

	const [hasSplDeg, sethasSplDeg] = useState(true);
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

	const [profileImg, setprofileImg] = useState('');
	const [tutorIdProof, settutorIdProof] = useState();
	const [tutorWorkProof, settutorWorkProof] = useState('');
	const [tutorAwardProof, settutorAwardProof] = useState('');
	const [tutorHighestDocuments, setTutorHighestDocuments] = useState('');

	const [openMap, setopenMap] = useState(false);

	useEffect(() => {
		debugger
		if (profileImage && profileImage.length) {
			setprofileImg(profileImage);
		}
		if (idProof && idProof.length) {
			settutorIdProof(idProof[0]);
		}
		if (workProof && workProof.length) {
			settutorWorkProof(workProof[0]);
		}
		if (awardProof && awardProof.length) {
			settutorAwardProof(awardProof[0]);
		}
		if (highestProof && highestProof.length) {
			setTutorHighestDocuments(highestProof[0]);
		}
	}, [profileImage, idProof, workProof, degreeProof, awardProof, highestProof]);

	useEffect(() => {
		if (providerProfile) {
			setInitialFields(providerProfile);
		}
	}, [providerProfile]);

	const setInitialFields = (data) => {
		if (user) {
			setprofileImg(user.profileImage);
		}
		setname(data.name);
		let ctcAddress = JSON.parse(data.communicationAddress);
		setaddress(ctcAddress.Address);
		setlocality(ctcAddress.Locality);
		setcity(ctcAddress.City);
		setstate(ctcAddress.State);
		setcountry(ctcAddress.Country);
		setincognito(data.incognito);
		setisIndividualTutor(data.isIndividualTutor);
		sethasTuitionCenter(data.hasTuitionCenter);

		if (data.ug) {
			sethasUg(data.ug.hasDegree);
			setugInstituteName(data.ug.instituteName);
			setugDegreeName(data.ug.name);
			setugBranchName(data.ug.branch);
			setugCompletionYear(data.ug.yearOfCompletion);
		}
		if (data.pg) {
			debugger
			sethasPg(data.pg.hasDegree);
			setpgInstituteName(data.pg.instituteName);
			setpgDegreeName(data.pg.name);
			setpgBranchName(data.pg.branch);
			setpgSpecializationName(data.pg.specialization)
			setpgCompletionYear(data.pg.yearOfCompletion);
		}
		if (data.special_degrees) {
			sethasSplDeg(data.special_degrees.hasDegree);
			setsplDegInstituteName(data.special_degrees.instituteName);
			setsplDegDegreeName(data.special_degrees.name);
			setsplDegBranchName(data.special_degrees.branch);
			// setspSpecializationName(data.special_degrees.)
			setsplDegCompletionYear(data.special_degrees.yearOfCompletion);
		}

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
		debugger

		settutorAwardProof(data.awardProof)
		settutorIdProof(data.identityProof);
		settutorWorkProof(data.workIdentity);
		setTutorHighestDocuments(data.degreeProofs[data.degreeProofs.length - 1]);
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
		debugger
		//console.log('clicking uploadIdProof');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorIdProof';
		dispatch(uploadDocuments(type, formData));
	};
	const uploadWorkProof = (event) => {
		debugger
		//console.log('clicking uploadWorkProof');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorWorkProof';
		dispatch(uploadDocuments(type, formData));
	};

	const uploadAwardProof = (event) => {
		debugger
		//console.log('clicking uploadWorkProof');
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorAwardProof';
		dispatch(uploadDocuments(type, formData));
	};

	const uploadDegreeProof = (event) => {
		debugger
		console.log('clicking uploadDegreeProof', event.target.files);
		const uploadedFile = event.target.files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile);
		let type = 'TutorHighestProof';
		dispatch(uploadDocuments(type, formData));
	};

	const handleMapLocation = () => {
		setopenMap(true);
	};
	// Passing route function after success api redirect to perticular page
	const homeRoute = (route) => {

		history.push(route);
	};
	const PGDegreeInValid = () => {
		debugger
		if (hasPg == true && pgInstituteName != "" && pgDegreeName != "" && pgBranchName != "" && pgSpecializationName != "" && pgCompletionYear != "") {
			return null;
		} else if (hasPg == false) {
			return null;
		}
		else {
			return 'Please fill all required fields Post Graduation degree';
		}
	}

	const isSpecialDegreeInValid = () => {
		debugger
		if (hasSplDeg == true && splDegInstituteName != "" && splDegDegreeName != "" && splDegBranchName != "" && splDegCompletionYear != "") {
			return null;
		} else if (hasSplDeg == false) {
			return null;
		}
		else {
			return 'Please fill all required fields Special degree';
		}
	}

	const handleSave = (type) => {
		debugger
		let formData = {
			providerType: 'tutor',
			salutation: salutation,
			name: name,
			gender: gender,
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
				specialization: pgSpecializationName,
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
			identityProof: tutorIdProof,
			workIdentity: tutorWorkProof,
			degreeProofs: tutorHighestDocuments,
			profileImage: profileImg,
			awardProof: tutorAwardProof,
		};
		let updateFormData = {
			providerType: 'tutor',
			name: name,
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
				specialization: pgSpecializationName,
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
			identityProof: tutorIdProof,
			workIdentity: tutorWorkProof,
			degreeProofs: tutorHighestDocuments,
			profileImage: profileImg,
			awardProof: tutorAwardProof,
		};

		if (ugInstituteName != "" && ugDegreeName != "" && ugBranchName != "" && ugCompletionYear != "") {
			// if (pgInstituteName != "" && pgDegreeName != "" && pgBranchName != "" && pgSpecializationName != "" && pgCompletionYear != "") {
			if (PGDegreeInValid()) {
				toast.error(PGDegreeInValid());
				return;
			}
			if (isSpecialDegreeInValid()) {
				toast.error(isSpecialDegreeInValid());
				return;
			}
			if (shortTerm != false && avgRatePerHr != "") {
				if (avgRatePerMonth != "" && monthly != false) {
					if (!profileImg) {
						toast.error("Profile image can't be empty");
					} else if (!name) {
						toast.error('Please fill your name');
					} else if (!address || !locality || !city || !state || !country) {
						toast.error('Please fill the contact adrress');
					} else if (!hasUg) {
						toast.error("Graduation degree can't be empty");
					} else if (tutorIdProof == undefined || tutorHighestDocuments.length == 0) {
						toast.error('Please upload your proofs');
					} else {

						if (updating) {
							dispatch(updateTutorProfile(type, updateFormData, homeRoute));
						} else {
							dispatch(updateTutorProfile(type, formData, homeRoute));
						}
					}
				} else {
					toast.error(" Please fill Montly Tution");
				}
			} else {
				toast.error(" Please fill Short Term Tution	");
			}
			// } else {
			// 	toast.error(" Please fill all required fields Post Graduation degree");
			// }
		}
		else {
			toast.error(" Please fill all required fields Graduation degree");
		}

	};
	const handlePickLocationInput = (address) => {

		setlocality(address);
	};
	const handleSelect = async (address) => {
		setcity(""); setstate(""); setcountry(""); setlocality("");
		await geocodeByAddress(address)
			.then(results => {
				console.log(results)
				if (results.length == 1) {
					if (results && results[0]) {
						var add = results[0].formatted_address;
						var value = add.split(",");
						var count = value.length;
						var country = value[count - 1];
						var state = value[count - 2];
						var city = value[count - 3];
						setlocality(address);
						setcity(city);
						setstate(state);
						setcountry(country);

					}
					else {
						toast.error("Address not found!!");
					}
				}
				else {
					toast.error("Try again!!")
				}
			},
				(error) => {
					console.error(error);
				}
			);

	};
	return (
		<>
			<UpdateMapLocation open={openMap} handleClose={() => setopenMap(false)} />
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Typography variant='h2' className={classes.subGreeting}>
				{updating ? '' : 'Create Tutor Profile'}
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
				{!updating ? (
					<>
						<Grid item xs={3}>
							<TextField
								value={salutation}
								onChange={(e) => setsalutation(e.target.value)}
								select
								fullWidth={true}
								label='Salutation'
								variant='outlined'
								margin='normal'
							>
								{salutationData.map((option, i) => (
									<MenuItem key={i + 1} value={option.name}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={9}>
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
					</>
				) : (
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
						/>
					</Grid>
				)}
				{!updating && (
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
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Male'
								/>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Female'
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				)}
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						value={address}
						onChange={(e) => setaddress(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
						fullWidth={true}
						label='Door No. & Street Address'
					/>
				</Grid>
				<Grid item xs={6} md={6}>
					{/* <TextField
						value={locality}
						onChange={(e) => setlocality(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
						fullWidth={true}
						label='Locality'
						autoFocus
					/> */}


					<PlacesAutocomplete
						value={locality}
						onChange={handlePickLocationInput}
						onSelect={handleSelect}
						searchOptions={{ types: ['locality', 'country'] }}
					>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div >
								<TextField
									variant="outlined"
									{...getInputProps({
										placeholder: "Search Places ...",
										className: "location-search-input",

									})}
									id='outlined-basic'
									margin='normal'
									required
									fullWidth={true}
									label='Locality'
								/>
								<div
									className={`autocomplete-dropdown-container ${classes.locationSearchResult}`}
								>
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion, index) => {
										const className = suggestion.active
											? "suggestion-item--active"
											: "suggestion-item";
										// inline style for demonstration purpose
										const style = suggestion.active
											? {
												backgroundColor: "#ccc",
												cursor: "pointer",
												margin: "10px 0",
											}
											: {
												backgroundColor: "#ffffff",
												cursor: "pointer",
												margin: "10px 0",
											};
										return (
											<div
												key={index}
												{...getSuggestionItemProps(suggestion, {
													className,
													style,
												})}
											>
												<span style={{ padding: "5px 10px" }}>
													{suggestion.description}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>


				</Grid>
				<Grid item xs={6} md={6}>
					<TextField
						value={city}
						onChange={(e) => setcity(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
						fullWidth={true}
						label='City'
					/>
				</Grid>
				<Grid item xs={6} md={6}>
					<TextField
						value={state}
						onChange={(e) => setstate(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
						fullWidth={true}
						label='State'
					/>
				</Grid>
				<Grid item xs={6} md={6}>
					<TextField
						value={country}
						onChange={(e) => setcountry(e.target.value)}
						id='outlined-basic'
						margin='normal'
						variant='outlined'
						required
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
							<Checkbox
								checked={isIndividualTutor ? true : false}
								onChange={(e) => {
									setisIndividualTutor(e.target.checked)
									sethasTuitionCenter(!hasTuitionCenter)
								}}
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
							<Checkbox
								checked={hasTuitionCenter ? true : false}
								onChange={(e) => {
									sethasTuitionCenter(e.target.checked)
									setisIndividualTutor(!isIndividualTutor)
								}}
								name='checkedB'
								color='primary'
							/>
						}
						label='I have a Tution Point'
					/>
				</Grid>
			</Grid>

			<Typography variant='h5' className={classes.subGreeting}>
				Educational Details
			</Typography>
			<div>
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
				{hasUg && (
					<Paper elevation={3} className={classes.cardRoot}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									select
									fullWidth={true}
									label='Graduation *'
									variant='outlined'
									value={ugDegreeName}
									onChange={(e) => setugDegreeName(e.target.value)}
								>
									{providerProfileOptions &&
										providerProfileOptions.levels &&
										providerProfileOptions.levels.map((levl) => {
											if (levl.levelName === 'ug') {
												return levl.options.map((item, i) => (
													<MenuItem key={i + 2} value={item}>
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
								/>
							</Grid>
							<Grid item xs={6}>
								<YearPicker
									selectedDate={ugCompletionYear}
									setselectedDate={setugCompletionYear}
									onChange={(date) => { setugCompletionYear(date) }}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
			</div>
			<div>
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
				{hasPg && (
					<Paper elevation={3} className={classes.cardRoot}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									select
									fullWidth={true}
									label='Post Graduation *'
									variant='outlined'
									value={pgDegreeName}
									onChange={(e) => setpgDegreeName(e.target.value)}
								>
									{providerProfileOptions &&
										providerProfileOptions.levels &&
										providerProfileOptions.levels.map((levl) => {
											if (levl.levelName === 'pg') {
												return levl.options.map((item, i) => (
													<MenuItem key={i + 3} value={item}>
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
								/>
							</Grid>
							<Grid item xs={6}>
								<YearPicker
									selectedDate={pgCompletionYear}
									setselectedDate={setpgCompletionYear}
									onChange={(date) => { setpgCompletionYear(date) }}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
			</div>
			<div>
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
				{hasSplDeg && (
					<Paper elevation={3} className={classes.cardRoot}>
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
													<MenuItem key={i + 4} value={item}>
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
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={splDegBranchName}
									onChange={(e) => setsplDegBranchName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Specialisation'
								// helperText="Don't have give NA"
								/>
							</Grid>
							{/* <Grid item xs={6}>
								<TextField
									value={spSpecializationName}
									onChange={(e) => setspSpecializationName(e.target.value)}
									id='outlined-basic'
									variant='outlined'
									required
									fullWidth={true}
									label='Specialisation'
								/>
							</Grid> */}
							<Grid item xs={6}>
								<YearPicker
									selectedDate={splDegCompletionYear}
									setselectedDate={setsplDegCompletionYear}
									onChange={(date) => { setsplDegCompletionYear(date) }}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
			</div>

			<Typography variant='h5' className={classes.subGreeting}>
				Work Experience (Optional)
			</Typography>
			<TextField
				value={currentWork}
				onChange={(e) => setcurrentWork(e.target.value)}
				id='outlined-basic'
				variant='outlined'
				margin='normal'
				fullWidth={true}
				label='Current Organisation'
			/>
			<TextField
				value={currentDeisgnation}
				onChange={(e) => setcurrentDeisgnation(e.target.value)}
				id='outlined-basic'
				variant='outlined'
				margin='normal'
				fullWidth={true}
				label='Designation / Role'
			/>
			<TextField
				value={totalWorkExperienceInYears}
				onChange={(e) => settotalWorkExperienceInYears(e.target.value)}
				id='outlined-basic'
				variant='outlined'
				margin='normal'
				fullWidth={true}
				label='Experience in Years'
			/>
			<Typography variant='h5' className={`${classes.subGreeting} my-2`}>
				Teaching Preferences
			</Typography>
			<Typography variant='body1' className={classes.subHeading}>
				I Accept
			</Typography>
			<Divider />
			<Grid container spacing={2}>
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
											<MenuItem key={i + 5} value={option.value}>
												{option.display}
											</MenuItem>
										)
									)}
							</TextField>
						</Grid>
					</>
				)}
			</Grid>

			<Typography variant='body1' className={classes.subHeading}>
				I Can Conduct
			</Typography>
			<Divider />
			<div>
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
				<TextField
					value={avgRatePerHr}
					onChange={(e) => setavgRatePerHr(e.target.value)}
					id='outlined-basic'
					variant='outlined'
					fullWidth={true}
					label='Estimate Amount / Hour *'
					helperText='Estimate Amount / Hour'
				/>
			</div>
			<FormControlLabel
				control={
					<Checkbox
						value='allowExtraEmails'
						color='primary'
						checked={monthly}
						onChange={(e) => setmonthly(e.target.checked)}
					/>
				}
				label='Montly Tution '
			/>
			<TextField
				value={avgRatePerMonth}
				onChange={(e) => setavgRatePerMonth(e.target.value)}
				id='outlined-basic'
				variant='outlined'
				fullWidth={true}
				label='Estimate Amount / Month *'

				helperText='Estimate Amount / Month'
			/>

			<Typography variant='body1' className={classes.subHeading}>
				Available Slots
			</Typography>
			<Grid container spacing={2}>
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
			</Grid>
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
			<Typography variant='h5' className={`${classes.subGreeting} my-2`}>
				Uploads
			</Typography>

			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Card>
						{tutorIdProof ? (
							<>
								<CardHeader
									className={classes.uploadMediaHeader}
									action={
										<IconButton
											aria-label='settings'
											onClick={() => settutorIdProof('')}
										>
											<Cancel />
										</IconButton>
									}
								/>
								<CardMedia
									className={classes.uploadMedia}
									component='img'
									image={tutorIdProof}
									title='Id Proof'
								/>{' '}
							</>
						) : (
							<Typography variant='h5' className={classes.noMedia}>
								Nothing to preview
							</Typography>
						)}
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						{tutorWorkProof ? (
							<>
								<CardHeader
									className={classes.uploadMediaHeader}
									action={
										<IconButton
											aria-label='settings'
											onClick={() => settutorWorkProof('')}
										>
											<Cancel />
										</IconButton>
									}
								/>
								<CardMedia
									className={classes.uploadMedia}
									component='img'
									image={tutorWorkProof}
									title='Work Proof'
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
							Id Proof*
						</Button>
					</label>
				</Grid>
				<Grid item xs={6}>
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
				<Grid item xs={6}>
					<Card>
						{tutorAwardProof ? (
							<>
								<CardHeader
									className={classes.uploadMediaHeader}
									action={
										<IconButton
											aria-label='settings'
											onClick={() => settutorAwardProof('')}
										>
											<Cancel />
										</IconButton>
									}
								/>
								<CardMedia
									className={classes.uploadMedia}
									component='img'
									image={tutorAwardProof}
									title='Award Certificates'
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
					<Card>
						{tutorHighestDocuments ? (
							<>
								<CardHeader
									className={classes.uploadMediaHeader}
									action={
										<IconButton
											aria-label='settings'
											onClick={() => setTutorHighestDocuments('')}
										>
											<Cancel />
										</IconButton>
									}
								/>
								<CardMedia
									className={classes.uploadMedia}
									component='img'
									image={tutorHighestDocuments}
									title='Highest Degree Proof'
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
						id='contained-button-file4'
						multiple
						type='file'
						onChange={(event) => uploadAwardProof(event)}
					/>
					<label htmlFor='contained-button-file4'>
						<Button
							variant='contained'
							color='primary'
							component='span'
							startIcon={<CloudUpload />}
						>
							Award Certificates*
						</Button>
					</label>
				</Grid>
				<Grid item xs={6}>
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
							Highest Degree Proof*
						</Button>
					</label>
				</Grid>
			</Grid>
			<div className={classes.creatingButtonContainer}>
				<Button
					onClick={() => handleSave('Tutor')}
					size='large'
					variant='contained'
					color='primary'
					fullWidth
					className={classes.createAccountButton}
				>
					{updating ? 'Update Profile' : 'Create Your Account'}
				</Button>
			</div>
		</>
	);
}
