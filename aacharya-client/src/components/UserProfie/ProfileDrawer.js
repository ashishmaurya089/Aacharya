import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	IconButton,
	Typography,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import {
	coachingCenterProfileOptions,
	menuOptionsBottom,
	menuOptionsTop,
	tutorProfileOptions,
} from '../../utils/data/drawerOptions';

import useStyles from './styles';

export default function ProfileDrawer({ handleLogout }) {
	const classes = useStyles();
	const { user, providerProfile, learnerProfile } = useSelector(
		(state) => state.usersData
	);

	const [state, setState] = React.useState({
		left: false,
	});
	const [profileImg, setprofileImg] = useState('');
	const [name, setname] = useState('');
	const [email, setemail] = useState('');

	useEffect(() => {
		if (user && user._id) {
			setInitialFields(user);
		}
	}, [user]);

	const setInitialFields = (user, provider) => {
		if (user) {
			setname(user.name);
			setemail(user.email);
		}
		if (providerProfile && providerProfile.providerType === 'tutor') {
			setprofileImg(user.profileImage);
		} else if (
			providerProfile &&
			providerProfile.providerType === 'institute'
		) {
			setprofileImg(providerProfile.instituteLogo);
		} else {
			if (user) {
				setprofileImg(user.profileImage);
			}
		}
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const logOut = () => {
		return (
			<Link to='' className={classes.link}>
				<ListItem button className={classes.listItem}>
					<ListItemIcon className={classes.listIcon}>
						<ExitToApp />
					</ListItemIcon>
					<ListItemText
						className={classes.listOption}
						primary='Logout'
						onClick={() => handleLogout()}
					/>
				</ListItem>
			</Link>
		);
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className={classes.userDetailsBox}>
				<Avatar alt={name} src={profileImg} className={classes.large} />
				<div className={classes.userDetails}>
					<Typography variant='h6'>{name}</Typography>
					<Typography variant='h6'>{email}</Typography>
				</div>
			</div>
			{user && user.isTutor ? (
				<>
					<List>
						{tutorProfileOptions.map((option) => (
							<Link to={option.route} key={option.id} className={classes.link}>
								<ListItem button>
									<ListItemIcon className={classes.listIcon}>
										{option.icon}
									</ListItemIcon>
									<ListItemText
										className={classes.listOption}
										primary={option.option}
									/>
								</ListItem>
							</Link>
						))}
						{logOut()}
					</List>
				</>
			) : user && user.isCoachingCenter ? (
				<>
					<List>
						{coachingCenterProfileOptions.map((option) => (
							<Link to={option.route} key={option.id} className={classes.link}>
								<ListItem button>
									<ListItemIcon className={classes.listIcon}>
										{option.icon}
									</ListItemIcon>
									<ListItemText
										className={classes.listOption}
										primary={option.option}
									/>
								</ListItem>
							</Link>
						))}
						{logOut()}
					</List>
				</>
			) : (
				<>
					<List>
						{menuOptionsTop.map((option) => (
							<Link to={option.route} key={option.id} className={classes.link}>
								<ListItem className={classes.listItem} button>
									<ListItemIcon className={classes.listIcon}>
										{option.icon}
									</ListItemIcon>
									<ListItemText
										className={classes.listOption}
										primary={option.option}
									/>
								</ListItem>
							</Link>
						))}
						{logOut()}
						{menuOptionsBottom.map((option, index) => (
							<Link to={option.route} key={option.id} className={classes.link}>
								<ListItem className={classes.listItem} button>
									<ListItemIcon className={classes.listIcon}>
										{option.icon}
									</ListItemIcon>
									<ListItemText
										className={classes.listOption}
										primary={option.option}
									/>
								</ListItem>
							</Link>
						))}
					</List>
				</>
			)}
		</div>
	);

	return (
		<div>
			{['right'].map((anchor) => (
				<React.Fragment key={anchor}>
					<IconButton
						className={classes.avatatButton}
						color='primary'
						aria-label='add to shopping cart'
						onClick={toggleDrawer(anchor, true)}
					>
						<Avatar alt={name} src={profileImg} />
					</IconButton>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
