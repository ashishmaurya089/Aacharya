import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Tooltip,
} from '@material-ui/core';
import { FilterList, LocationOn, School, StarBorder } from '@material-ui/icons';
import classNames from 'classnames';
import {
	findInstituteBySubject,
	findTutorBySubject,
} from '../../actions/tutorActions';
import { getDistanceBetweenTwo } from '../../actions/commonActions';
import UpdateMapLocation from '../Map';

// styles
import useStyles from './styles';

const menuList = [
	{
		_id: 1,
		name: 'Sort by Educational Qualification',
		searchTerm: 'qualification',
		icon: School,
	},
	{
		_id: 2,
		name: 'Sort by Distance',
		searchTerm: 'location',
		icon: LocationOn,
	},
	{
		_id: 3,
		name: 'Sort by Rating',
		searchTerm: 'rating',
		icon: StarBorder,
	},
];

export default function TutorFilter({ provider }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { findTutor, selectedSearchSubject } = useSelector(
		(state) => state.tutorsData
	);

	const [profileMenu, setProfileMenu] = useState(null);
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [openMap, setopenMap] = useState(false);

	const handleClick = (searchTerm) => {
		debugger
		console.log(searchTerm);
		if (provider === 'tutor') {
			dispatch(findTutorBySubject({ filter: searchTerm }));
		} else {
			dispatch(findInstituteBySubject({ filter: searchTerm }));
		}
		setProfileMenu(null);
	};
	const handleUpdateLocation = () => {
		setopenMap(true);
	};
	return (
		<>
			<UpdateMapLocation open={openMap} handleClose={() => setopenMap(false)} />

			<AppBar position='static' className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography className={classes.title} variant='h6' noWrap>
						{selectedSearchSubject && selectedSearchSubject.name}
					</Typography>
					<Tooltip title='Location'>
						<IconButton
							aria-haspopup='true'
							color='inherit'
							className={classes.headerMenuButton}
							aria-controls='profile-menu'
							onClick={handleUpdateLocation}
						>
							<LocationOn
								color='primary'
								classes={{ root: classes.headerIcon }}
							/>
						</IconButton>
					</Tooltip>
					<Tooltip title='Filter'>
						<IconButton
							aria-haspopup='true'
							color='inherit'
							className={classes.headerMenuButton}
							aria-controls='profile-menu'
							onClick={(e) => setProfileMenu(e.currentTarget)}
						>
							<FilterList
								color='primary'
								classes={{ root: classes.headerIcon }}
							/>
						</IconButton>
					</Tooltip>
					<Menu
						id='profile-menu'
						open={Boolean(profileMenu)}
						anchorEl={profileMenu}
						onClose={() => setProfileMenu(null)}
						className={classes.headerMenu}
						classes={{ paper: classes.profileMenu }}
						disableAutoFocusItem
					>
						{provider === 'tutor' ? (
							<>
								{ menuList.map((item) => (
									<MenuItem
										key={item._id}
										className={classNames(
											classes.profileMenuItem,
											classes.headerMenuItem
										)}
										onClick={() => handleClick(item.searchTerm)}
									>
										{<item.icon className={classes.profileMenuIcon} />}
										{item.name}
									</MenuItem>
								))}
							</>
						) : (
							<>
								{menuList
									.filter((value) => value._id > 1)
									.map((item) => (
										<MenuItem
											key={item._id}
											className={classNames(
												classes.profileMenuItem,
												classes.headerMenuItem
											)}
											onClick={() => handleClick(item.searchTerm)}
										>
											{<item.icon className={classes.profileMenuIcon} />}
											{item.name}
										</MenuItem>
									))}
							</>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
		</>
	);
}
