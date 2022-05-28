import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Divider,
	Typography,
	Tooltip,
} from '@material-ui/core';
import { FilterList, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';

// styles
import useStyles from './styles';

const menuList = [
	{
		_id: 1,
		name: 'Filter By School',
		level: 'school',
		filter: 'level',
	},
	{
		_id: 2,
		name: 'Filter By Diploma',
		level: 'diploma',
		filter: 'level',
	},
	{
		_id: 3,
		name: 'Filter By General',
		level: 'general',
		filter: 'level',
	},
	{
		_id: 4,
		name: 'Filter By Engineering',
		level: 'engineering',
		filter: 'level',
	},
];
const menuType = [
	{
		_id: 5,
		name: 'Regular',
		type: 'regular',
		filter: 'type',
	},
	{
		_id: 6,
		name: 'Expert',
		type: 'expert',
		filter: 'type',
	},
	{
		_id: 7,
		name: 'Combo',
		type: 'combo',
		filter: 'type',
	},
];
const workshopMenuType = [
	{
		_id: 5,
		name: 'Online',
		type: 'online',
		filter: 'type',
	},
	{
		_id: 6,
		name: 'Offline',
		type: 'offline',
		filter: 'type',
	},
	{
		_id: 7,
		name: 'Mixed',
		type: 'mixed',
		filter: 'type',
	},
];
export default function SearchFilterBar({
	searchTerm,
	setsearchTerm,
	setlevel,
	settype,
	searchType,
}) {
	const classes = useStyles();

	const [profileMenu, setProfileMenu] = useState(null);
	const [isSearchOpen, setSearchOpen] = useState(false);

	const handleClick = (item, filter) => {
		if (filter === 'level') {
			setlevel(item);
		}
		if (filter === 'type') {
			settype(item);
		}
		//console.log(item, filter);
		setProfileMenu(null);
	};
	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<div className={classes.grow} />
				<div
					className={classNames(classes.search, {
						[classes.searchFocused]: isSearchOpen,
					})}
				>
					<div
						className={classNames(classes.searchIcon, {
							[classes.searchIconOpened]: isSearchOpen,
						})}
						onClick={() => setSearchOpen(!isSearchOpen)}
					>
						<SearchIcon
							color='primary'
							classes={{ root: classes.headerIcon }}
						/>
					</div>
					<InputBase
						placeholder='Search…'
						value={searchTerm}
						onChange={(e) => setsearchTerm(e.target.value)}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
							border: classes.inputBorder,
						}}
					/>
				</div>

				<Tooltip title='Filter Level'>
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
					{menuList.map((item) => (
						<MenuItem
							key={item._id}
							className={classNames(
								classes.profileMenuItem,
								classes.headerMenuItem
							)}
							onClick={() => handleClick(item.level, item.filter)}
						>
							<SearchIcon className={classes.profileMenuIcon} /> {item.name}
						</MenuItem>
					))}

					<div className={classes.profileMenuUser}>
						<Typography
							className={classes.profileMenuLink}
							variant='body1'
							color='primary'
						>
							Type
						</Typography>
						<Divider className={classes.divider} />
					</div>
					{searchType === 'skill' ? (
						<>
							{menuType.map((item) => (
								<MenuItem
									key={item._id}
									className={classNames(
										classes.profileMenuItem,
										classes.headerMenuItem
									)}
									onClick={() => handleClick(item.type, item.filter)}
								>
									<SearchIcon className={classes.profileMenuIcon} /> {item.name}
								</MenuItem>
							))}
						</>
					) : (
						<>
							{workshopMenuType.map((item) => (
								<MenuItem
									key={item._id}
									className={classNames(
										classes.profileMenuItem,
										classes.headerMenuItem
									)}
									onClick={() => handleClick(item.type, item.filter)}
								>
									<SearchIcon className={classes.profileMenuIcon} /> {item.name}
								</MenuItem>
							))}
						</>
					)}
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
