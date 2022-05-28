import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Contacts,
	Event,
	FindInPage,
	Home,
	Menu,
	Info,
	LocalLibrary,
	PhotoLibrary,
} from '@material-ui/icons';
import {
	instituteMobileMenuOptions,
	tutorMobileMenuOptions,
} from '../../utils/data/mobileMenuOptions';

import useStyles from './styles';

export default function MobileMenu() {
	const classes = useStyles();
	const { user, providerProfile } = useSelector((state) => state.usersData);

	const [state, setState] = React.useState({
		right: false,
	});
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
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
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
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
			{user && user.isTutor ? (
				<>
					<List>
						{tutorMobileMenuOptions.map((option) => (
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
					</List>
				</>
			) : user && user.isCoachingCenter ? (
				<>
					<List>
						{instituteMobileMenuOptions.map((option) => (
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
					</List>
				</>
			) : (
				<>
					<List>
						<Link to='/' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<Home />
								</ListItemIcon>
								<ListItemText className={classes.listOption} primary='Home' />
							</ListItem>
						</Link>
						<Link to='/about' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<Info />
								</ListItemIcon>
								<ListItemText className={classes.listOption} primary='About' />
							</ListItem>
						</Link>
						{/* <ListItem
							button
							onClick={() => {
								//console.log('coming');
								toggleDrawer(anchor, true);
								setExpanded(!expanded);
							}}
						>
							<ListItemIcon className={classes.listIcon}>
								<FindInPage />
							</ListItemIcon>
							<ListItemText className={classes.listOption} primary='Services' />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={open} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<StarBorder />
									</ListItemIcon>
									<ListItemText primary='Starred' />
								</ListItem>
							</List>
						</Collapse> */}
						<Link to='/tutors' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<FindInPage />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Find Tutor'
								/>
							</ListItem>
						</Link>
						<Link to='/institutes' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<FindInPage />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Find Coaching Center'
								/>
							</ListItem>
						</Link>
						<Link to='/competitions' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<Event />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Competitions'
								/>
							</ListItem>
						</Link>
						<Link to='/workshops' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<Event />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Workshops'
								/>
							</ListItem>
						</Link>
						<Link to='/skills' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<LocalLibrary />
								</ListItemIcon>
								<ListItemText className={classes.listOption} primary='Skills' />
							</ListItem>
						</Link>
						<Link to='/press-media' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<PhotoLibrary />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Press & Media'
								/>
							</ListItem>
						</Link>
						<Link to='/contact' className={classes.link}>
							<ListItem button>
								<ListItemIcon className={classes.listIcon}>
									<Contacts />
								</ListItemIcon>
								<ListItemText
									className={classes.listOption}
									primary='Contact'
								/>
							</ListItem>
						</Link>
					</List>
				</>
			)}
		</div>
	);

	return (
		<>
			{['right'].map((anchor) => (
				<React.Fragment key={anchor}>
					<IconButton
						color='inherit'
						size='large'
						onClick={toggleDrawer(anchor, true)}
					>
						<Menu color='primary' />
					</IconButton>
					{/* <Button
						variant='outlined'
						// color='secondary'
						clasNamee={classes.toggleMenu}
						onClick={toggleDrawer(anchor, true)}
					>
						Menu
					</Button> */}
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</>
	);
}
