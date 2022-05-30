import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Container } from '@material-ui/core';
import { updateLocation } from '../../actions/commonActions';
import TutorFiled from './TutorFiled';
import InstituteFiled from './InstituteFiled';
import UserField from './UserField';
import useGeoLocation from '../UseGeoLocation';

// styles
import useStyles from './styles';
// ROle Images
// import studentImg from './svgicons/learner.svg';
// import parentImg from './svgicons/parent.svg';
// import tutorImg from './svgicons/tutor.svg';
// import instituteImg from './svgicons/institute.svg';

import studentImg from './png/student.png';
import parentImg from './png/parent.png';
import tutorImg from './png/tutor.png';
import instituteImg from './png/institute.png';

export default function OnBording() {
	const classes = useStyles();
	const dispatch = useDispatch();
	// User Location Accessing
	const location = useGeoLocation();
	useEffect(() => {
		debugger
		if (location && location.coordinates && location.coordinates.length > 0) {
			dispatch(updateLocation(location.coordinates));
		}
	}, [location]);

	const [providerType, setproviderType] = useState('');
	// Profile Color States
	const [scolor, setscolor] = useState({ color: '' });
	const [pcolor, setpcolor] = useState({ color: '' });
	const [tcolor, settcolor] = useState({ color: '' });
	const [icolor, seticolor] = useState({ color: '' });

	const handleClick = (type) => {
		if (type === 'student') {
			setproviderType(type);
			setscolor({ color: '#FAA906' });
			setpcolor({ color: '' });
			settcolor({ color: '' });
			seticolor({ color: '' });
		} else if (type === 'parent') {
			setproviderType(type);
			setscolor({ color: '' });
			setpcolor({ color: '#FAA906' });
			settcolor({ color: '' });
			seticolor({ color: '' });
		} else if (type === 'tutor') {
			setproviderType(type);
			setscolor({ color: '' });
			setpcolor({ color: '' });
			settcolor({ color: '#FAA906' });
			seticolor({ color: '' });
		} else if (type === 'institute') {
			setproviderType(type);
			setscolor({ color: '' });
			setpcolor({ color: '' });
			settcolor({ color: '' });
			seticolor({ color: '#FAA906' });
		}
	};

	return (
		<Container maxWidth='sm' fixed>
			<div className={classes.formContainer}>
				<Typography variant='h2' className={classes.greeting}>
					Select Your Role
				</Typography>
				<div className={classes.profiles}>
					<figure className={classes.profileFigure}>
						<img
							src={studentImg}
							alt='student'
							style={{ border: `2px solid ${scolor.color}` }}
							onClick={() => handleClick('student')}
						/>
						<figcaption>Student</figcaption>
					</figure>
					<figure className={classes.profileFigure}>
						<img
							src={parentImg}
							alt='parent'
							style={{ border: `2px solid ${pcolor.color}` }}
							onClick={() => handleClick('parent')}
						/>
						<figcaption>Parent</figcaption>
					</figure>
					<figure className={classes.profileFigure}>
						<img
							src={tutorImg}
							alt='tutor'
							style={{ border: `2px solid ${tcolor.color}` }}
							onClick={() => handleClick('tutor')}
						/>
						<figcaption>Tutor</figcaption>
					</figure>
					<figure className={classes.profileFigure}>
						<img
							src={instituteImg}
							alt='institute'
							style={{ border: `2px solid ${icolor.color} ` }}
							onClick={() => handleClick('institute')}
						/>
						<figcaption>Institute</figcaption>
					</figure>
				</div>

				{providerType === 'student' && (
					<div>
						<UserField providerType='student' />
					</div>
				)}
				{providerType === 'parent' && (
					<div>
						<UserField providerType='parent' />
					</div>
				)}
				{providerType === 'tutor' && (
					<div>
						<TutorFiled providerType='tutor' />
					</div>
				)}
				{providerType === 'institute' && (
					<div>
						<InstituteFiled providerType='institute' />
					</div>
				)}
			</div>
		</Container>
	);
}
