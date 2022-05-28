import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import logo from '../../images/aacharya.png';
import axios from '../../axios';
import { Menu, MenuItem, Typography, Badge } from '@material-ui/core';
import { Person as AccountIcon } from '@material-ui/icons';
import classNames from 'classnames';

import useStyles from './styles';
import { Avatar, Tooltip } from '@material-ui/core';
import { NavDropdown } from 'react-bootstrap';
import ProfileDrawer from '../UserProfie/ProfileDrawer';
import ChatList from '../Chats/ChatList';
import { getProfile } from '../../actions/userActions';
import NotificationDrawer from '../NotificationDrawer';
import { toast } from 'react-toastify';
function Navbar() {
	const classes = useStyles();
	const { isAuthenticated } = useSelector((state) => state.registrationsData);
	const { user } = useSelector((state) => state.usersData);
	const dispatch = useDispatch();
	const history = useHistory();
	var [profileMenu, setProfileMenu] = useState(null);
	var [openDrawer, setopenDrawer] = useState(false);
	//console.log(user);
	let accessToken = localStorage.getItem('accessToken');

	var [openNotification, setopenNotification] = useState(false);
	var [notification, setNotification] = useState([]);

	useEffect(() => {
		async function fetchData() {
			if (accessToken) {
				dispatch(getProfile());
				try {
					const { data } = await axios.get('/api/users/getNotifications');
					if (data.status) {
						setNotification(data.data);
					}
				} catch (error) {
					if (error.response.data.msg) {
						toast.error(error.response.data.msg);
					} else {
						toast.error("Can't get Profile");
					}
				}
			}
		}
		fetchData();
	}, [accessToken]);

	useEffect(() => {
		if (user && user.user && user.user.isTutor) {
			history.push('/tutor');
		} else if (user && user.user && user.user.isCoachingCenter) {
			history.push('/institute');
		}
	}, [accessToken]);

	const handleLogout = () => {
		dispatch({
			type: 'USER_LOGOUT',
		});
		history.push('/');
		setProfileMenu(null);
	};
	const handleNotificationOpen = (bool) => {
		setopenNotification(bool);
	};
	const handleDrawerOpen = (bool) => {
		setopenDrawer(bool);
	};
	return (
		<>
			<nav
				className='navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light'
				id='ftco-navbar'
			>
				<div className='container'>
					{user && user.user && user.user.isTutor ? (
						<Link className='navbar-brand' to='/tutor'>
							<img src={logo} alt='logo' className={`${classes.logo} mb-2`} />
						</Link>
					) : user && user.user && user.user.isCoachingCenter ? (
						<Link className='navbar-brand' to='/institute'>
							<img src={logo} alt='logo' className={`${classes.logo} mb-2`} />
						</Link>
					) : (
						<Link className='navbar-brand' to='/'>
							<img src={logo} alt='logo' className={`${classes.logo} mb-2`} />
						</Link>
					)}
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#ftco-nav'
						aria-controls='ftco-nav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='oi oi-menu'></span> Menu
					</button>
					{user && user.user && user.user.isTutor ? (
						<div className='collapse navbar-collapse' id='ftco-nav'>
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item active'>
									<Link to='/tutor' className='nav-link'>
										Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/tutor-subjects' className='nav-link'>
										Subjects
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/tutor-dashboard' className='nav-link'>
										Dashboard
									</Link>
								</li>
								{!accessToken ? (
									<li className='nav-item cta'>
										<Link to='/login' className='nav-link'>
											<span>Login!</span>
										</Link>
									</li>
								) : (
									<>
										<Tooltip title='Notifications'>
											<IconButton
												aria-label='notification'
												color='primary'
												onClick={() => handleNotificationOpen(true)}
											>
												<Badge badgeContent={notification.length} color='error'>
													<NotificationsIcon />
												</Badge>
											</IconButton>
										</Tooltip>
										{openNotification && (
											<NotificationDrawer
												handleDrawerClose={() => handleNotificationOpen(false)}
												notifications={notification}
											/>
										)}
										<Tooltip title='Chats'>
											<IconButton
												aria-label='chat'
												color='primary'
												onClick={handleDrawerOpen}
											>
												<ChatIcon />
											</IconButton>
										</Tooltip>
										{/* ChatList  Component */}
										<ChatList
											openChat={openDrawer}
											handleDrawerClose={() => setopenDrawer(false)}
										/>
										{/* ProfileDrawer  Component */}
										<ProfileDrawer handleLogout={handleLogout} />
									</>
								)}
							</ul>
						</div>
					) : user && user.user && user.user.isCoachingCenter ? (
						<>
							<div className='collapse navbar-collapse' id='ftco-nav'>
								<ul className='navbar-nav ml-auto'>
									<li className='nav-item active'>
										<Link to='/institute' className='nav-link'>
											Home
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/institute-courses' className='nav-link'>
											Courses
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/institute-dashboard' className='nav-link'>
											Dashboard
										</Link>
									</li>
									{!accessToken ? (
										<li className='nav-item cta'>
											<Link to='/login' className='nav-link'>
												<span>Login!</span>
											</Link>
										</li>
									) : (
										<>
											<Tooltip title='Notifications'>
												<IconButton
													aria-label='notification'
													color='primary'
													onClick={() => handleNotificationOpen(true)}
												>
													<Badge
														badgeContent={notification.length}
														color='error'
													>
														<NotificationsIcon />
													</Badge>
												</IconButton>
											</Tooltip>
											{openNotification && (
												<NotificationDrawer
													handleDrawerClose={() =>
														handleNotificationOpen(false)
													}
													notifications={notification}
												/>
											)}
											<Tooltip title='Chats'>
												<IconButton
													aria-label='chat'
													color='primary'
													onClick={() => handleDrawerOpen(true)}
												>
													<ChatIcon />
												</IconButton>
											</Tooltip>

											<ChatList
												openChat={openDrawer}
												handleDrawerClose={() => setopenDrawer(false)}
											/>
											{/* Component */}
											<ProfileDrawer handleLogout={handleLogout} />
										</>
									)}
								</ul>
							</div>
						</>
					) : (
						<>
							<div className='collapse navbar-collapse' id='ftco-nav'>
								<ul className='navbar-nav ml-auto'>
									<li className='nav-item active'>
										<Link to='/' className='nav-link'>
											Home
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/about' className='nav-link'>
											About
										</Link>
									</li>
									{/* <li className='nav-item dropdown'>
								<Link
									className='nav-link dropdown-toggle'
									to='#'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Services
								</Link>
								<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
									<li>
										<Link className='dropdown-item' to='/tutors'>
											Find Tutor
										</Link>
									</li>
									<li><hr className="dropdown-divider" /></li>
									<li>
										<Link className='dropdown-item' to='institutes'>
											Find Coaching Center
										</Link>
									</li>
								</ul>
							</li>
							<li className='nav-item dropdown'>
								<Link
									className='nav-link dropdown-toggle'
									to='#'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Events
								</Link>
								<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
									<li>
										<Link className='dropdown-item' to='/competitions'>
											Competitions
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' to='/workshops'>
											Workshops
										</Link>
									</li>
								</ul>
							</li> */}
									<NavDropdown title='Services' id='basic-nav-dropdown'>
										<NavDropdown.Item href='/tutors'>
											Find Tutor
										</NavDropdown.Item>
										<NavDropdown.Item href='/institutes'>
											Find Coaching Center
										</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title='Events' id='basic-nav-dropdown'>
										<NavDropdown.Item href='/competitions'>
											Competitions
										</NavDropdown.Item>
										<NavDropdown.Item href='/workshops'>
											Workshops
										</NavDropdown.Item>
									</NavDropdown>

									<li className='nav-item'>
										<Link to='/skills' className='nav-link'>
											Skills
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/press-media' className='nav-link'>
											Press & Media
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/contact' className='nav-link'>
											Contact
										</Link>
									</li>
									{!accessToken ? (
										<li className='nav-item cta'>
											<Link to='/login' className='nav-link'>
												<span>Login!</span>
											</Link>
										</li>
									) : (
										<>
											<Tooltip title='Notifications'>
												<IconButton
													aria-label='notification'
													color='primary'
													onClick={() => handleNotificationOpen(true)}
												>
													<Badge
														badgeContent={notification.length}
														color='error'
													>
														<NotificationsIcon />
													</Badge>
												</IconButton>
											</Tooltip>
											{openNotification && (
												<NotificationDrawer
													handleDrawerClose={() =>
														handleNotificationOpen(false)
													}
													notifications={notification}
												/>
											)}
											<Tooltip title='Chats'>
												<IconButton
													aria-label='chat'
													color='primary'
													onClick={handleDrawerOpen}
												>
													<ChatIcon />
												</IconButton>
											</Tooltip>
											<ChatList
												openChat={openDrawer}
												handleDrawerClose={() => setopenDrawer(false)}
											/>
											{/* Component */}
											<ProfileDrawer handleLogout={handleLogout} />
										</>
									)}
								</ul>
							</div>
						</>
					)}
				</div>
			</nav>
		</>
	);
}

export default withRouter(Navbar);

/* <IconButton
										aria-haspopup='true'
										color='inherit'
										className={classes.headerMenuButton}
										aria-controls='profile-menu'
										onClick={(e) => setProfileMenu(e.currentTarget)}
									>
										<Avatar
											alt='Remy Sharp'
											src='https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg'
										/>
									</IconButton>
									<Menu
										id='profile-menu'
										open={Boolean(profileMenu)}
										anchorEl={profileMenu}
										onClose={() => setProfileMenu(null)}
										className={classes.headerMenu}
										classes={{ paper: classes.profileMenu }}
										disableAutoFocusItem
									>
										<div className={classes.profileMenuUser}>
											<Typography variant='h4' weight='medium'>
												John Smith
											</Typography>
											<Typography variant='body1' weight='medium'>
												john@gmail.com
											</Typography>
										</div>
										<MenuItem
											className={classNames(
												classes.profileMenuItem,
												classes.headerMenuItem
											)}
										>
											<AccountIcon className={classes.profileMenuIcon} /> Edit
											Profile
										</MenuItem>
										<div className={classes.profileMenuUser}>
											<Typography
												className={classes.profileMenuLink}
												color='primary'
												onClick={handleLogout}
											>
												Sign Out
											</Typography>
										</div>
									</Menu> */
