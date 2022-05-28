import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { auto } from '@popperjs/core';
import {
	Drawer,
	List,
	Typography,
	Divider,
	ListItem,
	ListItemText,
	IconButton,
	ListItemAvatar,
	Avatar,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import logo from '../../images/logo.png';
import useStyles from './style';

const NotificationDrawer = ({ handleDrawerClose, notifications }) => {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='right'
			>
				<div className={classes.drawerHeader}>
					<Typography variant='h3' align='center'>
						Notifications
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</div>
				<Divider />
				<List className={classes.list}>
					{notifications.map((notification) => (
						<>
							<ListItem alignItems='flex-start'>
								<ListItemAvatar>
									<Avatar alt='Admin' src={logo} />
								</ListItemAvatar>
								<ListItemText
									  primary={notification.title}
									secondary={
										<React.Fragment>
											<Typography
												component='span'
												variant='body2'
												className={classes.inline}
												color='textPrimary'
											>
												{/* Admin - */}
											</Typography>
											{`${notification.message}`}
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
						</>
					))}
				</List>
			</Drawer>
		</div>
	);
};

export default NotificationDrawer;
